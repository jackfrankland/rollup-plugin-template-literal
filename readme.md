# rollup-plugin-template-literal

Taggable template literals

## Installation

```bash
npm install --save-dev rollup-plugin-template-literal
```

## Usage

### rollup.config.js:
```js
import templateLiteral from 'rollup-plugin-template-literal';

export default {
  input: 'index.js',
  plugins: [
    templateLiteral({
      include: '**/*.js.html', // required
      exclude: '**/*.js', // optional
      tags: 'optional' // one of 'off', 'optional', 'required'; default: 'required'
      propsKey: 'props' // optional; default: 'props'
    }),
  ],
};
```

### template.js.html (propsKey option set to 'props'):

```html
<p>${props.message}</p>
```

### index.js (without using tag; tags option 'off' or 'optional'):

```js
import template from './template.js.html';

const props = {
  message: 'oh hi',
};

const div = document.createElement('div');
div.innerHTML = template(
  props // will be accessible in template string as propsKey
);

// result: div.innerHTML = '<p>oh hi</p>'
```

### index.js (using tag; tags option 'optional' or 'required'):

```js
import { html } from 'common-tags';
import template from './template.js.html';

const props = {
  message: 'oh hi',
};

const div = document.createElement('div');
div.innerHTML = template(
  props,  // will be accessible in template string via propsKey
  html // template string will be run through the passed tag function
);

// result: div.innerHTML = '<p>oh hi</p>'
```
