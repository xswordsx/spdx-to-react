import React from 'react';
import parse from 'spdx-expression-parse';

/**
 *
 * @param {SPDX} parsed - An SPDX AST object.
 * @param {function=identity} [mapper] - A mapping function for the `license` value.
 * Defaults to `identity`.
 * @return {[*]}
 */
function render(parsed, mapper = _identity) {
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
 * @return {[*]}
 */
function flatten(list) {
	if (!Array.isArray(list)) {
		return list;
	}
	return list.reduce(function (flattenedList, item) {
		if (Array.isArray(item)) {
			return flattenedList.concat(flatten(item));
		}
		return flattenedList.concat(item);
	}, []);
}

function _identity(x) {
	return x;
}

function _reactMapper(x) {
	return <a href={`https://spdx.org/licenses/${x}`}>{x}</a>;
}

/**
 * Returns an array of a broken-down SPDX expression with licenses wrapped in `<a>` tags.
 * @param {String} license - An SPDX-compliant string. If `license` is not a
 * valid SPDX expression, [] is returned.
 * @return {[*]}
 */
function spdx(license) {
	try {
		const parsed = parse(license);
		return flatten(render(parsed, _reactMapper));
	}
	catch (e) {
		return [];
	}
}

export default spdx;
/**
 * The structure of an SPDX AST
 * @typedef SPDX {Object}
 *
 * @property {String} [license]
 * @property {SPDX} [left] - Present in complex expressions only.
 * @property {SPDX} [right] - Present in complex expressions only.
 * @property {String} [conjunction] - Present in complex expressions only.
 * @property {String} [plus]
 * @property {String} [exception]
 */
