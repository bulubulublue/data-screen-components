import { openBlock, createElementBlock, createStaticVNode, normalizeStyle, createElementVNode } from 'vue';

var script$3 = {
  name: 'TestComponent',
  setup() {
    return {};
  }
};

const _hoisted_1$1 = {
  width: "0",
  height: ""
};
const _hoisted_2 = /*#__PURE__*/createStaticVNode("<defs data-v-7cc4288f><symbol id=\"more\" viewBox=\"0 0 100 100\" data-v-7cc4288f><circle r=\"5\" cx=\"20\" cy=\"25\" fill=\"currentColor\" data-v-7cc4288f></circle><circle r=\"5\" cx=\"20\" cy=\"50\" fill=\"currentColor\" data-v-7cc4288f></circle><circle r=\"5\" cx=\"20\" cy=\"75\" fill=\"currentColor\" data-v-7cc4288f></circle><line x1=\"40\" y1=\"25\" x2=\"90\" y2=\"25\" stroke-width=\"8\" stroke=\"currentColor\" data-v-7cc4288f></line><line x1=\"40\" y1=\"50\" x2=\"90\" y2=\"50\" stroke-width=\"8\" stroke=\"currentColor\" data-v-7cc4288f></line><line x1=\"40\" y1=\"75\" x2=\"90\" y2=\"75\" stroke-width=\"8\" stroke=\"currentColor\" data-v-7cc4288f></line></symbol><symbol id=\"arrowRight\" viewBox=\"0 0 100 100\" data-v-7cc4288f><polyline points=\"20 10,80 50,20,90 \" fill=\"currentColor\" data-v-7cc4288f></polyline></symbol></defs>", 1);
const _hoisted_3 = [_hoisted_2];
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, _hoisted_3);
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

script$3.render = render$3;
script$3.__scopeId = "data-v-7cc4288f";
script$3.__file = "src/components/Test/Test.vue";

function Test (Vue) {
  Vue.component(script$3.name, script$3);
}

var script$2 = {
  name: 'TestComponent2'
};

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, "Test2");
}

script$2.render = render$2;
script$2.__file = "src/components/Test2/Test2.vue";

function Test2 (Vue) {
  Vue.component(script$2.name, script$2);
}

var script$1 = {
  name: 'TestComponent3'
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, "Test3");
}

script$1.render = render$1;
script$1.__file = "src/components/Test3/Test3.vue";

function Test3 (Vue) {
  Vue.component(script$1.name, script$1);
}

var script = {
  name: 'Icon',
  props: {
    name: String,
    style: Object
  },
  setup(props) {
    const iconName = `#${props.name}`;
    return {
      iconName
    };
  }
};

const _hoisted_1 = ["href"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", {
    style: normalizeStyle({
      ...$props.style
    })
  }, [createElementVNode("use", {
    href: $setup.iconName
  }, null, 8 /* PROPS */, _hoisted_1)], 4 /* STYLE */);
}

script.render = render;
script.__file = "src/components/Icon/Icon.vue";

function Icon (Vue) {
  Vue.component(script.name, script);
}

function index (Vue) {
  Vue.use(Test);
  Vue.use(Test2);
  Vue.use(Test3);
  Vue.use(Icon);
}

export { index as default };
