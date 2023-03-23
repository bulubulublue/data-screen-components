(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rollupDatav = factory(global.Vue));
})(this, (function (vue) { 'use strict';

  var script = {
    name: 'TestComponent',
    setup() {
      return {};
    }
  };

  const _hoisted_1 = {
    class: "test"
  };
  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, "test ");
  }

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".test[data-v-7cc4288f] {\n  color: red;\n}";
  styleInject(css_248z);

  script.render = render;
  script.__scopeId = "data-v-7cc4288f";
  script.__file = "src/components/Test/Test.vue";

  function Test (Vue) {
    Vue.component(script.name, script);
  }

  function index (Vue) {
    Vue.use(Test);
  }

  return index;

}));
