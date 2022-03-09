import React from 'react';
import spdx from './index';

describe('SPDX-to-React', function() {
	describe('when the license is an SPDX-compliant license', function() {
		const licenseName = 'MIT';
		it('returns a link to the licnense', function() {
			expect(spdx(licenseName)).toStrictEqual([
				React.createElement('a', { href: `https://spdx.org/licenses/${licenseName}` }, licenseName)
			]);
		});
	});

	describe('when the license is a reference', function() {
		const licenseRef = 'LicenseRef-123ABC';
		it('returns a string', function() {
			expect(spdx(licenseRef)).toStrictEqual([
				`License Reference "${licenseRef}"`
			]);
		});
	});

	describe('when the license is SPDX-compliant multilicense', function() {
		const license = 'MIT+ OR BSD-4-Clause';
		it('splits it into multiple licenses', function() {
			expect(spdx(license)).toStrictEqual([
				React.createElement('a', { href: "https://spdx.org/licenses/MIT" }, 'MIT'),
				' or newer',
				' or ',
				React.createElement('a', { href: "https://spdx.org/licenses/BSD-4-Clause" }, 'BSD-4-Clause'),
			]);
		});
	});

	describe('when the license is of an unknwon type', function() {
		const unknwonLicense = 'My-cool-license-2.0';
		it('returns an empty array', function() {
			expect(spdx(unknwonLicense)).toStrictEqual([]);
		});
	});

	describe('when a mapping function is passed', function() {
		const license = 'LGPLLR WITH Classpath-exception-2.0';
		const mapperFn = (x => x);
		it('returns the raw strings of the AST to the mapper', function() {
			expect(spdx(license, mapperFn)).toStrictEqual([
				'LGPLLR',
				' with Classpath-exception-2.0',
			]);
		});
	});
});