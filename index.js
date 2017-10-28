webpackJsonp([0],{

/***/ "+/Bq":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.createTextElement = createTextElement;
exports.createEmptyElement = createEmptyElement;
exports.createThunkElement = createThunkElement;
exports.isValidAttribute = isValidAttribute;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/**
 * This function lets us create virtual nodes using a simple
 * syntax. It is compatible with JSX transforms so you can use
 * JSX to write nodes that will compile to this function.
 *
 * let node = element('div', { id: 'foo' }, [
 *   element('a', { href: 'http://google.com' },
 *     element('span', {}, 'Google'),
 *     element('b', {}, 'Link')
 *   )
 * ])
 */

function create(type, attributes) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  if (!type) throw new TypeError('element() needs a type.');

  attributes = attributes || {};
  children = (children || []).reduce(reduceChildren, []);

  var key = typeof attributes.key === 'string' || typeof attributes.key === 'number' ? attributes.key : undefined;

  delete attributes.key;

  if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' || typeof type === 'function') {
    return createThunkElement(type, key, attributes, children);
  }

  return {
    attributes: attributes,
    children: children,
    type: type,
    key: key
  };
}

/**
 * Cleans up the array of child elements.
 * - Flattens nested arrays
 * - Converts raw strings and numbers into vnodes
 * - Filters out undefined elements
 */

function reduceChildren(children, vnode) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    children.push(createTextElement(vnode));
  } else if (vnode === null) {
    children.push(createEmptyElement());
  } else if (Array.isArray(vnode)) {
    children = [].concat(_toConsumableArray(children), _toConsumableArray(vnode.reduce(reduceChildren, [])));
  } else if (typeof vnode === 'undefined') {
    throw new Error('vnode can\'t be undefined. Did you mean to use null?');
  } else {
    children.push(vnode);
  }
  return children;
}

/**
 * Text nodes are stored as objects to keep things simple
 */

function createTextElement(text) {
  return {
    type: '#text',
    nodeValue: text
  };
}

/**
 * Text nodes are stored as objects to keep things simple
 */

function createEmptyElement() {
  return {
    type: '#empty'
  };
}

/**
 * Lazily-rendered virtual nodes
 */

function createThunkElement(component, key, props, children) {
  return {
    type: '#thunk',
    children: children,
    props: props,
    component: component,
    key: key
  };
}

/**
 * Is a vnode a thunk?
 */

var isThunk = exports.isThunk = function isThunk(node) {
  return node.type === '#thunk';
};

/**
 * Is a vnode a text node?
 */

var isText = exports.isText = function isText(node) {
  return node.type === '#text';
};

/**
 * Is a vnode an empty placeholder?
 */

var isEmpty = exports.isEmpty = function isEmpty(node) {
  return node.type === '#empty';
};

/**
 * Determine if two virtual nodes are the same type
 */

var isSameThunk = exports.isSameThunk = function isSameThunk(left, right) {
  return isThunk(left) && isThunk(right) && left.component === right.component;
};

/**
 * Group an array of virtual elements by their key, using index as a fallback.
 */

var groupByKey = exports.groupByKey = function groupByKey(children) {
  return children.reduce(function (acc, child, i) {
    if (child != null && child !== false) {
      acc.push({
        key: String(child.key || i),
        item: child,
        index: i
      });
    }
    return acc;
  }, []);
};

/**
 * Check if an attribute should be rendered into the DOM.
 */

function isValidAttribute(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'function') return false;
  if (value === '') return true;
  if (value === undefined) return false;
  if (value === null) return false;
  return true;
}

/**
 * Create a node path, eg. (23,5,2,4) => '23.5.2.4'
 */

var createPath = exports.createPath = function createPath() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return args.join('.');
};

/***/ }),

/***/ "+kgi":
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__("Gkcm");


/**
 * Wraps a function of any arity (including nullary) in a function that accepts exactly `n`
 * parameters. Unlike `nAry`, which passes only `n` arguments to the wrapped function,
 * functions produced by `arity` will pass all provided arguments to the wrapped function.
 *
 * @func
 * @memberOf R
 * @sig (Number, (* -> *)) -> (* -> *)
 * @category Function
 * @param {Number} n The desired arity of the returned function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is
 *         guaranteed to be of arity `n`.
 * @deprecated since v0.15.0
 * @example
 *
 *      var takesTwoArgs = function(a, b) {
 *        return [a, b];
 *      };
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      var takesOneArg = R.arity(1, takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // All arguments are passed through to the wrapped function
 *      takesOneArg(1, 2); //=> [1, 2]
 */
module.exports = _curry2(function(n, fn) {
  // jshint unused:vars
  switch (n) {
    case 0: return function() {return fn.apply(this, arguments);};
    case 1: return function(a0) {return fn.apply(this, arguments);};
    case 2: return function(a0, a1) {return fn.apply(this, arguments);};
    case 3: return function(a0, a1, a2) {return fn.apply(this, arguments);};
    case 4: return function(a0, a1, a2, a3) {return fn.apply(this, arguments);};
    case 5: return function(a0, a1, a2, a3, a4) {return fn.apply(this, arguments);};
    case 6: return function(a0, a1, a2, a3, a4, a5) {return fn.apply(this, arguments);};
    case 7: return function(a0, a1, a2, a3, a4, a5, a6) {return fn.apply(this, arguments);};
    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) {return fn.apply(this, arguments);};
    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {return fn.apply(this, arguments);};
    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {return fn.apply(this, arguments);};
    default: throw new Error('First argument to arity must be a non-negative integer no greater than ten');
  }
});


/***/ }),

/***/ "+rd1":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("30Io");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "+wbS":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),

/***/ "/N1I":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("38t3");
var descriptor = __webpack_require__("TUEb");
var setToStringTag = __webpack_require__("9Poz");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("q1/O")(IteratorPrototype, __webpack_require__("IFGh")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "/RPK":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("z59m");
var defined = __webpack_require__("30Io");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "/X6f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * index-of <https://github.com/jonschlinkert/index-of>
 *
 * Copyright (c) 2014-2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */



module.exports = function indexOf(arr, ele, start) {
  start = start || 0;
  var idx = -1;

  if (arr == null) return idx;
  var len = arr.length;
  var i = start < 0
    ? (len + start)
    : start;

  if (i >= arr.length) {
    return -1;
  }

  while (i < len) {
    if (arr[i] === ele) {
      return i;
    }
    i++;
  }

  return -1;
};


/***/ }),

/***/ "0nnt":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "12vc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var visibleFilter = function visibleFilter() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "ALL";
  var action = arguments[1];

  switch (action.type) {
    case "ALL":
    case "ACTIVE":
    case "COMPLETED":
      return action.type;
    default:
      return state;
  }
};

exports.default = visibleFilter;

/***/ }),

/***/ "13kP":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("lSMs");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),

/***/ "1fUc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dekuState = __webpack_require__("Aalx");

var _dekuState2 = _interopRequireDefault(_dekuState);

var _deku = __webpack_require__("HIS2");

var _actions = __webpack_require__("BCOr");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import stateful from '../stateful'
var onKeyUp = function onKeyUp(state, setState, dispatch) {
  return function (e) {

    setState({ value: e.target.value });

    //enter
    if (e.which === 13) {
      if (!e.target.value.trim()) {
        return;
      }
      dispatch((0, _actions.addTodo)(state.value));
      setState({ value: '' });
    }
  };
};

var AddTodo = {
  render: function render(_ref) {
    var path = _ref.path,
        state = _ref.state,
        setState = _ref.setState,
        dispatch = _ref.dispatch;

    return (0, _deku.element)(
      'header',
      { 'class': 'header' },
      (0, _deku.element)(
        'h1',
        null,
        'todos'
      ),
      (0, _deku.element)('input', {
        'class': 'new-todo',
        placeholder: 'What needs to be done?',
        autofocus: true,
        onKeyUp: onKeyUp(state, setState, dispatch),
        value: state.value
      })
    );
  },
  initialState: function initialState() {
    return {};
  },
  shouldUpdate: function shouldUpdate(_ref2) {
    var prevState = _ref2.prevState,
        state = _ref2.state;

    return prevState.value !== state.value;
  },
  onUpdate: function onUpdate(_ref3) {
    var state = _ref3.state;
  },
  onCreate: function onCreate(_ref4) {
    var path = _ref4.path;
  }
};

exports.default = (0, _dekuState2.default)(AddTodo);

/***/ }),

/***/ "1rx+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__("9goP");
var gOPS = __webpack_require__("BWjf");
var pIE = __webpack_require__("ex+5");
var toObject = __webpack_require__("+rd1");
var IObject = __webpack_require__("z59m");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("YEmw")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "1wOi":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("Lohu");
var createDesc = __webpack_require__("TUEb");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "2o1t":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeAttribute = removeAttribute;
exports.setAttribute = setAttribute;

var _svgAttributeNamespace = __webpack_require__("ZMPZ");

var _svgAttributeNamespace2 = _interopRequireDefault(_svgAttributeNamespace);

var _element = __webpack_require__("+/Bq");

var _indexOf = __webpack_require__("/X6f");

var _indexOf2 = _interopRequireDefault(_indexOf);

var _setify = __webpack_require__("WR39");

var _setify2 = _interopRequireDefault(_setify);

var _events = __webpack_require__("t392");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removeAttribute(DOMElement, name, previousValue) {
  var eventType = _events2.default[name];
  if (eventType) {
    if (typeof previousValue === 'function') {
      DOMElement.removeEventListener(eventType, previousValue);
    }
    return;
  }
  switch (name) {
    case 'checked':
    case 'disabled':
    case 'selected':
      DOMElement[name] = false;
      break;
    case 'innerHTML':
    case 'nodeValue':
      DOMElement.innerHTML = '';
      break;
    case 'value':
      DOMElement.value = '';
      break;
    default:
      DOMElement.removeAttribute(name);
      break;
  }
}

function setAttribute(DOMElement, name, value, previousValue) {
  var eventType = _events2.default[name];
  if (value === previousValue) {
    return;
  }
  if (eventType) {
    if (typeof previousValue === 'function') {
      DOMElement.removeEventListener(eventType, previousValue);
    }
    DOMElement.addEventListener(eventType, value);
    return;
  }
  if (!(0, _element.isValidAttribute)(value)) {
    removeAttribute(DOMElement, name, previousValue);
    return;
  }
  switch (name) {
    case 'checked':
    case 'disabled':
    case 'innerHTML':
    case 'nodeValue':
      DOMElement[name] = value;
      break;
    case 'selected':
      DOMElement.selected = value;
      // Fix for IE/Safari where select is not correctly selected on change
      if (DOMElement.tagName === 'OPTION' && DOMElement.parentNode) {
        var select = DOMElement.parentNode;
        select.selectedIndex = (0, _indexOf2.default)(select.options, DOMElement);
      }
      break;
    case 'value':
      (0, _setify2.default)(DOMElement, value);
      break;
    default:
      DOMElement.setAttributeNS((0, _svgAttributeNamespace2.default)(name), name, value);
      break;
  }
}

/***/ }),

/***/ "30Io":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "38t3":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("fHSC");
var dPs = __webpack_require__("PTA0");
var enumBugKeys = __webpack_require__("M8Yd");
var IE_PROTO = __webpack_require__("qq67")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("l3hl")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("hX0p").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "4YfN":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__("aA9S");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),

/***/ "7qHl":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("X609");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "8jS/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = undefined;

var _renderString = __webpack_require__("jGrk");

var render = _renderString.renderString;

exports.render = render;

/***/ }),

/***/ "9KWK":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__("tjS7");
var $export = __webpack_require__("f68a");
var toObject = __webpack_require__("+rd1");
var call = __webpack_require__("vs8j");
var isArrayIter = __webpack_require__("rbWp");
var toLength = __webpack_require__("NU3K");
var createProperty = __webpack_require__("1wOi");
var getIterFn = __webpack_require__("wA0X");

$export($export.S + $export.F * !__webpack_require__("Ay/b")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "9Poz":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("Lohu").f;
var has = __webpack_require__("AsM0");
var TAG = __webpack_require__("IFGh")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "9goP":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("WoFR");
var enumBugKeys = __webpack_require__("M8Yd");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "Aalx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__("aA9S");

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = __webpack_require__("4YfN");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * let deku component be stateful
 * @param {Function} Component 
 */
function stateful(Component) {

  //Component as a function
  if (typeof Component === 'function') {
    Component = { render: Component };
  }

  var _Component = Component,
      _Component$shouldUpda = _Component.shouldUpdate,
      shouldUpdate = _Component$shouldUpda === undefined ? function () {
    return true;
  } : _Component$shouldUpda;

  //cache states

  var _states = {};
  //cache components
  var _components = {};
  // cache previous props and state
  var _previous = {};
  var INIT_TYPE = '_stateful_init_dispatch_type';
  /**
   * let options be with state.
   * @param {Object} options 
   */
  var model = function model(options) {
    var path = options.path;

    var state = _states[path];
    return (0, _extends3.default)({}, options, { state: state });
  };

  var _updatePrevious = function _updatePrevious(_ref) {
    var path = _ref.path,
        props = _ref.props;

    var state = _states[path];
    _previous[path] = (0, _extends3.default)({}, _previous[path], { prevProps: props, prevState: state });
  };
  /**
   * run before render, do some initial operation
   * @param {Object}
   */
  var onBefore = function onBefore(options) {
    var path = options.path,
        props = options.props,
        dispatch = options.dispatch;


    if (!Component.setState) {
      Component.setState = function (data) {
        _states[path] = (0, _extends3.default)({}, _states[path], data);
        return dispatch((0, _extends3.default)({}, _states[path], { type: INIT_TYPE }));
      };
    }

    if (!_previous[path]) {
      _previous[path] = {};
    }
    if (!_states[path]) {
      //initial state and only run one time before render.
      if (Component.initialState) {
        var s = Component.initialState({ props: props, path: path });
        _states[path] = s || {};
      }
      if (props.state) {
        _states[path] = (0, _extends3.default)({}, state, props.state);
      }

      if (Component.onBefore) {
        Component.onBefore((0, _extends3.default)({ state: state }, options));
      }
    }
  };

  /**
   * add state to onCreate
   * @param {Object} options 
   */
  var onCreate = function onCreate(options) {
    if (Component.onCreate) {
      return Component.onCreate(model(options));
    }
  };

  /**
   * add state to onCreate
   * @param {Object} options 
   */
  var onUpdate = function onUpdate(options) {
    var path = options.path,
        ret = void 0;
    var md = model(options);
    var _previous$path = _previous[path],
        prevProps = _previous$path.prevProps,
        prevState = _previous$path.prevState;

    if (Component.onUpdate && shouldUpdate && shouldUpdate((0, _extends3.default)({}, md, { prevProps: prevProps, prevState: prevState }))) {
      ret = Component.onUpdate(md);
      //update previous props and state
      _updatePrevious(options);
    }
    return ret;
  };

  /**
   * add shouldUpdate and onBefore to render
   * note that Component.onBefore only run one time.
   * @param {Object} options 
   */
  var render = function render(options) {
    onBefore(options);
    var path = options.path,
        props = options.props,
        dispatch = options.dispatch;
    var _Component2 = Component,
        setState = _Component2.setState;

    var state = _states[path];
    var _previous$path2 = _previous[path],
        prevProps = _previous$path2.prevProps,
        prevState = _previous$path2.prevState;
    //cache the component

    //you can optimise the app by using shouldUpdate

    if (!_components[path]) {
      _components[path] = Component.render((0, _extends3.default)({}, options, { state: state, setState: setState }));
      //update previous props and state when create
      _updatePrevious(options);
    } else if (shouldUpdate && shouldUpdate((0, _extends3.default)({}, options, { state: state, prevProps: prevProps, prevState: prevState }))) {
      _components[path] = Component.render((0, _extends3.default)({}, options, { state: state, setState: setState }));
    }

    return _components[path];
  };

  /**
   * reset cache when component removed
   * @param {Object} options 
   */
  var onRemove = function onRemove(options) {
    var path = options.path;

    if (Component.onRemove) {
      Component.onRemove(model(options));
    }
    delete _states[path];
    delete _components[path];
    delete _previous[path];
  };

  return (0, _assign2.default)({}, Component, {
    render: render,
    onUpdate: onUpdate,
    onCreate: onCreate,
    onRemove: onRemove
  });
}

exports.default = stateful;

/***/ }),

/***/ "AsM0":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "Ay/b":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("IFGh")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "BCOr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var nextTodoId = 0;
var addTodo = exports.addTodo = function addTodo(text) {
  return {
    text: text,
    id: nextTodoId++,
    type: 'ADD_TODO'
  };
};

var toggleTodo = exports.toggleTodo = function toggleTodo(item) {
  return {
    id: item.id,
    type: 'TOGGLE_TODO'
  };
};

var filterTodo = exports.filterTodo = function filterTodo(type) {
  return {
    type: type
  };
};

var toggleAll = exports.toggleAll = function toggleAll(flag) {
  return {
    type: 'TOGGLE_ALL',
    flag: flag
  };
};

var removeTodo = exports.removeTodo = function removeTodo(item) {
  return {
    type: 'REMOVE_TODO',
    id: item.id
  };
};

var removeCompleted = exports.removeCompleted = function removeCompleted(item) {
  return {
    type: 'REMOVE_COMPLETED'
  };
};

/***/ }),

/***/ "BWjf":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "BkJT":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "ChGC":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__("i3WN");

var _todos = __webpack_require__("VAX+");

var _todos2 = _interopRequireDefault(_todos);

var _visibilityFilter = __webpack_require__("12vc");

var _visibilityFilter2 = _interopRequireDefault(_visibilityFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var todoApp = (0, _redux.combineReducers)({
  todos: _todos2.default,
  visibilityFilter: _visibilityFilter2.default
});

exports.default = todoApp;

/***/ }),

/***/ "Dowo":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("nHY3");


/***/ }),

/***/ "EjQY":
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__("Gkcm");
var _curryN = __webpack_require__("KZiF");
var arity = __webpack_require__("+kgi");


/**
 * Returns a curried equivalent of the provided function, with the
 * specified arity. The curried function has two unusual capabilities.
 * First, its arguments needn't be provided one at a time. If `g` is
 * `R.curryN(3, f)`, the following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value `R.__` may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is `R.__`,
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var addFourNumbers = function() {
 *        return R.sum([].slice.call(arguments, 0, 4));
 *      };
 *
 *      var curriedAddFourNumbers = R.curryN(4, addFourNumbers);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */
module.exports = _curry2(function curryN(length, fn) {
  return arity(length, _curryN(length, [], fn));
});


/***/ }),

/***/ "ExXN":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("ifR3");
var $export = __webpack_require__("f68a");
var redefine = __webpack_require__("c+mw");
var hide = __webpack_require__("q1/O");
var has = __webpack_require__("AsM0");
var Iterators = __webpack_require__("Ytca");
var $iterCreate = __webpack_require__("/N1I");
var setToStringTag = __webpack_require__("9Poz");
var getPrototypeOf = __webpack_require__("SZqL");
var ITERATOR = __webpack_require__("IFGh")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "Fl16":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "GNuh":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Actions = undefined;
exports.diffAttributes = diffAttributes;
exports.diffChildren = diffChildren;
exports.diffNode = diffNode;

var _element = __webpack_require__("+/Bq");

var _dift = __webpack_require__("kTGZ");

var diffActions = _interopRequireWildcard(_dift);

var _unionType = __webpack_require__("PYXf");

var _unionType2 = _interopRequireDefault(_unionType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Any = function Any() {
  return true;
};
var Path = function Path() {
  return String;
};

/**
 * Patch actions
 */

var Actions = exports.Actions = (0, _unionType2.default)({
  setAttribute: [String, Any, Any],
  removeAttribute: [String, Any],
  insertChild: [Any, Number, Path],
  removeChild: [Number],
  updateChild: [Number, Array],
  updateChildren: [Array],
  insertBefore: [Number],
  replaceNode: [Any, Any, Path],
  removeNode: [Any],
  sameNode: [],
  updateThunk: [Any, Any, Path]
});

/**
 * Diff two attribute objects and return an array of actions that represent
 * changes to transform the old object into the new one.
 */

function diffAttributes(previous, next) {
  var setAttribute = Actions.setAttribute;
  var removeAttribute = Actions.removeAttribute;

  var changes = [];
  var pAttrs = previous.attributes;
  var nAttrs = next.attributes;

  for (var name in nAttrs) {
    if (nAttrs[name] !== pAttrs[name]) {
      changes.push(setAttribute(name, nAttrs[name], pAttrs[name]));
    }
  }

  for (var name in pAttrs) {
    if (!(name in nAttrs)) {
      changes.push(removeAttribute(name, pAttrs[name]));
    }
  }

  return changes;
}

/**
 * Compare two arrays of virtual nodes and return an array of actions
 * to transform the left into the right. A starting path is supplied that use
 * recursively to build up unique paths for each node.
 */

function diffChildren(previous, next, parentPath) {
  var insertChild = Actions.insertChild;
  var updateChild = Actions.updateChild;
  var removeChild = Actions.removeChild;
  var insertBefore = Actions.insertBefore;
  var updateChildren = Actions.updateChildren;
  var CREATE = diffActions.CREATE;
  var UPDATE = diffActions.UPDATE;
  var MOVE = diffActions.MOVE;
  var REMOVE = diffActions.REMOVE;

  var previousChildren = (0, _element.groupByKey)(previous.children);
  var nextChildren = (0, _element.groupByKey)(next.children);
  var key = function key(a) {
    return a.key;
  };
  var changes = [];

  function effect(type, prev, next, pos) {
    var nextPath = next ? (0, _element.createPath)(parentPath, next.key == null ? next.index : next.key) : null;
    switch (type) {
      case CREATE:
        {
          changes.push(insertChild(next.item, pos, nextPath));
          break;
        }
      case UPDATE:
        {
          var actions = diffNode(prev.item, next.item, nextPath);
          if (actions.length > 0) {
            changes.push(updateChild(prev.index, actions));
          }
          break;
        }
      case MOVE:
        {
          var actions = diffNode(prev.item, next.item, nextPath);
          actions.push(insertBefore(pos));
          changes.push(updateChild(prev.index, actions));
          break;
        }
      case REMOVE:
        {
          changes.push(removeChild(prev.index));
          break;
        }
    }
  }

  (0, diffActions.default)(previousChildren, nextChildren, effect, key);

  return updateChildren(changes);
}

/**
 * Compare two virtual nodes and return an array of changes to turn the left
 * into the right.
 */

function diffNode(prev, next, path) {
  var changes = [];
  var replaceNode = Actions.replaceNode;
  var setAttribute = Actions.setAttribute;
  var sameNode = Actions.sameNode;
  var removeNode = Actions.removeNode;
  var updateThunk = Actions.updateThunk;

  // No left node to compare it to
  // TODO: This should just return a createNode action

  if (prev === null || prev === undefined) {
    throw new Error('Left node must not be null or undefined');
  }

  // Bail out and skip updating this whole sub-tree
  if (prev === next) {
    changes.push(sameNode());
    return changes;
  }

  // Remove
  if (prev != null && next == null) {
    changes.push(removeNode(prev));
    return changes;
  }

  // Replace
  if (prev.type !== next.type) {
    changes.push(replaceNode(prev, next, path));
    return changes;
  }

  // Text
  if ((0, _element.isText)(next)) {
    if (prev.nodeValue !== next.nodeValue) {
      changes.push(setAttribute('nodeValue', next.nodeValue, prev.nodeValue));
    }
    return changes;
  }

  // Thunk
  if ((0, _element.isThunk)(next)) {
    if ((0, _element.isSameThunk)(prev, next)) {
      changes.push(updateThunk(prev, next, path));
    } else {
      changes.push(replaceNode(prev, next, path));
    }
    return changes;
  }

  // Empty
  if ((0, _element.isEmpty)(next)) {
    return changes;
  }

  changes = diffAttributes(prev, next);
  changes.push(diffChildren(prev, next, path));

  return changes;
}

/***/ }),

/***/ "Gkcm":
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__("e3VL");


/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry2(fn) {
  return function f2(a, b) {
    var n = arguments.length;
    if (n === 0) {
      return f2;
    } else if (n === 1 && a != null && a['@@functional/placeholder'] === true) {
      return f2;
    } else if (n === 1) {
      return _curry1(function(b) { return fn(a, b); });
    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true &&
                          b != null && b['@@functional/placeholder'] === true) {
      return f2;
    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true) {
      return _curry1(function(a) { return fn(a, b); });
    } else if (n === 2 && b != null && b['@@functional/placeholder'] === true) {
      return _curry1(function(b) { return fn(a, b); });
    } else {
      return fn(a, b);
    }
  };
};


/***/ }),

/***/ "HE4m":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),

/***/ "HIS2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.h = exports.dom = exports.diff = exports.vnode = exports.string = exports.element = exports.createApp = undefined;

var _diff = __webpack_require__("GNuh");

var diff = _interopRequireWildcard(_diff);

var _element = __webpack_require__("+/Bq");

var vnode = _interopRequireWildcard(_element);

var _string = __webpack_require__("8jS/");

var string = _interopRequireWildcard(_string);

var _dom = __webpack_require__("fSUg");

var dom = _interopRequireWildcard(_dom);

var _app = __webpack_require__("kXKG");

var app = _interopRequireWildcard(_app);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var element = vnode.create;
var h = vnode.create;
var createApp = app.create;

exports.createApp = createApp;
exports.element = element;
exports.string = string;
exports.vnode = vnode;
exports.diff = diff;
exports.dom = dom;
exports.h = h;

/***/ }),

/***/ "IFGh":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("13kP")('wks');
var uid = __webpack_require__("Fl16");
var Symbol = __webpack_require__("lSMs").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "IHPB":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__("kfHR");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),

/***/ "IcQ3":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "KZiF":
/***/ (function(module, exports, __webpack_require__) {

var arity = __webpack_require__("+kgi");


/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @return {array} An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 */
module.exports = function _curryN(length, received, fn) {
  return function() {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length &&
          (received[combinedIdx] == null ||
           received[combinedIdx]['@@functional/placeholder'] !== true ||
           argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (result == null || result['@@functional/placeholder'] !== true) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0 ? fn.apply(this, combined) : arity(left, _curryN(length, combined, fn));
  };
};


/***/ }),

/***/ "L3aI":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dekuState = __webpack_require__("Aalx");

var _dekuState2 = _interopRequireDefault(_dekuState);

var _deku = __webpack_require__("HIS2");

var _actions = __webpack_require__("BCOr");

var _TodoList = __webpack_require__("p38B");

var _TodoList2 = _interopRequireDefault(_TodoList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onClick = function onClick(dispatch, item) {
  return function (e) {
    dispatch((0, _actions.toggleTodo)(item));
  };
};
// import stateful from '../stateful'

var filterTodos = function filterTodos(todos, visibilityFilter) {
  switch (visibilityFilter) {
    case "ALL":
      return todos;
    case 'ACTIVE':
      return todos.filter(function (item) {
        return !item.completed;
      });
    case 'COMPLETED':
      return todos.filter(function (item) {
        return item.completed;
      });
  }
};

var VisibleTodoList = function VisibleTodoList(_ref) {
  var props = _ref.props,
      dispatch = _ref.dispatch;
  return (0, _deku.element)(
    'div',
    null,
    (0, _deku.element)(_TodoList2.default, { todos: filterTodos(props.todos, props.visibilityFilter) })
  );
};

exports.default = (0, _dekuState2.default)(VisibleTodoList);

/***/ }),

/***/ "LXSp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isSvgElement = __webpack_require__("WkQ1");

var namespace = 'http://www.w3.org/2000/svg';

exports.default = {
  isElement: _isSvgElement.isElement,
  namespace: namespace
};

/***/ }),

/***/ "LniK":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("MGEp")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("ExXN")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "Lohu":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("fHSC");
var IE8_DOM_DEFINE = __webpack_require__("esV0");
var toPrimitive = __webpack_require__("7qHl");
var dP = Object.defineProperty;

exports.f = __webpack_require__("PRM/") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "M8Yd":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "MGEp":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("IcQ3");
var defined = __webpack_require__("30Io");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "MaAU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__("4YfN");

var _extends3 = _interopRequireDefault(_extends2);

var _dekuState = __webpack_require__("Aalx");

var _dekuState2 = _interopRequireDefault(_dekuState);

var _deku = __webpack_require__("HIS2");

var _FilterLink = __webpack_require__("fqCP");

var _FilterLink2 = _interopRequireDefault(_FilterLink);

var _actions = __webpack_require__("BCOr");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onRemoveCompleted = function onRemoveCompleted(dispatch) {
  return function (e) {
    dispatch((0, _actions.removeCompleted)());
  };
};
// import stateful from '../stateful'


var remained = function remained(todos) {
  return todos.filter(function (item) {
    return !item.completed;
  }).length;
};

var Footer = function Footer(_ref) {
  var props = _ref.props,
      dispatch = _ref.dispatch;
  return (0, _deku.element)(
    'footer',
    { 'class': 'footer' },
    (0, _deku.element)(
      'span',
      { 'class': 'todo-count' },
      (0, _deku.element)(
        'strong',
        null,
        remained(props.todos)
      ),
      ' item left'
    ),
    (0, _deku.element)(
      'ul',
      { 'class': 'filters' },
      (0, _deku.element)(
        _FilterLink2.default,
        (0, _extends3.default)({}, props, { filter: 'ALL' }),
        'All'
      ),
      (0, _deku.element)(
        _FilterLink2.default,
        (0, _extends3.default)({}, props, { filter: 'ACTIVE' }),
        'Active'
      ),
      (0, _deku.element)(
        _FilterLink2.default,
        (0, _extends3.default)({}, props, { filter: 'COMPLETED' }),
        'Completed'
      )
    ),
    (0, _deku.element)(
      'button',
      { 'class': 'clear-completed', onClick: onRemoveCompleted(dispatch) },
      'Clear completed'
    )
  );
};

exports.default = (0, _dekuState2.default)(Footer);

/***/ }),

/***/ "NU3K":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("IcQ3");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "Ni+/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertAtIndex = undefined;
exports.default = patch;

var _setAttribute2 = __webpack_require__("2o1t");

var _element = __webpack_require__("+/Bq");

var _create = __webpack_require__("e4ZG");

var _create2 = _interopRequireDefault(_create);

var _diff = __webpack_require__("GNuh");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Modify a DOM element given an array of actions. A context can be set
 * that will be used to render any custom elements.
 */

function patch(dispatch, context) {
  return function (DOMElement, action) {
    _diff.Actions.case({
      setAttribute: function setAttribute(name, value, previousValue) {
        (0, _setAttribute2.setAttribute)(DOMElement, name, value, previousValue);
      },
      removeAttribute: function removeAttribute(name, previousValue) {
        (0, _setAttribute2.removeAttribute)(DOMElement, name, previousValue);
      },
      insertBefore: function insertBefore(index) {
        insertAtIndex(DOMElement.parentNode, index, DOMElement);
      },
      sameNode: function sameNode() {},
      updateChildren: function updateChildren(changes) {
        // Create a clone of the children so we can reference them later
        // using their original position even if they move around
        var childNodes = Array.prototype.slice.apply(DOMElement.childNodes);

        changes.forEach(function (change) {
          _diff.Actions.case({
            insertChild: function insertChild(vnode, index, path) {
              insertAtIndex(DOMElement, index, (0, _create2.default)(vnode, path, dispatch, context));
            },
            removeChild: function removeChild(index) {
              DOMElement.removeChild(childNodes[index]);
            },
            updateChild: function updateChild(index, actions) {
              var update = patch(dispatch, context);
              actions.forEach(function (action) {
                return update(childNodes[index], action);
              });
            }
          }, change);
        });
      },
      updateThunk: function updateThunk(prev, next, path) {
        var props = next.props;
        var children = next.children;
        var component = next.component;
        var onUpdate = component.onUpdate;

        var render = typeof component === 'function' ? component : component.render;
        var prevNode = prev.state.vnode;
        var model = {
          children: children,
          props: props,
          path: path,
          dispatch: dispatch,
          context: context
        };
        var nextNode = render(model);
        var changes = (0, _diff.diffNode)(prevNode, nextNode, (0, _element.createPath)(path, '0'));
        DOMElement = changes.reduce(patch(dispatch, context), DOMElement);
        if (onUpdate) onUpdate(model);
        next.state = {
          vnode: nextNode,
          model: model
        };
      },
      replaceNode: function replaceNode(prev, next, path) {
        var newEl = (0, _create2.default)(next, path, dispatch, context);
        var parentEl = DOMElement.parentNode;
        if (parentEl) parentEl.replaceChild(newEl, DOMElement);
        DOMElement = newEl;
        removeThunks(prev);
      },
      removeNode: function removeNode(prev) {
        removeThunks(prev);
        DOMElement.parentNode.removeChild(DOMElement);
        DOMElement = null;
      }
    }, action);

    return DOMElement;
  };
}

/**
 * Recursively remove all thunks
 */

function removeThunks(vnode) {
  while ((0, _element.isThunk)(vnode)) {
    var _vnode = vnode;
    var component = _vnode.component;
    var state = _vnode.state;
    var onRemove = component.onRemove;
    var model = state.model;

    if (onRemove) onRemove(model);
    vnode = state.vnode;
  }

  if (vnode.children) {
    for (var i = 0; i < vnode.children.length; i++) {
      removeThunks(vnode.children[i]);
    }
  }
}

/**
 * Slightly nicer insertBefore
 */

var insertAtIndex = exports.insertAtIndex = function insertAtIndex(parent, index, el) {
  var target = parent.childNodes[index];
  if (target) {
    parent.insertBefore(el, target);
  } else {
    parent.appendChild(el);
  }
};

/***/ }),

/***/ "PRM/":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("YEmw")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "PTA0":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("Lohu");
var anObject = __webpack_require__("fHSC");
var getKeys = __webpack_require__("9goP");

module.exports = __webpack_require__("PRM/") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "PYXf":
/***/ (function(module, exports, __webpack_require__) {

var curryN = __webpack_require__("EjQY");

function isString(s) { return typeof s === 'string'; }
function isNumber(n) { return typeof n === 'number'; }
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}
function isFunction(f) { return typeof f === 'function'; }
var isArray = Array.isArray || function(a) { return 'length' in a; };

var mapConstrToFn = curryN(2, function(group, constr) {
  return constr === String    ? isString
       : constr === Number    ? isNumber
       : constr === Object    ? isObject
       : constr === Array     ? isArray
       : constr === Function  ? isFunction
       : constr === undefined ? group
                              : constr;
});

function Constructor(group, name, validators) {
  validators = validators.map(mapConstrToFn(group));
  var constructor = curryN(validators.length, function() {
    var val = [], v, validator;
    for (var i = 0; i < arguments.length; ++i) {
      v = arguments[i];
      validator = validators[i];
      if ((typeof validator === 'function' && validator(v)) ||
          (v !== undefined && v !== null && v.of === validator)) {
        val[i] = arguments[i];
      } else {
        throw new TypeError('wrong value ' + v + ' passed to location ' + i + ' in ' + name);
      }
    }
    val.of = group;
    val.name = name;
    return val;
  });
  return constructor;
}

function rawCase(type, cases, action, arg) {
  if (type !== action.of) throw new TypeError('wrong type passed to case');
  var name = action.name in cases ? action.name
           : '_' in cases         ? '_'
                                  : undefined;
  if (name === undefined) {
    throw new Error('unhandled value passed to case');
  } else {
    return cases[name].apply(undefined, arg !== undefined ? action.concat([arg]) : action);
  }
}

var typeCase = curryN(3, rawCase);
var caseOn = curryN(4, rawCase);

function Type(desc) {
  var obj = {};
  for (var key in desc) {
    obj[key] = Constructor(obj, key, desc[key]);
  }
  obj.case = typeCase(obj);
  obj.caseOn = caseOn(obj);
  return obj;
}

module.exports = Type;


/***/ }),

/***/ "Pj9v":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (overArg);


/***/ }),

/***/ "RIJe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__("sxNY");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__("rmXf");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__("cDWF");




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (true) {
      if (typeof reducers[key] === 'undefined') {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (true) {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (true) {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}

/***/ }),

/***/ "SZqL":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("AsM0");
var toObject = __webpack_require__("+rd1");
var IE_PROTO = __webpack_require__("qq67")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "TUEb":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "VAX+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__("4YfN");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = __webpack_require__("IHPB");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var todos = function todos() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_TODO':
      return [].concat((0, _toConsumableArray3.default)(state), [{
        id: action.id,
        text: action.text,
        completed: false
      }]);
    case 'TOGGLE_TODO':
      return state.map(function (todo) {
        return todo.id === action.id ? (0, _extends3.default)({}, todo, { completed: !todo.completed }) : todo;
      });
    case 'REMOVE_TODO':
      return state.filter(function (todo) {
        return todo.id !== action.id;
      });

    case 'REMOVE_COMPLETED':
      return state.filter(function (todo) {
        return !todo.completed;
      });

    case 'TOGGLE_ALL':
      return state.map(function (todo) {
        return (0, _extends3.default)({}, todo, { completed: action.flag });
      });
    default:
      return state;
  }
};

exports.default = todos;

/***/ }),

/***/ "VVXL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);


/***/ }),

/***/ "VZrZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__("isf6");


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),

/***/ "Vfex":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("sNst");
module.exports = __webpack_require__("0nnt").Object.assign;


/***/ }),

/***/ "WK9L":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("tNH9");
var TAG = __webpack_require__("IFGh")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "WR39":
/***/ (function(module, exports, __webpack_require__) {

var naturalSelection = __webpack_require__("g4hn");

module.exports = function(element, value){
    var canSet = naturalSelection(element) && element === document.activeElement;

    if (canSet) {
        var start = element.selectionStart,
            end = element.selectionEnd;

        element.value = value;
        element.setSelectionRange(start, end);
    } else {
        element.value = value;
    }
};


/***/ }),

/***/ "WkQ1":
/***/ (function(module, exports) {

/**
 * Supported SVG elements
 *
 * @type {Array}
 */

exports.elements = {
  'animate': true,
  'circle': true,
  'defs': true,
  'ellipse': true,
  'g': true,
  'line': true,
  'linearGradient': true,
  'mask': true,
  'path': true,
  'pattern': true,
  'polygon': true,
  'polyline': true,
  'radialGradient': true,
  'rect': true,
  'stop': true,
  'svg': true,
  'text': true,
  'tspan': true
}

/**
 * Is element's namespace SVG?
 *
 * @param {String} name
 */

exports.isElement = function (name) {
  return name in exports.elements
}


/***/ }),

/***/ "WoFR":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("AsM0");
var toIObject = __webpack_require__("/RPK");
var arrayIndexOf = __webpack_require__("ZeNl")(false);
var IE_PROTO = __webpack_require__("qq67")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "X609":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "YEmw":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "Ytca":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "ZMPZ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = module.exports['default'] = SvgAttributeNamespace

/*
 * Supported SVG attribute namespaces by prefix.
 *
 * References:
 * - http://www.w3.org/TR/SVGTiny12/attributeTable.html
 * - http://www.w3.org/TR/SVG/attindex.html
 * - http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-ElSetAttrNS
 */

var namespaces = module.exports.namespaces = {
  ev: 'http://www.w3.org/2001/xml-events',
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace',
  xmlns: 'http://www.w3.org/2000/xmlns/'
}

/**
 * Get namespace of svg attribute
 *
 * @param {String} attributeName
 * @return {String} namespace
 */

function SvgAttributeNamespace (attributeName) {
  // if no prefix separator in attributeName, then no namespace
  if (attributeName.indexOf(':') === -1) return null

  // get prefix from attributeName
  var prefix = attributeName.split(':', 1)[0]

  // if prefix in supported prefixes
  if (namespaces.hasOwnProperty(prefix)) {
    // then namespace of prefix
    return namespaces[prefix]
  } else {
    // else unsupported prefix
    throw new Error('svg-attribute-namespace: prefix "' + prefix + '" is not supported by SVG.')
  }
}


/***/ }),

/***/ "ZeNl":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("/RPK");
var toLength = __webpack_require__("NU3K");
var toAbsoluteIndex = __webpack_require__("gJmu");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "aA9S":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("Vfex"), __esModule: true };

/***/ }),

/***/ "br9k":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "c+mw":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("q1/O");


/***/ }),

/***/ "cDWF":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),

/***/ "cZCE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);


/***/ }),

/***/ "dwjF":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("br9k")))

/***/ }),

/***/ "e3VL":
/***/ (function(module, exports) {

/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0) {
      return f1;
    } else if (a != null && a['@@functional/placeholder'] === true) {
      return f1;
    } else {
      return fn(a);
    }
  };
};


/***/ }),

/***/ "e4ZG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createElement;

var _element = __webpack_require__("+/Bq");

var _setAttribute = __webpack_require__("2o1t");

var _svg = __webpack_require__("LXSp");

var _svg2 = _interopRequireDefault(_svg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = {};

/**
 * Create a real DOM element from a virtual element, recursively looping down.
 * When it finds custom elements it will render them, cache them, and keep going,
 * so they are treated like any other native element.
 */

function createElement(vnode, path, dispatch, context) {
  if ((0, _element.isText)(vnode)) {
    var value = typeof vnode.nodeValue === 'string' || typeof vnode.nodeValue === 'number' ? vnode.nodeValue : '';
    return document.createTextNode(value);
  }

  if ((0, _element.isEmpty)(vnode)) {
    return document.createElement('noscript');
  }

  if ((0, _element.isThunk)(vnode)) {
    var props = vnode.props;
    var component = vnode.component;
    var children = vnode.children;
    var onCreate = component.onCreate;

    var render = typeof component === 'function' ? component : component.render;
    var model = {
      children: children,
      props: props,
      path: path,
      dispatch: dispatch,
      context: context
    };
    var output = render(model);
    var _DOMElement = createElement(output, (0, _element.createPath)(path, output.key || '0'), dispatch, context);
    if (onCreate) onCreate(model);
    vnode.state = {
      vnode: output,
      model: model
    };
    return _DOMElement;
  }

  var cached = cache[vnode.type];

  if (typeof cached === 'undefined') {
    cached = cache[vnode.type] = _svg2.default.isElement(vnode.type) ? document.createElementNS(_svg2.default.namespace, vnode.type) : document.createElement(vnode.type);
  }

  var DOMElement = cached.cloneNode(false);

  for (var name in vnode.attributes) {
    (0, _setAttribute.setAttribute)(DOMElement, name, vnode.attributes[name]);
  }

  vnode.children.forEach(function (node, index) {
    if (node === null || node === undefined) {
      return;
    }
    var child = createElement(node, (0, _element.createPath)(path, node.key || index), dispatch, context);
    DOMElement.appendChild(child);
  });

  return DOMElement;
}

/***/ }),

/***/ "eAYj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__("VZrZ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__("fYci");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__("cZCE");




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? Object(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : Object(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);


/***/ }),

/***/ "esV0":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("PRM/") && !__webpack_require__("YEmw")(function () {
  return Object.defineProperty(__webpack_require__("l3hl")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ex+5":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "f68a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("lSMs");
var core = __webpack_require__("0nnt");
var ctx = __webpack_require__("tjS7");
var hide = __webpack_require__("q1/O");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "fHSC":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("X609");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "fKa2":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("BkJT")(undefined);
// imports


// module
exports.push([module.i, "html,\nbody {\n\tmargin: 0;\n\tpadding: 0;\n}\n\nbutton {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tbackground: none;\n\tfont-size: 100%;\n\tvertical-align: baseline;\n\tfont-family: inherit;\n\tfont-weight: inherit;\n\tcolor: inherit;\n\t-webkit-appearance: none;\n\tappearance: none;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n}\n\nbody {\n\tfont: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;\n\tline-height: 1.4em;\n\tbackground: #f5f5f5;\n\tcolor: #4d4d4d;\n\tmin-width: 230px;\n\tmax-width: 550px;\n\tmargin: 0 auto;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n\tfont-weight: 300;\n}\n\n:focus {\n\toutline: 0;\n}\n\n.hidden {\n\tdisplay: none;\n}\n\n.todoapp {\n\tbackground: #fff;\n\tmargin: 130px 0 40px 0;\n\tposition: relative;\n\tbox-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),\n\t            0 25px 50px 0 rgba(0, 0, 0, 0.1);\n}\n\n.todoapp input::-webkit-input-placeholder {\n\tfont-style: italic;\n\tfont-weight: 300;\n\tcolor: #e6e6e6;\n}\n\n.todoapp input::-moz-placeholder {\n\tfont-style: italic;\n\tfont-weight: 300;\n\tcolor: #e6e6e6;\n}\n\n.todoapp input::input-placeholder {\n\tfont-style: italic;\n\tfont-weight: 300;\n\tcolor: #e6e6e6;\n}\n\n.todoapp h1 {\n\tposition: absolute;\n\ttop: -155px;\n\twidth: 100%;\n\tfont-size: 100px;\n\tfont-weight: 100;\n\ttext-align: center;\n\tcolor: rgba(175, 47, 47, 0.15);\n\t-webkit-text-rendering: optimizeLegibility;\n\t-moz-text-rendering: optimizeLegibility;\n\ttext-rendering: optimizeLegibility;\n}\n\n.new-todo,\n.edit {\n\tposition: relative;\n\tmargin: 0;\n\twidth: 100%;\n\tfont-size: 24px;\n\tfont-family: inherit;\n\tfont-weight: inherit;\n\tline-height: 1.4em;\n\tborder: 0;\n\tcolor: inherit;\n\tpadding: 6px;\n\tborder: 1px solid #999;\n\tbox-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);\n\tbox-sizing: border-box;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n}\n\n.new-todo {\n\tpadding: 16px 16px 16px 60px;\n\tborder: none;\n\tbackground: rgba(0, 0, 0, 0.003);\n\tbox-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);\n}\n\n.main {\n\tposition: relative;\n\tz-index: 2;\n\tborder-top: 1px solid #e6e6e6;\n}\n\n.toggle-all {\n\ttext-align: center;\n\tborder: none; /* Mobile Safari */\n\topacity: 0;\n\tposition: absolute;\n}\n\n.toggle-all + label {\n\twidth: 60px;\n\theight: 34px;\n\tfont-size: 0;\n\tposition: absolute;\n\ttop: -52px;\n\tleft: -13px;\n\t-webkit-transform: rotate(90deg);\n\ttransform: rotate(90deg);\n}\n\n.toggle-all + label:before {\n\tcontent: '\\276F';\n\tfont-size: 22px;\n\tcolor: #e6e6e6;\n\tpadding: 10px 27px 10px 27px;\n}\n\n.toggle-all:checked + label:before {\n\tcolor: #737373;\n}\n\n.todo-list {\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n}\n\n.todo-list li {\n\tposition: relative;\n\tfont-size: 24px;\n\tborder-bottom: 1px solid #ededed;\n}\n\n.todo-list li:last-child {\n\tborder-bottom: none;\n}\n\n.todo-list li.editing {\n\tborder-bottom: none;\n\tpadding: 0;\n}\n\n.todo-list li.editing .edit {\n\tdisplay: block;\n\twidth: 506px;\n\tpadding: 12px 16px;\n\tmargin: 0 0 0 43px;\n}\n\n.todo-list li.editing .view {\n\tdisplay: none;\n}\n\n.todo-list li .toggle {\n\ttext-align: center;\n\twidth: 40px;\n\t/* auto, since non-WebKit browsers doesn't support input styling */\n\theight: auto;\n\tposition: absolute;\n\ttop: 0;\n\tbottom: 0;\n\tmargin: auto 0;\n\tborder: none; /* Mobile Safari */\n\t-webkit-appearance: none;\n\tappearance: none;\n}\n\n.todo-list li .toggle {\n\topacity: 0;\n}\n\n.todo-list li .toggle + label {\n\t/*\n\t\tFirefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433\n\t\tIE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/\n\t*/\n\tbackground-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');\n\tbackground-repeat: no-repeat;\n\tbackground-position: center left;\n}\n\n.todo-list li .toggle:checked + label {\n\tbackground-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');\n}\n\n.todo-list li label {\n\tword-break: break-all;\n\tpadding: 15px 15px 15px 60px;\n\tdisplay: block;\n\tline-height: 1.2;\n\ttransition: color 0.4s;\n}\n\n.todo-list li.completed label {\n\tcolor: #d9d9d9;\n\ttext-decoration: line-through;\n}\n\n.todo-list li .destroy {\n\tdisplay: none;\n\tposition: absolute;\n\ttop: 0;\n\tright: 10px;\n\tbottom: 0;\n\twidth: 40px;\n\theight: 40px;\n\tmargin: auto 0;\n\tfont-size: 30px;\n\tcolor: #cc9a9a;\n\tmargin-bottom: 11px;\n\ttransition: color 0.2s ease-out;\n}\n\n.todo-list li .destroy:hover {\n\tcolor: #af5b5e;\n}\n\n.todo-list li .destroy:after {\n\tcontent: '\\D7';\n}\n\n.todo-list li:hover .destroy {\n\tdisplay: block;\n}\n\n.todo-list li .edit {\n\tdisplay: none;\n}\n\n.todo-list li.editing:last-child {\n\tmargin-bottom: -1px;\n}\n\n.footer {\n\tcolor: #777;\n\tpadding: 10px 15px;\n\theight: 20px;\n\ttext-align: center;\n\tborder-top: 1px solid #e6e6e6;\n}\n\n.footer:before {\n\tcontent: '';\n\tposition: absolute;\n\tright: 0;\n\tbottom: 0;\n\tleft: 0;\n\theight: 50px;\n\toverflow: hidden;\n\tbox-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),\n\t            0 8px 0 -3px #f6f6f6,\n\t            0 9px 1px -3px rgba(0, 0, 0, 0.2),\n\t            0 16px 0 -6px #f6f6f6,\n\t            0 17px 2px -6px rgba(0, 0, 0, 0.2);\n}\n\n.todo-count {\n\tfloat: left;\n\ttext-align: left;\n}\n\n.todo-count strong {\n\tfont-weight: 300;\n}\n\n.filters {\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n\tposition: absolute;\n\tright: 0;\n\tleft: 0;\n}\n\n.filters li {\n\tdisplay: inline;\n}\n\n.filters li a {\n\tcolor: inherit;\n\tmargin: 3px;\n\tpadding: 3px 7px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tborder-radius: 3px;\n}\n\n.filters li a:hover {\n\tborder-color: rgba(175, 47, 47, 0.1);\n}\n\n.filters li a.selected {\n\tborder-color: rgba(175, 47, 47, 0.2);\n}\n\n.clear-completed,\nhtml .clear-completed:active {\n\tfloat: right;\n\tposition: relative;\n\tline-height: 20px;\n\ttext-decoration: none;\n\tcursor: pointer;\n}\n\n.clear-completed:hover {\n\ttext-decoration: underline;\n}\n\n.info {\n\tmargin: 65px auto 0;\n\tcolor: #bfbfbf;\n\tfont-size: 10px;\n\ttext-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);\n\ttext-align: center;\n}\n\n.info p {\n\tline-height: 1;\n}\n\n.info a {\n\tcolor: inherit;\n\ttext-decoration: none;\n\tfont-weight: 400;\n}\n\n.info a:hover {\n\ttext-decoration: underline;\n}\n\n/*\n\tHack to remove background from Mobile Safari.\n\tCan't use it globally since it destroys checkboxes in Firefox\n*/\n@media screen and (-webkit-min-device-pixel-ratio:0) {\n\t.toggle-all,\n\t.todo-list li .toggle {\n\t\tbackground: none;\n\t}\n\n\t.todo-list li .toggle {\n\t\theight: 40px;\n\t}\n}\n\n@media (max-width: 430px) {\n\t.footer {\n\t\theight: 50px;\n\t}\n\n\t.filters {\n\t\tbottom: 10px;\n\t}\n}\n", ""]);

// exports


/***/ }),

/***/ "fSUg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.create = undefined;

var _create = __webpack_require__("e4ZG");

var _create2 = _interopRequireDefault(_create);

var _update = __webpack_require__("Ni+/");

var _update2 = _interopRequireDefault(_update);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.create = _create2.default;
exports.update = _update2.default;

/***/ }),

/***/ "fYci":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__("VZrZ");


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);


/***/ }),

/***/ "fqCP":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dekuState = __webpack_require__("Aalx");

var _dekuState2 = _interopRequireDefault(_dekuState);

var _deku = __webpack_require__("HIS2");

var _actions = __webpack_require__("BCOr");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import stateful from '../stateful'
var onClick = function onClick(dispatch, type) {
  return function (e) {
    dispatch((0, _actions.filterTodo)(type));
  };
};
var FilterLink = {
  render: function render(_ref) {
    var children = _ref.children,
        props = _ref.props,
        dispatch = _ref.dispatch;

    return (0, _deku.element)(
      'li',
      {
        onClick: onClick(dispatch, props.filter) },
      (0, _deku.element)(
        'a',
        { 'class': props.visibilityFilter == props.filter ? 'selected' : ''
        },
        children
      )
    );
  }
};

exports.default = (0, _dekuState2.default)(FilterLink);

/***/ }),

/***/ "g4hn":
/***/ (function(module, exports) {

var supportedTypes = ['text', 'search', 'tel', 'url', 'password'];

module.exports = function(element){
    return !!(element.setSelectionRange && ~supportedTypes.indexOf(element.type));
};


/***/ }),

/***/ "gJCT":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("LniK");
__webpack_require__("9KWK");
module.exports = __webpack_require__("0nnt").Array.from;


/***/ }),

/***/ "gJmu":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("IcQ3");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "gs7D":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),

/***/ "h85A":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dekuState = __webpack_require__("Aalx");

var _dekuState2 = _interopRequireDefault(_dekuState);

var _deku = __webpack_require__("HIS2");

var _AddTodo = __webpack_require__("1fUc");

var _AddTodo2 = _interopRequireDefault(_AddTodo);

var _VisibleTodoList = __webpack_require__("L3aI");

var _VisibleTodoList2 = _interopRequireDefault(_VisibleTodoList);

var _Footer = __webpack_require__("MaAU");

var _Footer2 = _interopRequireDefault(_Footer);

var _visibilityFilter = __webpack_require__("12vc");

var _visibilityFilter2 = _interopRequireDefault(_visibilityFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App(_ref) {
  var props = _ref.props;
  return (0, _deku.element)(
    'section',
    { 'class': 'todoapp' },
    (0, _deku.element)(_AddTodo2.default, null),
    (0, _deku.element)(_VisibleTodoList2.default, props),
    (0, _deku.element)(_Footer2.default, props)
  );
};

exports.default = (0, _dekuState2.default)(App);

/***/ }),

/***/ "hX0p":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("lSMs").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "i3WN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__("sxNY");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__("RIJe");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__("HE4m");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__("jxKi");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__("gs7D");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__("cDWF");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return __WEBPACK_IMPORTED_MODULE_1__combineReducers__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return __WEBPACK_IMPORTED_MODULE_4__compose__["a"]; });







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  Object(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}



/***/ }),

/***/ "ifR3":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "isf6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__("dwjF");


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),

/***/ "jFD6":
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "jGrk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderString = renderString;

var _element = __webpack_require__("+/Bq");

/**
 * Turn an object of key/value pairs into a HTML attribute string. This
 * function is responsible for what attributes are allowed to be rendered and
 * should handle any other special cases specific to deku.
 */

function attributesToString(attributes) {
  var str = '';
  for (var name in attributes) {
    var value = attributes[name];
    if (name === 'innerHTML') continue;
    if ((0, _element.isValidAttribute)(value)) str += ' ' + name + '="' + attributes[name] + '"';
  }
  return str;
}

/**
 * Render a virtual element to a string. You can pass in an option state context
 * object that will be given to all components.
 */

function renderString(element, context) {
  var path = arguments.length <= 2 || arguments[2] === undefined ? '0' : arguments[2];

  if ((0, _element.isText)(element)) {
    return element.nodeValue;
  }

  if ((0, _element.isEmpty)(element)) {
    return '<noscript></noscript>';
  }

  if ((0, _element.isThunk)(element)) {
    var props = element.props;
    var component = element.component;
    var _children = element.children;
    var render = component.render;

    var output = render({
      children: _children,
      props: props,
      path: path,
      context: context
    });
    return renderString(output, context, path);
  }

  var attributes = element.attributes;
  var type = element.type;
  var children = element.children;

  var innerHTML = attributes.innerHTML;
  var str = '<' + type + attributesToString(attributes) + '>';

  if (innerHTML) {
    str += innerHTML;
  } else {
    str += children.map(function (child, i) {
      return renderString(child, context, path + '.' + (child.key == null ? i : child.key));
    }).join('');
  }

  str += '</' + type + '>';
  return str;
}

/***/ }),

/***/ "jNq0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__("Pj9v");


/** Built-in value references. */
var getPrototype = Object(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),

/***/ "jfxz":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Use typed arrays if we can
 */

var FastArray = typeof Uint32Array === 'undefined' ? Array : Uint32Array;

/**
 * Bit vector
 */

function createBv(sizeInBits) {
  return new FastArray(Math.ceil(sizeInBits / 32));
}

function setBit(v, idx) {
  var r = idx % 32;
  var pos = (idx - r) / 32;

  v[pos] |= 1 << r;
}

function clearBit(v, idx) {
  var r = idx % 32;
  var pos = (idx - r) / 32;

  v[pos] &= ~(1 << r);
}

function getBit(v, idx) {
  var r = idx % 32;
  var pos = (idx - r) / 32;

  return !!(v[pos] & 1 << r);
}

/**
 * Exports
 */

exports.createBv = createBv;
exports.setBit = setBit;
exports.clearBit = clearBit;
exports.getBit = getBit;

/***/ }),

/***/ "jxKi":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyMiddleware;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__("gs7D");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),

/***/ "kTGZ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REMOVE = exports.MOVE = exports.UPDATE = exports.CREATE = undefined;

var _bitVector = __webpack_require__("jfxz");

/**
 * Actions
 */

var CREATE = 0; /**
                 * Imports
                 */

var UPDATE = 1;
var MOVE = 2;
var REMOVE = 3;

/**
 * dift
 */

function dift(prev, next, effect, key) {
  var pStartIdx = 0;
  var nStartIdx = 0;
  var pEndIdx = prev.length - 1;
  var nEndIdx = next.length - 1;
  var pStartItem = prev[pStartIdx];
  var nStartItem = next[nStartIdx];

  // List head is the same
  while (pStartIdx <= pEndIdx && nStartIdx <= nEndIdx && equal(pStartItem, nStartItem)) {
    effect(UPDATE, pStartItem, nStartItem, nStartIdx);
    pStartItem = prev[++pStartIdx];
    nStartItem = next[++nStartIdx];
  }

  // The above case is orders of magnitude more common than the others, so fast-path it
  if (nStartIdx > nEndIdx && pStartIdx > pEndIdx) {
    return;
  }

  var pEndItem = prev[pEndIdx];
  var nEndItem = next[nEndIdx];
  var movedFromFront = 0;

  // Reversed
  while (pStartIdx <= pEndIdx && nStartIdx <= nEndIdx && equal(pStartItem, nEndItem)) {
    effect(MOVE, pStartItem, nEndItem, pEndIdx - movedFromFront + 1);
    pStartItem = prev[++pStartIdx];
    nEndItem = next[--nEndIdx];
    ++movedFromFront;
  }

  // Reversed the other way (in case of e.g. reverse and append)
  while (pEndIdx >= pStartIdx && nStartIdx <= nEndIdx && equal(nStartItem, pEndItem)) {
    effect(MOVE, pEndItem, nStartItem, nStartIdx);
    pEndItem = prev[--pEndIdx];
    nStartItem = next[++nStartIdx];
    --movedFromFront;
  }

  // List tail is the same
  while (pEndIdx >= pStartIdx && nEndIdx >= nStartIdx && equal(pEndItem, nEndItem)) {
    effect(UPDATE, pEndItem, nEndItem, nEndIdx);
    pEndItem = prev[--pEndIdx];
    nEndItem = next[--nEndIdx];
  }

  if (pStartIdx > pEndIdx) {
    while (nStartIdx <= nEndIdx) {
      effect(CREATE, null, nStartItem, nStartIdx);
      nStartItem = next[++nStartIdx];
    }

    return;
  }

  if (nStartIdx > nEndIdx) {
    while (pStartIdx <= pEndIdx) {
      effect(REMOVE, pStartItem);
      pStartItem = prev[++pStartIdx];
    }

    return;
  }

  var created = 0;
  var pivotDest = null;
  var pivotIdx = pStartIdx - movedFromFront;
  var keepBase = pStartIdx;
  var keep = (0, _bitVector.createBv)(pEndIdx - pStartIdx);

  var prevMap = keyMap(prev, pStartIdx, pEndIdx + 1, key);

  for (; nStartIdx <= nEndIdx; nStartItem = next[++nStartIdx]) {
    var oldIdx = prevMap[key(nStartItem)];

    if (isUndefined(oldIdx)) {
      effect(CREATE, null, nStartItem, pivotIdx++);
      ++created;
    } else if (pStartIdx !== oldIdx) {
      (0, _bitVector.setBit)(keep, oldIdx - keepBase);
      effect(MOVE, prev[oldIdx], nStartItem, pivotIdx++);
    } else {
      pivotDest = nStartIdx;
    }
  }

  if (pivotDest !== null) {
    (0, _bitVector.setBit)(keep, 0);
    effect(MOVE, prev[pStartIdx], next[pivotDest], pivotDest);
  }

  // If there are no creations, then you have to
  // remove exactly max(prevLen - nextLen, 0) elements in this
  // diff. You have to remove one more for each element
  // that was created. This means once we have
  // removed that many, we can stop.
  var necessaryRemovals = prev.length - next.length + created;
  for (var removals = 0; removals < necessaryRemovals; pStartItem = prev[++pStartIdx]) {
    if (!(0, _bitVector.getBit)(keep, pStartIdx - keepBase)) {
      effect(REMOVE, pStartItem);
      ++removals;
    }
  }

  function equal(a, b) {
    return key(a) === key(b);
  }
}

function isUndefined(val) {
  return typeof val === 'undefined';
}

function keyMap(items, start, end, key) {
  var map = {};

  for (var i = start; i < end; ++i) {
    map[key(items[i])] = i;
  }

  return map;
}

/**
 * Exports
 */

exports.default = dift;
exports.CREATE = CREATE;
exports.UPDATE = UPDATE;
exports.MOVE = MOVE;
exports.REMOVE = REMOVE;

/***/ }),

/***/ "kXKG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _dom = __webpack_require__("fSUg");

var dom = _interopRequireWildcard(_dom);

var _diff = __webpack_require__("GNuh");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Create a DOM renderer using a container element. Everything will be rendered
 * inside of that container. Returns a function that accepts new state that can
 * replace what is currently rendered.
 */

function create(container, dispatch) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var oldVnode = null;
  var node = null;
  var rootId = options.id || '0';

  if (container && container.childNodes.length > 0) {
    container.innerHTML = '';
  }

  var update = function update(newVnode, context) {
    var changes = (0, _diff.diffNode)(oldVnode, newVnode, rootId);
    node = changes.reduce(dom.update(dispatch, context), node);
    oldVnode = newVnode;
    return node;
  };

  var create = function create(vnode, context) {
    node = dom.create(vnode, rootId, dispatch, context);
    if (container) container.appendChild(node);
    oldVnode = vnode;
    return node;
  };

  return function (vnode) {
    var context = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return node !== null ? update(vnode, context) : create(vnode, context);
  };
}

/***/ }),

/***/ "kfHR":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("gJCT"), __esModule: true };

/***/ }),

/***/ "l3hl":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("X609");
var document = __webpack_require__("lSMs").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "lSMs":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "lVK7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _App = __webpack_require__("h85A");

var _App2 = _interopRequireDefault(_App);

var _deku = __webpack_require__("HIS2");

var _redux = __webpack_require__("i3WN");

var _reducers = __webpack_require__("ChGC");

var _reducers2 = _interopRequireDefault(_reducers);

__webpack_require__("rWrL");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_reducers2.default);

var render = (0, _deku.createApp)(document.body, store.dispatch);

store.subscribe(function () {
  render((0, _deku.element)(_App2.default, store.getState()));
});

store.dispatch({ type: 'init' });

/***/ }),

/***/ "nHY3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__("+wbS");

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("br9k"), __webpack_require__("jFD6")(module)))

/***/ }),

/***/ "p38B":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dekuState = __webpack_require__("Aalx");

var _dekuState2 = _interopRequireDefault(_dekuState);

var _deku = __webpack_require__("HIS2");

var _actions = __webpack_require__("BCOr");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import stateful from '../stateful'
var onToggleTodo = function onToggleTodo(dispatch, item) {
  return function (e) {
    dispatch((0, _actions.toggleTodo)(item));
  };
};

var onToggleAll = function onToggleAll(dispatch) {
  return function (e) {
    dispatch((0, _actions.toggleAll)(e.target.checked));
  };
};

var onRemoveTodo = function onRemoveTodo(dispatch, item) {
  return function (e) {
    dispatch((0, _actions.removeTodo)(item));
  };
};

var TodoList = function TodoList(_ref) {
  var props = _ref.props,
      dispatch = _ref.dispatch;
  return (0, _deku.element)(
    'section',
    { 'class': 'main' },
    (0, _deku.element)('input', {
      id: 'toggle-all',
      'class': 'toggle-all',
      onChange: onToggleAll(dispatch),
      checked: props.todos.filter(function (item) {
        return item.completed;
      }).length == props.todos.length,
      type: 'checkbox' }),
    (0, _deku.element)(
      'label',
      { 'for': 'toggle-all' },
      'Mark all as complete'
    ),
    (0, _deku.element)(
      'ul',
      { 'class': 'todo-list' },
      props.todos.map(function (item, index) {
        return (0, _deku.element)(
          'li',
          {
            key: item.id,
            'class': item.completed ? 'completed' : '' },
          (0, _deku.element)(
            'div',
            { 'class': 'view' },
            (0, _deku.element)('input', { 'class': 'toggle', type: 'checkbox',
              checked: item.completed,
              onChange: onToggleTodo(dispatch, item) }),
            (0, _deku.element)(
              'label',
              null,
              item.text
            ),
            (0, _deku.element)('button', { 'class': 'destroy', onClick: onRemoveTodo(dispatch, item) })
          ),
          (0, _deku.element)('input', { 'class': 'edit', value: 'Create a TodoMVC template' })
        );
      })
    )
  );
};

exports.default = (0, _dekuState2.default)(TodoList);

/***/ }),

/***/ "q1/O":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("Lohu");
var createDesc = __webpack_require__("TUEb");
module.exports = __webpack_require__("PRM/") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "qq67":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("13kP")('keys');
var uid = __webpack_require__("Fl16");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "rWrL":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("fKa2");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("uOJK")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("fKa2", function() {
			var newContent = __webpack_require__("fKa2");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "rbWp":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("Ytca");
var ITERATOR = __webpack_require__("IFGh")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "rmXf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__("eAYj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__("jNq0");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__("VVXL");




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || Object(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = Object(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);


/***/ }),

/***/ "sNst":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("f68a");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("1rx+") });


/***/ }),

/***/ "sxNY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["b"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__("rmXf");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__("Dowo");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_symbol_observable__);



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = observable, _ref2;
}

/***/ }),

/***/ "t392":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Special attributes that map to DOM events.
 */

exports.default = {
  onAbort: 'abort',
  onAnimationStart: 'animationstart',
  onAnimationIteration: 'animationiteration',
  onAnimationEnd: 'animationend',
  onBlur: 'blur',
  onCanPlay: 'canplay',
  onCanPlayThrough: 'canplaythrough',
  onChange: 'change',
  onClick: 'click',
  onContextMenu: 'contextmenu',
  onCopy: 'copy',
  onCut: 'cut',
  onDoubleClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragEnter: 'dragenter',
  onDragExit: 'dragexit',
  onDragLeave: 'dragleave',
  onDragOver: 'dragover',
  onDragStart: 'dragstart',
  onDrop: 'drop',
  onDurationChange: 'durationchange',
  onEmptied: 'emptied',
  onEncrypted: 'encrypted',
  onEnded: 'ended',
  onError: 'error',
  onFocus: 'focus',
  onInput: 'input',
  onInvalid: 'invalid',
  onKeyDown: 'keydown',
  onKeyPress: 'keypress',
  onKeyUp: 'keyup',
  onLoad: 'load',
  onLoadedData: 'loadeddata',
  onLoadedMetadata: 'loadedmetadata',
  onLoadStart: 'loadstart',
  onPause: 'pause',
  onPlay: 'play',
  onPlaying: 'playing',
  onProgress: 'progress',
  onMouseDown: 'mousedown',
  onMouseEnter: 'mouseenter',
  onMouseLeave: 'mouseleave',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onPaste: 'paste',
  onRateChange: 'ratechange',
  onReset: 'reset',
  onScroll: 'scroll',
  onSeeked: 'seeked',
  onSeeking: 'seeking',
  onSubmit: 'submit',
  onStalled: 'stalled',
  onSuspend: 'suspend',
  onTimeUpdate: 'timeupdate',
  onTransitionEnd: 'transitionend',
  onTouchCancel: 'touchcancel',
  onTouchEnd: 'touchend',
  onTouchMove: 'touchmove',
  onTouchStart: 'touchstart',
  onVolumeChange: 'volumechange',
  onWaiting: 'waiting',
  onWheel: 'wheel'
};

/***/ }),

/***/ "tNH9":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "tjS7":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("x8DJ");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "uOJK":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__("udGk");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "udGk":
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "vs8j":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("fHSC");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "wA0X":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("WK9L");
var ITERATOR = __webpack_require__("IFGh")('iterator');
var Iterators = __webpack_require__("Ytca");
module.exports = __webpack_require__("0nnt").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "x8DJ":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "z59m":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("tNH9");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ })

},["lVK7"]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2Rla3VAMi4wLjAtcmMxNkBkZWt1L2xpYi9lbGVtZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fcmFtZGFAMC4xNS4xQHJhbWRhL3NyYy9hcml0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX3N5bWJvbC1vYnNlcnZhYmxlQDEuMC40QHN5bWJvbC1vYnNlcnZhYmxlL2xpYi9wb255ZmlsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2luZGV4LW9mQDAuMi4wQGluZGV4LW9mL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdWNlcnMvdmlzaWJpbGl0eUZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50L0FkZFRvZG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fZGVrdUAyLjAuMC1yYzE2QGRla3UvbGliL2RvbS9zZXRBdHRyaWJ1dGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2JhYmVsLXJ1bnRpbWVANi4yNi4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fZGVrdUAyLjAuMC1yYzE2QGRla3UvbGliL3N0cmluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fZGVrdS1zdGF0ZUAxLjAuN0BkZWt1LXN0YXRlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGV0ZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9hY3Rpb25zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19jc3MtbG9hZGVyQDAuMjguN0Bjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19zeW1ib2wtb2JzZXJ2YWJsZUAxLjAuNEBzeW1ib2wtb2JzZXJ2YWJsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX3JhbWRhQDAuMTUuMUByYW1kYS9zcmMvY3VycnlOLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19kZWt1QDIuMC4wLXJjMTZAZGVrdS9saWIvZGlmZi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX3JhbWRhQDAuMTUuMUByYW1kYS9zcmMvaW50ZXJuYWwvX2N1cnJ5Mi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX3JlZHV4QDMuNy4yQHJlZHV4L2VzL2JpbmRBY3Rpb25DcmVhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2Rla3VAMi4wLjAtcmMxNkBkZWt1L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2JhYmVsLXJ1bnRpbWVANi4yNi4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19yYW1kYUAwLjE1LjFAcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeU4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC9WaXNpYmxlVG9kb0xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19kZWt1QDIuMC4wLXJjMTZAZGVrdS9saWIvZG9tL3N2Zy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC9Gb290ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19kZWt1QDIuMC4wLXJjMTZAZGVrdS9saWIvZG9tL3VwZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX3VuaW9uLXR5cGVAMC4xLjZAdW5pb24tdHlwZS91bmlvbi10eXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fbG9kYXNoLWVzQDQuMTcuNEBsb2Rhc2gtZXMvX292ZXJBcmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19yZWR1eEAzLjcuMkByZWR1eC9lcy9jb21iaW5lUmVkdWNlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdWNlcnMvdG9kb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19sb2Rhc2gtZXNANC4xNy40QGxvZGFzaC1lcy9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19sb2Rhc2gtZXNANC4xNy40QGxvZGFzaC1lcy9fU3ltYm9sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19zZXRpZnlAMS4wLjNAc2V0aWZ5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9faXMtc3ZnLWVsZW1lbnRAMS4wLjFAaXMtc3ZnLWVsZW1lbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fc3ZnLWF0dHJpYnV0ZS1uYW1lc3BhY2VAMi4xLjBAc3ZnLWF0dHJpYnV0ZS1uYW1lc3BhY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2JhYmVsLXJ1bnRpbWVANi4yNi4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX3JlZHV4QDMuNy4yQHJlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19sb2Rhc2gtZXNANC4xNy40QGxvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19sb2Rhc2gtZXNANC4xNy40QGxvZGFzaC1lcy9fZnJlZUdsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX3JhbWRhQDAuMTUuMUByYW1kYS9zcmMvaW50ZXJuYWwvX2N1cnJ5MS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2Rla3VAMi4wLjAtcmMxNkBkZWt1L2xpYi9kb20vY3JlYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fbG9kYXNoLWVzQDQuMTcuNEBsb2Rhc2gtZXMvX2Jhc2VHZXRUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL190b2RvbXZjLWFwcC1jc3NAMi4xLjBAdG9kb212Yy1hcHAtY3NzL2luZGV4LmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2Rla3VAMi4wLjAtcmMxNkBkZWt1L2xpYi9kb20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19sb2Rhc2gtZXNANC4xNy40QGxvZGFzaC1lcy9fZ2V0UmF3VGFnLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnQvRmlsdGVyTGluay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX25hdHVyYWwtc2VsZWN0aW9uQDEuMC4wQG5hdHVyYWwtc2VsZWN0aW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fcmVkdXhAMy43LjJAcmVkdXgvZXMvY29tcG9zZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50L0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19yZWR1eEAzLjcuMkByZWR1eC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2xpYnJhcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19sb2Rhc2gtZXNANC4xNy40QGxvZGFzaC1lcy9fcm9vdC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fZGVrdUAyLjAuMC1yYzE2QGRla3UvbGliL3N0cmluZy9yZW5kZXJTdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19sb2Rhc2gtZXNANC4xNy40QGxvZGFzaC1lcy9fZ2V0UHJvdG90eXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fYml0LXZlY3RvckAwLjEuNkBiaXQtdmVjdG9yL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX3JlZHV4QDMuNy4yQHJlZHV4L2VzL2FwcGx5TWlkZGxld2FyZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2RpZnRAMC4xLjEyQGRpZnQvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fZGVrdUAyLjAuMC1yYzE2QGRla3UvbGliL2FwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2JhYmVsLXJ1bnRpbWVANi4yNi4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19zeW1ib2wtb2JzZXJ2YWJsZUAxLjAuNEBzeW1ib2wtb2JzZXJ2YWJsZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC9Ub2RvTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fdG9kb212Yy1hcHAtY3NzQDIuMS4wQHRvZG9tdmMtYXBwLWNzcy9pbmRleC5jc3M/MzNiYiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19sb2Rhc2gtZXNANC4xNy40QGxvZGFzaC1lcy9pc1BsYWluT2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX3JlZHV4QDMuNy4yQHJlZHV4L2VzL2NyZWF0ZVN0b3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fZGVrdUAyLjAuMC1yYzE2QGRla3UvbGliL2RvbS9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19zdHlsZS1sb2FkZXJAMC4xOS4wQHN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fc3R5bGUtbG9hZGVyQDAuMTkuMEBzdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIl0sIm5hbWVzIjpbInZpc2libGVGaWx0ZXIiLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJvbktleVVwIiwic2V0U3RhdGUiLCJkaXNwYXRjaCIsImUiLCJ2YWx1ZSIsInRhcmdldCIsIndoaWNoIiwidHJpbSIsIkFkZFRvZG8iLCJyZW5kZXIiLCJwYXRoIiwiaW5pdGlhbFN0YXRlIiwic2hvdWxkVXBkYXRlIiwicHJldlN0YXRlIiwib25VcGRhdGUiLCJvbkNyZWF0ZSIsIm5leHRUb2RvSWQiLCJhZGRUb2RvIiwidGV4dCIsImlkIiwidG9nZ2xlVG9kbyIsIml0ZW0iLCJmaWx0ZXJUb2RvIiwidG9nZ2xlQWxsIiwiZmxhZyIsInJlbW92ZVRvZG8iLCJyZW1vdmVDb21wbGV0ZWQiLCJ0b2RvQXBwIiwidG9kb3MiLCJ2aXNpYmlsaXR5RmlsdGVyIiwib25DbGljayIsImZpbHRlclRvZG9zIiwiZmlsdGVyIiwiY29tcGxldGVkIiwiVmlzaWJsZVRvZG9MaXN0IiwicHJvcHMiLCJvblJlbW92ZUNvbXBsZXRlZCIsInJlbWFpbmVkIiwibGVuZ3RoIiwiRm9vdGVyIiwibWFwIiwidG9kbyIsIkZpbHRlckxpbmsiLCJjaGlsZHJlbiIsIkFwcCIsInN0b3JlIiwiZG9jdW1lbnQiLCJib2R5Iiwic3Vic2NyaWJlIiwiZ2V0U3RhdGUiLCJvblRvZ2dsZVRvZG8iLCJvblRvZ2dsZUFsbCIsImNoZWNrZWQiLCJvblJlbW92ZVRvZG8iLCJUb2RvTGlzdCIsImluZGV4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0NBQWtDLDBCQUEwQiwwQ0FB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Q0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3Rix1Q0FBdUMsNkJBQTZCLFlBQVksRUFBRSxPQUFPLGlCQUFpQixtQkFBbUIsdUJBQXVCLDRFQUE0RSxFQUFFLEVBQUUsc0JBQXNCLGVBQWUsRUFBRTs7QUFFM1E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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O0FBRUEsaUJBQWlCLHVCQUF1QjtBQUN4QztBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7O0FBRWQsa0RBQWtELHNCQUFzQjtBQUN4RTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDs7QUFFQSw2QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM1V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVcsRUFBRTtBQUNyRCx3Q0FBd0MsV0FBVyxFQUFFOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHNDQUFzQztBQUN0QyxHQUFHO0FBQ0g7QUFDQSw4REFBOEQ7QUFDOUQ7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOzs7Ozs7OztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY3JlYXRlID0gY3JlYXRlO1xuZXhwb3J0cy5jcmVhdGVUZXh0RWxlbWVudCA9IGNyZWF0ZVRleHRFbGVtZW50O1xuZXhwb3J0cy5jcmVhdGVFbXB0eUVsZW1lbnQgPSBjcmVhdGVFbXB0eUVsZW1lbnQ7XG5leHBvcnRzLmNyZWF0ZVRodW5rRWxlbWVudCA9IGNyZWF0ZVRodW5rRWxlbWVudDtcbmV4cG9ydHMuaXNWYWxpZEF0dHJpYnV0ZSA9IGlzVmFsaWRBdHRyaWJ1dGU7XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gbGV0cyB1cyBjcmVhdGUgdmlydHVhbCBub2RlcyB1c2luZyBhIHNpbXBsZVxuICogc3ludGF4LiBJdCBpcyBjb21wYXRpYmxlIHdpdGggSlNYIHRyYW5zZm9ybXMgc28geW91IGNhbiB1c2VcbiAqIEpTWCB0byB3cml0ZSBub2RlcyB0aGF0IHdpbGwgY29tcGlsZSB0byB0aGlzIGZ1bmN0aW9uLlxuICpcbiAqIGxldCBub2RlID0gZWxlbWVudCgnZGl2JywgeyBpZDogJ2ZvbycgfSwgW1xuICogICBlbGVtZW50KCdhJywgeyBocmVmOiAnaHR0cDovL2dvb2dsZS5jb20nIH0sXG4gKiAgICAgZWxlbWVudCgnc3BhbicsIHt9LCAnR29vZ2xlJyksXG4gKiAgICAgZWxlbWVudCgnYicsIHt9LCAnTGluaycpXG4gKiAgIClcbiAqIF0pXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlKHR5cGUsIGF0dHJpYnV0ZXMpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNoaWxkcmVuID0gQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGNoaWxkcmVuW19rZXkgLSAyXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmICghdHlwZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignZWxlbWVudCgpIG5lZWRzIGEgdHlwZS4nKTtcblxuICBhdHRyaWJ1dGVzID0gYXR0cmlidXRlcyB8fCB7fTtcbiAgY2hpbGRyZW4gPSAoY2hpbGRyZW4gfHwgW10pLnJlZHVjZShyZWR1Y2VDaGlsZHJlbiwgW10pO1xuXG4gIHZhciBrZXkgPSB0eXBlb2YgYXR0cmlidXRlcy5rZXkgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBhdHRyaWJ1dGVzLmtleSA9PT0gJ251bWJlcicgPyBhdHRyaWJ1dGVzLmtleSA6IHVuZGVmaW5lZDtcblxuICBkZWxldGUgYXR0cmlidXRlcy5rZXk7XG5cbiAgaWYgKCh0eXBlb2YgdHlwZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodHlwZSkpID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBjcmVhdGVUaHVua0VsZW1lbnQodHlwZSwga2V5LCBhdHRyaWJ1dGVzLCBjaGlsZHJlbik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGF0dHJpYnV0ZXM6IGF0dHJpYnV0ZXMsXG4gICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgIHR5cGU6IHR5cGUsXG4gICAga2V5OiBrZXlcbiAgfTtcbn1cblxuLyoqXG4gKiBDbGVhbnMgdXAgdGhlIGFycmF5IG9mIGNoaWxkIGVsZW1lbnRzLlxuICogLSBGbGF0dGVucyBuZXN0ZWQgYXJyYXlzXG4gKiAtIENvbnZlcnRzIHJhdyBzdHJpbmdzIGFuZCBudW1iZXJzIGludG8gdm5vZGVzXG4gKiAtIEZpbHRlcnMgb3V0IHVuZGVmaW5lZCBlbGVtZW50c1xuICovXG5cbmZ1bmN0aW9uIHJlZHVjZUNoaWxkcmVuKGNoaWxkcmVuLCB2bm9kZSkge1xuICBpZiAodHlwZW9mIHZub2RlID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygdm5vZGUgPT09ICdudW1iZXInKSB7XG4gICAgY2hpbGRyZW4ucHVzaChjcmVhdGVUZXh0RWxlbWVudCh2bm9kZSkpO1xuICB9IGVsc2UgaWYgKHZub2RlID09PSBudWxsKSB7XG4gICAgY2hpbGRyZW4ucHVzaChjcmVhdGVFbXB0eUVsZW1lbnQoKSk7XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2bm9kZSkpIHtcbiAgICBjaGlsZHJlbiA9IFtdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoY2hpbGRyZW4pLCBfdG9Db25zdW1hYmxlQXJyYXkodm5vZGUucmVkdWNlKHJlZHVjZUNoaWxkcmVuLCBbXSkpKTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygdm5vZGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd2bm9kZSBjYW5cXCd0IGJlIHVuZGVmaW5lZC4gRGlkIHlvdSBtZWFuIHRvIHVzZSBudWxsPycpO1xuICB9IGVsc2Uge1xuICAgIGNoaWxkcmVuLnB1c2godm5vZGUpO1xuICB9XG4gIHJldHVybiBjaGlsZHJlbjtcbn1cblxuLyoqXG4gKiBUZXh0IG5vZGVzIGFyZSBzdG9yZWQgYXMgb2JqZWN0cyB0byBrZWVwIHRoaW5ncyBzaW1wbGVcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVUZXh0RWxlbWVudCh0ZXh0KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJyN0ZXh0JyxcbiAgICBub2RlVmFsdWU6IHRleHRcbiAgfTtcbn1cblxuLyoqXG4gKiBUZXh0IG5vZGVzIGFyZSBzdG9yZWQgYXMgb2JqZWN0cyB0byBrZWVwIHRoaW5ncyBzaW1wbGVcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVFbXB0eUVsZW1lbnQoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJyNlbXB0eSdcbiAgfTtcbn1cblxuLyoqXG4gKiBMYXppbHktcmVuZGVyZWQgdmlydHVhbCBub2Rlc1xuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZVRodW5rRWxlbWVudChjb21wb25lbnQsIGtleSwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJyN0aHVuaycsXG4gICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgIHByb3BzOiBwcm9wcyxcbiAgICBjb21wb25lbnQ6IGNvbXBvbmVudCxcbiAgICBrZXk6IGtleVxuICB9O1xufVxuXG4vKipcbiAqIElzIGEgdm5vZGUgYSB0aHVuaz9cbiAqL1xuXG52YXIgaXNUaHVuayA9IGV4cG9ydHMuaXNUaHVuayA9IGZ1bmN0aW9uIGlzVGh1bmsobm9kZSkge1xuICByZXR1cm4gbm9kZS50eXBlID09PSAnI3RodW5rJztcbn07XG5cbi8qKlxuICogSXMgYSB2bm9kZSBhIHRleHQgbm9kZT9cbiAqL1xuXG52YXIgaXNUZXh0ID0gZXhwb3J0cy5pc1RleHQgPSBmdW5jdGlvbiBpc1RleHQobm9kZSkge1xuICByZXR1cm4gbm9kZS50eXBlID09PSAnI3RleHQnO1xufTtcblxuLyoqXG4gKiBJcyBhIHZub2RlIGFuIGVtcHR5IHBsYWNlaG9sZGVyP1xuICovXG5cbnZhciBpc0VtcHR5ID0gZXhwb3J0cy5pc0VtcHR5ID0gZnVuY3Rpb24gaXNFbXB0eShub2RlKSB7XG4gIHJldHVybiBub2RlLnR5cGUgPT09ICcjZW1wdHknO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgdHdvIHZpcnR1YWwgbm9kZXMgYXJlIHRoZSBzYW1lIHR5cGVcbiAqL1xuXG52YXIgaXNTYW1lVGh1bmsgPSBleHBvcnRzLmlzU2FtZVRodW5rID0gZnVuY3Rpb24gaXNTYW1lVGh1bmsobGVmdCwgcmlnaHQpIHtcbiAgcmV0dXJuIGlzVGh1bmsobGVmdCkgJiYgaXNUaHVuayhyaWdodCkgJiYgbGVmdC5jb21wb25lbnQgPT09IHJpZ2h0LmNvbXBvbmVudDtcbn07XG5cbi8qKlxuICogR3JvdXAgYW4gYXJyYXkgb2YgdmlydHVhbCBlbGVtZW50cyBieSB0aGVpciBrZXksIHVzaW5nIGluZGV4IGFzIGEgZmFsbGJhY2suXG4gKi9cblxudmFyIGdyb3VwQnlLZXkgPSBleHBvcnRzLmdyb3VwQnlLZXkgPSBmdW5jdGlvbiBncm91cEJ5S2V5KGNoaWxkcmVuKSB7XG4gIHJldHVybiBjaGlsZHJlbi5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgY2hpbGQsIGkpIHtcbiAgICBpZiAoY2hpbGQgIT0gbnVsbCAmJiBjaGlsZCAhPT0gZmFsc2UpIHtcbiAgICAgIGFjYy5wdXNoKHtcbiAgICAgICAga2V5OiBTdHJpbmcoY2hpbGQua2V5IHx8IGkpLFxuICAgICAgICBpdGVtOiBjaGlsZCxcbiAgICAgICAgaW5kZXg6IGlcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYWNjO1xuICB9LCBbXSk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGFuIGF0dHJpYnV0ZSBzaG91bGQgYmUgcmVuZGVyZWQgaW50byB0aGUgRE9NLlxuICovXG5cbmZ1bmN0aW9uIGlzVmFsaWRBdHRyaWJ1dGUodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSByZXR1cm4gdmFsdWU7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHJldHVybiBmYWxzZTtcbiAgaWYgKHZhbHVlID09PSAnJykgcmV0dXJuIHRydWU7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBub2RlIHBhdGgsIGVnLiAoMjMsNSwyLDQpID0+ICcyMy41LjIuNCdcbiAqL1xuXG52YXIgY3JlYXRlUGF0aCA9IGV4cG9ydHMuY3JlYXRlUGF0aCA9IGZ1bmN0aW9uIGNyZWF0ZVBhdGgoKSB7XG4gIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICB9XG5cbiAgcmV0dXJuIGFyZ3Muam9pbignLicpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fZGVrdUAyLjAuMC1yYzE2QGRla3UvbGliL2VsZW1lbnQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9ICsvQnFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIFdyYXBzIGEgZnVuY3Rpb24gb2YgYW55IGFyaXR5IChpbmNsdWRpbmcgbnVsbGFyeSkgaW4gYSBmdW5jdGlvbiB0aGF0IGFjY2VwdHMgZXhhY3RseSBgbmBcbiAqIHBhcmFtZXRlcnMuIFVubGlrZSBgbkFyeWAsIHdoaWNoIHBhc3NlcyBvbmx5IGBuYCBhcmd1bWVudHMgdG8gdGhlIHdyYXBwZWQgZnVuY3Rpb24sXG4gKiBmdW5jdGlvbnMgcHJvZHVjZWQgYnkgYGFyaXR5YCB3aWxsIHBhc3MgYWxsIHByb3ZpZGVkIGFyZ3VtZW50cyB0byB0aGUgd3JhcHBlZCBmdW5jdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaWcgKE51bWJlciwgKCogLT4gKikpIC0+ICgqIC0+ICopXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBuIFRoZSBkZXNpcmVkIGFyaXR5IG9mIHRoZSByZXR1cm5lZCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHdyYXBwaW5nIGBmbmAuIFRoZSBuZXcgZnVuY3Rpb24gaXNcbiAqICAgICAgICAgZ3VhcmFudGVlZCB0byBiZSBvZiBhcml0eSBgbmAuXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2MC4xNS4wXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHRha2VzVHdvQXJncyA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAqICAgICAgICByZXR1cm4gW2EsIGJdO1xuICogICAgICB9O1xuICogICAgICB0YWtlc1R3b0FyZ3MubGVuZ3RoOyAvLz0+IDJcbiAqICAgICAgdGFrZXNUd29BcmdzKDEsIDIpOyAvLz0+IFsxLCAyXVxuICpcbiAqICAgICAgdmFyIHRha2VzT25lQXJnID0gUi5hcml0eSgxLCB0YWtlc1R3b0FyZ3MpO1xuICogICAgICB0YWtlc09uZUFyZy5sZW5ndGg7IC8vPT4gMVxuICogICAgICAvLyBBbGwgYXJndW1lbnRzIGFyZSBwYXNzZWQgdGhyb3VnaCB0byB0aGUgd3JhcHBlZCBmdW5jdGlvblxuICogICAgICB0YWtlc09uZUFyZygxLCAyKTsgLy89PiBbMSwgMl1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uKG4sIGZuKSB7XG4gIC8vIGpzaGludCB1bnVzZWQ6dmFyc1xuICBzd2l0Y2ggKG4pIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jdGlvbigpIHtyZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTt9O1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEwKSB7cmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7fTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhMCwgYTEpIHtyZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTt9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIpIHtyZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTt9O1xuICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzKSB7cmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7fTtcbiAgICBjYXNlIDU6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMywgYTQpIHtyZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTt9O1xuICAgIGNhc2UgNjogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtyZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTt9O1xuICAgIGNhc2UgNzogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2KSB7cmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7fTtcbiAgICBjYXNlIDg6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpIHtyZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTt9O1xuICAgIGNhc2UgOTogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgpIHtyZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTt9O1xuICAgIGNhc2UgMTA6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSkge3JldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO307XG4gICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCB0byBhcml0eSBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIGludGVnZXIgbm8gZ3JlYXRlciB0aGFuIHRlbicpO1xuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19yYW1kYUAwLjE1LjFAcmFtZGEvc3JjL2FyaXR5LmpzXG4vLyBtb2R1bGUgaWQgPSAra2dpXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gK3JkMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBzeW1ib2xPYnNlcnZhYmxlUG9ueWZpbGw7XG5mdW5jdGlvbiBzeW1ib2xPYnNlcnZhYmxlUG9ueWZpbGwocm9vdCkge1xuXHR2YXIgcmVzdWx0O1xuXHR2YXIgX1N5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5cdGlmICh0eXBlb2YgX1N5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGlmIChfU3ltYm9sLm9ic2VydmFibGUpIHtcblx0XHRcdHJlc3VsdCA9IF9TeW1ib2wub2JzZXJ2YWJsZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gX1N5bWJvbCgnb2JzZXJ2YWJsZScpO1xuXHRcdFx0X1N5bWJvbC5vYnNlcnZhYmxlID0gcmVzdWx0O1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXN1bHQgPSAnQEBvYnNlcnZhYmxlJztcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19zeW1ib2wtb2JzZXJ2YWJsZUAxLjAuNEBzeW1ib2wtb2JzZXJ2YWJsZS9saWIvcG9ueWZpbGwuanNcbi8vIG1vZHVsZSBpZCA9ICt3YlNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBkZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KSB7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwgeyBuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IC9OMUlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAvUlBLXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogaW5kZXgtb2YgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L2luZGV4LW9mPlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEpvbiBTY2hsaW5rZXJ0LlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmRleE9mKGFyciwgZWxlLCBzdGFydCkge1xuICBzdGFydCA9IHN0YXJ0IHx8IDA7XG4gIHZhciBpZHggPSAtMTtcblxuICBpZiAoYXJyID09IG51bGwpIHJldHVybiBpZHg7XG4gIHZhciBsZW4gPSBhcnIubGVuZ3RoO1xuICB2YXIgaSA9IHN0YXJ0IDwgMFxuICAgID8gKGxlbiArIHN0YXJ0KVxuICAgIDogc3RhcnQ7XG5cbiAgaWYgKGkgPj0gYXJyLmxlbmd0aCkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgaWYgKGFycltpXSA9PT0gZWxlKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gICAgaSsrO1xuICB9XG5cbiAgcmV0dXJuIC0xO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19pbmRleC1vZkAwLjIuMEBpbmRleC1vZi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gL1g2ZlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi41LjEnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDBubnRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG5jb25zdCB2aXNpYmxlRmlsdGVyID0gKHN0YXRlPVwiQUxMXCIsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2goYWN0aW9uLnR5cGUpe1xuICAgIGNhc2UgXCJBTExcIjogXG4gICAgY2FzZSBcIkFDVElWRVwiOlxuICAgIGNhc2UgXCJDT01QTEVURURcIjpcbiAgICAgIHJldHVybiBhY3Rpb24udHlwZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB2aXNpYmxlRmlsdGVyXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JlZHVjZXJzL3Zpc2liaWxpdHlGaWx0ZXIuanMiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qc1xuLy8gbW9kdWxlIGlkID0gMTNrUFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgc3RhdGVmdWwgZnJvbSAnZGVrdS1zdGF0ZSdcbi8vIGltcG9ydCBzdGF0ZWZ1bCBmcm9tICcuLi9zdGF0ZWZ1bCdcbmltcG9ydCB7ZWxlbWVudH0gZnJvbSAnZGVrdSdcbmltcG9ydCB7YWRkVG9kb30gZnJvbSAnLi4vYWN0aW9ucydcblxuXG5sZXQgb25LZXlVcCA9IChzdGF0ZSwgc2V0U3RhdGUsIGRpc3BhdGNoKSA9PiAoZSkgPT4ge1xuXG4gIFxuICBzZXRTdGF0ZSh7dmFsdWU6ZS50YXJnZXQudmFsdWV9KVxuICBcbiAgLy9lbnRlclxuICBpZihlLndoaWNoID09PSAxMyl7XG4gICAgaWYgKCFlLnRhcmdldC52YWx1ZS50cmltKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBkaXNwYXRjaChhZGRUb2RvKHN0YXRlLnZhbHVlKSlcbiAgICBzZXRTdGF0ZSh7dmFsdWU6Jyd9KVxuICB9XG4gIFxuXG4gIFxufVxuXG5sZXQgQWRkVG9kbyA9IHtcblxuICByZW5kZXIoe3BhdGgsIHN0YXRlLCBzZXRTdGF0ZSwgZGlzcGF0Y2h9KXsgXG4gICAgcmV0dXJuIDxoZWFkZXIgY2xhc3M9XCJoZWFkZXJcIj5cbiAgICAgIDxoMT50b2RvczwvaDE+XG4gICAgICA8aW5wdXQgXG4gICAgICAgIGNsYXNzPVwibmV3LXRvZG9cIiBcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJXaGF0IG5lZWRzIHRvIGJlIGRvbmU/XCIgXG4gICAgICAgIGF1dG9mb2N1cyBcbiAgICAgICAgb25LZXlVcD17b25LZXlVcChzdGF0ZSwgc2V0U3RhdGUsIGRpc3BhdGNoKX1cbiAgICAgICAgdmFsdWU9e3N0YXRlLnZhbHVlfVxuICAgICAgLz5cbiAgICA8L2hlYWRlcj5cbiAgfSxcblxuICBpbml0aWFsU3RhdGUoKXtcbiAgICByZXR1cm4ge31cbiAgfSxcblxuICBzaG91bGRVcGRhdGUoe3ByZXZTdGF0ZSwgc3RhdGV9KXtcbiAgICByZXR1cm4gcHJldlN0YXRlLnZhbHVlICE9PSBzdGF0ZS52YWx1ZVxuICB9LFxuXG4gIG9uVXBkYXRlKHtzdGF0ZX0pe1xuICAgIFxuICB9LFxuXG4gIG9uQ3JlYXRlKHtwYXRofSl7XG4gICAgXG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBzdGF0ZWZ1bChBZGRUb2RvKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnQvQWRkVG9kby5qcyIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDFyeCtcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgaW5kZXgsIHZhbHVlKSB7XG4gIGlmIChpbmRleCBpbiBvYmplY3QpICRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NyZWF0ZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMXdPaVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnJlbW92ZUF0dHJpYnV0ZSA9IHJlbW92ZUF0dHJpYnV0ZTtcbmV4cG9ydHMuc2V0QXR0cmlidXRlID0gc2V0QXR0cmlidXRlO1xuXG52YXIgX3N2Z0F0dHJpYnV0ZU5hbWVzcGFjZSA9IHJlcXVpcmUoJ3N2Zy1hdHRyaWJ1dGUtbmFtZXNwYWNlJyk7XG5cbnZhciBfc3ZnQXR0cmlidXRlTmFtZXNwYWNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N2Z0F0dHJpYnV0ZU5hbWVzcGFjZSk7XG5cbnZhciBfZWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxudmFyIF9pbmRleE9mID0gcmVxdWlyZSgnaW5kZXgtb2YnKTtcblxudmFyIF9pbmRleE9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luZGV4T2YpO1xuXG52YXIgX3NldGlmeSA9IHJlcXVpcmUoJ3NldGlmeScpO1xuXG52YXIgX3NldGlmeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zZXRpZnkpO1xuXG52YXIgX2V2ZW50cyA9IHJlcXVpcmUoJy4vZXZlbnRzJyk7XG5cbnZhciBfZXZlbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V2ZW50cyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHJlbW92ZUF0dHJpYnV0ZShET01FbGVtZW50LCBuYW1lLCBwcmV2aW91c1ZhbHVlKSB7XG4gIHZhciBldmVudFR5cGUgPSBfZXZlbnRzMi5kZWZhdWx0W25hbWVdO1xuICBpZiAoZXZlbnRUeXBlKSB7XG4gICAgaWYgKHR5cGVvZiBwcmV2aW91c1ZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBET01FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBwcmV2aW91c1ZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIHN3aXRjaCAobmFtZSkge1xuICAgIGNhc2UgJ2NoZWNrZWQnOlxuICAgIGNhc2UgJ2Rpc2FibGVkJzpcbiAgICBjYXNlICdzZWxlY3RlZCc6XG4gICAgICBET01FbGVtZW50W25hbWVdID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdpbm5lckhUTUwnOlxuICAgIGNhc2UgJ25vZGVWYWx1ZSc6XG4gICAgICBET01FbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndmFsdWUnOlxuICAgICAgRE9NRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIERPTUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlKERPTUVsZW1lbnQsIG5hbWUsIHZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XG4gIHZhciBldmVudFR5cGUgPSBfZXZlbnRzMi5kZWZhdWx0W25hbWVdO1xuICBpZiAodmFsdWUgPT09IHByZXZpb3VzVmFsdWUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGV2ZW50VHlwZSkge1xuICAgIGlmICh0eXBlb2YgcHJldmlvdXNWYWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgRE9NRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgcHJldmlvdXNWYWx1ZSk7XG4gICAgfVxuICAgIERPTUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHZhbHVlKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCEoMCwgX2VsZW1lbnQuaXNWYWxpZEF0dHJpYnV0ZSkodmFsdWUpKSB7XG4gICAgcmVtb3ZlQXR0cmlidXRlKERPTUVsZW1lbnQsIG5hbWUsIHByZXZpb3VzVmFsdWUpO1xuICAgIHJldHVybjtcbiAgfVxuICBzd2l0Y2ggKG5hbWUpIHtcbiAgICBjYXNlICdjaGVja2VkJzpcbiAgICBjYXNlICdkaXNhYmxlZCc6XG4gICAgY2FzZSAnaW5uZXJIVE1MJzpcbiAgICBjYXNlICdub2RlVmFsdWUnOlxuICAgICAgRE9NRWxlbWVudFtuYW1lXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnc2VsZWN0ZWQnOlxuICAgICAgRE9NRWxlbWVudC5zZWxlY3RlZCA9IHZhbHVlO1xuICAgICAgLy8gRml4IGZvciBJRS9TYWZhcmkgd2hlcmUgc2VsZWN0IGlzIG5vdCBjb3JyZWN0bHkgc2VsZWN0ZWQgb24gY2hhbmdlXG4gICAgICBpZiAoRE9NRWxlbWVudC50YWdOYW1lID09PSAnT1BUSU9OJyAmJiBET01FbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgICAgdmFyIHNlbGVjdCA9IERPTUVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgc2VsZWN0LnNlbGVjdGVkSW5kZXggPSAoMCwgX2luZGV4T2YyLmRlZmF1bHQpKHNlbGVjdC5vcHRpb25zLCBET01FbGVtZW50KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3ZhbHVlJzpcbiAgICAgICgwLCBfc2V0aWZ5Mi5kZWZhdWx0KShET01FbGVtZW50LCB2YWx1ZSk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgRE9NRWxlbWVudC5zZXRBdHRyaWJ1dGVOUygoMCwgX3N2Z0F0dHJpYnV0ZU5hbWVzcGFjZTIuZGVmYXVsdCkobmFtZSksIG5hbWUsIHZhbHVlKTtcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2Rla3VAMi4wLjAtcmMxNkBkZWt1L2xpYi9kb20vc2V0QXR0cmlidXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAybzF0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qc1xuLy8gbW9kdWxlIGlkID0gMzBJb1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGRQcyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBFbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpO1xuICB2YXIgaSA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgdmFyIGx0ID0gJzwnO1xuICB2YXIgZ3QgPSAnPic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZSAoaS0tKSBkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHkoKTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzh0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvYXNzaWduXCIpO1xuXG52YXIgX2Fzc2lnbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hc3NpZ24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfYXNzaWduMi5kZWZhdWx0IHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fYmFiZWwtcnVudGltZUA2LjI2LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanNcbi8vIG1vZHVsZSBpZCA9IDRZZk5cbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gN3FIbFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnJlbmRlciA9IHVuZGVmaW5lZDtcblxudmFyIF9yZW5kZXJTdHJpbmcgPSByZXF1aXJlKCcuL3JlbmRlclN0cmluZycpO1xuXG52YXIgcmVuZGVyID0gX3JlbmRlclN0cmluZy5yZW5kZXJTdHJpbmc7XG5cbmV4cG9ydHMucmVuZGVyID0gcmVuZGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19kZWt1QDIuMC4wLXJjMTZAZGVrdS9saWIvc3RyaW5nL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA4alMvXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJyk7XG52YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJGbiA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24gKGl0ZXIpIHsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZSAvKiAsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkICovKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdChhcnJheUxpa2UpO1xuICAgIHZhciBDID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheTtcbiAgICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIG1hcGZuID0gYUxlbiA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gICAgdmFyIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGl0ZXJGbiA9IGdldEl0ZXJGbihPKTtcbiAgICB2YXIgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmIChtYXBwaW5nKSBtYXBmbiA9IGN0eChtYXBmbiwgYUxlbiA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmIChpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSkge1xuICAgICAgZm9yIChpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQygpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IgKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gOUtXS1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIHRhZywgc3RhdCkge1xuICBpZiAoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkgZGVmKGl0LCBUQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qc1xuLy8gbW9kdWxlIGlkID0gOVBvelxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA5Z29QXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbicpO1xuXG52YXIgX2Fzc2lnbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hc3NpZ24pO1xuXG52YXIgX2V4dGVuZHMyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMnKTtcblxudmFyIF9leHRlbmRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4dGVuZHMyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBsZXQgZGVrdSBjb21wb25lbnQgYmUgc3RhdGVmdWxcbiAqIEBwYXJhbSB7RnVuY3Rpb259IENvbXBvbmVudCBcbiAqL1xuZnVuY3Rpb24gc3RhdGVmdWwoQ29tcG9uZW50KSB7XG5cbiAgLy9Db21wb25lbnQgYXMgYSBmdW5jdGlvblxuICBpZiAodHlwZW9mIENvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIENvbXBvbmVudCA9IHsgcmVuZGVyOiBDb21wb25lbnQgfTtcbiAgfVxuXG4gIHZhciBfQ29tcG9uZW50ID0gQ29tcG9uZW50LFxuICAgICAgX0NvbXBvbmVudCRzaG91bGRVcGRhID0gX0NvbXBvbmVudC5zaG91bGRVcGRhdGUsXG4gICAgICBzaG91bGRVcGRhdGUgPSBfQ29tcG9uZW50JHNob3VsZFVwZGEgPT09IHVuZGVmaW5lZCA/IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSA6IF9Db21wb25lbnQkc2hvdWxkVXBkYTtcblxuICAvL2NhY2hlIHN0YXRlc1xuXG4gIHZhciBfc3RhdGVzID0ge307XG4gIC8vY2FjaGUgY29tcG9uZW50c1xuICB2YXIgX2NvbXBvbmVudHMgPSB7fTtcbiAgLy8gY2FjaGUgcHJldmlvdXMgcHJvcHMgYW5kIHN0YXRlXG4gIHZhciBfcHJldmlvdXMgPSB7fTtcbiAgdmFyIElOSVRfVFlQRSA9ICdfc3RhdGVmdWxfaW5pdF9kaXNwYXRjaF90eXBlJztcbiAgLyoqXG4gICAqIGxldCBvcHRpb25zIGJlIHdpdGggc3RhdGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFxuICAgKi9cbiAgdmFyIG1vZGVsID0gZnVuY3Rpb24gbW9kZWwob3B0aW9ucykge1xuICAgIHZhciBwYXRoID0gb3B0aW9ucy5wYXRoO1xuXG4gICAgdmFyIHN0YXRlID0gX3N0YXRlc1twYXRoXTtcbiAgICByZXR1cm4gKDAsIF9leHRlbmRzMy5kZWZhdWx0KSh7fSwgb3B0aW9ucywgeyBzdGF0ZTogc3RhdGUgfSk7XG4gIH07XG5cbiAgdmFyIF91cGRhdGVQcmV2aW91cyA9IGZ1bmN0aW9uIF91cGRhdGVQcmV2aW91cyhfcmVmKSB7XG4gICAgdmFyIHBhdGggPSBfcmVmLnBhdGgsXG4gICAgICAgIHByb3BzID0gX3JlZi5wcm9wcztcblxuICAgIHZhciBzdGF0ZSA9IF9zdGF0ZXNbcGF0aF07XG4gICAgX3ByZXZpb3VzW3BhdGhdID0gKDAsIF9leHRlbmRzMy5kZWZhdWx0KSh7fSwgX3ByZXZpb3VzW3BhdGhdLCB7IHByZXZQcm9wczogcHJvcHMsIHByZXZTdGF0ZTogc3RhdGUgfSk7XG4gIH07XG4gIC8qKlxuICAgKiBydW4gYmVmb3JlIHJlbmRlciwgZG8gc29tZSBpbml0aWFsIG9wZXJhdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH1cbiAgICovXG4gIHZhciBvbkJlZm9yZSA9IGZ1bmN0aW9uIG9uQmVmb3JlKG9wdGlvbnMpIHtcbiAgICB2YXIgcGF0aCA9IG9wdGlvbnMucGF0aCxcbiAgICAgICAgcHJvcHMgPSBvcHRpb25zLnByb3BzLFxuICAgICAgICBkaXNwYXRjaCA9IG9wdGlvbnMuZGlzcGF0Y2g7XG5cblxuICAgIGlmICghQ29tcG9uZW50LnNldFN0YXRlKSB7XG4gICAgICBDb21wb25lbnQuc2V0U3RhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBfc3RhdGVzW3BhdGhdID0gKDAsIF9leHRlbmRzMy5kZWZhdWx0KSh7fSwgX3N0YXRlc1twYXRoXSwgZGF0YSk7XG4gICAgICAgIHJldHVybiBkaXNwYXRjaCgoMCwgX2V4dGVuZHMzLmRlZmF1bHQpKHt9LCBfc3RhdGVzW3BhdGhdLCB7IHR5cGU6IElOSVRfVFlQRSB9KSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICghX3ByZXZpb3VzW3BhdGhdKSB7XG4gICAgICBfcHJldmlvdXNbcGF0aF0gPSB7fTtcbiAgICB9XG4gICAgaWYgKCFfc3RhdGVzW3BhdGhdKSB7XG4gICAgICAvL2luaXRpYWwgc3RhdGUgYW5kIG9ubHkgcnVuIG9uZSB0aW1lIGJlZm9yZSByZW5kZXIuXG4gICAgICBpZiAoQ29tcG9uZW50LmluaXRpYWxTdGF0ZSkge1xuICAgICAgICB2YXIgcyA9IENvbXBvbmVudC5pbml0aWFsU3RhdGUoeyBwcm9wczogcHJvcHMsIHBhdGg6IHBhdGggfSk7XG4gICAgICAgIF9zdGF0ZXNbcGF0aF0gPSBzIHx8IHt9O1xuICAgICAgfVxuICAgICAgaWYgKHByb3BzLnN0YXRlKSB7XG4gICAgICAgIF9zdGF0ZXNbcGF0aF0gPSAoMCwgX2V4dGVuZHMzLmRlZmF1bHQpKHt9LCBzdGF0ZSwgcHJvcHMuc3RhdGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoQ29tcG9uZW50Lm9uQmVmb3JlKSB7XG4gICAgICAgIENvbXBvbmVudC5vbkJlZm9yZSgoMCwgX2V4dGVuZHMzLmRlZmF1bHQpKHsgc3RhdGU6IHN0YXRlIH0sIG9wdGlvbnMpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIGFkZCBzdGF0ZSB0byBvbkNyZWF0ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBcbiAgICovXG4gIHZhciBvbkNyZWF0ZSA9IGZ1bmN0aW9uIG9uQ3JlYXRlKG9wdGlvbnMpIHtcbiAgICBpZiAoQ29tcG9uZW50Lm9uQ3JlYXRlKSB7XG4gICAgICByZXR1cm4gQ29tcG9uZW50Lm9uQ3JlYXRlKG1vZGVsKG9wdGlvbnMpKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIGFkZCBzdGF0ZSB0byBvbkNyZWF0ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBcbiAgICovXG4gIHZhciBvblVwZGF0ZSA9IGZ1bmN0aW9uIG9uVXBkYXRlKG9wdGlvbnMpIHtcbiAgICB2YXIgcGF0aCA9IG9wdGlvbnMucGF0aCxcbiAgICAgICAgcmV0ID0gdm9pZCAwO1xuICAgIHZhciBtZCA9IG1vZGVsKG9wdGlvbnMpO1xuICAgIHZhciBfcHJldmlvdXMkcGF0aCA9IF9wcmV2aW91c1twYXRoXSxcbiAgICAgICAgcHJldlByb3BzID0gX3ByZXZpb3VzJHBhdGgucHJldlByb3BzLFxuICAgICAgICBwcmV2U3RhdGUgPSBfcHJldmlvdXMkcGF0aC5wcmV2U3RhdGU7XG5cbiAgICBpZiAoQ29tcG9uZW50Lm9uVXBkYXRlICYmIHNob3VsZFVwZGF0ZSAmJiBzaG91bGRVcGRhdGUoKDAsIF9leHRlbmRzMy5kZWZhdWx0KSh7fSwgbWQsIHsgcHJldlByb3BzOiBwcmV2UHJvcHMsIHByZXZTdGF0ZTogcHJldlN0YXRlIH0pKSkge1xuICAgICAgcmV0ID0gQ29tcG9uZW50Lm9uVXBkYXRlKG1kKTtcbiAgICAgIC8vdXBkYXRlIHByZXZpb3VzIHByb3BzIGFuZCBzdGF0ZVxuICAgICAgX3VwZGF0ZVByZXZpb3VzKG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9O1xuXG4gIC8qKlxuICAgKiBhZGQgc2hvdWxkVXBkYXRlIGFuZCBvbkJlZm9yZSB0byByZW5kZXJcbiAgICogbm90ZSB0aGF0IENvbXBvbmVudC5vbkJlZm9yZSBvbmx5IHJ1biBvbmUgdGltZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgXG4gICAqL1xuICB2YXIgcmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKG9wdGlvbnMpIHtcbiAgICBvbkJlZm9yZShvcHRpb25zKTtcbiAgICB2YXIgcGF0aCA9IG9wdGlvbnMucGF0aCxcbiAgICAgICAgcHJvcHMgPSBvcHRpb25zLnByb3BzLFxuICAgICAgICBkaXNwYXRjaCA9IG9wdGlvbnMuZGlzcGF0Y2g7XG4gICAgdmFyIF9Db21wb25lbnQyID0gQ29tcG9uZW50LFxuICAgICAgICBzZXRTdGF0ZSA9IF9Db21wb25lbnQyLnNldFN0YXRlO1xuXG4gICAgdmFyIHN0YXRlID0gX3N0YXRlc1twYXRoXTtcbiAgICB2YXIgX3ByZXZpb3VzJHBhdGgyID0gX3ByZXZpb3VzW3BhdGhdLFxuICAgICAgICBwcmV2UHJvcHMgPSBfcHJldmlvdXMkcGF0aDIucHJldlByb3BzLFxuICAgICAgICBwcmV2U3RhdGUgPSBfcHJldmlvdXMkcGF0aDIucHJldlN0YXRlO1xuICAgIC8vY2FjaGUgdGhlIGNvbXBvbmVudFxuXG4gICAgLy95b3UgY2FuIG9wdGltaXNlIHRoZSBhcHAgYnkgdXNpbmcgc2hvdWxkVXBkYXRlXG5cbiAgICBpZiAoIV9jb21wb25lbnRzW3BhdGhdKSB7XG4gICAgICBfY29tcG9uZW50c1twYXRoXSA9IENvbXBvbmVudC5yZW5kZXIoKDAsIF9leHRlbmRzMy5kZWZhdWx0KSh7fSwgb3B0aW9ucywgeyBzdGF0ZTogc3RhdGUsIHNldFN0YXRlOiBzZXRTdGF0ZSB9KSk7XG4gICAgICAvL3VwZGF0ZSBwcmV2aW91cyBwcm9wcyBhbmQgc3RhdGUgd2hlbiBjcmVhdGVcbiAgICAgIF91cGRhdGVQcmV2aW91cyhvcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKHNob3VsZFVwZGF0ZSAmJiBzaG91bGRVcGRhdGUoKDAsIF9leHRlbmRzMy5kZWZhdWx0KSh7fSwgb3B0aW9ucywgeyBzdGF0ZTogc3RhdGUsIHByZXZQcm9wczogcHJldlByb3BzLCBwcmV2U3RhdGU6IHByZXZTdGF0ZSB9KSkpIHtcbiAgICAgIF9jb21wb25lbnRzW3BhdGhdID0gQ29tcG9uZW50LnJlbmRlcigoMCwgX2V4dGVuZHMzLmRlZmF1bHQpKHt9LCBvcHRpb25zLCB7IHN0YXRlOiBzdGF0ZSwgc2V0U3RhdGU6IHNldFN0YXRlIH0pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2NvbXBvbmVudHNbcGF0aF07XG4gIH07XG5cbiAgLyoqXG4gICAqIHJlc2V0IGNhY2hlIHdoZW4gY29tcG9uZW50IHJlbW92ZWRcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgXG4gICAqL1xuICB2YXIgb25SZW1vdmUgPSBmdW5jdGlvbiBvblJlbW92ZShvcHRpb25zKSB7XG4gICAgdmFyIHBhdGggPSBvcHRpb25zLnBhdGg7XG5cbiAgICBpZiAoQ29tcG9uZW50Lm9uUmVtb3ZlKSB7XG4gICAgICBDb21wb25lbnQub25SZW1vdmUobW9kZWwob3B0aW9ucykpO1xuICAgIH1cbiAgICBkZWxldGUgX3N0YXRlc1twYXRoXTtcbiAgICBkZWxldGUgX2NvbXBvbmVudHNbcGF0aF07XG4gICAgZGVsZXRlIF9wcmV2aW91c1twYXRoXTtcbiAgfTtcblxuICByZXR1cm4gKDAsIF9hc3NpZ24yLmRlZmF1bHQpKHt9LCBDb21wb25lbnQsIHtcbiAgICByZW5kZXI6IHJlbmRlcixcbiAgICBvblVwZGF0ZTogb25VcGRhdGUsXG4gICAgb25DcmVhdGU6IG9uQ3JlYXRlLFxuICAgIG9uUmVtb3ZlOiBvblJlbW92ZVxuICB9KTtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gc3RhdGVmdWw7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2Rla3Utc3RhdGVAMS4wLjdAZGVrdS1zdGF0ZS9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IEFhbHhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanNcbi8vIG1vZHVsZSBpZCA9IEFzTTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24gKCkgeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdGhyb3ctbGl0ZXJhbFxuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbiAoKSB7IHRocm93IDI7IH0pO1xufSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMsIHNraXBDbG9zaW5nKSB7XG4gIGlmICghc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORykgcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBbN107XG4gICAgdmFyIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4geyBkb25lOiBzYWZlID0gdHJ1ZSB9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qc1xuLy8gbW9kdWxlIGlkID0gQXkvYlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJsZXQgbmV4dFRvZG9JZCA9IDBcbmV4cG9ydCBjb25zdCBhZGRUb2RvID0gKHRleHQpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0ZXh0LCBcbiAgICBpZDogbmV4dFRvZG9JZCsrLFxuICAgIHR5cGU6ICdBRERfVE9ETydcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdG9nZ2xlVG9kbyA9IChpdGVtKSA9PiB7XG4gIHJldHVybiB7XG4gICAgaWQ6IGl0ZW0uaWQsXG4gICAgdHlwZTogJ1RPR0dMRV9UT0RPJ1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXJUb2RvID0gKHR5cGUpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHRvZ2dsZUFsbCA9IChmbGFnKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ1RPR0dMRV9BTEwnLFxuICAgIGZsYWdcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVtb3ZlVG9kbyA9IChpdGVtKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ1JFTU9WRV9UT0RPJyxcbiAgICBpZDogaXRlbS5pZFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCByZW1vdmVDb21wbGV0ZWQgPSAoaXRlbSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdSRU1PVkVfQ09NUExFVEVEJ1xuICB9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hY3Rpb25zL2luZGV4LmpzIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qc1xuLy8gbW9kdWxlIGlkID0gQldqZlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fY3NzLWxvYWRlckAwLjI4LjdAY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IEJrSlRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgdG9kb3MgZnJvbSAnLi90b2RvcydcbmltcG9ydCB2aXNpYmlsaXR5RmlsdGVyIGZyb20gJy4vdmlzaWJpbGl0eUZpbHRlcidcblxuY29uc3QgdG9kb0FwcCA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIHRvZG9zLFxuICB2aXNpYmlsaXR5RmlsdGVyXG59KVxuXG5leHBvcnQgZGVmYXVsdCB0b2RvQXBwXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmVkdWNlcnMvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2luZGV4Jyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fc3ltYm9sLW9ic2VydmFibGVAMS4wLjRAc3ltYm9sLW9ic2VydmFibGUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IERvd29cbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBfY3VycnlOID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnlOJyk7XG52YXIgYXJpdHkgPSByZXF1aXJlKCcuL2FyaXR5Jyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgY3VycmllZCBlcXVpdmFsZW50IG9mIHRoZSBwcm92aWRlZCBmdW5jdGlvbiwgd2l0aCB0aGVcbiAqIHNwZWNpZmllZCBhcml0eS4gVGhlIGN1cnJpZWQgZnVuY3Rpb24gaGFzIHR3byB1bnVzdWFsIGNhcGFiaWxpdGllcy5cbiAqIEZpcnN0LCBpdHMgYXJndW1lbnRzIG5lZWRuJ3QgYmUgcHJvdmlkZWQgb25lIGF0IGEgdGltZS4gSWYgYGdgIGlzXG4gKiBgUi5jdXJyeU4oMywgZilgLCB0aGUgZm9sbG93aW5nIGFyZSBlcXVpdmFsZW50OlxuICpcbiAqICAgLSBgZygxKSgyKSgzKWBcbiAqICAgLSBgZygxKSgyLCAzKWBcbiAqICAgLSBgZygxLCAyKSgzKWBcbiAqICAgLSBgZygxLCAyLCAzKWBcbiAqXG4gKiBTZWNvbmRseSwgdGhlIHNwZWNpYWwgcGxhY2Vob2xkZXIgdmFsdWUgYFIuX19gIG1heSBiZSB1c2VkIHRvIHNwZWNpZnlcbiAqIFwiZ2Fwc1wiLCBhbGxvd2luZyBwYXJ0aWFsIGFwcGxpY2F0aW9uIG9mIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMsXG4gKiByZWdhcmRsZXNzIG9mIHRoZWlyIHBvc2l0aW9ucy4gSWYgYGdgIGlzIGFzIGFib3ZlIGFuZCBgX2AgaXMgYFIuX19gLFxuICogdGhlIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKiAgIC0gYGcoXywgMiwgMykoMSlgXG4gKiAgIC0gYGcoXywgXywgMykoMSkoMilgXG4gKiAgIC0gYGcoXywgXywgMykoMSwgMilgXG4gKiAgIC0gYGcoXywgMikoMSkoMylgXG4gKiAgIC0gYGcoXywgMikoMSwgMylgXG4gKiAgIC0gYGcoXywgMikoXywgMykoMSlgXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgTnVtYmVyIC0+ICgqIC0+IGEpIC0+ICgqIC0+IGEpXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIFRoZSBhcml0eSBmb3IgdGhlIHJldHVybmVkIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3LCBjdXJyaWVkIGZ1bmN0aW9uLlxuICogQHNlZSBSLmN1cnJ5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGFkZEZvdXJOdW1iZXJzID0gZnVuY3Rpb24oKSB7XG4gKiAgICAgICAgcmV0dXJuIFIuc3VtKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCA0KSk7XG4gKiAgICAgIH07XG4gKlxuICogICAgICB2YXIgY3VycmllZEFkZEZvdXJOdW1iZXJzID0gUi5jdXJyeU4oNCwgYWRkRm91ck51bWJlcnMpO1xuICogICAgICB2YXIgZiA9IGN1cnJpZWRBZGRGb3VyTnVtYmVycygxLCAyKTtcbiAqICAgICAgdmFyIGcgPSBmKDMpO1xuICogICAgICBnKDQpOyAvLz0+IDEwXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBjdXJyeU4obGVuZ3RoLCBmbikge1xuICByZXR1cm4gYXJpdHkobGVuZ3RoLCBfY3VycnlOKGxlbmd0aCwgW10sIGZuKSk7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19yYW1kYUAwLjE1LjFAcmFtZGEvc3JjL2N1cnJ5Ti5qc1xuLy8gbW9kdWxlIGlkID0gRWpRWVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgJGl0ZXJDcmVhdGUgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpOyAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG52YXIgRkZfSVRFUkFUT1IgPSAnQEBpdGVyYXRvcic7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24gKGtpbmQpIHtcbiAgICBpZiAoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pIHJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTO1xuICB2YXIgVkFMVUVTX0JVRyA9IGZhbHNlO1xuICB2YXIgcHJvdG8gPSBCYXNlLnByb3RvdHlwZTtcbiAgdmFyICRuYXRpdmUgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF07XG4gIHZhciAkZGVmYXVsdCA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpO1xuICB2YXIgJGVudHJpZXMgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkO1xuICB2YXIgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmU7XG4gIHZhciBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmICgkYW55TmF0aXZlKSB7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYgKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSkgaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKSB7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSA9IHJldHVyblRoaXM7XG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZiAoRk9SQ0VEKSBmb3IgKGtleSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAoIShrZXkgaW4gcHJvdG8pKSByZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSBFeFhOXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qc1xuLy8gbW9kdWxlIGlkID0gRmwxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkFjdGlvbnMgPSB1bmRlZmluZWQ7XG5leHBvcnRzLmRpZmZBdHRyaWJ1dGVzID0gZGlmZkF0dHJpYnV0ZXM7XG5leHBvcnRzLmRpZmZDaGlsZHJlbiA9IGRpZmZDaGlsZHJlbjtcbmV4cG9ydHMuZGlmZk5vZGUgPSBkaWZmTm9kZTtcblxudmFyIF9lbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudCcpO1xuXG52YXIgX2RpZnQgPSByZXF1aXJlKCdkaWZ0Jyk7XG5cbnZhciBkaWZmQWN0aW9ucyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9kaWZ0KTtcblxudmFyIF91bmlvblR5cGUgPSByZXF1aXJlKCd1bmlvbi10eXBlJyk7XG5cbnZhciBfdW5pb25UeXBlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VuaW9uVHlwZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbnZhciBBbnkgPSBmdW5jdGlvbiBBbnkoKSB7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBQYXRoID0gZnVuY3Rpb24gUGF0aCgpIHtcbiAgcmV0dXJuIFN0cmluZztcbn07XG5cbi8qKlxuICogUGF0Y2ggYWN0aW9uc1xuICovXG5cbnZhciBBY3Rpb25zID0gZXhwb3J0cy5BY3Rpb25zID0gKDAsIF91bmlvblR5cGUyLmRlZmF1bHQpKHtcbiAgc2V0QXR0cmlidXRlOiBbU3RyaW5nLCBBbnksIEFueV0sXG4gIHJlbW92ZUF0dHJpYnV0ZTogW1N0cmluZywgQW55XSxcbiAgaW5zZXJ0Q2hpbGQ6IFtBbnksIE51bWJlciwgUGF0aF0sXG4gIHJlbW92ZUNoaWxkOiBbTnVtYmVyXSxcbiAgdXBkYXRlQ2hpbGQ6IFtOdW1iZXIsIEFycmF5XSxcbiAgdXBkYXRlQ2hpbGRyZW46IFtBcnJheV0sXG4gIGluc2VydEJlZm9yZTogW051bWJlcl0sXG4gIHJlcGxhY2VOb2RlOiBbQW55LCBBbnksIFBhdGhdLFxuICByZW1vdmVOb2RlOiBbQW55XSxcbiAgc2FtZU5vZGU6IFtdLFxuICB1cGRhdGVUaHVuazogW0FueSwgQW55LCBQYXRoXVxufSk7XG5cbi8qKlxuICogRGlmZiB0d28gYXR0cmlidXRlIG9iamVjdHMgYW5kIHJldHVybiBhbiBhcnJheSBvZiBhY3Rpb25zIHRoYXQgcmVwcmVzZW50XG4gKiBjaGFuZ2VzIHRvIHRyYW5zZm9ybSB0aGUgb2xkIG9iamVjdCBpbnRvIHRoZSBuZXcgb25lLlxuICovXG5cbmZ1bmN0aW9uIGRpZmZBdHRyaWJ1dGVzKHByZXZpb3VzLCBuZXh0KSB7XG4gIHZhciBzZXRBdHRyaWJ1dGUgPSBBY3Rpb25zLnNldEF0dHJpYnV0ZTtcbiAgdmFyIHJlbW92ZUF0dHJpYnV0ZSA9IEFjdGlvbnMucmVtb3ZlQXR0cmlidXRlO1xuXG4gIHZhciBjaGFuZ2VzID0gW107XG4gIHZhciBwQXR0cnMgPSBwcmV2aW91cy5hdHRyaWJ1dGVzO1xuICB2YXIgbkF0dHJzID0gbmV4dC5hdHRyaWJ1dGVzO1xuXG4gIGZvciAodmFyIG5hbWUgaW4gbkF0dHJzKSB7XG4gICAgaWYgKG5BdHRyc1tuYW1lXSAhPT0gcEF0dHJzW25hbWVdKSB7XG4gICAgICBjaGFuZ2VzLnB1c2goc2V0QXR0cmlidXRlKG5hbWUsIG5BdHRyc1tuYW1lXSwgcEF0dHJzW25hbWVdKSk7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgbmFtZSBpbiBwQXR0cnMpIHtcbiAgICBpZiAoIShuYW1lIGluIG5BdHRycykpIHtcbiAgICAgIGNoYW5nZXMucHVzaChyZW1vdmVBdHRyaWJ1dGUobmFtZSwgcEF0dHJzW25hbWVdKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNoYW5nZXM7XG59XG5cbi8qKlxuICogQ29tcGFyZSB0d28gYXJyYXlzIG9mIHZpcnR1YWwgbm9kZXMgYW5kIHJldHVybiBhbiBhcnJheSBvZiBhY3Rpb25zXG4gKiB0byB0cmFuc2Zvcm0gdGhlIGxlZnQgaW50byB0aGUgcmlnaHQuIEEgc3RhcnRpbmcgcGF0aCBpcyBzdXBwbGllZCB0aGF0IHVzZVxuICogcmVjdXJzaXZlbHkgdG8gYnVpbGQgdXAgdW5pcXVlIHBhdGhzIGZvciBlYWNoIG5vZGUuXG4gKi9cblxuZnVuY3Rpb24gZGlmZkNoaWxkcmVuKHByZXZpb3VzLCBuZXh0LCBwYXJlbnRQYXRoKSB7XG4gIHZhciBpbnNlcnRDaGlsZCA9IEFjdGlvbnMuaW5zZXJ0Q2hpbGQ7XG4gIHZhciB1cGRhdGVDaGlsZCA9IEFjdGlvbnMudXBkYXRlQ2hpbGQ7XG4gIHZhciByZW1vdmVDaGlsZCA9IEFjdGlvbnMucmVtb3ZlQ2hpbGQ7XG4gIHZhciBpbnNlcnRCZWZvcmUgPSBBY3Rpb25zLmluc2VydEJlZm9yZTtcbiAgdmFyIHVwZGF0ZUNoaWxkcmVuID0gQWN0aW9ucy51cGRhdGVDaGlsZHJlbjtcbiAgdmFyIENSRUFURSA9IGRpZmZBY3Rpb25zLkNSRUFURTtcbiAgdmFyIFVQREFURSA9IGRpZmZBY3Rpb25zLlVQREFURTtcbiAgdmFyIE1PVkUgPSBkaWZmQWN0aW9ucy5NT1ZFO1xuICB2YXIgUkVNT1ZFID0gZGlmZkFjdGlvbnMuUkVNT1ZFO1xuXG4gIHZhciBwcmV2aW91c0NoaWxkcmVuID0gKDAsIF9lbGVtZW50Lmdyb3VwQnlLZXkpKHByZXZpb3VzLmNoaWxkcmVuKTtcbiAgdmFyIG5leHRDaGlsZHJlbiA9ICgwLCBfZWxlbWVudC5ncm91cEJ5S2V5KShuZXh0LmNoaWxkcmVuKTtcbiAgdmFyIGtleSA9IGZ1bmN0aW9uIGtleShhKSB7XG4gICAgcmV0dXJuIGEua2V5O1xuICB9O1xuICB2YXIgY2hhbmdlcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGVmZmVjdCh0eXBlLCBwcmV2LCBuZXh0LCBwb3MpIHtcbiAgICB2YXIgbmV4dFBhdGggPSBuZXh0ID8gKDAsIF9lbGVtZW50LmNyZWF0ZVBhdGgpKHBhcmVudFBhdGgsIG5leHQua2V5ID09IG51bGwgPyBuZXh0LmluZGV4IDogbmV4dC5rZXkpIDogbnVsbDtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgQ1JFQVRFOlxuICAgICAgICB7XG4gICAgICAgICAgY2hhbmdlcy5wdXNoKGluc2VydENoaWxkKG5leHQuaXRlbSwgcG9zLCBuZXh0UGF0aCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICBjYXNlIFVQREFURTpcbiAgICAgICAge1xuICAgICAgICAgIHZhciBhY3Rpb25zID0gZGlmZk5vZGUocHJldi5pdGVtLCBuZXh0Lml0ZW0sIG5leHRQYXRoKTtcbiAgICAgICAgICBpZiAoYWN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjaGFuZ2VzLnB1c2godXBkYXRlQ2hpbGQocHJldi5pbmRleCwgYWN0aW9ucykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgY2FzZSBNT1ZFOlxuICAgICAgICB7XG4gICAgICAgICAgdmFyIGFjdGlvbnMgPSBkaWZmTm9kZShwcmV2Lml0ZW0sIG5leHQuaXRlbSwgbmV4dFBhdGgpO1xuICAgICAgICAgIGFjdGlvbnMucHVzaChpbnNlcnRCZWZvcmUocG9zKSk7XG4gICAgICAgICAgY2hhbmdlcy5wdXNoKHVwZGF0ZUNoaWxkKHByZXYuaW5kZXgsIGFjdGlvbnMpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgY2FzZSBSRU1PVkU6XG4gICAgICAgIHtcbiAgICAgICAgICBjaGFuZ2VzLnB1c2gocmVtb3ZlQ2hpbGQocHJldi5pbmRleCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgKDAsIGRpZmZBY3Rpb25zLmRlZmF1bHQpKHByZXZpb3VzQ2hpbGRyZW4sIG5leHRDaGlsZHJlbiwgZWZmZWN0LCBrZXkpO1xuXG4gIHJldHVybiB1cGRhdGVDaGlsZHJlbihjaGFuZ2VzKTtcbn1cblxuLyoqXG4gKiBDb21wYXJlIHR3byB2aXJ0dWFsIG5vZGVzIGFuZCByZXR1cm4gYW4gYXJyYXkgb2YgY2hhbmdlcyB0byB0dXJuIHRoZSBsZWZ0XG4gKiBpbnRvIHRoZSByaWdodC5cbiAqL1xuXG5mdW5jdGlvbiBkaWZmTm9kZShwcmV2LCBuZXh0LCBwYXRoKSB7XG4gIHZhciBjaGFuZ2VzID0gW107XG4gIHZhciByZXBsYWNlTm9kZSA9IEFjdGlvbnMucmVwbGFjZU5vZGU7XG4gIHZhciBzZXRBdHRyaWJ1dGUgPSBBY3Rpb25zLnNldEF0dHJpYnV0ZTtcbiAgdmFyIHNhbWVOb2RlID0gQWN0aW9ucy5zYW1lTm9kZTtcbiAgdmFyIHJlbW92ZU5vZGUgPSBBY3Rpb25zLnJlbW92ZU5vZGU7XG4gIHZhciB1cGRhdGVUaHVuayA9IEFjdGlvbnMudXBkYXRlVGh1bms7XG5cbiAgLy8gTm8gbGVmdCBub2RlIHRvIGNvbXBhcmUgaXQgdG9cbiAgLy8gVE9ETzogVGhpcyBzaG91bGQganVzdCByZXR1cm4gYSBjcmVhdGVOb2RlIGFjdGlvblxuXG4gIGlmIChwcmV2ID09PSBudWxsIHx8IHByZXYgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTGVmdCBub2RlIG11c3Qgbm90IGJlIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gIH1cblxuICAvLyBCYWlsIG91dCBhbmQgc2tpcCB1cGRhdGluZyB0aGlzIHdob2xlIHN1Yi10cmVlXG4gIGlmIChwcmV2ID09PSBuZXh0KSB7XG4gICAgY2hhbmdlcy5wdXNoKHNhbWVOb2RlKCkpO1xuICAgIHJldHVybiBjaGFuZ2VzO1xuICB9XG5cbiAgLy8gUmVtb3ZlXG4gIGlmIChwcmV2ICE9IG51bGwgJiYgbmV4dCA9PSBudWxsKSB7XG4gICAgY2hhbmdlcy5wdXNoKHJlbW92ZU5vZGUocHJldikpO1xuICAgIHJldHVybiBjaGFuZ2VzO1xuICB9XG5cbiAgLy8gUmVwbGFjZVxuICBpZiAocHJldi50eXBlICE9PSBuZXh0LnR5cGUpIHtcbiAgICBjaGFuZ2VzLnB1c2gocmVwbGFjZU5vZGUocHJldiwgbmV4dCwgcGF0aCkpO1xuICAgIHJldHVybiBjaGFuZ2VzO1xuICB9XG5cbiAgLy8gVGV4dFxuICBpZiAoKDAsIF9lbGVtZW50LmlzVGV4dCkobmV4dCkpIHtcbiAgICBpZiAocHJldi5ub2RlVmFsdWUgIT09IG5leHQubm9kZVZhbHVlKSB7XG4gICAgICBjaGFuZ2VzLnB1c2goc2V0QXR0cmlidXRlKCdub2RlVmFsdWUnLCBuZXh0Lm5vZGVWYWx1ZSwgcHJldi5ub2RlVmFsdWUpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNoYW5nZXM7XG4gIH1cblxuICAvLyBUaHVua1xuICBpZiAoKDAsIF9lbGVtZW50LmlzVGh1bmspKG5leHQpKSB7XG4gICAgaWYgKCgwLCBfZWxlbWVudC5pc1NhbWVUaHVuaykocHJldiwgbmV4dCkpIHtcbiAgICAgIGNoYW5nZXMucHVzaCh1cGRhdGVUaHVuayhwcmV2LCBuZXh0LCBwYXRoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoYW5nZXMucHVzaChyZXBsYWNlTm9kZShwcmV2LCBuZXh0LCBwYXRoKSk7XG4gICAgfVxuICAgIHJldHVybiBjaGFuZ2VzO1xuICB9XG5cbiAgLy8gRW1wdHlcbiAgaWYgKCgwLCBfZWxlbWVudC5pc0VtcHR5KShuZXh0KSkge1xuICAgIHJldHVybiBjaGFuZ2VzO1xuICB9XG5cbiAgY2hhbmdlcyA9IGRpZmZBdHRyaWJ1dGVzKHByZXYsIG5leHQpO1xuICBjaGFuZ2VzLnB1c2goZGlmZkNoaWxkcmVuKHByZXYsIG5leHQsIHBhdGgpKTtcblxuICByZXR1cm4gY2hhbmdlcztcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fZGVrdUAyLjAuMC1yYzE2QGRla3UvbGliL2RpZmYvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IEdOdWhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL19jdXJyeTEnKTtcblxuXG4vKipcbiAqIE9wdGltaXplZCBpbnRlcm5hbCB0d28tYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9jdXJyeTIoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGYyKGEsIGIpIHtcbiAgICB2YXIgbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKG4gPT09IDApIHtcbiAgICAgIHJldHVybiBmMjtcbiAgICB9IGVsc2UgaWYgKG4gPT09IDEgJiYgYSAhPSBudWxsICYmIGFbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZjI7XG4gICAgfSBlbHNlIGlmIChuID09PSAxKSB7XG4gICAgICByZXR1cm4gX2N1cnJ5MShmdW5jdGlvbihiKSB7IHJldHVybiBmbihhLCBiKTsgfSk7XG4gICAgfSBlbHNlIGlmIChuID09PSAyICYmIGEgIT0gbnVsbCAmJiBhWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICBiICE9IG51bGwgJiYgYlsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBmMjtcbiAgICB9IGVsc2UgaWYgKG4gPT09IDIgJiYgYSAhPSBudWxsICYmIGFbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gX2N1cnJ5MShmdW5jdGlvbihhKSB7IHJldHVybiBmbihhLCBiKTsgfSk7XG4gICAgfSBlbHNlIGlmIChuID09PSAyICYmIGIgIT0gbnVsbCAmJiBiWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIF9jdXJyeTEoZnVuY3Rpb24oYikgeyByZXR1cm4gZm4oYSwgYik7IH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm4oYSwgYik7XG4gICAgfVxuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19yYW1kYUAwLjE1LjFAcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeTIuanNcbi8vIG1vZHVsZSBpZCA9IEdrY21cbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvciwgZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2goYWN0aW9uQ3JlYXRvci5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cykpO1xuICB9O1xufVxuXG4vKipcbiAqIFR1cm5zIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGFjdGlvbiBjcmVhdG9ycywgaW50byBhbiBvYmplY3Qgd2l0aCB0aGVcbiAqIHNhbWUga2V5cywgYnV0IHdpdGggZXZlcnkgZnVuY3Rpb24gd3JhcHBlZCBpbnRvIGEgYGRpc3BhdGNoYCBjYWxsIHNvIHRoZXlcbiAqIG1heSBiZSBpbnZva2VkIGRpcmVjdGx5LiBUaGlzIGlzIGp1c3QgYSBjb252ZW5pZW5jZSBtZXRob2QsIGFzIHlvdSBjYW4gY2FsbFxuICogYHN0b3JlLmRpc3BhdGNoKE15QWN0aW9uQ3JlYXRvcnMuZG9Tb21ldGhpbmcoKSlgIHlvdXJzZWxmIGp1c3QgZmluZS5cbiAqXG4gKiBGb3IgY29udmVuaWVuY2UsIHlvdSBjYW4gYWxzbyBwYXNzIGEgc2luZ2xlIGZ1bmN0aW9uIGFzIHRoZSBmaXJzdCBhcmd1bWVudCxcbiAqIGFuZCBnZXQgYSBmdW5jdGlvbiBpbiByZXR1cm4uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R9IGFjdGlvbkNyZWF0b3JzIEFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGFjdGlvblxuICogY3JlYXRvciBmdW5jdGlvbnMuIE9uZSBoYW5keSB3YXkgdG8gb2J0YWluIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzYFxuICogc3ludGF4LiBZb3UgbWF5IGFsc28gcGFzcyBhIHNpbmdsZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBkaXNwYXRjaCBUaGUgYGRpc3BhdGNoYCBmdW5jdGlvbiBhdmFpbGFibGUgb24geW91ciBSZWR1eFxuICogc3RvcmUuXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufE9iamVjdH0gVGhlIG9iamVjdCBtaW1pY2tpbmcgdGhlIG9yaWdpbmFsIG9iamVjdCwgYnV0IHdpdGhcbiAqIGV2ZXJ5IGFjdGlvbiBjcmVhdG9yIHdyYXBwZWQgaW50byB0aGUgYGRpc3BhdGNoYCBjYWxsLiBJZiB5b3UgcGFzc2VkIGFcbiAqIGZ1bmN0aW9uIGFzIGBhY3Rpb25DcmVhdG9yc2AsIHRoZSByZXR1cm4gdmFsdWUgd2lsbCBhbHNvIGJlIGEgc2luZ2xlXG4gKiBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZEFjdGlvbkNyZWF0b3JzKGFjdGlvbkNyZWF0b3JzLCBkaXNwYXRjaCkge1xuICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3JzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3JzLCBkaXNwYXRjaCk7XG4gIH1cblxuICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3JzICE9PSAnb2JqZWN0JyB8fCBhY3Rpb25DcmVhdG9ycyA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignYmluZEFjdGlvbkNyZWF0b3JzIGV4cGVjdGVkIGFuIG9iamVjdCBvciBhIGZ1bmN0aW9uLCBpbnN0ZWFkIHJlY2VpdmVkICcgKyAoYWN0aW9uQ3JlYXRvcnMgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgYWN0aW9uQ3JlYXRvcnMpICsgJy4gJyArICdEaWQgeW91IHdyaXRlIFwiaW1wb3J0IEFjdGlvbkNyZWF0b3JzIGZyb21cIiBpbnN0ZWFkIG9mIFwiaW1wb3J0ICogYXMgQWN0aW9uQ3JlYXRvcnMgZnJvbVwiPycpO1xuICB9XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhY3Rpb25DcmVhdG9ycyk7XG4gIHZhciBib3VuZEFjdGlvbkNyZWF0b3JzID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIHZhciBhY3Rpb25DcmVhdG9yID0gYWN0aW9uQ3JlYXRvcnNba2V5XTtcbiAgICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGJvdW5kQWN0aW9uQ3JlYXRvcnNba2V5XSA9IGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3IsIGRpc3BhdGNoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJvdW5kQWN0aW9uQ3JlYXRvcnM7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX3JlZHV4QDMuNy4yQHJlZHV4L2VzL2JpbmRBY3Rpb25DcmVhdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gSEU0bVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmggPSBleHBvcnRzLmRvbSA9IGV4cG9ydHMuZGlmZiA9IGV4cG9ydHMudm5vZGUgPSBleHBvcnRzLnN0cmluZyA9IGV4cG9ydHMuZWxlbWVudCA9IGV4cG9ydHMuY3JlYXRlQXBwID0gdW5kZWZpbmVkO1xuXG52YXIgX2RpZmYgPSByZXF1aXJlKCcuL2RpZmYnKTtcblxudmFyIGRpZmYgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfZGlmZik7XG5cbnZhciBfZWxlbWVudCA9IHJlcXVpcmUoJy4vZWxlbWVudCcpO1xuXG52YXIgdm5vZGUgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfZWxlbWVudCk7XG5cbnZhciBfc3RyaW5nID0gcmVxdWlyZSgnLi9zdHJpbmcnKTtcblxudmFyIHN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9zdHJpbmcpO1xuXG52YXIgX2RvbSA9IHJlcXVpcmUoJy4vZG9tJyk7XG5cbnZhciBkb20gPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfZG9tKTtcblxudmFyIF9hcHAgPSByZXF1aXJlKCcuL2FwcCcpO1xuXG52YXIgYXBwID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2FwcCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbnZhciBlbGVtZW50ID0gdm5vZGUuY3JlYXRlO1xudmFyIGggPSB2bm9kZS5jcmVhdGU7XG52YXIgY3JlYXRlQXBwID0gYXBwLmNyZWF0ZTtcblxuZXhwb3J0cy5jcmVhdGVBcHAgPSBjcmVhdGVBcHA7XG5leHBvcnRzLmVsZW1lbnQgPSBlbGVtZW50O1xuZXhwb3J0cy5zdHJpbmcgPSBzdHJpbmc7XG5leHBvcnRzLnZub2RlID0gdm5vZGU7XG5leHBvcnRzLmRpZmYgPSBkaWZmO1xuZXhwb3J0cy5kb20gPSBkb207XG5leHBvcnRzLmggPSBoO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19kZWt1QDIuMC4wLXJjMTZAZGVrdS9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IEhJUzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbDtcbnZhciBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qc1xuLy8gbW9kdWxlIGlkID0gSUZHaFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9mcm9tID0gcmVxdWlyZShcIi4uL2NvcmUtanMvYXJyYXkvZnJvbVwiKTtcblxudmFyIF9mcm9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zyb20pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAoMCwgX2Zyb20yLmRlZmF1bHQpKGFycik7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2JhYmVsLXJ1bnRpbWVANi4yNi4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gSUhQQlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSBJY1EzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhcml0eSA9IHJlcXVpcmUoJy4uL2FyaXR5Jyk7XG5cblxuLyoqXG4gKiBJbnRlcm5hbCBjdXJyeU4gZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgb2YgdGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAcmV0dXJuIHthcnJheX0gQW4gYXJyYXkgb2YgYXJndW1lbnRzIHJlY2VpdmVkIHRodXMgZmFyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9jdXJyeU4obGVuZ3RoLCByZWNlaXZlZCwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb21iaW5lZCA9IFtdO1xuICAgIHZhciBhcmdzSWR4ID0gMDtcbiAgICB2YXIgbGVmdCA9IGxlbmd0aDtcbiAgICB2YXIgY29tYmluZWRJZHggPSAwO1xuICAgIHdoaWxlIChjb21iaW5lZElkeCA8IHJlY2VpdmVkLmxlbmd0aCB8fCBhcmdzSWR4IDwgYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgdmFyIHJlc3VsdDtcbiAgICAgIGlmIChjb21iaW5lZElkeCA8IHJlY2VpdmVkLmxlbmd0aCAmJlxuICAgICAgICAgIChyZWNlaXZlZFtjb21iaW5lZElkeF0gPT0gbnVsbCB8fFxuICAgICAgICAgICByZWNlaXZlZFtjb21iaW5lZElkeF1bJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddICE9PSB0cnVlIHx8XG4gICAgICAgICAgIGFyZ3NJZHggPj0gYXJndW1lbnRzLmxlbmd0aCkpIHtcbiAgICAgICAgcmVzdWx0ID0gcmVjZWl2ZWRbY29tYmluZWRJZHhdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gYXJndW1lbnRzW2FyZ3NJZHhdO1xuICAgICAgICBhcmdzSWR4ICs9IDE7XG4gICAgICB9XG4gICAgICBjb21iaW5lZFtjb21iaW5lZElkeF0gPSByZXN1bHQ7XG4gICAgICBpZiAocmVzdWx0ID09IG51bGwgfHwgcmVzdWx0WydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSAhPT0gdHJ1ZSkge1xuICAgICAgICBsZWZ0IC09IDE7XG4gICAgICB9XG4gICAgICBjb21iaW5lZElkeCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gbGVmdCA8PSAwID8gZm4uYXBwbHkodGhpcywgY29tYmluZWQpIDogYXJpdHkobGVmdCwgX2N1cnJ5TihsZW5ndGgsIGNvbWJpbmVkLCBmbikpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19yYW1kYUAwLjE1LjFAcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeU4uanNcbi8vIG1vZHVsZSBpZCA9IEtaaUZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHN0YXRlZnVsIGZyb20gJ2Rla3Utc3RhdGUnXG4vLyBpbXBvcnQgc3RhdGVmdWwgZnJvbSAnLi4vc3RhdGVmdWwnXG5pbXBvcnQge2VsZW1lbnR9IGZyb20gJ2Rla3UnXG5pbXBvcnQgeyB0b2dnbGVUb2RvIH0gZnJvbSAnLi8uLi9hY3Rpb25zJ1xuaW1wb3J0IFRvZG9MaXN0IGZyb20gJy4vVG9kb0xpc3QnXG5cbmxldCBvbkNsaWNrID0gKGRpc3BhdGNoLCBpdGVtKSA9PiAoZSkgPT4ge1xuICBkaXNwYXRjaCh0b2dnbGVUb2RvKGl0ZW0pKVxufVxubGV0IGZpbHRlclRvZG9zID0gKHRvZG9zLCB2aXNpYmlsaXR5RmlsdGVyKSA9PiB7XG4gIHN3aXRjaCh2aXNpYmlsaXR5RmlsdGVyKXtcbiAgICBjYXNlIFwiQUxMXCI6XG4gICAgICByZXR1cm4gdG9kb3NcbiAgICBjYXNlICdBQ1RJVkUnOlxuICAgICAgcmV0dXJuIHRvZG9zLmZpbHRlcihpdGVtID0+ICFpdGVtLmNvbXBsZXRlZClcbiAgICBjYXNlICdDT01QTEVURUQnOlxuICAgICAgcmV0dXJuIHRvZG9zLmZpbHRlcihpdGVtID0+IGl0ZW0uY29tcGxldGVkKVxuICB9XG59XG5cbmxldCBWaXNpYmxlVG9kb0xpc3QgPSAoe3Byb3BzLCBkaXNwYXRjaH0pID0+IChcbiAgPGRpdj5cbiAgICA8VG9kb0xpc3QgdG9kb3M9e2ZpbHRlclRvZG9zKHByb3BzLnRvZG9zLCBwcm9wcy52aXNpYmlsaXR5RmlsdGVyKX0gLz5cbiAgPC9kaXY+XG4pXG5cblxuZXhwb3J0IGRlZmF1bHQgc3RhdGVmdWwoVmlzaWJsZVRvZG9MaXN0KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnQvVmlzaWJsZVRvZG9MaXN0LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzU3ZnRWxlbWVudCA9IHJlcXVpcmUoJ2lzLXN2Zy1lbGVtZW50Jyk7XG5cbnZhciBuYW1lc3BhY2UgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuXG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIGlzRWxlbWVudDogX2lzU3ZnRWxlbWVudC5pc0VsZW1lbnQsXG4gIG5hbWVzcGFjZTogbmFtZXNwYWNlXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19kZWt1QDIuMC4wLXJjMTZAZGVrdS9saWIvZG9tL3N2Zy5qc1xuLy8gbW9kdWxlIGlkID0gTFhTcFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIgaW5kZXggPSB0aGlzLl9pO1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBPLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IExuaUtcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanNcbi8vIG1vZHVsZSBpZCA9IExvaHVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gTThZZFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhhdCwgcG9zKSB7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSk7XG4gICAgdmFyIGkgPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgbCA9IHMubGVuZ3RoO1xuICAgIHZhciBhLCBiO1xuICAgIGlmIChpIDwgMCB8fCBpID49IGwpIHJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3N0cmluZy1hdC5qc1xuLy8gbW9kdWxlIGlkID0gTUdFcFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgc3RhdGVmdWwgZnJvbSAnZGVrdS1zdGF0ZSdcbi8vIGltcG9ydCBzdGF0ZWZ1bCBmcm9tICcuLi9zdGF0ZWZ1bCdcbmltcG9ydCB7ZWxlbWVudH0gZnJvbSAnZGVrdSdcbmltcG9ydCBGaWx0ZXJMaW5rIGZyb20gJy4vRmlsdGVyTGluaydcbmltcG9ydCB7cmVtb3ZlQ29tcGxldGVkfSBmcm9tICcuLi9hY3Rpb25zJ1xuXG5sZXQgb25SZW1vdmVDb21wbGV0ZWQgPSAoZGlzcGF0Y2gpID0+IChlKSA9PiB7XG4gIGRpc3BhdGNoKHJlbW92ZUNvbXBsZXRlZCgpKVxufVxuXG5sZXQgcmVtYWluZWQgPSAodG9kb3MpID0+IHRvZG9zLmZpbHRlcihpdGVtID0+ICFpdGVtLmNvbXBsZXRlZCkubGVuZ3RoXG5cbmxldCBGb290ZXIgPSAoe3Byb3BzLCBkaXNwYXRjaH0pID0+IChcblxuICA8Zm9vdGVyIGNsYXNzPVwiZm9vdGVyXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJ0b2RvLWNvdW50XCI+PHN0cm9uZz57cmVtYWluZWQocHJvcHMudG9kb3MpfTwvc3Ryb25nPiBpdGVtIGxlZnQ8L3NwYW4+XG4gICAgPHVsIGNsYXNzPVwiZmlsdGVyc1wiPlxuICAgICAgPEZpbHRlckxpbmsgey4uLnByb3BzfSBmaWx0ZXI9XCJBTExcIj5cbiAgICAgICAgQWxsXG4gICAgICA8L0ZpbHRlckxpbms+XG4gICAgICA8RmlsdGVyTGluayB7Li4ucHJvcHN9IGZpbHRlcj1cIkFDVElWRVwiPlxuICAgICAgICBBY3RpdmVcbiAgICAgIDwvRmlsdGVyTGluaz5cbiAgICAgIDxGaWx0ZXJMaW5rIHsuLi5wcm9wc30gZmlsdGVyPVwiQ09NUExFVEVEXCI+XG4gICAgICAgIENvbXBsZXRlZFxuICAgICAgPC9GaWx0ZXJMaW5rPlxuICAgIDwvdWw+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImNsZWFyLWNvbXBsZXRlZFwiIG9uQ2xpY2s9e29uUmVtb3ZlQ29tcGxldGVkKGRpc3BhdGNoKX0+Q2xlYXIgY29tcGxldGVkPC9idXR0b24+XG4gIDwvZm9vdGVyPlxuXG4pXG5cblxuZXhwb3J0IGRlZmF1bHQgc3RhdGVmdWwoRm9vdGVyKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnQvRm9vdGVyLmpzIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzXG4vLyBtb2R1bGUgaWQgPSBOVTNLXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuaW5zZXJ0QXRJbmRleCA9IHVuZGVmaW5lZDtcbmV4cG9ydHMuZGVmYXVsdCA9IHBhdGNoO1xuXG52YXIgX3NldEF0dHJpYnV0ZTIgPSByZXF1aXJlKCcuL3NldEF0dHJpYnV0ZScpO1xuXG52YXIgX2VsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50Jyk7XG5cbnZhciBfY3JlYXRlID0gcmVxdWlyZSgnLi9jcmVhdGUnKTtcblxudmFyIF9jcmVhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlKTtcblxudmFyIF9kaWZmID0gcmVxdWlyZSgnLi4vZGlmZicpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIE1vZGlmeSBhIERPTSBlbGVtZW50IGdpdmVuIGFuIGFycmF5IG9mIGFjdGlvbnMuIEEgY29udGV4dCBjYW4gYmUgc2V0XG4gKiB0aGF0IHdpbGwgYmUgdXNlZCB0byByZW5kZXIgYW55IGN1c3RvbSBlbGVtZW50cy5cbiAqL1xuXG5mdW5jdGlvbiBwYXRjaChkaXNwYXRjaCwgY29udGV4dCkge1xuICByZXR1cm4gZnVuY3Rpb24gKERPTUVsZW1lbnQsIGFjdGlvbikge1xuICAgIF9kaWZmLkFjdGlvbnMuY2FzZSh7XG4gICAgICBzZXRBdHRyaWJ1dGU6IGZ1bmN0aW9uIHNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAoMCwgX3NldEF0dHJpYnV0ZTIuc2V0QXR0cmlidXRlKShET01FbGVtZW50LCBuYW1lLCB2YWx1ZSwgcHJldmlvdXNWYWx1ZSk7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlQXR0cmlidXRlOiBmdW5jdGlvbiByZW1vdmVBdHRyaWJ1dGUobmFtZSwgcHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAoMCwgX3NldEF0dHJpYnV0ZTIucmVtb3ZlQXR0cmlidXRlKShET01FbGVtZW50LCBuYW1lLCBwcmV2aW91c1ZhbHVlKTtcbiAgICAgIH0sXG4gICAgICBpbnNlcnRCZWZvcmU6IGZ1bmN0aW9uIGluc2VydEJlZm9yZShpbmRleCkge1xuICAgICAgICBpbnNlcnRBdEluZGV4KERPTUVsZW1lbnQucGFyZW50Tm9kZSwgaW5kZXgsIERPTUVsZW1lbnQpO1xuICAgICAgfSxcbiAgICAgIHNhbWVOb2RlOiBmdW5jdGlvbiBzYW1lTm9kZSgpIHt9LFxuICAgICAgdXBkYXRlQ2hpbGRyZW46IGZ1bmN0aW9uIHVwZGF0ZUNoaWxkcmVuKGNoYW5nZXMpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgY2xvbmUgb2YgdGhlIGNoaWxkcmVuIHNvIHdlIGNhbiByZWZlcmVuY2UgdGhlbSBsYXRlclxuICAgICAgICAvLyB1c2luZyB0aGVpciBvcmlnaW5hbCBwb3NpdGlvbiBldmVuIGlmIHRoZXkgbW92ZSBhcm91bmRcbiAgICAgICAgdmFyIGNoaWxkTm9kZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoRE9NRWxlbWVudC5jaGlsZE5vZGVzKTtcblxuICAgICAgICBjaGFuZ2VzLmZvckVhY2goZnVuY3Rpb24gKGNoYW5nZSkge1xuICAgICAgICAgIF9kaWZmLkFjdGlvbnMuY2FzZSh7XG4gICAgICAgICAgICBpbnNlcnRDaGlsZDogZnVuY3Rpb24gaW5zZXJ0Q2hpbGQodm5vZGUsIGluZGV4LCBwYXRoKSB7XG4gICAgICAgICAgICAgIGluc2VydEF0SW5kZXgoRE9NRWxlbWVudCwgaW5kZXgsICgwLCBfY3JlYXRlMi5kZWZhdWx0KSh2bm9kZSwgcGF0aCwgZGlzcGF0Y2gsIGNvbnRleHQpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmVDaGlsZDogZnVuY3Rpb24gcmVtb3ZlQ2hpbGQoaW5kZXgpIHtcbiAgICAgICAgICAgICAgRE9NRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlQ2hpbGQ6IGZ1bmN0aW9uIHVwZGF0ZUNoaWxkKGluZGV4LCBhY3Rpb25zKSB7XG4gICAgICAgICAgICAgIHZhciB1cGRhdGUgPSBwYXRjaChkaXNwYXRjaCwgY29udGV4dCk7XG4gICAgICAgICAgICAgIGFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZShjaGlsZE5vZGVzW2luZGV4XSwgYWN0aW9uKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgY2hhbmdlKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgdXBkYXRlVGh1bms6IGZ1bmN0aW9uIHVwZGF0ZVRodW5rKHByZXYsIG5leHQsIHBhdGgpIHtcbiAgICAgICAgdmFyIHByb3BzID0gbmV4dC5wcm9wcztcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gbmV4dC5jaGlsZHJlbjtcbiAgICAgICAgdmFyIGNvbXBvbmVudCA9IG5leHQuY29tcG9uZW50O1xuICAgICAgICB2YXIgb25VcGRhdGUgPSBjb21wb25lbnQub25VcGRhdGU7XG5cbiAgICAgICAgdmFyIHJlbmRlciA9IHR5cGVvZiBjb21wb25lbnQgPT09ICdmdW5jdGlvbicgPyBjb21wb25lbnQgOiBjb21wb25lbnQucmVuZGVyO1xuICAgICAgICB2YXIgcHJldk5vZGUgPSBwcmV2LnN0YXRlLnZub2RlO1xuICAgICAgICB2YXIgbW9kZWwgPSB7XG4gICAgICAgICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgICAgICAgIHByb3BzOiBwcm9wcyxcbiAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgIGRpc3BhdGNoOiBkaXNwYXRjaCxcbiAgICAgICAgICBjb250ZXh0OiBjb250ZXh0XG4gICAgICAgIH07XG4gICAgICAgIHZhciBuZXh0Tm9kZSA9IHJlbmRlcihtb2RlbCk7XG4gICAgICAgIHZhciBjaGFuZ2VzID0gKDAsIF9kaWZmLmRpZmZOb2RlKShwcmV2Tm9kZSwgbmV4dE5vZGUsICgwLCBfZWxlbWVudC5jcmVhdGVQYXRoKShwYXRoLCAnMCcpKTtcbiAgICAgICAgRE9NRWxlbWVudCA9IGNoYW5nZXMucmVkdWNlKHBhdGNoKGRpc3BhdGNoLCBjb250ZXh0KSwgRE9NRWxlbWVudCk7XG4gICAgICAgIGlmIChvblVwZGF0ZSkgb25VcGRhdGUobW9kZWwpO1xuICAgICAgICBuZXh0LnN0YXRlID0ge1xuICAgICAgICAgIHZub2RlOiBuZXh0Tm9kZSxcbiAgICAgICAgICBtb2RlbDogbW9kZWxcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICByZXBsYWNlTm9kZTogZnVuY3Rpb24gcmVwbGFjZU5vZGUocHJldiwgbmV4dCwgcGF0aCkge1xuICAgICAgICB2YXIgbmV3RWwgPSAoMCwgX2NyZWF0ZTIuZGVmYXVsdCkobmV4dCwgcGF0aCwgZGlzcGF0Y2gsIGNvbnRleHQpO1xuICAgICAgICB2YXIgcGFyZW50RWwgPSBET01FbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgIGlmIChwYXJlbnRFbCkgcGFyZW50RWwucmVwbGFjZUNoaWxkKG5ld0VsLCBET01FbGVtZW50KTtcbiAgICAgICAgRE9NRWxlbWVudCA9IG5ld0VsO1xuICAgICAgICByZW1vdmVUaHVua3MocHJldik7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlTm9kZTogZnVuY3Rpb24gcmVtb3ZlTm9kZShwcmV2KSB7XG4gICAgICAgIHJlbW92ZVRodW5rcyhwcmV2KTtcbiAgICAgICAgRE9NRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKERPTUVsZW1lbnQpO1xuICAgICAgICBET01FbGVtZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9LCBhY3Rpb24pO1xuXG4gICAgcmV0dXJuIERPTUVsZW1lbnQ7XG4gIH07XG59XG5cbi8qKlxuICogUmVjdXJzaXZlbHkgcmVtb3ZlIGFsbCB0aHVua3NcbiAqL1xuXG5mdW5jdGlvbiByZW1vdmVUaHVua3Modm5vZGUpIHtcbiAgd2hpbGUgKCgwLCBfZWxlbWVudC5pc1RodW5rKSh2bm9kZSkpIHtcbiAgICB2YXIgX3Zub2RlID0gdm5vZGU7XG4gICAgdmFyIGNvbXBvbmVudCA9IF92bm9kZS5jb21wb25lbnQ7XG4gICAgdmFyIHN0YXRlID0gX3Zub2RlLnN0YXRlO1xuICAgIHZhciBvblJlbW92ZSA9IGNvbXBvbmVudC5vblJlbW92ZTtcbiAgICB2YXIgbW9kZWwgPSBzdGF0ZS5tb2RlbDtcblxuICAgIGlmIChvblJlbW92ZSkgb25SZW1vdmUobW9kZWwpO1xuICAgIHZub2RlID0gc3RhdGUudm5vZGU7XG4gIH1cblxuICBpZiAodm5vZGUuY2hpbGRyZW4pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZW1vdmVUaHVua3Modm5vZGUuY2hpbGRyZW5baV0pO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFNsaWdodGx5IG5pY2VyIGluc2VydEJlZm9yZVxuICovXG5cbnZhciBpbnNlcnRBdEluZGV4ID0gZXhwb3J0cy5pbnNlcnRBdEluZGV4ID0gZnVuY3Rpb24gaW5zZXJ0QXRJbmRleChwYXJlbnQsIGluZGV4LCBlbCkge1xuICB2YXIgdGFyZ2V0ID0gcGFyZW50LmNoaWxkTm9kZXNbaW5kZXhdO1xuICBpZiAodGFyZ2V0KSB7XG4gICAgcGFyZW50Lmluc2VydEJlZm9yZShlbCwgdGFyZ2V0KTtcbiAgfSBlbHNlIHtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWwpO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19kZWt1QDIuMC4wLXJjMTZAZGVrdS9saWIvZG9tL3VwZGF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gTmkrL1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gUFJNL1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBnZXRLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpID0gMDtcbiAgdmFyIFA7XG4gIHdoaWxlIChsZW5ndGggPiBpKSBkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qc1xuLy8gbW9kdWxlIGlkID0gUFRBMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY3VycnlOID0gcmVxdWlyZSgncmFtZGEvc3JjL2N1cnJ5TicpO1xuXG5mdW5jdGlvbiBpc1N0cmluZyhzKSB7IHJldHVybiB0eXBlb2YgcyA9PT0gJ3N0cmluZyc7IH1cbmZ1bmN0aW9uIGlzTnVtYmVyKG4pIHsgcmV0dXJuIHR5cGVvZiBuID09PSAnbnVtYmVyJzsgfVxuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGYpIHsgcmV0dXJuIHR5cGVvZiBmID09PSAnZnVuY3Rpb24nOyB9XG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24oYSkgeyByZXR1cm4gJ2xlbmd0aCcgaW4gYTsgfTtcblxudmFyIG1hcENvbnN0clRvRm4gPSBjdXJyeU4oMiwgZnVuY3Rpb24oZ3JvdXAsIGNvbnN0cikge1xuICByZXR1cm4gY29uc3RyID09PSBTdHJpbmcgICAgPyBpc1N0cmluZ1xuICAgICAgIDogY29uc3RyID09PSBOdW1iZXIgICAgPyBpc051bWJlclxuICAgICAgIDogY29uc3RyID09PSBPYmplY3QgICAgPyBpc09iamVjdFxuICAgICAgIDogY29uc3RyID09PSBBcnJheSAgICAgPyBpc0FycmF5XG4gICAgICAgOiBjb25zdHIgPT09IEZ1bmN0aW9uICA/IGlzRnVuY3Rpb25cbiAgICAgICA6IGNvbnN0ciA9PT0gdW5kZWZpbmVkID8gZ3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogY29uc3RyO1xufSk7XG5cbmZ1bmN0aW9uIENvbnN0cnVjdG9yKGdyb3VwLCBuYW1lLCB2YWxpZGF0b3JzKSB7XG4gIHZhbGlkYXRvcnMgPSB2YWxpZGF0b3JzLm1hcChtYXBDb25zdHJUb0ZuKGdyb3VwKSk7XG4gIHZhciBjb25zdHJ1Y3RvciA9IGN1cnJ5Tih2YWxpZGF0b3JzLmxlbmd0aCwgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZhbCA9IFtdLCB2LCB2YWxpZGF0b3I7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHYgPSBhcmd1bWVudHNbaV07XG4gICAgICB2YWxpZGF0b3IgPSB2YWxpZGF0b3JzW2ldO1xuICAgICAgaWYgKCh0eXBlb2YgdmFsaWRhdG9yID09PSAnZnVuY3Rpb24nICYmIHZhbGlkYXRvcih2KSkgfHxcbiAgICAgICAgICAodiAhPT0gdW5kZWZpbmVkICYmIHYgIT09IG51bGwgJiYgdi5vZiA9PT0gdmFsaWRhdG9yKSkge1xuICAgICAgICB2YWxbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd3cm9uZyB2YWx1ZSAnICsgdiArICcgcGFzc2VkIHRvIGxvY2F0aW9uICcgKyBpICsgJyBpbiAnICsgbmFtZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhbC5vZiA9IGdyb3VwO1xuICAgIHZhbC5uYW1lID0gbmFtZTtcbiAgICByZXR1cm4gdmFsO1xuICB9KTtcbiAgcmV0dXJuIGNvbnN0cnVjdG9yO1xufVxuXG5mdW5jdGlvbiByYXdDYXNlKHR5cGUsIGNhc2VzLCBhY3Rpb24sIGFyZykge1xuICBpZiAodHlwZSAhPT0gYWN0aW9uLm9mKSB0aHJvdyBuZXcgVHlwZUVycm9yKCd3cm9uZyB0eXBlIHBhc3NlZCB0byBjYXNlJyk7XG4gIHZhciBuYW1lID0gYWN0aW9uLm5hbWUgaW4gY2FzZXMgPyBhY3Rpb24ubmFtZVxuICAgICAgICAgICA6ICdfJyBpbiBjYXNlcyAgICAgICAgID8gJ18nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuaGFuZGxlZCB2YWx1ZSBwYXNzZWQgdG8gY2FzZScpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjYXNlc1tuYW1lXS5hcHBseSh1bmRlZmluZWQsIGFyZyAhPT0gdW5kZWZpbmVkID8gYWN0aW9uLmNvbmNhdChbYXJnXSkgOiBhY3Rpb24pO1xuICB9XG59XG5cbnZhciB0eXBlQ2FzZSA9IGN1cnJ5TigzLCByYXdDYXNlKTtcbnZhciBjYXNlT24gPSBjdXJyeU4oNCwgcmF3Q2FzZSk7XG5cbmZ1bmN0aW9uIFR5cGUoZGVzYykge1xuICB2YXIgb2JqID0ge307XG4gIGZvciAodmFyIGtleSBpbiBkZXNjKSB7XG4gICAgb2JqW2tleV0gPSBDb25zdHJ1Y3RvcihvYmosIGtleSwgZGVzY1trZXldKTtcbiAgfVxuICBvYmouY2FzZSA9IHR5cGVDYXNlKG9iaik7XG4gIG9iai5jYXNlT24gPSBjYXNlT24ob2JqKTtcbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUeXBlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX3VuaW9uLXR5cGVAMC4xLjZAdW5pb24tdHlwZS91bmlvbi10eXBlLmpzXG4vLyBtb2R1bGUgaWQgPSBQWVhmXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBvdmVyQXJnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2xvZGFzaC1lc0A0LjE3LjRAbG9kYXNoLWVzL19vdmVyQXJnLmpzXG4vLyBtb2R1bGUgaWQgPSBQajl2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEFjdGlvblR5cGVzIH0gZnJvbSAnLi9jcmVhdGVTdG9yZSc7XG5pbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICdsb2Rhc2gtZXMvaXNQbGFpbk9iamVjdCc7XG5pbXBvcnQgd2FybmluZyBmcm9tICcuL3V0aWxzL3dhcm5pbmcnO1xuXG5mdW5jdGlvbiBnZXRVbmRlZmluZWRTdGF0ZUVycm9yTWVzc2FnZShrZXksIGFjdGlvbikge1xuICB2YXIgYWN0aW9uVHlwZSA9IGFjdGlvbiAmJiBhY3Rpb24udHlwZTtcbiAgdmFyIGFjdGlvbk5hbWUgPSBhY3Rpb25UeXBlICYmICdcIicgKyBhY3Rpb25UeXBlLnRvU3RyaW5nKCkgKyAnXCInIHx8ICdhbiBhY3Rpb24nO1xuXG4gIHJldHVybiAnR2l2ZW4gYWN0aW9uICcgKyBhY3Rpb25OYW1lICsgJywgcmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkLiAnICsgJ1RvIGlnbm9yZSBhbiBhY3Rpb24sIHlvdSBtdXN0IGV4cGxpY2l0bHkgcmV0dXJuIHRoZSBwcmV2aW91cyBzdGF0ZS4gJyArICdJZiB5b3Ugd2FudCB0aGlzIHJlZHVjZXIgdG8gaG9sZCBubyB2YWx1ZSwgeW91IGNhbiByZXR1cm4gbnVsbCBpbnN0ZWFkIG9mIHVuZGVmaW5lZC4nO1xufVxuXG5mdW5jdGlvbiBnZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlKGlucHV0U3RhdGUsIHJlZHVjZXJzLCBhY3Rpb24sIHVuZXhwZWN0ZWRLZXlDYWNoZSkge1xuICB2YXIgcmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhyZWR1Y2Vycyk7XG4gIHZhciBhcmd1bWVudE5hbWUgPSBhY3Rpb24gJiYgYWN0aW9uLnR5cGUgPT09IEFjdGlvblR5cGVzLklOSVQgPyAncHJlbG9hZGVkU3RhdGUgYXJndW1lbnQgcGFzc2VkIHRvIGNyZWF0ZVN0b3JlJyA6ICdwcmV2aW91cyBzdGF0ZSByZWNlaXZlZCBieSB0aGUgcmVkdWNlcic7XG5cbiAgaWYgKHJlZHVjZXJLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAnU3RvcmUgZG9lcyBub3QgaGF2ZSBhIHZhbGlkIHJlZHVjZXIuIE1ha2Ugc3VyZSB0aGUgYXJndW1lbnQgcGFzc2VkICcgKyAndG8gY29tYmluZVJlZHVjZXJzIGlzIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIHJlZHVjZXJzLic7XG4gIH1cblxuICBpZiAoIWlzUGxhaW5PYmplY3QoaW5wdXRTdGF0ZSkpIHtcbiAgICByZXR1cm4gJ1RoZSAnICsgYXJndW1lbnROYW1lICsgJyBoYXMgdW5leHBlY3RlZCB0eXBlIG9mIFwiJyArIHt9LnRvU3RyaW5nLmNhbGwoaW5wdXRTdGF0ZSkubWF0Y2goL1xccyhbYS16fEEtWl0rKS8pWzFdICsgJ1wiLiBFeHBlY3RlZCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nICcgKyAoJ2tleXM6IFwiJyArIHJlZHVjZXJLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiJyk7XG4gIH1cblxuICB2YXIgdW5leHBlY3RlZEtleXMgPSBPYmplY3Qua2V5cyhpbnB1dFN0YXRlKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiAhcmVkdWNlcnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhdW5leHBlY3RlZEtleUNhY2hlW2tleV07XG4gIH0pO1xuXG4gIHVuZXhwZWN0ZWRLZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHVuZXhwZWN0ZWRLZXlDYWNoZVtrZXldID0gdHJ1ZTtcbiAgfSk7XG5cbiAgaWYgKHVuZXhwZWN0ZWRLZXlzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gJ1VuZXhwZWN0ZWQgJyArICh1bmV4cGVjdGVkS2V5cy5sZW5ndGggPiAxID8gJ2tleXMnIDogJ2tleScpICsgJyAnICsgKCdcIicgKyB1bmV4cGVjdGVkS2V5cy5qb2luKCdcIiwgXCInKSArICdcIiBmb3VuZCBpbiAnICsgYXJndW1lbnROYW1lICsgJy4gJykgKyAnRXhwZWN0ZWQgdG8gZmluZCBvbmUgb2YgdGhlIGtub3duIHJlZHVjZXIga2V5cyBpbnN0ZWFkOiAnICsgKCdcIicgKyByZWR1Y2VyS2V5cy5qb2luKCdcIiwgXCInKSArICdcIi4gVW5leHBlY3RlZCBrZXlzIHdpbGwgYmUgaWdub3JlZC4nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRSZWR1Y2VyU2hhcGUocmVkdWNlcnMpIHtcbiAgT2JqZWN0LmtleXMocmVkdWNlcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciByZWR1Y2VyID0gcmVkdWNlcnNba2V5XTtcbiAgICB2YXIgaW5pdGlhbFN0YXRlID0gcmVkdWNlcih1bmRlZmluZWQsIHsgdHlwZTogQWN0aW9uVHlwZXMuSU5JVCB9KTtcblxuICAgIGlmICh0eXBlb2YgaW5pdGlhbFN0YXRlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQgZHVyaW5nIGluaXRpYWxpemF0aW9uLiAnICsgJ0lmIHRoZSBzdGF0ZSBwYXNzZWQgdG8gdGhlIHJlZHVjZXIgaXMgdW5kZWZpbmVkLCB5b3UgbXVzdCAnICsgJ2V4cGxpY2l0bHkgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLiBUaGUgaW5pdGlhbCBzdGF0ZSBtYXkgJyArICdub3QgYmUgdW5kZWZpbmVkLiBJZiB5b3UgZG9uXFwndCB3YW50IHRvIHNldCBhIHZhbHVlIGZvciB0aGlzIHJlZHVjZXIsICcgKyAneW91IGNhbiB1c2UgbnVsbCBpbnN0ZWFkIG9mIHVuZGVmaW5lZC4nKTtcbiAgICB9XG5cbiAgICB2YXIgdHlwZSA9ICdAQHJlZHV4L1BST0JFX1VOS05PV05fQUNUSU9OXycgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNykuc3BsaXQoJycpLmpvaW4oJy4nKTtcbiAgICBpZiAodHlwZW9mIHJlZHVjZXIodW5kZWZpbmVkLCB7IHR5cGU6IHR5cGUgfSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZCB3aGVuIHByb2JlZCB3aXRoIGEgcmFuZG9tIHR5cGUuICcgKyAoJ0RvblxcJ3QgdHJ5IHRvIGhhbmRsZSAnICsgQWN0aW9uVHlwZXMuSU5JVCArICcgb3Igb3RoZXIgYWN0aW9ucyBpbiBcInJlZHV4LypcIiAnKSArICduYW1lc3BhY2UuIFRoZXkgYXJlIGNvbnNpZGVyZWQgcHJpdmF0ZS4gSW5zdGVhZCwgeW91IG11c3QgcmV0dXJuIHRoZSAnICsgJ2N1cnJlbnQgc3RhdGUgZm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHVubGVzcyBpdCBpcyB1bmRlZmluZWQsICcgKyAnaW4gd2hpY2ggY2FzZSB5b3UgbXVzdCByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUsIHJlZ2FyZGxlc3Mgb2YgdGhlICcgKyAnYWN0aW9uIHR5cGUuIFRoZSBpbml0aWFsIHN0YXRlIG1heSBub3QgYmUgdW5kZWZpbmVkLCBidXQgY2FuIGJlIG51bGwuJyk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBkaWZmZXJlbnQgcmVkdWNlciBmdW5jdGlvbnMsIGludG8gYSBzaW5nbGVcbiAqIHJlZHVjZXIgZnVuY3Rpb24uIEl0IHdpbGwgY2FsbCBldmVyeSBjaGlsZCByZWR1Y2VyLCBhbmQgZ2F0aGVyIHRoZWlyIHJlc3VsdHNcbiAqIGludG8gYSBzaW5nbGUgc3RhdGUgb2JqZWN0LCB3aG9zZSBrZXlzIGNvcnJlc3BvbmQgdG8gdGhlIGtleXMgb2YgdGhlIHBhc3NlZFxuICogcmVkdWNlciBmdW5jdGlvbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJlZHVjZXJzIEFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgY29ycmVzcG9uZCB0byBkaWZmZXJlbnRcbiAqIHJlZHVjZXIgZnVuY3Rpb25zIHRoYXQgbmVlZCB0byBiZSBjb21iaW5lZCBpbnRvIG9uZS4gT25lIGhhbmR5IHdheSB0byBvYnRhaW5cbiAqIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzIHJlZHVjZXJzYCBzeW50YXguIFRoZSByZWR1Y2VycyBtYXkgbmV2ZXIgcmV0dXJuXG4gKiB1bmRlZmluZWQgZm9yIGFueSBhY3Rpb24uIEluc3RlYWQsIHRoZXkgc2hvdWxkIHJldHVybiB0aGVpciBpbml0aWFsIHN0YXRlXG4gKiBpZiB0aGUgc3RhdGUgcGFzc2VkIHRvIHRoZW0gd2FzIHVuZGVmaW5lZCwgYW5kIHRoZSBjdXJyZW50IHN0YXRlIGZvciBhbnlcbiAqIHVucmVjb2duaXplZCBhY3Rpb24uXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHJlZHVjZXIgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGV2ZXJ5IHJlZHVjZXIgaW5zaWRlIHRoZVxuICogcGFzc2VkIG9iamVjdCwgYW5kIGJ1aWxkcyBhIHN0YXRlIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21iaW5lUmVkdWNlcnMocmVkdWNlcnMpIHtcbiAgdmFyIHJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMocmVkdWNlcnMpO1xuICB2YXIgZmluYWxSZWR1Y2VycyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZHVjZXJLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IHJlZHVjZXJLZXlzW2ldO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2FybmluZygnTm8gcmVkdWNlciBwcm92aWRlZCBmb3Iga2V5IFwiJyArIGtleSArICdcIicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZmluYWxSZWR1Y2Vyc1trZXldID0gcmVkdWNlcnNba2V5XTtcbiAgICB9XG4gIH1cbiAgdmFyIGZpbmFsUmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhmaW5hbFJlZHVjZXJzKTtcblxuICB2YXIgdW5leHBlY3RlZEtleUNhY2hlID0gdm9pZCAwO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHVuZXhwZWN0ZWRLZXlDYWNoZSA9IHt9O1xuICB9XG5cbiAgdmFyIHNoYXBlQXNzZXJ0aW9uRXJyb3IgPSB2b2lkIDA7XG4gIHRyeSB7XG4gICAgYXNzZXJ0UmVkdWNlclNoYXBlKGZpbmFsUmVkdWNlcnMpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgc2hhcGVBc3NlcnRpb25FcnJvciA9IGU7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gY29tYmluYXRpb24oKSB7XG4gICAgdmFyIHN0YXRlID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICB2YXIgYWN0aW9uID0gYXJndW1lbnRzWzFdO1xuXG4gICAgaWYgKHNoYXBlQXNzZXJ0aW9uRXJyb3IpIHtcbiAgICAgIHRocm93IHNoYXBlQXNzZXJ0aW9uRXJyb3I7XG4gICAgfVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciB3YXJuaW5nTWVzc2FnZSA9IGdldFVuZXhwZWN0ZWRTdGF0ZVNoYXBlV2FybmluZ01lc3NhZ2Uoc3RhdGUsIGZpbmFsUmVkdWNlcnMsIGFjdGlvbiwgdW5leHBlY3RlZEtleUNhY2hlKTtcbiAgICAgIGlmICh3YXJuaW5nTWVzc2FnZSkge1xuICAgICAgICB3YXJuaW5nKHdhcm5pbmdNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgaGFzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIHZhciBuZXh0U3RhdGUgPSB7fTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgZmluYWxSZWR1Y2VyS2V5cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfa2V5ID0gZmluYWxSZWR1Y2VyS2V5c1tfaV07XG4gICAgICB2YXIgcmVkdWNlciA9IGZpbmFsUmVkdWNlcnNbX2tleV07XG4gICAgICB2YXIgcHJldmlvdXNTdGF0ZUZvcktleSA9IHN0YXRlW19rZXldO1xuICAgICAgdmFyIG5leHRTdGF0ZUZvcktleSA9IHJlZHVjZXIocHJldmlvdXNTdGF0ZUZvcktleSwgYWN0aW9uKTtcbiAgICAgIGlmICh0eXBlb2YgbmV4dFN0YXRlRm9yS2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZ2V0VW5kZWZpbmVkU3RhdGVFcnJvck1lc3NhZ2UoX2tleSwgYWN0aW9uKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBuZXh0U3RhdGVbX2tleV0gPSBuZXh0U3RhdGVGb3JLZXk7XG4gICAgICBoYXNDaGFuZ2VkID0gaGFzQ2hhbmdlZCB8fCBuZXh0U3RhdGVGb3JLZXkgIT09IHByZXZpb3VzU3RhdGVGb3JLZXk7XG4gICAgfVxuICAgIHJldHVybiBoYXNDaGFuZ2VkID8gbmV4dFN0YXRlIDogc3RhdGU7XG4gIH07XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX3JlZHV4QDMuNy4yQHJlZHV4L2VzL2NvbWJpbmVSZWR1Y2Vycy5qc1xuLy8gbW9kdWxlIGlkID0gUklKZVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoTykge1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXMoTywgSUVfUFJPVE8pKSByZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmICh0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzXG4vLyBtb2R1bGUgaWQgPSBTWnFMXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuLy8gbW9kdWxlIGlkID0gVFVFYlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbmNvbnN0IHRvZG9zID0gKHN0YXRlID0gW10sIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnQUREX1RPRE8nOlxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogYWN0aW9uLmlkLFxuICAgICAgICAgIHRleHQ6IGFjdGlvbi50ZXh0LFxuICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2VcbiAgICAgICAgfVxuICAgICAgXVxuICAgIGNhc2UgJ1RPR0dMRV9UT0RPJzpcbiAgICAgIHJldHVybiBzdGF0ZS5tYXAodG9kbyA9PlxuICAgICAgICAodG9kby5pZCA9PT0gYWN0aW9uLmlkKSBcbiAgICAgICAgICA/IHsuLi50b2RvLCBjb21wbGV0ZWQ6ICF0b2RvLmNvbXBsZXRlZH1cbiAgICAgICAgICA6IHRvZG9cbiAgICAgIClcbiAgICBjYXNlICdSRU1PVkVfVE9ETyc6XG4gICAgICByZXR1cm4gc3RhdGUuZmlsdGVyKHRvZG8gPT4gdG9kby5pZCAhPT0gYWN0aW9uLmlkKVxuICAgIFxuICAgIGNhc2UgJ1JFTU9WRV9DT01QTEVURUQnOlxuICAgICAgcmV0dXJuIHN0YXRlLmZpbHRlcih0b2RvID0+ICF0b2RvLmNvbXBsZXRlZClcblxuICAgIGNhc2UgJ1RPR0dMRV9BTEwnOlxuICAgICAgcmV0dXJuIHN0YXRlLm1hcCh0b2RvID0+KHsuLi50b2RvLGNvbXBsZXRlZDphY3Rpb24uZmxhZ30pKVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB0b2Rvc1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yZWR1Y2Vycy90b2Rvcy5qcyIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc09iamVjdExpa2U7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fbG9kYXNoLWVzQDQuMTcuNEBsb2Rhc2gtZXMvaXNPYmplY3RMaWtlLmpzXG4vLyBtb2R1bGUgaWQgPSBWVlhMXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuZXhwb3J0IGRlZmF1bHQgU3ltYm9sO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2xvZGFzaC1lc0A0LjE3LjRAbG9kYXNoLWVzL19TeW1ib2wuanNcbi8vIG1vZHVsZSBpZCA9IFZaclpcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmFzc2lnbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSBWZmV4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIEFSRyA9IGNvZihmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzXG4vLyBtb2R1bGUgaWQgPSBXSzlMXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBuYXR1cmFsU2VsZWN0aW9uID0gcmVxdWlyZSgnbmF0dXJhbC1zZWxlY3Rpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihlbGVtZW50LCB2YWx1ZSl7XG4gICAgdmFyIGNhblNldCA9IG5hdHVyYWxTZWxlY3Rpb24oZWxlbWVudCkgJiYgZWxlbWVudCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblxuICAgIGlmIChjYW5TZXQpIHtcbiAgICAgICAgdmFyIHN0YXJ0ID0gZWxlbWVudC5zZWxlY3Rpb25TdGFydCxcbiAgICAgICAgICAgIGVuZCA9IGVsZW1lbnQuc2VsZWN0aW9uRW5kO1xuXG4gICAgICAgIGVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShzdGFydCwgZW5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19zZXRpZnlAMS4wLjNAc2V0aWZ5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSBXUjM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogU3VwcG9ydGVkIFNWRyBlbGVtZW50c1xuICpcbiAqIEB0eXBlIHtBcnJheX1cbiAqL1xuXG5leHBvcnRzLmVsZW1lbnRzID0ge1xuICAnYW5pbWF0ZSc6IHRydWUsXG4gICdjaXJjbGUnOiB0cnVlLFxuICAnZGVmcyc6IHRydWUsXG4gICdlbGxpcHNlJzogdHJ1ZSxcbiAgJ2cnOiB0cnVlLFxuICAnbGluZSc6IHRydWUsXG4gICdsaW5lYXJHcmFkaWVudCc6IHRydWUsXG4gICdtYXNrJzogdHJ1ZSxcbiAgJ3BhdGgnOiB0cnVlLFxuICAncGF0dGVybic6IHRydWUsXG4gICdwb2x5Z29uJzogdHJ1ZSxcbiAgJ3BvbHlsaW5lJzogdHJ1ZSxcbiAgJ3JhZGlhbEdyYWRpZW50JzogdHJ1ZSxcbiAgJ3JlY3QnOiB0cnVlLFxuICAnc3RvcCc6IHRydWUsXG4gICdzdmcnOiB0cnVlLFxuICAndGV4dCc6IHRydWUsXG4gICd0c3Bhbic6IHRydWVcbn1cblxuLyoqXG4gKiBJcyBlbGVtZW50J3MgbmFtZXNwYWNlIFNWRz9cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICovXG5cbmV4cG9ydHMuaXNFbGVtZW50ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWUgaW4gZXhwb3J0cy5lbGVtZW50c1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2lzLXN2Zy1lbGVtZW50QDEuMC4xQGlzLXN2Zy1lbGVtZW50L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSBXa1ExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzXG4vLyBtb2R1bGUgaWQgPSBXb0ZSXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gWDYwOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanNcbi8vIG1vZHVsZSBpZCA9IFlFbXdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyYXRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IFl0Y2Fcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzWydkZWZhdWx0J10gPSBTdmdBdHRyaWJ1dGVOYW1lc3BhY2VcblxuLypcbiAqIFN1cHBvcnRlZCBTVkcgYXR0cmlidXRlIG5hbWVzcGFjZXMgYnkgcHJlZml4LlxuICpcbiAqIFJlZmVyZW5jZXM6XG4gKiAtIGh0dHA6Ly93d3cudzMub3JnL1RSL1NWR1RpbnkxMi9hdHRyaWJ1dGVUYWJsZS5odG1sXG4gKiAtIGh0dHA6Ly93d3cudzMub3JnL1RSL1NWRy9hdHRpbmRleC5odG1sXG4gKiAtIGh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0yLUNvcmUvY29yZS5odG1sI0lELUVsU2V0QXR0ck5TXG4gKi9cblxudmFyIG5hbWVzcGFjZXMgPSBtb2R1bGUuZXhwb3J0cy5uYW1lc3BhY2VzID0ge1xuICBldjogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEveG1sLWV2ZW50cycsXG4gIHhsaW5rOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsXG4gIHhtbDogJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZScsXG4gIHhtbG5zOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nXG59XG5cbi8qKlxuICogR2V0IG5hbWVzcGFjZSBvZiBzdmcgYXR0cmlidXRlXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJpYnV0ZU5hbWVcbiAqIEByZXR1cm4ge1N0cmluZ30gbmFtZXNwYWNlXG4gKi9cblxuZnVuY3Rpb24gU3ZnQXR0cmlidXRlTmFtZXNwYWNlIChhdHRyaWJ1dGVOYW1lKSB7XG4gIC8vIGlmIG5vIHByZWZpeCBzZXBhcmF0b3IgaW4gYXR0cmlidXRlTmFtZSwgdGhlbiBubyBuYW1lc3BhY2VcbiAgaWYgKGF0dHJpYnV0ZU5hbWUuaW5kZXhPZignOicpID09PSAtMSkgcmV0dXJuIG51bGxcblxuICAvLyBnZXQgcHJlZml4IGZyb20gYXR0cmlidXRlTmFtZVxuICB2YXIgcHJlZml4ID0gYXR0cmlidXRlTmFtZS5zcGxpdCgnOicsIDEpWzBdXG5cbiAgLy8gaWYgcHJlZml4IGluIHN1cHBvcnRlZCBwcmVmaXhlc1xuICBpZiAobmFtZXNwYWNlcy5oYXNPd25Qcm9wZXJ0eShwcmVmaXgpKSB7XG4gICAgLy8gdGhlbiBuYW1lc3BhY2Ugb2YgcHJlZml4XG4gICAgcmV0dXJuIG5hbWVzcGFjZXNbcHJlZml4XVxuICB9IGVsc2Uge1xuICAgIC8vIGVsc2UgdW5zdXBwb3J0ZWQgcHJlZml4XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzdmctYXR0cmlidXRlLW5hbWVzcGFjZTogcHJlZml4IFwiJyArIHByZWZpeCArICdcIiBpcyBub3Qgc3VwcG9ydGVkIGJ5IFNWRy4nKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fc3ZnLWF0dHJpYnV0ZS1uYW1lc3BhY2VAMi4xLjBAc3ZnLWF0dHJpYnV0ZS1uYW1lc3BhY2UvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IFpNUFpcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanNcbi8vIG1vZHVsZSBpZCA9IFplTmxcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fYmFiZWwtcnVudGltZUA2LjI2LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IGFBOVNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXG5cdFx0ZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSBicjlrXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faGlkZScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSBjK213XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogUHJpbnRzIGEgd2FybmluZyBpbiB0aGUgY29uc29sZSBpZiBpdCBleGlzdHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIHdhcm5pbmcgbWVzc2FnZS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2UpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cbiAgdHJ5IHtcbiAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IGlmIHlvdSBlbmFibGVcbiAgICAvLyBcImJyZWFrIG9uIGFsbCBleGNlcHRpb25zXCIgaW4geW91ciBjb25zb2xlLFxuICAgIC8vIGl0IHdvdWxkIHBhdXNlIHRoZSBleGVjdXRpb24gYXQgdGhpcyBsaW5lLlxuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eSAqL1xuICB9IGNhdGNoIChlKSB7fVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWVtcHR5ICovXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX3JlZHV4QDMuNy4yQHJlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanNcbi8vIG1vZHVsZSBpZCA9IGNEV0Zcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG9iamVjdFRvU3RyaW5nO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2xvZGFzaC1lc0A0LjE3LjRAbG9kYXNoLWVzL19vYmplY3RUb1N0cmluZy5qc1xuLy8gbW9kdWxlIGlkID0gY1pDRVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5leHBvcnQgZGVmYXVsdCBmcmVlR2xvYmFsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2xvZGFzaC1lc0A0LjE3LjRAbG9kYXNoLWVzL19mcmVlR2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSBkd2pGXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogT3B0aW1pemVkIGludGVybmFsIHR3by1hcml0eSBjdXJyeSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2N1cnJ5MShmbikge1xuICByZXR1cm4gZnVuY3Rpb24gZjEoYSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZjE7XG4gICAgfSBlbHNlIGlmIChhICE9IG51bGwgJiYgYVsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBmMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZuKGEpO1xuICAgIH1cbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fcmFtZGFAMC4xNS4xQHJhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnkxLmpzXG4vLyBtb2R1bGUgaWQgPSBlM1ZMXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZUVsZW1lbnQ7XG5cbnZhciBfZWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxudmFyIF9zZXRBdHRyaWJ1dGUgPSByZXF1aXJlKCcuL3NldEF0dHJpYnV0ZScpO1xuXG52YXIgX3N2ZyA9IHJlcXVpcmUoJy4vc3ZnJyk7XG5cbnZhciBfc3ZnMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N2Zyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBjYWNoZSA9IHt9O1xuXG4vKipcbiAqIENyZWF0ZSBhIHJlYWwgRE9NIGVsZW1lbnQgZnJvbSBhIHZpcnR1YWwgZWxlbWVudCwgcmVjdXJzaXZlbHkgbG9vcGluZyBkb3duLlxuICogV2hlbiBpdCBmaW5kcyBjdXN0b20gZWxlbWVudHMgaXQgd2lsbCByZW5kZXIgdGhlbSwgY2FjaGUgdGhlbSwgYW5kIGtlZXAgZ29pbmcsXG4gKiBzbyB0aGV5IGFyZSB0cmVhdGVkIGxpa2UgYW55IG90aGVyIG5hdGl2ZSBlbGVtZW50LlxuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodm5vZGUsIHBhdGgsIGRpc3BhdGNoLCBjb250ZXh0KSB7XG4gIGlmICgoMCwgX2VsZW1lbnQuaXNUZXh0KSh2bm9kZSkpIHtcbiAgICB2YXIgdmFsdWUgPSB0eXBlb2Ygdm5vZGUubm9kZVZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygdm5vZGUubm9kZVZhbHVlID09PSAnbnVtYmVyJyA/IHZub2RlLm5vZGVWYWx1ZSA6ICcnO1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSk7XG4gIH1cblxuICBpZiAoKDAsIF9lbGVtZW50LmlzRW1wdHkpKHZub2RlKSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdub3NjcmlwdCcpO1xuICB9XG5cbiAgaWYgKCgwLCBfZWxlbWVudC5pc1RodW5rKSh2bm9kZSkpIHtcbiAgICB2YXIgcHJvcHMgPSB2bm9kZS5wcm9wcztcbiAgICB2YXIgY29tcG9uZW50ID0gdm5vZGUuY29tcG9uZW50O1xuICAgIHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuO1xuICAgIHZhciBvbkNyZWF0ZSA9IGNvbXBvbmVudC5vbkNyZWF0ZTtcblxuICAgIHZhciByZW5kZXIgPSB0eXBlb2YgY29tcG9uZW50ID09PSAnZnVuY3Rpb24nID8gY29tcG9uZW50IDogY29tcG9uZW50LnJlbmRlcjtcbiAgICB2YXIgbW9kZWwgPSB7XG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgICBwcm9wczogcHJvcHMsXG4gICAgICBwYXRoOiBwYXRoLFxuICAgICAgZGlzcGF0Y2g6IGRpc3BhdGNoLFxuICAgICAgY29udGV4dDogY29udGV4dFxuICAgIH07XG4gICAgdmFyIG91dHB1dCA9IHJlbmRlcihtb2RlbCk7XG4gICAgdmFyIF9ET01FbGVtZW50ID0gY3JlYXRlRWxlbWVudChvdXRwdXQsICgwLCBfZWxlbWVudC5jcmVhdGVQYXRoKShwYXRoLCBvdXRwdXQua2V5IHx8ICcwJyksIGRpc3BhdGNoLCBjb250ZXh0KTtcbiAgICBpZiAob25DcmVhdGUpIG9uQ3JlYXRlKG1vZGVsKTtcbiAgICB2bm9kZS5zdGF0ZSA9IHtcbiAgICAgIHZub2RlOiBvdXRwdXQsXG4gICAgICBtb2RlbDogbW9kZWxcbiAgICB9O1xuICAgIHJldHVybiBfRE9NRWxlbWVudDtcbiAgfVxuXG4gIHZhciBjYWNoZWQgPSBjYWNoZVt2bm9kZS50eXBlXTtcblxuICBpZiAodHlwZW9mIGNhY2hlZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjYWNoZWQgPSBjYWNoZVt2bm9kZS50eXBlXSA9IF9zdmcyLmRlZmF1bHQuaXNFbGVtZW50KHZub2RlLnR5cGUpID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKF9zdmcyLmRlZmF1bHQubmFtZXNwYWNlLCB2bm9kZS50eXBlKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodm5vZGUudHlwZSk7XG4gIH1cblxuICB2YXIgRE9NRWxlbWVudCA9IGNhY2hlZC5jbG9uZU5vZGUoZmFsc2UpO1xuXG4gIGZvciAodmFyIG5hbWUgaW4gdm5vZGUuYXR0cmlidXRlcykge1xuICAgICgwLCBfc2V0QXR0cmlidXRlLnNldEF0dHJpYnV0ZSkoRE9NRWxlbWVudCwgbmFtZSwgdm5vZGUuYXR0cmlidXRlc1tuYW1lXSk7XG4gIH1cblxuICB2bm9kZS5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgIGlmIChub2RlID09PSBudWxsIHx8IG5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgY2hpbGQgPSBjcmVhdGVFbGVtZW50KG5vZGUsICgwLCBfZWxlbWVudC5jcmVhdGVQYXRoKShwYXRoLCBub2RlLmtleSB8fCBpbmRleCksIGRpc3BhdGNoLCBjb250ZXh0KTtcbiAgICBET01FbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgfSk7XG5cbiAgcmV0dXJuIERPTUVsZW1lbnQ7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2Rla3VAMi4wLjAtcmMxNkBkZWt1L2xpYi9kb20vY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSBlNFpHXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBnZXRSYXdUYWcgZnJvbSAnLi9fZ2V0UmF3VGFnLmpzJztcbmltcG9ydCBvYmplY3RUb1N0cmluZyBmcm9tICcuL19vYmplY3RUb1N0cmluZy5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlR2V0VGFnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2xvZGFzaC1lc0A0LjE3LjRAbG9kYXNoLWVzL19iYXNlR2V0VGFnLmpzXG4vLyBtb2R1bGUgaWQgPSBlQVlqXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IGVzVjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qc1xuLy8gbW9kdWxlIGlkID0gZXgrNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgSVNfV1JBUCA9IHR5cGUgJiAkZXhwb3J0Llc7XG4gIHZhciBleHBvcnRzID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIHZhciBleHBQcm90byA9IGV4cG9ydHNbUFJPVE9UWVBFXTtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV07XG4gIHZhciBrZXksIG93biwgb3V0O1xuICBpZiAoSVNfR0xPQkFMKSBzb3VyY2UgPSBuYW1lO1xuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmIChvd24gJiYga2V5IGluIGV4cG9ydHMpIGNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24gKEMpIHtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDKSB7XG4gICAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQygpO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZiAoSVNfUFJPVE8pIHtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZiAodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSkgaGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanNcbi8vIG1vZHVsZSBpZCA9IGY2OGFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gZkhTQ1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vX2Nzcy1sb2FkZXJAMC4yOC43QGNzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJodG1sLFxcbmJvZHkge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcbn1cXG5cXG5idXR0b24ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRiYWNrZ3JvdW5kOiBub25lO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxuXFx0Zm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuXFx0Zm9udC13ZWlnaHQ6IGluaGVyaXQ7XFxuXFx0Y29sb3I6IGluaGVyaXQ7XFxuXFx0LXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcblxcdGFwcGVhcmFuY2U6IG5vbmU7XFxuXFx0LXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuXFx0LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG59XFxuXFxuYm9keSB7XFxuXFx0Zm9udDogMTRweCAnSGVsdmV0aWNhIE5ldWUnLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcblxcdGxpbmUtaGVpZ2h0OiAxLjRlbTtcXG5cXHRiYWNrZ3JvdW5kOiAjZjVmNWY1O1xcblxcdGNvbG9yOiAjNGQ0ZDRkO1xcblxcdG1pbi13aWR0aDogMjMwcHg7XFxuXFx0bWF4LXdpZHRoOiA1NTBweDtcXG5cXHRtYXJnaW46IDAgYXV0bztcXG5cXHQtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG5cXHQtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xcblxcdGZvbnQtd2VpZ2h0OiAzMDA7XFxufVxcblxcbjpmb2N1cyB7XFxuXFx0b3V0bGluZTogMDtcXG59XFxuXFxuLmhpZGRlbiB7XFxuXFx0ZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLnRvZG9hcHAge1xcblxcdGJhY2tncm91bmQ6ICNmZmY7XFxuXFx0bWFyZ2luOiAxMzBweCAwIDQwcHggMDtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0Ym94LXNoYWRvdzogMCAycHggNHB4IDAgcmdiYSgwLCAwLCAwLCAwLjIpLFxcblxcdCAgICAgICAgICAgIDAgMjVweCA1MHB4IDAgcmdiYSgwLCAwLCAwLCAwLjEpO1xcbn1cXG5cXG4udG9kb2FwcCBpbnB1dDo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XFxuXFx0Zm9udC1zdHlsZTogaXRhbGljO1xcblxcdGZvbnQtd2VpZ2h0OiAzMDA7XFxuXFx0Y29sb3I6ICNlNmU2ZTY7XFxufVxcblxcbi50b2RvYXBwIGlucHV0OjotbW96LXBsYWNlaG9sZGVyIHtcXG5cXHRmb250LXN0eWxlOiBpdGFsaWM7XFxuXFx0Zm9udC13ZWlnaHQ6IDMwMDtcXG5cXHRjb2xvcjogI2U2ZTZlNjtcXG59XFxuXFxuLnRvZG9hcHAgaW5wdXQ6OmlucHV0LXBsYWNlaG9sZGVyIHtcXG5cXHRmb250LXN0eWxlOiBpdGFsaWM7XFxuXFx0Zm9udC13ZWlnaHQ6IDMwMDtcXG5cXHRjb2xvcjogI2U2ZTZlNjtcXG59XFxuXFxuLnRvZG9hcHAgaDEge1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHR0b3A6IC0xNTVweDtcXG5cXHR3aWR0aDogMTAwJTtcXG5cXHRmb250LXNpemU6IDEwMHB4O1xcblxcdGZvbnQtd2VpZ2h0OiAxMDA7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdGNvbG9yOiByZ2JhKDE3NSwgNDcsIDQ3LCAwLjE1KTtcXG5cXHQtd2Via2l0LXRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XFxuXFx0LW1vei10ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xcblxcdHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XFxufVxcblxcbi5uZXctdG9kbyxcXG4uZWRpdCB7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdG1hcmdpbjogMDtcXG5cXHR3aWR0aDogMTAwJTtcXG5cXHRmb250LXNpemU6IDI0cHg7XFxuXFx0Zm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuXFx0Zm9udC13ZWlnaHQ6IGluaGVyaXQ7XFxuXFx0bGluZS1oZWlnaHQ6IDEuNGVtO1xcblxcdGJvcmRlcjogMDtcXG5cXHRjb2xvcjogaW5oZXJpdDtcXG5cXHRwYWRkaW5nOiA2cHg7XFxuXFx0Ym9yZGVyOiAxcHggc29saWQgIzk5OTtcXG5cXHRib3gtc2hhZG93OiBpbnNldCAwIC0xcHggNXB4IDAgcmdiYSgwLCAwLCAwLCAwLjIpO1xcblxcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuXFx0LXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuXFx0LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG59XFxuXFxuLm5ldy10b2RvIHtcXG5cXHRwYWRkaW5nOiAxNnB4IDE2cHggMTZweCA2MHB4O1xcblxcdGJvcmRlcjogbm9uZTtcXG5cXHRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMDAzKTtcXG5cXHRib3gtc2hhZG93OiBpbnNldCAwIC0ycHggMXB4IHJnYmEoMCwwLDAsMC4wMyk7XFxufVxcblxcbi5tYWluIHtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0ei1pbmRleDogMjtcXG5cXHRib3JkZXItdG9wOiAxcHggc29saWQgI2U2ZTZlNjtcXG59XFxuXFxuLnRvZ2dsZS1hbGwge1xcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHRib3JkZXI6IG5vbmU7IC8qIE1vYmlsZSBTYWZhcmkgKi9cXG5cXHRvcGFjaXR5OiAwO1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG59XFxuXFxuLnRvZ2dsZS1hbGwgKyBsYWJlbCB7XFxuXFx0d2lkdGg6IDYwcHg7XFxuXFx0aGVpZ2h0OiAzNHB4O1xcblxcdGZvbnQtc2l6ZTogMDtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0dG9wOiAtNTJweDtcXG5cXHRsZWZ0OiAtMTNweDtcXG5cXHQtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG5cXHR0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxufVxcblxcbi50b2dnbGUtYWxsICsgbGFiZWw6YmVmb3JlIHtcXG5cXHRjb250ZW50OiAnXFxcXDI3NkYnO1xcblxcdGZvbnQtc2l6ZTogMjJweDtcXG5cXHRjb2xvcjogI2U2ZTZlNjtcXG5cXHRwYWRkaW5nOiAxMHB4IDI3cHggMTBweCAyN3B4O1xcbn1cXG5cXG4udG9nZ2xlLWFsbDpjaGVja2VkICsgbGFiZWw6YmVmb3JlIHtcXG5cXHRjb2xvcjogIzczNzM3MztcXG59XFxuXFxuLnRvZG8tbGlzdCB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaSB7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdGZvbnQtc2l6ZTogMjRweDtcXG5cXHRib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VkZWRlZDtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaTpsYXN0LWNoaWxkIHtcXG5cXHRib3JkZXItYm90dG9tOiBub25lO1xcbn1cXG5cXG4udG9kby1saXN0IGxpLmVkaXRpbmcge1xcblxcdGJvcmRlci1ib3R0b206IG5vbmU7XFxuXFx0cGFkZGluZzogMDtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaS5lZGl0aW5nIC5lZGl0IHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG5cXHR3aWR0aDogNTA2cHg7XFxuXFx0cGFkZGluZzogMTJweCAxNnB4O1xcblxcdG1hcmdpbjogMCAwIDAgNDNweDtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaS5lZGl0aW5nIC52aWV3IHtcXG5cXHRkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4udG9kby1saXN0IGxpIC50b2dnbGUge1xcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHR3aWR0aDogNDBweDtcXG5cXHQvKiBhdXRvLCBzaW5jZSBub24tV2ViS2l0IGJyb3dzZXJzIGRvZXNuJ3Qgc3VwcG9ydCBpbnB1dCBzdHlsaW5nICovXFxuXFx0aGVpZ2h0OiBhdXRvO1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHR0b3A6IDA7XFxuXFx0Ym90dG9tOiAwO1xcblxcdG1hcmdpbjogYXV0byAwO1xcblxcdGJvcmRlcjogbm9uZTsgLyogTW9iaWxlIFNhZmFyaSAqL1xcblxcdC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG5cXHRhcHBlYXJhbmNlOiBub25lO1xcbn1cXG5cXG4udG9kby1saXN0IGxpIC50b2dnbGUge1xcblxcdG9wYWNpdHk6IDA7XFxufVxcblxcbi50b2RvLWxpc3QgbGkgLnRvZ2dsZSArIGxhYmVsIHtcXG5cXHQvKlxcblxcdFxcdEZpcmVmb3ggcmVxdWlyZXMgYCNgIHRvIGJlIGVzY2FwZWQgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD05MjI0MzNcXG5cXHRcXHRJRSBhbmQgRWRnZSByZXF1aXJlcyAqZXZlcnl0aGluZyogdG8gYmUgZXNjYXBlZCB0byByZW5kZXIsIHNvIHdlIGRvIHRoYXQgaW5zdGVhZCBvZiBqdXN0IHRoZSBgI2AgLSBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy83MTU3NDU5L1xcblxcdCovXFxuXFx0YmFja2dyb3VuZC1pbWFnZTogdXJsKCdkYXRhOmltYWdlL3N2Zyt4bWw7dXRmOCwlM0NzdmclMjB4bWxucyUzRCUyMmh0dHAlM0EvL3d3dy53My5vcmcvMjAwMC9zdmclMjIlMjB3aWR0aCUzRCUyMjQwJTIyJTIwaGVpZ2h0JTNEJTIyNDAlMjIlMjB2aWV3Qm94JTNEJTIyLTEwJTIwLTE4JTIwMTAwJTIwMTM1JTIyJTNFJTNDY2lyY2xlJTIwY3glM0QlMjI1MCUyMiUyMGN5JTNEJTIyNTAlMjIlMjByJTNEJTIyNTAlMjIlMjBmaWxsJTNEJTIybm9uZSUyMiUyMHN0cm9rZSUzRCUyMiUyM2VkZWRlZCUyMiUyMHN0cm9rZS13aWR0aCUzRCUyMjMlMjIvJTNFJTNDL3N2ZyUzRScpO1xcblxcdGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuXFx0YmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGxlZnQ7XFxufVxcblxcbi50b2RvLWxpc3QgbGkgLnRvZ2dsZTpjaGVja2VkICsgbGFiZWwge1xcblxcdGJhY2tncm91bmQtaW1hZ2U6IHVybCgnZGF0YTppbWFnZS9zdmcreG1sO3V0ZjgsJTNDc3ZnJTIweG1sbnMlM0QlMjJodHRwJTNBLy93d3cudzMub3JnLzIwMDAvc3ZnJTIyJTIwd2lkdGglM0QlMjI0MCUyMiUyMGhlaWdodCUzRCUyMjQwJTIyJTIwdmlld0JveCUzRCUyMi0xMCUyMC0xOCUyMDEwMCUyMDEzNSUyMiUzRSUzQ2NpcmNsZSUyMGN4JTNEJTIyNTAlMjIlMjBjeSUzRCUyMjUwJTIyJTIwciUzRCUyMjUwJTIyJTIwZmlsbCUzRCUyMm5vbmUlMjIlMjBzdHJva2UlM0QlMjIlMjNiZGRhZDUlMjIlMjBzdHJva2Utd2lkdGglM0QlMjIzJTIyLyUzRSUzQ3BhdGglMjBmaWxsJTNEJTIyJTIzNWRjMmFmJTIyJTIwZCUzRCUyMk03MiUyMDI1TDQyJTIwNzElMjAyNyUyMDU2bC00JTIwNCUyMDIwJTIwMjAlMjAzNC01MnolMjIvJTNFJTNDL3N2ZyUzRScpO1xcbn1cXG5cXG4udG9kby1saXN0IGxpIGxhYmVsIHtcXG5cXHR3b3JkLWJyZWFrOiBicmVhay1hbGw7XFxuXFx0cGFkZGluZzogMTVweCAxNXB4IDE1cHggNjBweDtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG5cXHRsaW5lLWhlaWdodDogMS4yO1xcblxcdHRyYW5zaXRpb246IGNvbG9yIDAuNHM7XFxufVxcblxcbi50b2RvLWxpc3QgbGkuY29tcGxldGVkIGxhYmVsIHtcXG5cXHRjb2xvcjogI2Q5ZDlkOTtcXG5cXHR0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaSAuZGVzdHJveSB7XFxuXFx0ZGlzcGxheTogbm9uZTtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0dG9wOiAwO1xcblxcdHJpZ2h0OiAxMHB4O1xcblxcdGJvdHRvbTogMDtcXG5cXHR3aWR0aDogNDBweDtcXG5cXHRoZWlnaHQ6IDQwcHg7XFxuXFx0bWFyZ2luOiBhdXRvIDA7XFxuXFx0Zm9udC1zaXplOiAzMHB4O1xcblxcdGNvbG9yOiAjY2M5YTlhO1xcblxcdG1hcmdpbi1ib3R0b206IDExcHg7XFxuXFx0dHJhbnNpdGlvbjogY29sb3IgMC4ycyBlYXNlLW91dDtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaSAuZGVzdHJveTpob3ZlciB7XFxuXFx0Y29sb3I6ICNhZjViNWU7XFxufVxcblxcbi50b2RvLWxpc3QgbGkgLmRlc3Ryb3k6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICdcXFxcRDcnO1xcbn1cXG5cXG4udG9kby1saXN0IGxpOmhvdmVyIC5kZXN0cm95IHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLnRvZG8tbGlzdCBsaSAuZWRpdCB7XFxuXFx0ZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaS5lZGl0aW5nOmxhc3QtY2hpbGQge1xcblxcdG1hcmdpbi1ib3R0b206IC0xcHg7XFxufVxcblxcbi5mb290ZXIge1xcblxcdGNvbG9yOiAjNzc3O1xcblxcdHBhZGRpbmc6IDEwcHggMTVweDtcXG5cXHRoZWlnaHQ6IDIwcHg7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdGJvcmRlci10b3A6IDFweCBzb2xpZCAjZTZlNmU2O1xcbn1cXG5cXG4uZm9vdGVyOmJlZm9yZSB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdHJpZ2h0OiAwO1xcblxcdGJvdHRvbTogMDtcXG5cXHRsZWZ0OiAwO1xcblxcdGhlaWdodDogNTBweDtcXG5cXHRvdmVyZmxvdzogaGlkZGVuO1xcblxcdGJveC1zaGFkb3c6IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMiksXFxuXFx0ICAgICAgICAgICAgMCA4cHggMCAtM3B4ICNmNmY2ZjYsXFxuXFx0ICAgICAgICAgICAgMCA5cHggMXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjIpLFxcblxcdCAgICAgICAgICAgIDAgMTZweCAwIC02cHggI2Y2ZjZmNixcXG5cXHQgICAgICAgICAgICAwIDE3cHggMnB4IC02cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbn1cXG5cXG4udG9kby1jb3VudCB7XFxuXFx0ZmxvYXQ6IGxlZnQ7XFxuXFx0dGV4dC1hbGlnbjogbGVmdDtcXG59XFxuXFxuLnRvZG8tY291bnQgc3Ryb25nIHtcXG5cXHRmb250LXdlaWdodDogMzAwO1xcbn1cXG5cXG4uZmlsdGVycyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0cmlnaHQ6IDA7XFxuXFx0bGVmdDogMDtcXG59XFxuXFxuLmZpbHRlcnMgbGkge1xcblxcdGRpc3BsYXk6IGlubGluZTtcXG59XFxuXFxuLmZpbHRlcnMgbGkgYSB7XFxuXFx0Y29sb3I6IGluaGVyaXQ7XFxuXFx0bWFyZ2luOiAzcHg7XFxuXFx0cGFkZGluZzogM3B4IDdweDtcXG5cXHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuXFx0Ym9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuXFx0Ym9yZGVyLXJhZGl1czogM3B4O1xcbn1cXG5cXG4uZmlsdGVycyBsaSBhOmhvdmVyIHtcXG5cXHRib3JkZXItY29sb3I6IHJnYmEoMTc1LCA0NywgNDcsIDAuMSk7XFxufVxcblxcbi5maWx0ZXJzIGxpIGEuc2VsZWN0ZWQge1xcblxcdGJvcmRlci1jb2xvcjogcmdiYSgxNzUsIDQ3LCA0NywgMC4yKTtcXG59XFxuXFxuLmNsZWFyLWNvbXBsZXRlZCxcXG5odG1sIC5jbGVhci1jb21wbGV0ZWQ6YWN0aXZlIHtcXG5cXHRmbG9hdDogcmlnaHQ7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdGxpbmUtaGVpZ2h0OiAyMHB4O1xcblxcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG5cXHRjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5jbGVhci1jb21wbGV0ZWQ6aG92ZXIge1xcblxcdHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG5cXG4uaW5mbyB7XFxuXFx0bWFyZ2luOiA2NXB4IGF1dG8gMDtcXG5cXHRjb2xvcjogI2JmYmZiZjtcXG5cXHRmb250LXNpemU6IDEwcHg7XFxuXFx0dGV4dC1zaGFkb3c6IDAgMXB4IDAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmluZm8gcCB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcblxcbi5pbmZvIGEge1xcblxcdGNvbG9yOiBpbmhlcml0O1xcblxcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG5cXHRmb250LXdlaWdodDogNDAwO1xcbn1cXG5cXG4uaW5mbyBhOmhvdmVyIHtcXG5cXHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuXFxuLypcXG5cXHRIYWNrIHRvIHJlbW92ZSBiYWNrZ3JvdW5kIGZyb20gTW9iaWxlIFNhZmFyaS5cXG5cXHRDYW4ndCB1c2UgaXQgZ2xvYmFsbHkgc2luY2UgaXQgZGVzdHJveXMgY2hlY2tib3hlcyBpbiBGaXJlZm94XFxuKi9cXG5AbWVkaWEgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOjApIHtcXG5cXHQudG9nZ2xlLWFsbCxcXG5cXHQudG9kby1saXN0IGxpIC50b2dnbGUge1xcblxcdFxcdGJhY2tncm91bmQ6IG5vbmU7XFxuXFx0fVxcblxcblxcdC50b2RvLWxpc3QgbGkgLnRvZ2dsZSB7XFxuXFx0XFx0aGVpZ2h0OiA0MHB4O1xcblxcdH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDQzMHB4KSB7XFxuXFx0LmZvb3RlciB7XFxuXFx0XFx0aGVpZ2h0OiA1MHB4O1xcblxcdH1cXG5cXG5cXHQuZmlsdGVycyB7XFxuXFx0XFx0Ym90dG9tOiAxMHB4O1xcblxcdH1cXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2Nzcy1sb2FkZXJAMC4yOC43QGNzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvX3RvZG9tdmMtYXBwLWNzc0AyLjEuMEB0b2RvbXZjLWFwcC1jc3MvaW5kZXguY3NzXG4vLyBtb2R1bGUgaWQgPSBmS2EyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMudXBkYXRlID0gZXhwb3J0cy5jcmVhdGUgPSB1bmRlZmluZWQ7XG5cbnZhciBfY3JlYXRlID0gcmVxdWlyZSgnLi9jcmVhdGUnKTtcblxudmFyIF9jcmVhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlKTtcblxudmFyIF91cGRhdGUgPSByZXF1aXJlKCcuL3VwZGF0ZScpO1xuXG52YXIgX3VwZGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91cGRhdGUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmNyZWF0ZSA9IF9jcmVhdGUyLmRlZmF1bHQ7XG5leHBvcnRzLnVwZGF0ZSA9IF91cGRhdGUyLmRlZmF1bHQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2Rla3VAMi4wLjAtcmMxNkBkZWt1L2xpYi9kb20vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IGZTVWdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJhd1RhZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19sb2Rhc2gtZXNANC4xNy40QGxvZGFzaC1lcy9fZ2V0UmF3VGFnLmpzXG4vLyBtb2R1bGUgaWQgPSBmWWNpXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBzdGF0ZWZ1bCBmcm9tICdkZWt1LXN0YXRlJ1xuLy8gaW1wb3J0IHN0YXRlZnVsIGZyb20gJy4uL3N0YXRlZnVsJ1xuaW1wb3J0IHtlbGVtZW50fSBmcm9tICdkZWt1J1xuaW1wb3J0IHtmaWx0ZXJUb2RvfSBmcm9tICcuLi9hY3Rpb25zJ1xuXG5sZXQgb25DbGljayA9IChkaXNwYXRjaCwgdHlwZSkgPT4gKGUpID0+IHtcbiAgZGlzcGF0Y2goZmlsdGVyVG9kbyh0eXBlKSlcbn1cbmxldCBGaWx0ZXJMaW5rID0ge1xuICByZW5kZXIoe2NoaWxkcmVuLCBwcm9wcywgZGlzcGF0Y2h9KXtcbiAgICByZXR1cm4gPGxpIFxuICAgICAgb25DbGljaz17b25DbGljayhkaXNwYXRjaCwgcHJvcHMuZmlsdGVyKX0+XG4gICAgICAgIDxhIGNsYXNzPXtwcm9wcy52aXNpYmlsaXR5RmlsdGVyPT1wcm9wcy5maWx0ZXI/J3NlbGVjdGVkJzonJ30gXG4gICAgICAgID57Y2hpbGRyZW59PC9hPlxuICAgIDwvbGk+XG4gIH1cblxufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgc3RhdGVmdWwoRmlsdGVyTGluaylcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50L0ZpbHRlckxpbmsuanMiLCJ2YXIgc3VwcG9ydGVkVHlwZXMgPSBbJ3RleHQnLCAnc2VhcmNoJywgJ3RlbCcsICd1cmwnLCAncGFzc3dvcmQnXTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihlbGVtZW50KXtcbiAgICByZXR1cm4gISEoZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSAmJiB+c3VwcG9ydGVkVHlwZXMuaW5kZXhPZihlbGVtZW50LnR5cGUpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fbmF0dXJhbC1zZWxlY3Rpb25AMS4wLjBAbmF0dXJhbC1zZWxlY3Rpb24vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IGc0aG5cbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5hcnJheS5mcm9tJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5BcnJheS5mcm9tO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb20uanNcbi8vIG1vZHVsZSBpZCA9IGdKQ1Rcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IGdKbXVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb21wb3NlcyBzaW5nbGUtYXJndW1lbnQgZnVuY3Rpb25zIGZyb20gcmlnaHQgdG8gbGVmdC4gVGhlIHJpZ2h0bW9zdFxuICogZnVuY3Rpb24gY2FuIHRha2UgbXVsdGlwbGUgYXJndW1lbnRzIGFzIGl0IHByb3ZpZGVzIHRoZSBzaWduYXR1cmUgZm9yXG4gKiB0aGUgcmVzdWx0aW5nIGNvbXBvc2l0ZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBmdW5jcyBUaGUgZnVuY3Rpb25zIHRvIGNvbXBvc2UuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gb2J0YWluZWQgYnkgY29tcG9zaW5nIHRoZSBhcmd1bWVudCBmdW5jdGlvbnNcbiAqIGZyb20gcmlnaHQgdG8gbGVmdC4gRm9yIGV4YW1wbGUsIGNvbXBvc2UoZiwgZywgaCkgaXMgaWRlbnRpY2FsIHRvIGRvaW5nXG4gKiAoLi4uYXJncykgPT4gZihnKGgoLi4uYXJncykpKS5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wb3NlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgZnVuY3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBmdW5jc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmIChmdW5jcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGFyZykge1xuICAgICAgcmV0dXJuIGFyZztcbiAgICB9O1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBmdW5jc1swXTtcbiAgfVxuXG4gIHJldHVybiBmdW5jcy5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGEoYi5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cykpO1xuICAgIH07XG4gIH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19yZWR1eEAzLjcuMkByZWR1eC9lcy9jb21wb3NlLmpzXG4vLyBtb2R1bGUgaWQgPSBnczdEXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBzdGF0ZWZ1bCBmcm9tICdkZWt1LXN0YXRlJ1xuaW1wb3J0IHtlbGVtZW50fSBmcm9tICdkZWt1J1xuaW1wb3J0IEFkZFRvZG8gZnJvbSAnLi9BZGRUb2RvJ1xuaW1wb3J0IFZpc2libGVUb2RvTGlzdCBmcm9tICcuL1Zpc2libGVUb2RvTGlzdCdcbmltcG9ydCBGb290ZXIgZnJvbSAnLi9Gb290ZXInXG5pbXBvcnQgdmlzaWJsZUZpbHRlciBmcm9tICcuLi9yZWR1Y2Vycy92aXNpYmlsaXR5RmlsdGVyJztcblxubGV0IEFwcCA9ICh7cHJvcHN9KSA9PiAoXG4gIDxzZWN0aW9uIGNsYXNzPVwidG9kb2FwcFwiPlxuICAgIDxBZGRUb2RvIC8+XG4gICAgPFZpc2libGVUb2RvTGlzdCB7Li4ucHJvcHN9ICAvPlxuICAgIDxGb290ZXIgey4uLnByb3BzfSAvPlxuICA8L3NlY3Rpb24+XG5cblxuXG5cblxuXG4pXG5cblxuZXhwb3J0IGRlZmF1bHQgc3RhdGVmdWwoQXBwKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnQvQXBwLmpzIiwidmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG5tb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzXG4vLyBtb2R1bGUgaWQgPSBoWDBwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBjcmVhdGVTdG9yZSBmcm9tICcuL2NyZWF0ZVN0b3JlJztcbmltcG9ydCBjb21iaW5lUmVkdWNlcnMgZnJvbSAnLi9jb21iaW5lUmVkdWNlcnMnO1xuaW1wb3J0IGJpbmRBY3Rpb25DcmVhdG9ycyBmcm9tICcuL2JpbmRBY3Rpb25DcmVhdG9ycyc7XG5pbXBvcnQgYXBwbHlNaWRkbGV3YXJlIGZyb20gJy4vYXBwbHlNaWRkbGV3YXJlJztcbmltcG9ydCBjb21wb3NlIGZyb20gJy4vY29tcG9zZSc7XG5pbXBvcnQgd2FybmluZyBmcm9tICcuL3V0aWxzL3dhcm5pbmcnO1xuXG4vKlxuKiBUaGlzIGlzIGEgZHVtbXkgZnVuY3Rpb24gdG8gY2hlY2sgaWYgdGhlIGZ1bmN0aW9uIG5hbWUgaGFzIGJlZW4gYWx0ZXJlZCBieSBtaW5pZmljYXRpb24uXG4qIElmIHRoZSBmdW5jdGlvbiBoYXMgYmVlbiBtaW5pZmllZCBhbmQgTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJywgd2FybiB0aGUgdXNlci5cbiovXG5mdW5jdGlvbiBpc0NydXNoZWQoKSB7fVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgaXNDcnVzaGVkLm5hbWUgPT09ICdzdHJpbmcnICYmIGlzQ3J1c2hlZC5uYW1lICE9PSAnaXNDcnVzaGVkJykge1xuICB3YXJuaW5nKCdZb3UgYXJlIGN1cnJlbnRseSB1c2luZyBtaW5pZmllZCBjb2RlIG91dHNpZGUgb2YgTk9ERV9FTlYgPT09IFxcJ3Byb2R1Y3Rpb25cXCcuICcgKyAnVGhpcyBtZWFucyB0aGF0IHlvdSBhcmUgcnVubmluZyBhIHNsb3dlciBkZXZlbG9wbWVudCBidWlsZCBvZiBSZWR1eC4gJyArICdZb3UgY2FuIHVzZSBsb29zZS1lbnZpZnkgKGh0dHBzOi8vZ2l0aHViLmNvbS96ZXJ0b3NoL2xvb3NlLWVudmlmeSkgZm9yIGJyb3dzZXJpZnkgJyArICdvciBEZWZpbmVQbHVnaW4gZm9yIHdlYnBhY2sgKGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzAwMzAwMzEpICcgKyAndG8gZW5zdXJlIHlvdSBoYXZlIHRoZSBjb3JyZWN0IGNvZGUgZm9yIHlvdXIgcHJvZHVjdGlvbiBidWlsZC4nKTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlU3RvcmUsIGNvbWJpbmVSZWR1Y2VycywgYmluZEFjdGlvbkNyZWF0b3JzLCBhcHBseU1pZGRsZXdhcmUsIGNvbXBvc2UgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fcmVkdXhAMy43LjJAcmVkdXgvZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IGkzV05cbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2xpYnJhcnkuanNcbi8vIG1vZHVsZSBpZCA9IGlmUjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGZyZWVHbG9iYWwgZnJvbSAnLi9fZnJlZUdsb2JhbC5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuZXhwb3J0IGRlZmF1bHQgcm9vdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19sb2Rhc2gtZXNANC4xNy40QGxvZGFzaC1lcy9fcm9vdC5qc1xuLy8gbW9kdWxlIGlkID0gaXNmNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZighbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSBqRkQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMucmVuZGVyU3RyaW5nID0gcmVuZGVyU3RyaW5nO1xuXG52YXIgX2VsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50Jyk7XG5cbi8qKlxuICogVHVybiBhbiBvYmplY3Qgb2Yga2V5L3ZhbHVlIHBhaXJzIGludG8gYSBIVE1MIGF0dHJpYnV0ZSBzdHJpbmcuIFRoaXNcbiAqIGZ1bmN0aW9uIGlzIHJlc3BvbnNpYmxlIGZvciB3aGF0IGF0dHJpYnV0ZXMgYXJlIGFsbG93ZWQgdG8gYmUgcmVuZGVyZWQgYW5kXG4gKiBzaG91bGQgaGFuZGxlIGFueSBvdGhlciBzcGVjaWFsIGNhc2VzIHNwZWNpZmljIHRvIGRla3UuXG4gKi9cblxuZnVuY3Rpb24gYXR0cmlidXRlc1RvU3RyaW5nKGF0dHJpYnV0ZXMpIHtcbiAgdmFyIHN0ciA9ICcnO1xuICBmb3IgKHZhciBuYW1lIGluIGF0dHJpYnV0ZXMpIHtcbiAgICB2YXIgdmFsdWUgPSBhdHRyaWJ1dGVzW25hbWVdO1xuICAgIGlmIChuYW1lID09PSAnaW5uZXJIVE1MJykgY29udGludWU7XG4gICAgaWYgKCgwLCBfZWxlbWVudC5pc1ZhbGlkQXR0cmlidXRlKSh2YWx1ZSkpIHN0ciArPSAnICcgKyBuYW1lICsgJz1cIicgKyBhdHRyaWJ1dGVzW25hbWVdICsgJ1wiJztcbiAgfVxuICByZXR1cm4gc3RyO1xufVxuXG4vKipcbiAqIFJlbmRlciBhIHZpcnR1YWwgZWxlbWVudCB0byBhIHN0cmluZy4gWW91IGNhbiBwYXNzIGluIGFuIG9wdGlvbiBzdGF0ZSBjb250ZXh0XG4gKiBvYmplY3QgdGhhdCB3aWxsIGJlIGdpdmVuIHRvIGFsbCBjb21wb25lbnRzLlxuICovXG5cbmZ1bmN0aW9uIHJlbmRlclN0cmluZyhlbGVtZW50LCBjb250ZXh0KSB7XG4gIHZhciBwYXRoID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gJzAnIDogYXJndW1lbnRzWzJdO1xuXG4gIGlmICgoMCwgX2VsZW1lbnQuaXNUZXh0KShlbGVtZW50KSkge1xuICAgIHJldHVybiBlbGVtZW50Lm5vZGVWYWx1ZTtcbiAgfVxuXG4gIGlmICgoMCwgX2VsZW1lbnQuaXNFbXB0eSkoZWxlbWVudCkpIHtcbiAgICByZXR1cm4gJzxub3NjcmlwdD48L25vc2NyaXB0Pic7XG4gIH1cblxuICBpZiAoKDAsIF9lbGVtZW50LmlzVGh1bmspKGVsZW1lbnQpKSB7XG4gICAgdmFyIHByb3BzID0gZWxlbWVudC5wcm9wcztcbiAgICB2YXIgY29tcG9uZW50ID0gZWxlbWVudC5jb21wb25lbnQ7XG4gICAgdmFyIF9jaGlsZHJlbiA9IGVsZW1lbnQuY2hpbGRyZW47XG4gICAgdmFyIHJlbmRlciA9IGNvbXBvbmVudC5yZW5kZXI7XG5cbiAgICB2YXIgb3V0cHV0ID0gcmVuZGVyKHtcbiAgICAgIGNoaWxkcmVuOiBfY2hpbGRyZW4sXG4gICAgICBwcm9wczogcHJvcHMsXG4gICAgICBwYXRoOiBwYXRoLFxuICAgICAgY29udGV4dDogY29udGV4dFxuICAgIH0pO1xuICAgIHJldHVybiByZW5kZXJTdHJpbmcob3V0cHV0LCBjb250ZXh0LCBwYXRoKTtcbiAgfVxuXG4gIHZhciBhdHRyaWJ1dGVzID0gZWxlbWVudC5hdHRyaWJ1dGVzO1xuICB2YXIgdHlwZSA9IGVsZW1lbnQudHlwZTtcbiAgdmFyIGNoaWxkcmVuID0gZWxlbWVudC5jaGlsZHJlbjtcblxuICB2YXIgaW5uZXJIVE1MID0gYXR0cmlidXRlcy5pbm5lckhUTUw7XG4gIHZhciBzdHIgPSAnPCcgKyB0eXBlICsgYXR0cmlidXRlc1RvU3RyaW5nKGF0dHJpYnV0ZXMpICsgJz4nO1xuXG4gIGlmIChpbm5lckhUTUwpIHtcbiAgICBzdHIgKz0gaW5uZXJIVE1MO1xuICB9IGVsc2Uge1xuICAgIHN0ciArPSBjaGlsZHJlbi5tYXAoZnVuY3Rpb24gKGNoaWxkLCBpKSB7XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKGNoaWxkLCBjb250ZXh0LCBwYXRoICsgJy4nICsgKGNoaWxkLmtleSA9PSBudWxsID8gaSA6IGNoaWxkLmtleSkpO1xuICAgIH0pLmpvaW4oJycpO1xuICB9XG5cbiAgc3RyICs9ICc8LycgKyB0eXBlICsgJz4nO1xuICByZXR1cm4gc3RyO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19kZWt1QDIuMC4wLXJjMTZAZGVrdS9saWIvc3RyaW5nL3JlbmRlclN0cmluZy5qc1xuLy8gbW9kdWxlIGlkID0gakdya1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgb3ZlckFyZyBmcm9tICcuL19vdmVyQXJnLmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdldFByb3RvdHlwZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19sb2Rhc2gtZXNANC4xNy40QGxvZGFzaC1lcy9fZ2V0UHJvdG90eXBlLmpzXG4vLyBtb2R1bGUgaWQgPSBqTnEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbi8qKlxuICogVXNlIHR5cGVkIGFycmF5cyBpZiB3ZSBjYW5cbiAqL1xuXG52YXIgRmFzdEFycmF5ID0gdHlwZW9mIFVpbnQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IEFycmF5IDogVWludDMyQXJyYXk7XG5cbi8qKlxuICogQml0IHZlY3RvclxuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZUJ2KHNpemVJbkJpdHMpIHtcbiAgcmV0dXJuIG5ldyBGYXN0QXJyYXkoTWF0aC5jZWlsKHNpemVJbkJpdHMgLyAzMikpO1xufVxuXG5mdW5jdGlvbiBzZXRCaXQodiwgaWR4KSB7XG4gIHZhciByID0gaWR4ICUgMzI7XG4gIHZhciBwb3MgPSAoaWR4IC0gcikgLyAzMjtcblxuICB2W3Bvc10gfD0gMSA8PCByO1xufVxuXG5mdW5jdGlvbiBjbGVhckJpdCh2LCBpZHgpIHtcbiAgdmFyIHIgPSBpZHggJSAzMjtcbiAgdmFyIHBvcyA9IChpZHggLSByKSAvIDMyO1xuXG4gIHZbcG9zXSAmPSB+KDEgPDwgcik7XG59XG5cbmZ1bmN0aW9uIGdldEJpdCh2LCBpZHgpIHtcbiAgdmFyIHIgPSBpZHggJSAzMjtcbiAgdmFyIHBvcyA9IChpZHggLSByKSAvIDMyO1xuXG4gIHJldHVybiAhISh2W3Bvc10gJiAxIDw8IHIpO1xufVxuXG4vKipcbiAqIEV4cG9ydHNcbiAqL1xuXG5leHBvcnRzLmNyZWF0ZUJ2ID0gY3JlYXRlQnY7XG5leHBvcnRzLnNldEJpdCA9IHNldEJpdDtcbmV4cG9ydHMuY2xlYXJCaXQgPSBjbGVhckJpdDtcbmV4cG9ydHMuZ2V0Qml0ID0gZ2V0Qml0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19iaXQtdmVjdG9yQDAuMS42QGJpdC12ZWN0b3IvbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSBqZnh6XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmltcG9ydCBjb21wb3NlIGZyb20gJy4vY29tcG9zZSc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0b3JlIGVuaGFuY2VyIHRoYXQgYXBwbGllcyBtaWRkbGV3YXJlIHRvIHRoZSBkaXNwYXRjaCBtZXRob2RcbiAqIG9mIHRoZSBSZWR1eCBzdG9yZS4gVGhpcyBpcyBoYW5keSBmb3IgYSB2YXJpZXR5IG9mIHRhc2tzLCBzdWNoIGFzIGV4cHJlc3NpbmdcbiAqIGFzeW5jaHJvbm91cyBhY3Rpb25zIGluIGEgY29uY2lzZSBtYW5uZXIsIG9yIGxvZ2dpbmcgZXZlcnkgYWN0aW9uIHBheWxvYWQuXG4gKlxuICogU2VlIGByZWR1eC10aHVua2AgcGFja2FnZSBhcyBhbiBleGFtcGxlIG9mIHRoZSBSZWR1eCBtaWRkbGV3YXJlLlxuICpcbiAqIEJlY2F1c2UgbWlkZGxld2FyZSBpcyBwb3RlbnRpYWxseSBhc3luY2hyb25vdXMsIHRoaXMgc2hvdWxkIGJlIHRoZSBmaXJzdFxuICogc3RvcmUgZW5oYW5jZXIgaW4gdGhlIGNvbXBvc2l0aW9uIGNoYWluLlxuICpcbiAqIE5vdGUgdGhhdCBlYWNoIG1pZGRsZXdhcmUgd2lsbCBiZSBnaXZlbiB0aGUgYGRpc3BhdGNoYCBhbmQgYGdldFN0YXRlYCBmdW5jdGlvbnNcbiAqIGFzIG5hbWVkIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBtaWRkbGV3YXJlcyBUaGUgbWlkZGxld2FyZSBjaGFpbiB0byBiZSBhcHBsaWVkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHN0b3JlIGVuaGFuY2VyIGFwcGx5aW5nIHRoZSBtaWRkbGV3YXJlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcHBseU1pZGRsZXdhcmUoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBtaWRkbGV3YXJlcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIG1pZGRsZXdhcmVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChjcmVhdGVTdG9yZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKSB7XG4gICAgICB2YXIgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpO1xuICAgICAgdmFyIF9kaXNwYXRjaCA9IHN0b3JlLmRpc3BhdGNoO1xuICAgICAgdmFyIGNoYWluID0gW107XG5cbiAgICAgIHZhciBtaWRkbGV3YXJlQVBJID0ge1xuICAgICAgICBnZXRTdGF0ZTogc3RvcmUuZ2V0U3RhdGUsXG4gICAgICAgIGRpc3BhdGNoOiBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcbiAgICAgICAgICByZXR1cm4gX2Rpc3BhdGNoKGFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjaGFpbiA9IG1pZGRsZXdhcmVzLm1hcChmdW5jdGlvbiAobWlkZGxld2FyZSkge1xuICAgICAgICByZXR1cm4gbWlkZGxld2FyZShtaWRkbGV3YXJlQVBJKTtcbiAgICAgIH0pO1xuICAgICAgX2Rpc3BhdGNoID0gY29tcG9zZS5hcHBseSh1bmRlZmluZWQsIGNoYWluKShzdG9yZS5kaXNwYXRjaCk7XG5cbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RvcmUsIHtcbiAgICAgICAgZGlzcGF0Y2g6IF9kaXNwYXRjaFxuICAgICAgfSk7XG4gICAgfTtcbiAgfTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fcmVkdXhAMy43LjJAcmVkdXgvZXMvYXBwbHlNaWRkbGV3YXJlLmpzXG4vLyBtb2R1bGUgaWQgPSBqeEtpXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuUkVNT1ZFID0gZXhwb3J0cy5NT1ZFID0gZXhwb3J0cy5VUERBVEUgPSBleHBvcnRzLkNSRUFURSA9IHVuZGVmaW5lZDtcblxudmFyIF9iaXRWZWN0b3IgPSByZXF1aXJlKCdiaXQtdmVjdG9yJyk7XG5cbi8qKlxuICogQWN0aW9uc1xuICovXG5cbnZhciBDUkVBVEUgPSAwOyAvKipcbiAgICAgICAgICAgICAgICAgKiBJbXBvcnRzXG4gICAgICAgICAgICAgICAgICovXG5cbnZhciBVUERBVEUgPSAxO1xudmFyIE1PVkUgPSAyO1xudmFyIFJFTU9WRSA9IDM7XG5cbi8qKlxuICogZGlmdFxuICovXG5cbmZ1bmN0aW9uIGRpZnQocHJldiwgbmV4dCwgZWZmZWN0LCBrZXkpIHtcbiAgdmFyIHBTdGFydElkeCA9IDA7XG4gIHZhciBuU3RhcnRJZHggPSAwO1xuICB2YXIgcEVuZElkeCA9IHByZXYubGVuZ3RoIC0gMTtcbiAgdmFyIG5FbmRJZHggPSBuZXh0Lmxlbmd0aCAtIDE7XG4gIHZhciBwU3RhcnRJdGVtID0gcHJldltwU3RhcnRJZHhdO1xuICB2YXIgblN0YXJ0SXRlbSA9IG5leHRbblN0YXJ0SWR4XTtcblxuICAvLyBMaXN0IGhlYWQgaXMgdGhlIHNhbWVcbiAgd2hpbGUgKHBTdGFydElkeCA8PSBwRW5kSWR4ICYmIG5TdGFydElkeCA8PSBuRW5kSWR4ICYmIGVxdWFsKHBTdGFydEl0ZW0sIG5TdGFydEl0ZW0pKSB7XG4gICAgZWZmZWN0KFVQREFURSwgcFN0YXJ0SXRlbSwgblN0YXJ0SXRlbSwgblN0YXJ0SWR4KTtcbiAgICBwU3RhcnRJdGVtID0gcHJldlsrK3BTdGFydElkeF07XG4gICAgblN0YXJ0SXRlbSA9IG5leHRbKytuU3RhcnRJZHhdO1xuICB9XG5cbiAgLy8gVGhlIGFib3ZlIGNhc2UgaXMgb3JkZXJzIG9mIG1hZ25pdHVkZSBtb3JlIGNvbW1vbiB0aGFuIHRoZSBvdGhlcnMsIHNvIGZhc3QtcGF0aCBpdFxuICBpZiAoblN0YXJ0SWR4ID4gbkVuZElkeCAmJiBwU3RhcnRJZHggPiBwRW5kSWR4KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHBFbmRJdGVtID0gcHJldltwRW5kSWR4XTtcbiAgdmFyIG5FbmRJdGVtID0gbmV4dFtuRW5kSWR4XTtcbiAgdmFyIG1vdmVkRnJvbUZyb250ID0gMDtcblxuICAvLyBSZXZlcnNlZFxuICB3aGlsZSAocFN0YXJ0SWR4IDw9IHBFbmRJZHggJiYgblN0YXJ0SWR4IDw9IG5FbmRJZHggJiYgZXF1YWwocFN0YXJ0SXRlbSwgbkVuZEl0ZW0pKSB7XG4gICAgZWZmZWN0KE1PVkUsIHBTdGFydEl0ZW0sIG5FbmRJdGVtLCBwRW5kSWR4IC0gbW92ZWRGcm9tRnJvbnQgKyAxKTtcbiAgICBwU3RhcnRJdGVtID0gcHJldlsrK3BTdGFydElkeF07XG4gICAgbkVuZEl0ZW0gPSBuZXh0Wy0tbkVuZElkeF07XG4gICAgKyttb3ZlZEZyb21Gcm9udDtcbiAgfVxuXG4gIC8vIFJldmVyc2VkIHRoZSBvdGhlciB3YXkgKGluIGNhc2Ugb2YgZS5nLiByZXZlcnNlIGFuZCBhcHBlbmQpXG4gIHdoaWxlIChwRW5kSWR4ID49IHBTdGFydElkeCAmJiBuU3RhcnRJZHggPD0gbkVuZElkeCAmJiBlcXVhbChuU3RhcnRJdGVtLCBwRW5kSXRlbSkpIHtcbiAgICBlZmZlY3QoTU9WRSwgcEVuZEl0ZW0sIG5TdGFydEl0ZW0sIG5TdGFydElkeCk7XG4gICAgcEVuZEl0ZW0gPSBwcmV2Wy0tcEVuZElkeF07XG4gICAgblN0YXJ0SXRlbSA9IG5leHRbKytuU3RhcnRJZHhdO1xuICAgIC0tbW92ZWRGcm9tRnJvbnQ7XG4gIH1cblxuICAvLyBMaXN0IHRhaWwgaXMgdGhlIHNhbWVcbiAgd2hpbGUgKHBFbmRJZHggPj0gcFN0YXJ0SWR4ICYmIG5FbmRJZHggPj0gblN0YXJ0SWR4ICYmIGVxdWFsKHBFbmRJdGVtLCBuRW5kSXRlbSkpIHtcbiAgICBlZmZlY3QoVVBEQVRFLCBwRW5kSXRlbSwgbkVuZEl0ZW0sIG5FbmRJZHgpO1xuICAgIHBFbmRJdGVtID0gcHJldlstLXBFbmRJZHhdO1xuICAgIG5FbmRJdGVtID0gbmV4dFstLW5FbmRJZHhdO1xuICB9XG5cbiAgaWYgKHBTdGFydElkeCA+IHBFbmRJZHgpIHtcbiAgICB3aGlsZSAoblN0YXJ0SWR4IDw9IG5FbmRJZHgpIHtcbiAgICAgIGVmZmVjdChDUkVBVEUsIG51bGwsIG5TdGFydEl0ZW0sIG5TdGFydElkeCk7XG4gICAgICBuU3RhcnRJdGVtID0gbmV4dFsrK25TdGFydElkeF07XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKG5TdGFydElkeCA+IG5FbmRJZHgpIHtcbiAgICB3aGlsZSAocFN0YXJ0SWR4IDw9IHBFbmRJZHgpIHtcbiAgICAgIGVmZmVjdChSRU1PVkUsIHBTdGFydEl0ZW0pO1xuICAgICAgcFN0YXJ0SXRlbSA9IHByZXZbKytwU3RhcnRJZHhdO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBjcmVhdGVkID0gMDtcbiAgdmFyIHBpdm90RGVzdCA9IG51bGw7XG4gIHZhciBwaXZvdElkeCA9IHBTdGFydElkeCAtIG1vdmVkRnJvbUZyb250O1xuICB2YXIga2VlcEJhc2UgPSBwU3RhcnRJZHg7XG4gIHZhciBrZWVwID0gKDAsIF9iaXRWZWN0b3IuY3JlYXRlQnYpKHBFbmRJZHggLSBwU3RhcnRJZHgpO1xuXG4gIHZhciBwcmV2TWFwID0ga2V5TWFwKHByZXYsIHBTdGFydElkeCwgcEVuZElkeCArIDEsIGtleSk7XG5cbiAgZm9yICg7IG5TdGFydElkeCA8PSBuRW5kSWR4OyBuU3RhcnRJdGVtID0gbmV4dFsrK25TdGFydElkeF0pIHtcbiAgICB2YXIgb2xkSWR4ID0gcHJldk1hcFtrZXkoblN0YXJ0SXRlbSldO1xuXG4gICAgaWYgKGlzVW5kZWZpbmVkKG9sZElkeCkpIHtcbiAgICAgIGVmZmVjdChDUkVBVEUsIG51bGwsIG5TdGFydEl0ZW0sIHBpdm90SWR4KyspO1xuICAgICAgKytjcmVhdGVkO1xuICAgIH0gZWxzZSBpZiAocFN0YXJ0SWR4ICE9PSBvbGRJZHgpIHtcbiAgICAgICgwLCBfYml0VmVjdG9yLnNldEJpdCkoa2VlcCwgb2xkSWR4IC0ga2VlcEJhc2UpO1xuICAgICAgZWZmZWN0KE1PVkUsIHByZXZbb2xkSWR4XSwgblN0YXJ0SXRlbSwgcGl2b3RJZHgrKyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBpdm90RGVzdCA9IG5TdGFydElkeDtcbiAgICB9XG4gIH1cblxuICBpZiAocGl2b3REZXN0ICE9PSBudWxsKSB7XG4gICAgKDAsIF9iaXRWZWN0b3Iuc2V0Qml0KShrZWVwLCAwKTtcbiAgICBlZmZlY3QoTU9WRSwgcHJldltwU3RhcnRJZHhdLCBuZXh0W3Bpdm90RGVzdF0sIHBpdm90RGVzdCk7XG4gIH1cblxuICAvLyBJZiB0aGVyZSBhcmUgbm8gY3JlYXRpb25zLCB0aGVuIHlvdSBoYXZlIHRvXG4gIC8vIHJlbW92ZSBleGFjdGx5IG1heChwcmV2TGVuIC0gbmV4dExlbiwgMCkgZWxlbWVudHMgaW4gdGhpc1xuICAvLyBkaWZmLiBZb3UgaGF2ZSB0byByZW1vdmUgb25lIG1vcmUgZm9yIGVhY2ggZWxlbWVudFxuICAvLyB0aGF0IHdhcyBjcmVhdGVkLiBUaGlzIG1lYW5zIG9uY2Ugd2UgaGF2ZVxuICAvLyByZW1vdmVkIHRoYXQgbWFueSwgd2UgY2FuIHN0b3AuXG4gIHZhciBuZWNlc3NhcnlSZW1vdmFscyA9IHByZXYubGVuZ3RoIC0gbmV4dC5sZW5ndGggKyBjcmVhdGVkO1xuICBmb3IgKHZhciByZW1vdmFscyA9IDA7IHJlbW92YWxzIDwgbmVjZXNzYXJ5UmVtb3ZhbHM7IHBTdGFydEl0ZW0gPSBwcmV2WysrcFN0YXJ0SWR4XSkge1xuICAgIGlmICghKDAsIF9iaXRWZWN0b3IuZ2V0Qml0KShrZWVwLCBwU3RhcnRJZHggLSBrZWVwQmFzZSkpIHtcbiAgICAgIGVmZmVjdChSRU1PVkUsIHBTdGFydEl0ZW0pO1xuICAgICAgKytyZW1vdmFscztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlcXVhbChhLCBiKSB7XG4gICAgcmV0dXJuIGtleShhKSA9PT0ga2V5KGIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbmZ1bmN0aW9uIGtleU1hcChpdGVtcywgc3RhcnQsIGVuZCwga2V5KSB7XG4gIHZhciBtYXAgPSB7fTtcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIG1hcFtrZXkoaXRlbXNbaV0pXSA9IGk7XG4gIH1cblxuICByZXR1cm4gbWFwO1xufVxuXG4vKipcbiAqIEV4cG9ydHNcbiAqL1xuXG5leHBvcnRzLmRlZmF1bHQgPSBkaWZ0O1xuZXhwb3J0cy5DUkVBVEUgPSBDUkVBVEU7XG5leHBvcnRzLlVQREFURSA9IFVQREFURTtcbmV4cG9ydHMuTU9WRSA9IE1PVkU7XG5leHBvcnRzLlJFTU9WRSA9IFJFTU9WRTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fZGlmdEAwLjEuMTJAZGlmdC9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IGtUR1pcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jcmVhdGUgPSBjcmVhdGU7XG5cbnZhciBfZG9tID0gcmVxdWlyZSgnLi4vZG9tJyk7XG5cbnZhciBkb20gPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfZG9tKTtcblxudmFyIF9kaWZmID0gcmVxdWlyZSgnLi4vZGlmZicpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG4vKipcbiAqIENyZWF0ZSBhIERPTSByZW5kZXJlciB1c2luZyBhIGNvbnRhaW5lciBlbGVtZW50LiBFdmVyeXRoaW5nIHdpbGwgYmUgcmVuZGVyZWRcbiAqIGluc2lkZSBvZiB0aGF0IGNvbnRhaW5lci4gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyBuZXcgc3RhdGUgdGhhdCBjYW5cbiAqIHJlcGxhY2Ugd2hhdCBpcyBjdXJyZW50bHkgcmVuZGVyZWQuXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlKGNvbnRhaW5lciwgZGlzcGF0Y2gpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1syXTtcblxuICB2YXIgb2xkVm5vZGUgPSBudWxsO1xuICB2YXIgbm9kZSA9IG51bGw7XG4gIHZhciByb290SWQgPSBvcHRpb25zLmlkIHx8ICcwJztcblxuICBpZiAoY29udGFpbmVyICYmIGNvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gIH1cblxuICB2YXIgdXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKG5ld1Zub2RlLCBjb250ZXh0KSB7XG4gICAgdmFyIGNoYW5nZXMgPSAoMCwgX2RpZmYuZGlmZk5vZGUpKG9sZFZub2RlLCBuZXdWbm9kZSwgcm9vdElkKTtcbiAgICBub2RlID0gY2hhbmdlcy5yZWR1Y2UoZG9tLnVwZGF0ZShkaXNwYXRjaCwgY29udGV4dCksIG5vZGUpO1xuICAgIG9sZFZub2RlID0gbmV3Vm5vZGU7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgdmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZSh2bm9kZSwgY29udGV4dCkge1xuICAgIG5vZGUgPSBkb20uY3JlYXRlKHZub2RlLCByb290SWQsIGRpc3BhdGNoLCBjb250ZXh0KTtcbiAgICBpZiAoY29udGFpbmVyKSBjb250YWluZXIuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgb2xkVm5vZGUgPSB2bm9kZTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICByZXR1cm4gZnVuY3Rpb24gKHZub2RlKSB7XG4gICAgdmFyIGNvbnRleHQgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICAgIHJldHVybiBub2RlICE9PSBudWxsID8gdXBkYXRlKHZub2RlLCBjb250ZXh0KSA6IGNyZWF0ZSh2bm9kZSwgY29udGV4dCk7XG4gIH07XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2Rla3VAMi4wLjAtcmMxNkBkZWt1L2xpYi9hcHAvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IGtYS0dcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb21cIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fYmFiZWwtcnVudGltZUA2LjI2LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanNcbi8vIG1vZHVsZSBpZCA9IGtmSFJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gbDNobFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSBsU01zXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBBcHAgZnJvbSAnLi9jb21wb25lbnQvQXBwJ1xuaW1wb3J0IHtlbGVtZW50LCBjcmVhdGVBcHB9IGZyb20gJ2Rla3UnXG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHJlZHVjZXJzIGZyb20gJy4vcmVkdWNlcnMnXG5pbXBvcnQgXCJ0b2RvbXZjLWFwcC1jc3MvaW5kZXguY3NzXCJcbmxldCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXJzKVxuXG5sZXQgcmVuZGVyID0gY3JlYXRlQXBwKGRvY3VtZW50LmJvZHksIHN0b3JlLmRpc3BhdGNoKVxuXG5zdG9yZS5zdWJzY3JpYmUoKCkgPT4ge1xuICByZW5kZXIoXG4gICAgPEFwcCB7Li4uc3RvcmUuZ2V0U3RhdGUoKX0+PC9BcHA+XG4gIClcbn0pXG5cbnN0b3JlLmRpc3BhdGNoKHt0eXBlOiAnaW5pdCd9KVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcG9ueWZpbGwgPSByZXF1aXJlKCcuL3BvbnlmaWxsJyk7XG5cbnZhciBfcG9ueWZpbGwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9ueWZpbGwpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciByb290OyAvKiBnbG9iYWwgd2luZG93ICovXG5cblxuaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gc2VsZjtcbn0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IG1vZHVsZTtcbn0gZWxzZSB7XG4gIHJvb3QgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xufVxuXG52YXIgcmVzdWx0ID0gKDAsIF9wb255ZmlsbDJbJ2RlZmF1bHQnXSkocm9vdCk7XG5leHBvcnRzWydkZWZhdWx0J10gPSByZXN1bHQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX3N5bWJvbC1vYnNlcnZhYmxlQDEuMC40QHN5bWJvbC1vYnNlcnZhYmxlL2xpYi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gbkhZM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgc3RhdGVmdWwgZnJvbSAnZGVrdS1zdGF0ZSdcbi8vIGltcG9ydCBzdGF0ZWZ1bCBmcm9tICcuLi9zdGF0ZWZ1bCdcbmltcG9ydCB7ZWxlbWVudH0gZnJvbSAnZGVrdSdcbmltcG9ydCB7IHRvZ2dsZVRvZG8gLCB0b2dnbGVBbGwsIHJlbW92ZVRvZG99IGZyb20gJy4vLi4vYWN0aW9ucydcblxubGV0IG9uVG9nZ2xlVG9kbyA9IChkaXNwYXRjaCwgaXRlbSkgPT4gKGUpID0+IHtcbiAgZGlzcGF0Y2godG9nZ2xlVG9kbyhpdGVtKSlcbn1cblxubGV0IG9uVG9nZ2xlQWxsID0gKGRpc3BhdGNoKSA9PiAoZSkgPT4ge1xuICBkaXNwYXRjaCh0b2dnbGVBbGwoZS50YXJnZXQuY2hlY2tlZCkpXG59XG5cbmxldCBvblJlbW92ZVRvZG8gPSAoZGlzcGF0Y2gsIGl0ZW0pID0+IChlKSA9PiB7XG4gIGRpc3BhdGNoKHJlbW92ZVRvZG8oaXRlbSkpXG59XG5cbmxldCBUb2RvTGlzdCA9ICh7cHJvcHMsIGRpc3BhdGNofSkgPT4gKFxuICA8c2VjdGlvbiBjbGFzcz1cIm1haW5cIj5cbiAgICA8aW5wdXQgXG4gICAgICBpZD1cInRvZ2dsZS1hbGxcIiBcbiAgICAgIGNsYXNzPVwidG9nZ2xlLWFsbFwiIFxuICAgICAgb25DaGFuZ2U9e29uVG9nZ2xlQWxsKGRpc3BhdGNoKX1cbiAgICAgIGNoZWNrZWQ9e3Byb3BzLnRvZG9zLmZpbHRlcihpdGVtPT5pdGVtLmNvbXBsZXRlZCkubGVuZ3RoPT1wcm9wcy50b2Rvcy5sZW5ndGh9XG4gICAgICB0eXBlPVwiY2hlY2tib3hcIiAvPlxuICAgIDxsYWJlbCBmb3I9XCJ0b2dnbGUtYWxsXCI+TWFyayBhbGwgYXMgY29tcGxldGU8L2xhYmVsPlxuICAgIDx1bCBjbGFzcz1cInRvZG8tbGlzdFwiPlxuICAgIHtwcm9wcy50b2Rvcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICA8bGkgXG4gICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgY2xhc3M9e2l0ZW0uY29tcGxldGVkPydjb21wbGV0ZWQnOicnfT5cbiAgICAgIDxkaXYgY2xhc3M9XCJ2aWV3XCI+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cInRvZ2dsZVwiIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgY2hlY2tlZD17aXRlbS5jb21wbGV0ZWR9IFxuICAgICAgICAgIG9uQ2hhbmdlPXtvblRvZ2dsZVRvZG8oZGlzcGF0Y2gsIGl0ZW0pfSAvPlxuICAgICAgICA8bGFiZWw+e2l0ZW0udGV4dH08L2xhYmVsPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZGVzdHJveVwiIG9uQ2xpY2s9e29uUmVtb3ZlVG9kbyhkaXNwYXRjaCwgaXRlbSl9PjwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8aW5wdXQgY2xhc3M9XCJlZGl0XCIgdmFsdWU9XCJDcmVhdGUgYSBUb2RvTVZDIHRlbXBsYXRlXCIgLz5cbiAgICA8L2xpPlxuICAgICAgKSl9XG4gICAgPC91bD5cbiAgPC9zZWN0aW9uPlxuKVxuXG5cbmV4cG9ydCBkZWZhdWx0IHN0YXRlZnVsKFRvZG9MaXN0KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnQvVG9kb0xpc3QuanMiLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qc1xuLy8gbW9kdWxlIGlkID0gcTEvT1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzXG4vLyBtb2R1bGUgaWQgPSBxcTY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9fY3NzLWxvYWRlckAwLjI4LjdAY3NzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL19zdHlsZS1sb2FkZXJAMC4xOS4wQHN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi9fY3NzLWxvYWRlckAwLjI4LjdAY3NzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vX2Nzcy1sb2FkZXJAMC4yOC43QGNzcy1sb2FkZXIvaW5kZXguanMhLi9pbmRleC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL190b2RvbXZjLWFwcC1jc3NAMi4xLjBAdG9kb212Yy1hcHAtY3NzL2luZGV4LmNzc1xuLy8gbW9kdWxlIGlkID0gcldyTFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvW0lURVJBVE9SXSA9PT0gaXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzXG4vLyBtb2R1bGUgaWQgPSByYldwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGdldFByb3RvdHlwZSBmcm9tICcuL19nZXRQcm90b3R5cGUuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGluZmVyIHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3Rvci4gKi9cbnZhciBvYmplY3RDdG9yU3RyaW5nID0gZnVuY1RvU3RyaW5nLmNhbGwoT2JqZWN0KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjguMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChuZXcgRm9vKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdCh7ICd4JzogMCwgJ3knOiAwIH0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkgfHwgYmFzZUdldFRhZyh2YWx1ZSkgIT0gb2JqZWN0VGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwcm90byA9IGdldFByb3RvdHlwZSh2YWx1ZSk7XG4gIGlmIChwcm90byA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBDdG9yID0gaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgJ2NvbnN0cnVjdG9yJykgJiYgcHJvdG8uY29uc3RydWN0b3I7XG4gIHJldHVybiB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IgaW5zdGFuY2VvZiBDdG9yICYmXG4gICAgZnVuY1RvU3RyaW5nLmNhbGwoQ3RvcikgPT0gb2JqZWN0Q3RvclN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNQbGFpbk9iamVjdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19sb2Rhc2gtZXNANC4xNy40QGxvZGFzaC1lcy9pc1BsYWluT2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSBybVhmXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHsgYXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJykgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gc05zdFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICdsb2Rhc2gtZXMvaXNQbGFpbk9iamVjdCc7XG5pbXBvcnQgJCRvYnNlcnZhYmxlIGZyb20gJ3N5bWJvbC1vYnNlcnZhYmxlJztcblxuLyoqXG4gKiBUaGVzZSBhcmUgcHJpdmF0ZSBhY3Rpb24gdHlwZXMgcmVzZXJ2ZWQgYnkgUmVkdXguXG4gKiBGb3IgYW55IHVua25vd24gYWN0aW9ucywgeW91IG11c3QgcmV0dXJuIHRoZSBjdXJyZW50IHN0YXRlLlxuICogSWYgdGhlIGN1cnJlbnQgc3RhdGUgaXMgdW5kZWZpbmVkLCB5b3UgbXVzdCByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUuXG4gKiBEbyBub3QgcmVmZXJlbmNlIHRoZXNlIGFjdGlvbiB0eXBlcyBkaXJlY3RseSBpbiB5b3VyIGNvZGUuXG4gKi9cbmV4cG9ydCB2YXIgQWN0aW9uVHlwZXMgPSB7XG4gIElOSVQ6ICdAQHJlZHV4L0lOSVQnXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBSZWR1eCBzdG9yZSB0aGF0IGhvbGRzIHRoZSBzdGF0ZSB0cmVlLlxuICAgKiBUaGUgb25seSB3YXkgdG8gY2hhbmdlIHRoZSBkYXRhIGluIHRoZSBzdG9yZSBpcyB0byBjYWxsIGBkaXNwYXRjaCgpYCBvbiBpdC5cbiAgICpcbiAgICogVGhlcmUgc2hvdWxkIG9ubHkgYmUgYSBzaW5nbGUgc3RvcmUgaW4geW91ciBhcHAuIFRvIHNwZWNpZnkgaG93IGRpZmZlcmVudFxuICAgKiBwYXJ0cyBvZiB0aGUgc3RhdGUgdHJlZSByZXNwb25kIHRvIGFjdGlvbnMsIHlvdSBtYXkgY29tYmluZSBzZXZlcmFsIHJlZHVjZXJzXG4gICAqIGludG8gYSBzaW5nbGUgcmVkdWNlciBmdW5jdGlvbiBieSB1c2luZyBgY29tYmluZVJlZHVjZXJzYC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVkdWNlciBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbmV4dCBzdGF0ZSB0cmVlLCBnaXZlblxuICAgKiB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgYWN0aW9uIHRvIGhhbmRsZS5cbiAgICpcbiAgICogQHBhcmFtIHthbnl9IFtwcmVsb2FkZWRTdGF0ZV0gVGhlIGluaXRpYWwgc3RhdGUuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gICAqIHRvIGh5ZHJhdGUgdGhlIHN0YXRlIGZyb20gdGhlIHNlcnZlciBpbiB1bml2ZXJzYWwgYXBwcywgb3IgdG8gcmVzdG9yZSBhXG4gICAqIHByZXZpb3VzbHkgc2VyaWFsaXplZCB1c2VyIHNlc3Npb24uXG4gICAqIElmIHlvdSB1c2UgYGNvbWJpbmVSZWR1Y2Vyc2AgdG8gcHJvZHVjZSB0aGUgcm9vdCByZWR1Y2VyIGZ1bmN0aW9uLCB0aGlzIG11c3QgYmVcbiAgICogYW4gb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUgYXMgYGNvbWJpbmVSZWR1Y2Vyc2Aga2V5cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2VuaGFuY2VyXSBUaGUgc3RvcmUgZW5oYW5jZXIuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gICAqIHRvIGVuaGFuY2UgdGhlIHN0b3JlIHdpdGggdGhpcmQtcGFydHkgY2FwYWJpbGl0aWVzIHN1Y2ggYXMgbWlkZGxld2FyZSxcbiAgICogdGltZSB0cmF2ZWwsIHBlcnNpc3RlbmNlLCBldGMuIFRoZSBvbmx5IHN0b3JlIGVuaGFuY2VyIHRoYXQgc2hpcHMgd2l0aCBSZWR1eFxuICAgKiBpcyBgYXBwbHlNaWRkbGV3YXJlKClgLlxuICAgKlxuICAgKiBAcmV0dXJucyB7U3RvcmV9IEEgUmVkdXggc3RvcmUgdGhhdCBsZXRzIHlvdSByZWFkIHRoZSBzdGF0ZSwgZGlzcGF0Y2ggYWN0aW9uc1xuICAgKiBhbmQgc3Vic2NyaWJlIHRvIGNoYW5nZXMuXG4gICAqL1xufTtleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVTdG9yZShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpIHtcbiAgdmFyIF9yZWYyO1xuXG4gIGlmICh0eXBlb2YgcHJlbG9hZGVkU3RhdGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGVuaGFuY2VyID09PSAndW5kZWZpbmVkJykge1xuICAgIGVuaGFuY2VyID0gcHJlbG9hZGVkU3RhdGU7XG4gICAgcHJlbG9hZGVkU3RhdGUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIGVuaGFuY2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVuaGFuY2VyKGNyZWF0ZVN0b3JlKShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSByZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgY3VycmVudFJlZHVjZXIgPSByZWR1Y2VyO1xuICB2YXIgY3VycmVudFN0YXRlID0gcHJlbG9hZGVkU3RhdGU7XG4gIHZhciBjdXJyZW50TGlzdGVuZXJzID0gW107XG4gIHZhciBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycztcbiAgdmFyIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCkge1xuICAgIGlmIChuZXh0TGlzdGVuZXJzID09PSBjdXJyZW50TGlzdGVuZXJzKSB7XG4gICAgICBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycy5zbGljZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyB0aGUgc3RhdGUgdHJlZSBtYW5hZ2VkIGJ5IHRoZSBzdG9yZS5cbiAgICpcbiAgICogQHJldHVybnMge2FueX0gVGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBvZiB5b3VyIGFwcGxpY2F0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIGN1cnJlbnRTdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hhbmdlIGxpc3RlbmVyLiBJdCB3aWxsIGJlIGNhbGxlZCBhbnkgdGltZSBhbiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCxcbiAgICogYW5kIHNvbWUgcGFydCBvZiB0aGUgc3RhdGUgdHJlZSBtYXkgcG90ZW50aWFsbHkgaGF2ZSBjaGFuZ2VkLiBZb3UgbWF5IHRoZW5cbiAgICogY2FsbCBgZ2V0U3RhdGUoKWAgdG8gcmVhZCB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGluc2lkZSB0aGUgY2FsbGJhY2suXG4gICAqXG4gICAqIFlvdSBtYXkgY2FsbCBgZGlzcGF0Y2goKWAgZnJvbSBhIGNoYW5nZSBsaXN0ZW5lciwgd2l0aCB0aGUgZm9sbG93aW5nXG4gICAqIGNhdmVhdHM6XG4gICAqXG4gICAqIDEuIFRoZSBzdWJzY3JpcHRpb25zIGFyZSBzbmFwc2hvdHRlZCBqdXN0IGJlZm9yZSBldmVyeSBgZGlzcGF0Y2goKWAgY2FsbC5cbiAgICogSWYgeW91IHN1YnNjcmliZSBvciB1bnN1YnNjcmliZSB3aGlsZSB0aGUgbGlzdGVuZXJzIGFyZSBiZWluZyBpbnZva2VkLCB0aGlzXG4gICAqIHdpbGwgbm90IGhhdmUgYW55IGVmZmVjdCBvbiB0aGUgYGRpc3BhdGNoKClgIHRoYXQgaXMgY3VycmVudGx5IGluIHByb2dyZXNzLlxuICAgKiBIb3dldmVyLCB0aGUgbmV4dCBgZGlzcGF0Y2goKWAgY2FsbCwgd2hldGhlciBuZXN0ZWQgb3Igbm90LCB3aWxsIHVzZSBhIG1vcmVcbiAgICogcmVjZW50IHNuYXBzaG90IG9mIHRoZSBzdWJzY3JpcHRpb24gbGlzdC5cbiAgICpcbiAgICogMi4gVGhlIGxpc3RlbmVyIHNob3VsZCBub3QgZXhwZWN0IHRvIHNlZSBhbGwgc3RhdGUgY2hhbmdlcywgYXMgdGhlIHN0YXRlXG4gICAqIG1pZ2h0IGhhdmUgYmVlbiB1cGRhdGVkIG11bHRpcGxlIHRpbWVzIGR1cmluZyBhIG5lc3RlZCBgZGlzcGF0Y2goKWAgYmVmb3JlXG4gICAqIHRoZSBsaXN0ZW5lciBpcyBjYWxsZWQuIEl0IGlzLCBob3dldmVyLCBndWFyYW50ZWVkIHRoYXQgYWxsIHN1YnNjcmliZXJzXG4gICAqIHJlZ2lzdGVyZWQgYmVmb3JlIHRoZSBgZGlzcGF0Y2goKWAgc3RhcnRlZCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBsYXRlc3RcbiAgICogc3RhdGUgYnkgdGhlIHRpbWUgaXQgZXhpdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIEEgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCBvbiBldmVyeSBkaXNwYXRjaC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRvIHJlbW92ZSB0aGlzIGNoYW5nZSBsaXN0ZW5lci5cbiAgICovXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgbGlzdGVuZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgaXNTdWJzY3JpYmVkID0gdHJ1ZTtcblxuICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICBuZXh0TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgaWYgKCFpc1N1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpc1N1YnNjcmliZWQgPSBmYWxzZTtcblxuICAgICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgICAgdmFyIGluZGV4ID0gbmV4dExpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICAgIG5leHRMaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uLiBJdCBpcyB0aGUgb25seSB3YXkgdG8gdHJpZ2dlciBhIHN0YXRlIGNoYW5nZS5cbiAgICpcbiAgICogVGhlIGByZWR1Y2VyYCBmdW5jdGlvbiwgdXNlZCB0byBjcmVhdGUgdGhlIHN0b3JlLCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZVxuICAgKiBjdXJyZW50IHN0YXRlIHRyZWUgYW5kIHRoZSBnaXZlbiBgYWN0aW9uYC4gSXRzIHJldHVybiB2YWx1ZSB3aWxsXG4gICAqIGJlIGNvbnNpZGVyZWQgdGhlICoqbmV4dCoqIHN0YXRlIG9mIHRoZSB0cmVlLCBhbmQgdGhlIGNoYW5nZSBsaXN0ZW5lcnNcbiAgICogd2lsbCBiZSBub3RpZmllZC5cbiAgICpcbiAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb25seSBzdXBwb3J0cyBwbGFpbiBvYmplY3QgYWN0aW9ucy4gSWYgeW91IHdhbnQgdG9cbiAgICogZGlzcGF0Y2ggYSBQcm9taXNlLCBhbiBPYnNlcnZhYmxlLCBhIHRodW5rLCBvciBzb21ldGhpbmcgZWxzZSwgeW91IG5lZWQgdG9cbiAgICogd3JhcCB5b3VyIHN0b3JlIGNyZWF0aW5nIGZ1bmN0aW9uIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgbWlkZGxld2FyZS4gRm9yXG4gICAqIGV4YW1wbGUsIHNlZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgdGhlIGByZWR1eC10aHVua2AgcGFja2FnZS4gRXZlbiB0aGVcbiAgICogbWlkZGxld2FyZSB3aWxsIGV2ZW50dWFsbHkgZGlzcGF0Y2ggcGxhaW4gb2JqZWN0IGFjdGlvbnMgdXNpbmcgdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gQSBwbGFpbiBvYmplY3QgcmVwcmVzZW50aW5nIOKAnHdoYXQgY2hhbmdlZOKAnS4gSXQgaXNcbiAgICogYSBnb29kIGlkZWEgdG8ga2VlcCBhY3Rpb25zIHNlcmlhbGl6YWJsZSBzbyB5b3UgY2FuIHJlY29yZCBhbmQgcmVwbGF5IHVzZXJcbiAgICogc2Vzc2lvbnMsIG9yIHVzZSB0aGUgdGltZSB0cmF2ZWxsaW5nIGByZWR1eC1kZXZ0b29sc2AuIEFuIGFjdGlvbiBtdXN0IGhhdmVcbiAgICogYSBgdHlwZWAgcHJvcGVydHkgd2hpY2ggbWF5IG5vdCBiZSBgdW5kZWZpbmVkYC4gSXQgaXMgYSBnb29kIGlkZWEgdG8gdXNlXG4gICAqIHN0cmluZyBjb25zdGFudHMgZm9yIGFjdGlvbiB0eXBlcy5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gRm9yIGNvbnZlbmllbmNlLCB0aGUgc2FtZSBhY3Rpb24gb2JqZWN0IHlvdSBkaXNwYXRjaGVkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQsIGlmIHlvdSB1c2UgYSBjdXN0b20gbWlkZGxld2FyZSwgaXQgbWF5IHdyYXAgYGRpc3BhdGNoKClgIHRvXG4gICAqIHJldHVybiBzb21ldGhpbmcgZWxzZSAoZm9yIGV4YW1wbGUsIGEgUHJvbWlzZSB5b3UgY2FuIGF3YWl0KS5cbiAgICovXG4gIGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgIGlmICghaXNQbGFpbk9iamVjdChhY3Rpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbXVzdCBiZSBwbGFpbiBvYmplY3RzLiAnICsgJ1VzZSBjdXN0b20gbWlkZGxld2FyZSBmb3IgYXN5bmMgYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGFjdGlvbi50eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG1heSBub3QgaGF2ZSBhbiB1bmRlZmluZWQgXCJ0eXBlXCIgcHJvcGVydHkuICcgKyAnSGF2ZSB5b3UgbWlzc3BlbGxlZCBhIGNvbnN0YW50PycpO1xuICAgIH1cblxuICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXJzIG1heSBub3QgZGlzcGF0Y2ggYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IHRydWU7XG4gICAgICBjdXJyZW50U3RhdGUgPSBjdXJyZW50UmVkdWNlcihjdXJyZW50U3RhdGUsIGFjdGlvbik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgbGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycyA9IG5leHRMaXN0ZW5lcnM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgICAgIGxpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgcmVkdWNlciBjdXJyZW50bHkgdXNlZCBieSB0aGUgc3RvcmUgdG8gY2FsY3VsYXRlIHRoZSBzdGF0ZS5cbiAgICpcbiAgICogWW91IG1pZ2h0IG5lZWQgdGhpcyBpZiB5b3VyIGFwcCBpbXBsZW1lbnRzIGNvZGUgc3BsaXR0aW5nIGFuZCB5b3Ugd2FudCB0b1xuICAgKiBsb2FkIHNvbWUgb2YgdGhlIHJlZHVjZXJzIGR5bmFtaWNhbGx5LiBZb3UgbWlnaHQgYWxzbyBuZWVkIHRoaXMgaWYgeW91XG4gICAqIGltcGxlbWVudCBhIGhvdCByZWxvYWRpbmcgbWVjaGFuaXNtIGZvciBSZWR1eC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV4dFJlZHVjZXIgVGhlIHJlZHVjZXIgZm9yIHRoZSBzdG9yZSB0byB1c2UgaW5zdGVhZC5cbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmdW5jdGlvbiByZXBsYWNlUmVkdWNlcihuZXh0UmVkdWNlcikge1xuICAgIGlmICh0eXBlb2YgbmV4dFJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIG5leHRSZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgY3VycmVudFJlZHVjZXIgPSBuZXh0UmVkdWNlcjtcbiAgICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJvcGVyYWJpbGl0eSBwb2ludCBmb3Igb2JzZXJ2YWJsZS9yZWFjdGl2ZSBsaWJyYXJpZXMuXG4gICAqIEByZXR1cm5zIHtvYnNlcnZhYmxlfSBBIG1pbmltYWwgb2JzZXJ2YWJsZSBvZiBzdGF0ZSBjaGFuZ2VzLlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIHRoZSBvYnNlcnZhYmxlIHByb3Bvc2FsOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYnNlcnZhYmxlXG4gICAqL1xuICBmdW5jdGlvbiBvYnNlcnZhYmxlKCkge1xuICAgIHZhciBfcmVmO1xuXG4gICAgdmFyIG91dGVyU3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgIHJldHVybiBfcmVmID0ge1xuICAgICAgLyoqXG4gICAgICAgKiBUaGUgbWluaW1hbCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbiBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JzZXJ2ZXIgQW55IG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIGFzIGFuIG9ic2VydmVyLlxuICAgICAgICogVGhlIG9ic2VydmVyIG9iamVjdCBzaG91bGQgaGF2ZSBhIGBuZXh0YCBtZXRob2QuXG4gICAgICAgKiBAcmV0dXJucyB7c3Vic2NyaXB0aW9ufSBBbiBvYmplY3Qgd2l0aCBhbiBgdW5zdWJzY3JpYmVgIG1ldGhvZCB0aGF0IGNhblxuICAgICAgICogYmUgdXNlZCB0byB1bnN1YnNjcmliZSB0aGUgb2JzZXJ2YWJsZSBmcm9tIHRoZSBzdG9yZSwgYW5kIHByZXZlbnQgZnVydGhlclxuICAgICAgICogZW1pc3Npb24gb2YgdmFsdWVzIGZyb20gdGhlIG9ic2VydmFibGUuXG4gICAgICAgKi9cbiAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JzZXJ2ZXIgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIG9ic2VydmVyIHRvIGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9ic2VydmVTdGF0ZSgpIHtcbiAgICAgICAgICBpZiAob2JzZXJ2ZXIubmV4dCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChnZXRTdGF0ZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvYnNlcnZlU3RhdGUoKTtcbiAgICAgICAgdmFyIHVuc3Vic2NyaWJlID0gb3V0ZXJTdWJzY3JpYmUob2JzZXJ2ZVN0YXRlKTtcbiAgICAgICAgcmV0dXJuIHsgdW5zdWJzY3JpYmU6IHVuc3Vic2NyaWJlIH07XG4gICAgICB9XG4gICAgfSwgX3JlZlskJG9ic2VydmFibGVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSwgX3JlZjtcbiAgfVxuXG4gIC8vIFdoZW4gYSBzdG9yZSBpcyBjcmVhdGVkLCBhbiBcIklOSVRcIiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCBzbyB0aGF0IGV2ZXJ5XG4gIC8vIHJlZHVjZXIgcmV0dXJucyB0aGVpciBpbml0aWFsIHN0YXRlLiBUaGlzIGVmZmVjdGl2ZWx5IHBvcHVsYXRlc1xuICAvLyB0aGUgaW5pdGlhbCBzdGF0ZSB0cmVlLlxuICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG5cbiAgcmV0dXJuIF9yZWYyID0ge1xuICAgIGRpc3BhdGNoOiBkaXNwYXRjaCxcbiAgICBzdWJzY3JpYmU6IHN1YnNjcmliZSxcbiAgICBnZXRTdGF0ZTogZ2V0U3RhdGUsXG4gICAgcmVwbGFjZVJlZHVjZXI6IHJlcGxhY2VSZWR1Y2VyXG4gIH0sIF9yZWYyWyQkb2JzZXJ2YWJsZV0gPSBvYnNlcnZhYmxlLCBfcmVmMjtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fcmVkdXhAMy43LjJAcmVkdXgvZXMvY3JlYXRlU3RvcmUuanNcbi8vIG1vZHVsZSBpZCA9IHN4Tllcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuLyoqXG4gKiBTcGVjaWFsIGF0dHJpYnV0ZXMgdGhhdCBtYXAgdG8gRE9NIGV2ZW50cy5cbiAqL1xuXG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIG9uQWJvcnQ6ICdhYm9ydCcsXG4gIG9uQW5pbWF0aW9uU3RhcnQ6ICdhbmltYXRpb25zdGFydCcsXG4gIG9uQW5pbWF0aW9uSXRlcmF0aW9uOiAnYW5pbWF0aW9uaXRlcmF0aW9uJyxcbiAgb25BbmltYXRpb25FbmQ6ICdhbmltYXRpb25lbmQnLFxuICBvbkJsdXI6ICdibHVyJyxcbiAgb25DYW5QbGF5OiAnY2FucGxheScsXG4gIG9uQ2FuUGxheVRocm91Z2g6ICdjYW5wbGF5dGhyb3VnaCcsXG4gIG9uQ2hhbmdlOiAnY2hhbmdlJyxcbiAgb25DbGljazogJ2NsaWNrJyxcbiAgb25Db250ZXh0TWVudTogJ2NvbnRleHRtZW51JyxcbiAgb25Db3B5OiAnY29weScsXG4gIG9uQ3V0OiAnY3V0JyxcbiAgb25Eb3VibGVDbGljazogJ2RibGNsaWNrJyxcbiAgb25EcmFnOiAnZHJhZycsXG4gIG9uRHJhZ0VuZDogJ2RyYWdlbmQnLFxuICBvbkRyYWdFbnRlcjogJ2RyYWdlbnRlcicsXG4gIG9uRHJhZ0V4aXQ6ICdkcmFnZXhpdCcsXG4gIG9uRHJhZ0xlYXZlOiAnZHJhZ2xlYXZlJyxcbiAgb25EcmFnT3ZlcjogJ2RyYWdvdmVyJyxcbiAgb25EcmFnU3RhcnQ6ICdkcmFnc3RhcnQnLFxuICBvbkRyb3A6ICdkcm9wJyxcbiAgb25EdXJhdGlvbkNoYW5nZTogJ2R1cmF0aW9uY2hhbmdlJyxcbiAgb25FbXB0aWVkOiAnZW1wdGllZCcsXG4gIG9uRW5jcnlwdGVkOiAnZW5jcnlwdGVkJyxcbiAgb25FbmRlZDogJ2VuZGVkJyxcbiAgb25FcnJvcjogJ2Vycm9yJyxcbiAgb25Gb2N1czogJ2ZvY3VzJyxcbiAgb25JbnB1dDogJ2lucHV0JyxcbiAgb25JbnZhbGlkOiAnaW52YWxpZCcsXG4gIG9uS2V5RG93bjogJ2tleWRvd24nLFxuICBvbktleVByZXNzOiAna2V5cHJlc3MnLFxuICBvbktleVVwOiAna2V5dXAnLFxuICBvbkxvYWQ6ICdsb2FkJyxcbiAgb25Mb2FkZWREYXRhOiAnbG9hZGVkZGF0YScsXG4gIG9uTG9hZGVkTWV0YWRhdGE6ICdsb2FkZWRtZXRhZGF0YScsXG4gIG9uTG9hZFN0YXJ0OiAnbG9hZHN0YXJ0JyxcbiAgb25QYXVzZTogJ3BhdXNlJyxcbiAgb25QbGF5OiAncGxheScsXG4gIG9uUGxheWluZzogJ3BsYXlpbmcnLFxuICBvblByb2dyZXNzOiAncHJvZ3Jlc3MnLFxuICBvbk1vdXNlRG93bjogJ21vdXNlZG93bicsXG4gIG9uTW91c2VFbnRlcjogJ21vdXNlZW50ZXInLFxuICBvbk1vdXNlTGVhdmU6ICdtb3VzZWxlYXZlJyxcbiAgb25Nb3VzZU1vdmU6ICdtb3VzZW1vdmUnLFxuICBvbk1vdXNlT3V0OiAnbW91c2VvdXQnLFxuICBvbk1vdXNlT3ZlcjogJ21vdXNlb3ZlcicsXG4gIG9uTW91c2VVcDogJ21vdXNldXAnLFxuICBvblBhc3RlOiAncGFzdGUnLFxuICBvblJhdGVDaGFuZ2U6ICdyYXRlY2hhbmdlJyxcbiAgb25SZXNldDogJ3Jlc2V0JyxcbiAgb25TY3JvbGw6ICdzY3JvbGwnLFxuICBvblNlZWtlZDogJ3NlZWtlZCcsXG4gIG9uU2Vla2luZzogJ3NlZWtpbmcnLFxuICBvblN1Ym1pdDogJ3N1Ym1pdCcsXG4gIG9uU3RhbGxlZDogJ3N0YWxsZWQnLFxuICBvblN1c3BlbmQ6ICdzdXNwZW5kJyxcbiAgb25UaW1lVXBkYXRlOiAndGltZXVwZGF0ZScsXG4gIG9uVHJhbnNpdGlvbkVuZDogJ3RyYW5zaXRpb25lbmQnLFxuICBvblRvdWNoQ2FuY2VsOiAndG91Y2hjYW5jZWwnLFxuICBvblRvdWNoRW5kOiAndG91Y2hlbmQnLFxuICBvblRvdWNoTW92ZTogJ3RvdWNobW92ZScsXG4gIG9uVG91Y2hTdGFydDogJ3RvdWNoc3RhcnQnLFxuICBvblZvbHVtZUNoYW5nZTogJ3ZvbHVtZWNoYW5nZScsXG4gIG9uV2FpdGluZzogJ3dhaXRpbmcnLFxuICBvbldoZWVsOiAnd2hlZWwnXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19kZWt1QDIuMC4wLXJjMTZAZGVrdS9saWIvZG9tL2V2ZW50cy5qc1xuLy8gbW9kdWxlIGlkID0gdDM5MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzXG4vLyBtb2R1bGUgaWQgPSB0Tkg5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanNcbi8vIG1vZHVsZSBpZCA9IHRqUzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vW3NlbGVjdG9yXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZm4uY2FsbCh0aGlzLCBzZWxlY3Rvcik7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bc2VsZWN0b3JdXG5cdH07XG59KShmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbn0pO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcblx0aWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19zdHlsZS1sb2FkZXJAMC4xOS4wQHN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSB1T0pLXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX3N0eWxlLWxvYWRlckAwLjE5LjBAc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSB1ZEdrXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcykge1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmIChyZXQgIT09IHVuZGVmaW5lZCkgYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qc1xuLy8gbW9kdWxlIGlkID0gdnM4alxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ICE9IHVuZGVmaW5lZCkgcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19jb3JlLWpzQDIuNS4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qc1xuLy8gbW9kdWxlIGlkID0gd0EwWFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9fY29yZS1qc0AyLjUuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0geDhESlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2NvcmUtanNAMi41LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IHo1OW1cbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==