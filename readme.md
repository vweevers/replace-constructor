# replace-constructor

**Replace/wrap a class constructor, while keeping the prototype, name and properties of the original class. Like extending a class, but suitable for use in decorators and such. Babel compatible. Adapted from [autocreate](https://github.com/pjeby/autocreate) - all credits to [@pjeby](https://github.com/pjeby).**

[![npm status](http://img.shields.io/npm/v/replace-constructor.svg?style=flat-square)](https://www.npmjs.org/package/replace-constructor) [![Dependency status](https://img.shields.io/david/vweevers/replace-constructor.svg?style=flat-square)](https://david-dm.org/vweevers/replace-constructor)

## example

`npm i replace-constructor`

```js
const replace = require('replace-constructor')

class Original {
  constructor(x, y) {
    // ..
  }
}

const Wrapped = replace(Original, function(x, y){
  Original.call(this, x, y)
})
```

## install

With [npm](https://npmjs.org) do:

```
npm install replace-constructor
```

## license

[MIT](http://opensource.org/licenses/MIT) (permission pending) © Vincent Weevers,
[ISC](http://opensource.org/licenses/ISC) © PJ Eby
