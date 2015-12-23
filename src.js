(function() {
  const hasProp = {}.hasOwnProperty
      , getDesc = Object.getOwnPropertyDescriptor
      , defProp = Object.defineProperty

  module.exports = function replace(cons, wrapper, name = cons.name) {
    return copyProps(cons, named(name, cons, wrapper))
  }

  function copyProps(src, dst) {
    let keys = []

    if (typeof Object.getOwnPropertyNames === 'function') {
      keys = keys.concat(Object.getOwnPropertyNames(src))
    }

    if (typeof Object.getOwnPropertySymbols === 'function') {
      keys = keys.concat(Object.getOwnPropertySymbols(src))
    }

    if (keys.length && (getDesc != null) && (defProp != null)) {
      for (let i = 0, len = keys.length; i < len; i++) {
        const k = keys[i]
            , d = getDesc(dst, k)

        if ((d != null ? d.configurable : void 0) === false) {
          if (d.writable) dst[k] = src[k]
          continue
        }
        try {
          defProp(dst, k, getDesc(src, k))
        } catch (_) {}
      }
    } else {
      for (let k in src) {
        if (!hasProp.call(src, k)) continue
        dst[k] = src[k]
      }

      dst.prototype = src.prototype
    }

    if (dst.__proto__ !== src.__proto__) {
      try {
        dst.__proto__ = src.__proto__
      } catch (_) {}
    }

    dst.prototype.constructor = dst
    return dst
  }

  function named(name, src, dst) {
    if (!name) return dst

    src = {
      name: name,
      length: src.length
    }

    for(let prop in ['name', 'length']) {
      if (dst[prop] !== src[prop]) {
        try {
          dst[prop] = src[prop]
        } catch (_) {}
      }

      if (dst[prop] !== src[prop]) {
        try {
          defProp(dst, prop, { value: src[prop] })
        } catch (_) {}
      }
    }

    if (dst.name !== name || dst.length !== src.length) {
      let args = !src.length ? '' : 'arg' + (function() {
        const results = []

        for (let j=1, l=src.length; 1 <= l ? j <= l : j >= l; 1 <= l ? j++ : j--){
          results.push(j)
        }

        return results
      })().join(', arg')

      try {
        dst = new Function('$$' + name, ("return function NAME(" + args + ") {\n    return $$NAME.apply(this, arguments);\n}").replace(/NAME/g, name))(dst);
      } catch (_) {}
    }

    return dst
  }
}).call(this)
