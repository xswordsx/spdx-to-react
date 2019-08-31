import React from 'react';
import spdx from './index';

test('basic functionalities', function() {
    const expected = <a href="https://spdx.org/licenses/MIT">MIT</a>;
    const result = spdx('MIT');
    expect(result).toStrictEqual([expected]);
});
