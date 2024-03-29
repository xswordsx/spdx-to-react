import React from 'react';
import parse from 'spdx-expression-parse';

/**
 *
 * @param {SPDX} parsed - An SPDX AST object.
 * @param {function} [mapper=identity] - A mapping function for the `license` value.
 * Defaults to `identity`.
 * @return {Array}
 */
function render(parsed, mapper) {
	if (parsed.license) {
		if (parsed.license.indexOf('LicenseRef') > -1) {
			return ['License Reference "' + parsed.license + '"'];
		}
		else {
			return [
				mapper(parsed.license),
				( parsed.plus ? ' or newer' : null ),
				( parsed.exception ? ' with ' + parsed.exception : null )
			];
		}
	}
	else {
		return [
			render(parsed.left, mapper),
			' ' + parsed.conjunction + ' ',
			render(parsed.right, mapper)
		];
	}
}

/**
 * Flattens an array
 *
 * @param {*} list - Array to be flattened. If `list` is not an array,
 * the value is returned unchanged.
 * @return {Array}
 */
function flatten(list) {
	if (!Array.isArray(list)) {
		return list;
	}
	return list.reduce(function (flattenedList, item) {
		return flattenedList.concat(flatten(item));
	}, []);
}

function _reactMapper(x) {
	return React.createElement('a', { href: `https://spdx.org/licenses/${x}` }, x);
}

/**
 * Returns an array of a broken-down SPDX expression with licenses wrapped in 'a' tags.
 * @param {String} license - An SPDX-compliant string. If `license` is not a
 * valid SPDX expression, [] is returned.
 * @param {function} [mapper=React 'a' tag] - A mapping function for the `license` value.
 * @return {Array}
 */
function spdx(license, mapper = _reactMapper) {
	try {
		const parsed = parse(license);
		return flatten(render(parsed, mapper)).filter(x => x != null);
	}
	catch (e) {
		return [];
	}
}

export default spdx;
/**
 * The structure of an SPDX AST
 * @typedef {Object} SPDX
 *
 * @property {String} [license]
 * @property {SPDX} [left] - Present in complex expressions only.
 * @property {SPDX} [right] - Present in complex expressions only.
 * @property {String} [conjunction] - Present in complex expressions only.
 * @property {String} [plus]
 * @property {String} [exception]
 */
