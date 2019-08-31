spdx-to-react
==============

[![Build Status](https://travis-ci.org/xswordsx/spdx-to-react.svg?branch=master)](https://travis-ci.org/xswordsx/spdx-to-react)

A port of [kemitchell](https://github.com/kemitchell)'s [spdx-to-html](https://github.com/kemitchell/spdx-to-html.js)

```javascript
import spdxReact from 'spdx-to-react';
```

Returns `[]` for invalid license expressions:

```javascript
spdxReact('InvalidExpression')
// => []
```

Returns [React](https://facebook.github.io/react/) `<a>` tags for standard licenses on spdx.org:

```javascript
spdxReact('MIT')
// => [<a href="http://spdx.org/licenses/MIT">MIT</a>]
```

For license references:

```javascript
spdxReact('LicenseRef-123ABC')
// => ['License Reference "LicenseRef-123ABC"']
```

Constructs English disjunctions for multilicensing expressions:

```javascript
spdxReact('(MPL-2.0 OR GPL-2.0+)')
// => [
//      <a href="http://spdx.org/licenses/MPL-2.0">MPL-2.0</a>,
//      ' or ',
//      <a href="http://spdx.org/licenses/GPL-2.0">GPL-2.0</a>,
//      'or newer'
// ]
```

Describes ranges and exceptions:

```javascript
spdxReact('(GPL-2.0+ WITH Bison-exception-2.2)')
// => [<a href="http://spdx.org/licenses/GPL-2.0">GPL-2.0</a>, ' or newer', ' with Bison-exception-2.2']
```

## Mapping to other values
You could also map this to other values, by passing a mapping function.
By default, the mapping function is `<a href="spdx.org/licenses/${VALUE}>${VALUE}</a>`

```jsx
spdxReact('MIT', x => <b>${x.toLowerCase()}</b>);
// => [<b>mit</b>]
```