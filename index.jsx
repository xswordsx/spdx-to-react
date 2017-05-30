import React from 'react';
import parse from 'spdx-expression-parse';

/**
 *
 * @param {SPDX} parsed
 * @return {*}
 */
function render(parsed) {
	if (parsed.license) {
		if (parsed.license.indexOf('LicenseRef') > -1) {
			return <div>License Reference "{parsed.license}"</div>;
		}
		else {
			return [
				<a href={'http://spdx.org/licenses/' + parsed.license}>
					{parsed.license}
				</a>,
				( parsed.plus ? ' or newer' : null ),
				( parsed.exception ? ' with ' + parsed.exception : null )
			];
		}
	}
	else {
		return [
			render(parsed.left),
			parsed.conjunction,
			render(parsed.right)
		];
	}
}

export function SPDX({license}) {
	try {
		const parsed = parse(license);
		return render(parsed);
	}
	catch (e) {
		return null;
	}
}

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
