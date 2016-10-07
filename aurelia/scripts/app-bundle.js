define('app-service',['exports', 'aurelia-fetch-client'], function (exports, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AppHttpClient = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var AppHttpClient = exports.AppHttpClient = function (_HttpClient) {
    _inherits(AppHttpClient, _HttpClient);

    function AppHttpClient() {
      _classCallCheck(this, AppHttpClient);

      var _this = _possibleConstructorReturn(this, _HttpClient.call(this));

      _this.configure(function (config) {
        config.useStandardConfiguration().withBaseUrl('http://localhost:3000/api').withDefaults({
          credentials: 'same-origin',
          headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        }).withInterceptor({
          request: function request(_request) {
            console.log('Requesting ' + _request.method + ' ' + _request.url);
            return _request;
          },
          response: function response(_response) {
            console.log('Received ' + _response.status + ' ' + _response.url);
            return _response;
          }
        });
      });
      return _this;
    }

    return AppHttpClient;
  }(_aureliaFetchClient.HttpClient);
});
define('app',['exports', 'jquery'], function (exports, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = 'Aurelia';
      config.options.pushState = true;
      config.options.root = '/';
      config.map([{ route: ['', 'home'], name: 'home', moduleId: './views/home/home' }, { route: 'login', name: 'login', moduleId: './views/auth/login/login' }, { route: 'signup', name: 'signup', moduleId: './views/auth/signup/signup' }, { route: 'users', name: 'users', moduleId: './views/users/users' }]);
    };

    App.prototype.attached = function attached() {
      (0, _jquery2.default)('.nav a:not(.dropdown-toggle)').on('click', function () {
        (0, _jquery2.default)('.navbar-toggle').click();
      });
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');


    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('tokenUtils',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.tokenIsExpired = tokenIsExpired;
  function tokenIsExpired() {
    var jwt = localStorage.getItem('id_token');
    if (jwt) {
      var jwtExp = jwt_decode(jwt).exp;
      var expiryDate = new Date(0);
      expiryDate.setUTCSeconds(jwtExp);
      if (new Date() < expiryDate) {
        return false;
      }
    }
    return true;
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('assets/js/footable',[], function () {
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	/*
 * FooTable v3 - FooTable is a jQuery plugin that aims to make HTML tables on smaller devices look awesome.
 * @version 3.1.1
 * @link http://fooplugins.com
 * @copyright Steven Usher & Brad Vincent 2015
 * @license Released under the GPLv3 license.
 */
	(function ($, F) {
		window.console = window.console || { log: function log() {}, error: function error() {} };

		$.fn.footable = function (options, ready) {
			options = options || {};

			return this.filter('table').each(function (i, tbl) {
				F.init(tbl, options, ready);
			});
		};

		var debug_defaults = {
			events: []
		};
		F.__debug__ = JSON.parse(localStorage.getItem('footable_debug')) || false;
		F.__debug_options__ = JSON.parse(localStorage.getItem('footable_debug_options')) || debug_defaults;

		F.debug = function (value, options) {
			if (!F.is.boolean(value)) return F.__debug__;
			F.__debug__ = value;
			if (F.__debug__) {
				localStorage.setItem('footable_debug', JSON.stringify(F.__debug__));
				F.__debug_options__ = $.extend(true, {}, debug_defaults, options || {});
				if (F.is.hash(options)) {
					localStorage.setItem('footable_debug_options', JSON.stringify(F.__debug_options__));
				}
			} else {
				localStorage.removeItem('footable_debug');
				localStorage.removeItem('footable_debug_options');
			}
		};

		F.get = function (table) {
			return $(table).first().data('__FooTable__');
		};

		F.init = function (table, options, ready) {
			var ft = F.get(table);
			if (ft instanceof F.Table) ft.destroy();
			return new F.Table(table, options, ready);
		};

		F.getRow = function (element) {
			var $row = $(element).closest('tr');

			if ($row.hasClass('footable-detail-row')) {
				$row = $row.prev();
			}

			return $row.data('__FooTableRow__');
		};
	})(jQuery, FooTable = window.FooTable || {});
	(function (F) {
		var returnTrue = function returnTrue() {
			return true;
		};

		F.arr = {};

		F.arr.each = function (array, func) {
			if (!F.is.array(array) || !F.is.fn(func)) return;
			for (var i = 0, len = array.length; i < len; i++) {
				if (func(array[i], i) === false) break;
			}
		};

		F.arr.get = function (array, where) {
			var result = [];
			if (!F.is.array(array)) return result;
			if (!F.is.fn(where)) return array;
			for (var i = 0, len = array.length; i < len; i++) {
				if (where(array[i], i)) result.push(array[i]);
			}
			return result;
		};

		F.arr.any = function (array, where) {
			if (!F.is.array(array)) return false;
			where = F.is.fn(where) ? where : returnTrue;
			for (var i = 0, len = array.length; i < len; i++) {
				if (where(array[i], i)) return true;
			}
			return false;
		};

		F.arr.contains = function (array, value) {
			if (!F.is.array(array) || F.is.undef(value)) return false;
			for (var i = 0, len = array.length; i < len; i++) {
				if (array[i] == value) return true;
			}
			return false;
		};

		F.arr.first = function (array, where) {
			if (!F.is.array(array)) return null;
			where = F.is.fn(where) ? where : returnTrue;
			for (var i = 0, len = array.length; i < len; i++) {
				if (where(array[i], i)) return array[i];
			}
			return null;
		};

		F.arr.map = function (array, getter) {
			var result = [],
			    returned = null;
			if (!F.is.array(array) || !F.is.fn(getter)) return result;
			for (var i = 0, len = array.length; i < len; i++) {
				if ((returned = getter(array[i], i)) != null) result.push(returned);
			}
			return result;
		};

		F.arr.remove = function (array, where) {
			var remove = [],
			    removed = [];
			if (!F.is.array(array) || !F.is.fn(where)) return removed;
			var i = 0,
			    len = array.length;
			for (; i < len; i++) {
				if (where(array[i], i, removed)) {
					remove.push(i);
					removed.push(array[i]);
				}
			}

			remove.sort(function (a, b) {
				return b - a;
			});
			i = 0;len = remove.length;
			for (; i < len; i++) {
				var index = remove[i] - i;
				array.splice(index, 1);
			}
			return removed;
		};

		F.arr.delete = function (array, item) {
			var remove = -1,
			    removed = null;
			if (!F.is.array(array) || F.is.undef(item)) return removed;
			var i = 0,
			    len = array.length;
			for (; i < len; i++) {
				if (array[i] == item) {
					remove = i;
					removed = array[i];
					break;
				}
			}
			if (remove != -1) array.splice(remove, 1);
			return removed;
		};

		F.arr.replace = function (array, oldItem, newItem) {
			var index = array.indexOf(oldItem);
			if (index !== -1) array[index] = newItem;
		};
	})(FooTable);
	(function (F) {
		F.is = {};

		F.is.type = function (value, type) {
			return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === type;
		};

		F.is.defined = function (value) {
			return typeof value !== 'undefined';
		};

		F.is.undef = function (value) {
			return typeof value === 'undefined';
		};

		F.is.array = function (value) {
			return '[object Array]' === Object.prototype.toString.call(value);
		};

		F.is.date = function (value) {
			return '[object Date]' === Object.prototype.toString.call(value) && !isNaN(value.getTime());
		};

		F.is.boolean = function (value) {
			return '[object Boolean]' === Object.prototype.toString.call(value);
		};

		F.is.string = function (value) {
			return '[object String]' === Object.prototype.toString.call(value);
		};

		F.is.number = function (value) {
			return '[object Number]' === Object.prototype.toString.call(value) && !isNaN(value);
		};

		F.is.fn = function (value) {
			return F.is.defined(window) && value === window.alert || '[object Function]' === Object.prototype.toString.call(value);
		};

		F.is.error = function (value) {
			return '[object Error]' === Object.prototype.toString.call(value);
		};

		F.is.object = function (value) {
			return '[object Object]' === Object.prototype.toString.call(value);
		};

		F.is.hash = function (value) {
			return F.is.object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
		};

		F.is.element = function (obj) {
			return (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object' ? obj instanceof HTMLElement : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
		};

		F.is.promise = function (obj) {
			return F.is.object(obj) && F.is.fn(obj.then) && F.is.fn(obj.promise);
		};

		F.is.jq = function (obj) {
			return F.is.defined(window.jQuery) && obj instanceof jQuery && obj.length > 0;
		};

		F.is.moment = function (obj) {
			return F.is.defined(window.moment) && F.is.object(obj) && F.is.boolean(obj._isAMomentObject);
		};

		F.is.emptyObject = function (value) {
			if (!F.is.hash(value)) return false;
			for (var prop in value) {
				if (value.hasOwnProperty(prop)) return false;
			}
			return true;
		};

		F.is.emptyArray = function (value) {
			return F.is.array(value) ? value.length === 0 : true;
		};

		F.is.emptyString = function (value) {
			return F.is.string(value) ? value.length === 0 : true;
		};
	})(FooTable);
	(function (F) {
		F.str = {};

		F.str.contains = function (str, contains, ignoreCase) {
			if (F.is.emptyString(str) || F.is.emptyString(contains)) return false;
			return contains.length <= str.length && (ignoreCase ? str.toUpperCase().indexOf(contains.toUpperCase()) : str.indexOf(contains)) !== -1;
		};

		F.str.containsWord = function (str, word, ignoreCase) {
			if (F.is.emptyString(str) || F.is.emptyString(word) || str.length < word.length) return false;
			var parts = str.split(/\W/);
			for (var i = 0, len = parts.length; i < len; i++) {
				if (ignoreCase ? parts[i].toUpperCase() == word.toUpperCase() : parts[i] == word) return true;
			}
			return false;
		};

		F.str.from = function (str, from) {
			if (F.is.emptyString(str)) return str;
			return F.str.contains(str, from) ? str.substring(str.indexOf(from) + 1) : str;
		};

		F.str.startsWith = function (str, prefix) {
			if (F.is.emptyString(str)) return str == prefix;
			return str.slice(0, prefix.length) == prefix;
		};

		F.str.toCamelCase = function (str) {
			if (F.is.emptyString(str)) return str;
			if (str.toUpperCase() === str) return str.toLowerCase();
			return str.replace(/^([A-Z])|[-\s_](\w)/g, function (match, p1, p2) {
				if (F.is.string(p2)) return p2.toUpperCase();
				return p1.toLowerCase();
			});
		};

		F.str.random = function (prefix) {
			prefix = F.is.emptyString(prefix) ? '' : prefix;
			return prefix + Math.random().toString(36).substr(2, 9);
		};

		F.str.escapeRegExp = function (str) {
			if (F.is.emptyString(str)) return str;
			return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		};
	})(FooTable);
	(function (F) {
		"use strict";

		if (!Object.create) {
			Object.create = function () {
				var Object = function Object() {};
				return function (prototype) {
					if (arguments.length > 1) throw Error('Second argument not supported');

					if (!F.is.object(prototype)) throw TypeError('Argument must be an object');

					Object.prototype = prototype;
					var result = new Object();
					Object.prototype = null;
					return result;
				};
			}();
		}

		function Class() {}

		var __extendable__ = /xyz/.test(function () {
			xyz;
		}) ? /\b_super\b/ : /.*/;

		Class.__extend__ = function (proto, name, func, original) {
			proto[name] = F.is.fn(original) && __extendable__.test(func) ? function (name, fn) {
				return function () {
					var tmp, ret;
					tmp = this._super;
					this._super = original;
					ret = fn.apply(this, arguments);
					this._super = tmp;
					return ret;
				};
			}(name, func) : func;
		};

		Class.extend = function (arg1, arg2) {
			var args = Array.prototype.slice.call(arguments);
			arg1 = args.shift();
			arg2 = args.shift();

			function __extend__(proto, name, func, original) {
				proto[name] = F.is.fn(original) && __extendable__.test(func) ? function (name, fn, ofn) {
					return function () {
						var tmp, ret;
						tmp = this._super;
						this._super = ofn;
						ret = fn.apply(this, arguments);
						this._super = tmp;
						return ret;
					};
				}(name, func, original) : func;
			}

			if (F.is.hash(arg1)) {
				var proto = Object.create(this.prototype),
				    _super = this.prototype;
				for (var name in arg1) {
					if (name === '__ctor__') continue;
					__extend__(proto, name, arg1[name], _super[name]);
				}
				var obj = F.is.fn(proto.__ctor__) ? proto.__ctor__ : function () {
					if (!F.is.fn(this.construct)) throw new SyntaxError('FooTable class objects must be constructed with the "new" keyword.');
					this.construct.apply(this, arguments);
				};
				proto.construct = F.is.fn(proto.construct) ? proto.construct : function () {};
				obj.prototype = proto;
				proto.constructor = obj;
				obj.extend = Class.extend;
				return obj;
			} else if (F.is.string(arg1) && F.is.fn(arg2)) {
				__extend__(this.prototype, arg1, arg2, this.prototype[arg1]);
			}
		};

		F.Class = Class;

		F.ClassFactory = F.Class.extend({
			construct: function construct() {
				this.registered = {};
			},

			contains: function contains(name) {
				return F.is.defined(this.registered[name]);
			},

			names: function names() {
				var names = [],
				    name;
				for (name in this.registered) {
					if (!this.registered.hasOwnProperty(name)) continue;
					names.push(name);
				}
				return names;
			},

			register: function register(name, klass, priority) {
				if (!F.is.string(name) || !F.is.fn(klass)) return;
				var current = this.registered[name];
				this.registered[name] = {
					name: name,
					klass: klass,
					priority: F.is.number(priority) ? priority : F.is.defined(current) ? current.priority : 0
				};
			},

			load: function load(subs, arg1, argN) {
				var self = this,
				    args = Array.prototype.slice.call(arguments),
				    reg = [],
				    loaded = [],
				    name,
				    klass;
				subs = args.shift() || {};
				for (name in self.registered) {
					if (!self.registered.hasOwnProperty(name)) continue;
					var component = self.registered[name];
					if (subs.hasOwnProperty(name)) {
						klass = subs[name];
						if (F.is.string(klass)) klass = F.getFnPointer(subs[name]);
						if (F.is.fn(klass)) {
							component = { name: name, klass: klass, priority: self.registered[name].priority };
						}
					}
					reg.push(component);
				}
				for (name in subs) {
					if (!subs.hasOwnProperty(name) || self.registered.hasOwnProperty(name)) continue;
					klass = subs[name];
					if (F.is.string(klass)) klass = F.getFnPointer(subs[name]);
					if (F.is.fn(klass)) {
						reg.push({ name: name, klass: klass, priority: 0 });
					}
				}
				reg.sort(function (a, b) {
					return b.priority - a.priority;
				});
				F.arr.each(reg, function (r) {
					if (F.is.fn(r.klass)) {
						loaded.push(self._make(r.klass, args));
					}
				});
				return loaded;
			},

			make: function make(name, arg1, argN) {
				var self = this,
				    args = Array.prototype.slice.call(arguments),
				    reg;
				name = args.shift();
				reg = self.registered[name];
				if (F.is.fn(reg.klass)) {
					return self._make(reg.klass, args);
				}
				return null;
			},

			_make: function _make(klass, args) {
				function Class() {
					return klass.apply(this, args);
				}
				Class.prototype = klass.prototype;
				return new Class();
			}
		});
	})(FooTable);
	(function ($, F) {
		F.css2json = function (cssText) {
			if (F.is.emptyString(cssText)) return {};
			var json = {},
			    props = cssText.split(';'),
			    pair,
			    key,
			    value;
			for (var i = 0, i_len = props.length; i < i_len; i++) {
				if (F.is.emptyString(props[i])) continue;
				pair = props[i].split(':');
				if (F.is.emptyString(pair[0]) || F.is.emptyString(pair[1])) continue;
				key = F.str.toCamelCase($.trim(pair[0]));
				value = $.trim(pair[1]);
				json[key] = value;
			}
			return json;
		};

		F.getFnPointer = function (functionName) {
			if (F.is.emptyString(functionName)) return null;
			var pointer = window,
			    parts = functionName.split('.');
			F.arr.each(parts, function (part) {
				if (pointer[part]) pointer = pointer[part];
			});
			return F.is.fn(pointer) ? pointer : null;
		};

		F.checkFnValue = function (self, value, def) {
			def = F.is.fn(def) ? def : null;
			function wrap(t, fn, d) {
				if (!F.is.fn(fn)) return d;
				return function () {
					return fn.apply(t, arguments);
				};
			}
			return F.is.fn(value) ? wrap(self, value, def) : F.is.type(value, 'string') ? wrap(self, F.getFnPointer(value), def) : def;
		};
	})(jQuery, FooTable);
	(function ($, F) {

		F.Cell = F.Class.extend({
			construct: function construct(table, row, column, valueOrElement) {
				this.ft = table;

				this.row = row;

				this.column = column;
				this.created = false;
				this.define(valueOrElement);
			},

			define: function define(valueOrElement) {
				this.$el = F.is.element(valueOrElement) || F.is.jq(valueOrElement) ? $(valueOrElement) : null;

				this.$detail = null;

				var hasOptions = F.is.hash(valueOrElement) && F.is.hash(valueOrElement.options) && F.is.defined(valueOrElement.value);

				this.value = this.column.parser.call(this.column, F.is.jq(this.$el) ? this.$el : hasOptions ? valueOrElement.value : valueOrElement, this.ft.o);

				this.o = $.extend(true, {
					classes: null,
					style: null
				}, hasOptions ? valueOrElement.options : {});

				this.classes = F.is.jq(this.$el) && this.$el.attr('class') ? this.$el.attr('class').match(/\S+/g) : F.is.array(this.o.classes) ? this.o.classes : F.is.string(this.o.classes) ? this.o.classes.match(/\S+/g) : [];

				this.style = F.is.jq(this.$el) && this.$el.attr('style') ? F.css2json(this.$el.attr('style')) : F.is.hash(this.o.style) ? this.o.style : F.is.string(this.o.style) ? F.css2json(this.o.style) : {};
			},

			$create: function $create() {
				if (this.created) return;
				(this.$el = F.is.jq(this.$el) ? this.$el : $('<td/>')).data('value', this.value).contents().detach().end().append(this.format(this.value));

				this._setClasses(this.$el);
				this._setStyle(this.$el);

				this.$detail = $('<tr/>').addClass(this.row.classes.join(' ')).data('__FooTableCell__', this).append($('<th/>')).append($('<td/>'));

				this.created = true;
			},

			collapse: function collapse() {
				if (!this.created) return;
				this.$detail.children('th').html(this.column.title);
				this.$detail.children('td').first().attr('class', this.$el.attr('class')).attr('style', this.$el.attr('style')).css('display', 'table-cell').append(this.$el.contents().detach());

				if (!F.is.jq(this.$detail.parent())) this.$detail.appendTo(this.row.$details.find('.footable-details > tbody'));
			},

			restore: function restore() {
				if (!this.created) return;
				if (F.is.jq(this.$detail.parent())) {
					var $cell = this.$detail.children('td').first();
					this.$el.attr('class', $cell.attr('class')).attr('style', $cell.attr('style')).css('display', this.column.hidden || !this.column.visible ? 'none' : 'table-cell').append($cell.contents().detach());
				}
				this.$detail.detach();
			},

			parse: function parse() {
				return this.column.parser.call(this.column, this.$el, this.ft.o);
			},

			format: function format(value) {
				return this.column.formatter.call(this.column, value, this.ft.o);
			},

			val: function val(value, redraw) {
				if (F.is.undef(value)) {
					return this.value;
				}

				var self = this,
				    hasOptions = F.is.hash(value) && F.is.hash(value.options) && F.is.defined(value.value);
				this.o = $.extend(true, {
					classes: self.classes,
					style: self.style
				}, hasOptions ? value.options : {});

				this.value = hasOptions ? value.value : value;
				this.classes = F.is.array(this.o.classes) ? this.o.classes : F.is.string(this.o.classes) ? this.o.classes.match(/\S+/g) : [];
				this.style = F.is.hash(this.o.style) ? this.o.style : F.is.string(this.o.style) ? F.css2json(this.o.style) : {};

				if (this.created) {
					this.$el.data('value', this.value).empty();

					var $detail = this.$detail.children('td').first().empty(),
					    $target = F.is.jq(this.$detail.parent()) ? $detail : this.$el;

					$target.append(this.format(this.value));

					this._setClasses($target);
					this._setStyle($target);

					if (F.is.boolean(redraw) ? redraw : true) this.row.draw();
				}
			},
			_setClasses: function _setClasses($el) {
				var hasColClasses = !F.is.emptyArray(this.column.classes),
				    hasClasses = !F.is.emptyArray(this.classes),
				    classes = null;
				$el.removeAttr('class');
				if (!hasColClasses && !hasClasses) return;
				if (hasColClasses && hasClasses) {
					classes = this.classes.concat(this.column.classes).join(' ');
				} else if (hasColClasses) {
					classes = this.column.classes.join(' ');
				} else if (hasClasses) {
					classes = this.classes.join(' ');
				}
				if (!F.is.emptyString(classes)) {
					$el.addClass(classes);
				}
			},
			_setStyle: function _setStyle($el) {
				var hasColStyle = !F.is.emptyObject(this.column.style),
				    hasStyle = !F.is.emptyObject(this.style),
				    style = null;
				$el.removeAttr('style');
				if (!hasColStyle && !hasStyle) return;
				if (hasColStyle && hasStyle) {
					style = $.extend({}, this.column.style, this.style);
				} else if (hasColStyle) {
					style = this.column.style;
				} else if (hasStyle) {
					style = this.style;
				}
				if (F.is.hash(style)) {
					$el.css(style);
				}
			}
		});
	})(jQuery, FooTable);
	(function ($, F) {

		F.Column = F.Class.extend({
			construct: function construct(instance, definition, type) {
				this.ft = instance;

				this.type = F.is.emptyString(type) ? 'text' : type;

				this.virtual = F.is.boolean(definition.virtual) ? definition.virtual : false;

				this.$el = F.is.jq(definition.$el) ? definition.$el : null;

				this.index = F.is.number(definition.index) ? definition.index : -1;
				this.define(definition);
				this.$create();
			},

			define: function define(definition) {
				this.hidden = F.is.boolean(definition.hidden) ? definition.hidden : false;

				this.visible = F.is.boolean(definition.visible) ? definition.visible : true;

				this.name = F.is.string(definition.name) ? definition.name : null;
				if (this.name == null) this.name = 'col' + (definition.index + 1);

				this.title = F.is.string(definition.title) ? definition.title : null;
				if (!this.virtual && this.title == null && F.is.jq(this.$el)) this.title = this.$el.html();
				if (this.title == null) this.title = 'Column ' + (definition.index + 1);

				this.style = F.is.hash(definition.style) ? definition.style : F.is.string(definition.style) ? F.css2json(definition.style) : {};

				this.classes = F.is.array(definition.classes) ? definition.classes : F.is.string(definition.classes) ? definition.classes.match(/\S+/g) : [];

				this.parser = F.checkFnValue(this, definition.parser, this.parser);
				this.formatter = F.checkFnValue(this, definition.formatter, this.formatter);
			},

			$create: function $create() {
				(this.$el = !this.virtual && F.is.jq(this.$el) ? this.$el : $('<th/>')).html(this.title);
			},

			parser: function parser(valueOrElement) {
				if (F.is.element(valueOrElement) || F.is.jq(valueOrElement)) return $(valueOrElement).data('value') || $(valueOrElement).text();
				if (F.is.defined(valueOrElement) && valueOrElement != null) return valueOrElement + '';
				return null;
			},

			formatter: function formatter(value) {
				return value == null ? '' : value;
			},

			createCell: function createCell(row) {
				var element = F.is.jq(row.$el) ? row.$el.children('td,th').get(this.index) : null,
				    data = F.is.hash(row.value) ? row.value[this.name] : null;
				return new F.Cell(this.ft, row, this, element || data);
			}
		});

		F.columns = new F.ClassFactory();

		F.columns.register('text', F.Column);
	})(jQuery, FooTable);
	(function ($, F) {

		F.Component = F.Class.extend({
			construct: function construct(instance, enabled) {
				if (!(instance instanceof F.Table)) throw new TypeError('The instance parameter must be an instance of FooTable.Table.');

				this.ft = instance;

				this.enabled = F.is.boolean(enabled) ? enabled : false;
			},

			preinit: function preinit(data) {},

			init: function init() {},

			destroy: function destroy() {},

			predraw: function predraw() {},

			draw: function draw() {},

			postdraw: function postdraw() {}
		});

		F.components = new F.ClassFactory();
	})(jQuery, FooTable);
	(function ($, F) {
		F.Defaults = function () {
			this.stopPropagation = false;

			this.on = null;
		};

		F.defaults = new F.Defaults();
	})(jQuery, FooTable);
	(function ($, F) {

		F.Row = F.Class.extend({
			construct: function construct(table, columns, dataOrElement) {
				this.ft = table;

				this.columns = columns;

				this.created = false;
				this.define(dataOrElement);
			},

			define: function define(dataOrElement) {
				this.$el = F.is.element(dataOrElement) || F.is.jq(dataOrElement) ? $(dataOrElement) : null;

				this.$toggle = $('<span/>', { 'class': 'footable-toggle fooicon fooicon-plus' });

				var isObj = F.is.hash(dataOrElement),
				    hasOptions = isObj && F.is.hash(dataOrElement.options) && F.is.hash(dataOrElement.value);

				this.value = isObj ? hasOptions ? dataOrElement.value : dataOrElement : null;

				this.o = $.extend(true, {
					expanded: false,
					classes: null,
					style: null
				}, hasOptions ? dataOrElement.options : {});

				this.expanded = F.is.jq(this.$el) ? this.$el.data('expanded') || this.o.expanded : this.o.expanded;

				this.classes = F.is.jq(this.$el) && this.$el.attr('class') ? this.$el.attr('class').match(/\S+/g) : F.is.array(this.o.classes) ? this.o.classes : F.is.string(this.o.classes) ? this.o.classes.match(/\S+/g) : [];

				this.style = F.is.jq(this.$el) && this.$el.attr('style') ? F.css2json(this.$el.attr('style')) : F.is.hash(this.o.style) ? this.o.style : F.is.string(this.o.style) ? F.css2json(this.o.style) : {};

				this.cells = this.createCells();

				var self = this;
				self.value = {};
				F.arr.each(self.cells, function (cell) {
					self.value[cell.column.name] = cell.val();
				});
			},

			$create: function $create() {
				if (this.created) return;
				(this.$el = F.is.jq(this.$el) ? this.$el : $('<tr/>')).data('__FooTableRow__', this);

				this._setClasses(this.$el);
				this._setStyle(this.$el);

				if (this.ft.rows.toggleColumn == 'last') this.$toggle.addClass('last-column');

				this.$details = $('<tr/>', { 'class': 'footable-detail-row' }).append($('<td/>', { colspan: this.ft.columns.visibleColspan }).append($('<table/>', { 'class': 'footable-details ' + this.ft.classes.join(' ') }).append('<tbody/>')));

				var self = this;
				F.arr.each(self.cells, function (cell) {
					if (!cell.created) cell.$create();
					self.$el.append(cell.$el);
				});
				self.$el.off('click.ft.row').on('click.ft.row', { self: self }, self._onToggle);
				this.created = true;
			},

			createCells: function createCells() {
				var self = this;
				return F.arr.map(self.columns, function (col) {
					return col.createCell(self);
				});
			},

			val: function val(data, redraw) {
				var self = this;
				if (!F.is.hash(data)) {
					if (!F.is.hash(this.value) || F.is.emptyObject(this.value)) {
						this.value = {};
						F.arr.each(this.cells, function (cell) {
							self.value[cell.column.name] = cell.val();
						});
					}
					return this.value;
				}

				this.collapse(false);
				var isObj = F.is.hash(data),
				    hasOptions = isObj && F.is.hash(data.options) && F.is.hash(data.value);

				this.o = $.extend(true, {
					expanded: self.expanded,
					classes: self.classes,
					style: self.style
				}, hasOptions ? data.options : {});

				this.expanded = this.o.expanded;
				this.classes = F.is.array(this.o.classes) ? this.o.classes : F.is.string(this.o.classes) ? this.o.classes.match(/\S+/g) : [];
				this.style = F.is.hash(this.o.style) ? this.o.style : F.is.string(this.o.style) ? F.css2json(this.o.style) : {};
				if (isObj) {
					if (hasOptions) data = data.value;
					if (F.is.hash(this.value)) {
						for (var prop in data) {
							if (!data.hasOwnProperty(prop)) continue;
							this.value[prop] = data[prop];
						}
					} else {
						this.value = data;
					}
				} else {
					this.value = null;
				}

				F.arr.each(this.cells, function (cell) {
					if (F.is.defined(self.value[cell.column.name])) cell.val(self.value[cell.column.name], false);
				});

				if (this.created) {
					this._setClasses(this.$el);
					this._setStyle(this.$el);
					if (F.is.boolean(redraw) ? redraw : true) this.draw();
				}
			},
			_setClasses: function _setClasses($el) {
				var hasClasses = !F.is.emptyArray(this.classes),
				    classes = null;
				$el.removeAttr('class');
				if (!hasClasses) return;else classes = this.classes.join(' ');
				if (!F.is.emptyString(classes)) {
					$el.addClass(classes);
				}
			},
			_setStyle: function _setStyle($el) {
				var hasStyle = !F.is.emptyObject(this.style),
				    style = null;
				$el.removeAttr('style');
				if (!hasStyle) return;else style = this.style;
				if (F.is.hash(style)) {
					$el.css(style);
				}
			},

			expand: function expand() {
				if (!this.created) return;
				var self = this;

				self.ft.raise('expand.ft.row', [self]).then(function () {
					self.__hidden__ = F.arr.map(self.cells, function (cell) {
						return cell.column.hidden && cell.column.visible ? cell : null;
					});

					if (self.__hidden__.length > 0) {
						self.$details.insertAfter(self.$el).children('td').first().attr('colspan', self.ft.columns.visibleColspan);

						F.arr.each(self.__hidden__, function (cell) {
							cell.collapse();
						});
					}
					self.$el.attr('data-expanded', true);
					self.$toggle.removeClass('fooicon-plus').addClass('fooicon-minus');
					self.expanded = true;
				});
			},

			collapse: function collapse(setExpanded) {
				if (!this.created) return;
				var self = this;

				self.ft.raise('collapse.ft.row', [self]).then(function () {
					F.arr.each(self.__hidden__, function (cell) {
						cell.restore();
					});
					self.$details.detach();
					self.$el.removeAttr('data-expanded');
					self.$toggle.removeClass('fooicon-minus').addClass('fooicon-plus');
					if (F.is.boolean(setExpanded) ? setExpanded : true) self.expanded = false;
				});
			},

			predraw: function predraw(detach) {
				if (this.created) {
					if (this.expanded) {
						this.collapse(false);
					}
					this.$toggle.detach();
					detach = F.is.boolean(detach) ? detach : true;
					if (detach) this.$el.detach();
				}
			},

			draw: function draw($parent) {
				if (!this.created) this.$create();
				if (F.is.jq($parent)) $parent.append(this.$el);
				var self = this;
				F.arr.each(self.cells, function (cell) {
					cell.$el.css('display', cell.column.hidden || !cell.column.visible ? 'none' : 'table-cell');
					if (self.ft.rows.showToggle && self.ft.columns.hasHidden) {
						if (self.ft.rows.toggleColumn == 'first' && cell.column.index == self.ft.columns.firstVisibleIndex || self.ft.rows.toggleColumn == 'last' && cell.column.index == self.ft.columns.lastVisibleIndex) {
							cell.$el.prepend(self.$toggle);
						}
					}
				});
				if (this.expanded) {
					this.expand();
				}
			},

			toggle: function toggle() {
				if (this.created && this.ft.columns.hasHidden) {
					if (this.expanded) this.collapse();else this.expand();
				}
			},

			_onToggle: function _onToggle(e) {
				var self = e.data.self;

				if ($(e.target).is(self.ft.rows.toggleSelector)) {
					self.toggle();
				}
			}
		});
	})(jQuery, FooTable);

	(function ($, F) {
		F.instances = [];

		F.Table = F.Class.extend({
			construct: function construct(element, options, ready) {
				this._resizeTimeout = null;

				this.id = F.instances.push(this);

				this.initialized = false;

				this.$el = (F.is.jq(element) ? element : $(element)).first();
				this.o = $.extend(true, {}, F.defaults, options);

				this.data = this.$el.data() || {};

				this.classes = [];

				this.components = F.components.load(F.is.hash(this.data.components) ? this.data.components : this.o.components, this);

				this.breakpoints = this.use(FooTable.Breakpoints);

				this.columns = this.use(FooTable.Columns);

				this.rows = this.use(FooTable.Rows);

				this._construct(ready);
			},

			_construct: function _construct(ready) {
				var self = this;
				this._preinit().then(function () {
					return self._init();
				}).always(function (arg) {
					if (F.is.error(arg)) {
						console.error('FooTable: unhandled error thrown during initialization.', arg);
					} else {
						return self.raise('ready.ft.table').then(function () {
							if (F.is.fn(ready)) ready.call(self, self);
						});
					}
				});
			},

			_preinit: function _preinit() {
				var self = this;

				return this.raise('preinit.ft.table', [self.data]).then(function () {
					var classes = self.$el.attr('class').match(/\S+/g);

					self.o.ajax = F.checkFnValue(self, self.data.ajax, self.o.ajax);
					self.o.stopPropagation = F.is.boolean(self.data.stopPropagation) ? self.data.stopPropagation : self.o.stopPropagation;

					for (var i = 0, len = classes.length; i < len; i++) {
						if (!F.str.startsWith(classes[i], 'footable')) self.classes.push(classes[i]);
					}
					var $loader = $('<div/>', { 'class': 'footable-loader' }).append($('<span/>', { 'class': 'fooicon fooicon-loader' }));
					self.$el.hide().after($loader);
					return self.execute(false, false, 'preinit', self.data).always(function () {
						self.$el.show();
						$loader.remove();
					});
				});
			},

			_init: function _init() {
				var self = this;

				return self.raise('init.ft.table').then(function () {
					var $thead = self.$el.children('thead'),
					    $tbody = self.$el.children('tbody'),
					    $tfoot = self.$el.children('tfoot');
					self.$el.addClass('footable footable-' + self.id);
					if (F.is.hash(self.o.on)) self.$el.on(self.o.on);
					if ($tfoot.length == 0) self.$el.append($tfoot = $('<tfoot/>'));
					if ($tbody.length == 0) self.$el.append('<tbody/>');
					if ($thead.length == 0) self.$el.prepend($thead = $('<thead/>'));
					return self.execute(false, true, 'init').then(function () {
						self.$el.data('__FooTable__', self);
						if ($tfoot.children('tr').length == 0) $tfoot.remove();
						if ($thead.children('tr').length == 0) $thead.remove();

						return self.raise('postinit.ft.table').then(function () {
							return self.draw();
						}).always(function () {
							$(window).off('resize.ft' + self.id, self._onWindowResize).on('resize.ft' + self.id, { self: self }, self._onWindowResize);
							self.initialized = true;
						});
					});
				});
			},

			destroy: function destroy() {
				var self = this;

				return self.raise('destroy.ft.table').then(function () {
					return self.execute(true, true, 'destroy').then(function () {
						self.$el.removeData('__FooTable__').removeClass('footable-' + self.id);
						if (F.is.hash(self.o.on)) self.$el.off(self.o.on);
						self.initialized = false;
					});
				}).fail(function (err) {
					if (F.is.error(err)) {
						console.error('FooTable: unhandled error thrown while destroying the plugin.', err);
					}
				});
			},

			raise: function raise(eventName, args) {
				var self = this,
				    debug = F.__debug__ && (F.is.emptyArray(F.__debug_options__.events) || F.arr.any(F.__debug_options__.events, function (name) {
					return F.str.contains(eventName, name);
				}));
				args = args || [];
				args.unshift(this);
				return $.Deferred(function (d) {
					var evt = $.Event(eventName);
					if (self.o.stopPropagation == true) {
						self.$el.one(eventName, function (e) {
							e.stopPropagation();
						});
					}
					if (debug) console.log('FooTable:' + eventName + ': ', args);
					self.$el.trigger(evt, args);
					if (evt.isDefaultPrevented()) {
						if (debug) console.log('FooTable: default prevented for the "' + eventName + '" event.');
						d.reject(evt);
					} else d.resolve(evt);
				});
			},

			use: function use(type) {
				for (var i = 0, len = this.components.length; i < len; i++) {
					if (this.components[i] instanceof type) return this.components[i];
				}
				return null;
			},

			draw: function draw() {
				var self = this;

				return self.execute(false, true, 'predraw').then(function () {
					return self.raise('predraw.ft.table').then(function () {
						return self.execute(false, true, 'draw').then(function () {
							return self.raise('draw.ft.table').then(function () {
								return self.execute(false, true, 'postdraw').then(function () {
									return self.raise('postdraw.ft.table');
								});
							});
						});
					});
				}).fail(function (err) {
					if (F.is.error(err)) {
						console.error('FooTable: unhandled error thrown during a draw operation.', err);
					}
				});
			},

			execute: function execute(reverse, enabled, methodName, param1, paramN) {
				var self = this,
				    args = Array.prototype.slice.call(arguments);
				reverse = args.shift();
				enabled = args.shift();
				var components = enabled ? F.arr.get(self.components, function (c) {
					return c.enabled;
				}) : self.components.slice(0);
				args.unshift(reverse ? components.reverse() : components);
				return self._execute.apply(self, args);
			},

			_execute: function _execute(components, methodName, param1, paramN) {
				if (!components || !components.length) return $.when();
				var self = this,
				    args = Array.prototype.slice.call(arguments),
				    component;
				components = args.shift();
				methodName = args.shift();
				component = components.shift();

				if (!F.is.fn(component[methodName])) return self._execute.apply(self, [components, methodName].concat(args));

				return $.Deferred(function (d) {
					try {
						var result = component[methodName].apply(component, args);
						if (F.is.promise(result)) {
							return result.then(d.resolve, d.reject);
						} else {
							d.resolve(result);
						}
					} catch (err) {
						d.reject(err);
					}
				}).then(function () {
					return self._execute.apply(self, [components, methodName].concat(args));
				});
			},

			_onWindowResize: function _onWindowResize(e) {
				var self = e.data.self;
				if (self._resizeTimeout != null) {
					clearTimeout(self._resizeTimeout);
				}
				self._resizeTimeout = setTimeout(function () {
					self._resizeTimeout = null;

					self.raise('resize.ft.table').then(function () {
						self.breakpoints.check();
					});
				}, 300);
			}
		});
	})(jQuery, FooTable);
	(function ($, F) {

		if (F.is.undef(window.moment)) {
			return;
		}

		F.DateColumn = F.Column.extend({
			construct: function construct(instance, definition) {
				this._super(instance, definition, 'date');

				this.formatString = F.is.string(definition.formatString) ? definition.formatString : 'MM-DD-YYYY';
			},

			parser: function parser(valueOrElement) {
				if (F.is.element(valueOrElement) || F.is.jq(valueOrElement)) {
					valueOrElement = $(valueOrElement).data('value') || $(valueOrElement).text();
					if (F.is.string(valueOrElement)) valueOrElement = isNaN(valueOrElement) ? valueOrElement : +valueOrElement;
				}
				if (F.is.date(valueOrElement)) return moment(valueOrElement);
				if (F.is.object(valueOrElement) && F.is.boolean(valueOrElement._isAMomentObject)) return valueOrElement;
				if (F.is.string(valueOrElement)) {
					if (isNaN(valueOrElement)) {
						return moment(valueOrElement, this.formatString);
					} else {
						valueOrElement = +valueOrElement;
					}
				}
				if (F.is.number(valueOrElement)) {
					return moment(valueOrElement);
				}
				return null;
			},

			formatter: function formatter(value) {
				return F.is.object(value) && F.is.boolean(value._isAMomentObject) ? value.format(this.formatString) : '';
			},

			filterValue: function filterValue(valueOrElement) {
				if (F.is.element(valueOrElement) || F.is.jq(valueOrElement)) valueOrElement = $(valueOrElement).data('filterValue') || $(valueOrElement).text();

				if (F.is.hash(valueOrElement) && F.is.hash(valueOrElement.options)) {
					if (F.is.string(valueOrElement.options.filterValue)) valueOrElement = valueOrElement.options.filterValue;
					if (F.is.defined(valueOrElement.value)) valueOrElement = valueOrElement.value;
				}

				if (F.is.object(valueOrElement) && F.is.boolean(valueOrElement._isAMomentObject)) return valueOrElement.format(this.formatString);

				if (F.is.string(valueOrElement)) {
					if (isNaN(valueOrElement)) {
						return valueOrElement;
					} else {
						valueOrElement = +valueOrElement;
					}
				}

				if (F.is.number(valueOrElement) || F.is.date(valueOrElement)) {
					return moment(valueOrElement).format(this.formatString);
				}

				if (F.is.defined(valueOrElement) && valueOrElement != null) return valueOrElement + '';
				return '';
			}
		});

		F.columns.register('date', F.DateColumn);
	})(jQuery, FooTable);
	(function ($, F) {

		F.HTMLColumn = F.Column.extend({
			construct: function construct(instance, definition) {
				this._super(instance, definition, 'html');
			},

			parser: function parser(valueOrElement) {
				if (F.is.string(valueOrElement)) valueOrElement = $($.trim(valueOrElement));
				if (F.is.element(valueOrElement)) valueOrElement = $(valueOrElement);
				if (F.is.jq(valueOrElement)) {
					var tagName = valueOrElement.prop('tagName').toLowerCase();
					if (tagName == 'td' || tagName == 'th') return valueOrElement.data('value') || valueOrElement.contents();
					return valueOrElement;
				}
				return null;
			}
		});

		F.columns.register('html', F.HTMLColumn);
	})(jQuery, FooTable);
	(function ($, F) {

		F.NumberColumn = F.Column.extend({
			construct: function construct(instance, definition) {
				this._super(instance, definition, 'number');
				this.decimalSeparator = F.is.string(definition.decimalSeparator) ? definition.decimalSeparator : '.';
				this.thousandSeparator = F.is.string(definition.thousandSeparator) ? definition.thousandSeparator : ',';
				this.decimalSeparatorRegex = new RegExp(F.str.escapeRegExp(this.decimalSeparator), 'g');
				this.thousandSeparatorRegex = new RegExp(F.str.escapeRegExp(this.thousandSeparator), 'g');
				this.cleanRegex = new RegExp('[^0-9' + F.str.escapeRegExp(this.decimalSeparator) + ']', 'g');
			},

			parser: function parser(valueOrElement) {
				if (F.is.element(valueOrElement) || F.is.jq(valueOrElement)) {
					valueOrElement = $(valueOrElement).data('value') || $(valueOrElement).text().replace(this.cleanRegex, '');
				}
				if (F.is.string(valueOrElement)) {
					valueOrElement = valueOrElement.replace(this.thousandSeparatorRegex, '').replace(this.decimalSeparatorRegex, '.');
					valueOrElement = parseFloat(valueOrElement);
				}
				if (F.is.number(valueOrElement)) return valueOrElement;
				return null;
			},

			formatter: function formatter(value) {
				if (value == null) return '';
				var s = (value + '').split('.');
				if (s.length == 2 && s[0].length > 3) {
					s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, this.thousandSeparator);
				}
				return s.join(this.decimalSeparator);
			}
		});

		F.columns.register('number', F.NumberColumn);
	})(jQuery, FooTable);
	(function ($, F) {

		F.Breakpoint = F.Class.extend({
			construct: function construct(name, width) {
				this.name = name;

				this.width = width;
			}
		});
	})(jQuery, FooTable);
	(function ($, F) {
		F.Breakpoints = F.Component.extend({
			construct: function construct(table) {
				this._super(table, true);

				this.o = table.o;

				this.current = null;

				this.array = [];

				this.cascade = this.o.cascade;

				this.useParentWidth = this.o.useParentWidth;

				this.hidden = null;

				this._classNames = '';

				this.getWidth = F.checkFnValue(this, this.o.getWidth, this.getWidth);
			},

			preinit: function preinit(data) {
				var self = this;

				return this.ft.raise('preinit.ft.breakpoints', [data]).then(function () {
					self.cascade = F.is.boolean(data.cascade) ? data.cascade : self.cascade;
					self.o.breakpoints = F.is.hash(data.breakpoints) ? data.breakpoints : self.o.breakpoints;
					self.getWidth = F.checkFnValue(self, data.getWidth, self.getWidth);
					if (self.o.breakpoints == null) self.o.breakpoints = { "xs": 480, "sm": 768, "md": 992, "lg": 1200 };

					for (var name in self.o.breakpoints) {
						if (!self.o.breakpoints.hasOwnProperty(name)) continue;
						self.array.push(new F.Breakpoint(name, self.o.breakpoints[name]));
						self._classNames += 'breakpoint-' + name + ' ';
					}

					self.array.sort(function (a, b) {
						return b.width - a.width;
					});
				});
			},

			init: function init() {
				var self = this;

				return this.ft.raise('init.ft.breakpoints').then(function () {
					self.current = self.get();
				});
			},

			draw: function draw() {
				this.ft.$el.removeClass(this._classNames).addClass('breakpoint-' + this.current.name);
			},

			calculate: function calculate() {
				var self = this,
				    current = null,
				    hidden = [],
				    breakpoint,
				    prev = null,
				    width = self.getWidth();
				for (var i = 0, len = self.array.length; i < len; i++) {
					breakpoint = self.array[i];

					if (!current && i == len - 1 || width >= breakpoint.width && (prev instanceof F.Breakpoint ? width < prev.width : true)) {
						current = breakpoint;
					}
					if (!current) hidden.push(breakpoint.name);
					prev = breakpoint;
				}
				hidden.push(current.name);
				self.hidden = hidden.join(' ');
				return current;
			},

			visible: function visible(breakpoints) {
				if (F.is.emptyString(breakpoints)) return true;
				if (breakpoints === 'all') return false;
				var parts = breakpoints.split(' '),
				    i = 0,
				    len = parts.length;
				for (; i < len; i++) {
					if (this.cascade ? F.str.containsWord(this.hidden, parts[i]) : parts[i] == this.current.name) return false;
				}
				return true;
			},

			check: function check() {
				var self = this,
				    bp = self.get();
				if (!(bp instanceof F.Breakpoint) || bp == self.current) return;

				self.ft.raise('before.ft.breakpoints', [self.current, bp]).then(function () {
					var previous = self.current;
					self.current = bp;
					return self.ft.draw().then(function () {
						self.ft.raise('after.ft.breakpoints', [self.current, previous]);
					});
				});
			},

			get: function get(breakpoint) {
				if (F.is.undef(breakpoint)) return this.calculate();
				if (breakpoint instanceof F.Breakpoint) return breakpoint;
				if (F.is.string(breakpoint)) return F.arr.first(this.array, function (bp) {
					return bp.name == breakpoint;
				});
				if (F.is.number(breakpoint)) return breakpoint >= 0 && breakpoint < this.array.length ? this.array[breakpoint] : null;
				return null;
			},

			getWidth: function getWidth() {
				if (F.is.fn(this.o.getWidth)) return this.o.getWidth(this.ft);
				if (this.useParentWidth == true) return this.getParentWidth();
				return this.getViewportWidth();
			},

			getParentWidth: function getParentWidth() {
				return this.ft.$el.parent().width();
			},

			getViewportWidth: function getViewportWidth() {
				return Math.max(document.documentElement.clientWidth, window.innerWidth, 0);
			}
		});

		F.components.register('breakpoints', F.Breakpoints, 1000);
	})(jQuery, FooTable);
	(function (F) {
		F.Column.prototype.breakpoints = null;

		F.Column.prototype.__breakpoints_define__ = function (definition) {
			this.breakpoints = F.is.emptyString(definition.breakpoints) ? null : definition.breakpoints;
		};

		F.Column.extend('define', function (definition) {
			this._super(definition);
			this.__breakpoints_define__(definition);
		});
	})(FooTable);
	(function (F) {
		F.Defaults.prototype.breakpoints = null;

		F.Defaults.prototype.cascade = false;

		F.Defaults.prototype.useParentWidth = false;

		F.Defaults.prototype.getWidth = null;
	})(FooTable);
	(function ($, F) {
		F.Columns = F.Component.extend({
			construct: function construct(table) {
				this._super(table, true);

				this.o = table.o;

				this.array = [];

				this.$header = null;

				this.showHeader = table.o.showHeader;

				this._fromHTML = F.is.emptyArray(table.o.columns);
			},

			parse: function parse(data) {
				var self = this;
				return $.Deferred(function (d) {
					function merge(cols1, cols2) {
						var merged = [];

						if (cols1.length == 0 || cols2.length == 0) {
							merged = cols1.concat(cols2);
						} else {
							var highest = 0;
							F.arr.each(cols1.concat(cols2), function (c) {
								if (c.index > highest) highest = c.index;
							});
							highest++;
							for (var i = 0, cols1_c, cols2_c; i < highest; i++) {
								cols1_c = {};
								F.arr.each(cols1, function (c) {
									if (c.index == i) {
										cols1_c = c;
										return false;
									}
								});
								cols2_c = {};
								F.arr.each(cols2, function (c) {
									if (c.index == i) {
										cols2_c = c;
										return false;
									}
								});
								merged.push($.extend(true, {}, cols1_c, cols2_c));
							}
						}
						return merged;
					}

					var json = [],
					    html = [];

					var $header = self.ft.$el.find('tr.footable-header, thead > tr:last:has([data-breakpoints]), tbody > tr:first:has([data-breakpoints]), thead > tr:last, tbody > tr:first').first(),
					    $cell,
					    cdata;
					if ($header.length > 0) {
						var virtual = $header.parent().is('tbody') && $header.children().length == $header.children('td').length;
						if (!virtual) self.$header = $header.addClass('footable-header');
						$header.children('td,th').each(function (i, cell) {
							$cell = $(cell);
							cdata = $cell.data();
							cdata.index = i;
							cdata.$el = $cell;
							cdata.virtual = virtual;
							html.push(cdata);
						});
						if (virtual) self.showHeader = false;
					}

					if (F.is.array(self.o.columns) && !F.is.emptyArray(self.o.columns)) {
						F.arr.each(self.o.columns, function (c, i) {
							c.index = i;
							json.push(c);
						});
						self.parseFinalize(d, merge(json, html));
					} else if (F.is.promise(self.o.columns)) {
						self.o.columns.then(function (cols) {
							F.arr.each(cols, function (c, i) {
								c.index = i;
								json.push(c);
							});
							self.parseFinalize(d, merge(json, html));
						}, function (xhr) {
							d.reject(Error('Columns ajax request error: ' + xhr.status + ' (' + xhr.statusText + ')'));
						});
					} else {
						self.parseFinalize(d, merge(json, html));
					}
				});
			},

			parseFinalize: function parseFinalize(deferred, cols) {
				var self = this,
				    columns = [],
				    column;
				F.arr.each(cols, function (def) {
					if (column = F.columns.contains(def.type) ? F.columns.make(def.type, self.ft, def) : new F.Column(self.ft, def)) columns.push(column);
				});
				if (F.is.emptyArray(columns)) {
					deferred.reject(Error("No columns supplied."));
				} else {
					columns.sort(function (a, b) {
						return a.index - b.index;
					});
					deferred.resolve(columns);
				}
			},

			preinit: function preinit(data) {
				var self = this;

				return self.ft.raise('preinit.ft.columns', [data]).then(function () {
					return self.parse(data).then(function (columns) {
						self.array = columns;
						self.showHeader = F.is.boolean(data.showHeader) ? data.showHeader : self.showHeader;
					});
				});
			},

			init: function init() {
				var self = this;

				return this.ft.raise('init.ft.columns', [self.array]).then(function () {
					self.$create();
				});
			},

			destroy: function destroy() {
				var self = this;
				this.ft.raise('destroy.ft.columns').then(function () {
					if (!self._fromHTML) self.$header.remove();
				});
			},

			predraw: function predraw() {
				var self = this,
				    first = true;
				self.visibleColspan = 0;
				self.firstVisibleIndex = 0;
				self.lastVisibleIndex = 0;
				self.hasHidden = false;
				F.arr.each(self.array, function (col) {
					col.hidden = !self.ft.breakpoints.visible(col.breakpoints);
					if (!col.hidden && col.visible) {
						if (first) {
							self.firstVisibleIndex = col.index;
							first = false;
						}
						self.lastVisibleIndex = col.index;
						self.visibleColspan++;
					}
					if (col.hidden) self.hasHidden = true;
				});
				self.ft.$el.toggleClass('breakpoint', self.hasHidden);
			},

			draw: function draw() {
				F.arr.each(this.array, function (col) {
					col.$el.css('display', col.hidden || !col.visible ? 'none' : 'table-cell');
				});
				if (!this.showHeader && F.is.jq(this.$header.parent())) {
					this.$header.detach();
				}
			},

			$create: function $create() {
				var self = this;
				self.$header = F.is.jq(self.$header) ? self.$header : $('<tr/>', { 'class': 'footable-header' });
				self.$header.children('th,td').detach();
				F.arr.each(self.array, function (col) {
					self.$header.append(col.$el);
				});
				if (self.showHeader && !F.is.jq(self.$header.parent())) {
					self.ft.$el.children('thead').append(self.$header);
				}
			},

			get: function get(column) {
				if (column instanceof F.Column) return column;
				if (F.is.string(column)) return F.arr.first(this.array, function (col) {
					return col.name == column;
				});
				if (F.is.number(column)) return F.arr.first(this.array, function (col) {
					return col.index == column;
				});
				if (F.is.fn(column)) return F.arr.get(this.array, column);
				return null;
			},

			ensure: function ensure(columns) {
				var self = this,
				    result = [];
				if (!F.is.array(columns)) return result;
				F.arr.each(columns, function (name) {
					result.push(self.get(name));
				});
				return result;
			}
		});

		F.components.register('columns', F.Columns, 900);
	})(jQuery, FooTable);
	(function (F) {
		F.Defaults.prototype.columns = [];

		F.Defaults.prototype.showHeader = true;
	})(FooTable);
	(function ($, F) {
		F.Rows = F.Component.extend({
			construct: function construct(table) {
				this._super(table, true);

				this.o = table.o;

				this.array = [];

				this.all = [];

				this.showToggle = table.o.showToggle;

				this.toggleSelector = table.o.toggleSelector;

				this.toggleColumn = table.o.toggleColumn;

				this.emptyString = table.o.empty;

				this.expandFirst = table.o.expandFirst;

				this.expandAll = table.o.expandAll;

				this.$empty = null;
				this._fromHTML = F.is.emptyArray(table.o.rows);
			},

			parse: function parse() {
				var self = this;
				return $.Deferred(function (d) {
					var $rows = self.ft.$el.children('tbody').children('tr');
					if (F.is.jq($rows)) {
						self.parseFinalize(d, $rows);
						$rows.detach();
					} else if (F.is.array(self.o.rows) && self.o.rows.length > 0) {
						self.parseFinalize(d, self.o.rows);
					} else if (F.is.promise(self.o.rows)) {
						self.o.rows.then(function (rows) {
							self.parseFinalize(d, rows);
						}, function (xhr) {
							d.reject(Error('Rows ajax request error: ' + xhr.status + ' (' + xhr.statusText + ')'));
						});
					} else {
						self.parseFinalize(d, []);
					}
				});
			},

			parseFinalize: function parseFinalize(deferred, rows) {
				var self = this,
				    result = $.map(rows, function (r) {
					return new F.Row(self.ft, self.ft.columns.array, r);
				});
				deferred.resolve(result);
			},

			preinit: function preinit(data) {
				var self = this;

				return self.ft.raise('preinit.ft.rows', [data]).then(function () {
					return self.parse().then(function (rows) {
						self.all = rows;
						self.array = self.all.slice(0);
						self.showToggle = F.is.boolean(data.showToggle) ? data.showToggle : self.showToggle;
						self.toggleSelector = F.is.string(data.toggleSelector) ? data.toggleSelector : self.toggleSelector;
						self.toggleColumn = F.is.string(data.toggleColumn) ? data.toggleColumn : self.toggleColumn;
						if (self.toggleColumn != "first" && self.toggleColumn != "last") self.toggleColumn = "first";
						self.emptyString = F.is.string(data.empty) ? data.empty : self.emptyString;
						self.expandFirst = F.is.boolean(data.expandFirst) ? data.expandFirst : self.expandFirst;
						self.expandAll = F.is.boolean(data.expandAll) ? data.expandAll : self.expandAll;
					});
				});
			},

			init: function init() {
				var self = this;

				return self.ft.raise('init.ft.rows', [self.all]).then(function () {
					self.$create();
				});
			},

			destroy: function destroy() {
				var self = this;
				this.ft.raise('destroy.ft.rows').then(function () {
					F.arr.each(self.array, function (row) {
						row.predraw(!self._fromHTML);
					});
				});
			},

			predraw: function predraw() {
				F.arr.each(this.array, function (row) {
					row.predraw();
				});
				this.array = this.all.slice(0);
			},
			$create: function $create() {
				this.$empty = $('<tr/>', { 'class': 'footable-empty' }).append($('<td/>').text(this.emptyString));
			},

			draw: function draw() {
				var self = this,
				    $tbody = self.ft.$el.children('tbody'),
				    first = true;

				if (self.array.length > 0) {
					self.$empty.detach();

					F.arr.each(self.array, function (row) {
						if (self.expandFirst && first || self.expandAll) {
							row.expanded = true;
							first = false;
						}
						row.draw($tbody);
					});
				} else {
					self.$empty.children('td').attr('colspan', self.ft.columns.visibleColspan);
					$tbody.append(self.$empty);
				}
			},

			load: function load(data, append) {
				var self = this,
				    rows = $.map(data, function (r) {
					return new F.Row(self.ft, self.ft.columns.array, r);
				});
				F.arr.each(this.array, function (row) {
					row.predraw();
				});
				this.all = (F.is.boolean(append) ? append : false) ? this.all.concat(rows) : rows;
				this.array = this.all.slice(0);
				this.ft.draw();
			},

			expand: function expand() {
				F.arr.each(this.array, function (row) {
					row.expand();
				});
			},

			collapse: function collapse() {
				F.arr.each(this.array, function (row) {
					row.collapse();
				});
			}
		});

		F.components.register('rows', F.Rows, 800);
	})(jQuery, FooTable);
	(function (F) {
		F.Defaults.prototype.rows = [];

		F.Defaults.prototype.empty = 'No results';

		F.Defaults.prototype.showToggle = true;

		F.Defaults.prototype.toggleSelector = 'tr,td,.footable-toggle';

		F.Defaults.prototype.toggleColumn = 'first';

		F.Defaults.prototype.expandFirst = false;

		F.Defaults.prototype.expandAll = false;
	})(FooTable);
	(function (F) {
		F.Table.prototype.loadRows = function (data, append) {
			this.rows.load(data, append);
		};
	})(FooTable);
	(function (F) {
		F.Filter = F.Class.extend({
			construct: function construct(name, query, columns, space, connectors, ignoreCase, hidden) {
				this.name = name;

				this.space = F.is.string(space) && (space == 'OR' || space == 'AND') ? space : 'AND';

				this.connectors = F.is.boolean(connectors) ? connectors : true;

				this.ignoreCase = F.is.boolean(ignoreCase) ? ignoreCase : true;

				this.hidden = F.is.boolean(hidden) ? hidden : false;

				this.query = new F.Query(query, this.space, this.connectors, this.ignoreCase);

				this.columns = columns;
			},

			match: function match(str) {
				if (!F.is.string(str)) return false;
				if (F.is.string(this.query)) {
					this.query = new F.Query(this.query, this.space, this.connectors, this.ignoreCase);
				}
				return this.query instanceof F.Query ? this.query.match(str) : false;
			},

			matchRow: function matchRow(row) {
				var self = this,
				    text = F.arr.map(row.cells, function (cell) {
					return F.arr.contains(self.columns, cell.column) ? cell.filterValue : null;
				}).join(' ');
				return self.match(text);
			}
		});
	})(FooTable);
	(function ($, F) {
		F.Filtering = F.Component.extend({
			construct: function construct(table) {
				this._super(table, table.o.filtering.enabled);

				this.filters = table.o.filtering.filters;

				this.delay = table.o.filtering.delay;

				this.min = table.o.filtering.min;

				this.space = table.o.filtering.space;

				this.connectors = table.o.filtering.connectors;

				this.ignoreCase = table.o.filtering.ignoreCase;

				this.placeholder = table.o.filtering.placeholder;

				this.position = table.o.filtering.position;

				this.$row = null;

				this.$cell = null;

				this.$dropdown = null;

				this.$input = null;

				this.$button = null;

				this._filterTimeout = null;
			},

			preinit: function preinit(data) {
				var self = this;

				this.ft.raise('preinit.ft.filtering').then(function () {
					if (self.ft.$el.hasClass('footable-filtering')) self.enabled = true;

					self.enabled = F.is.boolean(data.filtering) ? data.filtering : self.enabled;

					if (!self.enabled) return;

					self.space = F.is.string(data.filterSpace) ? data.filterSpace : self.space;

					self.min = F.is.number(data.filterMin) ? data.filterMin : self.min;

					self.connectors = F.is.boolean(data.filterConnectors) ? data.filterConnectors : self.connectors;

					self.ignoreCase = F.is.boolean(data.filterIgnoreCase) ? data.filterIgnoreCase : self.ignoreCase;

					self.delay = F.is.number(data.filterDelay) ? data.filterDelay : self.delay;

					self.placeholder = F.is.string(data.filterPlaceholder) ? data.filterPlaceholder : self.placeholder;

					self.filters = F.is.array(data.filterFilters) ? self.ensure(data.filterFilters) : self.ensure(self.filters);

					if (self.ft.$el.hasClass('footable-filtering-left')) self.position = 'left';
					if (self.ft.$el.hasClass('footable-filtering-center')) self.position = 'center';
					if (self.ft.$el.hasClass('footable-filtering-right')) self.position = 'right';

					self.position = F.is.string(data.filterPosition) ? data.filterPosition : self.position;
				}, function () {
					self.enabled = false;
				});
			},

			init: function init() {
				var self = this;

				this.ft.raise('init.ft.filtering').then(function () {
					self.$create();
				}, function () {
					self.enabled = false;
				});
			},

			destroy: function destroy() {
				var self = this;
				this.ft.raise('destroy.ft.filtering').then(function () {
					self.ft.$el.removeClass('footable-filtering').find('thead > tr.footable-filtering').remove();
				});
			},

			$create: function $create() {
				var self = this;

				var $form_grp = $('<div/>', { 'class': 'form-group' }).append($('<label/>', { 'class': 'sr-only', text: 'Search' })),
				    $input_grp = $('<div/>', { 'class': 'input-group' }).appendTo($form_grp),
				    $input_grp_btn = $('<div/>', { 'class': 'input-group-btn' }),
				    $dropdown_toggle = $('<button/>', { type: 'button', 'class': 'btn btn-default dropdown-toggle' }).on('click', { self: self }, self._onDropdownToggleClicked).append($('<span/>', { 'class': 'caret' })),
				    position;

				switch (self.position) {
					case 'left':
						position = 'footable-filtering-left';break;
					case 'center':
						position = 'footable-filtering-center';break;
					default:
						position = 'footable-filtering-right';break;
				}
				self.ft.$el.addClass('footable-filtering').addClass(position);

				self.$row = $('<tr/>', { 'class': 'footable-filtering' }).prependTo(self.ft.$el.children('thead'));
				self.$cell = $('<th/>').attr('colspan', self.ft.columns.visibleColspan).appendTo(self.$row);
				self.$form = $('<form/>', { 'class': 'form-inline' }).append($form_grp).appendTo(self.$cell);

				self.$input = $('<input/>', { type: 'text', 'class': 'form-control', placeholder: self.placeholder });

				self.$button = $('<button/>', { type: 'button', 'class': 'btn btn-primary' }).on('click', { self: self }, self._onSearchButtonClicked).append($('<span/>', { 'class': 'fooicon fooicon-search' }));

				self.$dropdown = $('<ul/>', { 'class': 'dropdown-menu dropdown-menu-right' }).append(F.arr.map(self.ft.columns.array, function (col) {
					return col.filterable ? $('<li/>').append($('<a/>', { 'class': 'checkbox' }).append($('<label/>', { text: col.title }).prepend($('<input/>', { type: 'checkbox', checked: true }).data('__FooTableColumn__', col)))) : null;
				}));

				if (self.delay > 0) {
					self.$input.on('keypress keyup', { self: self }, self._onSearchInputChanged);
					self.$dropdown.on('click', 'input[type="checkbox"]', { self: self }, self._onSearchColumnClicked);
				}

				$input_grp_btn.append(self.$button, $dropdown_toggle, self.$dropdown);
				$input_grp.append(self.$input, $input_grp_btn);
			},

			predraw: function predraw() {
				if (F.is.emptyArray(this.filters)) return;

				var self = this;
				self.ft.rows.array = $.grep(self.ft.rows.array, function (r) {
					return r.filtered(self.filters);
				});
			},

			draw: function draw() {
				this.$cell.attr('colspan', this.ft.columns.visibleColspan);
				var search = this.find('search');
				if (search instanceof F.Filter) {
					this.$input.val(search.query.val());
				} else {
					this.$input.val(null);
				}
				this.setButton(!F.arr.any(this.filters, function (f) {
					return !f.hidden;
				}));
			},

			addFilter: function addFilter(name, query, columns, ignoreCase, connectors, space, hidden) {
				var f = F.arr.first(this.filters, function (f) {
					return f.name == name;
				});
				if (f instanceof F.Filter) {
					f.name = name;
					f.query = query;
					f.columns = columns;
					f.ignoreCase = F.is.boolean(ignoreCase) ? ignoreCase : f.ignoreCase;
					f.connectors = F.is.boolean(connectors) ? connectors : f.connectors;
					f.hidden = F.is.boolean(hidden) ? hidden : f.hidden;
					f.space = F.is.string(space) && (space === 'AND' || space === 'OR') ? space : f.space;
				} else {
					ignoreCase = F.is.boolean(ignoreCase) ? ignoreCase : self.ignoreCase;
					connectors = F.is.boolean(connectors) ? connectors : self.connectors;
					space = F.is.string(space) && (space === 'AND' || space === 'OR') ? space : self.space;
					this.filters.push(new F.Filter(name, query, columns, space, connectors, ignoreCase, hidden));
				}
			},

			removeFilter: function removeFilter(name) {
				F.arr.remove(this.filters, function (f) {
					return f.name == name;
				});
			},

			filter: function filter() {
				var self = this;
				self.filters = self.ensure(self.filters);

				return self.ft.raise('before.ft.filtering', [self.filters]).then(function () {
					self.filters = self.ensure(self.filters);
					return self.ft.draw().then(function () {
						self.ft.raise('after.ft.filtering', [self.filters]);
					});
				});
			},

			clear: function clear() {
				this.filters = F.arr.get(this.filters, function (f) {
					return f.hidden;
				});
				return this.filter();
			},

			setButton: function setButton(search) {
				if (!search) {
					this.$button.children('.fooicon').removeClass('fooicon-search').addClass('fooicon-remove');
				} else {
					this.$button.children('.fooicon').removeClass('fooicon-remove').addClass('fooicon-search');
				}
			},

			find: function find(name) {
				return F.arr.first(this.filters, function (f) {
					return f.name == name;
				});
			},

			columns: function columns() {
				if (F.is.jq(this.$dropdown)) {
					return this.$dropdown.find('input:checked').map(function () {
						return $(this).data('__FooTableColumn__');
					}).get();
				} else {
					return this.ft.columns.get(function (c) {
						return c.filterable;
					});
				}
			},

			ensure: function ensure(filters) {
				var self = this,
				    parsed = [],
				    filterable = self.columns();
				if (!F.is.emptyArray(filters)) {
					F.arr.each(filters, function (f) {
						if (F.is.object(f) && (!F.is.emptyString(f.query) || f.query instanceof F.Query)) {
							f.name = F.is.emptyString(f.name) ? 'anon' : f.name;
							f.columns = F.is.emptyArray(f.columns) ? filterable : self.ft.columns.ensure(f.columns);
							f.ignoreCase = F.is.boolean(f.ignoreCase) ? f.ignoreCase : self.ignoreCase;
							f.connectors = F.is.boolean(f.connectors) ? f.connectors : self.connectors;
							f.hidden = F.is.boolean(f.hidden) ? f.hidden : false;
							f.space = F.is.string(f.space) && (f.space === 'AND' || f.space === 'OR') ? f.space : self.space;
							parsed.push(f instanceof F.Filter ? f : new F.Filter(f.name, f.query, f.columns, f.space, f.connectors, f.ignoreCase, f.hidden));
						}
					});
				}
				return parsed;
			},

			_onSearchInputChanged: function _onSearchInputChanged(e) {
				var self = e.data.self;
				var alpha = e.type == 'keypress' && !F.is.emptyString(String.fromCharCode(e.charCode)),
				    ctrl = e.type == 'keyup' && (e.which == 8 || e.which == 46);
				if (alpha || ctrl) {
					if (e.which == 13) e.preventDefault();
					if (self._filterTimeout != null) clearTimeout(self._filterTimeout);
					self._filterTimeout = setTimeout(function () {
						self._filterTimeout = null;
						self.addFilter('search', self.$input.val());
						self.filter();
					}, self.delay);
				}
			},

			_onSearchButtonClicked: function _onSearchButtonClicked(e) {
				e.preventDefault();
				var self = e.data.self;
				if (self._filterTimeout != null) clearTimeout(self._filterTimeout);
				var $icon = self.$button.children('.fooicon');
				if ($icon.hasClass('fooicon-remove')) self.clear();else {
					self.addFilter('search', self.$input.val());
					self.filter();
				}
			},

			_onSearchColumnClicked: function _onSearchColumnClicked(e) {
				var self = e.data.self;
				if (self._filterTimeout != null) clearTimeout(self._filterTimeout);
				self._filterTimeout = setTimeout(function () {
					self._filterTimeout = null;
					var $icon = self.$button.children('.fooicon');
					if ($icon.hasClass('fooicon-remove')) {
						$icon.removeClass('fooicon-remove').addClass('fooicon-search');
						self.addFilter('search', self.$input.val());
						self.filter();
					}
				}, self.delay);
			},

			_onDropdownToggleClicked: function _onDropdownToggleClicked(e) {
				e.preventDefault();
				e.stopPropagation();
				var self = e.data.self;
				self.$dropdown.parent().toggleClass('open');
				if (self.$dropdown.parent().hasClass('open')) $(document).on('click.footable', { self: self }, self._onDocumentClicked);else $(document).off('click.footable', self._onDocumentClicked);
			},

			_onDocumentClicked: function _onDocumentClicked(e) {
				if ($(e.target).closest('.dropdown-menu').length == 0) {
					e.preventDefault();
					var self = e.data.self;
					self.$dropdown.parent().removeClass('open');
					$(document).off('click.footable', self._onDocumentClicked);
				}
			}
		});

		F.components.register('filtering', F.Filtering, 500);
	})(jQuery, FooTable);
	(function (F) {
		F.Query = F.Class.extend({
			construct: function construct(query, space, connectors, ignoreCase) {
				this._original = null;

				this._value = null;

				this.space = F.is.string(space) && (space == 'OR' || space == 'AND') ? space : 'AND';

				this.connectors = F.is.boolean(connectors) ? connectors : true;

				this.ignoreCase = F.is.boolean(ignoreCase) ? ignoreCase : true;

				this.left = null;

				this.right = null;

				this.parts = [];

				this.operator = null;
				this.val(query);
			},

			val: function val(value) {
				if (F.is.emptyString(value)) return this._value;

				if (F.is.emptyString(this._original)) this._original = value;else if (this._original == value) return;

				this._value = value;
				this._parse();
			},

			match: function match(str) {
				if (F.is.emptyString(this.operator) || this.operator === 'OR') return this._left(str, false) || this._match(str, false) || this._right(str, false);
				if (this.operator === 'AND') return this._left(str, true) && this._match(str, true) && this._right(str, true);
			},

			_match: function _match(str, def) {
				var self = this,
				    result = false,
				    empty = F.is.emptyString(str);
				if (F.is.emptyArray(self.parts) && self.left instanceof F.Query) return def;
				if (F.is.emptyArray(self.parts)) return result;
				if (self.space === 'OR') {
					F.arr.each(self.parts, function (p) {
						if (p.empty && empty) {
							result = true;
							if (p.negate) {
								result = false;
								return result;
							}
						} else {
							var match = F.str.contains(str, p.query, self.ignoreCase);
							if (match && !p.negate) result = true;
							if (match && p.negate) {
								result = false;
								return result;
							}
						}
					});
				} else {
					result = true;
					F.arr.each(self.parts, function (p) {
						if (p.empty) {
							if (!empty && !p.negate || empty && p.negate) result = false;
							return result;
						} else {
							var match = F.str.contains(str, p.query, self.ignoreCase);
							if (!match && !p.negate || match && p.negate) result = false;
							return result;
						}
					});
				}
				return result;
			},

			_left: function _left(str, def) {
				return this.left instanceof F.Query ? this.left.match(str) : def;
			},

			_right: function _right(str, def) {
				return this.right instanceof F.Query ? this.right.match(str) : def;
			},

			_parse: function _parse() {
				if (F.is.emptyString(this._value)) return;

				if (/\sOR\s/.test(this._value)) {
					this.operator = 'OR';
					var or = this._value.split(/(?:\sOR\s)(.*)?/);
					this.left = new F.Query(or[0], this.space, this.connectors, this.ignoreCase);
					this.right = new F.Query(or[1], this.space, this.connectors, this.ignoreCase);
				} else if (/\sAND\s/.test(this._value)) {
					this.operator = 'AND';
					var and = this._value.split(/(?:\sAND\s)(.*)?/);
					this.left = new F.Query(and[0], this.space, this.connectors, this.ignoreCase);
					this.right = new F.Query(and[1], this.space, this.connectors, this.ignoreCase);
				} else {
					var self = this;
					this.parts = F.arr.map(this._value.match(/(?:[^\s"]+|"[^"]*")+/g), function (str) {
						return self._part(str);
					});
				}
			},

			_part: function _part(str) {
				var p = {
					query: str,
					negate: false,
					phrase: false,
					exact: false,
					empty: false
				};

				if (F.str.startsWith(p.query, '-')) {
					p.query = F.str.from(p.query, '-');
					p.negate = true;
				}

				if (/^"(.*?)"$/.test(p.query)) {
					p.query = p.query.replace(/^"(.*?)"$/, '$1');
					p.phrase = true;
					p.exact = true;
				} else if (this.connectors && /(?:\w)+?([-_\+\.])(?:\w)+?/.test(p.query)) {
					p.query = p.query.replace(/(?:\w)+?([-_\+\.])(?:\w)+?/g, function (match, p1) {
						return match.replace(p1, ' ');
					});
					p.phrase = true;
				}
				p.empty = p.phrase && F.is.emptyString(p.query);
				return p;
			}
		});
	})(FooTable);
	(function (F) {
		F.Cell.prototype.filterValue = null;

		F.Cell.prototype.__filtering_define__ = function (valueOrElement) {
			this.filterValue = this.column.filterValue.call(this.column, valueOrElement);
		};

		F.Cell.prototype.__filtering_val__ = function (value) {
			if (F.is.defined(value)) {
				this.filterValue = this.column.filterValue.call(this.column, value);
			}
		};

		F.Cell.extend('define', function (valueOrElement) {
			this._super(valueOrElement);
			this.__filtering_define__(valueOrElement);
		});

		F.Cell.extend('val', function (value) {
			var val = this._super(value);
			this.__filtering_val__(value);
			return val;
		});
	})(FooTable);
	(function ($, F) {
		F.Column.prototype.filterable = true;

		F.Column.prototype.filterValue = function (valueOrElement) {
			if (F.is.element(valueOrElement) || F.is.jq(valueOrElement)) return $(valueOrElement).data('filterValue') || $(valueOrElement).text();

			if (F.is.hash(valueOrElement) && F.is.hash(valueOrElement.options)) {
				if (F.is.string(valueOrElement.options.filterValue)) return valueOrElement.options.filterValue;
				if (F.is.defined(valueOrElement.value)) valueOrElement = valueOrElement.value;
			}
			if (F.is.defined(valueOrElement) && valueOrElement != null) return valueOrElement + '';
			return '';
		};

		F.Column.prototype.__filtering_define__ = function (definition) {
			this.filterable = F.is.boolean(definition.filterable) ? definition.filterable : this.filterable;
		};

		F.Column.extend('define', function (definition) {
			this._super(definition);
			this.__filtering_define__(definition);
		});
	})(jQuery, FooTable);
	(function (F) {
		F.Defaults.prototype.filtering = {
			enabled: false,
			filters: [],
			delay: 1200,
			min: 3,
			space: 'AND',
			placeholder: 'Search',
			position: 'right',
			connectors: true,
			ignoreCase: true
		};
	})(FooTable);
	(function (F) {
		F.Row.prototype.filtered = function (filters) {
			var result = true,
			    self = this;
			F.arr.each(filters, function (f) {
				if ((result = f.matchRow(self)) == false) return false;
			});
			return result;
		};
	})(FooTable);
	(function ($, F) {

		F.Sorter = F.Class.extend({
			construct: function construct(column, direction) {
				this.column = column;

				this.direction = direction;
			}
		});
	})(jQuery, FooTable);
	(function ($, F) {
		F.Sorting = F.Component.extend({
			construct: function construct(table) {
				this._super(table, table.o.sorting.enabled);

				this.o = table.o.sorting;

				this.column = null;

				this.allowed = true;

				this.initial = null;
			},

			preinit: function preinit(data) {
				var self = this;

				this.ft.raise('preinit.ft.sorting', [data]).then(function () {
					if (self.ft.$el.hasClass('footable-sorting')) self.enabled = true;
					self.enabled = F.is.boolean(data.sorting) ? data.sorting : self.enabled;
					if (!self.enabled) return;
					self.column = F.arr.first(self.ft.columns.array, function (col) {
						return col.sorted;
					});
				}, function () {
					self.enabled = false;
				});
			},

			init: function init() {
				var self = this;
				this.ft.raise('init.ft.sorting').then(function () {
					if (!self.initial) {
						var isset = !!self.column;
						self.initial = {
							isset: isset,

							rows: self.ft.rows.all.slice(0),

							column: isset ? self.column.name : null,
							direction: isset ? self.column.direction : null
						};
					}
					F.arr.each(self.ft.columns.array, function (col) {
						if (col.sortable) {
							col.$el.addClass('footable-sortable').append($('<span/>', { 'class': 'fooicon fooicon-sort' }));
						}
					});
					self.ft.$el.on('click.footable', '.footable-sortable', { self: self }, self._onSortClicked);
				}, function () {
					self.enabled = false;
				});
			},

			destroy: function destroy() {
				var self = this;
				this.ft.raise('destroy.ft.paging').then(function () {
					self.ft.$el.off('click.footable', '.footable-sortable', self._onSortClicked);
					self.ft.$el.children('thead').children('tr.footable-header').children('.footable-sortable').removeClass('footable-sortable footable-asc footable-desc').find('span.fooicon').remove();
				});
			},

			predraw: function predraw() {
				if (!this.column) return;
				var self = this,
				    col = self.column;
				self.ft.rows.array.sort(function (a, b) {
					return col.direction == 'DESC' ? col.sorter(b.cells[col.index].sortValue, a.cells[col.index].sortValue) : col.sorter(a.cells[col.index].sortValue, b.cells[col.index].sortValue);
				});
			},

			draw: function draw() {
				if (!this.column) return;
				var self = this,
				    $sortable = self.ft.$el.find('thead > tr > .footable-sortable'),
				    $active = self.column.$el;

				$sortable.removeClass('footable-asc footable-desc').children('.fooicon').removeClass('fooicon-sort fooicon-sort-asc fooicon-sort-desc');
				$sortable.not($active).children('.fooicon').addClass('fooicon-sort');
				$active.addClass(self.column.direction == 'DESC' ? 'footable-desc' : 'footable-asc').children('.fooicon').addClass(self.column.direction == 'DESC' ? 'fooicon-sort-desc' : 'fooicon-sort-asc');
			},

			sort: function sort(column, direction) {
				return this._sort(column, direction);
			},

			toggleAllowed: function toggleAllowed(state) {
				state = F.is.boolean(state) ? state : !this.allowed;
				this.allowed = state;
				this.ft.$el.toggleClass('footable-sorting-disabled', !this.allowed);
			},

			hasChanged: function hasChanged() {
				return !(!this.initial || !this.column || this.column.name === this.initial.column && (this.column.direction === this.initial.direction || this.initial.direction === null && this.column.direction === 'ASC'));
			},

			reset: function reset() {
				if (!!this.initial) {
					if (this.initial.isset) {
						this.sort(this.initial.column, this.initial.direction);
					} else {
						if (!!this.column) {
							this.column.$el.removeClass('footable-asc footable-desc');
							this.column = null;
						}

						this.ft.rows.all = this.initial.rows;

						this.ft.draw();
					}
				}
			},

			_sort: function _sort(column, direction) {
				if (!this.allowed) return $.Deferred().reject('sorting disabled');
				var self = this;
				var sorter = new F.Sorter(self.ft.columns.get(column), F.Sorting.dir(direction));

				return self.ft.raise('before.ft.sorting', [sorter]).then(function () {
					F.arr.each(self.ft.columns.array, function (col) {
						if (col != self.column) col.direction = null;
					});
					self.column = self.ft.columns.get(sorter.column);
					if (self.column) self.column.direction = F.Sorting.dir(sorter.direction);
					return self.ft.draw().then(function () {
						self.ft.raise('after.ft.sorting', [sorter]);
					});
				});
			},

			_onSortClicked: function _onSortClicked(e) {
				var self = e.data.self,
				    $header = $(this).closest('th,td'),
				    direction = $header.is('.footable-asc, .footable-desc') ? $header.hasClass('footable-desc') ? 'ASC' : 'DESC' : 'ASC';
				self._sort($header.index(), direction);
			}
		});

		F.Sorting.dir = function (str) {
			return F.is.string(str) && (str == 'ASC' || str == 'DESC') ? str : 'ASC';
		};

		F.components.register('sorting', F.Sorting, 600);
	})(jQuery, FooTable);
	(function (F) {
		F.Cell.prototype.sortValue = null;

		F.Cell.prototype.__sorting_define__ = function (valueOrElement) {
			this.sortValue = this.column.sortValue.call(this.column, valueOrElement);
		};

		F.Cell.prototype.__sorting_val__ = function (value) {
			if (F.is.defined(value)) {
				this.sortValue = this.column.sortValue.call(this.column, value);
			}
		};

		F.Cell.extend('define', function (valueOrElement) {
			this._super(valueOrElement);
			this.__sorting_define__(valueOrElement);
		});

		F.Cell.extend('val', function (value) {
			var val = this._super(value);
			this.__sorting_val__(value);
			return val;
		});
	})(FooTable);
	(function ($, F) {
		F.Column.prototype.direction = null;

		F.Column.prototype.sortable = true;

		F.Column.prototype.sorted = false;

		F.Column.prototype.sorter = function (a, b) {
			if (typeof a === 'string') a = a.toLowerCase();
			if (typeof b === 'string') b = b.toLowerCase();
			if (a === b) return 0;
			if (a < b) return -1;
			return 1;
		};

		F.Column.prototype.sortValue = function (valueOrElement) {
			if (F.is.element(valueOrElement) || F.is.jq(valueOrElement)) return $(valueOrElement).data('sortValue') || this.parser(valueOrElement);

			if (F.is.hash(valueOrElement) && F.is.hash(valueOrElement.options)) {
				if (F.is.string(valueOrElement.options.sortValue)) return valueOrElement.options.sortValue;
				if (F.is.defined(valueOrElement.value)) valueOrElement = valueOrElement.value;
			}
			if (F.is.defined(valueOrElement) && valueOrElement != null) return valueOrElement;
			return null;
		};

		F.Column.prototype.__sorting_define__ = function (definition) {
			this.sorter = F.checkFnValue(this, definition.sorter, this.sorter);
			this.direction = F.is.type(definition.direction, 'string') ? F.Sorting.dir(definition.direction) : null;
			this.sortable = F.is.boolean(definition.sortable) ? definition.sortable : true;
			this.sorted = F.is.boolean(definition.sorted) ? definition.sorted : false;
		};

		F.Column.extend('define', function (definition) {
			this._super(definition);
			this.__sorting_define__(definition);
		});
	})(jQuery, FooTable);
	(function (F) {
		F.Defaults.prototype.sorting = {
			enabled: false
		};
	})(FooTable);
	(function ($, F) {

		F.HTMLColumn.extend('__sorting_define__', function (definition) {
			this._super(definition);
			this.sortUse = F.is.string(definition.sortUse) && $.inArray(definition.sortUse, ['html', 'text']) !== -1 ? definition.sortUse : 'html';
		});

		F.HTMLColumn.prototype.sortValue = function (valueOrElement) {
			if (F.is.element(valueOrElement) || F.is.jq(valueOrElement)) {
				return $(valueOrElement).data('sortValue') || $.trim($(valueOrElement)[this.sortUse]());
			}

			if (F.is.hash(valueOrElement) && F.is.hash(valueOrElement.options)) {
				if (F.is.string(valueOrElement.options.sortValue)) return valueOrElement.options.sortValue;
				if (F.is.defined(valueOrElement.value)) valueOrElement = valueOrElement.value;
			}
			if (F.is.defined(valueOrElement) && valueOrElement != null) return valueOrElement;
			return null;
		};
	})(jQuery, FooTable);
	(function (F) {
		F.Table.prototype.sort = function (column, direction) {
			return this.use(F.Sorting).sort(column, direction);
		};
	})(FooTable);
	(function ($, F) {

		F.Pager = F.Class.extend({
			construct: function construct(total, current, size, page, forward) {
				this.total = total;

				this.current = current;

				this.size = size;

				this.page = page;

				this.forward = forward;
			}
		});
	})(jQuery, FooTable);
	(function ($, F) {
		F.Paging = F.Component.extend({
			construct: function construct(table) {
				this._super(table, table.o.paging.enabled);

				this.strings = table.o.paging.strings;

				this.current = table.o.paging.current;

				this.size = table.o.paging.size;

				this.limit = table.o.paging.limit;

				this.position = table.o.paging.position;

				this.countFormat = table.o.paging.countFormat;

				this.total = -1;

				this.$row = null;

				this.$cell = null;

				this.$pagination = null;

				this.$count = null;

				this.detached = false;

				this._previous = 1;

				this._total = 0;
			},

			preinit: function preinit(data) {
				var self = this;

				this.ft.raise('preinit.ft.paging', [data]).then(function () {
					if (self.ft.$el.hasClass('footable-paging')) self.enabled = true;
					self.enabled = F.is.boolean(data.paging) ? data.paging : self.enabled;

					if (!self.enabled) return;

					self.size = F.is.number(data.pagingSize) ? data.pagingSize : self.size;

					self.current = F.is.number(data.pagingCurrent) ? data.pagingCurrent : self.current;

					self.limit = F.is.number(data.pagingLimit) ? data.pagingLimit : self.limit;

					if (self.ft.$el.hasClass('footable-paging-left')) self.position = 'left';
					if (self.ft.$el.hasClass('footable-paging-center')) self.position = 'center';
					if (self.ft.$el.hasClass('footable-paging-right')) self.position = 'right';

					self.position = F.is.string(data.pagingPosition) ? data.pagingPosition : self.position;

					self.countFormat = F.is.string(data.pagingCountFormat) ? data.pagingCountFormat : self.countFormat;

					self.total = Math.ceil(self.ft.rows.all.length / self.size);
				}, function () {
					self.enabled = false;
				});
			},

			init: function init() {
				var self = this;
				this.ft.raise('init.ft.paging').then(function () {
					self.$create();
				}, function () {
					self.enabled = false;
				});
			},

			destroy: function destroy() {
				var self = this;
				this.ft.raise('destroy.ft.paging').then(function () {
					self.ft.$el.removeClass('footable-paging').find('tfoot > tr.footable-paging').remove();
					self.detached = false;
				});
			},

			predraw: function predraw() {
				this.total = Math.ceil(this.ft.rows.array.length / this.size);
				this.current = this.current > this.total ? this.total : this.current < 1 ? 1 : this.current;
				if (this.ft.rows.array.length > this.size) {
					this.ft.rows.array = this.ft.rows.array.splice((this.current - 1) * this.size, this.size);
				}
			},

			draw: function draw() {
				if (this.total <= 1) {
					if (!this.detached) {
						this.$row.detach();
						this.detached = true;
					}
				} else {
					if (this.detached) {
						var $tfoot = this.ft.$el.children('tfoot');
						if ($tfoot.length == 0) {
							$tfoot = $('<tfoot/>');
							this.ft.$el.append($tfoot);
						}
						this.$row.appendTo($tfoot);
						this.detached = false;
					}
					this.$cell.attr('colspan', this.ft.columns.visibleColspan);
					this._createLinks();
					this._setVisible(this.current, this.current > this._previous);
					this._setNavigation(true);
				}
			},

			$create: function $create() {
				var position = 'footable-paging-center';
				switch (this.position) {
					case 'left':
						position = 'footable-paging-left';break;
					case 'right':
						position = 'footable-paging-right';break;
				}
				this.ft.$el.addClass('footable-paging').addClass(position);
				this.$cell = $('<td/>').attr('colspan', this.ft.columns.visibleColspan);
				var $tfoot = this.ft.$el.children('tfoot');
				if ($tfoot.length == 0) {
					$tfoot = $('<tfoot/>');
					this.ft.$el.append($tfoot);
				}
				this.$row = $('<tr/>', { 'class': 'footable-paging' }).append(this.$cell).appendTo($tfoot);
				this.$pagination = $('<ul/>', { 'class': 'pagination' }).on('click.footable', 'a.footable-page-link', { self: this }, this._onPageClicked);
				this.$count = $('<span/>', { 'class': 'label label-default' });
				this.$cell.append(this.$pagination, $('<div/>', { 'class': 'divider' }), this.$count);
				this.detached = false;
				this._createLinks();
			},

			first: function first() {
				return this._set(1);
			},

			prev: function prev() {
				return this._set(this.current - 1 > 0 ? this.current - 1 : 1);
			},

			next: function next() {
				return this._set(this.current + 1 < this.total ? this.current + 1 : this.total);
			},

			last: function last() {
				return this._set(this.total);
			},

			goto: function goto(page) {
				return this._set(page > this.total ? this.total : page < 1 ? 1 : page);
			},

			prevPages: function prevPages() {
				var page = this.$pagination.children('li.footable-page.visible:first').data('page') - 1;
				this._setVisible(page, true);
				this._setNavigation(false);
			},

			nextPages: function nextPages() {
				var page = this.$pagination.children('li.footable-page.visible:last').data('page') + 1;
				this._setVisible(page, false);
				this._setNavigation(false);
			},

			pageSize: function pageSize(value) {
				if (!F.is.number(value)) {
					return this.size;
				}
				this.size = value;
				this.total = Math.ceil(this.ft.rows.all.length / this.size);
				if (F.is.jq(this.$row)) this.$row.remove();
				this.$create();
				this.ft.draw();
			},

			_set: function _set(page) {
				var self = this,
				    pager = new F.Pager(self.total, self.current, self.size, page, page > self.current);

				return self.ft.raise('before.ft.paging', [pager]).then(function () {
					pager.page = pager.page > pager.total ? pager.total : pager.page;
					pager.page = pager.page < 1 ? 1 : pager.page;
					if (self.current == page) return $.when();
					self._previous = self.current;
					self.current = pager.page;
					return self.ft.draw().then(function () {
						self.ft.raise('after.ft.paging', [pager]);
					});
				});
			},

			_createLinks: function _createLinks() {
				if (this._total === this.total) return;
				var self = this,
				    multiple = self.total > 1,
				    link = function link(attr, html, klass) {
					return $('<li/>', {
						'class': klass
					}).attr('data-page', attr).append($('<a/>', {
						'class': 'footable-page-link',
						href: '#'
					}).data('page', attr).html(html));
				};
				self.$pagination.empty();
				if (multiple) {
					self.$pagination.append(link('first', self.strings.first, 'footable-page-nav'));
					self.$pagination.append(link('prev', self.strings.prev, 'footable-page-nav'));
					if (self.limit > 0 && self.limit < self.total) {
						self.$pagination.append(link('prev-limit', self.strings.prevPages, 'footable-page-nav'));
					}
				}
				for (var i = 0, $li; i < self.total; i++) {
					$li = link(i + 1, i + 1, 'footable-page');
					self.$pagination.append($li);
				}
				if (multiple) {
					if (self.limit > 0 && self.limit < self.total) {
						self.$pagination.append(link('next-limit', self.strings.nextPages, 'footable-page-nav'));
					}
					self.$pagination.append(link('next', self.strings.next, 'footable-page-nav'));
					self.$pagination.append(link('last', self.strings.last, 'footable-page-nav'));
				}
				self._total = self.total;
			},

			_setNavigation: function _setNavigation(active) {
				if (this.current == 1) {
					this.$pagination.children('li[data-page="first"],li[data-page="prev"]').addClass('disabled');
				} else {
					this.$pagination.children('li[data-page="first"],li[data-page="prev"]').removeClass('disabled');
				}

				if (this.current == this.total) {
					this.$pagination.children('li[data-page="next"],li[data-page="last"]').addClass('disabled');
				} else {
					this.$pagination.children('li[data-page="next"],li[data-page="last"]').removeClass('disabled');
				}

				if ((this.$pagination.children('li.footable-page.visible:first').data('page') || 1) == 1) {
					this.$pagination.children('li[data-page="prev-limit"]').addClass('disabled');
				} else {
					this.$pagination.children('li[data-page="prev-limit"]').removeClass('disabled');
				}

				if ((this.$pagination.children('li.footable-page.visible:last').data('page') || this.limit) == this.total) {
					this.$pagination.children('li[data-page="next-limit"]').addClass('disabled');
				} else {
					this.$pagination.children('li[data-page="next-limit"]').removeClass('disabled');
				}

				if (this.limit > 0 && this.total < this.limit) {
					this.$pagination.children('li[data-page="prev-limit"],li[data-page="next-limit"]').hide();
				} else {
					this.$pagination.children('li[data-page="prev-limit"],li[data-page="next-limit"]').show();
				}

				if (active) {
					this.$pagination.children('li.footable-page').removeClass('active').filter('li[data-page="' + this.current + '"]').addClass('active');
				}
			},

			_setVisible: function _setVisible(page, right) {
				if (this.limit > 0 && this.total > this.limit) {
					if (!this.$pagination.children('li.footable-page[data-page="' + page + '"]').hasClass('visible')) {
						var start = 0,
						    end = 0;
						if (right == true) {
							end = page > this.total ? this.total : page;
							start = end - this.limit;
						} else {
							start = page < 1 ? 0 : page - 1;
							end = start + this.limit;
						}
						if (start < 0) {
							start = 0;
							end = this.limit > this.total ? this.total : this.limit;
						}
						if (end > this.total) {
							end = this.total;
							start = this.total - this.limit < 0 ? 0 : this.total - this.limit;
						}
						this.$pagination.children('li.footable-page').removeClass('visible').slice(start, end).addClass('visible');
					}
				} else {
					this.$pagination.children('li.footable-page').removeClass('visible').slice(0, this.total).addClass('visible');
				}
				var first = this.size * (page - 1) + 1,
				    last = this.size * page,
				    totalRows = this.ft.rows.all.length;
				if (this.ft.rows.array.length == 0) {
					first = 0;
					last = 0;
				} else {
					last = last > totalRows ? totalRows : last;
				}
				this._setCount(page, this.total, first, last, totalRows);
			},

			_setCount: function _setCount(currentPage, totalPages, pageFirst, pageLast, totalRows) {
				this.$count.text(this.countFormat.replace(/\{CP}/g, currentPage).replace(/\{TP}/g, totalPages).replace(/\{PF}/g, pageFirst).replace(/\{PL}/g, pageLast).replace(/\{TR}/g, totalRows));
			},

			_onPageClicked: function _onPageClicked(e) {
				e.preventDefault();
				if ($(e.target).closest('li').is('.active,.disabled')) return;

				var self = e.data.self,
				    page = $(this).data('page');
				switch (page) {
					case 'first':
						self.first();
						return;
					case 'prev':
						self.prev();
						return;
					case 'next':
						self.next();
						return;
					case 'last':
						self.last();
						return;
					case 'prev-limit':
						self.prevPages();
						return;
					case 'next-limit':
						self.nextPages();
						return;
					default:
						self._set(page);
						return;
				}
			}
		});

		F.components.register('paging', F.Paging, 400);
	})(jQuery, FooTable);
	(function (F) {
		F.Defaults.prototype.paging = {
			enabled: false,
			countFormat: '{CP} of {TP}',
			current: 1,
			limit: 5,
			position: 'center',
			size: 10,
			strings: {
				first: '&laquo;',
				prev: '&lsaquo;',
				next: '&rsaquo;',
				last: '&raquo;',
				prevPages: '...',
				nextPages: '...'
			}
		};
	})(FooTable);
	(function (F) {
		F.Table.prototype.gotoPage = function (num) {
			return this.use(F.Paging).goto(num);
		};

		F.Table.prototype.nextPage = function () {
			return this.use(F.Paging).next();
		};

		F.Table.prototype.prevPage = function () {
			return this.use(F.Paging).prev();
		};

		F.Table.prototype.firstPage = function () {
			return this.use(F.Paging).first();
		};

		F.Table.prototype.lastPage = function () {
			return this.use(F.Paging).last();
		};

		F.Table.prototype.nextPages = function () {
			return this.use(F.Paging).nextPages();
		};

		F.Table.prototype.prevPages = function () {
			return this.use(F.Paging).prevPages();
		};

		F.Table.prototype.pageSize = function (value) {
			return this.use(F.Paging).pageSize(value);
		};
	})(FooTable);
	(function ($, F) {

		F.Editing = F.Component.extend({
			construct: function construct(table) {
				this._super(table, table.o.editing.enabled);

				this.pageToNew = table.o.editing.pageToNew;

				this.alwaysShow = table.o.editing.alwaysShow;

				this.column = $.extend(true, {}, table.o.editing.column, { visible: this.alwaysShow });

				this.position = table.o.editing.position;

				this.showText = table.o.editing.showText;

				this.hideText = table.o.editing.hideText;

				this.addText = table.o.editing.addText;

				this.editText = table.o.editing.editText;

				this.deleteText = table.o.editing.deleteText;

				this.viewText = table.o.editing.viewText;

				this.allowAdd = table.o.editing.allowAdd;

				this.allowEdit = table.o.editing.allowEdit;

				this.allowDelete = table.o.editing.allowDelete;

				this.allowView = table.o.editing.allowView;

				this._$buttons = null;

				this.callbacks = {
					addRow: F.checkFnValue(this, table.o.editing.addRow),
					editRow: F.checkFnValue(this, table.o.editing.editRow),
					deleteRow: F.checkFnValue(this, table.o.editing.deleteRow),
					viewRow: F.checkFnValue(this, table.o.editing.viewRow)
				};
			},

			preinit: function preinit(data) {
				var self = this;

				this.ft.raise('preinit.ft.editing', [data]).then(function () {
					if (self.ft.$el.hasClass('footable-editing')) self.enabled = true;

					self.enabled = F.is.boolean(data.editing) ? data.editing : self.enabled;

					if (!self.enabled) return;

					self.pageToNew = F.is.boolean(data.editingPageToNew) ? data.editingPageToNew : self.pageToNew;

					self.alwaysShow = F.is.boolean(data.editingAlwaysShow) ? data.editingAlwaysShow : self.alwaysShow;

					self.position = F.is.string(data.editingPosition) ? data.editingPosition : self.position;

					self.showText = F.is.string(data.editingShowText) ? data.editingShowText : self.showText;

					self.hideText = F.is.string(data.editingHideText) ? data.editingHideText : self.hideText;

					self.addText = F.is.string(data.editingAddText) ? data.editingAddText : self.addText;

					self.editText = F.is.string(data.editingEditText) ? data.editingEditText : self.editText;

					self.deleteText = F.is.string(data.editingDeleteText) ? data.editingDeleteText : self.deleteText;

					self.viewText = F.is.string(data.editingViewText) ? data.editingViewText : self.viewText;

					self.allowAdd = F.is.boolean(data.editingAllowAdd) ? data.editingAllowAdd : self.allowAdd;

					self.allowEdit = F.is.boolean(data.editingAllowEdit) ? data.editingAllowEdit : self.allowEdit;

					self.allowDelete = F.is.boolean(data.editingAllowDelete) ? data.editingAllowDelete : self.allowDelete;

					self.allowView = F.is.boolean(data.editingAllowView) ? data.editingAllowView : self.allowView;

					self.column = new F.EditingColumn(self.ft, self, $.extend(true, {}, self.column, data.editingColumn, { visible: self.alwaysShow }));

					if (self.ft.$el.hasClass('footable-editing-left')) self.position = 'left';

					if (self.ft.$el.hasClass('footable-editing-right')) self.position = 'right';

					if (self.position === 'right') {
						self.column.index = self.ft.columns.array.length;
					} else {
						self.column.index = 0;
						for (var i = 0, len = self.ft.columns.array.length; i < len; i++) {
							self.ft.columns.array[i].index += 1;
						}
					}
					self.ft.columns.array.push(self.column);
					self.ft.columns.array.sort(function (a, b) {
						return a.index - b.index;
					});

					self.callbacks.addRow = F.checkFnValue(self, data.editingAddRow, self.callbacks.addRow);
					self.callbacks.editRow = F.checkFnValue(self, data.editingEditRow, self.callbacks.editRow);
					self.callbacks.deleteRow = F.checkFnValue(self, data.editingDeleteRow, self.callbacks.deleteRow);
					self.callbacks.viewRow = F.checkFnValue(self, data.editingViewRow, self.callbacks.viewRow);
				}, function () {
					self.enabled = false;
				});
			},

			init: function init() {
				var self = this;
				this.ft.raise('init.ft.editing').then(function () {
					self.$create();
				}, function () {
					self.enabled = false;
				});
			},

			destroy: function destroy() {
				var self = this;
				this.ft.raise('destroy.ft.editing').then(function () {
					self.ft.$el.removeClass('footable-editing footable-editing-always-show footable-editing-no-add footable-editing-no-edit footable-editing-no-delete footable-editing-no-view').off('click.ft.editing').find('tfoot > tr.footable-editing').remove();
				});
			},

			$create: function $create() {
				var self = this,
				    position = self.position === 'right' ? 'footable-editing-right' : 'footable-editing-left';
				self.ft.$el.addClass('footable-editing').addClass(position).on('click.ft.editing', '.footable-show', { self: self }, self._onShowClick).on('click.ft.editing', '.footable-hide', { self: self }, self._onHideClick).on('click.ft.editing', '.footable-edit', { self: self }, self._onEditClick).on('click.ft.editing', '.footable-delete', { self: self }, self._onDeleteClick).on('click.ft.editing', '.footable-view', { self: self }, self._onViewClick).on('click.ft.editing', '.footable-add', { self: self }, self._onAddClick);

				self.$cell = $('<td/>').attr('colspan', self.ft.columns.visibleColspan).append(self.$buttonShow());
				if (self.allowAdd) {
					self.$cell.append(self.$buttonAdd());
				}
				self.$cell.append(self.$buttonHide());

				if (self.alwaysShow) {
					self.ft.$el.addClass('footable-editing-always-show');
				}

				if (!self.allowAdd) self.ft.$el.addClass('footable-editing-no-add');
				if (!self.allowEdit) self.ft.$el.addClass('footable-editing-no-edit');
				if (!self.allowDelete) self.ft.$el.addClass('footable-editing-no-delete');
				if (!self.allowView) self.ft.$el.addClass('footable-editing-no-view');

				var $tfoot = self.ft.$el.children('tfoot');
				if ($tfoot.length == 0) {
					$tfoot = $('<tfoot/>');
					self.ft.$el.append($tfoot);
				}
				self.$row = $('<tr/>', { 'class': 'footable-editing' }).append(self.$cell).appendTo($tfoot);
			},

			$buttonShow: function $buttonShow() {
				return '<button type="button" class="btn btn-primary footable-show">' + this.showText + '</button>';
			},

			$buttonHide: function $buttonHide() {
				return '<button type="button" class="btn btn-default footable-hide">' + this.hideText + '</button>';
			},

			$buttonAdd: function $buttonAdd() {
				return '<button type="button" class="btn btn-primary footable-add">' + this.addText + '</button> ';
			},

			$buttonEdit: function $buttonEdit() {
				return '<button type="button" class="btn btn-default footable-edit">' + this.editText + '</button> ';
			},

			$buttonDelete: function $buttonDelete() {
				return '<button type="button" class="btn btn-default footable-delete">' + this.deleteText + '</button>';
			},

			$buttonView: function $buttonView() {
				return '<button type="button" class="btn btn-default footable-view">' + this.viewText + '</button> ';
			},

			$rowButtons: function $rowButtons() {
				if (F.is.jq(this._$buttons)) return this._$buttons.clone();
				this._$buttons = $('<div class="btn-group btn-group-xs" role="group"></div>');
				if (this.allowView) this._$buttons.append(this.$buttonView());
				if (this.allowEdit) this._$buttons.append(this.$buttonEdit());
				if (this.allowDelete) this._$buttons.append(this.$buttonDelete());
				return this._$buttons;
			},

			draw: function draw() {
				this.$cell.attr('colspan', this.ft.columns.visibleColspan);
			},

			_onEditClick: function _onEditClick(e) {
				e.preventDefault();
				var self = e.data.self,
				    row = $(this).closest('tr').data('__FooTableRow__');
				if (row instanceof F.Row) {
					self.ft.raise('edit.ft.editing', [row]).then(function () {
						self.callbacks.editRow.call(self.ft, row);
					});
				}
			},

			_onDeleteClick: function _onDeleteClick(e) {
				e.preventDefault();
				var self = e.data.self,
				    row = $(this).closest('tr').data('__FooTableRow__');
				if (row instanceof F.Row) {
					self.ft.raise('delete.ft.editing', [row]).then(function () {
						self.callbacks.deleteRow.call(self.ft, row);
					});
				}
			},

			_onViewClick: function _onViewClick(e) {
				e.preventDefault();
				var self = e.data.self,
				    row = $(this).closest('tr').data('__FooTableRow__');
				if (row instanceof F.Row) {
					self.ft.raise('view.ft.editing', [row]).then(function () {
						self.callbacks.viewRow.call(self.ft, row);
					});
				}
			},

			_onAddClick: function _onAddClick(e) {
				e.preventDefault();
				var self = e.data.self;

				self.ft.raise('add.ft.editing').then(function () {
					self.callbacks.addRow.call(self.ft);
				});
			},

			_onShowClick: function _onShowClick(e) {
				e.preventDefault();
				var self = e.data.self;

				self.ft.raise('show.ft.editing').then(function () {
					self.ft.$el.addClass('footable-editing-show');
					self.column.visible = true;
					self.ft.draw();
				});
			},

			_onHideClick: function _onHideClick(e) {
				e.preventDefault();
				var self = e.data.self;

				self.ft.raise('hide.ft.editing').then(function () {
					self.ft.$el.removeClass('footable-editing-show');
					self.column.visible = false;
					self.ft.draw();
				});
			}
		});

		F.components.register('editing', F.Editing, 850);
	})(jQuery, FooTable);

	(function ($, F) {

		F.EditingColumn = F.Column.extend({
			construct: function construct(instance, editing, definition) {
				this._super(instance, definition, 'editing');
				this.editing = editing;
			},

			$create: function $create() {
				(this.$el = !this.virtual && F.is.jq(this.$el) ? this.$el : $('<th/>', { 'class': 'footable-editing' })).html(this.title);
			},

			parser: function parser(valueOrElement) {
				if (F.is.string(valueOrElement)) valueOrElement = $($.trim(valueOrElement));
				if (F.is.element(valueOrElement)) valueOrElement = $(valueOrElement);
				if (F.is.jq(valueOrElement)) {
					var tagName = valueOrElement.prop('tagName').toLowerCase();
					if (tagName == 'td' || tagName == 'th') return valueOrElement.data('value') || valueOrElement.contents();
					return valueOrElement;
				}
				return null;
			},

			createCell: function createCell(row) {
				var $buttons = this.editing.$rowButtons(),
				    $cell = $('<td/>').append($buttons);
				if (F.is.jq(row.$el)) {
					if (this.index === 0) {
						$cell.prependTo(row.$el);
					} else {
						$cell.insertAfter(row.$el.children().eq(this.index - 1));
					}
				}
				return new F.Cell(this.ft, row, this, $cell || $cell.html());
			}
		});

		F.columns.register('editing', F.EditingColumn);
	})(jQuery, FooTable);
	(function ($, F) {
		F.Defaults.prototype.editing = {
			enabled: false,
			pageToNew: true,
			position: 'right',
			alwaysShow: false,
			addRow: function addRow() {},
			editRow: function editRow(row) {},
			deleteRow: function deleteRow(row) {},
			viewRow: function viewRow(row) {},
			showText: '<span class="fooicon fooicon-pencil" aria-hidden="true"></span> Edit rows',
			hideText: 'Cancel',
			addText: 'New row',
			editText: '<span class="fooicon fooicon-pencil" aria-hidden="true"></span>',
			deleteText: '<span class="fooicon fooicon-trash" aria-hidden="true"></span>',
			viewText: '<span class="fooicon fooicon-stats" aria-hidden="true"></span>',
			allowAdd: true,
			allowEdit: true,
			allowDelete: true,
			allowView: false,
			column: {
				classes: 'footable-editing',
				name: 'editing',
				title: '',
				filterable: false,
				sortable: false
			}
		};
	})(jQuery, FooTable);

	(function ($, F) {

		if (F.is.defined(F.Paging)) {
			F.Paging.prototype.unpaged = [];

			F.Paging.extend('predraw', function () {
				this.unpaged = this.ft.rows.array.slice(0);
				this._super();
			});
		}
	})(jQuery, FooTable);
	(function ($, F) {
		F.Row.prototype.add = function (redraw) {
			redraw = F.is.boolean(redraw) ? redraw : true;
			var self = this;
			return $.Deferred(function (d) {
				var index = self.ft.rows.all.push(self) - 1;
				if (redraw) {
					return self.ft.draw().then(function () {
						d.resolve(index);
					});
				} else {
					d.resolve(index);
				}
			});
		};

		F.Row.prototype.delete = function (redraw) {
			redraw = F.is.boolean(redraw) ? redraw : true;
			var self = this;
			return $.Deferred(function (d) {
				var index = self.ft.rows.all.indexOf(self);
				if (F.is.number(index) && index >= 0 && index < self.ft.rows.all.length) {
					self.ft.rows.all.splice(index, 1);
					if (redraw) {
						return self.ft.draw().then(function () {
							d.resolve(self);
						});
					}
				}
				d.resolve(self);
			});
		};

		if (F.is.defined(F.Paging)) {
			F.Row.extend('add', function (redraw) {
				redraw = F.is.boolean(redraw) ? redraw : true;
				var self = this,
				    added = this._super(redraw),
				    editing = self.ft.use(F.Editing),
				    paging;
				if (editing && editing.pageToNew && (paging = self.ft.use(F.Paging)) && redraw) {
					return added.then(function () {
						var index = paging.unpaged.indexOf(self);
						var page = Math.ceil((index + 1) / paging.size);
						if (paging.current !== page) {
							return paging.goto(page);
						}
					});
				}
				return added;
			});
		}

		if (F.is.defined(F.Sorting)) {
			F.Row.extend('val', function (data, redraw) {
				redraw = F.is.boolean(redraw) ? redraw : true;
				var result = this._super(data);
				if (!F.is.hash(data)) {
					return result;
				}
				var self = this;
				if (redraw) {
					self.ft.draw().then(function () {
						var editing = self.ft.use(F.Editing),
						    paging;
						if (F.is.defined(F.Paging) && editing && editing.pageToNew && (paging = self.ft.use(F.Paging))) {
							var index = paging.unpaged.indexOf(self);
							var page = Math.ceil((index + 1) / paging.size);
							if (paging.current !== page) {
								return paging.goto(page);
							}
						}
					});
				}
				return result;
			});
		}
	})(jQuery, FooTable);
	(function (F) {
		F.Rows.prototype.add = function (dataOrRow, redraw) {
			var row = dataOrRow;
			if (F.is.hash(dataOrRow)) {
				row = new FooTable.Row(this.ft, this.ft.columns.array, dataOrRow);
			}
			if (row instanceof FooTable.Row) {
				row.add(redraw);
			}
		};

		F.Rows.prototype.update = function (indexOrRow, data, redraw) {
			var len = this.ft.rows.all.length,
			    row = indexOrRow;
			if (F.is.number(indexOrRow) && indexOrRow >= 0 && indexOrRow < len) {
				row = this.ft.rows.all[indexOrRow];
			}
			if (row instanceof FooTable.Row && F.is.hash(data)) {
				row.val(data, redraw);
			}
		};

		F.Rows.prototype.delete = function (indexOrRow, redraw) {
			var len = this.ft.rows.all.length,
			    row = indexOrRow;
			if (F.is.number(indexOrRow) && indexOrRow >= 0 && indexOrRow < len) {
				row = this.ft.rows.all[indexOrRow];
			}
			if (row instanceof FooTable.Row) {
				row.delete(redraw);
			}
		};
	})(FooTable);

	(function ($, F) {
		var _uid2 = 0,
		    _url_hash = function (str) {
			var i,
			    l,
			    hval = 0x811c9dc5;
			for (i = 0, l = str.length; i < l; i++) {
				hval ^= str.charCodeAt(i);
				hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
			}
			return hval >>> 0;
		}(location.origin + location.pathname);

		F.State = F.Component.extend({
			construct: function construct(table) {
				this._super(table, table.o.state.enabled);

				this._key = '1';

				this.key = this._key + (F.is.string(table.o.state.key) ? table.o.state.key : this._uid());

				this.filtering = F.is.boolean(table.o.state.filtering) ? table.o.state.filtering : true;

				this.paging = F.is.boolean(table.o.state.paging) ? table.o.state.paging : true;

				this.sorting = F.is.boolean(table.o.state.sorting) ? table.o.state.sorting : true;
			},

			preinit: function preinit(data) {
				var self = this;

				this.ft.raise('preinit.ft.state', [data]).then(function () {

					self.enabled = F.is.boolean(data.state) ? data.state : self.enabled;

					if (!self.enabled) return;

					self.key = self._key + (F.is.string(data.stateKey) ? data.stateKey : self.key);

					self.filtering = F.is.boolean(data.stateFiltering) ? data.stateFiltering : self.filtering;

					self.paging = F.is.boolean(data.statePaging) ? data.statePaging : self.paging;

					self.sorting = F.is.boolean(data.stateSorting) ? data.stateSorting : self.sorting;
				}, function () {
					self.enabled = false;
				});
			},

			get: function get(key) {
				return JSON.parse(localStorage.getItem(this.key + ':' + key));
			},

			set: function set(key, data) {
				localStorage.setItem(this.key + ':' + key, JSON.stringify(data));
			},

			remove: function remove(key) {
				localStorage.removeItem(this.key + ':' + key);
			},

			read: function read() {
				this.ft.execute(false, true, 'readState');
			},

			write: function write() {
				this.ft.execute(false, true, 'writeState');
			},

			clear: function clear() {
				this.ft.execute(false, true, 'clearState');
			},

			_uid: function _uid() {
				var id = this.ft.$el.attr('id');
				return _url_hash + '_' + (F.is.string(id) ? id : ++_uid2);
			}
		});

		F.components.register('state', F.State, 700);
	})(jQuery, FooTable);
	(function (F) {
		F.Component.prototype.readState = function () {};

		F.Component.prototype.writeState = function () {};

		F.Component.prototype.clearState = function () {};
	})(FooTable);
	(function (F) {
		F.Defaults.prototype.state = {
			enabled: false,
			filtering: true,
			paging: true,
			sorting: true,
			key: null
		};
	})(FooTable);
	(function (F) {

		if (!F.Filtering) return;

		F.Filtering.prototype.readState = function () {
			if (this.ft.state.filtering) {
				var state = this.ft.state.get('filtering');
				if (F.is.hash(state) && !F.is.emptyArray(state.filters)) {
					this.filters = this.ensure(state.filters);
				}
			}
		};

		F.Filtering.prototype.writeState = function () {
			if (this.ft.state.filtering) {
				var filters = F.arr.map(this.filters, function (f) {
					return {
						name: f.name,
						query: f.query instanceof F.Query ? f.query.val() : f.query,
						columns: F.arr.map(f.columns, function (c) {
							return c.name;
						}),
						hidden: f.hidden,
						space: f.space,
						connectors: f.connectors,
						ignoreCase: f.ignoreCase
					};
				});
				this.ft.state.set('filtering', { filters: filters });
			}
		};

		F.Filtering.prototype.clearState = function () {
			if (this.ft.state.filtering) {
				this.ft.state.remove('filtering');
			}
		};
	})(FooTable);
	(function (F) {

		if (!F.Paging) return;

		F.Paging.prototype.readState = function () {
			if (this.ft.state.paging) {
				var state = this.ft.state.get('paging');
				if (F.is.hash(state)) {
					this.current = state.current;
					this.size = state.size;
				}
			}
		};

		F.Paging.prototype.writeState = function () {
			if (this.ft.state.paging) {
				this.ft.state.set('paging', {
					current: this.current,
					size: this.size
				});
			}
		};

		F.Paging.prototype.clearState = function () {
			if (this.ft.state.paging) {
				this.ft.state.remove('paging');
			}
		};
	})(FooTable);
	(function (F) {

		if (!F.Sorting) return;

		F.Sorting.prototype.readState = function () {
			if (this.ft.state.sorting) {
				var state = this.ft.state.get('sorting');
				if (F.is.hash(state)) {
					var column = this.ft.columns.get(state.column);
					if (column instanceof F.Column) {
						this.column = column;
						this.column.direction = state.direction;
					}
				}
			}
		};

		F.Sorting.prototype.writeState = function () {
			if (this.ft.state.sorting && this.column instanceof F.Column) {
				this.ft.state.set('sorting', {
					column: this.column.name,
					direction: this.column.direction
				});
			}
		};

		F.Sorting.prototype.clearState = function () {
			if (this.ft.state.sorting) {
				this.ft.state.remove('sorting');
			}
		};
	})(FooTable);
	(function (F) {
		F.Table.extend('_construct', function (ready) {
			this.state = this.use(FooTable.State);
			this._super(ready);
		});

		F.Table.extend('_preinit', function () {
			var self = this;
			return self._super().then(function () {
				if (self.state.enabled) {
					self.state.read();
				}
			});
		});

		F.Table.extend('draw', function () {
			var self = this;
			return self._super().then(function () {
				if (self.state.enabled) {
					self.state.write();
				}
			});
		});
	})(FooTable);
});
define('assets/js/footable.min',[], function () {
  "use strict";

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  /*
  * FooTable v3 - FooTable is a jQuery plugin that aims to make HTML tables on smaller devices look awesome.
  * @version 3.1.1
  * @link http://fooplugins.com
  * @copyright Steven Usher & Brad Vincent 2015
  * @license Released under the GPLv3 license.
  */
  !function (a, b) {
    window.console = window.console || { log: function log() {}, error: function error() {} }, a.fn.footable = function (a, c) {
      return a = a || {}, this.filter("table").each(function (d, e) {
        b.init(e, a, c);
      });
    };var c = { events: [] };b.__debug__ = JSON.parse(localStorage.getItem("footable_debug")) || !1, b.__debug_options__ = JSON.parse(localStorage.getItem("footable_debug_options")) || c, b.debug = function (d, e) {
      return b.is["boolean"](d) ? (b.__debug__ = d, void (b.__debug__ ? (localStorage.setItem("footable_debug", JSON.stringify(b.__debug__)), b.__debug_options__ = a.extend(!0, {}, c, e || {}), b.is.hash(e) && localStorage.setItem("footable_debug_options", JSON.stringify(b.__debug_options__))) : (localStorage.removeItem("footable_debug"), localStorage.removeItem("footable_debug_options")))) : b.__debug__;
    }, b.get = function (b) {
      return a(b).first().data("__FooTable__");
    }, b.init = function (a, c, d) {
      var e = b.get(a);return e instanceof b.Table && e.destroy(), new b.Table(a, c, d);
    }, b.getRow = function (b) {
      var c = a(b).closest("tr");return c.hasClass("footable-detail-row") && (c = c.prev()), c.data("__FooTableRow__");
    };
  }(jQuery, FooTable = window.FooTable || {}), function (a) {
    var b = function b() {
      return !0;
    };a.arr = {}, a.arr.each = function (b, c) {
      if (a.is.array(b) && a.is.fn(c)) for (var d = 0, e = b.length; e > d && c(b[d], d) !== !1; d++) {}
    }, a.arr.get = function (b, c) {
      var d = [];if (!a.is.array(b)) return d;if (!a.is.fn(c)) return b;for (var e = 0, f = b.length; f > e; e++) {
        c(b[e], e) && d.push(b[e]);
      }return d;
    }, a.arr.any = function (c, d) {
      if (!a.is.array(c)) return !1;d = a.is.fn(d) ? d : b;for (var e = 0, f = c.length; f > e; e++) {
        if (d(c[e], e)) return !0;
      }return !1;
    }, a.arr.contains = function (b, c) {
      if (!a.is.array(b) || a.is.undef(c)) return !1;for (var d = 0, e = b.length; e > d; d++) {
        if (b[d] == c) return !0;
      }return !1;
    }, a.arr.first = function (c, d) {
      if (!a.is.array(c)) return null;d = a.is.fn(d) ? d : b;for (var e = 0, f = c.length; f > e; e++) {
        if (d(c[e], e)) return c[e];
      }return null;
    }, a.arr.map = function (b, c) {
      var d = [],
          e = null;if (!a.is.array(b) || !a.is.fn(c)) return d;for (var f = 0, g = b.length; g > f; f++) {
        null != (e = c(b[f], f)) && d.push(e);
      }return d;
    }, a.arr.remove = function (b, c) {
      var d = [],
          e = [];if (!a.is.array(b) || !a.is.fn(c)) return e;for (var f = 0, g = b.length; g > f; f++) {
        c(b[f], f, e) && (d.push(f), e.push(b[f]));
      }for (d.sort(function (a, b) {
        return b - a;
      }), f = 0, g = d.length; g > f; f++) {
        var h = d[f] - f;b.splice(h, 1);
      }return e;
    }, a.arr["delete"] = function (b, c) {
      var d = -1,
          e = null;if (!a.is.array(b) || a.is.undef(c)) return e;for (var f = 0, g = b.length; g > f; f++) {
        if (b[f] == c) {
          d = f, e = b[f];break;
        }
      }return -1 != d && b.splice(d, 1), e;
    }, a.arr.replace = function (a, b, c) {
      var d = a.indexOf(b);-1 !== d && (a[d] = c);
    };
  }(FooTable), function (a) {
    a.is = {}, a.is.type = function (a, b) {
      return (typeof a === "undefined" ? "undefined" : _typeof(a)) === b;
    }, a.is.defined = function (a) {
      return "undefined" != typeof a;
    }, a.is.undef = function (a) {
      return "undefined" == typeof a;
    }, a.is.array = function (a) {
      return "[object Array]" === Object.prototype.toString.call(a);
    }, a.is.date = function (a) {
      return "[object Date]" === Object.prototype.toString.call(a) && !isNaN(a.getTime());
    }, a.is["boolean"] = function (a) {
      return "[object Boolean]" === Object.prototype.toString.call(a);
    }, a.is.string = function (a) {
      return "[object String]" === Object.prototype.toString.call(a);
    }, a.is.number = function (a) {
      return "[object Number]" === Object.prototype.toString.call(a) && !isNaN(a);
    }, a.is.fn = function (b) {
      return a.is.defined(window) && b === window.alert || "[object Function]" === Object.prototype.toString.call(b);
    }, a.is.error = function (a) {
      return "[object Error]" === Object.prototype.toString.call(a);
    }, a.is.object = function (a) {
      return "[object Object]" === Object.prototype.toString.call(a);
    }, a.is.hash = function (b) {
      return a.is.object(b) && b.constructor === Object && !b.nodeType && !b.setInterval;
    }, a.is.element = function (a) {
      return "object" == (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) ? a instanceof HTMLElement : a && "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && 1 === a.nodeType && "string" == typeof a.nodeName;
    }, a.is.promise = function (b) {
      return a.is.object(b) && a.is.fn(b.then) && a.is.fn(b.promise);
    }, a.is.jq = function (b) {
      return a.is.defined(window.jQuery) && b instanceof jQuery && b.length > 0;
    }, a.is.moment = function (b) {
      return a.is.defined(window.moment) && a.is.object(b) && a.is["boolean"](b._isAMomentObject);
    }, a.is.emptyObject = function (b) {
      if (!a.is.hash(b)) return !1;for (var c in b) {
        if (b.hasOwnProperty(c)) return !1;
      }return !0;
    }, a.is.emptyArray = function (b) {
      return a.is.array(b) ? 0 === b.length : !0;
    }, a.is.emptyString = function (b) {
      return a.is.string(b) ? 0 === b.length : !0;
    };
  }(FooTable), function (a) {
    a.str = {}, a.str.contains = function (b, c, d) {
      return a.is.emptyString(b) || a.is.emptyString(c) ? !1 : c.length <= b.length && -1 !== (d ? b.toUpperCase().indexOf(c.toUpperCase()) : b.indexOf(c));
    }, a.str.containsWord = function (b, c, d) {
      if (a.is.emptyString(b) || a.is.emptyString(c) || b.length < c.length) return !1;for (var e = b.split(/\W/), f = 0, g = e.length; g > f; f++) {
        if (d ? e[f].toUpperCase() == c.toUpperCase() : e[f] == c) return !0;
      }return !1;
    }, a.str.from = function (b, c) {
      return a.is.emptyString(b) ? b : a.str.contains(b, c) ? b.substring(b.indexOf(c) + 1) : b;
    }, a.str.startsWith = function (b, c) {
      return a.is.emptyString(b) ? b == c : b.slice(0, c.length) == c;
    }, a.str.toCamelCase = function (b) {
      return a.is.emptyString(b) ? b : b.toUpperCase() === b ? b.toLowerCase() : b.replace(/^([A-Z])|[-\s_](\w)/g, function (b, c, d) {
        return a.is.string(d) ? d.toUpperCase() : c.toLowerCase();
      });
    }, a.str.random = function (b) {
      return b = a.is.emptyString(b) ? "" : b, b + Math.random().toString(36).substr(2, 9);
    }, a.str.escapeRegExp = function (b) {
      return a.is.emptyString(b) ? b : b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };
  }(FooTable), function (a) {
    "use strict";
    function b() {}Object.create || (Object.create = function () {
      var b = function b() {};return function (c) {
        if (arguments.length > 1) throw Error("Second argument not supported");if (!a.is.object(c)) throw TypeError("Argument must be an object");b.prototype = c;var d = new b();return b.prototype = null, d;
      };
    }());var c = /xyz/.test(function () {
      xyz;
    }) ? /\b_super\b/ : /.*/;b.__extend__ = function (b, d, e, f) {
      b[d] = a.is.fn(f) && c.test(e) ? function (a, b) {
        return function () {
          var a, c;return a = this._super, this._super = f, c = b.apply(this, arguments), this._super = a, c;
        };
      }(d, e) : e;
    }, b.extend = function (d, e) {
      function f(b, d, e, f) {
        b[d] = a.is.fn(f) && c.test(e) ? function (a, b, c) {
          return function () {
            var a, d;return a = this._super, this._super = c, d = b.apply(this, arguments), this._super = a, d;
          };
        }(d, e, f) : e;
      }var g = Array.prototype.slice.call(arguments);if (d = g.shift(), e = g.shift(), a.is.hash(d)) {
        var h = Object.create(this.prototype),
            i = this.prototype;for (var j in d) {
          "__ctor__" !== j && f(h, j, d[j], i[j]);
        }var k = a.is.fn(h.__ctor__) ? h.__ctor__ : function () {
          if (!a.is.fn(this.construct)) throw new SyntaxError('FooTable class objects must be constructed with the "new" keyword.');this.construct.apply(this, arguments);
        };return h.construct = a.is.fn(h.construct) ? h.construct : function () {}, k.prototype = h, h.constructor = k, k.extend = b.extend, k;
      }a.is.string(d) && a.is.fn(e) && f(this.prototype, d, e, this.prototype[d]);
    }, a.Class = b, a.ClassFactory = a.Class.extend({ construct: function construct() {
        this.registered = {};
      }, contains: function contains(b) {
        return a.is.defined(this.registered[b]);
      }, names: function names() {
        var a,
            b = [];for (a in this.registered) {
          this.registered.hasOwnProperty(a) && b.push(a);
        }return b;
      }, register: function register(b, c, d) {
        if (a.is.string(b) && a.is.fn(c)) {
          var e = this.registered[b];this.registered[b] = { name: b, klass: c, priority: a.is.number(d) ? d : a.is.defined(e) ? e.priority : 0 };
        }
      }, load: function load(b, c, d) {
        var e,
            f,
            g = this,
            h = Array.prototype.slice.call(arguments),
            i = [],
            j = [];b = h.shift() || {};for (e in g.registered) {
          if (g.registered.hasOwnProperty(e)) {
            var k = g.registered[e];b.hasOwnProperty(e) && (f = b[e], a.is.string(f) && (f = a.getFnPointer(b[e])), a.is.fn(f) && (k = { name: e, klass: f, priority: g.registered[e].priority })), i.push(k);
          }
        }for (e in b) {
          b.hasOwnProperty(e) && !g.registered.hasOwnProperty(e) && (f = b[e], a.is.string(f) && (f = a.getFnPointer(b[e])), a.is.fn(f) && i.push({ name: e, klass: f, priority: 0 }));
        }return i.sort(function (a, b) {
          return b.priority - a.priority;
        }), a.arr.each(i, function (b) {
          a.is.fn(b.klass) && j.push(g._make(b.klass, h));
        }), j;
      }, make: function make(b, c, d) {
        var e,
            f = this,
            g = Array.prototype.slice.call(arguments);return b = g.shift(), e = f.registered[b], a.is.fn(e.klass) ? f._make(e.klass, g) : null;
      }, _make: function _make(a, b) {
        function c() {
          return a.apply(this, b);
        }return c.prototype = a.prototype, new c();
      } });
  }(FooTable), function (a, b) {
    b.css2json = function (c) {
      if (b.is.emptyString(c)) return {};for (var d, e, f, g = {}, h = c.split(";"), i = 0, j = h.length; j > i; i++) {
        b.is.emptyString(h[i]) || (d = h[i].split(":"), b.is.emptyString(d[0]) || b.is.emptyString(d[1]) || (e = b.str.toCamelCase(a.trim(d[0])), f = a.trim(d[1]), g[e] = f));
      }return g;
    }, b.getFnPointer = function (a) {
      if (b.is.emptyString(a)) return null;var c = window,
          d = a.split(".");return b.arr.each(d, function (a) {
        c[a] && (c = c[a]);
      }), b.is.fn(c) ? c : null;
    }, b.checkFnValue = function (a, c, d) {
      function e(a, c, d) {
        return b.is.fn(c) ? function () {
          return c.apply(a, arguments);
        } : d;
      }return d = b.is.fn(d) ? d : null, b.is.fn(c) ? e(a, c, d) : b.is.type(c, "string") ? e(a, b.getFnPointer(c), d) : d;
    };
  }(jQuery, FooTable), function (a, b) {
    b.Cell = b.Class.extend({ construct: function construct(a, b, c, d) {
        this.ft = a, this.row = b, this.column = c, this.created = !1, this.define(d);
      }, define: function define(c) {
        this.$el = b.is.element(c) || b.is.jq(c) ? a(c) : null, this.$detail = null;var d = b.is.hash(c) && b.is.hash(c.options) && b.is.defined(c.value);this.value = this.column.parser.call(this.column, b.is.jq(this.$el) ? this.$el : d ? c.value : c, this.ft.o), this.o = a.extend(!0, { classes: null, style: null }, d ? c.options : {}), this.classes = b.is.jq(this.$el) && this.$el.attr("class") ? this.$el.attr("class").match(/\S+/g) : b.is.array(this.o.classes) ? this.o.classes : b.is.string(this.o.classes) ? this.o.classes.match(/\S+/g) : [], this.style = b.is.jq(this.$el) && this.$el.attr("style") ? b.css2json(this.$el.attr("style")) : b.is.hash(this.o.style) ? this.o.style : b.is.string(this.o.style) ? b.css2json(this.o.style) : {};
      }, $create: function $create() {
        this.created || ((this.$el = b.is.jq(this.$el) ? this.$el : a("<td/>")).data("value", this.value).contents().detach().end().append(this.format(this.value)), this._setClasses(this.$el), this._setStyle(this.$el), this.$detail = a("<tr/>").addClass(this.row.classes.join(" ")).data("__FooTableCell__", this).append(a("<th/>")).append(a("<td/>")), this.created = !0);
      }, collapse: function collapse() {
        this.created && (this.$detail.children("th").html(this.column.title), this.$detail.children("td").first().attr("class", this.$el.attr("class")).attr("style", this.$el.attr("style")).css("display", "table-cell").append(this.$el.contents().detach()), b.is.jq(this.$detail.parent()) || this.$detail.appendTo(this.row.$details.find(".footable-details > tbody")));
      }, restore: function restore() {
        if (this.created) {
          if (b.is.jq(this.$detail.parent())) {
            var a = this.$detail.children("td").first();this.$el.attr("class", a.attr("class")).attr("style", a.attr("style")).css("display", this.column.hidden || !this.column.visible ? "none" : "table-cell").append(a.contents().detach());
          }this.$detail.detach();
        }
      }, parse: function parse() {
        return this.column.parser.call(this.column, this.$el, this.ft.o);
      }, format: function format(a) {
        return this.column.formatter.call(this.column, a, this.ft.o);
      }, val: function val(c, d) {
        if (b.is.undef(c)) return this.value;var e = this,
            f = b.is.hash(c) && b.is.hash(c.options) && b.is.defined(c.value);if (this.o = a.extend(!0, { classes: e.classes, style: e.style }, f ? c.options : {}), this.value = f ? c.value : c, this.classes = b.is.array(this.o.classes) ? this.o.classes : b.is.string(this.o.classes) ? this.o.classes.match(/\S+/g) : [], this.style = b.is.hash(this.o.style) ? this.o.style : b.is.string(this.o.style) ? b.css2json(this.o.style) : {}, this.created) {
          this.$el.data("value", this.value).empty();var g = this.$detail.children("td").first().empty(),
              h = b.is.jq(this.$detail.parent()) ? g : this.$el;h.append(this.format(this.value)), this._setClasses(h), this._setStyle(h), (b.is["boolean"](d) ? d : !0) && this.row.draw();
        }
      }, _setClasses: function _setClasses(a) {
        var c = !b.is.emptyArray(this.column.classes),
            d = !b.is.emptyArray(this.classes),
            e = null;a.removeAttr("class"), (c || d) && (c && d ? e = this.classes.concat(this.column.classes).join(" ") : c ? e = this.column.classes.join(" ") : d && (e = this.classes.join(" ")), b.is.emptyString(e) || a.addClass(e));
      }, _setStyle: function _setStyle(c) {
        var d = !b.is.emptyObject(this.column.style),
            e = !b.is.emptyObject(this.style),
            f = null;c.removeAttr("style"), (d || e) && (d && e ? f = a.extend({}, this.column.style, this.style) : d ? f = this.column.style : e && (f = this.style), b.is.hash(f) && c.css(f));
      } });
  }(jQuery, FooTable), function (a, b) {
    b.Column = b.Class.extend({ construct: function construct(a, c, d) {
        this.ft = a, this.type = b.is.emptyString(d) ? "text" : d, this.virtual = b.is["boolean"](c.virtual) ? c.virtual : !1, this.$el = b.is.jq(c.$el) ? c.$el : null, this.index = b.is.number(c.index) ? c.index : -1, this.define(c), this.$create();
      }, define: function define(a) {
        this.hidden = b.is["boolean"](a.hidden) ? a.hidden : !1, this.visible = b.is["boolean"](a.visible) ? a.visible : !0, this.name = b.is.string(a.name) ? a.name : null, null == this.name && (this.name = "col" + (a.index + 1)), this.title = b.is.string(a.title) ? a.title : null, !this.virtual && null == this.title && b.is.jq(this.$el) && (this.title = this.$el.html()), null == this.title && (this.title = "Column " + (a.index + 1)), this.style = b.is.hash(a.style) ? a.style : b.is.string(a.style) ? b.css2json(a.style) : {}, this.classes = b.is.array(a.classes) ? a.classes : b.is.string(a.classes) ? a.classes.match(/\S+/g) : [], this.parser = b.checkFnValue(this, a.parser, this.parser), this.formatter = b.checkFnValue(this, a.formatter, this.formatter);
      }, $create: function $create() {
        (this.$el = !this.virtual && b.is.jq(this.$el) ? this.$el : a("<th/>")).html(this.title);
      }, parser: function parser(c) {
        return b.is.element(c) || b.is.jq(c) ? a(c).data("value") || a(c).text() : b.is.defined(c) && null != c ? c + "" : null;
      }, formatter: function formatter(a) {
        return null == a ? "" : a;
      }, createCell: function createCell(a) {
        var c = b.is.jq(a.$el) ? a.$el.children("td,th").get(this.index) : null,
            d = b.is.hash(a.value) ? a.value[this.name] : null;return new b.Cell(this.ft, a, this, c || d);
      } }), b.columns = new b.ClassFactory(), b.columns.register("text", b.Column);
  }(jQuery, FooTable), function (a, b) {
    b.Component = b.Class.extend({ construct: function construct(a, c) {
        if (!(a instanceof b.Table)) throw new TypeError("The instance parameter must be an instance of FooTable.Table.");this.ft = a, this.enabled = b.is["boolean"](c) ? c : !1;
      }, preinit: function preinit(a) {}, init: function init() {}, destroy: function destroy() {}, predraw: function predraw() {}, draw: function draw() {}, postdraw: function postdraw() {} }), b.components = new b.ClassFactory();
  }(jQuery, FooTable), function (a, b) {
    b.Defaults = function () {
      this.stopPropagation = !1, this.on = null;
    }, b.defaults = new b.Defaults();
  }(jQuery, FooTable), function (a, b) {
    b.Row = b.Class.extend({ construct: function construct(a, b, c) {
        this.ft = a, this.columns = b, this.created = !1, this.define(c);
      }, define: function define(c) {
        this.$el = b.is.element(c) || b.is.jq(c) ? a(c) : null, this.$toggle = a("<span/>", { "class": "footable-toggle fooicon fooicon-plus" });var d = b.is.hash(c),
            e = d && b.is.hash(c.options) && b.is.hash(c.value);this.value = d ? e ? c.value : c : null, this.o = a.extend(!0, { expanded: !1, classes: null, style: null }, e ? c.options : {}), this.expanded = b.is.jq(this.$el) ? this.$el.data("expanded") || this.o.expanded : this.o.expanded, this.classes = b.is.jq(this.$el) && this.$el.attr("class") ? this.$el.attr("class").match(/\S+/g) : b.is.array(this.o.classes) ? this.o.classes : b.is.string(this.o.classes) ? this.o.classes.match(/\S+/g) : [], this.style = b.is.jq(this.$el) && this.$el.attr("style") ? b.css2json(this.$el.attr("style")) : b.is.hash(this.o.style) ? this.o.style : b.is.string(this.o.style) ? b.css2json(this.o.style) : {}, this.cells = this.createCells();var f = this;f.value = {}, b.arr.each(f.cells, function (a) {
          f.value[a.column.name] = a.val();
        });
      }, $create: function $create() {
        if (!this.created) {
          (this.$el = b.is.jq(this.$el) ? this.$el : a("<tr/>")).data("__FooTableRow__", this), this._setClasses(this.$el), this._setStyle(this.$el), "last" == this.ft.rows.toggleColumn && this.$toggle.addClass("last-column"), this.$details = a("<tr/>", { "class": "footable-detail-row" }).append(a("<td/>", { colspan: this.ft.columns.visibleColspan }).append(a("<table/>", { "class": "footable-details " + this.ft.classes.join(" ") }).append("<tbody/>")));var c = this;b.arr.each(c.cells, function (a) {
            a.created || a.$create(), c.$el.append(a.$el);
          }), c.$el.off("click.ft.row").on("click.ft.row", { self: c }, c._onToggle), this.created = !0;
        }
      }, createCells: function createCells() {
        var a = this;return b.arr.map(a.columns, function (b) {
          return b.createCell(a);
        });
      }, val: function val(c, d) {
        var e = this;if (!b.is.hash(c)) return b.is.hash(this.value) && !b.is.emptyObject(this.value) || (this.value = {}, b.arr.each(this.cells, function (a) {
          e.value[a.column.name] = a.val();
        })), this.value;this.collapse(!1);var f = b.is.hash(c),
            g = f && b.is.hash(c.options) && b.is.hash(c.value);if (this.o = a.extend(!0, { expanded: e.expanded, classes: e.classes, style: e.style }, g ? c.options : {}), this.expanded = this.o.expanded, this.classes = b.is.array(this.o.classes) ? this.o.classes : b.is.string(this.o.classes) ? this.o.classes.match(/\S+/g) : [], this.style = b.is.hash(this.o.style) ? this.o.style : b.is.string(this.o.style) ? b.css2json(this.o.style) : {}, f) {
          if (g && (c = c.value), b.is.hash(this.value)) for (var h in c) {
            c.hasOwnProperty(h) && (this.value[h] = c[h]);
          } else this.value = c;
        } else this.value = null;b.arr.each(this.cells, function (a) {
          b.is.defined(e.value[a.column.name]) && a.val(e.value[a.column.name], !1);
        }), this.created && (this._setClasses(this.$el), this._setStyle(this.$el), (b.is["boolean"](d) ? d : !0) && this.draw());
      }, _setClasses: function _setClasses(a) {
        var c = !b.is.emptyArray(this.classes),
            d = null;a.removeAttr("class"), c && (d = this.classes.join(" "), b.is.emptyString(d) || a.addClass(d));
      }, _setStyle: function _setStyle(a) {
        var c = !b.is.emptyObject(this.style),
            d = null;a.removeAttr("style"), c && (d = this.style, b.is.hash(d) && a.css(d));
      }, expand: function expand() {
        if (this.created) {
          var a = this;a.ft.raise("expand.ft.row", [a]).then(function () {
            a.__hidden__ = b.arr.map(a.cells, function (a) {
              return a.column.hidden && a.column.visible ? a : null;
            }), a.__hidden__.length > 0 && (a.$details.insertAfter(a.$el).children("td").first().attr("colspan", a.ft.columns.visibleColspan), b.arr.each(a.__hidden__, function (a) {
              a.collapse();
            })), a.$el.attr("data-expanded", !0), a.$toggle.removeClass("fooicon-plus").addClass("fooicon-minus"), a.expanded = !0;
          });
        }
      }, collapse: function collapse(a) {
        if (this.created) {
          var c = this;c.ft.raise("collapse.ft.row", [c]).then(function () {
            b.arr.each(c.__hidden__, function (a) {
              a.restore();
            }), c.$details.detach(), c.$el.removeAttr("data-expanded"), c.$toggle.removeClass("fooicon-minus").addClass("fooicon-plus"), (b.is["boolean"](a) ? a : !0) && (c.expanded = !1);
          });
        }
      }, predraw: function predraw(a) {
        this.created && (this.expanded && this.collapse(!1), this.$toggle.detach(), a = b.is["boolean"](a) ? a : !0, a && this.$el.detach());
      }, draw: function draw(a) {
        this.created || this.$create(), b.is.jq(a) && a.append(this.$el);var c = this;b.arr.each(c.cells, function (a) {
          a.$el.css("display", a.column.hidden || !a.column.visible ? "none" : "table-cell"), c.ft.rows.showToggle && c.ft.columns.hasHidden && ("first" == c.ft.rows.toggleColumn && a.column.index == c.ft.columns.firstVisibleIndex || "last" == c.ft.rows.toggleColumn && a.column.index == c.ft.columns.lastVisibleIndex) && a.$el.prepend(c.$toggle);
        }), this.expanded && this.expand();
      }, toggle: function toggle() {
        this.created && this.ft.columns.hasHidden && (this.expanded ? this.collapse() : this.expand());
      }, _onToggle: function _onToggle(b) {
        var c = b.data.self;a(b.target).is(c.ft.rows.toggleSelector) && c.toggle();
      } });
  }(jQuery, FooTable), function (a, b) {
    b.instances = [], b.Table = b.Class.extend({ construct: function construct(c, d, e) {
        this._resizeTimeout = null, this.id = b.instances.push(this), this.initialized = !1, this.$el = (b.is.jq(c) ? c : a(c)).first(), this.o = a.extend(!0, {}, b.defaults, d), this.data = this.$el.data() || {}, this.classes = [], this.components = b.components.load(b.is.hash(this.data.components) ? this.data.components : this.o.components, this), this.breakpoints = this.use(FooTable.Breakpoints), this.columns = this.use(FooTable.Columns), this.rows = this.use(FooTable.Rows), this._construct(e);
      }, _construct: function _construct(a) {
        var c = this;this._preinit().then(function () {
          return c._init();
        }).always(function (d) {
          return b.is.error(d) ? void console.error("FooTable: unhandled error thrown during initialization.", d) : c.raise("ready.ft.table").then(function () {
            b.is.fn(a) && a.call(c, c);
          });
        });
      }, _preinit: function _preinit() {
        var c = this;return this.raise("preinit.ft.table", [c.data]).then(function () {
          var d = c.$el.attr("class").match(/\S+/g);c.o.ajax = b.checkFnValue(c, c.data.ajax, c.o.ajax), c.o.stopPropagation = b.is["boolean"](c.data.stopPropagation) ? c.data.stopPropagation : c.o.stopPropagation;for (var e = 0, f = d.length; f > e; e++) {
            b.str.startsWith(d[e], "footable") || c.classes.push(d[e]);
          }var g = a("<div/>", { "class": "footable-loader" }).append(a("<span/>", { "class": "fooicon fooicon-loader" }));return c.$el.hide().after(g), c.execute(!1, !1, "preinit", c.data).always(function () {
            c.$el.show(), g.remove();
          });
        });
      }, _init: function _init() {
        var c = this;return c.raise("init.ft.table").then(function () {
          var d = c.$el.children("thead"),
              e = c.$el.children("tbody"),
              f = c.$el.children("tfoot");return c.$el.addClass("footable footable-" + c.id), b.is.hash(c.o.on) && c.$el.on(c.o.on), 0 == f.length && c.$el.append(f = a("<tfoot/>")), 0 == e.length && c.$el.append("<tbody/>"), 0 == d.length && c.$el.prepend(d = a("<thead/>")), c.execute(!1, !0, "init").then(function () {
            return c.$el.data("__FooTable__", c), 0 == f.children("tr").length && f.remove(), 0 == d.children("tr").length && d.remove(), c.raise("postinit.ft.table").then(function () {
              return c.draw();
            }).always(function () {
              a(window).off("resize.ft" + c.id, c._onWindowResize).on("resize.ft" + c.id, { self: c }, c._onWindowResize), c.initialized = !0;
            });
          });
        });
      }, destroy: function destroy() {
        var a = this;return a.raise("destroy.ft.table").then(function () {
          return a.execute(!0, !0, "destroy").then(function () {
            a.$el.removeData("__FooTable__").removeClass("footable-" + a.id), b.is.hash(a.o.on) && a.$el.off(a.o.on), a.initialized = !1;
          });
        }).fail(function (a) {
          b.is.error(a) && console.error("FooTable: unhandled error thrown while destroying the plugin.", a);
        });
      }, raise: function raise(c, d) {
        var e = this,
            f = b.__debug__ && (b.is.emptyArray(b.__debug_options__.events) || b.arr.any(b.__debug_options__.events, function (a) {
          return b.str.contains(c, a);
        }));return d = d || [], d.unshift(this), a.Deferred(function (b) {
          var g = a.Event(c);1 == e.o.stopPropagation && e.$el.one(c, function (a) {
            a.stopPropagation();
          }), f && console.log("FooTable:" + c + ": ", d), e.$el.trigger(g, d), g.isDefaultPrevented() ? (f && console.log('FooTable: default prevented for the "' + c + '" event.'), b.reject(g)) : b.resolve(g);
        });
      }, use: function use(a) {
        for (var b = 0, c = this.components.length; c > b; b++) {
          if (this.components[b] instanceof a) return this.components[b];
        }return null;
      }, draw: function draw() {
        var a = this;return a.execute(!1, !0, "predraw").then(function () {
          return a.raise("predraw.ft.table").then(function () {
            return a.execute(!1, !0, "draw").then(function () {
              return a.raise("draw.ft.table").then(function () {
                return a.execute(!1, !0, "postdraw").then(function () {
                  return a.raise("postdraw.ft.table");
                });
              });
            });
          });
        }).fail(function (a) {
          b.is.error(a) && console.error("FooTable: unhandled error thrown during a draw operation.", a);
        });
      }, execute: function execute(a, c, d, e, f) {
        var g = this,
            h = Array.prototype.slice.call(arguments);a = h.shift(), c = h.shift();var i = c ? b.arr.get(g.components, function (a) {
          return a.enabled;
        }) : g.components.slice(0);return h.unshift(a ? i.reverse() : i), g._execute.apply(g, h);
      }, _execute: function _execute(c, d, e, f) {
        if (!c || !c.length) return a.when();var g,
            h = this,
            i = Array.prototype.slice.call(arguments);return c = i.shift(), d = i.shift(), g = c.shift(), b.is.fn(g[d]) ? a.Deferred(function (a) {
          try {
            var c = g[d].apply(g, i);if (b.is.promise(c)) return c.then(a.resolve, a.reject);a.resolve(c);
          } catch (e) {
            a.reject(e);
          }
        }).then(function () {
          return h._execute.apply(h, [c, d].concat(i));
        }) : h._execute.apply(h, [c, d].concat(i));
      }, _onWindowResize: function _onWindowResize(a) {
        var b = a.data.self;null != b._resizeTimeout && clearTimeout(b._resizeTimeout), b._resizeTimeout = setTimeout(function () {
          b._resizeTimeout = null, b.raise("resize.ft.table").then(function () {
            b.breakpoints.check();
          });
        }, 300);
      } });
  }(jQuery, FooTable), function (a, b) {
    b.is.undef(window.moment) || (b.DateColumn = b.Column.extend({ construct: function construct(a, c) {
        this._super(a, c, "date"), this.formatString = b.is.string(c.formatString) ? c.formatString : "MM-DD-YYYY";
      }, parser: function parser(c) {
        if ((b.is.element(c) || b.is.jq(c)) && (c = a(c).data("value") || a(c).text(), b.is.string(c) && (c = isNaN(c) ? c : +c)), b.is.date(c)) return moment(c);if (b.is.object(c) && b.is["boolean"](c._isAMomentObject)) return c;if (b.is.string(c)) {
          if (isNaN(c)) return moment(c, this.formatString);c = +c;
        }return b.is.number(c) ? moment(c) : null;
      }, formatter: function formatter(a) {
        return b.is.object(a) && b.is["boolean"](a._isAMomentObject) ? a.format(this.formatString) : "";
      }, filterValue: function filterValue(c) {
        if ((b.is.element(c) || b.is.jq(c)) && (c = a(c).data("filterValue") || a(c).text()), b.is.hash(c) && b.is.hash(c.options) && (b.is.string(c.options.filterValue) && (c = c.options.filterValue), b.is.defined(c.value) && (c = c.value)), b.is.object(c) && b.is["boolean"](c._isAMomentObject)) return c.format(this.formatString);if (b.is.string(c)) {
          if (isNaN(c)) return c;c = +c;
        }return b.is.number(c) || b.is.date(c) ? moment(c).format(this.formatString) : b.is.defined(c) && null != c ? c + "" : "";
      } }), b.columns.register("date", b.DateColumn));
  }(jQuery, FooTable), function (a, b) {
    b.HTMLColumn = b.Column.extend({ construct: function construct(a, b) {
        this._super(a, b, "html");
      }, parser: function parser(c) {
        if (b.is.string(c) && (c = a(a.trim(c))), b.is.element(c) && (c = a(c)), b.is.jq(c)) {
          var d = c.prop("tagName").toLowerCase();return "td" == d || "th" == d ? c.data("value") || c.contents() : c;
        }return null;
      } }), b.columns.register("html", b.HTMLColumn);
  }(jQuery, FooTable), function (a, b) {
    b.NumberColumn = b.Column.extend({ construct: function construct(a, c) {
        this._super(a, c, "number"), this.decimalSeparator = b.is.string(c.decimalSeparator) ? c.decimalSeparator : ".", this.thousandSeparator = b.is.string(c.thousandSeparator) ? c.thousandSeparator : ",", this.decimalSeparatorRegex = new RegExp(b.str.escapeRegExp(this.decimalSeparator), "g"), this.thousandSeparatorRegex = new RegExp(b.str.escapeRegExp(this.thousandSeparator), "g"), this.cleanRegex = new RegExp("[^0-9" + b.str.escapeRegExp(this.decimalSeparator) + "]", "g");
      }, parser: function parser(c) {
        return (b.is.element(c) || b.is.jq(c)) && (c = a(c).data("value") || a(c).text().replace(this.cleanRegex, "")), b.is.string(c) && (c = c.replace(this.thousandSeparatorRegex, "").replace(this.decimalSeparatorRegex, "."), c = parseFloat(c)), b.is.number(c) ? c : null;
      }, formatter: function formatter(a) {
        if (null == a) return "";var b = (a + "").split(".");return 2 == b.length && b[0].length > 3 && (b[0] = b[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, this.thousandSeparator)), b.join(this.decimalSeparator);
      } }), b.columns.register("number", b.NumberColumn);
  }(jQuery, FooTable), function (a, b) {
    b.Breakpoint = b.Class.extend({ construct: function construct(a, b) {
        this.name = a, this.width = b;
      } });
  }(jQuery, FooTable), function (a, b) {
    b.Breakpoints = b.Component.extend({ construct: function construct(a) {
        this._super(a, !0), this.o = a.o, this.current = null, this.array = [], this.cascade = this.o.cascade, this.useParentWidth = this.o.useParentWidth, this.hidden = null, this._classNames = "", this.getWidth = b.checkFnValue(this, this.o.getWidth, this.getWidth);
      }, preinit: function preinit(a) {
        var c = this;return this.ft.raise("preinit.ft.breakpoints", [a]).then(function () {
          c.cascade = b.is["boolean"](a.cascade) ? a.cascade : c.cascade, c.o.breakpoints = b.is.hash(a.breakpoints) ? a.breakpoints : c.o.breakpoints, c.getWidth = b.checkFnValue(c, a.getWidth, c.getWidth), null == c.o.breakpoints && (c.o.breakpoints = { xs: 480, sm: 768, md: 992, lg: 1200 });for (var d in c.o.breakpoints) {
            c.o.breakpoints.hasOwnProperty(d) && (c.array.push(new b.Breakpoint(d, c.o.breakpoints[d])), c._classNames += "breakpoint-" + d + " ");
          }c.array.sort(function (a, b) {
            return b.width - a.width;
          });
        });
      }, init: function init() {
        var a = this;return this.ft.raise("init.ft.breakpoints").then(function () {
          a.current = a.get();
        });
      }, draw: function draw() {
        this.ft.$el.removeClass(this._classNames).addClass("breakpoint-" + this.current.name);
      }, calculate: function calculate() {
        for (var a, c = this, d = null, e = [], f = null, g = c.getWidth(), h = 0, i = c.array.length; i > h; h++) {
          a = c.array[h], (!d && h == i - 1 || g >= a.width && (f instanceof b.Breakpoint ? g < f.width : !0)) && (d = a), d || e.push(a.name), f = a;
        }return e.push(d.name), c.hidden = e.join(" "), d;
      }, visible: function visible(a) {
        if (b.is.emptyString(a)) return !0;if ("all" === a) return !1;for (var c = a.split(" "), d = 0, e = c.length; e > d; d++) {
          if (this.cascade ? b.str.containsWord(this.hidden, c[d]) : c[d] == this.current.name) return !1;
        }return !0;
      }, check: function check() {
        var a = this,
            c = a.get();c instanceof b.Breakpoint && c != a.current && a.ft.raise("before.ft.breakpoints", [a.current, c]).then(function () {
          var b = a.current;return a.current = c, a.ft.draw().then(function () {
            a.ft.raise("after.ft.breakpoints", [a.current, b]);
          });
        });
      }, get: function get(a) {
        return b.is.undef(a) ? this.calculate() : a instanceof b.Breakpoint ? a : b.is.string(a) ? b.arr.first(this.array, function (b) {
          return b.name == a;
        }) : b.is.number(a) && a >= 0 && a < this.array.length ? this.array[a] : null;
      }, getWidth: function getWidth() {
        return b.is.fn(this.o.getWidth) ? this.o.getWidth(this.ft) : 1 == this.useParentWidth ? this.getParentWidth() : this.getViewportWidth();
      }, getParentWidth: function getParentWidth() {
        return this.ft.$el.parent().width();
      }, getViewportWidth: function getViewportWidth() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth, 0);
      } }), b.components.register("breakpoints", b.Breakpoints, 1e3);
  }(jQuery, FooTable), function (a) {
    a.Column.prototype.breakpoints = null, a.Column.prototype.__breakpoints_define__ = function (b) {
      this.breakpoints = a.is.emptyString(b.breakpoints) ? null : b.breakpoints;
    }, a.Column.extend("define", function (a) {
      this._super(a), this.__breakpoints_define__(a);
    });
  }(FooTable), function (a) {
    a.Defaults.prototype.breakpoints = null, a.Defaults.prototype.cascade = !1, a.Defaults.prototype.useParentWidth = !1, a.Defaults.prototype.getWidth = null;
  }(FooTable), function (a, b) {
    b.Columns = b.Component.extend({ construct: function construct(a) {
        this._super(a, !0), this.o = a.o, this.array = [], this.$header = null, this.showHeader = a.o.showHeader, this._fromHTML = b.is.emptyArray(a.o.columns);
      }, parse: function parse(c) {
        var d = this;return a.Deferred(function (c) {
          function e(c, d) {
            var e = [];if (0 == c.length || 0 == d.length) e = c.concat(d);else {
              var f = 0;b.arr.each(c.concat(d), function (a) {
                a.index > f && (f = a.index);
              }), f++;for (var g, h, i = 0; f > i; i++) {
                g = {}, b.arr.each(c, function (a) {
                  return a.index == i ? (g = a, !1) : void 0;
                }), h = {}, b.arr.each(d, function (a) {
                  return a.index == i ? (h = a, !1) : void 0;
                }), e.push(a.extend(!0, {}, g, h));
              }
            }return e;
          }var f,
              g,
              h = [],
              i = [],
              j = d.ft.$el.find("tr.footable-header, thead > tr:last:has([data-breakpoints]), tbody > tr:first:has([data-breakpoints]), thead > tr:last, tbody > tr:first").first();if (j.length > 0) {
            var k = j.parent().is("tbody") && j.children().length == j.children("td").length;k || (d.$header = j.addClass("footable-header")), j.children("td,th").each(function (b, c) {
              f = a(c), g = f.data(), g.index = b, g.$el = f, g.virtual = k, i.push(g);
            }), k && (d.showHeader = !1);
          }b.is.array(d.o.columns) && !b.is.emptyArray(d.o.columns) ? (b.arr.each(d.o.columns, function (a, b) {
            a.index = b, h.push(a);
          }), d.parseFinalize(c, e(h, i))) : b.is.promise(d.o.columns) ? d.o.columns.then(function (a) {
            b.arr.each(a, function (a, b) {
              a.index = b, h.push(a);
            }), d.parseFinalize(c, e(h, i));
          }, function (a) {
            c.reject(Error("Columns ajax request error: " + a.status + " (" + a.statusText + ")"));
          }) : d.parseFinalize(c, e(h, i));
        });
      }, parseFinalize: function parseFinalize(a, c) {
        var d,
            e = this,
            f = [];b.arr.each(c, function (a) {
          (d = b.columns.contains(a.type) ? b.columns.make(a.type, e.ft, a) : new b.Column(e.ft, a)) && f.push(d);
        }), b.is.emptyArray(f) ? a.reject(Error("No columns supplied.")) : (f.sort(function (a, b) {
          return a.index - b.index;
        }), a.resolve(f));
      }, preinit: function preinit(a) {
        var c = this;return c.ft.raise("preinit.ft.columns", [a]).then(function () {
          return c.parse(a).then(function (d) {
            c.array = d, c.showHeader = b.is["boolean"](a.showHeader) ? a.showHeader : c.showHeader;
          });
        });
      }, init: function init() {
        var a = this;return this.ft.raise("init.ft.columns", [a.array]).then(function () {
          a.$create();
        });
      }, destroy: function destroy() {
        var a = this;this.ft.raise("destroy.ft.columns").then(function () {
          a._fromHTML || a.$header.remove();
        });
      }, predraw: function predraw() {
        var a = this,
            c = !0;a.visibleColspan = 0, a.firstVisibleIndex = 0, a.lastVisibleIndex = 0, a.hasHidden = !1, b.arr.each(a.array, function (b) {
          b.hidden = !a.ft.breakpoints.visible(b.breakpoints), !b.hidden && b.visible && (c && (a.firstVisibleIndex = b.index, c = !1), a.lastVisibleIndex = b.index, a.visibleColspan++), b.hidden && (a.hasHidden = !0);
        }), a.ft.$el.toggleClass("breakpoint", a.hasHidden);
      }, draw: function draw() {
        b.arr.each(this.array, function (a) {
          a.$el.css("display", a.hidden || !a.visible ? "none" : "table-cell");
        }), !this.showHeader && b.is.jq(this.$header.parent()) && this.$header.detach();
      }, $create: function $create() {
        var c = this;c.$header = b.is.jq(c.$header) ? c.$header : a("<tr/>", { "class": "footable-header" }), c.$header.children("th,td").detach(), b.arr.each(c.array, function (a) {
          c.$header.append(a.$el);
        }), c.showHeader && !b.is.jq(c.$header.parent()) && c.ft.$el.children("thead").append(c.$header);
      }, get: function get(a) {
        return a instanceof b.Column ? a : b.is.string(a) ? b.arr.first(this.array, function (b) {
          return b.name == a;
        }) : b.is.number(a) ? b.arr.first(this.array, function (b) {
          return b.index == a;
        }) : b.is.fn(a) ? b.arr.get(this.array, a) : null;
      }, ensure: function ensure(a) {
        var c = this,
            d = [];return b.is.array(a) ? (b.arr.each(a, function (a) {
          d.push(c.get(a));
        }), d) : d;
      } }), b.components.register("columns", b.Columns, 900);
  }(jQuery, FooTable), function (a) {
    a.Defaults.prototype.columns = [], a.Defaults.prototype.showHeader = !0;
  }(FooTable), function (a, b) {
    b.Rows = b.Component.extend({ construct: function construct(a) {
        this._super(a, !0), this.o = a.o, this.array = [], this.all = [], this.showToggle = a.o.showToggle, this.toggleSelector = a.o.toggleSelector, this.toggleColumn = a.o.toggleColumn, this.emptyString = a.o.empty, this.expandFirst = a.o.expandFirst, this.expandAll = a.o.expandAll, this.$empty = null, this._fromHTML = b.is.emptyArray(a.o.rows);
      }, parse: function parse() {
        var c = this;return a.Deferred(function (a) {
          var d = c.ft.$el.children("tbody").children("tr");b.is.jq(d) ? (c.parseFinalize(a, d), d.detach()) : b.is.array(c.o.rows) && c.o.rows.length > 0 ? c.parseFinalize(a, c.o.rows) : b.is.promise(c.o.rows) ? c.o.rows.then(function (b) {
            c.parseFinalize(a, b);
          }, function (b) {
            a.reject(Error("Rows ajax request error: " + b.status + " (" + b.statusText + ")"));
          }) : c.parseFinalize(a, []);
        });
      }, parseFinalize: function parseFinalize(c, d) {
        var e = this,
            f = a.map(d, function (a) {
          return new b.Row(e.ft, e.ft.columns.array, a);
        });c.resolve(f);
      }, preinit: function preinit(a) {
        var c = this;return c.ft.raise("preinit.ft.rows", [a]).then(function () {
          return c.parse().then(function (d) {
            c.all = d, c.array = c.all.slice(0), c.showToggle = b.is["boolean"](a.showToggle) ? a.showToggle : c.showToggle, c.toggleSelector = b.is.string(a.toggleSelector) ? a.toggleSelector : c.toggleSelector, c.toggleColumn = b.is.string(a.toggleColumn) ? a.toggleColumn : c.toggleColumn, "first" != c.toggleColumn && "last" != c.toggleColumn && (c.toggleColumn = "first"), c.emptyString = b.is.string(a.empty) ? a.empty : c.emptyString, c.expandFirst = b.is["boolean"](a.expandFirst) ? a.expandFirst : c.expandFirst, c.expandAll = b.is["boolean"](a.expandAll) ? a.expandAll : c.expandAll;
          });
        });
      }, init: function init() {
        var a = this;return a.ft.raise("init.ft.rows", [a.all]).then(function () {
          a.$create();
        });
      }, destroy: function destroy() {
        var a = this;this.ft.raise("destroy.ft.rows").then(function () {
          b.arr.each(a.array, function (b) {
            b.predraw(!a._fromHTML);
          });
        });
      }, predraw: function predraw() {
        b.arr.each(this.array, function (a) {
          a.predraw();
        }), this.array = this.all.slice(0);
      }, $create: function $create() {
        this.$empty = a("<tr/>", { "class": "footable-empty" }).append(a("<td/>").text(this.emptyString));
      }, draw: function draw() {
        var a = this,
            c = a.ft.$el.children("tbody"),
            d = !0;a.array.length > 0 ? (a.$empty.detach(), b.arr.each(a.array, function (b) {
          (a.expandFirst && d || a.expandAll) && (b.expanded = !0, d = !1), b.draw(c);
        })) : (a.$empty.children("td").attr("colspan", a.ft.columns.visibleColspan), c.append(a.$empty));
      }, load: function load(c, d) {
        var e = this,
            f = a.map(c, function (a) {
          return new b.Row(e.ft, e.ft.columns.array, a);
        });b.arr.each(this.array, function (a) {
          a.predraw();
        }), this.all = (b.is["boolean"](d) ? d : !1) ? this.all.concat(f) : f, this.array = this.all.slice(0), this.ft.draw();
      }, expand: function expand() {
        b.arr.each(this.array, function (a) {
          a.expand();
        });
      }, collapse: function collapse() {
        b.arr.each(this.array, function (a) {
          a.collapse();
        });
      } }), b.components.register("rows", b.Rows, 800);
  }(jQuery, FooTable), function (a) {
    a.Defaults.prototype.rows = [], a.Defaults.prototype.empty = "No results", a.Defaults.prototype.showToggle = !0, a.Defaults.prototype.toggleSelector = "tr,td,.footable-toggle", a.Defaults.prototype.toggleColumn = "first", a.Defaults.prototype.expandFirst = !1, a.Defaults.prototype.expandAll = !1;
  }(FooTable), function (a) {
    a.Table.prototype.loadRows = function (a, b) {
      this.rows.load(a, b);
    };
  }(FooTable), function (a) {
    a.Filter = a.Class.extend({ construct: function construct(b, c, d, e, f, g, h) {
        this.name = b, this.space = !a.is.string(e) || "OR" != e && "AND" != e ? "AND" : e, this.connectors = a.is["boolean"](f) ? f : !0, this.ignoreCase = a.is["boolean"](g) ? g : !0, this.hidden = a.is["boolean"](h) ? h : !1, this.query = new a.Query(c, this.space, this.connectors, this.ignoreCase), this.columns = d;
      }, match: function match(b) {
        return a.is.string(b) ? (a.is.string(this.query) && (this.query = new a.Query(this.query, this.space, this.connectors, this.ignoreCase)), this.query instanceof a.Query ? this.query.match(b) : !1) : !1;
      }, matchRow: function matchRow(b) {
        var c = this,
            d = a.arr.map(b.cells, function (b) {
          return a.arr.contains(c.columns, b.column) ? b.filterValue : null;
        }).join(" ");return c.match(d);
      } });
  }(FooTable), function (a, b) {
    b.Filtering = b.Component.extend({ construct: function construct(a) {
        this._super(a, a.o.filtering.enabled), this.filters = a.o.filtering.filters, this.delay = a.o.filtering.delay, this.min = a.o.filtering.min, this.space = a.o.filtering.space, this.connectors = a.o.filtering.connectors, this.ignoreCase = a.o.filtering.ignoreCase, this.placeholder = a.o.filtering.placeholder, this.position = a.o.filtering.position, this.$row = null, this.$cell = null, this.$dropdown = null, this.$input = null, this.$button = null, this._filterTimeout = null;
      }, preinit: function preinit(a) {
        var c = this;this.ft.raise("preinit.ft.filtering").then(function () {
          c.ft.$el.hasClass("footable-filtering") && (c.enabled = !0), c.enabled = b.is["boolean"](a.filtering) ? a.filtering : c.enabled, c.enabled && (c.space = b.is.string(a.filterSpace) ? a.filterSpace : c.space, c.min = b.is.number(a.filterMin) ? a.filterMin : c.min, c.connectors = b.is["boolean"](a.filterConnectors) ? a.filterConnectors : c.connectors, c.ignoreCase = b.is["boolean"](a.filterIgnoreCase) ? a.filterIgnoreCase : c.ignoreCase, c.delay = b.is.number(a.filterDelay) ? a.filterDelay : c.delay, c.placeholder = b.is.string(a.filterPlaceholder) ? a.filterPlaceholder : c.placeholder, c.filters = b.is.array(a.filterFilters) ? c.ensure(a.filterFilters) : c.ensure(c.filters), c.ft.$el.hasClass("footable-filtering-left") && (c.position = "left"), c.ft.$el.hasClass("footable-filtering-center") && (c.position = "center"), c.ft.$el.hasClass("footable-filtering-right") && (c.position = "right"), c.position = b.is.string(a.filterPosition) ? a.filterPosition : c.position);
        }, function () {
          c.enabled = !1;
        });
      }, init: function init() {
        var a = this;this.ft.raise("init.ft.filtering").then(function () {
          a.$create();
        }, function () {
          a.enabled = !1;
        });
      }, destroy: function destroy() {
        var a = this;this.ft.raise("destroy.ft.filtering").then(function () {
          a.ft.$el.removeClass("footable-filtering").find("thead > tr.footable-filtering").remove();
        });
      }, $create: function $create() {
        var c,
            d = this,
            e = a("<div/>", { "class": "form-group" }).append(a("<label/>", { "class": "sr-only", text: "Search" })),
            f = a("<div/>", { "class": "input-group" }).appendTo(e),
            g = a("<div/>", { "class": "input-group-btn" }),
            h = a("<button/>", { type: "button", "class": "btn btn-default dropdown-toggle" }).on("click", { self: d }, d._onDropdownToggleClicked).append(a("<span/>", { "class": "caret" }));switch (d.position) {case "left":
            c = "footable-filtering-left";break;case "center":
            c = "footable-filtering-center";break;default:
            c = "footable-filtering-right";}d.ft.$el.addClass("footable-filtering").addClass(c), d.$row = a("<tr/>", { "class": "footable-filtering" }).prependTo(d.ft.$el.children("thead")), d.$cell = a("<th/>").attr("colspan", d.ft.columns.visibleColspan).appendTo(d.$row), d.$form = a("<form/>", { "class": "form-inline" }).append(e).appendTo(d.$cell), d.$input = a("<input/>", { type: "text", "class": "form-control", placeholder: d.placeholder }), d.$button = a("<button/>", { type: "button", "class": "btn btn-primary" }).on("click", { self: d }, d._onSearchButtonClicked).append(a("<span/>", { "class": "fooicon fooicon-search" })), d.$dropdown = a("<ul/>", { "class": "dropdown-menu dropdown-menu-right" }).append(b.arr.map(d.ft.columns.array, function (b) {
          return b.filterable ? a("<li/>").append(a("<a/>", { "class": "checkbox" }).append(a("<label/>", { text: b.title }).prepend(a("<input/>", { type: "checkbox", checked: !0 }).data("__FooTableColumn__", b)))) : null;
        })), d.delay > 0 && (d.$input.on("keypress keyup", { self: d }, d._onSearchInputChanged), d.$dropdown.on("click", 'input[type="checkbox"]', { self: d }, d._onSearchColumnClicked)), g.append(d.$button, h, d.$dropdown), f.append(d.$input, g);
      }, predraw: function predraw() {
        if (!b.is.emptyArray(this.filters)) {
          var c = this;c.ft.rows.array = a.grep(c.ft.rows.array, function (a) {
            return a.filtered(c.filters);
          });
        }
      }, draw: function draw() {
        this.$cell.attr("colspan", this.ft.columns.visibleColspan);var a = this.find("search");a instanceof b.Filter ? this.$input.val(a.query.val()) : this.$input.val(null), this.setButton(!b.arr.any(this.filters, function (a) {
          return !a.hidden;
        }));
      }, addFilter: function addFilter(a, c, d, e, f, g, h) {
        var i = b.arr.first(this.filters, function (b) {
          return b.name == a;
        });i instanceof b.Filter ? (i.name = a, i.query = c, i.columns = d, i.ignoreCase = b.is["boolean"](e) ? e : i.ignoreCase, i.connectors = b.is["boolean"](f) ? f : i.connectors, i.hidden = b.is["boolean"](h) ? h : i.hidden, i.space = !b.is.string(g) || "AND" !== g && "OR" !== g ? i.space : g) : (e = b.is["boolean"](e) ? e : self.ignoreCase, f = b.is["boolean"](f) ? f : self.connectors, g = !b.is.string(g) || "AND" !== g && "OR" !== g ? self.space : g, this.filters.push(new b.Filter(a, c, d, g, f, e, h)));
      }, removeFilter: function removeFilter(a) {
        b.arr.remove(this.filters, function (b) {
          return b.name == a;
        });
      }, filter: function filter() {
        var a = this;return a.filters = a.ensure(a.filters), a.ft.raise("before.ft.filtering", [a.filters]).then(function () {
          return a.filters = a.ensure(a.filters), a.ft.draw().then(function () {
            a.ft.raise("after.ft.filtering", [a.filters]);
          });
        });
      }, clear: function clear() {
        return this.filters = b.arr.get(this.filters, function (a) {
          return a.hidden;
        }), this.filter();
      }, setButton: function setButton(a) {
        a ? this.$button.children(".fooicon").removeClass("fooicon-remove").addClass("fooicon-search") : this.$button.children(".fooicon").removeClass("fooicon-search").addClass("fooicon-remove");
      }, find: function find(a) {
        return b.arr.first(this.filters, function (b) {
          return b.name == a;
        });
      }, columns: function columns() {
        return b.is.jq(this.$dropdown) ? this.$dropdown.find("input:checked").map(function () {
          return a(this).data("__FooTableColumn__");
        }).get() : this.ft.columns.get(function (a) {
          return a.filterable;
        });
      }, ensure: function ensure(a) {
        var c = this,
            d = [],
            e = c.columns();return b.is.emptyArray(a) || b.arr.each(a, function (a) {
          b.is.object(a) && (!b.is.emptyString(a.query) || a.query instanceof b.Query) && (a.name = b.is.emptyString(a.name) ? "anon" : a.name, a.columns = b.is.emptyArray(a.columns) ? e : c.ft.columns.ensure(a.columns), a.ignoreCase = b.is["boolean"](a.ignoreCase) ? a.ignoreCase : c.ignoreCase, a.connectors = b.is["boolean"](a.connectors) ? a.connectors : c.connectors, a.hidden = b.is["boolean"](a.hidden) ? a.hidden : !1, a.space = !b.is.string(a.space) || "AND" !== a.space && "OR" !== a.space ? c.space : a.space, d.push(a instanceof b.Filter ? a : new b.Filter(a.name, a.query, a.columns, a.space, a.connectors, a.ignoreCase, a.hidden)));
        }), d;
      }, _onSearchInputChanged: function _onSearchInputChanged(a) {
        var c = a.data.self,
            d = "keypress" == a.type && !b.is.emptyString(String.fromCharCode(a.charCode)),
            e = "keyup" == a.type && (8 == a.which || 46 == a.which);(d || e) && (13 == a.which && a.preventDefault(), null != c._filterTimeout && clearTimeout(c._filterTimeout), c._filterTimeout = setTimeout(function () {
          c._filterTimeout = null, c.addFilter("search", c.$input.val()), c.filter();
        }, c.delay));
      }, _onSearchButtonClicked: function _onSearchButtonClicked(a) {
        a.preventDefault();var b = a.data.self;null != b._filterTimeout && clearTimeout(b._filterTimeout);var c = b.$button.children(".fooicon");c.hasClass("fooicon-remove") ? b.clear() : (b.addFilter("search", b.$input.val()), b.filter());
      }, _onSearchColumnClicked: function _onSearchColumnClicked(a) {
        var b = a.data.self;null != b._filterTimeout && clearTimeout(b._filterTimeout), b._filterTimeout = setTimeout(function () {
          b._filterTimeout = null;var a = b.$button.children(".fooicon");a.hasClass("fooicon-remove") && (a.removeClass("fooicon-remove").addClass("fooicon-search"), b.addFilter("search", b.$input.val()), b.filter());
        }, b.delay);
      }, _onDropdownToggleClicked: function _onDropdownToggleClicked(b) {
        b.preventDefault(), b.stopPropagation();var c = b.data.self;c.$dropdown.parent().toggleClass("open"), c.$dropdown.parent().hasClass("open") ? a(document).on("click.footable", { self: c }, c._onDocumentClicked) : a(document).off("click.footable", c._onDocumentClicked);
      }, _onDocumentClicked: function _onDocumentClicked(b) {
        if (0 == a(b.target).closest(".dropdown-menu").length) {
          b.preventDefault();var c = b.data.self;c.$dropdown.parent().removeClass("open"), a(document).off("click.footable", c._onDocumentClicked);
        }
      } }), b.components.register("filtering", b.Filtering, 500);
  }(jQuery, FooTable), function (a) {
    a.Query = a.Class.extend({ construct: function construct(b, c, d, e) {
        this._original = null, this._value = null, this.space = !a.is.string(c) || "OR" != c && "AND" != c ? "AND" : c, this.connectors = a.is["boolean"](d) ? d : !0, this.ignoreCase = a.is["boolean"](e) ? e : !0, this.left = null, this.right = null, this.parts = [], this.operator = null, this.val(b);
      }, val: function val(b) {
        if (a.is.emptyString(b)) return this._value;if (a.is.emptyString(this._original)) this._original = b;else if (this._original == b) return;this._value = b, this._parse();
      }, match: function match(b) {
        return a.is.emptyString(this.operator) || "OR" === this.operator ? this._left(b, !1) || this._match(b, !1) || this._right(b, !1) : "AND" === this.operator ? this._left(b, !0) && this._match(b, !0) && this._right(b, !0) : void 0;
      }, _match: function _match(b, c) {
        var d = this,
            e = !1,
            f = a.is.emptyString(b);return a.is.emptyArray(d.parts) && d.left instanceof a.Query ? c : a.is.emptyArray(d.parts) ? e : ("OR" === d.space ? a.arr.each(d.parts, function (c) {
          if (c.empty && f) {
            if (e = !0, c.negate) return e = !1;
          } else {
            var g = a.str.contains(b, c.query, d.ignoreCase);if (g && !c.negate && (e = !0), g && c.negate) return e = !1;
          }
        }) : (e = !0, a.arr.each(d.parts, function (c) {
          if (c.empty) return (!f && !c.negate || f && c.negate) && (e = !1), e;var g = a.str.contains(b, c.query, d.ignoreCase);return (!g && !c.negate || g && c.negate) && (e = !1), e;
        })), e);
      }, _left: function _left(b, c) {
        return this.left instanceof a.Query ? this.left.match(b) : c;
      }, _right: function _right(b, c) {
        return this.right instanceof a.Query ? this.right.match(b) : c;
      }, _parse: function _parse() {
        if (!a.is.emptyString(this._value)) if (/\sOR\s/.test(this._value)) {
          this.operator = "OR";var b = this._value.split(/(?:\sOR\s)(.*)?/);this.left = new a.Query(b[0], this.space, this.connectors, this.ignoreCase), this.right = new a.Query(b[1], this.space, this.connectors, this.ignoreCase);
        } else if (/\sAND\s/.test(this._value)) {
          this.operator = "AND";var c = this._value.split(/(?:\sAND\s)(.*)?/);this.left = new a.Query(c[0], this.space, this.connectors, this.ignoreCase), this.right = new a.Query(c[1], this.space, this.connectors, this.ignoreCase);
        } else {
          var d = this;this.parts = a.arr.map(this._value.match(/(?:[^\s"]+|"[^"]*")+/g), function (a) {
            return d._part(a);
          });
        }
      }, _part: function _part(b) {
        var c = { query: b, negate: !1, phrase: !1, exact: !1, empty: !1 };return a.str.startsWith(c.query, "-") && (c.query = a.str.from(c.query, "-"), c.negate = !0), /^"(.*?)"$/.test(c.query) ? (c.query = c.query.replace(/^"(.*?)"$/, "$1"), c.phrase = !0, c.exact = !0) : this.connectors && /(?:\w)+?([-_\+\.])(?:\w)+?/.test(c.query) && (c.query = c.query.replace(/(?:\w)+?([-_\+\.])(?:\w)+?/g, function (a, b) {
          return a.replace(b, " ");
        }), c.phrase = !0), c.empty = c.phrase && a.is.emptyString(c.query), c;
      } });
  }(FooTable), function (a) {
    a.Cell.prototype.filterValue = null, a.Cell.prototype.__filtering_define__ = function (a) {
      this.filterValue = this.column.filterValue.call(this.column, a);
    }, a.Cell.prototype.__filtering_val__ = function (b) {
      a.is.defined(b) && (this.filterValue = this.column.filterValue.call(this.column, b));
    }, a.Cell.extend("define", function (a) {
      this._super(a), this.__filtering_define__(a);
    }), a.Cell.extend("val", function (a) {
      var b = this._super(a);return this.__filtering_val__(a), b;
    });
  }(FooTable), function (a, b) {
    b.Column.prototype.filterable = !0, b.Column.prototype.filterValue = function (c) {
      if (b.is.element(c) || b.is.jq(c)) return a(c).data("filterValue") || a(c).text();if (b.is.hash(c) && b.is.hash(c.options)) {
        if (b.is.string(c.options.filterValue)) return c.options.filterValue;b.is.defined(c.value) && (c = c.value);
      }return b.is.defined(c) && null != c ? c + "" : "";
    }, b.Column.prototype.__filtering_define__ = function (a) {
      this.filterable = b.is["boolean"](a.filterable) ? a.filterable : this.filterable;
    }, b.Column.extend("define", function (a) {
      this._super(a), this.__filtering_define__(a);
    });
  }(jQuery, FooTable), function (a) {
    a.Defaults.prototype.filtering = { enabled: !1, filters: [], delay: 1200, min: 3, space: "AND", placeholder: "Search", position: "right", connectors: !0, ignoreCase: !0 };
  }(FooTable), function (a) {
    a.Row.prototype.filtered = function (b) {
      var c = !0,
          d = this;return a.arr.each(b, function (a) {
        return 0 == (c = a.matchRow(d)) ? !1 : void 0;
      }), c;
    };
  }(FooTable), function (a, b) {
    b.Sorter = b.Class.extend({ construct: function construct(a, b) {
        this.column = a, this.direction = b;
      } });
  }(jQuery, FooTable), function (a, b) {
    b.Sorting = b.Component.extend({ construct: function construct(a) {
        this._super(a, a.o.sorting.enabled), this.o = a.o.sorting, this.column = null, this.allowed = !0, this.initial = null;
      }, preinit: function preinit(a) {
        var c = this;this.ft.raise("preinit.ft.sorting", [a]).then(function () {
          c.ft.$el.hasClass("footable-sorting") && (c.enabled = !0), c.enabled = b.is["boolean"](a.sorting) ? a.sorting : c.enabled, c.enabled && (c.column = b.arr.first(c.ft.columns.array, function (a) {
            return a.sorted;
          }));
        }, function () {
          c.enabled = !1;
        });
      }, init: function init() {
        var c = this;this.ft.raise("init.ft.sorting").then(function () {
          if (!c.initial) {
            var d = !!c.column;c.initial = { isset: d, rows: c.ft.rows.all.slice(0), column: d ? c.column.name : null, direction: d ? c.column.direction : null };
          }b.arr.each(c.ft.columns.array, function (b) {
            b.sortable && b.$el.addClass("footable-sortable").append(a("<span/>", { "class": "fooicon fooicon-sort" }));
          }), c.ft.$el.on("click.footable", ".footable-sortable", { self: c }, c._onSortClicked);
        }, function () {
          c.enabled = !1;
        });
      }, destroy: function destroy() {
        var a = this;this.ft.raise("destroy.ft.paging").then(function () {
          a.ft.$el.off("click.footable", ".footable-sortable", a._onSortClicked), a.ft.$el.children("thead").children("tr.footable-header").children(".footable-sortable").removeClass("footable-sortable footable-asc footable-desc").find("span.fooicon").remove();
        });
      }, predraw: function predraw() {
        if (this.column) {
          var a = this,
              b = a.column;a.ft.rows.array.sort(function (a, c) {
            return "DESC" == b.direction ? b.sorter(c.cells[b.index].sortValue, a.cells[b.index].sortValue) : b.sorter(a.cells[b.index].sortValue, c.cells[b.index].sortValue);
          });
        }
      }, draw: function draw() {
        if (this.column) {
          var a = this,
              b = a.ft.$el.find("thead > tr > .footable-sortable"),
              c = a.column.$el;b.removeClass("footable-asc footable-desc").children(".fooicon").removeClass("fooicon-sort fooicon-sort-asc fooicon-sort-desc"), b.not(c).children(".fooicon").addClass("fooicon-sort"), c.addClass("DESC" == a.column.direction ? "footable-desc" : "footable-asc").children(".fooicon").addClass("DESC" == a.column.direction ? "fooicon-sort-desc" : "fooicon-sort-asc");
        }
      }, sort: function sort(a, b) {
        return this._sort(a, b);
      }, toggleAllowed: function toggleAllowed(a) {
        a = b.is["boolean"](a) ? a : !this.allowed, this.allowed = a, this.ft.$el.toggleClass("footable-sorting-disabled", !this.allowed);
      }, hasChanged: function hasChanged() {
        return !(!this.initial || !this.column || this.column.name === this.initial.column && (this.column.direction === this.initial.direction || null === this.initial.direction && "ASC" === this.column.direction));
      }, reset: function reset() {
        this.initial && (this.initial.isset ? this.sort(this.initial.column, this.initial.direction) : (this.column && (this.column.$el.removeClass("footable-asc footable-desc"), this.column = null), this.ft.rows.all = this.initial.rows, this.ft.draw()));
      }, _sort: function _sort(c, d) {
        if (!this.allowed) return a.Deferred().reject("sorting disabled");var e = this,
            f = new b.Sorter(e.ft.columns.get(c), b.Sorting.dir(d));return e.ft.raise("before.ft.sorting", [f]).then(function () {
          return b.arr.each(e.ft.columns.array, function (a) {
            a != e.column && (a.direction = null);
          }), e.column = e.ft.columns.get(f.column), e.column && (e.column.direction = b.Sorting.dir(f.direction)), e.ft.draw().then(function () {
            e.ft.raise("after.ft.sorting", [f]);
          });
        });
      }, _onSortClicked: function _onSortClicked(b) {
        var c = b.data.self,
            d = a(this).closest("th,td"),
            e = d.is(".footable-asc, .footable-desc") ? d.hasClass("footable-desc") ? "ASC" : "DESC" : "ASC";c._sort(d.index(), e);
      } }), b.Sorting.dir = function (a) {
      return !b.is.string(a) || "ASC" != a && "DESC" != a ? "ASC" : a;
    }, b.components.register("sorting", b.Sorting, 600);
  }(jQuery, FooTable), function (a) {
    a.Cell.prototype.sortValue = null, a.Cell.prototype.__sorting_define__ = function (a) {
      this.sortValue = this.column.sortValue.call(this.column, a);
    }, a.Cell.prototype.__sorting_val__ = function (b) {
      a.is.defined(b) && (this.sortValue = this.column.sortValue.call(this.column, b));
    }, a.Cell.extend("define", function (a) {
      this._super(a), this.__sorting_define__(a);
    }), a.Cell.extend("val", function (a) {
      var b = this._super(a);return this.__sorting_val__(a), b;
    });
  }(FooTable), function (a, b) {
    b.Column.prototype.direction = null, b.Column.prototype.sortable = !0, b.Column.prototype.sorted = !1, b.Column.prototype.sorter = function (a, b) {
      return "string" == typeof a && (a = a.toLowerCase()), "string" == typeof b && (b = b.toLowerCase()), a === b ? 0 : b > a ? -1 : 1;
    }, b.Column.prototype.sortValue = function (c) {
      if (b.is.element(c) || b.is.jq(c)) return a(c).data("sortValue") || this.parser(c);if (b.is.hash(c) && b.is.hash(c.options)) {
        if (b.is.string(c.options.sortValue)) return c.options.sortValue;b.is.defined(c.value) && (c = c.value);
      }return b.is.defined(c) && null != c ? c : null;
    }, b.Column.prototype.__sorting_define__ = function (a) {
      this.sorter = b.checkFnValue(this, a.sorter, this.sorter), this.direction = b.is.type(a.direction, "string") ? b.Sorting.dir(a.direction) : null, this.sortable = b.is["boolean"](a.sortable) ? a.sortable : !0, this.sorted = b.is["boolean"](a.sorted) ? a.sorted : !1;
    }, b.Column.extend("define", function (a) {
      this._super(a), this.__sorting_define__(a);
    });
  }(jQuery, FooTable), function (a) {
    a.Defaults.prototype.sorting = { enabled: !1 };
  }(FooTable), function (a, b) {
    b.HTMLColumn.extend("__sorting_define__", function (c) {
      this._super(c), this.sortUse = b.is.string(c.sortUse) && -1 !== a.inArray(c.sortUse, ["html", "text"]) ? c.sortUse : "html";
    }), b.HTMLColumn.prototype.sortValue = function (c) {
      if (b.is.element(c) || b.is.jq(c)) return a(c).data("sortValue") || a.trim(a(c)[this.sortUse]());if (b.is.hash(c) && b.is.hash(c.options)) {
        if (b.is.string(c.options.sortValue)) return c.options.sortValue;b.is.defined(c.value) && (c = c.value);
      }return b.is.defined(c) && null != c ? c : null;
    };
  }(jQuery, FooTable), function (a) {
    a.Table.prototype.sort = function (b, c) {
      return this.use(a.Sorting).sort(b, c);
    };
  }(FooTable), function (a, b) {
    b.Pager = b.Class.extend({ construct: function construct(a, b, c, d, e) {
        this.total = a, this.current = b, this.size = c, this.page = d, this.forward = e;
      } });
  }(jQuery, FooTable), function (a, b) {
    b.Paging = b.Component.extend({ construct: function construct(a) {
        this._super(a, a.o.paging.enabled), this.strings = a.o.paging.strings, this.current = a.o.paging.current, this.size = a.o.paging.size, this.limit = a.o.paging.limit, this.position = a.o.paging.position, this.countFormat = a.o.paging.countFormat, this.total = -1, this.$row = null, this.$cell = null, this.$pagination = null, this.$count = null, this.detached = !1, this._previous = 1, this._total = 0;
      }, preinit: function preinit(a) {
        var c = this;this.ft.raise("preinit.ft.paging", [a]).then(function () {
          c.ft.$el.hasClass("footable-paging") && (c.enabled = !0), c.enabled = b.is["boolean"](a.paging) ? a.paging : c.enabled, c.enabled && (c.size = b.is.number(a.pagingSize) ? a.pagingSize : c.size, c.current = b.is.number(a.pagingCurrent) ? a.pagingCurrent : c.current, c.limit = b.is.number(a.pagingLimit) ? a.pagingLimit : c.limit, c.ft.$el.hasClass("footable-paging-left") && (c.position = "left"), c.ft.$el.hasClass("footable-paging-center") && (c.position = "center"), c.ft.$el.hasClass("footable-paging-right") && (c.position = "right"), c.position = b.is.string(a.pagingPosition) ? a.pagingPosition : c.position, c.countFormat = b.is.string(a.pagingCountFormat) ? a.pagingCountFormat : c.countFormat, c.total = Math.ceil(c.ft.rows.all.length / c.size));
        }, function () {
          c.enabled = !1;
        });
      }, init: function init() {
        var a = this;this.ft.raise("init.ft.paging").then(function () {
          a.$create();
        }, function () {
          a.enabled = !1;
        });
      }, destroy: function destroy() {
        var a = this;this.ft.raise("destroy.ft.paging").then(function () {
          a.ft.$el.removeClass("footable-paging").find("tfoot > tr.footable-paging").remove(), a.detached = !1;
        });
      }, predraw: function predraw() {
        this.total = Math.ceil(this.ft.rows.array.length / this.size), this.current = this.current > this.total ? this.total : this.current < 1 ? 1 : this.current, this.ft.rows.array.length > this.size && (this.ft.rows.array = this.ft.rows.array.splice((this.current - 1) * this.size, this.size));
      }, draw: function draw() {
        if (this.total <= 1) this.detached || (this.$row.detach(), this.detached = !0);else {
          if (this.detached) {
            var b = this.ft.$el.children("tfoot");0 == b.length && (b = a("<tfoot/>"), this.ft.$el.append(b)), this.$row.appendTo(b), this.detached = !1;
          }this.$cell.attr("colspan", this.ft.columns.visibleColspan), this._createLinks(), this._setVisible(this.current, this.current > this._previous), this._setNavigation(!0);
        }
      }, $create: function $create() {
        var b = "footable-paging-center";switch (this.position) {case "left":
            b = "footable-paging-left";break;case "right":
            b = "footable-paging-right";}this.ft.$el.addClass("footable-paging").addClass(b), this.$cell = a("<td/>").attr("colspan", this.ft.columns.visibleColspan);var c = this.ft.$el.children("tfoot");0 == c.length && (c = a("<tfoot/>"), this.ft.$el.append(c)), this.$row = a("<tr/>", { "class": "footable-paging" }).append(this.$cell).appendTo(c), this.$pagination = a("<ul/>", { "class": "pagination" }).on("click.footable", "a.footable-page-link", { self: this }, this._onPageClicked), this.$count = a("<span/>", { "class": "label label-default" }), this.$cell.append(this.$pagination, a("<div/>", { "class": "divider" }), this.$count), this.detached = !1, this._createLinks();
      }, first: function first() {
        return this._set(1);
      }, prev: function prev() {
        return this._set(this.current - 1 > 0 ? this.current - 1 : 1);
      }, next: function next() {
        return this._set(this.current + 1 < this.total ? this.current + 1 : this.total);
      }, last: function last() {
        return this._set(this.total);
      }, "goto": function goto(a) {
        return this._set(a > this.total ? this.total : 1 > a ? 1 : a);
      }, prevPages: function prevPages() {
        var a = this.$pagination.children("li.footable-page.visible:first").data("page") - 1;this._setVisible(a, !0), this._setNavigation(!1);
      }, nextPages: function nextPages() {
        var a = this.$pagination.children("li.footable-page.visible:last").data("page") + 1;this._setVisible(a, !1), this._setNavigation(!1);
      }, pageSize: function pageSize(a) {
        return b.is.number(a) ? (this.size = a, this.total = Math.ceil(this.ft.rows.all.length / this.size), b.is.jq(this.$row) && this.$row.remove(), this.$create(), void this.ft.draw()) : this.size;
      }, _set: function _set(c) {
        var d = this,
            e = new b.Pager(d.total, d.current, d.size, c, c > d.current);return d.ft.raise("before.ft.paging", [e]).then(function () {
          return e.page = e.page > e.total ? e.total : e.page, e.page = e.page < 1 ? 1 : e.page, d.current == c ? a.when() : (d._previous = d.current, d.current = e.page, d.ft.draw().then(function () {
            d.ft.raise("after.ft.paging", [e]);
          }));
        });
      }, _createLinks: function _createLinks() {
        if (this._total !== this.total) {
          var b = this,
              c = b.total > 1,
              d = function d(b, c, _d) {
            return a("<li/>", { "class": _d }).attr("data-page", b).append(a("<a/>", { "class": "footable-page-link", href: "#" }).data("page", b).html(c));
          };b.$pagination.empty(), c && (b.$pagination.append(d("first", b.strings.first, "footable-page-nav")), b.$pagination.append(d("prev", b.strings.prev, "footable-page-nav")), b.limit > 0 && b.limit < b.total && b.$pagination.append(d("prev-limit", b.strings.prevPages, "footable-page-nav")));for (var e, f = 0; f < b.total; f++) {
            e = d(f + 1, f + 1, "footable-page"), b.$pagination.append(e);
          }c && (b.limit > 0 && b.limit < b.total && b.$pagination.append(d("next-limit", b.strings.nextPages, "footable-page-nav")), b.$pagination.append(d("next", b.strings.next, "footable-page-nav")), b.$pagination.append(d("last", b.strings.last, "footable-page-nav"))), b._total = b.total;
        }
      }, _setNavigation: function _setNavigation(a) {
        1 == this.current ? this.$pagination.children('li[data-page="first"],li[data-page="prev"]').addClass("disabled") : this.$pagination.children('li[data-page="first"],li[data-page="prev"]').removeClass("disabled"), this.current == this.total ? this.$pagination.children('li[data-page="next"],li[data-page="last"]').addClass("disabled") : this.$pagination.children('li[data-page="next"],li[data-page="last"]').removeClass("disabled"), 1 == (this.$pagination.children("li.footable-page.visible:first").data("page") || 1) ? this.$pagination.children('li[data-page="prev-limit"]').addClass("disabled") : this.$pagination.children('li[data-page="prev-limit"]').removeClass("disabled"), (this.$pagination.children("li.footable-page.visible:last").data("page") || this.limit) == this.total ? this.$pagination.children('li[data-page="next-limit"]').addClass("disabled") : this.$pagination.children('li[data-page="next-limit"]').removeClass("disabled"), this.limit > 0 && this.total < this.limit ? this.$pagination.children('li[data-page="prev-limit"],li[data-page="next-limit"]').hide() : this.$pagination.children('li[data-page="prev-limit"],li[data-page="next-limit"]').show(), a && this.$pagination.children("li.footable-page").removeClass("active").filter('li[data-page="' + this.current + '"]').addClass("active");
      }, _setVisible: function _setVisible(a, b) {
        if (this.limit > 0 && this.total > this.limit) {
          if (!this.$pagination.children('li.footable-page[data-page="' + a + '"]').hasClass("visible")) {
            var c = 0,
                d = 0;1 == b ? (d = a > this.total ? this.total : a, c = d - this.limit) : (c = 1 > a ? 0 : a - 1, d = c + this.limit), 0 > c && (c = 0, d = this.limit > this.total ? this.total : this.limit), d > this.total && (d = this.total, c = this.total - this.limit < 0 ? 0 : this.total - this.limit), this.$pagination.children("li.footable-page").removeClass("visible").slice(c, d).addClass("visible");
          }
        } else this.$pagination.children("li.footable-page").removeClass("visible").slice(0, this.total).addClass("visible");var e = this.size * (a - 1) + 1,
            f = this.size * a,
            g = this.ft.rows.all.length;0 == this.ft.rows.array.length ? (e = 0, f = 0) : f = f > g ? g : f, this._setCount(a, this.total, e, f, g);
      }, _setCount: function _setCount(a, b, c, d, e) {
        this.$count.text(this.countFormat.replace(/\{CP}/g, a).replace(/\{TP}/g, b).replace(/\{PF}/g, c).replace(/\{PL}/g, d).replace(/\{TR}/g, e));
      }, _onPageClicked: function _onPageClicked(b) {
        if (b.preventDefault(), !a(b.target).closest("li").is(".active,.disabled")) {
          var c = b.data.self,
              d = a(this).data("page");switch (d) {case "first":
              return void c.first();case "prev":
              return void c.prev();case "next":
              return void c.next();case "last":
              return void c.last();case "prev-limit":
              return void c.prevPages();case "next-limit":
              return void c.nextPages();default:
              return void c._set(d);}
        }
      } }), b.components.register("paging", b.Paging, 400);
  }(jQuery, FooTable), function (a) {
    a.Defaults.prototype.paging = { enabled: !1, countFormat: "{CP} of {TP}", current: 1, limit: 5, position: "center", size: 10, strings: { first: "&laquo;", prev: "&lsaquo;", next: "&rsaquo;", last: "&raquo;", prevPages: "...", nextPages: "..." } };
  }(FooTable), function (a) {
    a.Table.prototype.gotoPage = function (b) {
      return this.use(a.Paging)["goto"](b);
    }, a.Table.prototype.nextPage = function () {
      return this.use(a.Paging).next();
    }, a.Table.prototype.prevPage = function () {
      return this.use(a.Paging).prev();
    }, a.Table.prototype.firstPage = function () {
      return this.use(a.Paging).first();
    }, a.Table.prototype.lastPage = function () {
      return this.use(a.Paging).last();
    }, a.Table.prototype.nextPages = function () {
      return this.use(a.Paging).nextPages();
    }, a.Table.prototype.prevPages = function () {
      return this.use(a.Paging).prevPages();
    }, a.Table.prototype.pageSize = function (b) {
      return this.use(a.Paging).pageSize(b);
    };
  }(FooTable), function (a, b) {
    b.Editing = b.Component.extend({ construct: function construct(c) {
        this._super(c, c.o.editing.enabled), this.pageToNew = c.o.editing.pageToNew, this.alwaysShow = c.o.editing.alwaysShow, this.column = a.extend(!0, {}, c.o.editing.column, { visible: this.alwaysShow }), this.position = c.o.editing.position, this.showText = c.o.editing.showText, this.hideText = c.o.editing.hideText, this.addText = c.o.editing.addText, this.editText = c.o.editing.editText, this.deleteText = c.o.editing.deleteText, this.viewText = c.o.editing.viewText, this.allowAdd = c.o.editing.allowAdd, this.allowEdit = c.o.editing.allowEdit, this.allowDelete = c.o.editing.allowDelete, this.allowView = c.o.editing.allowView, this._$buttons = null, this.callbacks = { addRow: b.checkFnValue(this, c.o.editing.addRow), editRow: b.checkFnValue(this, c.o.editing.editRow), deleteRow: b.checkFnValue(this, c.o.editing.deleteRow), viewRow: b.checkFnValue(this, c.o.editing.viewRow) };
      }, preinit: function preinit(c) {
        var d = this;this.ft.raise("preinit.ft.editing", [c]).then(function () {
          if (d.ft.$el.hasClass("footable-editing") && (d.enabled = !0), d.enabled = b.is["boolean"](c.editing) ? c.editing : d.enabled, d.enabled) {
            if (d.pageToNew = b.is["boolean"](c.editingPageToNew) ? c.editingPageToNew : d.pageToNew, d.alwaysShow = b.is["boolean"](c.editingAlwaysShow) ? c.editingAlwaysShow : d.alwaysShow, d.position = b.is.string(c.editingPosition) ? c.editingPosition : d.position, d.showText = b.is.string(c.editingShowText) ? c.editingShowText : d.showText, d.hideText = b.is.string(c.editingHideText) ? c.editingHideText : d.hideText, d.addText = b.is.string(c.editingAddText) ? c.editingAddText : d.addText, d.editText = b.is.string(c.editingEditText) ? c.editingEditText : d.editText, d.deleteText = b.is.string(c.editingDeleteText) ? c.editingDeleteText : d.deleteText, d.viewText = b.is.string(c.editingViewText) ? c.editingViewText : d.viewText, d.allowAdd = b.is["boolean"](c.editingAllowAdd) ? c.editingAllowAdd : d.allowAdd, d.allowEdit = b.is["boolean"](c.editingAllowEdit) ? c.editingAllowEdit : d.allowEdit, d.allowDelete = b.is["boolean"](c.editingAllowDelete) ? c.editingAllowDelete : d.allowDelete, d.allowView = b.is["boolean"](c.editingAllowView) ? c.editingAllowView : d.allowView, d.column = new b.EditingColumn(d.ft, d, a.extend(!0, {}, d.column, c.editingColumn, { visible: d.alwaysShow })), d.ft.$el.hasClass("footable-editing-left") && (d.position = "left"), d.ft.$el.hasClass("footable-editing-right") && (d.position = "right"), "right" === d.position) d.column.index = d.ft.columns.array.length;else {
              d.column.index = 0;for (var e = 0, f = d.ft.columns.array.length; f > e; e++) {
                d.ft.columns.array[e].index += 1;
              }
            }d.ft.columns.array.push(d.column), d.ft.columns.array.sort(function (a, b) {
              return a.index - b.index;
            }), d.callbacks.addRow = b.checkFnValue(d, c.editingAddRow, d.callbacks.addRow), d.callbacks.editRow = b.checkFnValue(d, c.editingEditRow, d.callbacks.editRow), d.callbacks.deleteRow = b.checkFnValue(d, c.editingDeleteRow, d.callbacks.deleteRow), d.callbacks.viewRow = b.checkFnValue(d, c.editingViewRow, d.callbacks.viewRow);
          }
        }, function () {
          d.enabled = !1;
        });
      }, init: function init() {
        var a = this;this.ft.raise("init.ft.editing").then(function () {
          a.$create();
        }, function () {
          a.enabled = !1;
        });
      }, destroy: function destroy() {
        var a = this;this.ft.raise("destroy.ft.editing").then(function () {
          a.ft.$el.removeClass("footable-editing footable-editing-always-show footable-editing-no-add footable-editing-no-edit footable-editing-no-delete footable-editing-no-view").off("click.ft.editing").find("tfoot > tr.footable-editing").remove();
        });
      }, $create: function $create() {
        var b = this,
            c = "right" === b.position ? "footable-editing-right" : "footable-editing-left";b.ft.$el.addClass("footable-editing").addClass(c).on("click.ft.editing", ".footable-show", { self: b }, b._onShowClick).on("click.ft.editing", ".footable-hide", { self: b }, b._onHideClick).on("click.ft.editing", ".footable-edit", { self: b }, b._onEditClick).on("click.ft.editing", ".footable-delete", { self: b }, b._onDeleteClick).on("click.ft.editing", ".footable-view", { self: b }, b._onViewClick).on("click.ft.editing", ".footable-add", { self: b }, b._onAddClick), b.$cell = a("<td/>").attr("colspan", b.ft.columns.visibleColspan).append(b.$buttonShow()), b.allowAdd && b.$cell.append(b.$buttonAdd()), b.$cell.append(b.$buttonHide()), b.alwaysShow && b.ft.$el.addClass("footable-editing-always-show"), b.allowAdd || b.ft.$el.addClass("footable-editing-no-add"), b.allowEdit || b.ft.$el.addClass("footable-editing-no-edit"), b.allowDelete || b.ft.$el.addClass("footable-editing-no-delete"), b.allowView || b.ft.$el.addClass("footable-editing-no-view");var d = b.ft.$el.children("tfoot");0 == d.length && (d = a("<tfoot/>"), b.ft.$el.append(d)), b.$row = a("<tr/>", { "class": "footable-editing" }).append(b.$cell).appendTo(d);
      }, $buttonShow: function $buttonShow() {
        return '<button type="button" class="btn btn-primary footable-show">' + this.showText + "</button>";
      }, $buttonHide: function $buttonHide() {
        return '<button type="button" class="btn btn-default footable-hide">' + this.hideText + "</button>";
      }, $buttonAdd: function $buttonAdd() {
        return '<button type="button" class="btn btn-primary footable-add">' + this.addText + "</button> ";
      }, $buttonEdit: function $buttonEdit() {
        return '<button type="button" class="btn btn-default footable-edit">' + this.editText + "</button> ";
      }, $buttonDelete: function $buttonDelete() {
        return '<button type="button" class="btn btn-default footable-delete">' + this.deleteText + "</button>";
      }, $buttonView: function $buttonView() {
        return '<button type="button" class="btn btn-default footable-view">' + this.viewText + "</button> ";
      }, $rowButtons: function $rowButtons() {
        return b.is.jq(this._$buttons) ? this._$buttons.clone() : (this._$buttons = a('<div class="btn-group btn-group-xs" role="group"></div>'), this.allowView && this._$buttons.append(this.$buttonView()), this.allowEdit && this._$buttons.append(this.$buttonEdit()), this.allowDelete && this._$buttons.append(this.$buttonDelete()), this._$buttons);
      }, draw: function draw() {
        this.$cell.attr("colspan", this.ft.columns.visibleColspan);
      }, _onEditClick: function _onEditClick(c) {
        c.preventDefault();var d = c.data.self,
            e = a(this).closest("tr").data("__FooTableRow__");e instanceof b.Row && d.ft.raise("edit.ft.editing", [e]).then(function () {
          d.callbacks.editRow.call(d.ft, e);
        });
      }, _onDeleteClick: function _onDeleteClick(c) {
        c.preventDefault();var d = c.data.self,
            e = a(this).closest("tr").data("__FooTableRow__");e instanceof b.Row && d.ft.raise("delete.ft.editing", [e]).then(function () {
          d.callbacks.deleteRow.call(d.ft, e);
        });
      }, _onViewClick: function _onViewClick(c) {
        c.preventDefault();var d = c.data.self,
            e = a(this).closest("tr").data("__FooTableRow__");e instanceof b.Row && d.ft.raise("view.ft.editing", [e]).then(function () {
          d.callbacks.viewRow.call(d.ft, e);
        });
      }, _onAddClick: function _onAddClick(a) {
        a.preventDefault();var b = a.data.self;b.ft.raise("add.ft.editing").then(function () {
          b.callbacks.addRow.call(b.ft);
        });
      }, _onShowClick: function _onShowClick(a) {
        a.preventDefault();var b = a.data.self;b.ft.raise("show.ft.editing").then(function () {
          b.ft.$el.addClass("footable-editing-show"), b.column.visible = !0, b.ft.draw();
        });
      }, _onHideClick: function _onHideClick(a) {
        a.preventDefault();var b = a.data.self;b.ft.raise("hide.ft.editing").then(function () {
          b.ft.$el.removeClass("footable-editing-show"), b.column.visible = !1, b.ft.draw();
        });
      } }), b.components.register("editing", b.Editing, 850);
  }(jQuery, FooTable), function (a, b) {
    b.EditingColumn = b.Column.extend({ construct: function construct(a, b, c) {
        this._super(a, c, "editing"), this.editing = b;
      }, $create: function $create() {
        (this.$el = !this.virtual && b.is.jq(this.$el) ? this.$el : a("<th/>", { "class": "footable-editing" })).html(this.title);
      }, parser: function parser(c) {
        if (b.is.string(c) && (c = a(a.trim(c))), b.is.element(c) && (c = a(c)), b.is.jq(c)) {
          var d = c.prop("tagName").toLowerCase();return "td" == d || "th" == d ? c.data("value") || c.contents() : c;
        }return null;
      }, createCell: function createCell(c) {
        var d = this.editing.$rowButtons(),
            e = a("<td/>").append(d);return b.is.jq(c.$el) && (0 === this.index ? e.prependTo(c.$el) : e.insertAfter(c.$el.children().eq(this.index - 1))), new b.Cell(this.ft, c, this, e || e.html());
      } }), b.columns.register("editing", b.EditingColumn);
  }(jQuery, FooTable), function (a, b) {
    b.Defaults.prototype.editing = { enabled: !1, pageToNew: !0, position: "right", alwaysShow: !1, addRow: function addRow() {}, editRow: function editRow(a) {}, deleteRow: function deleteRow(a) {}, viewRow: function viewRow(a) {}, showText: '<span class="fooicon fooicon-pencil" aria-hidden="true"></span> Edit rows', hideText: "Cancel", addText: "New row", editText: '<span class="fooicon fooicon-pencil" aria-hidden="true"></span>', deleteText: '<span class="fooicon fooicon-trash" aria-hidden="true"></span>', viewText: '<span class="fooicon fooicon-stats" aria-hidden="true"></span>', allowAdd: !0, allowEdit: !0, allowDelete: !0, allowView: !1, column: { classes: "footable-editing", name: "editing", title: "", filterable: !1, sortable: !1 } };
  }(jQuery, FooTable), function (a, b) {
    b.is.defined(b.Paging) && (b.Paging.prototype.unpaged = [], b.Paging.extend("predraw", function () {
      this.unpaged = this.ft.rows.array.slice(0), this._super();
    }));
  }(jQuery, FooTable), function (a, b) {
    b.Row.prototype.add = function (c) {
      c = b.is["boolean"](c) ? c : !0;var d = this;return a.Deferred(function (a) {
        var b = d.ft.rows.all.push(d) - 1;return c ? d.ft.draw().then(function () {
          a.resolve(b);
        }) : void a.resolve(b);
      });
    }, b.Row.prototype["delete"] = function (c) {
      c = b.is["boolean"](c) ? c : !0;var d = this;return a.Deferred(function (a) {
        var e = d.ft.rows.all.indexOf(d);return b.is.number(e) && e >= 0 && e < d.ft.rows.all.length && (d.ft.rows.all.splice(e, 1), c) ? d.ft.draw().then(function () {
          a.resolve(d);
        }) : void a.resolve(d);
      });
    }, b.is.defined(b.Paging) && b.Row.extend("add", function (a) {
      a = b.is["boolean"](a) ? a : !0;var c,
          d = this,
          e = this._super(a),
          f = d.ft.use(b.Editing);return f && f.pageToNew && (c = d.ft.use(b.Paging)) && a ? e.then(function () {
        var a = c.unpaged.indexOf(d),
            b = Math.ceil((a + 1) / c.size);return c.current !== b ? c["goto"](b) : void 0;
      }) : e;
    }), b.is.defined(b.Sorting) && b.Row.extend("val", function (a, c) {
      c = b.is["boolean"](c) ? c : !0;var d = this._super(a);if (!b.is.hash(a)) return d;var e = this;return c && e.ft.draw().then(function () {
        var a,
            c = e.ft.use(b.Editing);if (b.is.defined(b.Paging) && c && c.pageToNew && (a = e.ft.use(b.Paging))) {
          var d = a.unpaged.indexOf(e),
              f = Math.ceil((d + 1) / a.size);if (a.current !== f) return a["goto"](f);
        }
      }), d;
    });
  }(jQuery, FooTable), function (a) {
    a.Rows.prototype.add = function (b, c) {
      var d = b;a.is.hash(b) && (d = new FooTable.Row(this.ft, this.ft.columns.array, b)), d instanceof FooTable.Row && d.add(c);
    }, a.Rows.prototype.update = function (b, c, d) {
      var e = this.ft.rows.all.length,
          f = b;a.is.number(b) && b >= 0 && e > b && (f = this.ft.rows.all[b]), f instanceof FooTable.Row && a.is.hash(c) && f.val(c, d);
    }, a.Rows.prototype["delete"] = function (b, c) {
      var d = this.ft.rows.all.length,
          e = b;a.is.number(b) && b >= 0 && d > b && (e = this.ft.rows.all[b]), e instanceof FooTable.Row && e["delete"](c);
    };
  }(FooTable), function (a, b) {
    var c = 0,
        d = function (a) {
      var b,
          c,
          d = 2166136261;for (b = 0, c = a.length; c > b; b++) {
        d ^= a.charCodeAt(b), d += (d << 1) + (d << 4) + (d << 7) + (d << 8) + (d << 24);
      }return d >>> 0;
    }(location.origin + location.pathname);b.State = b.Component.extend({ construct: function construct(a) {
        this._super(a, a.o.state.enabled), this._key = "1", this.key = this._key + (b.is.string(a.o.state.key) ? a.o.state.key : this._uid()), this.filtering = b.is["boolean"](a.o.state.filtering) ? a.o.state.filtering : !0, this.paging = b.is["boolean"](a.o.state.paging) ? a.o.state.paging : !0, this.sorting = b.is["boolean"](a.o.state.sorting) ? a.o.state.sorting : !0;
      }, preinit: function preinit(a) {
        var c = this;this.ft.raise("preinit.ft.state", [a]).then(function () {
          c.enabled = b.is["boolean"](a.state) ? a.state : c.enabled, c.enabled && (c.key = c._key + (b.is.string(a.stateKey) ? a.stateKey : c.key), c.filtering = b.is["boolean"](a.stateFiltering) ? a.stateFiltering : c.filtering, c.paging = b.is["boolean"](a.statePaging) ? a.statePaging : c.paging, c.sorting = b.is["boolean"](a.stateSorting) ? a.stateSorting : c.sorting);
        }, function () {
          c.enabled = !1;
        });
      }, get: function get(a) {
        return JSON.parse(localStorage.getItem(this.key + ":" + a));
      }, set: function set(a, b) {
        localStorage.setItem(this.key + ":" + a, JSON.stringify(b));
      }, remove: function remove(a) {
        localStorage.removeItem(this.key + ":" + a);
      }, read: function read() {
        this.ft.execute(!1, !0, "readState");
      }, write: function write() {
        this.ft.execute(!1, !0, "writeState");
      }, clear: function clear() {
        this.ft.execute(!1, !0, "clearState");
      }, _uid: function _uid() {
        var a = this.ft.$el.attr("id");return d + "_" + (b.is.string(a) ? a : ++c);
      } }), b.components.register("state", b.State, 700);
  }(jQuery, FooTable), function (a) {
    a.Component.prototype.readState = function () {}, a.Component.prototype.writeState = function () {}, a.Component.prototype.clearState = function () {};
  }(FooTable), function (a) {
    a.Defaults.prototype.state = { enabled: !1, filtering: !0, paging: !0, sorting: !0, key: null };
  }(FooTable), function (a) {
    a.Filtering && (a.Filtering.prototype.readState = function () {
      if (this.ft.state.filtering) {
        var b = this.ft.state.get("filtering");a.is.hash(b) && !a.is.emptyArray(b.filters) && (this.filters = this.ensure(b.filters));
      }
    }, a.Filtering.prototype.writeState = function () {
      if (this.ft.state.filtering) {
        var b = a.arr.map(this.filters, function (b) {
          return { name: b.name, query: b.query instanceof a.Query ? b.query.val() : b.query, columns: a.arr.map(b.columns, function (a) {
              return a.name;
            }), hidden: b.hidden, space: b.space, connectors: b.connectors, ignoreCase: b.ignoreCase };
        });this.ft.state.set("filtering", { filters: b });
      }
    }, a.Filtering.prototype.clearState = function () {
      this.ft.state.filtering && this.ft.state.remove("filtering");
    });
  }(FooTable), function (a) {
    a.Paging && (a.Paging.prototype.readState = function () {
      if (this.ft.state.paging) {
        var b = this.ft.state.get("paging");a.is.hash(b) && (this.current = b.current, this.size = b.size);
      }
    }, a.Paging.prototype.writeState = function () {
      this.ft.state.paging && this.ft.state.set("paging", { current: this.current, size: this.size });
    }, a.Paging.prototype.clearState = function () {
      this.ft.state.paging && this.ft.state.remove("paging");
    });
  }(FooTable), function (a) {
    a.Sorting && (a.Sorting.prototype.readState = function () {
      if (this.ft.state.sorting) {
        var b = this.ft.state.get("sorting");if (a.is.hash(b)) {
          var c = this.ft.columns.get(b.column);c instanceof a.Column && (this.column = c, this.column.direction = b.direction);
        }
      }
    }, a.Sorting.prototype.writeState = function () {
      this.ft.state.sorting && this.column instanceof a.Column && this.ft.state.set("sorting", { column: this.column.name, direction: this.column.direction });
    }, a.Sorting.prototype.clearState = function () {
      this.ft.state.sorting && this.ft.state.remove("sorting");
    });
  }(FooTable), function (a) {
    a.Table.extend("_construct", function (a) {
      this.state = this.use(FooTable.State), this._super(a);
    }), a.Table.extend("_preinit", function () {
      var a = this;return a._super().then(function () {
        a.state.enabled && a.state.read();
      });
    }), a.Table.extend("draw", function () {
      var a = this;return a._super().then(function () {
        a.state.enabled && a.state.write();
      });
    });
  }(FooTable);
});
define('views/home/home',['exports', 'aurelia-framework', '../../app-service', 'aurelia-router'], function (exports, _aureliaFramework, _appService, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_appService.AppHttpClient, _aureliaRouter.Router), _dec(_class = function () {
    function Home(http, router) {
      _classCallCheck(this, Home);

      this.http = http;
      this.router = router;
    }

    Home.prototype.getData = function getData() {

      this.http.fetch('/countries').then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
      });
      this.router.navigate('users');
    };

    return Home;
  }()) || _class);
});
define('views/users/users',['exports', 'jquery', 'aurelia-framework', '../../app-service'], function (exports, _jquery, _aureliaFramework, _appService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Users = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_appService.AppHttpClient), _dec(_class = function () {
    function Users(http) {
      var _this = this;

      _classCallCheck(this, Users);

      this.editing = false;
      this.users = [];

      this.http = http;
      this.http.fetch('/users').then(function (response) {
        return response.json();
      }).then(function (users) {
        return _this.users = users;
      });
    }

    Users.prototype.sort = function sort() {
      this.users.sort(function (a, b) {
        return a.name - b.name;
      });
    };

    Users.prototype.edit = function edit(user) {
      this.oldUsers = this.users;
      this.editing = user;
    };

    Users.prototype.cancel = function cancel(user) {
      this.editing = false;
    };

    Users.prototype.save = function save(user) {
      this.http.fetch('/users/' + user._id, {
        method: "PUT",
        body: JSON.stringify(user)
      }).then(function (response) {
        return response.json();
      }).then(function (data) {});
      this.editing = false;
    };

    Users.prototype.delete = function _delete(user) {
      this.http.fetch('/users/' + user._id, {
        method: "DELETE",
        body: JSON.stringify(user)
      }).then(function (response) {
        return response.json();
      }).then(function (data) {});

      this.users = this.users.filter(function (item) {
        return item._id !== user._id;
      });

      this.editing = false;
    };

    return Users;
  }()) || _class);
});
define('assets/bootstrap/js/bootstrap.min',[], function () {
  "use strict";

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");+function (a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher");
  }(jQuery), +function (a) {
    "use strict";
    function b() {
      var a = document.createElement("bootstrap"),
          b = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" };for (var c in b) {
        if (void 0 !== a.style[c]) return { end: b[c] };
      }return !1;
    }a.fn.emulateTransitionEnd = function (b) {
      var c = !1,
          d = this;a(this).one("bsTransitionEnd", function () {
        c = !0;
      });var e = function e() {
        c || a(d).trigger(a.support.transition.end);
      };return setTimeout(e, b), this;
    }, a(function () {
      a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = { bindType: a.support.transition.end, delegateType: a.support.transition.end, handle: function handle(b) {
          return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0;
        } });
    });
  }(jQuery), +function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var c = a(this),
            e = c.data("bs.alert");e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c);
      });
    }var c = '[data-dismiss="alert"]',
        d = function d(b) {
      a(b).on("click", c, this.close);
    };d.VERSION = "3.3.5", d.TRANSITION_DURATION = 150, d.prototype.close = function (b) {
      function c() {
        g.detach().trigger("closed.bs.alert").remove();
      }var e = a(this),
          f = e.attr("data-target");f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));var g = a(f);b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c());
    };var e = a.fn.alert;a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
      return a.fn.alert = e, this;
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close);
  }(jQuery), +function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
            e = d.data("bs.button"),
            f = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b);
      });
    }var c = function c(b, d) {
      this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1;
    };c.VERSION = "3.3.5", c.DEFAULTS = { loadingText: "loading..." }, c.prototype.setState = function (b) {
      var c = "disabled",
          d = this.$element,
          e = d.is("input") ? "val" : "html",
          f = d.data();b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function () {
        d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c));
      }, this), 0);
    }, c.prototype.toggle = function () {
      var a = !0,
          b = this.$element.closest('[data-toggle="buttons"]');if (b.length) {
        var c = this.$element.find("input");"radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change");
      } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
    };var d = a.fn.button;a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
      return a.fn.button = d, this;
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
      var d = a(c.target);d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), a(c.target).is('input[type="radio"]') || a(c.target).is('input[type="checkbox"]') || c.preventDefault();
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (b) {
      a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type));
    });
  }(jQuery), +function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
            e = d.data("bs.carousel"),
            f = a.extend({}, c.DEFAULTS, d.data(), "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b),
            g = "string" == typeof b ? b : f.slide;e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle();
      });
    }var c = function c(b, _c) {
      this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = _c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this));
    };c.VERSION = "3.3.5", c.TRANSITION_DURATION = 600, c.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0, keyboard: !0 }, c.prototype.keydown = function (a) {
      if (!/input|textarea/i.test(a.target.tagName)) {
        switch (a.which) {case 37:
            this.prev();break;case 39:
            this.next();break;default:
            return;}a.preventDefault();
      }
    }, c.prototype.cycle = function (b) {
      return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this;
    }, c.prototype.getItemIndex = function (a) {
      return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active);
    }, c.prototype.getItemForDirection = function (a, b) {
      var c = this.getItemIndex(b),
          d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;if (d && !this.options.wrap) return b;var e = "prev" == a ? -1 : 1,
          f = (c + e) % this.$items.length;return this.$items.eq(f);
    }, c.prototype.to = function (a) {
      var b = this,
          c = this.getItemIndex(this.$active = this.$element.find(".item.active"));return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
        b.to(a);
      }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a));
    }, c.prototype.pause = function (b) {
      return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this;
    }, c.prototype.next = function () {
      return this.sliding ? void 0 : this.slide("next");
    }, c.prototype.prev = function () {
      return this.sliding ? void 0 : this.slide("prev");
    }, c.prototype.slide = function (b, d) {
      var e = this.$element.find(".item.active"),
          f = d || this.getItemForDirection(b, e),
          g = this.interval,
          h = "next" == b ? "left" : "right",
          i = this;if (f.hasClass("active")) return this.sliding = !1;var j = f[0],
          k = a.Event("slide.bs.carousel", { relatedTarget: j, direction: h });if (this.$element.trigger(k), !k.isDefaultPrevented()) {
        if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
          this.$indicators.find(".active").removeClass("active");var l = a(this.$indicators.children()[this.getItemIndex(f)]);l && l.addClass("active");
        }var m = a.Event("slid.bs.carousel", { relatedTarget: j, direction: h });return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function () {
          f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function () {
            i.$element.trigger(m);
          }, 0);
        }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this;
      }
    };var d = a.fn.carousel;a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
      return a.fn.carousel = d, this;
    };var e = function e(c) {
      var d,
          e = a(this),
          f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));if (f.hasClass("carousel")) {
        var g = a.extend({}, f.data(), e.data()),
            h = e.attr("data-slide-to");h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault();
      }
    };a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function () {
      a('[data-ride="carousel"]').each(function () {
        var c = a(this);b.call(c, c.data());
      });
    });
  }(jQuery), +function (a) {
    "use strict";
    function b(b) {
      var c,
          d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");return a(d);
    }function c(b) {
      return this.each(function () {
        var c = a(this),
            e = c.data("bs.collapse"),
            f = a.extend({}, d.DEFAULTS, c.data(), "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b);!e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]();
      });
    }var d = function d(b, c) {
      this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle();
    };d.VERSION = "3.3.5", d.TRANSITION_DURATION = 350, d.DEFAULTS = { toggle: !0 }, d.prototype.dimension = function () {
      var a = this.$element.hasClass("width");return a ? "width" : "height";
    }, d.prototype.show = function () {
      if (!this.transitioning && !this.$element.hasClass("in")) {
        var b,
            e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
          var f = a.Event("show.bs.collapse");if (this.$element.trigger(f), !f.isDefaultPrevented()) {
            e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));var g = this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;var h = function h() {
              this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse");
            };if (!a.support.transition) return h.call(this);var i = a.camelCase(["scroll", g].join("-"));this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i]);
          }
        }
      }
    }, d.prototype.hide = function () {
      if (!this.transitioning && this.$element.hasClass("in")) {
        var b = a.Event("hide.bs.collapse");if (this.$element.trigger(b), !b.isDefaultPrevented()) {
          var c = this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;var e = function e() {
            this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
          };return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this);
        }
      }
    }, d.prototype.toggle = function () {
      this[this.$element.hasClass("in") ? "hide" : "show"]();
    }, d.prototype.getParent = function () {
      return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (c, d) {
        var e = a(d);this.addAriaAndCollapsedClass(b(e), e);
      }, this)).end();
    }, d.prototype.addAriaAndCollapsedClass = function (a, b) {
      var c = a.hasClass("in");a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c);
    };var e = a.fn.collapse;a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {
      return a.fn.collapse = e, this;
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (d) {
      var e = a(this);e.attr("data-target") || d.preventDefault();var f = b(e),
          g = f.data("bs.collapse"),
          h = g ? "toggle" : e.data();c.call(f, h);
    });
  }(jQuery), +function (a) {
    "use strict";
    function b(b) {
      var c = b.attr("data-target");c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));var d = c && a(c);return d && d.length ? d : b.parent();
    }function c(c) {
      c && 3 === c.which || (a(e).remove(), a(f).each(function () {
        var d = a(this),
            e = b(d),
            f = { relatedTarget: this };e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger("hidden.bs.dropdown", f))));
      }));
    }function d(b) {
      return this.each(function () {
        var c = a(this),
            d = c.data("bs.dropdown");d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c);
      });
    }var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function g(b) {
      a(b).on("click.bs.dropdown", this.toggle);
    };g.VERSION = "3.3.5", g.prototype.toggle = function (d) {
      var e = a(this);if (!e.is(".disabled, :disabled")) {
        var f = b(e),
            g = f.hasClass("open");if (c(), !g) {
          "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);var h = { relatedTarget: this };if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h);
        }return !1;
      }
    }, g.prototype.keydown = function (c) {
      if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
        var d = a(this);if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
          var e = b(d),
              g = e.hasClass("open");if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");var h = " li:not(.disabled):visible a",
              i = e.find(".dropdown-menu" + h);if (i.length) {
            var j = i.index(c.target);38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus");
          }
        }
      }
    };var h = a.fn.dropdown;a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
      return a.fn.dropdown = h, this;
    }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
      a.stopPropagation();
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown);
  }(jQuery), +function (a) {
    "use strict";
    function b(b, d) {
      return this.each(function () {
        var e = a(this),
            f = e.data("bs.modal"),
            g = a.extend({}, c.DEFAULTS, e.data(), "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b);f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d);
      });
    }var c = function c(b, _c2) {
      this.options = _c2, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
        this.$element.trigger("loaded.bs.modal");
      }, this));
    };c.VERSION = "3.3.5", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }, c.prototype.toggle = function (a) {
      return this.isShown ? this.hide() : this.show(a);
    }, c.prototype.show = function (b) {
      var d = this,
          e = a.Event("show.bs.modal", { relatedTarget: b });this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
        d.$element.one("mouseup.dismiss.bs.modal", function (b) {
          a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0);
        });
      }), this.backdrop(function () {
        var e = a.support.transition && d.$element.hasClass("fade");d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();var f = a.Event("shown.bs.modal", { relatedTarget: b });e ? d.$dialog.one("bsTransitionEnd", function () {
          d.$element.trigger("focus").trigger(f);
        }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f);
      }));
    }, c.prototype.hide = function (b) {
      b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal());
    }, c.prototype.enforceFocus = function () {
      a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
        this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus");
      }, this));
    }, c.prototype.escape = function () {
      this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function (a) {
        27 == a.which && this.hide();
      }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
    }, c.prototype.resize = function () {
      this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal");
    }, c.prototype.hideModal = function () {
      var a = this;this.$element.hide(), this.backdrop(function () {
        a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal");
      });
    }, c.prototype.removeBackdrop = function () {
      this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
    }, c.prototype.backdrop = function (b) {
      var d = this,
          e = this.$element.hasClass("fade") ? "fade" : "";if (this.isShown && this.options.backdrop) {
        var f = a.support.transition && e;if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
          return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
        }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b();
      } else if (!this.isShown && this.$backdrop) {
        this.$backdrop.removeClass("in");var g = function g() {
          d.removeBackdrop(), b && b();
        };a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g();
      } else b && b();
    }, c.prototype.handleUpdate = function () {
      this.adjustDialog();
    }, c.prototype.adjustDialog = function () {
      var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;this.$element.css({ paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "", paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : "" });
    }, c.prototype.resetAdjustments = function () {
      this.$element.css({ paddingLeft: "", paddingRight: "" });
    }, c.prototype.checkScrollbar = function () {
      var a = window.innerWidth;if (!a) {
        var b = document.documentElement.getBoundingClientRect();a = b.right - Math.abs(b.left);
      }this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar();
    }, c.prototype.setScrollbar = function () {
      var a = parseInt(this.$body.css("padding-right") || 0, 10);this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth);
    }, c.prototype.resetScrollbar = function () {
      this.$body.css("padding-right", this.originalBodyPad);
    }, c.prototype.measureScrollbar = function () {
      var a = document.createElement("div");a.className = "modal-scrollbar-measure", this.$body.append(a);var b = a.offsetWidth - a.clientWidth;return this.$body[0].removeChild(a), b;
    };var d = a.fn.modal;a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
      return a.fn.modal = d, this;
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
      var d = a(this),
          e = d.attr("href"),
          f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
          g = f.data("bs.modal") ? "toggle" : a.extend({ remote: !/#/.test(e) && e }, f.data(), d.data());d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
        a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
          d.is(":visible") && d.trigger("focus");
        });
      }), b.call(f, g, this);
    });
  }(jQuery), +function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
            e = d.data("bs.tooltip"),
            f = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;(e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]());
      });
    }var c = function c(a, b) {
      this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b);
    };c.VERSION = "3.3.5", c.TRANSITION_DURATION = 150, c.DEFAULTS = { animation: !0, placement: "top", selector: !1, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1, viewport: { selector: "body", padding: 0 } }, c.prototype.init = function (b, c, d) {
      if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = { click: !1, hover: !1, focus: !1 }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
        var g = e[f];if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));else if ("manual" != g) {
          var h = "hover" == g ? "mouseenter" : "focusin",
              i = "hover" == g ? "mouseleave" : "focusout";this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this));
        }
      }this.options.selector ? this._options = a.extend({}, this.options, { trigger: "manual", selector: "" }) : this.fixTitle();
    }, c.prototype.getDefaults = function () {
      return c.DEFAULTS;
    }, c.prototype.getOptions = function (b) {
      return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = { show: b.delay, hide: b.delay }), b;
    }, c.prototype.getDelegateOptions = function () {
      var b = {},
          c = this.getDefaults();return this._options && a.each(this._options, function (a, d) {
        c[a] != d && (b[a] = d);
      }), b;
    }, c.prototype.enter = function (b) {
      var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void (c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function () {
        "in" == c.hoverState && c.show();
      }, c.options.delay.show)) : c.show());
    }, c.prototype.isInStateTrue = function () {
      for (var a in this.inState) {
        if (this.inState[a]) return !0;
      }return !1;
    }, c.prototype.leave = function (b) {
      var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), c.isInStateTrue() ? void 0 : (clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function () {
        "out" == c.hoverState && c.hide();
      }, c.options.delay.hide)) : c.hide());
    }, c.prototype.show = function () {
      var b = a.Event("show.bs." + this.type);if (this.hasContent() && this.enabled) {
        this.$element.trigger(b);var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);if (b.isDefaultPrevented() || !d) return;var e = this,
            f = this.tip(),
            g = this.getUID(this.type);this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
            i = /\s?auto?\s?/i,
            j = i.test(h);j && (h = h.replace(i, "") || "top"), f.detach().css({ top: 0, left: 0, display: "block" }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);var k = this.getPosition(),
            l = f[0].offsetWidth,
            m = f[0].offsetHeight;if (j) {
          var n = h,
              o = this.getPosition(this.$viewport);h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h);
        }var p = this.getCalculatedOffset(h, k, l, m);this.applyPlacement(p, h);var q = function q() {
          var a = e.hoverState;e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e);
        };a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q();
      }
    }, c.prototype.applyPlacement = function (b, c) {
      var d = this.tip(),
          e = d[0].offsetWidth,
          f = d[0].offsetHeight,
          g = parseInt(d.css("margin-top"), 10),
          h = parseInt(d.css("margin-left"), 10);isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({ using: function using(a) {
          d.css({ top: Math.round(a.top), left: Math.round(a.left) });
        } }, b), 0), d.addClass("in");var i = d[0].offsetWidth,
          j = d[0].offsetHeight;"top" == c && j != f && (b.top = b.top + f - j);var k = this.getViewportAdjustedDelta(c, b, i, j);k.left ? b.left += k.left : b.top += k.top;var l = /top|bottom/.test(c),
          m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
          n = l ? "offsetWidth" : "offsetHeight";d.offset(b), this.replaceArrow(m, d[0][n], l);
    }, c.prototype.replaceArrow = function (a, b, c) {
      this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "");
    }, c.prototype.setContent = function () {
      var a = this.tip(),
          b = this.getTitle();a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right");
    }, c.prototype.hide = function (b) {
      function d() {
        "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b();
      }var e = this,
          f = a(this.$tip),
          g = a.Event("hide.bs." + this.type);return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this);
    }, c.prototype.fixTitle = function () {
      var a = this.$element;(a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "");
    }, c.prototype.hasContent = function () {
      return this.getTitle();
    }, c.prototype.getPosition = function (b) {
      b = b || this.$element;var c = b[0],
          d = "BODY" == c.tagName,
          e = c.getBoundingClientRect();null == e.width && (e = a.extend({}, e, { width: e.right - e.left, height: e.bottom - e.top }));var f = d ? { top: 0, left: 0 } : b.offset(),
          g = { scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop() },
          h = d ? { width: a(window).width(), height: a(window).height() } : null;return a.extend({}, e, g, h, f);
    }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
      return "bottom" == a ? { top: b.top + b.height, left: b.left + b.width / 2 - c / 2 } : "top" == a ? { top: b.top - d, left: b.left + b.width / 2 - c / 2 } : "left" == a ? { top: b.top + b.height / 2 - d / 2, left: b.left - c } : { top: b.top + b.height / 2 - d / 2, left: b.left + b.width };
    }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
      var e = { top: 0, left: 0 };if (!this.$viewport) return e;var f = this.options.viewport && this.options.viewport.padding || 0,
          g = this.getPosition(this.$viewport);if (/right|left/.test(a)) {
        var h = b.top - f - g.scroll,
            i = b.top + f - g.scroll + d;h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i);
      } else {
        var j = b.left - f,
            k = b.left + f + c;j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k);
      }return e;
    }, c.prototype.getTitle = function () {
      var a,
          b = this.$element,
          c = this.options;return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title);
    }, c.prototype.getUID = function (a) {
      do {
        a += ~~(1e6 * Math.random());
      } while (document.getElementById(a));return a;
    }, c.prototype.tip = function () {
      if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");return this.$tip;
    }, c.prototype.arrow = function () {
      return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }, c.prototype.enable = function () {
      this.enabled = !0;
    }, c.prototype.disable = function () {
      this.enabled = !1;
    }, c.prototype.toggleEnabled = function () {
      this.enabled = !this.enabled;
    }, c.prototype.toggle = function (b) {
      var c = this;b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
    }, c.prototype.destroy = function () {
      var a = this;clearTimeout(this.timeout), this.hide(function () {
        a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null;
      });
    };var d = a.fn.tooltip;a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
      return a.fn.tooltip = d, this;
    };
  }(jQuery), +function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
            e = d.data("bs.popover"),
            f = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;(e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]());
      });
    }var c = function c(a, b) {
      this.init("popover", a, b);
    };if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");c.VERSION = "3.3.5", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>' }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
      return c.DEFAULTS;
    }, c.prototype.setContent = function () {
      var a = this.tip(),
          b = this.getTitle(),
          c = this.getContent();a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide();
    }, c.prototype.hasContent = function () {
      return this.getTitle() || this.getContent();
    }, c.prototype.getContent = function () {
      var a = this.$element,
          b = this.options;return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content);
    }, c.prototype.arrow = function () {
      return this.$arrow = this.$arrow || this.tip().find(".arrow");
    };var d = a.fn.popover;a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
      return a.fn.popover = d, this;
    };
  }(jQuery), +function (a) {
    "use strict";
    function b(c, d) {
      this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process();
    }function c(c) {
      return this.each(function () {
        var d = a(this),
            e = d.data("bs.scrollspy"),
            f = "object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) && c;e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]();
      });
    }b.VERSION = "3.3.5", b.DEFAULTS = { offset: 10 }, b.prototype.getScrollHeight = function () {
      return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
    }, b.prototype.refresh = function () {
      var b = this,
          c = "offset",
          d = 0;this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
        var b = a(this),
            e = b.data("target") || b.attr("href"),
            f = /^#./.test(e) && a(e);return f && f.length && f.is(":visible") && [[f[c]().top + d, e]] || null;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).each(function () {
        b.offsets.push(this[0]), b.targets.push(this[1]);
      });
    }, b.prototype.process = function () {
      var a,
          b = this.$scrollElement.scrollTop() + this.options.offset,
          c = this.getScrollHeight(),
          d = this.options.offset + c - this.$scrollElement.height(),
          e = this.offsets,
          f = this.targets,
          g = this.activeTarget;if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);if (g && b < e[0]) return this.activeTarget = null, this.clear();for (a = e.length; a--;) {
        g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a]);
      }
    }, b.prototype.activate = function (b) {
      this.activeTarget = b, this.clear();var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
          d = a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy");
    }, b.prototype.clear = function () {
      a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    };var d = a.fn.scrollspy;a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
      return a.fn.scrollspy = d, this;
    }, a(window).on("load.bs.scrollspy.data-api", function () {
      a('[data-spy="scroll"]').each(function () {
        var b = a(this);c.call(b, b.data());
      });
    });
  }(jQuery), +function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
            e = d.data("bs.tab");e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]();
      });
    }var c = function c(b) {
      this.element = a(b);
    };c.VERSION = "3.3.5", c.TRANSITION_DURATION = 150, c.prototype.show = function () {
      var b = this.element,
          c = b.closest("ul:not(.dropdown-menu)"),
          d = b.data("target");if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
        var e = c.find(".active:last a"),
            f = a.Event("hide.bs.tab", { relatedTarget: b[0] }),
            g = a.Event("show.bs.tab", { relatedTarget: e[0] });if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
          var h = a(d);this.activate(b.closest("li"), c), this.activate(h, h.parent(), function () {
            e.trigger({ type: "hidden.bs.tab", relatedTarget: b[0] }), b.trigger({ type: "shown.bs.tab", relatedTarget: e[0] });
          });
        }
      }
    }, c.prototype.activate = function (b, d, e) {
      function f() {
        g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e();
      }var g = d.find("> .active"),
          h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in");
    };var d = a.fn.tab;a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
      return a.fn.tab = d, this;
    };var e = function e(c) {
      c.preventDefault(), b.call(a(this), "show");
    };a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e);
  }(jQuery), +function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
            e = d.data("bs.affix"),
            f = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]();
      });
    }var c = function c(b, d) {
      this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition();
    };c.VERSION = "3.3.5", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = { offset: 0, target: window }, c.prototype.getState = function (a, b, c, d) {
      var e = this.$target.scrollTop(),
          f = this.$element.offset(),
          g = this.$target.height();if (null != c && "top" == this.affixed) return c > e ? "top" : !1;if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";var h = null == this.affixed,
          i = h ? e : f.top,
          j = h ? g : b;return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1;
    }, c.prototype.getPinnedOffset = function () {
      if (this.pinnedOffset) return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a = this.$target.scrollTop(),
          b = this.$element.offset();return this.pinnedOffset = b.top - a;
    }, c.prototype.checkPositionWithEventLoop = function () {
      setTimeout(a.proxy(this.checkPosition, this), 1);
    }, c.prototype.checkPosition = function () {
      if (this.$element.is(":visible")) {
        var b = this.$element.height(),
            d = this.options.offset,
            e = d.top,
            f = d.bottom,
            g = Math.max(a(document).height(), a(document.body).height());"object" != (typeof d === "undefined" ? "undefined" : _typeof(d)) && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));var h = this.getState(g, b, e, f);if (this.affixed != h) {
          null != this.unpin && this.$element.css("top", "");var i = "affix" + (h ? "-" + h : ""),
              j = a.Event(i + ".bs.affix");if (this.$element.trigger(j), j.isDefaultPrevented()) return;this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix");
        }"bottom" == h && this.$element.offset({ top: g - b - f });
      }
    };var d = a.fn.affix;a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
      return a.fn.affix = d, this;
    }, a(window).on("load", function () {
      a('[data-spy="affix"]').each(function () {
        var c = a(this),
            d = c.data();d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d);
      });
    });
  }(jQuery);
});
define('views/auth/login/login',['exports', 'aurelia-fetch-client'], function (exports, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Login = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var httpClient = new _aureliaFetchClient.HttpClient().configure(function (x) {
    x.withBaseUrl('http://localhost:3000/api/');
  });

  var Login = exports.Login = function () {
    function Login() {
      _classCallCheck(this, Login);

      this.email = '';
      this.password = '';
    }

    Login.prototype.login = function login() {
      var myUser = { email: this.email, password: this.password };
      console.log(myUser);
    };

    Login.prototype.getData = function getData() {
      httpClient.fetch('countries/').then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
      });
    };

    return Login;
  }();
});
define('views/auth/signup/signup',['exports', 'aurelia-framework', 'aurelia-router', '../../../app-service'], function (exports, _aureliaFramework, _aureliaRouter, _appService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Signup = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Signup = exports.Signup = (_dec = (0, _aureliaFramework.inject)(_appService.AppHttpClient, _aureliaRouter.Router), _dec(_class = function () {
    function Signup(http, router) {
      _classCallCheck(this, Signup);

      this.http = http;
      this.router = router;

      this.name = '';
      this.email = '';
      this.password = '';
      this.admin = false;
    }

    Signup.prototype.signup = function signup() {
      var _this = this;

      var user = {
        name: this.name,
        email: this.email,
        password: this.password,
        admin: this.admin
      };
      this.http.fetch('/users', {
        method: "POST",
        body: JSON.stringify(user)
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.success) _this.router.navigate('users');
      });
    };

    return Signup;
  }()) || _class);
});
define('views/users/sort',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var SortValueConverter = exports.SortValueConverter = function () {
    function SortValueConverter() {
      _classCallCheck(this, SortValueConverter);
    }

    SortValueConverter.prototype.toView = function toView(array, propertyName, direction) {
      var factor = direction === 'ascending' ? 1 : -1;
      return array.slice(0).sort(function (a, b) {
        return (a[propertyName] - b[propertyName]) * factor;
      });
    };

    return SortValueConverter;
  }();
});
define('views/users/take',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var TakeValueConverter = exports.TakeValueConverter = function () {
    function TakeValueConverter() {
      _classCallCheck(this, TakeValueConverter);
    }

    TakeValueConverter.prototype.toView = function toView(array, count) {
      return array.slice(0, count);
    };

    return TakeValueConverter;
  }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>    \n    <require from=\"./assets/bootstrap/css/bootstrap.min.css\"></require>\n    <require from=\"./assets/css/styles.css\"></require>\n    <!--<require from=\"./sidebar.css\"></require>   -->\n      \n    <!--<div id=\"wrapper\">\n\n        <div id=\"sidebar-wrapper\">\n            <ul class=\"sidebar-nav\">\n                <li class=\"sidebar-brand\">\n                    <a href=\"/\">\n                        Aurelia Examples\n                    </a>\n                </li>\n                <li><a href=\"/login\">Login</a></li>\n                <li><a href=\"/signup\">SignUp</a></li>\n                <li><a href=\"/users\">Users</a></li>                \n            </ul>\n        </div>\n\n        <div id=\"page-content-wrapper\">\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                  <button class=\"btn btn-default\" id=\"menu-toggle\"><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button>\n                    <div class=\"container\"> \n                      <router-view></router-view>\n                    </div>              \n            </div>\n                </div>\n            </div>\n    </div>-->\n\n\n\n\n      <div class=\"container\">\n        <nav class=\"navbar navbar-default navigation-clean navbar-fixed-top\">\n          <div class=\"container\">\n            <div class=\"navbar-header\"><a class=\"navbar-brand navbar-link\" href=\"/\">Aurelia Framework</a>\n              <button class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navcol-1\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button>\n            </div>            \n            <div class=\"collapse navbar-collapse\" id=\"navcol-1\">           \n              <ul if.bind=\"!isAuthenticated\" class=\"nav navbar-nav navbar-right\">\n                <li class=\"dropdown\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\" >Routes <span class=\"caret\"></span></a>\n                  <ul class=\"dropdown-menu\" role=\"menu\">\n                      <li role=\"presentation\"><a href=\"/users\">Users</a></li>\n                  </ul>\n                </li>\n                <li><a href=\"/login\">Login</a></li>\n                <li><a href=\"/signup\">Signup</a></li>\n              </ul>\n              <ul if.bind=\"isAuthenticated\" class=\"nav navbar-nav navbar-right\">\n                <li><a href=\"/logout\">Logout</a></li>\n              </ul>\n            </div>\n          </div>\n        </nav>\n      </div>\n    <div class=\"container\"> \n      <router-view></router-view>\n    </div>\n    <footer class=\"footer\">\n      <div class=\"container\">\n        by Rodrigo Sz Sampaio       \n      </div>\n    </footer>\n</template>"; });
define('text!sidebar.css', ['module'], function(module) { module.exports = "body {\r\n    overflow-x: hidden;\r\n }\r\n\r\n/* Toggle Styles */\r\n\r\n#wrapper {\r\n    padding-left: 0;\r\n    -webkit-transition: all 0.5s ease;\r\n    -moz-transition: all 0.5s ease;\r\n    -o-transition: all 0.5s ease;\r\n    transition: all 0.5s ease;\r\n}\r\n\r\n#wrapper.toggled {\r\n    padding-left: 250px;\r\n}\r\n\r\n#sidebar-wrapper {\r\n    z-index: 1000;\r\n    position: fixed;\r\n    left: 250px;\r\n    width: 0;\r\n    height: 100%;\r\n    margin-left: -250px;\r\n    overflow-y: auto;\r\n    background: #000;\r\n    -webkit-transition: all 0.5s ease;\r\n    -moz-transition: all 0.5s ease;\r\n    -o-transition: all 0.5s ease;\r\n    transition: all 0.5s ease;\r\n}\r\n\r\n#wrapper.toggled #sidebar-wrapper {\r\n    width: 250px;\r\n}\r\n\r\n#page-content-wrapper {\r\n    width: 100%;\r\n    position: absolute;\r\n    padding: 15px;\r\n}\r\n\r\n#wrapper.toggled #page-content-wrapper {\r\n    position: absolute;\r\n    margin-right: -250px;\r\n}\r\n\r\n/* Sidebar Styles */\r\n\r\n\r\n.sidebar-nav {\r\n    position: absolute;\r\n    top: 0;\r\n    width: 250px;\r\n    margin: 0;\r\n    padding: 0;\r\n    list-style: none;\r\n}\r\n\r\n.sidebar-nav li {\r\n    text-indent: 20px;\r\n    line-height: 40px;\r\n}\r\n\r\n.sidebar-nav li a {\r\n    display: block;\r\n    text-decoration: none;\r\n    color: #999999;\r\n}\r\n\r\n.sidebar-nav li a:hover {\r\n    text-decoration: none;\r\n    color: #fff;\r\n    background: rgba(255,255,255,0.2);\r\n}\r\n\r\n.sidebar-nav li a:active,\r\n.sidebar-nav li a:focus {\r\n    text-decoration: none;\r\n}\r\n\r\n.sidebar-nav > .sidebar-brand {\r\n    height: 65px;\r\n    font-size: 18px;\r\n    line-height: 60px;\r\n}\r\n\r\n.sidebar-nav > .sidebar-brand a {\r\n    color: #999999;\r\n}\r\n\r\n.sidebar-nav > .sidebar-brand a:hover {\r\n    color: #fff;\r\n    background: none;\r\n}\r\n\r\n@media(min-width:768px) {\r\n    #wrapper {\r\n        padding-left: 250px;\r\n    }\r\n\r\n    #wrapper.toggled {\r\n        padding-left: 0;\r\n    }\r\n\r\n    #sidebar-wrapper {\r\n        width: 250px;\r\n    }\r\n\r\n    #wrapper.toggled #sidebar-wrapper {\r\n        width: 0;\r\n    }\r\n\r\n    #page-content-wrapper {\r\n        padding: 20px;\r\n        position: relative;\r\n    }\r\n\r\n    #wrapper.toggled #page-content-wrapper {\r\n        position: relative;\r\n        margin-right: 0;\r\n    }\r\n}\r\n\r\n"; });
define('text!views/home/home.html', ['module'], function(module) { module.exports = "<template>\r\n    <div>\r\n      <!--<button class=\"btn btn-primary\" click.delegate = \"getData()\">GET</button>-->\r\n      <div class=\"jumbotron\">\r\n        <h1>\r\n          Web Application with Aurelia Framework \r\n        </h1>\r\n        <p> Testing the framework </p>        \r\n        <a href=\"https://github.com/rodrigoszsampaio/Example-Aurelia-Express\">Aurelia as client and Express as server</a>\r\n         \r\n                \r\n      </div>\r\n    </div>\r\n</template>"; });
define('text!assets/css/footable.bootstrap.css', ['module'], function(module) { module.exports = "/*\r\n* FooTable v3 - FooTable is a jQuery plugin that aims to make HTML tables on smaller devices look awesome.\r\n* @version 3.1.1\r\n* @link http://fooplugins.com\r\n* @copyright Steven Usher & Brad Vincent 2015\r\n* @license Released under the GPLv3 license.\r\n*/\r\ntable.footable,\r\ntable.footable-details {\r\n\tposition: relative;\r\n\twidth: 100%;\r\n\tborder-spacing: 0;\r\n\tborder-collapse: collapse;\r\n}\r\ntable.footable-details {\r\n\tmargin-bottom: 0;\r\n}\r\ntable > tbody > tr > td > span.footable-toggle {\r\n\tmargin-right: 8px;\r\n\topacity: 0.3;\r\n}\r\ntable > tbody > tr > td > span.footable-toggle.last-column {\r\n\tmargin-left: 8px;\r\n\tfloat: right;\r\n}\r\ntable.table-condensed > tbody > tr > td > span.footable-toggle {\r\n\tmargin-right: 5px;\r\n}\r\ntable.footable-details > tbody > tr > th:nth-child(1) {\r\n\tmin-width: 40px;\r\n\twidth: 120px;\r\n}\r\ntable.footable-details > tbody > tr > td:nth-child(2) {\r\n\tword-break: break-all;\r\n}\r\n\r\ntable.footable-details > thead > tr:first-child > th,\r\ntable.footable-details > thead > tr:first-child > td,\r\ntable.footable-details > tbody > tr:first-child > th,\r\ntable.footable-details > tbody > tr:first-child > td,\r\ntable.footable-details > tfoot > tr:first-child > th,\r\ntable.footable-details > tfoot > tr:first-child > td {\r\n\tborder-top-width: 0;\r\n}\r\ntable.footable-details.table-bordered > thead > tr:first-child > th,\r\ntable.footable-details.table-bordered > thead > tr:first-child > td,\r\ntable.footable-details.table-bordered > tbody > tr:first-child > th,\r\ntable.footable-details.table-bordered > tbody > tr:first-child > td,\r\ntable.footable-details.table-bordered > tfoot > tr:first-child > th,\r\ntable.footable-details.table-bordered > tfoot > tr:first-child > td {\r\n\tborder-top-width: 1px;\r\n}\r\n\r\ndiv.footable-loader {\r\n\tvertical-align: middle;\r\n\ttext-align: center;\r\n\theight: 300px;\r\n\tposition: relative;\r\n}\r\ndiv.footable-loader > span.fooicon {\r\n\tdisplay: inline-block;\r\n\topacity: 0.3;\r\n\tfont-size: 30px;\r\n\tline-height: 32px;\r\n\twidth: 32px;\r\n\theight: 32px;\r\n\tmargin-top: -16px;\r\n\tmargin-left: -16px;\r\n\tposition: absolute;\r\n\ttop: 50%;\r\n\tleft: 50%;\r\n\t-webkit-animation: fooicon-spin-r 2s infinite linear;\r\n\tanimation: fooicon-spin-r 2s infinite linear;\r\n}\r\ntable.footable > tbody > tr.footable-empty > td {\r\n\tvertical-align: middle;\r\n\ttext-align: center;\r\n\tfont-size: 30px;\r\n}\r\ntable.footable > tbody > tr > td,\r\ntable.footable > tbody > tr > th {\r\n\tdisplay: none;\r\n}\r\ntable.footable > tbody > tr.footable-empty > td,\r\ntable.footable > tbody > tr.footable-empty > th,\r\ntable.footable > tbody > tr.footable-detail-row > td,\r\ntable.footable > tbody > tr.footable-detail-row > th {\r\n\tdisplay: table-cell;\r\n}\r\n@-webkit-keyframes fooicon-spin-r {\r\n\t0% {\r\n\t\t-webkit-transform: rotate(0deg);\r\n\t\ttransform: rotate(0deg);\r\n\t}\r\n\r\n\t100% {\r\n\t\t-webkit-transform: rotate(359deg);\r\n\t\ttransform: rotate(359deg);\r\n\t}\r\n}\r\n\r\n@keyframes fooicon-spin-r {\r\n\t0% {\r\n\t\t-webkit-transform: rotate(0deg);\r\n\t\ttransform: rotate(0deg);\r\n\t}\r\n\r\n\t100% {\r\n\t\t-webkit-transform: rotate(359deg);\r\n\t\ttransform: rotate(359deg);\r\n\t}\r\n}\r\n\r\n.fooicon {\r\n\tposition: relative;\r\n\ttop: 1px;\r\n\tdisplay: inline-block;\r\n\tfont-family: 'Glyphicons Halflings' !important;\r\n\tfont-style: normal;\r\n\tfont-weight: 400;\r\n\tline-height: 1;\r\n\t-webkit-font-smoothing: antialiased;\r\n\t-moz-osx-font-smoothing: grayscale;\r\n}\r\n.fooicon:before,\r\n.fooicon:after {\r\n\t-webkit-box-sizing: border-box;\r\n\t-moz-box-sizing: border-box;\r\n\tbox-sizing: border-box;\r\n}\r\n.fooicon-loader:before {\r\n\tcontent: \"\\e030\";\r\n}\r\n.fooicon-plus:before {\r\n\tcontent: \"\\2b\";\r\n}\r\n.fooicon-minus:before {\r\n\tcontent: \"\\2212\";\r\n}\r\n.fooicon-search:before {\r\n\tcontent: \"\\e003\";\r\n}\r\n.fooicon-remove:before {\r\n\tcontent: \"\\e014\";\r\n}\r\n.fooicon-sort:before {\r\n\tcontent: \"\\e150\";\r\n}\r\n.fooicon-sort-asc:before {\r\n\tcontent: \"\\e155\";\r\n}\r\n.fooicon-sort-desc:before {\r\n\tcontent: \"\\e156\";\r\n}\r\n.fooicon-pencil:before {\r\n\tcontent: \"\\270f\";\r\n}\r\n.fooicon-trash:before {\r\n\tcontent: \"\\e020\";\r\n}\r\n.fooicon-eye-close:before {\r\n\tcontent: \"\\e106\";\r\n}\r\n.fooicon-flash:before {\r\n\tcontent: \"\\e162\";\r\n}\r\n.fooicon-cog:before {\r\n\tcontent: \"\\e019\";\r\n}\r\n.fooicon-stats:before {\r\n\tcontent: \"\\e185\";\r\n}\r\n\r\ntable.footable > thead > tr.footable-filtering > th {\r\n\tborder-bottom-width: 1px;\r\n\tfont-weight: normal;\r\n}\r\ntable.footable > thead > tr.footable-filtering > th,\r\ntable.footable.footable-filtering-right > thead > tr.footable-filtering > th {\r\n\ttext-align: right;\r\n}\r\ntable.footable.footable-filtering-left > thead > tr.footable-filtering > th {\r\n\ttext-align: left;\r\n}\r\ntable.footable.footable-filtering-center > thead > tr.footable-filtering > th {\r\n\ttext-align: center;\r\n}\r\ntable.footable > thead > tr.footable-filtering > th div.form-group {\r\n\tmargin-bottom: 0;\r\n}\r\ntable.footable > thead > tr.footable-filtering > th div.form-group+div.form-group {\r\n\tmargin-top: 5px;\r\n}\r\ntable.footable > thead > tr.footable-filtering > th div.input-group {\r\n\twidth: 100%;\r\n}\r\ntable.footable > thead > tr.footable-filtering > th ul.dropdown-menu > li > a.checkbox {\r\n\tmargin: 0;\r\n\tdisplay: block;\r\n\tposition: relative;\r\n}\r\ntable.footable > thead > tr.footable-filtering > th ul.dropdown-menu > li > a.checkbox > label {\r\n\tdisplay: block;\r\n\tpadding-left: 20px;\r\n}\r\ntable.footable > thead > tr.footable-filtering > th ul.dropdown-menu > li > a.checkbox input[type=\"checkbox\"] {\r\n\tposition: absolute;\r\n\tmargin-left: -20px;\r\n}\r\n@media (min-width: 768px) {\r\n\ttable.footable > thead > tr.footable-filtering > th div.input-group {\r\n\t\twidth: auto;\r\n\t}\r\n\ttable.footable > thead > tr.footable-filtering > th div.form-group {\r\n\t\tmargin-left: 2px;\r\n\t\tmargin-right: 2px;\r\n\t}\r\n\ttable.footable > thead > tr.footable-filtering > th div.form-group+div.form-group {\r\n\t\tmargin-top: 0;\r\n\t}\r\n}\r\ntable.footable > thead > tr > td.footable-sortable,\r\ntable.footable > thead > tr > th.footable-sortable,\r\ntable.footable > tbody > tr > td.footable-sortable,\r\ntable.footable > tbody > tr > th.footable-sortable,\r\ntable.footable > tfoot > tr > td.footable-sortable,\r\ntable.footable > tfoot > tr > th.footable-sortable {\r\n\tposition: relative;\r\n\tpadding-right: 30px;\r\n\tcursor: pointer;\r\n}\r\ntd.footable-sortable > span.fooicon,\r\nth.footable-sortable > span.fooicon {\r\n\tposition: absolute;\r\n\tright: 6px;\r\n\ttop: 50%;\r\n\tmargin-top: -7px;\r\n\topacity: 0;\r\n\ttransition: opacity 0.3s ease-in;\r\n}\r\ntd.footable-sortable:hover > span.fooicon,\r\nth.footable-sortable:hover > span.fooicon {\r\n\topacity: 1;\r\n}\r\ntd.footable-sortable.footable-asc > span.fooicon,\r\nth.footable-sortable.footable-asc > span.fooicon,\r\ntd.footable-sortable.footable-desc > span.fooicon,\r\nth.footable-sortable.footable-desc > span.fooicon {\r\n\topacity: 1;\r\n}\r\n/* hides the sort icons when sorting is not allowed */\r\ntable.footable-sorting-disabled td.footable-sortable.footable-asc > span.fooicon,\r\ntable.footable-sorting-disabled td.footable-sortable.footable-desc > span.fooicon,\r\ntable.footable-sorting-disabled td.footable-sortable:hover > span.fooicon,\r\ntable.footable-sorting-disabled th.footable-sortable.footable-asc > span.fooicon,\r\ntable.footable-sorting-disabled th.footable-sortable.footable-desc > span.fooicon,\r\ntable.footable-sorting-disabled th.footable-sortable:hover > span.fooicon {\r\n\topacity: 0;\r\n\tvisibility: hidden;\r\n}\r\ntable.footable > tfoot > tr.footable-paging > td > ul.pagination {\r\n\tmargin: 10px 0 0 0;\r\n}\r\ntable.footable > tfoot > tr.footable-paging > td > span.label {\r\n\tdisplay: inline-block;\r\n\tmargin: 0 0 10px 0;\r\n\tpadding: 4px 10px;\r\n}\r\ntable.footable > tfoot > tr.footable-paging > td,\r\ntable.footable-paging-center > tfoot > tr.footable-paging > td {\r\n\ttext-align: center;\r\n}\r\ntable.footable-paging-left > tfoot > tr.footable-paging > td {\r\n\ttext-align: left;\r\n}\r\ntable.footable-paging-right > tfoot > tr.footable-paging > td {\r\n\ttext-align: right;\r\n}\r\nul.pagination > li.footable-page {\r\n\tdisplay: none;\r\n}\r\nul.pagination > li.footable-page.visible {\r\n\tdisplay: inline;\r\n}\r\ntd.footable-editing {\r\n\twidth: 90px;\r\n\tmax-width: 90px;\r\n}\r\ntable.footable-editing-no-edit td.footable-editing,\r\ntable.footable-editing-no-delete td.footable-editing,\r\ntable.footable-editing-no-view td.footable-editing {\r\n\twidth: 70px;\r\n\tmax-width: 70px;\r\n}\r\ntable.footable-editing-no-edit.footable-editing-no-delete td.footable-editing,\r\ntable.footable-editing-no-edit.footable-editing-no-view td.footable-editing,\r\ntable.footable-editing-no-delete.footable-editing-no-view td.footable-editing {\r\n\twidth: 50px;\r\n\tmax-width: 50px;\r\n}\r\ntable.footable-editing-no-edit.footable-editing-no-delete.footable-editing-no-view td.footable-editing,\r\ntable.footable-editing-no-edit.footable-editing-no-delete.footable-editing-no-view th.footable-editing {\r\n\twidth: 0;\r\n\tmax-width: 0;\r\n\tdisplay: none !important;\r\n}\r\ntable.footable-editing-right td.footable-editing,\r\ntable.footable-editing-right tr.footable-editing {\r\n\ttext-align: right;\r\n}\r\ntable.footable-editing-left td.footable-editing,\r\ntable.footable-editing-left tr.footable-editing {\r\n\ttext-align: left;\r\n}\r\ntable.footable-editing button.footable-add,\r\ntable.footable-editing button.footable-hide,\r\ntable.footable-editing-show button.footable-show,\r\ntable.footable-editing.footable-editing-always-show button.footable-show,\r\ntable.footable-editing.footable-editing-always-show button.footable-hide,\r\ntable.footable-editing.footable-editing-always-show.footable-editing-no-add tr.footable-editing {\r\n\tdisplay: none;\r\n}\r\ntable.footable-editing.footable-editing-show button.footable-add,\r\ntable.footable-editing.footable-editing-show button.footable-hide,\r\ntable.footable-editing.footable-editing-always-show button.footable-add {\r\n\tdisplay: inline-block;\r\n}\r\n"; });
define('text!views/users/users.html', ['module'], function(module) { module.exports = "<template>\r\n  <!--<require from=\"../../assets/css/footable.bootstrap.min.css\"></require>  -->\r\n  <require from=\"./TableUsers.css\"></require> \r\n \r\n  <div>   \r\n  <h2>Users</h2>\r\n  \r\n  <table class=\"table-hover\">\r\n  \t<thead>\r\n  \t<tr>  \t\t\r\n  \t\t<th click.trigger=\"sort(user)\">Name</th>\r\n  \t\t<th>Email</th>\r\n      <th>Action</th>\r\n  \t</tr>\r\n  \t</thead>\r\n  \t<tbody>\r\n  \t<tr repeat.for=\"user of users\">        \t\t\r\n  \t\t<!--Read Only-->\r\n      <td if.bind=\"editing !== user\">${user.name}</td>\r\n  \t\t<td if.bind=\"editing !== user\">${user.email}</td>\r\n      <!--Edit-->\r\n      <td if.bind=\"editing === user\"><input value.bind=\"user.name\" type=\"text\"></td>\r\n  \t\t<td if.bind=\"editing === user\"><input value.bind=\"user.email\" type=\"email\"></td>\r\n      <td>\r\n        <button if.bind=\"editing === user\" click.trigger=\"cancel(user)\" class=\"btn btn-primary btn-xs\">Cancel</button>\r\n        <button if.bind=\"editing === user\" click.trigger=\"save(user)\" class=\"btn btn-primary btn-xs\">Save</button>        \r\n        <button if.bind=\"editing !== user\" click.trigger=\"edit(user)\" class=\"btn btn-primary btn-xs\">Edit</button>\r\n        <button if.bind=\"editing !== user\" click.trigger=\"delete(user)\" class=\"btn btn-primary btn-xs\">Delete</button>        \r\n      </td>\r\n  \t</tr>\r\n  \t</tbody>  \r\n  </table>  \r\n  </div>\r\n  </br>\r\n  \r\n</template>"; });
define('text!assets/css/footable.bootstrap.min.css', ['module'], function(module) { module.exports = "table.footable-details,table.footable>thead>tr.footable-filtering>th div.form-group{margin-bottom:0}table.footable,table.footable-details{position:relative;width:100%;border-spacing:0;border-collapse:collapse}table>tbody>tr>td>span.footable-toggle{margin-right:8px;opacity:.3}table>tbody>tr>td>span.footable-toggle.last-column{margin-left:8px;float:right}table.table-condensed>tbody>tr>td>span.footable-toggle{margin-right:5px}table.footable-details>tbody>tr>th:nth-child(1){min-width:40px;width:120px}table.footable-details>tbody>tr>td:nth-child(2){word-break:break-all}table.footable-details>tbody>tr:first-child>td,table.footable-details>tbody>tr:first-child>th,table.footable-details>tfoot>tr:first-child>td,table.footable-details>tfoot>tr:first-child>th,table.footable-details>thead>tr:first-child>td,table.footable-details>thead>tr:first-child>th{border-top-width:0}table.footable-details.table-bordered>tbody>tr:first-child>td,table.footable-details.table-bordered>tbody>tr:first-child>th,table.footable-details.table-bordered>tfoot>tr:first-child>td,table.footable-details.table-bordered>tfoot>tr:first-child>th,table.footable-details.table-bordered>thead>tr:first-child>td,table.footable-details.table-bordered>thead>tr:first-child>th{border-top-width:1px}div.footable-loader{vertical-align:middle;text-align:center;height:300px;position:relative}div.footable-loader>span.fooicon{display:inline-block;opacity:.3;font-size:30px;line-height:32px;width:32px;height:32px;margin-top:-16px;margin-left:-16px;position:absolute;top:50%;left:50%;-webkit-animation:fooicon-spin-r 2s infinite linear;animation:fooicon-spin-r 2s infinite linear}table.footable>tbody>tr.footable-empty>td{vertical-align:middle;text-align:center;font-size:30px}table.footable>tbody>tr>td,table.footable>tbody>tr>th{display:none}table.footable>tbody>tr.footable-detail-row>td,table.footable>tbody>tr.footable-detail-row>th,table.footable>tbody>tr.footable-empty>td,table.footable>tbody>tr.footable-empty>th{display:table-cell}@-webkit-keyframes fooicon-spin-r{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes fooicon-spin-r{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.fooicon{position:relative;top:1px;display:inline-block;font-family:'Glyphicons Halflings'!important;font-style:normal;font-weight:400;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fooicon:after,.fooicon:before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.fooicon-loader:before{content:\"\\e030\"}.fooicon-plus:before{content:\"\\2b\"}.fooicon-minus:before{content:\"\\2212\"}.fooicon-search:before{content:\"\\e003\"}.fooicon-remove:before{content:\"\\e014\"}.fooicon-sort:before{content:\"\\e150\"}.fooicon-sort-asc:before{content:\"\\e155\"}.fooicon-sort-desc:before{content:\"\\e156\"}.fooicon-pencil:before{content:\"\\270f\"}.fooicon-trash:before{content:\"\\e020\"}.fooicon-eye-close:before{content:\"\\e106\"}.fooicon-flash:before{content:\"\\e162\"}.fooicon-cog:before{content:\"\\e019\"}.fooicon-stats:before{content:\"\\e185\"}table.footable>thead>tr.footable-filtering>th{border-bottom-width:1px;font-weight:400}table.footable.footable-filtering-right>thead>tr.footable-filtering>th,table.footable>thead>tr.footable-filtering>th{text-align:right}table.footable.footable-filtering-left>thead>tr.footable-filtering>th{text-align:left}table.footable-paging-center>tfoot>tr.footable-paging>td,table.footable.footable-filtering-center>thead>tr.footable-filtering>th,table.footable>tfoot>tr.footable-paging>td{text-align:center}table.footable>thead>tr.footable-filtering>th div.form-group+div.form-group{margin-top:5px}table.footable>thead>tr.footable-filtering>th div.input-group{width:100%}table.footable>thead>tr.footable-filtering>th ul.dropdown-menu>li>a.checkbox{margin:0;display:block;position:relative}table.footable>thead>tr.footable-filtering>th ul.dropdown-menu>li>a.checkbox>label{display:block;padding-left:20px}table.footable>thead>tr.footable-filtering>th ul.dropdown-menu>li>a.checkbox input[type=checkbox]{position:absolute;margin-left:-20px}@media (min-width:768px){table.footable>thead>tr.footable-filtering>th div.input-group{width:auto}table.footable>thead>tr.footable-filtering>th div.form-group{margin-left:2px;margin-right:2px}table.footable>thead>tr.footable-filtering>th div.form-group+div.form-group{margin-top:0}}table.footable>tbody>tr>td.footable-sortable,table.footable>tbody>tr>th.footable-sortable,table.footable>tfoot>tr>td.footable-sortable,table.footable>tfoot>tr>th.footable-sortable,table.footable>thead>tr>td.footable-sortable,table.footable>thead>tr>th.footable-sortable{position:relative;padding-right:30px;cursor:pointer}td.footable-sortable>span.fooicon,th.footable-sortable>span.fooicon{position:absolute;right:6px;top:50%;margin-top:-7px;opacity:0;transition:opacity .3s ease-in}td.footable-sortable.footable-asc>span.fooicon,td.footable-sortable.footable-desc>span.fooicon,td.footable-sortable:hover>span.fooicon,th.footable-sortable.footable-asc>span.fooicon,th.footable-sortable.footable-desc>span.fooicon,th.footable-sortable:hover>span.fooicon{opacity:1}table.footable-sorting-disabled td.footable-sortable.footable-asc>span.fooicon,table.footable-sorting-disabled td.footable-sortable.footable-desc>span.fooicon,table.footable-sorting-disabled td.footable-sortable:hover>span.fooicon,table.footable-sorting-disabled th.footable-sortable.footable-asc>span.fooicon,table.footable-sorting-disabled th.footable-sortable.footable-desc>span.fooicon,table.footable-sorting-disabled th.footable-sortable:hover>span.fooicon{opacity:0;visibility:hidden}table.footable>tfoot>tr.footable-paging>td>ul.pagination{margin:10px 0 0}table.footable>tfoot>tr.footable-paging>td>span.label{display:inline-block;margin:0 0 10px;padding:4px 10px}table.footable-paging-left>tfoot>tr.footable-paging>td{text-align:left}table.footable-editing-right td.footable-editing,table.footable-editing-right tr.footable-editing,table.footable-paging-right>tfoot>tr.footable-paging>td{text-align:right}ul.pagination>li.footable-page{display:none}ul.pagination>li.footable-page.visible{display:inline}td.footable-editing{width:90px;max-width:90px}table.footable-editing-no-delete td.footable-editing,table.footable-editing-no-edit td.footable-editing,table.footable-editing-no-view td.footable-editing{width:70px;max-width:70px}table.footable-editing-no-delete.footable-editing-no-view td.footable-editing,table.footable-editing-no-edit.footable-editing-no-delete td.footable-editing,table.footable-editing-no-edit.footable-editing-no-view td.footable-editing{width:50px;max-width:50px}table.footable-editing-no-edit.footable-editing-no-delete.footable-editing-no-view td.footable-editing,table.footable-editing-no-edit.footable-editing-no-delete.footable-editing-no-view th.footable-editing{width:0;max-width:0;display:none!important}table.footable-editing-left td.footable-editing,table.footable-editing-left tr.footable-editing{text-align:left}table.footable-editing button.footable-add,table.footable-editing button.footable-hide,table.footable-editing-show button.footable-show,table.footable-editing.footable-editing-always-show button.footable-hide,table.footable-editing.footable-editing-always-show button.footable-show,table.footable-editing.footable-editing-always-show.footable-editing-no-add tr.footable-editing{display:none}table.footable-editing.footable-editing-always-show button.footable-add,table.footable-editing.footable-editing-show button.footable-add,table.footable-editing.footable-editing-show button.footable-hide{display:inline-block}"; });
define('text!assets/css/styles.css', ['module'], function(module) { module.exports = "html {\r\n  position: relative;\r\n  min-height: 100%;\r\n}\r\n\r\nbody { \r\n  margin-bottom: 60px;\r\n}\r\n\r\n.footer {\r\n  position: absolute;\r\n  bottom: 0;\r\n  width: 100%;  \r\n  /*height: 20px;*/\r\n  text-align: right  \r\n}\r\n\r\nbody > .container {\r\n  padding: 60px 15px 0;\r\n}\r\n\r\n.footer > .container {\r\n  padding-right: 15px;\r\n  padding-left: 15px;\r\n}\r\n\r\n/*code {\r\n  font-size: 80%;\r\n}*/"; });
define('text!views/auth/login/login.html', ['module'], function(module) { module.exports = "<template> \r\n  <div>\r\n    <form role = \"form\" submit.delegate=\"login()\">\r\n      <h2 class=\"sr-only\">Login Form</h2>\r\n      <div class=\"illustration\"><i class=\"icon ion-ios-locked-outline\"></i></div>\r\n      <div class=\"form-group\">\r\n        <input class=\"form-control\" type=\"email\" name=\"email\" placeholder=\"Email\" value.bind=\"email\">\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <input class=\"form-control\" type=\"password\" name=\"password\" placeholder=\"Password\" value.bind=\"password\">\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <button class=\"btn btn-primary btn-block\" type=\"submit\">Log In</button>\r\n      </div>\r\n      <a href=\"#\" class=\"forgot\">Forgot your email or password?</a>\r\n    </form>\r\n  </div>\r\n</template>"; });
define('text!assets/fonts/ionicons.min.css', ['module'], function(module) { module.exports = "@charset \"UTF-8\";/*!\n  Ionicons, v2.0.1\n  Created by Ben Sperry for the Ionic Framework, http://ionicons.com/\n  https://twitter.com/benjsperry  https://twitter.com/ionicframework\n  MIT License: https://github.com/driftyco/ionicons\n\n  Android-style icons originally built by Google’s\n  Material Design Icons: https://github.com/google/material-design-icons\n  used under CC BY http://creativecommons.org/licenses/by/4.0/\n  Modified icons to fit ionicon’s grid from original.\n*/@font-face{font-family:\"Ionicons\";src:url(\"../fonts/ionicons.eot?v=2.0.1\");src:url(\"../fonts/ionicons.eot?v=2.0.1#iefix\") format(\"embedded-opentype\"),url(\"../fonts/ionicons.ttf?v=2.0.1\") format(\"truetype\"),url(\"../fonts/ionicons.woff?v=2.0.1\") format(\"woff\"),url(\"../fonts/ionicons.svg?v=2.0.1#Ionicons\") format(\"svg\");font-weight:normal;font-style:normal}.ion,.ionicons,.ion-alert:before,.ion-alert-circled:before,.ion-android-add:before,.ion-android-add-circle:before,.ion-android-alarm-clock:before,.ion-android-alert:before,.ion-android-apps:before,.ion-android-archive:before,.ion-android-arrow-back:before,.ion-android-arrow-down:before,.ion-android-arrow-dropdown:before,.ion-android-arrow-dropdown-circle:before,.ion-android-arrow-dropleft:before,.ion-android-arrow-dropleft-circle:before,.ion-android-arrow-dropright:before,.ion-android-arrow-dropright-circle:before,.ion-android-arrow-dropup:before,.ion-android-arrow-dropup-circle:before,.ion-android-arrow-forward:before,.ion-android-arrow-up:before,.ion-android-attach:before,.ion-android-bar:before,.ion-android-bicycle:before,.ion-android-boat:before,.ion-android-bookmark:before,.ion-android-bulb:before,.ion-android-bus:before,.ion-android-calendar:before,.ion-android-call:before,.ion-android-camera:before,.ion-android-cancel:before,.ion-android-car:before,.ion-android-cart:before,.ion-android-chat:before,.ion-android-checkbox:before,.ion-android-checkbox-blank:before,.ion-android-checkbox-outline:before,.ion-android-checkbox-outline-blank:before,.ion-android-checkmark-circle:before,.ion-android-clipboard:before,.ion-android-close:before,.ion-android-cloud:before,.ion-android-cloud-circle:before,.ion-android-cloud-done:before,.ion-android-cloud-outline:before,.ion-android-color-palette:before,.ion-android-compass:before,.ion-android-contact:before,.ion-android-contacts:before,.ion-android-contract:before,.ion-android-create:before,.ion-android-delete:before,.ion-android-desktop:before,.ion-android-document:before,.ion-android-done:before,.ion-android-done-all:before,.ion-android-download:before,.ion-android-drafts:before,.ion-android-exit:before,.ion-android-expand:before,.ion-android-favorite:before,.ion-android-favorite-outline:before,.ion-android-film:before,.ion-android-folder:before,.ion-android-folder-open:before,.ion-android-funnel:before,.ion-android-globe:before,.ion-android-hand:before,.ion-android-hangout:before,.ion-android-happy:before,.ion-android-home:before,.ion-android-image:before,.ion-android-laptop:before,.ion-android-list:before,.ion-android-locate:before,.ion-android-lock:before,.ion-android-mail:before,.ion-android-map:before,.ion-android-menu:before,.ion-android-microphone:before,.ion-android-microphone-off:before,.ion-android-more-horizontal:before,.ion-android-more-vertical:before,.ion-android-navigate:before,.ion-android-notifications:before,.ion-android-notifications-none:before,.ion-android-notifications-off:before,.ion-android-open:before,.ion-android-options:before,.ion-android-people:before,.ion-android-person:before,.ion-android-person-add:before,.ion-android-phone-landscape:before,.ion-android-phone-portrait:before,.ion-android-pin:before,.ion-android-plane:before,.ion-android-playstore:before,.ion-android-print:before,.ion-android-radio-button-off:before,.ion-android-radio-button-on:before,.ion-android-refresh:before,.ion-android-remove:before,.ion-android-remove-circle:before,.ion-android-restaurant:before,.ion-android-sad:before,.ion-android-search:before,.ion-android-send:before,.ion-android-settings:before,.ion-android-share:before,.ion-android-share-alt:before,.ion-android-star:before,.ion-android-star-half:before,.ion-android-star-outline:before,.ion-android-stopwatch:before,.ion-android-subway:before,.ion-android-sunny:before,.ion-android-sync:before,.ion-android-textsms:before,.ion-android-time:before,.ion-android-train:before,.ion-android-unlock:before,.ion-android-upload:before,.ion-android-volume-down:before,.ion-android-volume-mute:before,.ion-android-volume-off:before,.ion-android-volume-up:before,.ion-android-walk:before,.ion-android-warning:before,.ion-android-watch:before,.ion-android-wifi:before,.ion-aperture:before,.ion-archive:before,.ion-arrow-down-a:before,.ion-arrow-down-b:before,.ion-arrow-down-c:before,.ion-arrow-expand:before,.ion-arrow-graph-down-left:before,.ion-arrow-graph-down-right:before,.ion-arrow-graph-up-left:before,.ion-arrow-graph-up-right:before,.ion-arrow-left-a:before,.ion-arrow-left-b:before,.ion-arrow-left-c:before,.ion-arrow-move:before,.ion-arrow-resize:before,.ion-arrow-return-left:before,.ion-arrow-return-right:before,.ion-arrow-right-a:before,.ion-arrow-right-b:before,.ion-arrow-right-c:before,.ion-arrow-shrink:before,.ion-arrow-swap:before,.ion-arrow-up-a:before,.ion-arrow-up-b:before,.ion-arrow-up-c:before,.ion-asterisk:before,.ion-at:before,.ion-backspace:before,.ion-backspace-outline:before,.ion-bag:before,.ion-battery-charging:before,.ion-battery-empty:before,.ion-battery-full:before,.ion-battery-half:before,.ion-battery-low:before,.ion-beaker:before,.ion-beer:before,.ion-bluetooth:before,.ion-bonfire:before,.ion-bookmark:before,.ion-bowtie:before,.ion-briefcase:before,.ion-bug:before,.ion-calculator:before,.ion-calendar:before,.ion-camera:before,.ion-card:before,.ion-cash:before,.ion-chatbox:before,.ion-chatbox-working:before,.ion-chatboxes:before,.ion-chatbubble:before,.ion-chatbubble-working:before,.ion-chatbubbles:before,.ion-checkmark:before,.ion-checkmark-circled:before,.ion-checkmark-round:before,.ion-chevron-down:before,.ion-chevron-left:before,.ion-chevron-right:before,.ion-chevron-up:before,.ion-clipboard:before,.ion-clock:before,.ion-close:before,.ion-close-circled:before,.ion-close-round:before,.ion-closed-captioning:before,.ion-cloud:before,.ion-code:before,.ion-code-download:before,.ion-code-working:before,.ion-coffee:before,.ion-compass:before,.ion-compose:before,.ion-connection-bars:before,.ion-contrast:before,.ion-crop:before,.ion-cube:before,.ion-disc:before,.ion-document:before,.ion-document-text:before,.ion-drag:before,.ion-earth:before,.ion-easel:before,.ion-edit:before,.ion-egg:before,.ion-eject:before,.ion-email:before,.ion-email-unread:before,.ion-erlenmeyer-flask:before,.ion-erlenmeyer-flask-bubbles:before,.ion-eye:before,.ion-eye-disabled:before,.ion-female:before,.ion-filing:before,.ion-film-marker:before,.ion-fireball:before,.ion-flag:before,.ion-flame:before,.ion-flash:before,.ion-flash-off:before,.ion-folder:before,.ion-fork:before,.ion-fork-repo:before,.ion-forward:before,.ion-funnel:before,.ion-gear-a:before,.ion-gear-b:before,.ion-grid:before,.ion-hammer:before,.ion-happy:before,.ion-happy-outline:before,.ion-headphone:before,.ion-heart:before,.ion-heart-broken:before,.ion-help:before,.ion-help-buoy:before,.ion-help-circled:before,.ion-home:before,.ion-icecream:before,.ion-image:before,.ion-images:before,.ion-information:before,.ion-information-circled:before,.ion-ionic:before,.ion-ios-alarm:before,.ion-ios-alarm-outline:before,.ion-ios-albums:before,.ion-ios-albums-outline:before,.ion-ios-americanfootball:before,.ion-ios-americanfootball-outline:before,.ion-ios-analytics:before,.ion-ios-analytics-outline:before,.ion-ios-arrow-back:before,.ion-ios-arrow-down:before,.ion-ios-arrow-forward:before,.ion-ios-arrow-left:before,.ion-ios-arrow-right:before,.ion-ios-arrow-thin-down:before,.ion-ios-arrow-thin-left:before,.ion-ios-arrow-thin-right:before,.ion-ios-arrow-thin-up:before,.ion-ios-arrow-up:before,.ion-ios-at:before,.ion-ios-at-outline:before,.ion-ios-barcode:before,.ion-ios-barcode-outline:before,.ion-ios-baseball:before,.ion-ios-baseball-outline:before,.ion-ios-basketball:before,.ion-ios-basketball-outline:before,.ion-ios-bell:before,.ion-ios-bell-outline:before,.ion-ios-body:before,.ion-ios-body-outline:before,.ion-ios-bolt:before,.ion-ios-bolt-outline:before,.ion-ios-book:before,.ion-ios-book-outline:before,.ion-ios-bookmarks:before,.ion-ios-bookmarks-outline:before,.ion-ios-box:before,.ion-ios-box-outline:before,.ion-ios-briefcase:before,.ion-ios-briefcase-outline:before,.ion-ios-browsers:before,.ion-ios-browsers-outline:before,.ion-ios-calculator:before,.ion-ios-calculator-outline:before,.ion-ios-calendar:before,.ion-ios-calendar-outline:before,.ion-ios-camera:before,.ion-ios-camera-outline:before,.ion-ios-cart:before,.ion-ios-cart-outline:before,.ion-ios-chatboxes:before,.ion-ios-chatboxes-outline:before,.ion-ios-chatbubble:before,.ion-ios-chatbubble-outline:before,.ion-ios-checkmark:before,.ion-ios-checkmark-empty:before,.ion-ios-checkmark-outline:before,.ion-ios-circle-filled:before,.ion-ios-circle-outline:before,.ion-ios-clock:before,.ion-ios-clock-outline:before,.ion-ios-close:before,.ion-ios-close-empty:before,.ion-ios-close-outline:before,.ion-ios-cloud:before,.ion-ios-cloud-download:before,.ion-ios-cloud-download-outline:before,.ion-ios-cloud-outline:before,.ion-ios-cloud-upload:before,.ion-ios-cloud-upload-outline:before,.ion-ios-cloudy:before,.ion-ios-cloudy-night:before,.ion-ios-cloudy-night-outline:before,.ion-ios-cloudy-outline:before,.ion-ios-cog:before,.ion-ios-cog-outline:before,.ion-ios-color-filter:before,.ion-ios-color-filter-outline:before,.ion-ios-color-wand:before,.ion-ios-color-wand-outline:before,.ion-ios-compose:before,.ion-ios-compose-outline:before,.ion-ios-contact:before,.ion-ios-contact-outline:before,.ion-ios-copy:before,.ion-ios-copy-outline:before,.ion-ios-crop:before,.ion-ios-crop-strong:before,.ion-ios-download:before,.ion-ios-download-outline:before,.ion-ios-drag:before,.ion-ios-email:before,.ion-ios-email-outline:before,.ion-ios-eye:before,.ion-ios-eye-outline:before,.ion-ios-fastforward:before,.ion-ios-fastforward-outline:before,.ion-ios-filing:before,.ion-ios-filing-outline:before,.ion-ios-film:before,.ion-ios-film-outline:before,.ion-ios-flag:before,.ion-ios-flag-outline:before,.ion-ios-flame:before,.ion-ios-flame-outline:before,.ion-ios-flask:before,.ion-ios-flask-outline:before,.ion-ios-flower:before,.ion-ios-flower-outline:before,.ion-ios-folder:before,.ion-ios-folder-outline:before,.ion-ios-football:before,.ion-ios-football-outline:before,.ion-ios-game-controller-a:before,.ion-ios-game-controller-a-outline:before,.ion-ios-game-controller-b:before,.ion-ios-game-controller-b-outline:before,.ion-ios-gear:before,.ion-ios-gear-outline:before,.ion-ios-glasses:before,.ion-ios-glasses-outline:before,.ion-ios-grid-view:before,.ion-ios-grid-view-outline:before,.ion-ios-heart:before,.ion-ios-heart-outline:before,.ion-ios-help:before,.ion-ios-help-empty:before,.ion-ios-help-outline:before,.ion-ios-home:before,.ion-ios-home-outline:before,.ion-ios-infinite:before,.ion-ios-infinite-outline:before,.ion-ios-information:before,.ion-ios-information-empty:before,.ion-ios-information-outline:before,.ion-ios-ionic-outline:before,.ion-ios-keypad:before,.ion-ios-keypad-outline:before,.ion-ios-lightbulb:before,.ion-ios-lightbulb-outline:before,.ion-ios-list:before,.ion-ios-list-outline:before,.ion-ios-location:before,.ion-ios-location-outline:before,.ion-ios-locked:before,.ion-ios-locked-outline:before,.ion-ios-loop:before,.ion-ios-loop-strong:before,.ion-ios-medical:before,.ion-ios-medical-outline:before,.ion-ios-medkit:before,.ion-ios-medkit-outline:before,.ion-ios-mic:before,.ion-ios-mic-off:before,.ion-ios-mic-outline:before,.ion-ios-minus:before,.ion-ios-minus-empty:before,.ion-ios-minus-outline:before,.ion-ios-monitor:before,.ion-ios-monitor-outline:before,.ion-ios-moon:before,.ion-ios-moon-outline:before,.ion-ios-more:before,.ion-ios-more-outline:before,.ion-ios-musical-note:before,.ion-ios-musical-notes:before,.ion-ios-navigate:before,.ion-ios-navigate-outline:before,.ion-ios-nutrition:before,.ion-ios-nutrition-outline:before,.ion-ios-paper:before,.ion-ios-paper-outline:before,.ion-ios-paperplane:before,.ion-ios-paperplane-outline:before,.ion-ios-partlysunny:before,.ion-ios-partlysunny-outline:before,.ion-ios-pause:before,.ion-ios-pause-outline:before,.ion-ios-paw:before,.ion-ios-paw-outline:before,.ion-ios-people:before,.ion-ios-people-outline:before,.ion-ios-person:before,.ion-ios-person-outline:before,.ion-ios-personadd:before,.ion-ios-personadd-outline:before,.ion-ios-photos:before,.ion-ios-photos-outline:before,.ion-ios-pie:before,.ion-ios-pie-outline:before,.ion-ios-pint:before,.ion-ios-pint-outline:before,.ion-ios-play:before,.ion-ios-play-outline:before,.ion-ios-plus:before,.ion-ios-plus-empty:before,.ion-ios-plus-outline:before,.ion-ios-pricetag:before,.ion-ios-pricetag-outline:before,.ion-ios-pricetags:before,.ion-ios-pricetags-outline:before,.ion-ios-printer:before,.ion-ios-printer-outline:before,.ion-ios-pulse:before,.ion-ios-pulse-strong:before,.ion-ios-rainy:before,.ion-ios-rainy-outline:before,.ion-ios-recording:before,.ion-ios-recording-outline:before,.ion-ios-redo:before,.ion-ios-redo-outline:before,.ion-ios-refresh:before,.ion-ios-refresh-empty:before,.ion-ios-refresh-outline:before,.ion-ios-reload:before,.ion-ios-reverse-camera:before,.ion-ios-reverse-camera-outline:before,.ion-ios-rewind:before,.ion-ios-rewind-outline:before,.ion-ios-rose:before,.ion-ios-rose-outline:before,.ion-ios-search:before,.ion-ios-search-strong:before,.ion-ios-settings:before,.ion-ios-settings-strong:before,.ion-ios-shuffle:before,.ion-ios-shuffle-strong:before,.ion-ios-skipbackward:before,.ion-ios-skipbackward-outline:before,.ion-ios-skipforward:before,.ion-ios-skipforward-outline:before,.ion-ios-snowy:before,.ion-ios-speedometer:before,.ion-ios-speedometer-outline:before,.ion-ios-star:before,.ion-ios-star-half:before,.ion-ios-star-outline:before,.ion-ios-stopwatch:before,.ion-ios-stopwatch-outline:before,.ion-ios-sunny:before,.ion-ios-sunny-outline:before,.ion-ios-telephone:before,.ion-ios-telephone-outline:before,.ion-ios-tennisball:before,.ion-ios-tennisball-outline:before,.ion-ios-thunderstorm:before,.ion-ios-thunderstorm-outline:before,.ion-ios-time:before,.ion-ios-time-outline:before,.ion-ios-timer:before,.ion-ios-timer-outline:before,.ion-ios-toggle:before,.ion-ios-toggle-outline:before,.ion-ios-trash:before,.ion-ios-trash-outline:before,.ion-ios-undo:before,.ion-ios-undo-outline:before,.ion-ios-unlocked:before,.ion-ios-unlocked-outline:before,.ion-ios-upload:before,.ion-ios-upload-outline:before,.ion-ios-videocam:before,.ion-ios-videocam-outline:before,.ion-ios-volume-high:before,.ion-ios-volume-low:before,.ion-ios-wineglass:before,.ion-ios-wineglass-outline:before,.ion-ios-world:before,.ion-ios-world-outline:before,.ion-ipad:before,.ion-iphone:before,.ion-ipod:before,.ion-jet:before,.ion-key:before,.ion-knife:before,.ion-laptop:before,.ion-leaf:before,.ion-levels:before,.ion-lightbulb:before,.ion-link:before,.ion-load-a:before,.ion-load-b:before,.ion-load-c:before,.ion-load-d:before,.ion-location:before,.ion-lock-combination:before,.ion-locked:before,.ion-log-in:before,.ion-log-out:before,.ion-loop:before,.ion-magnet:before,.ion-male:before,.ion-man:before,.ion-map:before,.ion-medkit:before,.ion-merge:before,.ion-mic-a:before,.ion-mic-b:before,.ion-mic-c:before,.ion-minus:before,.ion-minus-circled:before,.ion-minus-round:before,.ion-model-s:before,.ion-monitor:before,.ion-more:before,.ion-mouse:before,.ion-music-note:before,.ion-navicon:before,.ion-navicon-round:before,.ion-navigate:before,.ion-network:before,.ion-no-smoking:before,.ion-nuclear:before,.ion-outlet:before,.ion-paintbrush:before,.ion-paintbucket:before,.ion-paper-airplane:before,.ion-paperclip:before,.ion-pause:before,.ion-person:before,.ion-person-add:before,.ion-person-stalker:before,.ion-pie-graph:before,.ion-pin:before,.ion-pinpoint:before,.ion-pizza:before,.ion-plane:before,.ion-planet:before,.ion-play:before,.ion-playstation:before,.ion-plus:before,.ion-plus-circled:before,.ion-plus-round:before,.ion-podium:before,.ion-pound:before,.ion-power:before,.ion-pricetag:before,.ion-pricetags:before,.ion-printer:before,.ion-pull-request:before,.ion-qr-scanner:before,.ion-quote:before,.ion-radio-waves:before,.ion-record:before,.ion-refresh:before,.ion-reply:before,.ion-reply-all:before,.ion-ribbon-a:before,.ion-ribbon-b:before,.ion-sad:before,.ion-sad-outline:before,.ion-scissors:before,.ion-search:before,.ion-settings:before,.ion-share:before,.ion-shuffle:before,.ion-skip-backward:before,.ion-skip-forward:before,.ion-social-android:before,.ion-social-android-outline:before,.ion-social-angular:before,.ion-social-angular-outline:before,.ion-social-apple:before,.ion-social-apple-outline:before,.ion-social-bitcoin:before,.ion-social-bitcoin-outline:before,.ion-social-buffer:before,.ion-social-buffer-outline:before,.ion-social-chrome:before,.ion-social-chrome-outline:before,.ion-social-codepen:before,.ion-social-codepen-outline:before,.ion-social-css3:before,.ion-social-css3-outline:before,.ion-social-designernews:before,.ion-social-designernews-outline:before,.ion-social-dribbble:before,.ion-social-dribbble-outline:before,.ion-social-dropbox:before,.ion-social-dropbox-outline:before,.ion-social-euro:before,.ion-social-euro-outline:before,.ion-social-facebook:before,.ion-social-facebook-outline:before,.ion-social-foursquare:before,.ion-social-foursquare-outline:before,.ion-social-freebsd-devil:before,.ion-social-github:before,.ion-social-github-outline:before,.ion-social-google:before,.ion-social-google-outline:before,.ion-social-googleplus:before,.ion-social-googleplus-outline:before,.ion-social-hackernews:before,.ion-social-hackernews-outline:before,.ion-social-html5:before,.ion-social-html5-outline:before,.ion-social-instagram:before,.ion-social-instagram-outline:before,.ion-social-javascript:before,.ion-social-javascript-outline:before,.ion-social-linkedin:before,.ion-social-linkedin-outline:before,.ion-social-markdown:before,.ion-social-nodejs:before,.ion-social-octocat:before,.ion-social-pinterest:before,.ion-social-pinterest-outline:before,.ion-social-python:before,.ion-social-reddit:before,.ion-social-reddit-outline:before,.ion-social-rss:before,.ion-social-rss-outline:before,.ion-social-sass:before,.ion-social-skype:before,.ion-social-skype-outline:before,.ion-social-snapchat:before,.ion-social-snapchat-outline:before,.ion-social-tumblr:before,.ion-social-tumblr-outline:before,.ion-social-tux:before,.ion-social-twitch:before,.ion-social-twitch-outline:before,.ion-social-twitter:before,.ion-social-twitter-outline:before,.ion-social-usd:before,.ion-social-usd-outline:before,.ion-social-vimeo:before,.ion-social-vimeo-outline:before,.ion-social-whatsapp:before,.ion-social-whatsapp-outline:before,.ion-social-windows:before,.ion-social-windows-outline:before,.ion-social-wordpress:before,.ion-social-wordpress-outline:before,.ion-social-yahoo:before,.ion-social-yahoo-outline:before,.ion-social-yen:before,.ion-social-yen-outline:before,.ion-social-youtube:before,.ion-social-youtube-outline:before,.ion-soup-can:before,.ion-soup-can-outline:before,.ion-speakerphone:before,.ion-speedometer:before,.ion-spoon:before,.ion-star:before,.ion-stats-bars:before,.ion-steam:before,.ion-stop:before,.ion-thermometer:before,.ion-thumbsdown:before,.ion-thumbsup:before,.ion-toggle:before,.ion-toggle-filled:before,.ion-transgender:before,.ion-trash-a:before,.ion-trash-b:before,.ion-trophy:before,.ion-tshirt:before,.ion-tshirt-outline:before,.ion-umbrella:before,.ion-university:before,.ion-unlocked:before,.ion-upload:before,.ion-usb:before,.ion-videocamera:before,.ion-volume-high:before,.ion-volume-low:before,.ion-volume-medium:before,.ion-volume-mute:before,.ion-wand:before,.ion-waterdrop:before,.ion-wifi:before,.ion-wineglass:before,.ion-woman:before,.ion-wrench:before,.ion-xbox:before{display:inline-block;font-family:\"Ionicons\";speak:none;font-style:normal;font-weight:normal;font-variant:normal;text-transform:none;text-rendering:auto;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.ion-alert:before{content:\"\\f101\"}.ion-alert-circled:before{content:\"\\f100\"}.ion-android-add:before{content:\"\\f2c7\"}.ion-android-add-circle:before{content:\"\\f359\"}.ion-android-alarm-clock:before{content:\"\\f35a\"}.ion-android-alert:before{content:\"\\f35b\"}.ion-android-apps:before{content:\"\\f35c\"}.ion-android-archive:before{content:\"\\f2c9\"}.ion-android-arrow-back:before{content:\"\\f2ca\"}.ion-android-arrow-down:before{content:\"\\f35d\"}.ion-android-arrow-dropdown:before{content:\"\\f35f\"}.ion-android-arrow-dropdown-circle:before{content:\"\\f35e\"}.ion-android-arrow-dropleft:before{content:\"\\f361\"}.ion-android-arrow-dropleft-circle:before{content:\"\\f360\"}.ion-android-arrow-dropright:before{content:\"\\f363\"}.ion-android-arrow-dropright-circle:before{content:\"\\f362\"}.ion-android-arrow-dropup:before{content:\"\\f365\"}.ion-android-arrow-dropup-circle:before{content:\"\\f364\"}.ion-android-arrow-forward:before{content:\"\\f30f\"}.ion-android-arrow-up:before{content:\"\\f366\"}.ion-android-attach:before{content:\"\\f367\"}.ion-android-bar:before{content:\"\\f368\"}.ion-android-bicycle:before{content:\"\\f369\"}.ion-android-boat:before{content:\"\\f36a\"}.ion-android-bookmark:before{content:\"\\f36b\"}.ion-android-bulb:before{content:\"\\f36c\"}.ion-android-bus:before{content:\"\\f36d\"}.ion-android-calendar:before{content:\"\\f2d1\"}.ion-android-call:before{content:\"\\f2d2\"}.ion-android-camera:before{content:\"\\f2d3\"}.ion-android-cancel:before{content:\"\\f36e\"}.ion-android-car:before{content:\"\\f36f\"}.ion-android-cart:before{content:\"\\f370\"}.ion-android-chat:before{content:\"\\f2d4\"}.ion-android-checkbox:before{content:\"\\f374\"}.ion-android-checkbox-blank:before{content:\"\\f371\"}.ion-android-checkbox-outline:before{content:\"\\f373\"}.ion-android-checkbox-outline-blank:before{content:\"\\f372\"}.ion-android-checkmark-circle:before{content:\"\\f375\"}.ion-android-clipboard:before{content:\"\\f376\"}.ion-android-close:before{content:\"\\f2d7\"}.ion-android-cloud:before{content:\"\\f37a\"}.ion-android-cloud-circle:before{content:\"\\f377\"}.ion-android-cloud-done:before{content:\"\\f378\"}.ion-android-cloud-outline:before{content:\"\\f379\"}.ion-android-color-palette:before{content:\"\\f37b\"}.ion-android-compass:before{content:\"\\f37c\"}.ion-android-contact:before{content:\"\\f2d8\"}.ion-android-contacts:before{content:\"\\f2d9\"}.ion-android-contract:before{content:\"\\f37d\"}.ion-android-create:before{content:\"\\f37e\"}.ion-android-delete:before{content:\"\\f37f\"}.ion-android-desktop:before{content:\"\\f380\"}.ion-android-document:before{content:\"\\f381\"}.ion-android-done:before{content:\"\\f383\"}.ion-android-done-all:before{content:\"\\f382\"}.ion-android-download:before{content:\"\\f2dd\"}.ion-android-drafts:before{content:\"\\f384\"}.ion-android-exit:before{content:\"\\f385\"}.ion-android-expand:before{content:\"\\f386\"}.ion-android-favorite:before{content:\"\\f388\"}.ion-android-favorite-outline:before{content:\"\\f387\"}.ion-android-film:before{content:\"\\f389\"}.ion-android-folder:before{content:\"\\f2e0\"}.ion-android-folder-open:before{content:\"\\f38a\"}.ion-android-funnel:before{content:\"\\f38b\"}.ion-android-globe:before{content:\"\\f38c\"}.ion-android-hand:before{content:\"\\f2e3\"}.ion-android-hangout:before{content:\"\\f38d\"}.ion-android-happy:before{content:\"\\f38e\"}.ion-android-home:before{content:\"\\f38f\"}.ion-android-image:before{content:\"\\f2e4\"}.ion-android-laptop:before{content:\"\\f390\"}.ion-android-list:before{content:\"\\f391\"}.ion-android-locate:before{content:\"\\f2e9\"}.ion-android-lock:before{content:\"\\f392\"}.ion-android-mail:before{content:\"\\f2eb\"}.ion-android-map:before{content:\"\\f393\"}.ion-android-menu:before{content:\"\\f394\"}.ion-android-microphone:before{content:\"\\f2ec\"}.ion-android-microphone-off:before{content:\"\\f395\"}.ion-android-more-horizontal:before{content:\"\\f396\"}.ion-android-more-vertical:before{content:\"\\f397\"}.ion-android-navigate:before{content:\"\\f398\"}.ion-android-notifications:before{content:\"\\f39b\"}.ion-android-notifications-none:before{content:\"\\f399\"}.ion-android-notifications-off:before{content:\"\\f39a\"}.ion-android-open:before{content:\"\\f39c\"}.ion-android-options:before{content:\"\\f39d\"}.ion-android-people:before{content:\"\\f39e\"}.ion-android-person:before{content:\"\\f3a0\"}.ion-android-person-add:before{content:\"\\f39f\"}.ion-android-phone-landscape:before{content:\"\\f3a1\"}.ion-android-phone-portrait:before{content:\"\\f3a2\"}.ion-android-pin:before{content:\"\\f3a3\"}.ion-android-plane:before{content:\"\\f3a4\"}.ion-android-playstore:before{content:\"\\f2f0\"}.ion-android-print:before{content:\"\\f3a5\"}.ion-android-radio-button-off:before{content:\"\\f3a6\"}.ion-android-radio-button-on:before{content:\"\\f3a7\"}.ion-android-refresh:before{content:\"\\f3a8\"}.ion-android-remove:before{content:\"\\f2f4\"}.ion-android-remove-circle:before{content:\"\\f3a9\"}.ion-android-restaurant:before{content:\"\\f3aa\"}.ion-android-sad:before{content:\"\\f3ab\"}.ion-android-search:before{content:\"\\f2f5\"}.ion-android-send:before{content:\"\\f2f6\"}.ion-android-settings:before{content:\"\\f2f7\"}.ion-android-share:before{content:\"\\f2f8\"}.ion-android-share-alt:before{content:\"\\f3ac\"}.ion-android-star:before{content:\"\\f2fc\"}.ion-android-star-half:before{content:\"\\f3ad\"}.ion-android-star-outline:before{content:\"\\f3ae\"}.ion-android-stopwatch:before{content:\"\\f2fd\"}.ion-android-subway:before{content:\"\\f3af\"}.ion-android-sunny:before{content:\"\\f3b0\"}.ion-android-sync:before{content:\"\\f3b1\"}.ion-android-textsms:before{content:\"\\f3b2\"}.ion-android-time:before{content:\"\\f3b3\"}.ion-android-train:before{content:\"\\f3b4\"}.ion-android-unlock:before{content:\"\\f3b5\"}.ion-android-upload:before{content:\"\\f3b6\"}.ion-android-volume-down:before{content:\"\\f3b7\"}.ion-android-volume-mute:before{content:\"\\f3b8\"}.ion-android-volume-off:before{content:\"\\f3b9\"}.ion-android-volume-up:before{content:\"\\f3ba\"}.ion-android-walk:before{content:\"\\f3bb\"}.ion-android-warning:before{content:\"\\f3bc\"}.ion-android-watch:before{content:\"\\f3bd\"}.ion-android-wifi:before{content:\"\\f305\"}.ion-aperture:before{content:\"\\f313\"}.ion-archive:before{content:\"\\f102\"}.ion-arrow-down-a:before{content:\"\\f103\"}.ion-arrow-down-b:before{content:\"\\f104\"}.ion-arrow-down-c:before{content:\"\\f105\"}.ion-arrow-expand:before{content:\"\\f25e\"}.ion-arrow-graph-down-left:before{content:\"\\f25f\"}.ion-arrow-graph-down-right:before{content:\"\\f260\"}.ion-arrow-graph-up-left:before{content:\"\\f261\"}.ion-arrow-graph-up-right:before{content:\"\\f262\"}.ion-arrow-left-a:before{content:\"\\f106\"}.ion-arrow-left-b:before{content:\"\\f107\"}.ion-arrow-left-c:before{content:\"\\f108\"}.ion-arrow-move:before{content:\"\\f263\"}.ion-arrow-resize:before{content:\"\\f264\"}.ion-arrow-return-left:before{content:\"\\f265\"}.ion-arrow-return-right:before{content:\"\\f266\"}.ion-arrow-right-a:before{content:\"\\f109\"}.ion-arrow-right-b:before{content:\"\\f10a\"}.ion-arrow-right-c:before{content:\"\\f10b\"}.ion-arrow-shrink:before{content:\"\\f267\"}.ion-arrow-swap:before{content:\"\\f268\"}.ion-arrow-up-a:before{content:\"\\f10c\"}.ion-arrow-up-b:before{content:\"\\f10d\"}.ion-arrow-up-c:before{content:\"\\f10e\"}.ion-asterisk:before{content:\"\\f314\"}.ion-at:before{content:\"\\f10f\"}.ion-backspace:before{content:\"\\f3bf\"}.ion-backspace-outline:before{content:\"\\f3be\"}.ion-bag:before{content:\"\\f110\"}.ion-battery-charging:before{content:\"\\f111\"}.ion-battery-empty:before{content:\"\\f112\"}.ion-battery-full:before{content:\"\\f113\"}.ion-battery-half:before{content:\"\\f114\"}.ion-battery-low:before{content:\"\\f115\"}.ion-beaker:before{content:\"\\f269\"}.ion-beer:before{content:\"\\f26a\"}.ion-bluetooth:before{content:\"\\f116\"}.ion-bonfire:before{content:\"\\f315\"}.ion-bookmark:before{content:\"\\f26b\"}.ion-bowtie:before{content:\"\\f3c0\"}.ion-briefcase:before{content:\"\\f26c\"}.ion-bug:before{content:\"\\f2be\"}.ion-calculator:before{content:\"\\f26d\"}.ion-calendar:before{content:\"\\f117\"}.ion-camera:before{content:\"\\f118\"}.ion-card:before{content:\"\\f119\"}.ion-cash:before{content:\"\\f316\"}.ion-chatbox:before{content:\"\\f11b\"}.ion-chatbox-working:before{content:\"\\f11a\"}.ion-chatboxes:before{content:\"\\f11c\"}.ion-chatbubble:before{content:\"\\f11e\"}.ion-chatbubble-working:before{content:\"\\f11d\"}.ion-chatbubbles:before{content:\"\\f11f\"}.ion-checkmark:before{content:\"\\f122\"}.ion-checkmark-circled:before{content:\"\\f120\"}.ion-checkmark-round:before{content:\"\\f121\"}.ion-chevron-down:before{content:\"\\f123\"}.ion-chevron-left:before{content:\"\\f124\"}.ion-chevron-right:before{content:\"\\f125\"}.ion-chevron-up:before{content:\"\\f126\"}.ion-clipboard:before{content:\"\\f127\"}.ion-clock:before{content:\"\\f26e\"}.ion-close:before{content:\"\\f12a\"}.ion-close-circled:before{content:\"\\f128\"}.ion-close-round:before{content:\"\\f129\"}.ion-closed-captioning:before{content:\"\\f317\"}.ion-cloud:before{content:\"\\f12b\"}.ion-code:before{content:\"\\f271\"}.ion-code-download:before{content:\"\\f26f\"}.ion-code-working:before{content:\"\\f270\"}.ion-coffee:before{content:\"\\f272\"}.ion-compass:before{content:\"\\f273\"}.ion-compose:before{content:\"\\f12c\"}.ion-connection-bars:before{content:\"\\f274\"}.ion-contrast:before{content:\"\\f275\"}.ion-crop:before{content:\"\\f3c1\"}.ion-cube:before{content:\"\\f318\"}.ion-disc:before{content:\"\\f12d\"}.ion-document:before{content:\"\\f12f\"}.ion-document-text:before{content:\"\\f12e\"}.ion-drag:before{content:\"\\f130\"}.ion-earth:before{content:\"\\f276\"}.ion-easel:before{content:\"\\f3c2\"}.ion-edit:before{content:\"\\f2bf\"}.ion-egg:before{content:\"\\f277\"}.ion-eject:before{content:\"\\f131\"}.ion-email:before{content:\"\\f132\"}.ion-email-unread:before{content:\"\\f3c3\"}.ion-erlenmeyer-flask:before{content:\"\\f3c5\"}.ion-erlenmeyer-flask-bubbles:before{content:\"\\f3c4\"}.ion-eye:before{content:\"\\f133\"}.ion-eye-disabled:before{content:\"\\f306\"}.ion-female:before{content:\"\\f278\"}.ion-filing:before{content:\"\\f134\"}.ion-film-marker:before{content:\"\\f135\"}.ion-fireball:before{content:\"\\f319\"}.ion-flag:before{content:\"\\f279\"}.ion-flame:before{content:\"\\f31a\"}.ion-flash:before{content:\"\\f137\"}.ion-flash-off:before{content:\"\\f136\"}.ion-folder:before{content:\"\\f139\"}.ion-fork:before{content:\"\\f27a\"}.ion-fork-repo:before{content:\"\\f2c0\"}.ion-forward:before{content:\"\\f13a\"}.ion-funnel:before{content:\"\\f31b\"}.ion-gear-a:before{content:\"\\f13d\"}.ion-gear-b:before{content:\"\\f13e\"}.ion-grid:before{content:\"\\f13f\"}.ion-hammer:before{content:\"\\f27b\"}.ion-happy:before{content:\"\\f31c\"}.ion-happy-outline:before{content:\"\\f3c6\"}.ion-headphone:before{content:\"\\f140\"}.ion-heart:before{content:\"\\f141\"}.ion-heart-broken:before{content:\"\\f31d\"}.ion-help:before{content:\"\\f143\"}.ion-help-buoy:before{content:\"\\f27c\"}.ion-help-circled:before{content:\"\\f142\"}.ion-home:before{content:\"\\f144\"}.ion-icecream:before{content:\"\\f27d\"}.ion-image:before{content:\"\\f147\"}.ion-images:before{content:\"\\f148\"}.ion-information:before{content:\"\\f14a\"}.ion-information-circled:before{content:\"\\f149\"}.ion-ionic:before{content:\"\\f14b\"}.ion-ios-alarm:before{content:\"\\f3c8\"}.ion-ios-alarm-outline:before{content:\"\\f3c7\"}.ion-ios-albums:before{content:\"\\f3ca\"}.ion-ios-albums-outline:before{content:\"\\f3c9\"}.ion-ios-americanfootball:before{content:\"\\f3cc\"}.ion-ios-americanfootball-outline:before{content:\"\\f3cb\"}.ion-ios-analytics:before{content:\"\\f3ce\"}.ion-ios-analytics-outline:before{content:\"\\f3cd\"}.ion-ios-arrow-back:before{content:\"\\f3cf\"}.ion-ios-arrow-down:before{content:\"\\f3d0\"}.ion-ios-arrow-forward:before{content:\"\\f3d1\"}.ion-ios-arrow-left:before{content:\"\\f3d2\"}.ion-ios-arrow-right:before{content:\"\\f3d3\"}.ion-ios-arrow-thin-down:before{content:\"\\f3d4\"}.ion-ios-arrow-thin-left:before{content:\"\\f3d5\"}.ion-ios-arrow-thin-right:before{content:\"\\f3d6\"}.ion-ios-arrow-thin-up:before{content:\"\\f3d7\"}.ion-ios-arrow-up:before{content:\"\\f3d8\"}.ion-ios-at:before{content:\"\\f3da\"}.ion-ios-at-outline:before{content:\"\\f3d9\"}.ion-ios-barcode:before{content:\"\\f3dc\"}.ion-ios-barcode-outline:before{content:\"\\f3db\"}.ion-ios-baseball:before{content:\"\\f3de\"}.ion-ios-baseball-outline:before{content:\"\\f3dd\"}.ion-ios-basketball:before{content:\"\\f3e0\"}.ion-ios-basketball-outline:before{content:\"\\f3df\"}.ion-ios-bell:before{content:\"\\f3e2\"}.ion-ios-bell-outline:before{content:\"\\f3e1\"}.ion-ios-body:before{content:\"\\f3e4\"}.ion-ios-body-outline:before{content:\"\\f3e3\"}.ion-ios-bolt:before{content:\"\\f3e6\"}.ion-ios-bolt-outline:before{content:\"\\f3e5\"}.ion-ios-book:before{content:\"\\f3e8\"}.ion-ios-book-outline:before{content:\"\\f3e7\"}.ion-ios-bookmarks:before{content:\"\\f3ea\"}.ion-ios-bookmarks-outline:before{content:\"\\f3e9\"}.ion-ios-box:before{content:\"\\f3ec\"}.ion-ios-box-outline:before{content:\"\\f3eb\"}.ion-ios-briefcase:before{content:\"\\f3ee\"}.ion-ios-briefcase-outline:before{content:\"\\f3ed\"}.ion-ios-browsers:before{content:\"\\f3f0\"}.ion-ios-browsers-outline:before{content:\"\\f3ef\"}.ion-ios-calculator:before{content:\"\\f3f2\"}.ion-ios-calculator-outline:before{content:\"\\f3f1\"}.ion-ios-calendar:before{content:\"\\f3f4\"}.ion-ios-calendar-outline:before{content:\"\\f3f3\"}.ion-ios-camera:before{content:\"\\f3f6\"}.ion-ios-camera-outline:before{content:\"\\f3f5\"}.ion-ios-cart:before{content:\"\\f3f8\"}.ion-ios-cart-outline:before{content:\"\\f3f7\"}.ion-ios-chatboxes:before{content:\"\\f3fa\"}.ion-ios-chatboxes-outline:before{content:\"\\f3f9\"}.ion-ios-chatbubble:before{content:\"\\f3fc\"}.ion-ios-chatbubble-outline:before{content:\"\\f3fb\"}.ion-ios-checkmark:before{content:\"\\f3ff\"}.ion-ios-checkmark-empty:before{content:\"\\f3fd\"}.ion-ios-checkmark-outline:before{content:\"\\f3fe\"}.ion-ios-circle-filled:before{content:\"\\f400\"}.ion-ios-circle-outline:before{content:\"\\f401\"}.ion-ios-clock:before{content:\"\\f403\"}.ion-ios-clock-outline:before{content:\"\\f402\"}.ion-ios-close:before{content:\"\\f406\"}.ion-ios-close-empty:before{content:\"\\f404\"}.ion-ios-close-outline:before{content:\"\\f405\"}.ion-ios-cloud:before{content:\"\\f40c\"}.ion-ios-cloud-download:before{content:\"\\f408\"}.ion-ios-cloud-download-outline:before{content:\"\\f407\"}.ion-ios-cloud-outline:before{content:\"\\f409\"}.ion-ios-cloud-upload:before{content:\"\\f40b\"}.ion-ios-cloud-upload-outline:before{content:\"\\f40a\"}.ion-ios-cloudy:before{content:\"\\f410\"}.ion-ios-cloudy-night:before{content:\"\\f40e\"}.ion-ios-cloudy-night-outline:before{content:\"\\f40d\"}.ion-ios-cloudy-outline:before{content:\"\\f40f\"}.ion-ios-cog:before{content:\"\\f412\"}.ion-ios-cog-outline:before{content:\"\\f411\"}.ion-ios-color-filter:before{content:\"\\f414\"}.ion-ios-color-filter-outline:before{content:\"\\f413\"}.ion-ios-color-wand:before{content:\"\\f416\"}.ion-ios-color-wand-outline:before{content:\"\\f415\"}.ion-ios-compose:before{content:\"\\f418\"}.ion-ios-compose-outline:before{content:\"\\f417\"}.ion-ios-contact:before{content:\"\\f41a\"}.ion-ios-contact-outline:before{content:\"\\f419\"}.ion-ios-copy:before{content:\"\\f41c\"}.ion-ios-copy-outline:before{content:\"\\f41b\"}.ion-ios-crop:before{content:\"\\f41e\"}.ion-ios-crop-strong:before{content:\"\\f41d\"}.ion-ios-download:before{content:\"\\f420\"}.ion-ios-download-outline:before{content:\"\\f41f\"}.ion-ios-drag:before{content:\"\\f421\"}.ion-ios-email:before{content:\"\\f423\"}.ion-ios-email-outline:before{content:\"\\f422\"}.ion-ios-eye:before{content:\"\\f425\"}.ion-ios-eye-outline:before{content:\"\\f424\"}.ion-ios-fastforward:before{content:\"\\f427\"}.ion-ios-fastforward-outline:before{content:\"\\f426\"}.ion-ios-filing:before{content:\"\\f429\"}.ion-ios-filing-outline:before{content:\"\\f428\"}.ion-ios-film:before{content:\"\\f42b\"}.ion-ios-film-outline:before{content:\"\\f42a\"}.ion-ios-flag:before{content:\"\\f42d\"}.ion-ios-flag-outline:before{content:\"\\f42c\"}.ion-ios-flame:before{content:\"\\f42f\"}.ion-ios-flame-outline:before{content:\"\\f42e\"}.ion-ios-flask:before{content:\"\\f431\"}.ion-ios-flask-outline:before{content:\"\\f430\"}.ion-ios-flower:before{content:\"\\f433\"}.ion-ios-flower-outline:before{content:\"\\f432\"}.ion-ios-folder:before{content:\"\\f435\"}.ion-ios-folder-outline:before{content:\"\\f434\"}.ion-ios-football:before{content:\"\\f437\"}.ion-ios-football-outline:before{content:\"\\f436\"}.ion-ios-game-controller-a:before{content:\"\\f439\"}.ion-ios-game-controller-a-outline:before{content:\"\\f438\"}.ion-ios-game-controller-b:before{content:\"\\f43b\"}.ion-ios-game-controller-b-outline:before{content:\"\\f43a\"}.ion-ios-gear:before{content:\"\\f43d\"}.ion-ios-gear-outline:before{content:\"\\f43c\"}.ion-ios-glasses:before{content:\"\\f43f\"}.ion-ios-glasses-outline:before{content:\"\\f43e\"}.ion-ios-grid-view:before{content:\"\\f441\"}.ion-ios-grid-view-outline:before{content:\"\\f440\"}.ion-ios-heart:before{content:\"\\f443\"}.ion-ios-heart-outline:before{content:\"\\f442\"}.ion-ios-help:before{content:\"\\f446\"}.ion-ios-help-empty:before{content:\"\\f444\"}.ion-ios-help-outline:before{content:\"\\f445\"}.ion-ios-home:before{content:\"\\f448\"}.ion-ios-home-outline:before{content:\"\\f447\"}.ion-ios-infinite:before{content:\"\\f44a\"}.ion-ios-infinite-outline:before{content:\"\\f449\"}.ion-ios-information:before{content:\"\\f44d\"}.ion-ios-information-empty:before{content:\"\\f44b\"}.ion-ios-information-outline:before{content:\"\\f44c\"}.ion-ios-ionic-outline:before{content:\"\\f44e\"}.ion-ios-keypad:before{content:\"\\f450\"}.ion-ios-keypad-outline:before{content:\"\\f44f\"}.ion-ios-lightbulb:before{content:\"\\f452\"}.ion-ios-lightbulb-outline:before{content:\"\\f451\"}.ion-ios-list:before{content:\"\\f454\"}.ion-ios-list-outline:before{content:\"\\f453\"}.ion-ios-location:before{content:\"\\f456\"}.ion-ios-location-outline:before{content:\"\\f455\"}.ion-ios-locked:before{content:\"\\f458\"}.ion-ios-locked-outline:before{content:\"\\f457\"}.ion-ios-loop:before{content:\"\\f45a\"}.ion-ios-loop-strong:before{content:\"\\f459\"}.ion-ios-medical:before{content:\"\\f45c\"}.ion-ios-medical-outline:before{content:\"\\f45b\"}.ion-ios-medkit:before{content:\"\\f45e\"}.ion-ios-medkit-outline:before{content:\"\\f45d\"}.ion-ios-mic:before{content:\"\\f461\"}.ion-ios-mic-off:before{content:\"\\f45f\"}.ion-ios-mic-outline:before{content:\"\\f460\"}.ion-ios-minus:before{content:\"\\f464\"}.ion-ios-minus-empty:before{content:\"\\f462\"}.ion-ios-minus-outline:before{content:\"\\f463\"}.ion-ios-monitor:before{content:\"\\f466\"}.ion-ios-monitor-outline:before{content:\"\\f465\"}.ion-ios-moon:before{content:\"\\f468\"}.ion-ios-moon-outline:before{content:\"\\f467\"}.ion-ios-more:before{content:\"\\f46a\"}.ion-ios-more-outline:before{content:\"\\f469\"}.ion-ios-musical-note:before{content:\"\\f46b\"}.ion-ios-musical-notes:before{content:\"\\f46c\"}.ion-ios-navigate:before{content:\"\\f46e\"}.ion-ios-navigate-outline:before{content:\"\\f46d\"}.ion-ios-nutrition:before{content:\"\\f470\"}.ion-ios-nutrition-outline:before{content:\"\\f46f\"}.ion-ios-paper:before{content:\"\\f472\"}.ion-ios-paper-outline:before{content:\"\\f471\"}.ion-ios-paperplane:before{content:\"\\f474\"}.ion-ios-paperplane-outline:before{content:\"\\f473\"}.ion-ios-partlysunny:before{content:\"\\f476\"}.ion-ios-partlysunny-outline:before{content:\"\\f475\"}.ion-ios-pause:before{content:\"\\f478\"}.ion-ios-pause-outline:before{content:\"\\f477\"}.ion-ios-paw:before{content:\"\\f47a\"}.ion-ios-paw-outline:before{content:\"\\f479\"}.ion-ios-people:before{content:\"\\f47c\"}.ion-ios-people-outline:before{content:\"\\f47b\"}.ion-ios-person:before{content:\"\\f47e\"}.ion-ios-person-outline:before{content:\"\\f47d\"}.ion-ios-personadd:before{content:\"\\f480\"}.ion-ios-personadd-outline:before{content:\"\\f47f\"}.ion-ios-photos:before{content:\"\\f482\"}.ion-ios-photos-outline:before{content:\"\\f481\"}.ion-ios-pie:before{content:\"\\f484\"}.ion-ios-pie-outline:before{content:\"\\f483\"}.ion-ios-pint:before{content:\"\\f486\"}.ion-ios-pint-outline:before{content:\"\\f485\"}.ion-ios-play:before{content:\"\\f488\"}.ion-ios-play-outline:before{content:\"\\f487\"}.ion-ios-plus:before{content:\"\\f48b\"}.ion-ios-plus-empty:before{content:\"\\f489\"}.ion-ios-plus-outline:before{content:\"\\f48a\"}.ion-ios-pricetag:before{content:\"\\f48d\"}.ion-ios-pricetag-outline:before{content:\"\\f48c\"}.ion-ios-pricetags:before{content:\"\\f48f\"}.ion-ios-pricetags-outline:before{content:\"\\f48e\"}.ion-ios-printer:before{content:\"\\f491\"}.ion-ios-printer-outline:before{content:\"\\f490\"}.ion-ios-pulse:before{content:\"\\f493\"}.ion-ios-pulse-strong:before{content:\"\\f492\"}.ion-ios-rainy:before{content:\"\\f495\"}.ion-ios-rainy-outline:before{content:\"\\f494\"}.ion-ios-recording:before{content:\"\\f497\"}.ion-ios-recording-outline:before{content:\"\\f496\"}.ion-ios-redo:before{content:\"\\f499\"}.ion-ios-redo-outline:before{content:\"\\f498\"}.ion-ios-refresh:before{content:\"\\f49c\"}.ion-ios-refresh-empty:before{content:\"\\f49a\"}.ion-ios-refresh-outline:before{content:\"\\f49b\"}.ion-ios-reload:before{content:\"\\f49d\"}.ion-ios-reverse-camera:before{content:\"\\f49f\"}.ion-ios-reverse-camera-outline:before{content:\"\\f49e\"}.ion-ios-rewind:before{content:\"\\f4a1\"}.ion-ios-rewind-outline:before{content:\"\\f4a0\"}.ion-ios-rose:before{content:\"\\f4a3\"}.ion-ios-rose-outline:before{content:\"\\f4a2\"}.ion-ios-search:before{content:\"\\f4a5\"}.ion-ios-search-strong:before{content:\"\\f4a4\"}.ion-ios-settings:before{content:\"\\f4a7\"}.ion-ios-settings-strong:before{content:\"\\f4a6\"}.ion-ios-shuffle:before{content:\"\\f4a9\"}.ion-ios-shuffle-strong:before{content:\"\\f4a8\"}.ion-ios-skipbackward:before{content:\"\\f4ab\"}.ion-ios-skipbackward-outline:before{content:\"\\f4aa\"}.ion-ios-skipforward:before{content:\"\\f4ad\"}.ion-ios-skipforward-outline:before{content:\"\\f4ac\"}.ion-ios-snowy:before{content:\"\\f4ae\"}.ion-ios-speedometer:before{content:\"\\f4b0\"}.ion-ios-speedometer-outline:before{content:\"\\f4af\"}.ion-ios-star:before{content:\"\\f4b3\"}.ion-ios-star-half:before{content:\"\\f4b1\"}.ion-ios-star-outline:before{content:\"\\f4b2\"}.ion-ios-stopwatch:before{content:\"\\f4b5\"}.ion-ios-stopwatch-outline:before{content:\"\\f4b4\"}.ion-ios-sunny:before{content:\"\\f4b7\"}.ion-ios-sunny-outline:before{content:\"\\f4b6\"}.ion-ios-telephone:before{content:\"\\f4b9\"}.ion-ios-telephone-outline:before{content:\"\\f4b8\"}.ion-ios-tennisball:before{content:\"\\f4bb\"}.ion-ios-tennisball-outline:before{content:\"\\f4ba\"}.ion-ios-thunderstorm:before{content:\"\\f4bd\"}.ion-ios-thunderstorm-outline:before{content:\"\\f4bc\"}.ion-ios-time:before{content:\"\\f4bf\"}.ion-ios-time-outline:before{content:\"\\f4be\"}.ion-ios-timer:before{content:\"\\f4c1\"}.ion-ios-timer-outline:before{content:\"\\f4c0\"}.ion-ios-toggle:before{content:\"\\f4c3\"}.ion-ios-toggle-outline:before{content:\"\\f4c2\"}.ion-ios-trash:before{content:\"\\f4c5\"}.ion-ios-trash-outline:before{content:\"\\f4c4\"}.ion-ios-undo:before{content:\"\\f4c7\"}.ion-ios-undo-outline:before{content:\"\\f4c6\"}.ion-ios-unlocked:before{content:\"\\f4c9\"}.ion-ios-unlocked-outline:before{content:\"\\f4c8\"}.ion-ios-upload:before{content:\"\\f4cb\"}.ion-ios-upload-outline:before{content:\"\\f4ca\"}.ion-ios-videocam:before{content:\"\\f4cd\"}.ion-ios-videocam-outline:before{content:\"\\f4cc\"}.ion-ios-volume-high:before{content:\"\\f4ce\"}.ion-ios-volume-low:before{content:\"\\f4cf\"}.ion-ios-wineglass:before{content:\"\\f4d1\"}.ion-ios-wineglass-outline:before{content:\"\\f4d0\"}.ion-ios-world:before{content:\"\\f4d3\"}.ion-ios-world-outline:before{content:\"\\f4d2\"}.ion-ipad:before{content:\"\\f1f9\"}.ion-iphone:before{content:\"\\f1fa\"}.ion-ipod:before{content:\"\\f1fb\"}.ion-jet:before{content:\"\\f295\"}.ion-key:before{content:\"\\f296\"}.ion-knife:before{content:\"\\f297\"}.ion-laptop:before{content:\"\\f1fc\"}.ion-leaf:before{content:\"\\f1fd\"}.ion-levels:before{content:\"\\f298\"}.ion-lightbulb:before{content:\"\\f299\"}.ion-link:before{content:\"\\f1fe\"}.ion-load-a:before{content:\"\\f29a\"}.ion-load-b:before{content:\"\\f29b\"}.ion-load-c:before{content:\"\\f29c\"}.ion-load-d:before{content:\"\\f29d\"}.ion-location:before{content:\"\\f1ff\"}.ion-lock-combination:before{content:\"\\f4d4\"}.ion-locked:before{content:\"\\f200\"}.ion-log-in:before{content:\"\\f29e\"}.ion-log-out:before{content:\"\\f29f\"}.ion-loop:before{content:\"\\f201\"}.ion-magnet:before{content:\"\\f2a0\"}.ion-male:before{content:\"\\f2a1\"}.ion-man:before{content:\"\\f202\"}.ion-map:before{content:\"\\f203\"}.ion-medkit:before{content:\"\\f2a2\"}.ion-merge:before{content:\"\\f33f\"}.ion-mic-a:before{content:\"\\f204\"}.ion-mic-b:before{content:\"\\f205\"}.ion-mic-c:before{content:\"\\f206\"}.ion-minus:before{content:\"\\f209\"}.ion-minus-circled:before{content:\"\\f207\"}.ion-minus-round:before{content:\"\\f208\"}.ion-model-s:before{content:\"\\f2c1\"}.ion-monitor:before{content:\"\\f20a\"}.ion-more:before{content:\"\\f20b\"}.ion-mouse:before{content:\"\\f340\"}.ion-music-note:before{content:\"\\f20c\"}.ion-navicon:before{content:\"\\f20e\"}.ion-navicon-round:before{content:\"\\f20d\"}.ion-navigate:before{content:\"\\f2a3\"}.ion-network:before{content:\"\\f341\"}.ion-no-smoking:before{content:\"\\f2c2\"}.ion-nuclear:before{content:\"\\f2a4\"}.ion-outlet:before{content:\"\\f342\"}.ion-paintbrush:before{content:\"\\f4d5\"}.ion-paintbucket:before{content:\"\\f4d6\"}.ion-paper-airplane:before{content:\"\\f2c3\"}.ion-paperclip:before{content:\"\\f20f\"}.ion-pause:before{content:\"\\f210\"}.ion-person:before{content:\"\\f213\"}.ion-person-add:before{content:\"\\f211\"}.ion-person-stalker:before{content:\"\\f212\"}.ion-pie-graph:before{content:\"\\f2a5\"}.ion-pin:before{content:\"\\f2a6\"}.ion-pinpoint:before{content:\"\\f2a7\"}.ion-pizza:before{content:\"\\f2a8\"}.ion-plane:before{content:\"\\f214\"}.ion-planet:before{content:\"\\f343\"}.ion-play:before{content:\"\\f215\"}.ion-playstation:before{content:\"\\f30a\"}.ion-plus:before{content:\"\\f218\"}.ion-plus-circled:before{content:\"\\f216\"}.ion-plus-round:before{content:\"\\f217\"}.ion-podium:before{content:\"\\f344\"}.ion-pound:before{content:\"\\f219\"}.ion-power:before{content:\"\\f2a9\"}.ion-pricetag:before{content:\"\\f2aa\"}.ion-pricetags:before{content:\"\\f2ab\"}.ion-printer:before{content:\"\\f21a\"}.ion-pull-request:before{content:\"\\f345\"}.ion-qr-scanner:before{content:\"\\f346\"}.ion-quote:before{content:\"\\f347\"}.ion-radio-waves:before{content:\"\\f2ac\"}.ion-record:before{content:\"\\f21b\"}.ion-refresh:before{content:\"\\f21c\"}.ion-reply:before{content:\"\\f21e\"}.ion-reply-all:before{content:\"\\f21d\"}.ion-ribbon-a:before{content:\"\\f348\"}.ion-ribbon-b:before{content:\"\\f349\"}.ion-sad:before{content:\"\\f34a\"}.ion-sad-outline:before{content:\"\\f4d7\"}.ion-scissors:before{content:\"\\f34b\"}.ion-search:before{content:\"\\f21f\"}.ion-settings:before{content:\"\\f2ad\"}.ion-share:before{content:\"\\f220\"}.ion-shuffle:before{content:\"\\f221\"}.ion-skip-backward:before{content:\"\\f222\"}.ion-skip-forward:before{content:\"\\f223\"}.ion-social-android:before{content:\"\\f225\"}.ion-social-android-outline:before{content:\"\\f224\"}.ion-social-angular:before{content:\"\\f4d9\"}.ion-social-angular-outline:before{content:\"\\f4d8\"}.ion-social-apple:before{content:\"\\f227\"}.ion-social-apple-outline:before{content:\"\\f226\"}.ion-social-bitcoin:before{content:\"\\f2af\"}.ion-social-bitcoin-outline:before{content:\"\\f2ae\"}.ion-social-buffer:before{content:\"\\f229\"}.ion-social-buffer-outline:before{content:\"\\f228\"}.ion-social-chrome:before{content:\"\\f4db\"}.ion-social-chrome-outline:before{content:\"\\f4da\"}.ion-social-codepen:before{content:\"\\f4dd\"}.ion-social-codepen-outline:before{content:\"\\f4dc\"}.ion-social-css3:before{content:\"\\f4df\"}.ion-social-css3-outline:before{content:\"\\f4de\"}.ion-social-designernews:before{content:\"\\f22b\"}.ion-social-designernews-outline:before{content:\"\\f22a\"}.ion-social-dribbble:before{content:\"\\f22d\"}.ion-social-dribbble-outline:before{content:\"\\f22c\"}.ion-social-dropbox:before{content:\"\\f22f\"}.ion-social-dropbox-outline:before{content:\"\\f22e\"}.ion-social-euro:before{content:\"\\f4e1\"}.ion-social-euro-outline:before{content:\"\\f4e0\"}.ion-social-facebook:before{content:\"\\f231\"}.ion-social-facebook-outline:before{content:\"\\f230\"}.ion-social-foursquare:before{content:\"\\f34d\"}.ion-social-foursquare-outline:before{content:\"\\f34c\"}.ion-social-freebsd-devil:before{content:\"\\f2c4\"}.ion-social-github:before{content:\"\\f233\"}.ion-social-github-outline:before{content:\"\\f232\"}.ion-social-google:before{content:\"\\f34f\"}.ion-social-google-outline:before{content:\"\\f34e\"}.ion-social-googleplus:before{content:\"\\f235\"}.ion-social-googleplus-outline:before{content:\"\\f234\"}.ion-social-hackernews:before{content:\"\\f237\"}.ion-social-hackernews-outline:before{content:\"\\f236\"}.ion-social-html5:before{content:\"\\f4e3\"}.ion-social-html5-outline:before{content:\"\\f4e2\"}.ion-social-instagram:before{content:\"\\f351\"}.ion-social-instagram-outline:before{content:\"\\f350\"}.ion-social-javascript:before{content:\"\\f4e5\"}.ion-social-javascript-outline:before{content:\"\\f4e4\"}.ion-social-linkedin:before{content:\"\\f239\"}.ion-social-linkedin-outline:before{content:\"\\f238\"}.ion-social-markdown:before{content:\"\\f4e6\"}.ion-social-nodejs:before{content:\"\\f4e7\"}.ion-social-octocat:before{content:\"\\f4e8\"}.ion-social-pinterest:before{content:\"\\f2b1\"}.ion-social-pinterest-outline:before{content:\"\\f2b0\"}.ion-social-python:before{content:\"\\f4e9\"}.ion-social-reddit:before{content:\"\\f23b\"}.ion-social-reddit-outline:before{content:\"\\f23a\"}.ion-social-rss:before{content:\"\\f23d\"}.ion-social-rss-outline:before{content:\"\\f23c\"}.ion-social-sass:before{content:\"\\f4ea\"}.ion-social-skype:before{content:\"\\f23f\"}.ion-social-skype-outline:before{content:\"\\f23e\"}.ion-social-snapchat:before{content:\"\\f4ec\"}.ion-social-snapchat-outline:before{content:\"\\f4eb\"}.ion-social-tumblr:before{content:\"\\f241\"}.ion-social-tumblr-outline:before{content:\"\\f240\"}.ion-social-tux:before{content:\"\\f2c5\"}.ion-social-twitch:before{content:\"\\f4ee\"}.ion-social-twitch-outline:before{content:\"\\f4ed\"}.ion-social-twitter:before{content:\"\\f243\"}.ion-social-twitter-outline:before{content:\"\\f242\"}.ion-social-usd:before{content:\"\\f353\"}.ion-social-usd-outline:before{content:\"\\f352\"}.ion-social-vimeo:before{content:\"\\f245\"}.ion-social-vimeo-outline:before{content:\"\\f244\"}.ion-social-whatsapp:before{content:\"\\f4f0\"}.ion-social-whatsapp-outline:before{content:\"\\f4ef\"}.ion-social-windows:before{content:\"\\f247\"}.ion-social-windows-outline:before{content:\"\\f246\"}.ion-social-wordpress:before{content:\"\\f249\"}.ion-social-wordpress-outline:before{content:\"\\f248\"}.ion-social-yahoo:before{content:\"\\f24b\"}.ion-social-yahoo-outline:before{content:\"\\f24a\"}.ion-social-yen:before{content:\"\\f4f2\"}.ion-social-yen-outline:before{content:\"\\f4f1\"}.ion-social-youtube:before{content:\"\\f24d\"}.ion-social-youtube-outline:before{content:\"\\f24c\"}.ion-soup-can:before{content:\"\\f4f4\"}.ion-soup-can-outline:before{content:\"\\f4f3\"}.ion-speakerphone:before{content:\"\\f2b2\"}.ion-speedometer:before{content:\"\\f2b3\"}.ion-spoon:before{content:\"\\f2b4\"}.ion-star:before{content:\"\\f24e\"}.ion-stats-bars:before{content:\"\\f2b5\"}.ion-steam:before{content:\"\\f30b\"}.ion-stop:before{content:\"\\f24f\"}.ion-thermometer:before{content:\"\\f2b6\"}.ion-thumbsdown:before{content:\"\\f250\"}.ion-thumbsup:before{content:\"\\f251\"}.ion-toggle:before{content:\"\\f355\"}.ion-toggle-filled:before{content:\"\\f354\"}.ion-transgender:before{content:\"\\f4f5\"}.ion-trash-a:before{content:\"\\f252\"}.ion-trash-b:before{content:\"\\f253\"}.ion-trophy:before{content:\"\\f356\"}.ion-tshirt:before{content:\"\\f4f7\"}.ion-tshirt-outline:before{content:\"\\f4f6\"}.ion-umbrella:before{content:\"\\f2b7\"}.ion-university:before{content:\"\\f357\"}.ion-unlocked:before{content:\"\\f254\"}.ion-upload:before{content:\"\\f255\"}.ion-usb:before{content:\"\\f2b8\"}.ion-videocamera:before{content:\"\\f256\"}.ion-volume-high:before{content:\"\\f257\"}.ion-volume-low:before{content:\"\\f258\"}.ion-volume-medium:before{content:\"\\f259\"}.ion-volume-mute:before{content:\"\\f25a\"}.ion-wand:before{content:\"\\f358\"}.ion-waterdrop:before{content:\"\\f25b\"}.ion-wifi:before{content:\"\\f25c\"}.ion-wineglass:before{content:\"\\f2b9\"}.ion-woman:before{content:\"\\f25d\"}.ion-wrench:before{content:\"\\f2ba\"}.ion-xbox:before{content:\"\\f30c\"}\n"; });
define('text!views/auth/signup/signup.html', ['module'], function(module) { module.exports = "<template> \r\n  <div>\r\n    <form role = \"form\" submit.delegate=\"signup()\">\r\n      <h2 class=\"sr-only\">Login Form</h2>\r\n      <div class=\"illustration\"><i class=\"icon ion-ios-locked-outline\"></i></div>\r\n      <div class=\"form-group\">\r\n        <input class=\"form-control\" type=\"text\" name=\"name\" placeholder=\"Name\" value.bind=\"name\">\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <input class=\"form-control\" type=\"email\" name=\"email\" placeholder=\"Email\" value.bind=\"email\">\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <input class=\"form-control\" type=\"password\" name=\"password\" placeholder=\"Password\" value.bind=\"password\">\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <button class=\"btn btn-primary btn-block\" type=\"submit\">Sign Up</button>\r\n      </div>        \r\n    </form>\r\n  </div>\r\n</template>"; });
define('text!views/users/TableUsers.css', ['module'], function(module) { module.exports = "/* \r\nGeneric Styling, for Desktops/Laptops \r\n*/\r\n\r\ntable input\r\n{\r\n    background: transparent;\r\n    border: none;\r\n\t\tcolor: #fff;\r\n\t\tword-break: break-all;\r\n}\r\n\r\ntable input:focus { \r\n    color: #fff;\r\n\t\tword-break: break-all;\r\n}\r\n\r\n\r\ntable { \r\n  width: 100%; \r\n  border-collapse: collapse; \r\n}\r\n/* Zebra striping */\r\ntr:nth-of-type(odd) { \r\n  background: #444; \r\n}\r\nth { \r\n  background: #333; \r\n  /*color: white; */\r\n  font-weight: bold; \r\n}\r\ntd, th { \r\n  padding: 6px; \r\n  /*border: 1px solid #ccc; */\r\n  text-align: left;\r\n\tword-break: break-all;  \r\n}\r\n\r\n/* \r\nMax width before this PARTICULAR table gets nasty\r\nThis query will take effect for any screen smaller than 760px\r\nand also iPads specifically.\r\n*/\r\n@media \r\nonly screen and (max-width: 760px),\r\n(min-device-width: 768px) and (max-device-width: 1024px)  {\r\n\r\n\t/* Force table to not be like tables anymore */\r\n\ttable, thead, tbody, th, td, tr { \r\n\t\tdisplay: block; \r\n\t}\r\n\t\r\n\t/* Hide table headers (but not display: none;, for accessibility) */\r\n\tthead tr { \r\n\t\tposition: absolute;\r\n\t\ttop: -9999px;\r\n\t\tleft: -9999px;\r\n\t}\r\n\t\r\n\ttr { border: 1px solid #ccc; }\r\n\t\r\n\ttd { \r\n\t\t/* Behave  like a \"row\" */\r\n\t\tborder: none;\r\n\t\t/*border-bottom: 1px solid #eee; */\r\n\t\tposition: relative;\r\n\t\tpadding-left: 50%;\r\n\t\tword-break: break-all; \r\n\t}\r\n\t\r\n\ttd:before { \r\n\t\t/* Now like a table header */\r\n\t\tposition: absolute;\r\n\t\t/* Top/left values mimic padding */\r\n\t\ttop: 6px;\r\n\t\tleft: 6px;\r\n\t\twidth: 45%; \r\n\t\tpadding-right: 10px; \r\n\t\twhite-space: nowrap;\t\t\r\n\t}\r\n\t\r\n\t/*\r\n\tLabel the data\r\n\t*/\r\n\ttd:nth-of-type(1):before { content: \"Name\"; }\r\n\ttd:nth-of-type(2):before { content: \"Email\"; }\r\n\ttd:nth-of-type(3):before { content: \"Action\"; }\r\n\ttd:nth-of-type(4):before { content: \"\"; }\r\n\ttd:nth-of-type(5):before { content: \"\"; }\r\n\ttd:nth-of-type(6):before { content: \"\"; }\r\n\ttd:nth-of-type(7):before { content: \"\"; }\r\n\ttd:nth-of-type(8):before { content: \"\"; }\r\n\ttd:nth-of-type(9):before { content: \"\"; }\r\n\ttd:nth-of-type(10):before { content: \"\"; }\r\n}"; });
define('text!assets/bootstrap/css/bootstrap.min.css', ['module'], function(module) { module.exports = "/*!\n * bootswatch v3.3.7\n * Homepage: http://bootswatch.com\n * Copyright 2012-2016 Thomas Park\n * Licensed under MIT\n * Based on Bootstrap\n*//*!\n * Bootstrap v3.3.7 (http://getbootstrap.com)\n * Copyright 2011-2016 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n *//*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:bold}dfn{font-style:italic}h1{font-size:2em;margin:0.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-0.5em}sub{bottom:-0.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace, monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type=\"button\"],input[type=\"reset\"],input[type=\"submit\"]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=\"checkbox\"],input[type=\"radio\"]{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:0}input[type=\"number\"]::-webkit-inner-spin-button,input[type=\"number\"]::-webkit-outer-spin-button{height:auto}input[type=\"search\"]{-webkit-appearance:textfield;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}input[type=\"search\"]::-webkit-search-cancel-button,input[type=\"search\"]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:0.35em 0.625em 0.75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:bold}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */@media print{*,*:before,*:after{background:transparent !important;color:#000 !important;-webkit-box-shadow:none !important;box-shadow:none !important;text-shadow:none !important}a,a:visited{text-decoration:underline}a[href]:after{content:\" (\" attr(href) \")\"}abbr[title]:after{content:\" (\" attr(title) \")\"}a[href^=\"#\"]:after,a[href^=\"javascript:\"]:after{content:\"\"}pre,blockquote{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}tr,img{page-break-inside:avoid}img{max-width:100% !important}p,h2,h3{orphans:3;widows:3}h2,h3{page-break-after:avoid}.navbar{display:none}.btn>.caret,.dropup>.btn>.caret{border-top-color:#000 !important}.label{border:1px solid #000}.table{border-collapse:collapse !important}.table td,.table th{background-color:#fff !important}.table-bordered th,.table-bordered td{border:1px solid #ddd !important}}@font-face{font-family:'Glyphicons Halflings';src:url('../fonts/glyphicons-halflings-regular.eot');src:url('../fonts/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'),url('../fonts/glyphicons-halflings-regular.woff2') format('woff2'),url('../fonts/glyphicons-halflings-regular.woff') format('woff'),url('../fonts/glyphicons-halflings-regular.ttf') format('truetype'),url('../fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular') format('svg')}.glyphicon{position:relative;top:1px;display:inline-block;font-family:'Glyphicons Halflings';font-style:normal;font-weight:normal;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.glyphicon-asterisk:before{content:\"\\002a\"}.glyphicon-plus:before{content:\"\\002b\"}.glyphicon-euro:before,.glyphicon-eur:before{content:\"\\20ac\"}.glyphicon-minus:before{content:\"\\2212\"}.glyphicon-cloud:before{content:\"\\2601\"}.glyphicon-envelope:before{content:\"\\2709\"}.glyphicon-pencil:before{content:\"\\270f\"}.glyphicon-glass:before{content:\"\\e001\"}.glyphicon-music:before{content:\"\\e002\"}.glyphicon-search:before{content:\"\\e003\"}.glyphicon-heart:before{content:\"\\e005\"}.glyphicon-star:before{content:\"\\e006\"}.glyphicon-star-empty:before{content:\"\\e007\"}.glyphicon-user:before{content:\"\\e008\"}.glyphicon-film:before{content:\"\\e009\"}.glyphicon-th-large:before{content:\"\\e010\"}.glyphicon-th:before{content:\"\\e011\"}.glyphicon-th-list:before{content:\"\\e012\"}.glyphicon-ok:before{content:\"\\e013\"}.glyphicon-remove:before{content:\"\\e014\"}.glyphicon-zoom-in:before{content:\"\\e015\"}.glyphicon-zoom-out:before{content:\"\\e016\"}.glyphicon-off:before{content:\"\\e017\"}.glyphicon-signal:before{content:\"\\e018\"}.glyphicon-cog:before{content:\"\\e019\"}.glyphicon-trash:before{content:\"\\e020\"}.glyphicon-home:before{content:\"\\e021\"}.glyphicon-file:before{content:\"\\e022\"}.glyphicon-time:before{content:\"\\e023\"}.glyphicon-road:before{content:\"\\e024\"}.glyphicon-download-alt:before{content:\"\\e025\"}.glyphicon-download:before{content:\"\\e026\"}.glyphicon-upload:before{content:\"\\e027\"}.glyphicon-inbox:before{content:\"\\e028\"}.glyphicon-play-circle:before{content:\"\\e029\"}.glyphicon-repeat:before{content:\"\\e030\"}.glyphicon-refresh:before{content:\"\\e031\"}.glyphicon-list-alt:before{content:\"\\e032\"}.glyphicon-lock:before{content:\"\\e033\"}.glyphicon-flag:before{content:\"\\e034\"}.glyphicon-headphones:before{content:\"\\e035\"}.glyphicon-volume-off:before{content:\"\\e036\"}.glyphicon-volume-down:before{content:\"\\e037\"}.glyphicon-volume-up:before{content:\"\\e038\"}.glyphicon-qrcode:before{content:\"\\e039\"}.glyphicon-barcode:before{content:\"\\e040\"}.glyphicon-tag:before{content:\"\\e041\"}.glyphicon-tags:before{content:\"\\e042\"}.glyphicon-book:before{content:\"\\e043\"}.glyphicon-bookmark:before{content:\"\\e044\"}.glyphicon-print:before{content:\"\\e045\"}.glyphicon-camera:before{content:\"\\e046\"}.glyphicon-font:before{content:\"\\e047\"}.glyphicon-bold:before{content:\"\\e048\"}.glyphicon-italic:before{content:\"\\e049\"}.glyphicon-text-height:before{content:\"\\e050\"}.glyphicon-text-width:before{content:\"\\e051\"}.glyphicon-align-left:before{content:\"\\e052\"}.glyphicon-align-center:before{content:\"\\e053\"}.glyphicon-align-right:before{content:\"\\e054\"}.glyphicon-align-justify:before{content:\"\\e055\"}.glyphicon-list:before{content:\"\\e056\"}.glyphicon-indent-left:before{content:\"\\e057\"}.glyphicon-indent-right:before{content:\"\\e058\"}.glyphicon-facetime-video:before{content:\"\\e059\"}.glyphicon-picture:before{content:\"\\e060\"}.glyphicon-map-marker:before{content:\"\\e062\"}.glyphicon-adjust:before{content:\"\\e063\"}.glyphicon-tint:before{content:\"\\e064\"}.glyphicon-edit:before{content:\"\\e065\"}.glyphicon-share:before{content:\"\\e066\"}.glyphicon-check:before{content:\"\\e067\"}.glyphicon-move:before{content:\"\\e068\"}.glyphicon-step-backward:before{content:\"\\e069\"}.glyphicon-fast-backward:before{content:\"\\e070\"}.glyphicon-backward:before{content:\"\\e071\"}.glyphicon-play:before{content:\"\\e072\"}.glyphicon-pause:before{content:\"\\e073\"}.glyphicon-stop:before{content:\"\\e074\"}.glyphicon-forward:before{content:\"\\e075\"}.glyphicon-fast-forward:before{content:\"\\e076\"}.glyphicon-step-forward:before{content:\"\\e077\"}.glyphicon-eject:before{content:\"\\e078\"}.glyphicon-chevron-left:before{content:\"\\e079\"}.glyphicon-chevron-right:before{content:\"\\e080\"}.glyphicon-plus-sign:before{content:\"\\e081\"}.glyphicon-minus-sign:before{content:\"\\e082\"}.glyphicon-remove-sign:before{content:\"\\e083\"}.glyphicon-ok-sign:before{content:\"\\e084\"}.glyphicon-question-sign:before{content:\"\\e085\"}.glyphicon-info-sign:before{content:\"\\e086\"}.glyphicon-screenshot:before{content:\"\\e087\"}.glyphicon-remove-circle:before{content:\"\\e088\"}.glyphicon-ok-circle:before{content:\"\\e089\"}.glyphicon-ban-circle:before{content:\"\\e090\"}.glyphicon-arrow-left:before{content:\"\\e091\"}.glyphicon-arrow-right:before{content:\"\\e092\"}.glyphicon-arrow-up:before{content:\"\\e093\"}.glyphicon-arrow-down:before{content:\"\\e094\"}.glyphicon-share-alt:before{content:\"\\e095\"}.glyphicon-resize-full:before{content:\"\\e096\"}.glyphicon-resize-small:before{content:\"\\e097\"}.glyphicon-exclamation-sign:before{content:\"\\e101\"}.glyphicon-gift:before{content:\"\\e102\"}.glyphicon-leaf:before{content:\"\\e103\"}.glyphicon-fire:before{content:\"\\e104\"}.glyphicon-eye-open:before{content:\"\\e105\"}.glyphicon-eye-close:before{content:\"\\e106\"}.glyphicon-warning-sign:before{content:\"\\e107\"}.glyphicon-plane:before{content:\"\\e108\"}.glyphicon-calendar:before{content:\"\\e109\"}.glyphicon-random:before{content:\"\\e110\"}.glyphicon-comment:before{content:\"\\e111\"}.glyphicon-magnet:before{content:\"\\e112\"}.glyphicon-chevron-up:before{content:\"\\e113\"}.glyphicon-chevron-down:before{content:\"\\e114\"}.glyphicon-retweet:before{content:\"\\e115\"}.glyphicon-shopping-cart:before{content:\"\\e116\"}.glyphicon-folder-close:before{content:\"\\e117\"}.glyphicon-folder-open:before{content:\"\\e118\"}.glyphicon-resize-vertical:before{content:\"\\e119\"}.glyphicon-resize-horizontal:before{content:\"\\e120\"}.glyphicon-hdd:before{content:\"\\e121\"}.glyphicon-bullhorn:before{content:\"\\e122\"}.glyphicon-bell:before{content:\"\\e123\"}.glyphicon-certificate:before{content:\"\\e124\"}.glyphicon-thumbs-up:before{content:\"\\e125\"}.glyphicon-thumbs-down:before{content:\"\\e126\"}.glyphicon-hand-right:before{content:\"\\e127\"}.glyphicon-hand-left:before{content:\"\\e128\"}.glyphicon-hand-up:before{content:\"\\e129\"}.glyphicon-hand-down:before{content:\"\\e130\"}.glyphicon-circle-arrow-right:before{content:\"\\e131\"}.glyphicon-circle-arrow-left:before{content:\"\\e132\"}.glyphicon-circle-arrow-up:before{content:\"\\e133\"}.glyphicon-circle-arrow-down:before{content:\"\\e134\"}.glyphicon-globe:before{content:\"\\e135\"}.glyphicon-wrench:before{content:\"\\e136\"}.glyphicon-tasks:before{content:\"\\e137\"}.glyphicon-filter:before{content:\"\\e138\"}.glyphicon-briefcase:before{content:\"\\e139\"}.glyphicon-fullscreen:before{content:\"\\e140\"}.glyphicon-dashboard:before{content:\"\\e141\"}.glyphicon-paperclip:before{content:\"\\e142\"}.glyphicon-heart-empty:before{content:\"\\e143\"}.glyphicon-link:before{content:\"\\e144\"}.glyphicon-phone:before{content:\"\\e145\"}.glyphicon-pushpin:before{content:\"\\e146\"}.glyphicon-usd:before{content:\"\\e148\"}.glyphicon-gbp:before{content:\"\\e149\"}.glyphicon-sort:before{content:\"\\e150\"}.glyphicon-sort-by-alphabet:before{content:\"\\e151\"}.glyphicon-sort-by-alphabet-alt:before{content:\"\\e152\"}.glyphicon-sort-by-order:before{content:\"\\e153\"}.glyphicon-sort-by-order-alt:before{content:\"\\e154\"}.glyphicon-sort-by-attributes:before{content:\"\\e155\"}.glyphicon-sort-by-attributes-alt:before{content:\"\\e156\"}.glyphicon-unchecked:before{content:\"\\e157\"}.glyphicon-expand:before{content:\"\\e158\"}.glyphicon-collapse-down:before{content:\"\\e159\"}.glyphicon-collapse-up:before{content:\"\\e160\"}.glyphicon-log-in:before{content:\"\\e161\"}.glyphicon-flash:before{content:\"\\e162\"}.glyphicon-log-out:before{content:\"\\e163\"}.glyphicon-new-window:before{content:\"\\e164\"}.glyphicon-record:before{content:\"\\e165\"}.glyphicon-save:before{content:\"\\e166\"}.glyphicon-open:before{content:\"\\e167\"}.glyphicon-saved:before{content:\"\\e168\"}.glyphicon-import:before{content:\"\\e169\"}.glyphicon-export:before{content:\"\\e170\"}.glyphicon-send:before{content:\"\\e171\"}.glyphicon-floppy-disk:before{content:\"\\e172\"}.glyphicon-floppy-saved:before{content:\"\\e173\"}.glyphicon-floppy-remove:before{content:\"\\e174\"}.glyphicon-floppy-save:before{content:\"\\e175\"}.glyphicon-floppy-open:before{content:\"\\e176\"}.glyphicon-credit-card:before{content:\"\\e177\"}.glyphicon-transfer:before{content:\"\\e178\"}.glyphicon-cutlery:before{content:\"\\e179\"}.glyphicon-header:before{content:\"\\e180\"}.glyphicon-compressed:before{content:\"\\e181\"}.glyphicon-earphone:before{content:\"\\e182\"}.glyphicon-phone-alt:before{content:\"\\e183\"}.glyphicon-tower:before{content:\"\\e184\"}.glyphicon-stats:before{content:\"\\e185\"}.glyphicon-sd-video:before{content:\"\\e186\"}.glyphicon-hd-video:before{content:\"\\e187\"}.glyphicon-subtitles:before{content:\"\\e188\"}.glyphicon-sound-stereo:before{content:\"\\e189\"}.glyphicon-sound-dolby:before{content:\"\\e190\"}.glyphicon-sound-5-1:before{content:\"\\e191\"}.glyphicon-sound-6-1:before{content:\"\\e192\"}.glyphicon-sound-7-1:before{content:\"\\e193\"}.glyphicon-copyright-mark:before{content:\"\\e194\"}.glyphicon-registration-mark:before{content:\"\\e195\"}.glyphicon-cloud-download:before{content:\"\\e197\"}.glyphicon-cloud-upload:before{content:\"\\e198\"}.glyphicon-tree-conifer:before{content:\"\\e199\"}.glyphicon-tree-deciduous:before{content:\"\\e200\"}.glyphicon-cd:before{content:\"\\e201\"}.glyphicon-save-file:before{content:\"\\e202\"}.glyphicon-open-file:before{content:\"\\e203\"}.glyphicon-level-up:before{content:\"\\e204\"}.glyphicon-copy:before{content:\"\\e205\"}.glyphicon-paste:before{content:\"\\e206\"}.glyphicon-alert:before{content:\"\\e209\"}.glyphicon-equalizer:before{content:\"\\e210\"}.glyphicon-king:before{content:\"\\e211\"}.glyphicon-queen:before{content:\"\\e212\"}.glyphicon-pawn:before{content:\"\\e213\"}.glyphicon-bishop:before{content:\"\\e214\"}.glyphicon-knight:before{content:\"\\e215\"}.glyphicon-baby-formula:before{content:\"\\e216\"}.glyphicon-tent:before{content:\"\\26fa\"}.glyphicon-blackboard:before{content:\"\\e218\"}.glyphicon-bed:before{content:\"\\e219\"}.glyphicon-apple:before{content:\"\\f8ff\"}.glyphicon-erase:before{content:\"\\e221\"}.glyphicon-hourglass:before{content:\"\\231b\"}.glyphicon-lamp:before{content:\"\\e223\"}.glyphicon-duplicate:before{content:\"\\e224\"}.glyphicon-piggy-bank:before{content:\"\\e225\"}.glyphicon-scissors:before{content:\"\\e226\"}.glyphicon-bitcoin:before{content:\"\\e227\"}.glyphicon-btc:before{content:\"\\e227\"}.glyphicon-xbt:before{content:\"\\e227\"}.glyphicon-yen:before{content:\"\\00a5\"}.glyphicon-jpy:before{content:\"\\00a5\"}.glyphicon-ruble:before{content:\"\\20bd\"}.glyphicon-rub:before{content:\"\\20bd\"}.glyphicon-scale:before{content:\"\\e230\"}.glyphicon-ice-lolly:before{content:\"\\e231\"}.glyphicon-ice-lolly-tasted:before{content:\"\\e232\"}.glyphicon-education:before{content:\"\\e233\"}.glyphicon-option-horizontal:before{content:\"\\e234\"}.glyphicon-option-vertical:before{content:\"\\e235\"}.glyphicon-menu-hamburger:before{content:\"\\e236\"}.glyphicon-modal-window:before{content:\"\\e237\"}.glyphicon-oil:before{content:\"\\e238\"}.glyphicon-grain:before{content:\"\\e239\"}.glyphicon-sunglasses:before{content:\"\\e240\"}.glyphicon-text-size:before{content:\"\\e241\"}.glyphicon-text-color:before{content:\"\\e242\"}.glyphicon-text-background:before{content:\"\\e243\"}.glyphicon-object-align-top:before{content:\"\\e244\"}.glyphicon-object-align-bottom:before{content:\"\\e245\"}.glyphicon-object-align-horizontal:before{content:\"\\e246\"}.glyphicon-object-align-left:before{content:\"\\e247\"}.glyphicon-object-align-vertical:before{content:\"\\e248\"}.glyphicon-object-align-right:before{content:\"\\e249\"}.glyphicon-triangle-right:before{content:\"\\e250\"}.glyphicon-triangle-left:before{content:\"\\e251\"}.glyphicon-triangle-bottom:before{content:\"\\e252\"}.glyphicon-triangle-top:before{content:\"\\e253\"}.glyphicon-console:before{content:\"\\e254\"}.glyphicon-superscript:before{content:\"\\e255\"}.glyphicon-subscript:before{content:\"\\e256\"}.glyphicon-menu-left:before{content:\"\\e257\"}.glyphicon-menu-right:before{content:\"\\e258\"}.glyphicon-menu-down:before{content:\"\\e259\"}.glyphicon-menu-up:before{content:\"\\e260\"}*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}*:before,*:after{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}html{font-size:10px;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:14px;line-height:1.42857143;color:#c8c8c8;background-color:#272b30}input,button,select,textarea{font-family:inherit;font-size:inherit;line-height:inherit}a{color:#ffffff;text-decoration:none}a:hover,a:focus{color:#ffffff;text-decoration:underline}a:focus{outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}figure{margin:0}img{vertical-align:middle}.img-responsive,.thumbnail>img,.thumbnail a>img,.carousel-inner>.item>img,.carousel-inner>.item>a>img{display:block;max-width:100%;height:auto}.img-rounded{border-radius:6px}.img-thumbnail{padding:4px;line-height:1.42857143;background-color:#1c1e22;border:1px solid #0c0d0e;border-radius:4px;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out;display:inline-block;max-width:100%;height:auto}.img-circle{border-radius:50%}hr{margin-top:20px;margin-bottom:20px;border:0;border-top:1px solid #1c1e22}.sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}[role=\"button\"]{cursor:pointer}h1,h2,h3,h4,h5,h6,.h1,.h2,.h3,.h4,.h5,.h6{font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-weight:500;line-height:1.1;color:inherit}h1 small,h2 small,h3 small,h4 small,h5 small,h6 small,.h1 small,.h2 small,.h3 small,.h4 small,.h5 small,.h6 small,h1 .small,h2 .small,h3 .small,h4 .small,h5 .small,h6 .small,.h1 .small,.h2 .small,.h3 .small,.h4 .small,.h5 .small,.h6 .small{font-weight:normal;line-height:1;color:#7a8288}h1,.h1,h2,.h2,h3,.h3{margin-top:20px;margin-bottom:10px}h1 small,.h1 small,h2 small,.h2 small,h3 small,.h3 small,h1 .small,.h1 .small,h2 .small,.h2 .small,h3 .small,.h3 .small{font-size:65%}h4,.h4,h5,.h5,h6,.h6{margin-top:10px;margin-bottom:10px}h4 small,.h4 small,h5 small,.h5 small,h6 small,.h6 small,h4 .small,.h4 .small,h5 .small,.h5 .small,h6 .small,.h6 .small{font-size:75%}h1,.h1{font-size:36px}h2,.h2{font-size:30px}h3,.h3{font-size:24px}h4,.h4{font-size:18px}h5,.h5{font-size:14px}h6,.h6{font-size:12px}p{margin:0 0 10px}.lead{margin-bottom:20px;font-size:16px;font-weight:300;line-height:1.4}@media (min-width:768px){.lead{font-size:21px}}small,.small{font-size:85%}mark,.mark{background-color:#f89406;padding:.2em}.text-left{text-align:left}.text-right{text-align:right}.text-center{text-align:center}.text-justify{text-align:justify}.text-nowrap{white-space:nowrap}.text-lowercase{text-transform:lowercase}.text-uppercase{text-transform:uppercase}.text-capitalize{text-transform:capitalize}.text-muted{color:#7a8288}.text-primary{color:#7a8288}a.text-primary:hover,a.text-primary:focus{color:#62686d}.text-success{color:#ffffff}a.text-success:hover,a.text-success:focus{color:#e6e6e6}.text-info{color:#ffffff}a.text-info:hover,a.text-info:focus{color:#e6e6e6}.text-warning{color:#ffffff}a.text-warning:hover,a.text-warning:focus{color:#e6e6e6}.text-danger{color:#ffffff}a.text-danger:hover,a.text-danger:focus{color:#e6e6e6}.bg-primary{color:#fff;background-color:#7a8288}a.bg-primary:hover,a.bg-primary:focus{background-color:#62686d}.bg-success{background-color:#62c462}a.bg-success:hover,a.bg-success:focus{background-color:#42b142}.bg-info{background-color:#5bc0de}a.bg-info:hover,a.bg-info:focus{background-color:#31b0d5}.bg-warning{background-color:#f89406}a.bg-warning:hover,a.bg-warning:focus{background-color:#c67605}.bg-danger{background-color:#ee5f5b}a.bg-danger:hover,a.bg-danger:focus{background-color:#e9322d}.page-header{padding-bottom:9px;margin:40px 0 20px;border-bottom:1px solid #1c1e22}ul,ol{margin-top:0;margin-bottom:10px}ul ul,ol ul,ul ol,ol ol{margin-bottom:0}.list-unstyled{padding-left:0;list-style:none}.list-inline{padding-left:0;list-style:none;margin-left:-5px}.list-inline>li{display:inline-block;padding-left:5px;padding-right:5px}dl{margin-top:0;margin-bottom:20px}dt,dd{line-height:1.42857143}dt{font-weight:bold}dd{margin-left:0}@media (min-width:768px){.dl-horizontal dt{float:left;width:160px;clear:left;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dl-horizontal dd{margin-left:180px}}abbr[title],abbr[data-original-title]{cursor:help;border-bottom:1px dotted #7a8288}.initialism{font-size:90%;text-transform:uppercase}blockquote{padding:10px 20px;margin:0 0 20px;font-size:17.5px;border-left:5px solid #7a8288}blockquote p:last-child,blockquote ul:last-child,blockquote ol:last-child{margin-bottom:0}blockquote footer,blockquote small,blockquote .small{display:block;font-size:80%;line-height:1.42857143;color:#7a8288}blockquote footer:before,blockquote small:before,blockquote .small:before{content:'\\2014 \\00A0'}.blockquote-reverse,blockquote.pull-right{padding-right:15px;padding-left:0;border-right:5px solid #7a8288;border-left:0;text-align:right}.blockquote-reverse footer:before,blockquote.pull-right footer:before,.blockquote-reverse small:before,blockquote.pull-right small:before,.blockquote-reverse .small:before,blockquote.pull-right .small:before{content:''}.blockquote-reverse footer:after,blockquote.pull-right footer:after,.blockquote-reverse small:after,blockquote.pull-right small:after,.blockquote-reverse .small:after,blockquote.pull-right .small:after{content:'\\00A0 \\2014'}address{margin-bottom:20px;font-style:normal;line-height:1.42857143}code,kbd,pre,samp{font-family:Menlo,Monaco,Consolas,\"Courier New\",monospace}code{padding:2px 4px;font-size:90%;color:#c7254e;background-color:#f9f2f4;border-radius:4px}kbd{padding:2px 4px;font-size:90%;color:#ffffff;background-color:#333333;border-radius:3px;-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,0.25);box-shadow:inset 0 -1px 0 rgba(0,0,0,0.25)}kbd kbd{padding:0;font-size:100%;font-weight:bold;-webkit-box-shadow:none;box-shadow:none}pre{display:block;padding:9.5px;margin:0 0 10px;font-size:13px;line-height:1.42857143;word-break:break-all;word-wrap:break-word;color:#3a3f44;background-color:#f5f5f5;border:1px solid #cccccc;border-radius:4px}pre code{padding:0;font-size:inherit;color:inherit;white-space:pre-wrap;background-color:transparent;border-radius:0}.pre-scrollable{max-height:340px;overflow-y:scroll}.container{margin-right:auto;margin-left:auto;padding-left:15px;padding-right:15px}@media (min-width:768px){.container{width:750px}}@media (min-width:992px){.container{width:970px}}@media (min-width:1200px){.container{width:1170px}}.container-fluid{margin-right:auto;margin-left:auto;padding-left:15px;padding-right:15px}.row{margin-left:-15px;margin-right:-15px}.col-xs-1,.col-sm-1,.col-md-1,.col-lg-1,.col-xs-2,.col-sm-2,.col-md-2,.col-lg-2,.col-xs-3,.col-sm-3,.col-md-3,.col-lg-3,.col-xs-4,.col-sm-4,.col-md-4,.col-lg-4,.col-xs-5,.col-sm-5,.col-md-5,.col-lg-5,.col-xs-6,.col-sm-6,.col-md-6,.col-lg-6,.col-xs-7,.col-sm-7,.col-md-7,.col-lg-7,.col-xs-8,.col-sm-8,.col-md-8,.col-lg-8,.col-xs-9,.col-sm-9,.col-md-9,.col-lg-9,.col-xs-10,.col-sm-10,.col-md-10,.col-lg-10,.col-xs-11,.col-sm-11,.col-md-11,.col-lg-11,.col-xs-12,.col-sm-12,.col-md-12,.col-lg-12{position:relative;min-height:1px;padding-left:15px;padding-right:15px}.col-xs-1,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.col-xs-10,.col-xs-11,.col-xs-12{float:left}.col-xs-12{width:100%}.col-xs-11{width:91.66666667%}.col-xs-10{width:83.33333333%}.col-xs-9{width:75%}.col-xs-8{width:66.66666667%}.col-xs-7{width:58.33333333%}.col-xs-6{width:50%}.col-xs-5{width:41.66666667%}.col-xs-4{width:33.33333333%}.col-xs-3{width:25%}.col-xs-2{width:16.66666667%}.col-xs-1{width:8.33333333%}.col-xs-pull-12{right:100%}.col-xs-pull-11{right:91.66666667%}.col-xs-pull-10{right:83.33333333%}.col-xs-pull-9{right:75%}.col-xs-pull-8{right:66.66666667%}.col-xs-pull-7{right:58.33333333%}.col-xs-pull-6{right:50%}.col-xs-pull-5{right:41.66666667%}.col-xs-pull-4{right:33.33333333%}.col-xs-pull-3{right:25%}.col-xs-pull-2{right:16.66666667%}.col-xs-pull-1{right:8.33333333%}.col-xs-pull-0{right:auto}.col-xs-push-12{left:100%}.col-xs-push-11{left:91.66666667%}.col-xs-push-10{left:83.33333333%}.col-xs-push-9{left:75%}.col-xs-push-8{left:66.66666667%}.col-xs-push-7{left:58.33333333%}.col-xs-push-6{left:50%}.col-xs-push-5{left:41.66666667%}.col-xs-push-4{left:33.33333333%}.col-xs-push-3{left:25%}.col-xs-push-2{left:16.66666667%}.col-xs-push-1{left:8.33333333%}.col-xs-push-0{left:auto}.col-xs-offset-12{margin-left:100%}.col-xs-offset-11{margin-left:91.66666667%}.col-xs-offset-10{margin-left:83.33333333%}.col-xs-offset-9{margin-left:75%}.col-xs-offset-8{margin-left:66.66666667%}.col-xs-offset-7{margin-left:58.33333333%}.col-xs-offset-6{margin-left:50%}.col-xs-offset-5{margin-left:41.66666667%}.col-xs-offset-4{margin-left:33.33333333%}.col-xs-offset-3{margin-left:25%}.col-xs-offset-2{margin-left:16.66666667%}.col-xs-offset-1{margin-left:8.33333333%}.col-xs-offset-0{margin-left:0%}@media (min-width:768px){.col-sm-1,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-sm-10,.col-sm-11,.col-sm-12{float:left}.col-sm-12{width:100%}.col-sm-11{width:91.66666667%}.col-sm-10{width:83.33333333%}.col-sm-9{width:75%}.col-sm-8{width:66.66666667%}.col-sm-7{width:58.33333333%}.col-sm-6{width:50%}.col-sm-5{width:41.66666667%}.col-sm-4{width:33.33333333%}.col-sm-3{width:25%}.col-sm-2{width:16.66666667%}.col-sm-1{width:8.33333333%}.col-sm-pull-12{right:100%}.col-sm-pull-11{right:91.66666667%}.col-sm-pull-10{right:83.33333333%}.col-sm-pull-9{right:75%}.col-sm-pull-8{right:66.66666667%}.col-sm-pull-7{right:58.33333333%}.col-sm-pull-6{right:50%}.col-sm-pull-5{right:41.66666667%}.col-sm-pull-4{right:33.33333333%}.col-sm-pull-3{right:25%}.col-sm-pull-2{right:16.66666667%}.col-sm-pull-1{right:8.33333333%}.col-sm-pull-0{right:auto}.col-sm-push-12{left:100%}.col-sm-push-11{left:91.66666667%}.col-sm-push-10{left:83.33333333%}.col-sm-push-9{left:75%}.col-sm-push-8{left:66.66666667%}.col-sm-push-7{left:58.33333333%}.col-sm-push-6{left:50%}.col-sm-push-5{left:41.66666667%}.col-sm-push-4{left:33.33333333%}.col-sm-push-3{left:25%}.col-sm-push-2{left:16.66666667%}.col-sm-push-1{left:8.33333333%}.col-sm-push-0{left:auto}.col-sm-offset-12{margin-left:100%}.col-sm-offset-11{margin-left:91.66666667%}.col-sm-offset-10{margin-left:83.33333333%}.col-sm-offset-9{margin-left:75%}.col-sm-offset-8{margin-left:66.66666667%}.col-sm-offset-7{margin-left:58.33333333%}.col-sm-offset-6{margin-left:50%}.col-sm-offset-5{margin-left:41.66666667%}.col-sm-offset-4{margin-left:33.33333333%}.col-sm-offset-3{margin-left:25%}.col-sm-offset-2{margin-left:16.66666667%}.col-sm-offset-1{margin-left:8.33333333%}.col-sm-offset-0{margin-left:0%}}@media (min-width:992px){.col-md-1,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-md-10,.col-md-11,.col-md-12{float:left}.col-md-12{width:100%}.col-md-11{width:91.66666667%}.col-md-10{width:83.33333333%}.col-md-9{width:75%}.col-md-8{width:66.66666667%}.col-md-7{width:58.33333333%}.col-md-6{width:50%}.col-md-5{width:41.66666667%}.col-md-4{width:33.33333333%}.col-md-3{width:25%}.col-md-2{width:16.66666667%}.col-md-1{width:8.33333333%}.col-md-pull-12{right:100%}.col-md-pull-11{right:91.66666667%}.col-md-pull-10{right:83.33333333%}.col-md-pull-9{right:75%}.col-md-pull-8{right:66.66666667%}.col-md-pull-7{right:58.33333333%}.col-md-pull-6{right:50%}.col-md-pull-5{right:41.66666667%}.col-md-pull-4{right:33.33333333%}.col-md-pull-3{right:25%}.col-md-pull-2{right:16.66666667%}.col-md-pull-1{right:8.33333333%}.col-md-pull-0{right:auto}.col-md-push-12{left:100%}.col-md-push-11{left:91.66666667%}.col-md-push-10{left:83.33333333%}.col-md-push-9{left:75%}.col-md-push-8{left:66.66666667%}.col-md-push-7{left:58.33333333%}.col-md-push-6{left:50%}.col-md-push-5{left:41.66666667%}.col-md-push-4{left:33.33333333%}.col-md-push-3{left:25%}.col-md-push-2{left:16.66666667%}.col-md-push-1{left:8.33333333%}.col-md-push-0{left:auto}.col-md-offset-12{margin-left:100%}.col-md-offset-11{margin-left:91.66666667%}.col-md-offset-10{margin-left:83.33333333%}.col-md-offset-9{margin-left:75%}.col-md-offset-8{margin-left:66.66666667%}.col-md-offset-7{margin-left:58.33333333%}.col-md-offset-6{margin-left:50%}.col-md-offset-5{margin-left:41.66666667%}.col-md-offset-4{margin-left:33.33333333%}.col-md-offset-3{margin-left:25%}.col-md-offset-2{margin-left:16.66666667%}.col-md-offset-1{margin-left:8.33333333%}.col-md-offset-0{margin-left:0%}}@media (min-width:1200px){.col-lg-1,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-lg-10,.col-lg-11,.col-lg-12{float:left}.col-lg-12{width:100%}.col-lg-11{width:91.66666667%}.col-lg-10{width:83.33333333%}.col-lg-9{width:75%}.col-lg-8{width:66.66666667%}.col-lg-7{width:58.33333333%}.col-lg-6{width:50%}.col-lg-5{width:41.66666667%}.col-lg-4{width:33.33333333%}.col-lg-3{width:25%}.col-lg-2{width:16.66666667%}.col-lg-1{width:8.33333333%}.col-lg-pull-12{right:100%}.col-lg-pull-11{right:91.66666667%}.col-lg-pull-10{right:83.33333333%}.col-lg-pull-9{right:75%}.col-lg-pull-8{right:66.66666667%}.col-lg-pull-7{right:58.33333333%}.col-lg-pull-6{right:50%}.col-lg-pull-5{right:41.66666667%}.col-lg-pull-4{right:33.33333333%}.col-lg-pull-3{right:25%}.col-lg-pull-2{right:16.66666667%}.col-lg-pull-1{right:8.33333333%}.col-lg-pull-0{right:auto}.col-lg-push-12{left:100%}.col-lg-push-11{left:91.66666667%}.col-lg-push-10{left:83.33333333%}.col-lg-push-9{left:75%}.col-lg-push-8{left:66.66666667%}.col-lg-push-7{left:58.33333333%}.col-lg-push-6{left:50%}.col-lg-push-5{left:41.66666667%}.col-lg-push-4{left:33.33333333%}.col-lg-push-3{left:25%}.col-lg-push-2{left:16.66666667%}.col-lg-push-1{left:8.33333333%}.col-lg-push-0{left:auto}.col-lg-offset-12{margin-left:100%}.col-lg-offset-11{margin-left:91.66666667%}.col-lg-offset-10{margin-left:83.33333333%}.col-lg-offset-9{margin-left:75%}.col-lg-offset-8{margin-left:66.66666667%}.col-lg-offset-7{margin-left:58.33333333%}.col-lg-offset-6{margin-left:50%}.col-lg-offset-5{margin-left:41.66666667%}.col-lg-offset-4{margin-left:33.33333333%}.col-lg-offset-3{margin-left:25%}.col-lg-offset-2{margin-left:16.66666667%}.col-lg-offset-1{margin-left:8.33333333%}.col-lg-offset-0{margin-left:0%}}table{background-color:#2e3338}caption{padding-top:8px;padding-bottom:8px;color:#7a8288;text-align:left}th{text-align:left}.table{width:100%;max-width:100%;margin-bottom:20px}.table>thead>tr>th,.table>tbody>tr>th,.table>tfoot>tr>th,.table>thead>tr>td,.table>tbody>tr>td,.table>tfoot>tr>td{padding:8px;line-height:1.42857143;vertical-align:top;border-top:1px solid #1c1e22}.table>thead>tr>th{vertical-align:bottom;border-bottom:2px solid #1c1e22}.table>caption+thead>tr:first-child>th,.table>colgroup+thead>tr:first-child>th,.table>thead:first-child>tr:first-child>th,.table>caption+thead>tr:first-child>td,.table>colgroup+thead>tr:first-child>td,.table>thead:first-child>tr:first-child>td{border-top:0}.table>tbody+tbody{border-top:2px solid #1c1e22}.table .table{background-color:#272b30}.table-condensed>thead>tr>th,.table-condensed>tbody>tr>th,.table-condensed>tfoot>tr>th,.table-condensed>thead>tr>td,.table-condensed>tbody>tr>td,.table-condensed>tfoot>tr>td{padding:5px}.table-bordered{border:1px solid #1c1e22}.table-bordered>thead>tr>th,.table-bordered>tbody>tr>th,.table-bordered>tfoot>tr>th,.table-bordered>thead>tr>td,.table-bordered>tbody>tr>td,.table-bordered>tfoot>tr>td{border:1px solid #1c1e22}.table-bordered>thead>tr>th,.table-bordered>thead>tr>td{border-bottom-width:2px}.table-striped>tbody>tr:nth-of-type(odd){background-color:#353a41}.table-hover>tbody>tr:hover{background-color:#49515a}table col[class*=\"col-\"]{position:static;float:none;display:table-column}table td[class*=\"col-\"],table th[class*=\"col-\"]{position:static;float:none;display:table-cell}.table>thead>tr>td.active,.table>tbody>tr>td.active,.table>tfoot>tr>td.active,.table>thead>tr>th.active,.table>tbody>tr>th.active,.table>tfoot>tr>th.active,.table>thead>tr.active>td,.table>tbody>tr.active>td,.table>tfoot>tr.active>td,.table>thead>tr.active>th,.table>tbody>tr.active>th,.table>tfoot>tr.active>th{background-color:#49515a}.table-hover>tbody>tr>td.active:hover,.table-hover>tbody>tr>th.active:hover,.table-hover>tbody>tr.active:hover>td,.table-hover>tbody>tr:hover>.active,.table-hover>tbody>tr.active:hover>th{background-color:#3e444c}.table>thead>tr>td.success,.table>tbody>tr>td.success,.table>tfoot>tr>td.success,.table>thead>tr>th.success,.table>tbody>tr>th.success,.table>tfoot>tr>th.success,.table>thead>tr.success>td,.table>tbody>tr.success>td,.table>tfoot>tr.success>td,.table>thead>tr.success>th,.table>tbody>tr.success>th,.table>tfoot>tr.success>th{background-color:#62c462}.table-hover>tbody>tr>td.success:hover,.table-hover>tbody>tr>th.success:hover,.table-hover>tbody>tr.success:hover>td,.table-hover>tbody>tr:hover>.success,.table-hover>tbody>tr.success:hover>th{background-color:#4fbd4f}.table>thead>tr>td.info,.table>tbody>tr>td.info,.table>tfoot>tr>td.info,.table>thead>tr>th.info,.table>tbody>tr>th.info,.table>tfoot>tr>th.info,.table>thead>tr.info>td,.table>tbody>tr.info>td,.table>tfoot>tr.info>td,.table>thead>tr.info>th,.table>tbody>tr.info>th,.table>tfoot>tr.info>th{background-color:#5bc0de}.table-hover>tbody>tr>td.info:hover,.table-hover>tbody>tr>th.info:hover,.table-hover>tbody>tr.info:hover>td,.table-hover>tbody>tr:hover>.info,.table-hover>tbody>tr.info:hover>th{background-color:#46b8da}.table>thead>tr>td.warning,.table>tbody>tr>td.warning,.table>tfoot>tr>td.warning,.table>thead>tr>th.warning,.table>tbody>tr>th.warning,.table>tfoot>tr>th.warning,.table>thead>tr.warning>td,.table>tbody>tr.warning>td,.table>tfoot>tr.warning>td,.table>thead>tr.warning>th,.table>tbody>tr.warning>th,.table>tfoot>tr.warning>th{background-color:#f89406}.table-hover>tbody>tr>td.warning:hover,.table-hover>tbody>tr>th.warning:hover,.table-hover>tbody>tr.warning:hover>td,.table-hover>tbody>tr:hover>.warning,.table-hover>tbody>tr.warning:hover>th{background-color:#df8505}.table>thead>tr>td.danger,.table>tbody>tr>td.danger,.table>tfoot>tr>td.danger,.table>thead>tr>th.danger,.table>tbody>tr>th.danger,.table>tfoot>tr>th.danger,.table>thead>tr.danger>td,.table>tbody>tr.danger>td,.table>tfoot>tr.danger>td,.table>thead>tr.danger>th,.table>tbody>tr.danger>th,.table>tfoot>tr.danger>th{background-color:#ee5f5b}.table-hover>tbody>tr>td.danger:hover,.table-hover>tbody>tr>th.danger:hover,.table-hover>tbody>tr.danger:hover>td,.table-hover>tbody>tr:hover>.danger,.table-hover>tbody>tr.danger:hover>th{background-color:#ec4844}.table-responsive{overflow-x:auto;min-height:0.01%}@media screen and (max-width:767px){.table-responsive{width:100%;margin-bottom:15px;overflow-y:hidden;-ms-overflow-style:-ms-autohiding-scrollbar;border:1px solid #1c1e22}.table-responsive>.table{margin-bottom:0}.table-responsive>.table>thead>tr>th,.table-responsive>.table>tbody>tr>th,.table-responsive>.table>tfoot>tr>th,.table-responsive>.table>thead>tr>td,.table-responsive>.table>tbody>tr>td,.table-responsive>.table>tfoot>tr>td{white-space:nowrap}.table-responsive>.table-bordered{border:0}.table-responsive>.table-bordered>thead>tr>th:first-child,.table-responsive>.table-bordered>tbody>tr>th:first-child,.table-responsive>.table-bordered>tfoot>tr>th:first-child,.table-responsive>.table-bordered>thead>tr>td:first-child,.table-responsive>.table-bordered>tbody>tr>td:first-child,.table-responsive>.table-bordered>tfoot>tr>td:first-child{border-left:0}.table-responsive>.table-bordered>thead>tr>th:last-child,.table-responsive>.table-bordered>tbody>tr>th:last-child,.table-responsive>.table-bordered>tfoot>tr>th:last-child,.table-responsive>.table-bordered>thead>tr>td:last-child,.table-responsive>.table-bordered>tbody>tr>td:last-child,.table-responsive>.table-bordered>tfoot>tr>td:last-child{border-right:0}.table-responsive>.table-bordered>tbody>tr:last-child>th,.table-responsive>.table-bordered>tfoot>tr:last-child>th,.table-responsive>.table-bordered>tbody>tr:last-child>td,.table-responsive>.table-bordered>tfoot>tr:last-child>td{border-bottom:0}}fieldset{padding:0;margin:0;border:0;min-width:0}legend{display:block;width:100%;padding:0;margin-bottom:20px;font-size:21px;line-height:inherit;color:#c8c8c8;border:0;border-bottom:1px solid #1c1e22}label{display:inline-block;max-width:100%;margin-bottom:5px;font-weight:bold}input[type=\"search\"]{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}input[type=\"radio\"],input[type=\"checkbox\"]{margin:4px 0 0;margin-top:1px \\9;line-height:normal}input[type=\"file\"]{display:block}input[type=\"range\"]{display:block;width:100%}select[multiple],select[size]{height:auto}input[type=\"file\"]:focus,input[type=\"radio\"]:focus,input[type=\"checkbox\"]:focus{outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}output{display:block;padding-top:9px;font-size:14px;line-height:1.42857143;color:#272b30}.form-control{display:block;width:100%;height:38px;padding:8px 12px;font-size:14px;line-height:1.42857143;color:#272b30;background-color:#ffffff;background-image:none;border:1px solid #000000;border-radius:4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-webkit-transition:border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;-o-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s}.form-control:focus{border-color:#66afe9;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(102,175,233,0.6);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(102,175,233,0.6)}.form-control::-moz-placeholder{color:#7a8288;opacity:1}.form-control:-ms-input-placeholder{color:#7a8288}.form-control::-webkit-input-placeholder{color:#7a8288}.form-control::-ms-expand{border:0;background-color:transparent}.form-control[disabled],.form-control[readonly],fieldset[disabled] .form-control{background-color:#999999;opacity:1}.form-control[disabled],fieldset[disabled] .form-control{cursor:not-allowed}textarea.form-control{height:auto}input[type=\"search\"]{-webkit-appearance:none}@media screen and (-webkit-min-device-pixel-ratio:0){input[type=\"date\"].form-control,input[type=\"time\"].form-control,input[type=\"datetime-local\"].form-control,input[type=\"month\"].form-control{line-height:38px}input[type=\"date\"].input-sm,input[type=\"time\"].input-sm,input[type=\"datetime-local\"].input-sm,input[type=\"month\"].input-sm,.input-group-sm input[type=\"date\"],.input-group-sm input[type=\"time\"],.input-group-sm input[type=\"datetime-local\"],.input-group-sm input[type=\"month\"]{line-height:30px}input[type=\"date\"].input-lg,input[type=\"time\"].input-lg,input[type=\"datetime-local\"].input-lg,input[type=\"month\"].input-lg,.input-group-lg input[type=\"date\"],.input-group-lg input[type=\"time\"],.input-group-lg input[type=\"datetime-local\"],.input-group-lg input[type=\"month\"]{line-height:54px}}.form-group{margin-bottom:15px}.radio,.checkbox{position:relative;display:block;margin-top:10px;margin-bottom:10px}.radio label,.checkbox label{min-height:20px;padding-left:20px;margin-bottom:0;font-weight:normal;cursor:pointer}.radio input[type=\"radio\"],.radio-inline input[type=\"radio\"],.checkbox input[type=\"checkbox\"],.checkbox-inline input[type=\"checkbox\"]{position:absolute;margin-left:-20px;margin-top:4px \\9}.radio+.radio,.checkbox+.checkbox{margin-top:-5px}.radio-inline,.checkbox-inline{position:relative;display:inline-block;padding-left:20px;margin-bottom:0;vertical-align:middle;font-weight:normal;cursor:pointer}.radio-inline+.radio-inline,.checkbox-inline+.checkbox-inline{margin-top:0;margin-left:10px}input[type=\"radio\"][disabled],input[type=\"checkbox\"][disabled],input[type=\"radio\"].disabled,input[type=\"checkbox\"].disabled,fieldset[disabled] input[type=\"radio\"],fieldset[disabled] input[type=\"checkbox\"]{cursor:not-allowed}.radio-inline.disabled,.checkbox-inline.disabled,fieldset[disabled] .radio-inline,fieldset[disabled] .checkbox-inline{cursor:not-allowed}.radio.disabled label,.checkbox.disabled label,fieldset[disabled] .radio label,fieldset[disabled] .checkbox label{cursor:not-allowed}.form-control-static{padding-top:9px;padding-bottom:9px;margin-bottom:0;min-height:34px}.form-control-static.input-lg,.form-control-static.input-sm{padding-left:0;padding-right:0}.input-sm{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}select.input-sm{height:30px;line-height:30px}textarea.input-sm,select[multiple].input-sm{height:auto}.form-group-sm .form-control{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}.form-group-sm select.form-control{height:30px;line-height:30px}.form-group-sm textarea.form-control,.form-group-sm select[multiple].form-control{height:auto}.form-group-sm .form-control-static{height:30px;min-height:32px;padding:6px 10px;font-size:12px;line-height:1.5}.input-lg{height:54px;padding:14px 16px;font-size:18px;line-height:1.3333333;border-radius:6px}select.input-lg{height:54px;line-height:54px}textarea.input-lg,select[multiple].input-lg{height:auto}.form-group-lg .form-control{height:54px;padding:14px 16px;font-size:18px;line-height:1.3333333;border-radius:6px}.form-group-lg select.form-control{height:54px;line-height:54px}.form-group-lg textarea.form-control,.form-group-lg select[multiple].form-control{height:auto}.form-group-lg .form-control-static{height:54px;min-height:38px;padding:15px 16px;font-size:18px;line-height:1.3333333}.has-feedback{position:relative}.has-feedback .form-control{padding-right:47.5px}.form-control-feedback{position:absolute;top:0;right:0;z-index:2;display:block;width:38px;height:38px;line-height:38px;text-align:center;pointer-events:none}.input-lg+.form-control-feedback,.input-group-lg+.form-control-feedback,.form-group-lg .form-control+.form-control-feedback{width:54px;height:54px;line-height:54px}.input-sm+.form-control-feedback,.input-group-sm+.form-control-feedback,.form-group-sm .form-control+.form-control-feedback{width:30px;height:30px;line-height:30px}.has-success .help-block,.has-success .control-label,.has-success .radio,.has-success .checkbox,.has-success .radio-inline,.has-success .checkbox-inline,.has-success.radio label,.has-success.checkbox label,.has-success.radio-inline label,.has-success.checkbox-inline label{color:#ffffff}.has-success .form-control{border-color:#ffffff;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075)}.has-success .form-control:focus{border-color:#e6e6e6;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #fff;box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #fff}.has-success .input-group-addon{color:#ffffff;border-color:#ffffff;background-color:#62c462}.has-success .form-control-feedback{color:#ffffff}.has-warning .help-block,.has-warning .control-label,.has-warning .radio,.has-warning .checkbox,.has-warning .radio-inline,.has-warning .checkbox-inline,.has-warning.radio label,.has-warning.checkbox label,.has-warning.radio-inline label,.has-warning.checkbox-inline label{color:#ffffff}.has-warning .form-control{border-color:#ffffff;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075)}.has-warning .form-control:focus{border-color:#e6e6e6;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #fff;box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #fff}.has-warning .input-group-addon{color:#ffffff;border-color:#ffffff;background-color:#f89406}.has-warning .form-control-feedback{color:#ffffff}.has-error .help-block,.has-error .control-label,.has-error .radio,.has-error .checkbox,.has-error .radio-inline,.has-error .checkbox-inline,.has-error.radio label,.has-error.checkbox label,.has-error.radio-inline label,.has-error.checkbox-inline label{color:#ffffff}.has-error .form-control{border-color:#ffffff;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075)}.has-error .form-control:focus{border-color:#e6e6e6;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #fff;box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #fff}.has-error .input-group-addon{color:#ffffff;border-color:#ffffff;background-color:#ee5f5b}.has-error .form-control-feedback{color:#ffffff}.has-feedback label~.form-control-feedback{top:25px}.has-feedback label.sr-only~.form-control-feedback{top:0}.help-block{display:block;margin-top:5px;margin-bottom:10px;color:#ffffff}@media (min-width:768px){.form-inline .form-group{display:inline-block;margin-bottom:0;vertical-align:middle}.form-inline .form-control{display:inline-block;width:auto;vertical-align:middle}.form-inline .form-control-static{display:inline-block}.form-inline .input-group{display:inline-table;vertical-align:middle}.form-inline .input-group .input-group-addon,.form-inline .input-group .input-group-btn,.form-inline .input-group .form-control{width:auto}.form-inline .input-group>.form-control{width:100%}.form-inline .control-label{margin-bottom:0;vertical-align:middle}.form-inline .radio,.form-inline .checkbox{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}.form-inline .radio label,.form-inline .checkbox label{padding-left:0}.form-inline .radio input[type=\"radio\"],.form-inline .checkbox input[type=\"checkbox\"]{position:relative;margin-left:0}.form-inline .has-feedback .form-control-feedback{top:0}}.form-horizontal .radio,.form-horizontal .checkbox,.form-horizontal .radio-inline,.form-horizontal .checkbox-inline{margin-top:0;margin-bottom:0;padding-top:9px}.form-horizontal .radio,.form-horizontal .checkbox{min-height:29px}.form-horizontal .form-group{margin-left:-15px;margin-right:-15px}@media (min-width:768px){.form-horizontal .control-label{text-align:right;margin-bottom:0;padding-top:9px}}.form-horizontal .has-feedback .form-control-feedback{right:15px}@media (min-width:768px){.form-horizontal .form-group-lg .control-label{padding-top:15px;font-size:18px}}@media (min-width:768px){.form-horizontal .form-group-sm .control-label{padding-top:6px;font-size:12px}}.btn{display:inline-block;margin-bottom:0;font-weight:normal;text-align:center;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid transparent;white-space:nowrap;padding:8px 12px;font-size:14px;line-height:1.42857143;border-radius:4px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.btn:focus,.btn:active:focus,.btn.active:focus,.btn.focus,.btn:active.focus,.btn.active.focus{outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}.btn:hover,.btn:focus,.btn.focus{color:#ffffff;text-decoration:none}.btn:active,.btn.active{outline:0;background-image:none;-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,0.125);box-shadow:inset 0 3px 5px rgba(0,0,0,0.125)}.btn.disabled,.btn[disabled],fieldset[disabled] .btn{cursor:not-allowed;opacity:0.65;filter:alpha(opacity=65);-webkit-box-shadow:none;box-shadow:none}a.btn.disabled,fieldset[disabled] a.btn{pointer-events:none}.btn-default{color:#ffffff;background-color:#3a3f44;border-color:#3a3f44}.btn-default:focus,.btn-default.focus{color:#ffffff;background-color:#232628;border-color:#000000}.btn-default:hover{color:#ffffff;background-color:#232628;border-color:#1e2023}.btn-default:active,.btn-default.active,.open>.dropdown-toggle.btn-default{color:#ffffff;background-color:#232628;border-color:#1e2023}.btn-default:active:hover,.btn-default.active:hover,.open>.dropdown-toggle.btn-default:hover,.btn-default:active:focus,.btn-default.active:focus,.open>.dropdown-toggle.btn-default:focus,.btn-default:active.focus,.btn-default.active.focus,.open>.dropdown-toggle.btn-default.focus{color:#ffffff;background-color:#121415;border-color:#000000}.btn-default:active,.btn-default.active,.open>.dropdown-toggle.btn-default{background-image:none}.btn-default.disabled:hover,.btn-default[disabled]:hover,fieldset[disabled] .btn-default:hover,.btn-default.disabled:focus,.btn-default[disabled]:focus,fieldset[disabled] .btn-default:focus,.btn-default.disabled.focus,.btn-default[disabled].focus,fieldset[disabled] .btn-default.focus{background-color:#3a3f44;border-color:#3a3f44}.btn-default .badge{color:#3a3f44;background-color:#ffffff}.btn-primary{color:#ffffff;background-color:#7a8288;border-color:#7a8288}.btn-primary:focus,.btn-primary.focus{color:#ffffff;background-color:#62686d;border-color:#3e4245}.btn-primary:hover{color:#ffffff;background-color:#62686d;border-color:#5d6368}.btn-primary:active,.btn-primary.active,.open>.dropdown-toggle.btn-primary{color:#ffffff;background-color:#62686d;border-color:#5d6368}.btn-primary:active:hover,.btn-primary.active:hover,.open>.dropdown-toggle.btn-primary:hover,.btn-primary:active:focus,.btn-primary.active:focus,.open>.dropdown-toggle.btn-primary:focus,.btn-primary:active.focus,.btn-primary.active.focus,.open>.dropdown-toggle.btn-primary.focus{color:#ffffff;background-color:#51565a;border-color:#3e4245}.btn-primary:active,.btn-primary.active,.open>.dropdown-toggle.btn-primary{background-image:none}.btn-primary.disabled:hover,.btn-primary[disabled]:hover,fieldset[disabled] .btn-primary:hover,.btn-primary.disabled:focus,.btn-primary[disabled]:focus,fieldset[disabled] .btn-primary:focus,.btn-primary.disabled.focus,.btn-primary[disabled].focus,fieldset[disabled] .btn-primary.focus{background-color:#7a8288;border-color:#7a8288}.btn-primary .badge{color:#7a8288;background-color:#ffffff}.btn-success{color:#ffffff;background-color:#62c462;border-color:#62c462}.btn-success:focus,.btn-success.focus{color:#ffffff;background-color:#42b142;border-color:#2d792d}.btn-success:hover{color:#ffffff;background-color:#42b142;border-color:#40a940}.btn-success:active,.btn-success.active,.open>.dropdown-toggle.btn-success{color:#ffffff;background-color:#42b142;border-color:#40a940}.btn-success:active:hover,.btn-success.active:hover,.open>.dropdown-toggle.btn-success:hover,.btn-success:active:focus,.btn-success.active:focus,.open>.dropdown-toggle.btn-success:focus,.btn-success:active.focus,.btn-success.active.focus,.open>.dropdown-toggle.btn-success.focus{color:#ffffff;background-color:#399739;border-color:#2d792d}.btn-success:active,.btn-success.active,.open>.dropdown-toggle.btn-success{background-image:none}.btn-success.disabled:hover,.btn-success[disabled]:hover,fieldset[disabled] .btn-success:hover,.btn-success.disabled:focus,.btn-success[disabled]:focus,fieldset[disabled] .btn-success:focus,.btn-success.disabled.focus,.btn-success[disabled].focus,fieldset[disabled] .btn-success.focus{background-color:#62c462;border-color:#62c462}.btn-success .badge{color:#62c462;background-color:#ffffff}.btn-info{color:#ffffff;background-color:#5bc0de;border-color:#5bc0de}.btn-info:focus,.btn-info.focus{color:#ffffff;background-color:#31b0d5;border-color:#1f7e9a}.btn-info:hover{color:#ffffff;background-color:#31b0d5;border-color:#2aabd2}.btn-info:active,.btn-info.active,.open>.dropdown-toggle.btn-info{color:#ffffff;background-color:#31b0d5;border-color:#2aabd2}.btn-info:active:hover,.btn-info.active:hover,.open>.dropdown-toggle.btn-info:hover,.btn-info:active:focus,.btn-info.active:focus,.open>.dropdown-toggle.btn-info:focus,.btn-info:active.focus,.btn-info.active.focus,.open>.dropdown-toggle.btn-info.focus{color:#ffffff;background-color:#269abc;border-color:#1f7e9a}.btn-info:active,.btn-info.active,.open>.dropdown-toggle.btn-info{background-image:none}.btn-info.disabled:hover,.btn-info[disabled]:hover,fieldset[disabled] .btn-info:hover,.btn-info.disabled:focus,.btn-info[disabled]:focus,fieldset[disabled] .btn-info:focus,.btn-info.disabled.focus,.btn-info[disabled].focus,fieldset[disabled] .btn-info.focus{background-color:#5bc0de;border-color:#5bc0de}.btn-info .badge{color:#5bc0de;background-color:#ffffff}.btn-warning{color:#ffffff;background-color:#f89406;border-color:#f89406}.btn-warning:focus,.btn-warning.focus{color:#ffffff;background-color:#c67605;border-color:#7c4a03}.btn-warning:hover{color:#ffffff;background-color:#c67605;border-color:#bc7005}.btn-warning:active,.btn-warning.active,.open>.dropdown-toggle.btn-warning{color:#ffffff;background-color:#c67605;border-color:#bc7005}.btn-warning:active:hover,.btn-warning.active:hover,.open>.dropdown-toggle.btn-warning:hover,.btn-warning:active:focus,.btn-warning.active:focus,.open>.dropdown-toggle.btn-warning:focus,.btn-warning:active.focus,.btn-warning.active.focus,.open>.dropdown-toggle.btn-warning.focus{color:#ffffff;background-color:#a36104;border-color:#7c4a03}.btn-warning:active,.btn-warning.active,.open>.dropdown-toggle.btn-warning{background-image:none}.btn-warning.disabled:hover,.btn-warning[disabled]:hover,fieldset[disabled] .btn-warning:hover,.btn-warning.disabled:focus,.btn-warning[disabled]:focus,fieldset[disabled] .btn-warning:focus,.btn-warning.disabled.focus,.btn-warning[disabled].focus,fieldset[disabled] .btn-warning.focus{background-color:#f89406;border-color:#f89406}.btn-warning .badge{color:#f89406;background-color:#ffffff}.btn-danger{color:#ffffff;background-color:#ee5f5b;border-color:#ee5f5b}.btn-danger:focus,.btn-danger.focus{color:#ffffff;background-color:#e9322d;border-color:#b71713}.btn-danger:hover{color:#ffffff;background-color:#e9322d;border-color:#e82924}.btn-danger:active,.btn-danger.active,.open>.dropdown-toggle.btn-danger{color:#ffffff;background-color:#e9322d;border-color:#e82924}.btn-danger:active:hover,.btn-danger.active:hover,.open>.dropdown-toggle.btn-danger:hover,.btn-danger:active:focus,.btn-danger.active:focus,.open>.dropdown-toggle.btn-danger:focus,.btn-danger:active.focus,.btn-danger.active.focus,.open>.dropdown-toggle.btn-danger.focus{color:#ffffff;background-color:#dc1c17;border-color:#b71713}.btn-danger:active,.btn-danger.active,.open>.dropdown-toggle.btn-danger{background-image:none}.btn-danger.disabled:hover,.btn-danger[disabled]:hover,fieldset[disabled] .btn-danger:hover,.btn-danger.disabled:focus,.btn-danger[disabled]:focus,fieldset[disabled] .btn-danger:focus,.btn-danger.disabled.focus,.btn-danger[disabled].focus,fieldset[disabled] .btn-danger.focus{background-color:#ee5f5b;border-color:#ee5f5b}.btn-danger .badge{color:#ee5f5b;background-color:#ffffff}.btn-link{color:#ffffff;font-weight:normal;border-radius:0}.btn-link,.btn-link:active,.btn-link.active,.btn-link[disabled],fieldset[disabled] .btn-link{background-color:transparent;-webkit-box-shadow:none;box-shadow:none}.btn-link,.btn-link:hover,.btn-link:focus,.btn-link:active{border-color:transparent}.btn-link:hover,.btn-link:focus{color:#ffffff;text-decoration:underline;background-color:transparent}.btn-link[disabled]:hover,fieldset[disabled] .btn-link:hover,.btn-link[disabled]:focus,fieldset[disabled] .btn-link:focus{color:#7a8288;text-decoration:none}.btn-lg,.btn-group-lg>.btn{padding:14px 16px;font-size:18px;line-height:1.3333333;border-radius:6px}.btn-sm,.btn-group-sm>.btn{padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}.btn-xs,.btn-group-xs>.btn{padding:1px 5px;font-size:12px;line-height:1.5;border-radius:3px}.btn-block{display:block;width:100%}.btn-block+.btn-block{margin-top:5px}input[type=\"submit\"].btn-block,input[type=\"reset\"].btn-block,input[type=\"button\"].btn-block{width:100%}.fade{opacity:0;-webkit-transition:opacity 0.15s linear;-o-transition:opacity 0.15s linear;transition:opacity 0.15s linear}.fade.in{opacity:1}.collapse{display:none}.collapse.in{display:block}tr.collapse.in{display:table-row}tbody.collapse.in{display:table-row-group}.collapsing{position:relative;height:0;overflow:hidden;-webkit-transition-property:height, visibility;-o-transition-property:height, visibility;transition-property:height, visibility;-webkit-transition-duration:0.35s;-o-transition-duration:0.35s;transition-duration:0.35s;-webkit-transition-timing-function:ease;-o-transition-timing-function:ease;transition-timing-function:ease}.caret{display:inline-block;width:0;height:0;margin-left:2px;vertical-align:middle;border-top:4px dashed;border-top:4px solid \\9;border-right:4px solid transparent;border-left:4px solid transparent}.dropup,.dropdown{position:relative}.dropdown-toggle:focus{outline:0}.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:160px;padding:5px 0;margin:2px 0 0;list-style:none;font-size:14px;text-align:left;background-color:#3a3f44;border:1px solid #272b30;border:1px solid rgba(0,0,0,0.15);border-radius:4px;-webkit-box-shadow:0 6px 12px rgba(0,0,0,0.175);box-shadow:0 6px 12px rgba(0,0,0,0.175);-webkit-background-clip:padding-box;background-clip:padding-box}.dropdown-menu.pull-right{right:0;left:auto}.dropdown-menu .divider{height:1px;margin:9px 0;overflow:hidden;background-color:#272b30}.dropdown-menu>li>a{display:block;padding:3px 20px;clear:both;font-weight:normal;line-height:1.42857143;color:#c8c8c8;white-space:nowrap}.dropdown-menu>li>a:hover,.dropdown-menu>li>a:focus{text-decoration:none;color:#ffffff;background-color:#272b30}.dropdown-menu>.active>a,.dropdown-menu>.active>a:hover,.dropdown-menu>.active>a:focus{color:#ffffff;text-decoration:none;outline:0;background-color:#272b30}.dropdown-menu>.disabled>a,.dropdown-menu>.disabled>a:hover,.dropdown-menu>.disabled>a:focus{color:#7a8288}.dropdown-menu>.disabled>a:hover,.dropdown-menu>.disabled>a:focus{text-decoration:none;background-color:transparent;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);cursor:not-allowed}.open>.dropdown-menu{display:block}.open>a{outline:0}.dropdown-menu-right{left:auto;right:0}.dropdown-menu-left{left:0;right:auto}.dropdown-header{display:block;padding:3px 20px;font-size:12px;line-height:1.42857143;color:#7a8288;white-space:nowrap}.dropdown-backdrop{position:fixed;left:0;right:0;bottom:0;top:0;z-index:990}.pull-right>.dropdown-menu{right:0;left:auto}.dropup .caret,.navbar-fixed-bottom .dropdown .caret{border-top:0;border-bottom:4px dashed;border-bottom:4px solid \\9;content:\"\"}.dropup .dropdown-menu,.navbar-fixed-bottom .dropdown .dropdown-menu{top:auto;bottom:100%;margin-bottom:2px}@media (min-width:768px){.navbar-right .dropdown-menu{left:auto;right:0}.navbar-right .dropdown-menu-left{left:0;right:auto}}.btn-group,.btn-group-vertical{position:relative;display:inline-block;vertical-align:middle}.btn-group>.btn,.btn-group-vertical>.btn{position:relative;float:left}.btn-group>.btn:hover,.btn-group-vertical>.btn:hover,.btn-group>.btn:focus,.btn-group-vertical>.btn:focus,.btn-group>.btn:active,.btn-group-vertical>.btn:active,.btn-group>.btn.active,.btn-group-vertical>.btn.active{z-index:2}.btn-group .btn+.btn,.btn-group .btn+.btn-group,.btn-group .btn-group+.btn,.btn-group .btn-group+.btn-group{margin-left:-1px}.btn-toolbar{margin-left:-5px}.btn-toolbar .btn,.btn-toolbar .btn-group,.btn-toolbar .input-group{float:left}.btn-toolbar>.btn,.btn-toolbar>.btn-group,.btn-toolbar>.input-group{margin-left:5px}.btn-group>.btn:not(:first-child):not(:last-child):not(.dropdown-toggle){border-radius:0}.btn-group>.btn:first-child{margin-left:0}.btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle){border-bottom-right-radius:0;border-top-right-radius:0}.btn-group>.btn:last-child:not(:first-child),.btn-group>.dropdown-toggle:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.btn-group>.btn-group{float:left}.btn-group>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}.btn-group>.btn-group:first-child:not(:last-child)>.btn:last-child,.btn-group>.btn-group:first-child:not(:last-child)>.dropdown-toggle{border-bottom-right-radius:0;border-top-right-radius:0}.btn-group>.btn-group:last-child:not(:first-child)>.btn:first-child{border-bottom-left-radius:0;border-top-left-radius:0}.btn-group .dropdown-toggle:active,.btn-group.open .dropdown-toggle{outline:0}.btn-group>.btn+.dropdown-toggle{padding-left:8px;padding-right:8px}.btn-group>.btn-lg+.dropdown-toggle{padding-left:12px;padding-right:12px}.btn-group.open .dropdown-toggle{-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,0.125);box-shadow:inset 0 3px 5px rgba(0,0,0,0.125)}.btn-group.open .dropdown-toggle.btn-link{-webkit-box-shadow:none;box-shadow:none}.btn .caret{margin-left:0}.btn-lg .caret{border-width:5px 5px 0;border-bottom-width:0}.dropup .btn-lg .caret{border-width:0 5px 5px}.btn-group-vertical>.btn,.btn-group-vertical>.btn-group,.btn-group-vertical>.btn-group>.btn{display:block;float:none;width:100%;max-width:100%}.btn-group-vertical>.btn-group>.btn{float:none}.btn-group-vertical>.btn+.btn,.btn-group-vertical>.btn+.btn-group,.btn-group-vertical>.btn-group+.btn,.btn-group-vertical>.btn-group+.btn-group{margin-top:-1px;margin-left:0}.btn-group-vertical>.btn:not(:first-child):not(:last-child){border-radius:0}.btn-group-vertical>.btn:first-child:not(:last-child){border-top-right-radius:4px;border-top-left-radius:4px;border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-right-radius:4px;border-bottom-left-radius:4px}.btn-group-vertical>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}.btn-group-vertical>.btn-group:first-child:not(:last-child)>.btn:last-child,.btn-group-vertical>.btn-group:first-child:not(:last-child)>.dropdown-toggle{border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn-group:last-child:not(:first-child)>.btn:first-child{border-top-right-radius:0;border-top-left-radius:0}.btn-group-justified{display:table;width:100%;table-layout:fixed;border-collapse:separate}.btn-group-justified>.btn,.btn-group-justified>.btn-group{float:none;display:table-cell;width:1%}.btn-group-justified>.btn-group .btn{width:100%}.btn-group-justified>.btn-group .dropdown-menu{left:auto}[data-toggle=\"buttons\"]>.btn input[type=\"radio\"],[data-toggle=\"buttons\"]>.btn-group>.btn input[type=\"radio\"],[data-toggle=\"buttons\"]>.btn input[type=\"checkbox\"],[data-toggle=\"buttons\"]>.btn-group>.btn input[type=\"checkbox\"]{position:absolute;clip:rect(0, 0, 0, 0);pointer-events:none}.input-group{position:relative;display:table;border-collapse:separate}.input-group[class*=\"col-\"]{float:none;padding-left:0;padding-right:0}.input-group .form-control{position:relative;z-index:2;float:left;width:100%;margin-bottom:0}.input-group .form-control:focus{z-index:3}.input-group-lg>.form-control,.input-group-lg>.input-group-addon,.input-group-lg>.input-group-btn>.btn{height:54px;padding:14px 16px;font-size:18px;line-height:1.3333333;border-radius:6px}select.input-group-lg>.form-control,select.input-group-lg>.input-group-addon,select.input-group-lg>.input-group-btn>.btn{height:54px;line-height:54px}textarea.input-group-lg>.form-control,textarea.input-group-lg>.input-group-addon,textarea.input-group-lg>.input-group-btn>.btn,select[multiple].input-group-lg>.form-control,select[multiple].input-group-lg>.input-group-addon,select[multiple].input-group-lg>.input-group-btn>.btn{height:auto}.input-group-sm>.form-control,.input-group-sm>.input-group-addon,.input-group-sm>.input-group-btn>.btn{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}select.input-group-sm>.form-control,select.input-group-sm>.input-group-addon,select.input-group-sm>.input-group-btn>.btn{height:30px;line-height:30px}textarea.input-group-sm>.form-control,textarea.input-group-sm>.input-group-addon,textarea.input-group-sm>.input-group-btn>.btn,select[multiple].input-group-sm>.form-control,select[multiple].input-group-sm>.input-group-addon,select[multiple].input-group-sm>.input-group-btn>.btn{height:auto}.input-group-addon,.input-group-btn,.input-group .form-control{display:table-cell}.input-group-addon:not(:first-child):not(:last-child),.input-group-btn:not(:first-child):not(:last-child),.input-group .form-control:not(:first-child):not(:last-child){border-radius:0}.input-group-addon,.input-group-btn{width:1%;white-space:nowrap;vertical-align:middle}.input-group-addon{padding:8px 12px;font-size:14px;font-weight:normal;line-height:1;color:#272b30;text-align:center;background-color:#999999;border:1px solid rgba(0,0,0,0.6);border-radius:4px}.input-group-addon.input-sm{padding:5px 10px;font-size:12px;border-radius:3px}.input-group-addon.input-lg{padding:14px 16px;font-size:18px;border-radius:6px}.input-group-addon input[type=\"radio\"],.input-group-addon input[type=\"checkbox\"]{margin-top:0}.input-group .form-control:first-child,.input-group-addon:first-child,.input-group-btn:first-child>.btn,.input-group-btn:first-child>.btn-group>.btn,.input-group-btn:first-child>.dropdown-toggle,.input-group-btn:last-child>.btn:not(:last-child):not(.dropdown-toggle),.input-group-btn:last-child>.btn-group:not(:last-child)>.btn{border-bottom-right-radius:0;border-top-right-radius:0}.input-group-addon:first-child{border-right:0}.input-group .form-control:last-child,.input-group-addon:last-child,.input-group-btn:last-child>.btn,.input-group-btn:last-child>.btn-group>.btn,.input-group-btn:last-child>.dropdown-toggle,.input-group-btn:first-child>.btn:not(:first-child),.input-group-btn:first-child>.btn-group:not(:first-child)>.btn{border-bottom-left-radius:0;border-top-left-radius:0}.input-group-addon:last-child{border-left:0}.input-group-btn{position:relative;font-size:0;white-space:nowrap}.input-group-btn>.btn{position:relative}.input-group-btn>.btn+.btn{margin-left:-1px}.input-group-btn>.btn:hover,.input-group-btn>.btn:focus,.input-group-btn>.btn:active{z-index:2}.input-group-btn:first-child>.btn,.input-group-btn:first-child>.btn-group{margin-right:-1px}.input-group-btn:last-child>.btn,.input-group-btn:last-child>.btn-group{z-index:2;margin-left:-1px}.nav{margin-bottom:0;padding-left:0;list-style:none}.nav>li{position:relative;display:block}.nav>li>a{position:relative;display:block;padding:10px 15px}.nav>li>a:hover,.nav>li>a:focus{text-decoration:none;background-color:#3e444c}.nav>li.disabled>a{color:#7a8288}.nav>li.disabled>a:hover,.nav>li.disabled>a:focus{color:#7a8288;text-decoration:none;background-color:transparent;cursor:not-allowed}.nav .open>a,.nav .open>a:hover,.nav .open>a:focus{background-color:#3e444c;border-color:#ffffff}.nav .nav-divider{height:1px;margin:9px 0;overflow:hidden;background-color:#e5e5e5}.nav>li>a>img{max-width:none}.nav-tabs{border-bottom:1px solid #1c1e22}.nav-tabs>li{float:left;margin-bottom:-1px}.nav-tabs>li>a{margin-right:2px;line-height:1.42857143;border:1px solid transparent;border-radius:4px 4px 0 0}.nav-tabs>li>a:hover{border-color:#1c1e22 #1c1e22 #1c1e22}.nav-tabs>li.active>a,.nav-tabs>li.active>a:hover,.nav-tabs>li.active>a:focus{color:#ffffff;background-color:#3e444c;border:1px solid #1c1e22;border-bottom-color:transparent;cursor:default}.nav-tabs.nav-justified{width:100%;border-bottom:0}.nav-tabs.nav-justified>li{float:none}.nav-tabs.nav-justified>li>a{text-align:center;margin-bottom:5px}.nav-tabs.nav-justified>.dropdown .dropdown-menu{top:auto;left:auto}@media (min-width:768px){.nav-tabs.nav-justified>li{display:table-cell;width:1%}.nav-tabs.nav-justified>li>a{margin-bottom:0}}.nav-tabs.nav-justified>li>a{margin-right:0;border-radius:4px}.nav-tabs.nav-justified>.active>a,.nav-tabs.nav-justified>.active>a:hover,.nav-tabs.nav-justified>.active>a:focus{border:1px solid #1c1e22}@media (min-width:768px){.nav-tabs.nav-justified>li>a{border-bottom:1px solid #1c1e22;border-radius:4px 4px 0 0}.nav-tabs.nav-justified>.active>a,.nav-tabs.nav-justified>.active>a:hover,.nav-tabs.nav-justified>.active>a:focus{border-bottom-color:#272b30}}.nav-pills>li{float:left}.nav-pills>li>a{border-radius:4px}.nav-pills>li+li{margin-left:2px}.nav-pills>li.active>a,.nav-pills>li.active>a:hover,.nav-pills>li.active>a:focus{color:#ffffff;background-color:transparent}.nav-stacked>li{float:none}.nav-stacked>li+li{margin-top:2px;margin-left:0}.nav-justified{width:100%}.nav-justified>li{float:none}.nav-justified>li>a{text-align:center;margin-bottom:5px}.nav-justified>.dropdown .dropdown-menu{top:auto;left:auto}@media (min-width:768px){.nav-justified>li{display:table-cell;width:1%}.nav-justified>li>a{margin-bottom:0}}.nav-tabs-justified{border-bottom:0}.nav-tabs-justified>li>a{margin-right:0;border-radius:4px}.nav-tabs-justified>.active>a,.nav-tabs-justified>.active>a:hover,.nav-tabs-justified>.active>a:focus{border:1px solid #1c1e22}@media (min-width:768px){.nav-tabs-justified>li>a{border-bottom:1px solid #1c1e22;border-radius:4px 4px 0 0}.nav-tabs-justified>.active>a,.nav-tabs-justified>.active>a:hover,.nav-tabs-justified>.active>a:focus{border-bottom-color:#272b30}}.tab-content>.tab-pane{display:none}.tab-content>.active{display:block}.nav-tabs .dropdown-menu{margin-top:-1px;border-top-right-radius:0;border-top-left-radius:0}.navbar{position:relative;min-height:50px;margin-bottom:20px;border:1px solid transparent}@media (min-width:768px){.navbar{border-radius:4px}}@media (min-width:768px){.navbar-header{float:left}}.navbar-collapse{overflow-x:visible;padding-right:15px;padding-left:15px;border-top:1px solid transparent;-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,0.1);box-shadow:inset 0 1px 0 rgba(255,255,255,0.1);-webkit-overflow-scrolling:touch}.navbar-collapse.in{overflow-y:auto}@media (min-width:768px){.navbar-collapse{width:auto;border-top:0;-webkit-box-shadow:none;box-shadow:none}.navbar-collapse.collapse{display:block !important;height:auto !important;padding-bottom:0;overflow:visible !important}.navbar-collapse.in{overflow-y:visible}.navbar-fixed-top .navbar-collapse,.navbar-static-top .navbar-collapse,.navbar-fixed-bottom .navbar-collapse{padding-left:0;padding-right:0}}.navbar-fixed-top .navbar-collapse,.navbar-fixed-bottom .navbar-collapse{max-height:340px}@media (max-device-width:480px) and (orientation:landscape){.navbar-fixed-top .navbar-collapse,.navbar-fixed-bottom .navbar-collapse{max-height:200px}}.container>.navbar-header,.container-fluid>.navbar-header,.container>.navbar-collapse,.container-fluid>.navbar-collapse{margin-right:-15px;margin-left:-15px}@media (min-width:768px){.container>.navbar-header,.container-fluid>.navbar-header,.container>.navbar-collapse,.container-fluid>.navbar-collapse{margin-right:0;margin-left:0}}.navbar-static-top{z-index:1000;border-width:0 0 1px}@media (min-width:768px){.navbar-static-top{border-radius:0}}.navbar-fixed-top,.navbar-fixed-bottom{position:fixed;right:0;left:0;z-index:1030}@media (min-width:768px){.navbar-fixed-top,.navbar-fixed-bottom{border-radius:0}}.navbar-fixed-top{top:0;border-width:0 0 1px}.navbar-fixed-bottom{bottom:0;margin-bottom:0;border-width:1px 0 0}.navbar-brand{float:left;padding:15px 15px;font-size:18px;line-height:20px;height:50px}.navbar-brand:hover,.navbar-brand:focus{text-decoration:none}.navbar-brand>img{display:block}@media (min-width:768px){.navbar>.container .navbar-brand,.navbar>.container-fluid .navbar-brand{margin-left:-15px}}.navbar-toggle{position:relative;float:right;margin-right:15px;padding:9px 10px;margin-top:8px;margin-bottom:8px;background-color:transparent;background-image:none;border:1px solid transparent;border-radius:4px}.navbar-toggle:focus{outline:0}.navbar-toggle .icon-bar{display:block;width:22px;height:2px;border-radius:1px}.navbar-toggle .icon-bar+.icon-bar{margin-top:4px}@media (min-width:768px){.navbar-toggle{display:none}}.navbar-nav{margin:7.5px -15px}.navbar-nav>li>a{padding-top:10px;padding-bottom:10px;line-height:20px}@media (max-width:767px){.navbar-nav .open .dropdown-menu{position:static;float:none;width:auto;margin-top:0;background-color:transparent;border:0;-webkit-box-shadow:none;box-shadow:none}.navbar-nav .open .dropdown-menu>li>a,.navbar-nav .open .dropdown-menu .dropdown-header{padding:5px 15px 5px 25px}.navbar-nav .open .dropdown-menu>li>a{line-height:20px}.navbar-nav .open .dropdown-menu>li>a:hover,.navbar-nav .open .dropdown-menu>li>a:focus{background-image:none}}@media (min-width:768px){.navbar-nav{float:left;margin:0}.navbar-nav>li{float:left}.navbar-nav>li>a{padding-top:15px;padding-bottom:15px}}.navbar-form{margin-left:-15px;margin-right:-15px;padding:10px 15px;border-top:1px solid transparent;border-bottom:1px solid transparent;-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 1px 0 rgba(255,255,255,0.1);box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 1px 0 rgba(255,255,255,0.1);margin-top:6px;margin-bottom:6px}@media (min-width:768px){.navbar-form .form-group{display:inline-block;margin-bottom:0;vertical-align:middle}.navbar-form .form-control{display:inline-block;width:auto;vertical-align:middle}.navbar-form .form-control-static{display:inline-block}.navbar-form .input-group{display:inline-table;vertical-align:middle}.navbar-form .input-group .input-group-addon,.navbar-form .input-group .input-group-btn,.navbar-form .input-group .form-control{width:auto}.navbar-form .input-group>.form-control{width:100%}.navbar-form .control-label{margin-bottom:0;vertical-align:middle}.navbar-form .radio,.navbar-form .checkbox{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}.navbar-form .radio label,.navbar-form .checkbox label{padding-left:0}.navbar-form .radio input[type=\"radio\"],.navbar-form .checkbox input[type=\"checkbox\"]{position:relative;margin-left:0}.navbar-form .has-feedback .form-control-feedback{top:0}}@media (max-width:767px){.navbar-form .form-group{margin-bottom:5px}.navbar-form .form-group:last-child{margin-bottom:0}}@media (min-width:768px){.navbar-form{width:auto;border:0;margin-left:0;margin-right:0;padding-top:0;padding-bottom:0;-webkit-box-shadow:none;box-shadow:none}}.navbar-nav>li>.dropdown-menu{margin-top:0;border-top-right-radius:0;border-top-left-radius:0}.navbar-fixed-bottom .navbar-nav>li>.dropdown-menu{margin-bottom:0;border-top-right-radius:4px;border-top-left-radius:4px;border-bottom-right-radius:0;border-bottom-left-radius:0}.navbar-btn{margin-top:6px;margin-bottom:6px}.navbar-btn.btn-sm{margin-top:10px;margin-bottom:10px}.navbar-btn.btn-xs{margin-top:14px;margin-bottom:14px}.navbar-text{margin-top:15px;margin-bottom:15px}@media (min-width:768px){.navbar-text{float:left;margin-left:15px;margin-right:15px}}@media (min-width:768px){.navbar-left{float:left !important}.navbar-right{float:right !important;margin-right:-15px}.navbar-right~.navbar-right{margin-right:0}}.navbar-default{background-color:#3a3f44;border-color:#2b2e32}.navbar-default .navbar-brand{color:#c8c8c8}.navbar-default .navbar-brand:hover,.navbar-default .navbar-brand:focus{color:#ffffff;background-color:none}.navbar-default .navbar-text{color:#c8c8c8}.navbar-default .navbar-nav>li>a{color:#c8c8c8}.navbar-default .navbar-nav>li>a:hover,.navbar-default .navbar-nav>li>a:focus{color:#ffffff;background-color:#272b2e}.navbar-default .navbar-nav>.active>a,.navbar-default .navbar-nav>.active>a:hover,.navbar-default .navbar-nav>.active>a:focus{color:#ffffff;background-color:#272b2e}.navbar-default .navbar-nav>.disabled>a,.navbar-default .navbar-nav>.disabled>a:hover,.navbar-default .navbar-nav>.disabled>a:focus{color:#cccccc;background-color:transparent}.navbar-default .navbar-toggle{border-color:#272b2e}.navbar-default .navbar-toggle:hover,.navbar-default .navbar-toggle:focus{background-color:#272b2e}.navbar-default .navbar-toggle .icon-bar{background-color:#c8c8c8}.navbar-default .navbar-collapse,.navbar-default .navbar-form{border-color:#2b2e32}.navbar-default .navbar-nav>.open>a,.navbar-default .navbar-nav>.open>a:hover,.navbar-default .navbar-nav>.open>a:focus{background-color:#272b2e;color:#ffffff}@media (max-width:767px){.navbar-default .navbar-nav .open .dropdown-menu>li>a{color:#c8c8c8}.navbar-default .navbar-nav .open .dropdown-menu>li>a:hover,.navbar-default .navbar-nav .open .dropdown-menu>li>a:focus{color:#ffffff;background-color:#272b2e}.navbar-default .navbar-nav .open .dropdown-menu>.active>a,.navbar-default .navbar-nav .open .dropdown-menu>.active>a:hover,.navbar-default .navbar-nav .open .dropdown-menu>.active>a:focus{color:#ffffff;background-color:#272b2e}.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a,.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:hover,.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:focus{color:#cccccc;background-color:transparent}}.navbar-default .navbar-link{color:#c8c8c8}.navbar-default .navbar-link:hover{color:#ffffff}.navbar-default .btn-link{color:#c8c8c8}.navbar-default .btn-link:hover,.navbar-default .btn-link:focus{color:#ffffff}.navbar-default .btn-link[disabled]:hover,fieldset[disabled] .navbar-default .btn-link:hover,.navbar-default .btn-link[disabled]:focus,fieldset[disabled] .navbar-default .btn-link:focus{color:#cccccc}.navbar-inverse{background-color:#7a8288;border-color:#62686d}.navbar-inverse .navbar-brand{color:#cccccc}.navbar-inverse .navbar-brand:hover,.navbar-inverse .navbar-brand:focus{color:#ffffff;background-color:none}.navbar-inverse .navbar-text{color:#cccccc}.navbar-inverse .navbar-nav>li>a{color:#cccccc}.navbar-inverse .navbar-nav>li>a:hover,.navbar-inverse .navbar-nav>li>a:focus{color:#ffffff;background-color:#5d6368}.navbar-inverse .navbar-nav>.active>a,.navbar-inverse .navbar-nav>.active>a:hover,.navbar-inverse .navbar-nav>.active>a:focus{color:#ffffff;background-color:#5d6368}.navbar-inverse .navbar-nav>.disabled>a,.navbar-inverse .navbar-nav>.disabled>a:hover,.navbar-inverse .navbar-nav>.disabled>a:focus{color:#cccccc;background-color:transparent}.navbar-inverse .navbar-toggle{border-color:#5d6368}.navbar-inverse .navbar-toggle:hover,.navbar-inverse .navbar-toggle:focus{background-color:#5d6368}.navbar-inverse .navbar-toggle .icon-bar{background-color:#ffffff}.navbar-inverse .navbar-collapse,.navbar-inverse .navbar-form{border-color:#697075}.navbar-inverse .navbar-nav>.open>a,.navbar-inverse .navbar-nav>.open>a:hover,.navbar-inverse .navbar-nav>.open>a:focus{background-color:#5d6368;color:#ffffff}@media (max-width:767px){.navbar-inverse .navbar-nav .open .dropdown-menu>.dropdown-header{border-color:#62686d}.navbar-inverse .navbar-nav .open .dropdown-menu .divider{background-color:#62686d}.navbar-inverse .navbar-nav .open .dropdown-menu>li>a{color:#cccccc}.navbar-inverse .navbar-nav .open .dropdown-menu>li>a:hover,.navbar-inverse .navbar-nav .open .dropdown-menu>li>a:focus{color:#ffffff;background-color:#5d6368}.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a,.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:hover,.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:focus{color:#ffffff;background-color:#5d6368}.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a,.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:hover,.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:focus{color:#cccccc;background-color:transparent}}.navbar-inverse .navbar-link{color:#cccccc}.navbar-inverse .navbar-link:hover{color:#ffffff}.navbar-inverse .btn-link{color:#cccccc}.navbar-inverse .btn-link:hover,.navbar-inverse .btn-link:focus{color:#ffffff}.navbar-inverse .btn-link[disabled]:hover,fieldset[disabled] .navbar-inverse .btn-link:hover,.navbar-inverse .btn-link[disabled]:focus,fieldset[disabled] .navbar-inverse .btn-link:focus{color:#cccccc}.breadcrumb{padding:8px 15px;margin-bottom:20px;list-style:none;background-color:transparent;border-radius:4px}.breadcrumb>li{display:inline-block}.breadcrumb>li+li:before{content:\"/\\00a0\";padding:0 5px;color:#cccccc}.breadcrumb>.active{color:#7a8288}.pagination{display:inline-block;padding-left:0;margin:20px 0;border-radius:4px}.pagination>li{display:inline}.pagination>li>a,.pagination>li>span{position:relative;float:left;padding:8px 12px;line-height:1.42857143;text-decoration:none;color:#ffffff;background-color:#3a3f44;border:1px solid rgba(0,0,0,0.6);margin-left:-1px}.pagination>li:first-child>a,.pagination>li:first-child>span{margin-left:0;border-bottom-left-radius:4px;border-top-left-radius:4px}.pagination>li:last-child>a,.pagination>li:last-child>span{border-bottom-right-radius:4px;border-top-right-radius:4px}.pagination>li>a:hover,.pagination>li>span:hover,.pagination>li>a:focus,.pagination>li>span:focus{z-index:2;color:#ffffff;background-color:transparent;border-color:rgba(0,0,0,0.6)}.pagination>.active>a,.pagination>.active>span,.pagination>.active>a:hover,.pagination>.active>span:hover,.pagination>.active>a:focus,.pagination>.active>span:focus{z-index:3;color:#ffffff;background-color:#232628;border-color:rgba(0,0,0,0.6);cursor:default}.pagination>.disabled>span,.pagination>.disabled>span:hover,.pagination>.disabled>span:focus,.pagination>.disabled>a,.pagination>.disabled>a:hover,.pagination>.disabled>a:focus{color:#7a8288;background-color:#ffffff;border-color:rgba(0,0,0,0.6);cursor:not-allowed}.pagination-lg>li>a,.pagination-lg>li>span{padding:14px 16px;font-size:18px;line-height:1.3333333}.pagination-lg>li:first-child>a,.pagination-lg>li:first-child>span{border-bottom-left-radius:6px;border-top-left-radius:6px}.pagination-lg>li:last-child>a,.pagination-lg>li:last-child>span{border-bottom-right-radius:6px;border-top-right-radius:6px}.pagination-sm>li>a,.pagination-sm>li>span{padding:5px 10px;font-size:12px;line-height:1.5}.pagination-sm>li:first-child>a,.pagination-sm>li:first-child>span{border-bottom-left-radius:3px;border-top-left-radius:3px}.pagination-sm>li:last-child>a,.pagination-sm>li:last-child>span{border-bottom-right-radius:3px;border-top-right-radius:3px}.pager{padding-left:0;margin:20px 0;list-style:none;text-align:center}.pager li{display:inline}.pager li>a,.pager li>span{display:inline-block;padding:5px 14px;background-color:#3a3f44;border:1px solid rgba(0,0,0,0.6);border-radius:15px}.pager li>a:hover,.pager li>a:focus{text-decoration:none;background-color:transparent}.pager .next>a,.pager .next>span{float:right}.pager .previous>a,.pager .previous>span{float:left}.pager .disabled>a,.pager .disabled>a:hover,.pager .disabled>a:focus,.pager .disabled>span{color:#7a8288;background-color:#3a3f44;cursor:not-allowed}.label{display:inline;padding:.2em .6em .3em;font-size:75%;font-weight:bold;line-height:1;color:#ffffff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25em}a.label:hover,a.label:focus{color:#ffffff;text-decoration:none;cursor:pointer}.label:empty{display:none}.btn .label{position:relative;top:-1px}.label-default{background-color:#3a3f44}.label-default[href]:hover,.label-default[href]:focus{background-color:#232628}.label-primary{background-color:#7a8288}.label-primary[href]:hover,.label-primary[href]:focus{background-color:#62686d}.label-success{background-color:#62c462}.label-success[href]:hover,.label-success[href]:focus{background-color:#42b142}.label-info{background-color:#5bc0de}.label-info[href]:hover,.label-info[href]:focus{background-color:#31b0d5}.label-warning{background-color:#f89406}.label-warning[href]:hover,.label-warning[href]:focus{background-color:#c67605}.label-danger{background-color:#ee5f5b}.label-danger[href]:hover,.label-danger[href]:focus{background-color:#e9322d}.badge{display:inline-block;min-width:10px;padding:3px 7px;font-size:12px;font-weight:bold;color:#ffffff;line-height:1;vertical-align:middle;white-space:nowrap;text-align:center;background-color:#7a8288;border-radius:10px}.badge:empty{display:none}.btn .badge{position:relative;top:-1px}.btn-xs .badge,.btn-group-xs>.btn .badge{top:0;padding:1px 5px}a.badge:hover,a.badge:focus{color:#ffffff;text-decoration:none;cursor:pointer}.list-group-item.active>.badge,.nav-pills>.active>a>.badge{color:#ffffff;background-color:#7a8288}.list-group-item>.badge{float:right}.list-group-item>.badge+.badge{margin-right:5px}.nav-pills>li>a>.badge{margin-left:3px}.jumbotron{padding-top:30px;padding-bottom:30px;margin-bottom:30px;color:inherit;background-color:#1c1e22}.jumbotron h1,.jumbotron .h1{color:inherit}.jumbotron p{margin-bottom:15px;font-size:21px;font-weight:200}.jumbotron>hr{border-top-color:#050506}.container .jumbotron,.container-fluid .jumbotron{border-radius:6px;padding-left:15px;padding-right:15px}.jumbotron .container{max-width:100%}@media screen and (min-width:768px){.jumbotron{padding-top:48px;padding-bottom:48px}.container .jumbotron,.container-fluid .jumbotron{padding-left:60px;padding-right:60px}.jumbotron h1,.jumbotron .h1{font-size:63px}}.thumbnail{display:block;padding:4px;margin-bottom:20px;line-height:1.42857143;background-color:#1c1e22;border:1px solid #0c0d0e;border-radius:4px;-webkit-transition:border .2s ease-in-out;-o-transition:border .2s ease-in-out;transition:border .2s ease-in-out}.thumbnail>img,.thumbnail a>img{margin-left:auto;margin-right:auto}a.thumbnail:hover,a.thumbnail:focus,a.thumbnail.active{border-color:#ffffff}.thumbnail .caption{padding:9px;color:#c8c8c8}.alert{padding:15px;margin-bottom:20px;border:1px solid transparent;border-radius:4px}.alert h4{margin-top:0;color:inherit}.alert .alert-link{font-weight:bold}.alert>p,.alert>ul{margin-bottom:0}.alert>p+p{margin-top:5px}.alert-dismissable,.alert-dismissible{padding-right:35px}.alert-dismissable .close,.alert-dismissible .close{position:relative;top:-2px;right:-21px;color:inherit}.alert-success{background-color:#62c462;border-color:#62bd4f;color:#ffffff}.alert-success hr{border-top-color:#55b142}.alert-success .alert-link{color:#e6e6e6}.alert-info{background-color:#5bc0de;border-color:#3dced8;color:#ffffff}.alert-info hr{border-top-color:#2ac7d2}.alert-info .alert-link{color:#e6e6e6}.alert-warning{background-color:#f89406;border-color:#e96506;color:#ffffff}.alert-warning hr{border-top-color:#d05a05}.alert-warning .alert-link{color:#e6e6e6}.alert-danger{background-color:#ee5f5b;border-color:#ed4d63;color:#ffffff}.alert-danger hr{border-top-color:#ea364f}.alert-danger .alert-link{color:#e6e6e6}@-webkit-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@-o-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}.progress{overflow:hidden;height:20px;margin-bottom:20px;background-color:#1c1e22;border-radius:4px;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,0.1);box-shadow:inset 0 1px 2px rgba(0,0,0,0.1)}.progress-bar{float:left;width:0%;height:100%;font-size:12px;line-height:20px;color:#ffffff;text-align:center;background-color:#7a8288;-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,0.15);box-shadow:inset 0 -1px 0 rgba(0,0,0,0.15);-webkit-transition:width 0.6s ease;-o-transition:width 0.6s ease;transition:width 0.6s ease}.progress-striped .progress-bar,.progress-bar-striped{background-image:-webkit-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:-o-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);-webkit-background-size:40px 40px;background-size:40px 40px}.progress.active .progress-bar,.progress-bar.active{-webkit-animation:progress-bar-stripes 2s linear infinite;-o-animation:progress-bar-stripes 2s linear infinite;animation:progress-bar-stripes 2s linear infinite}.progress-bar-success{background-color:#62c462}.progress-striped .progress-bar-success{background-image:-webkit-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:-o-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)}.progress-bar-info{background-color:#5bc0de}.progress-striped .progress-bar-info{background-image:-webkit-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:-o-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)}.progress-bar-warning{background-color:#f89406}.progress-striped .progress-bar-warning{background-image:-webkit-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:-o-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)}.progress-bar-danger{background-color:#ee5f5b}.progress-striped .progress-bar-danger{background-image:-webkit-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:-o-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)}.media{margin-top:15px}.media:first-child{margin-top:0}.media,.media-body{zoom:1;overflow:hidden}.media-body{width:10000px}.media-object{display:block}.media-object.img-thumbnail{max-width:none}.media-right,.media>.pull-right{padding-left:10px}.media-left,.media>.pull-left{padding-right:10px}.media-left,.media-right,.media-body{display:table-cell;vertical-align:top}.media-middle{vertical-align:middle}.media-bottom{vertical-align:bottom}.media-heading{margin-top:0;margin-bottom:5px}.media-list{padding-left:0;list-style:none}.list-group{margin-bottom:20px;padding-left:0}.list-group-item{position:relative;display:block;padding:10px 15px;margin-bottom:-1px;background-color:#32383e;border:1px solid rgba(0,0,0,0.6)}.list-group-item:first-child{border-top-right-radius:4px;border-top-left-radius:4px}.list-group-item:last-child{margin-bottom:0;border-bottom-right-radius:4px;border-bottom-left-radius:4px}a.list-group-item,button.list-group-item{color:#c8c8c8}a.list-group-item .list-group-item-heading,button.list-group-item .list-group-item-heading{color:#ffffff}a.list-group-item:hover,button.list-group-item:hover,a.list-group-item:focus,button.list-group-item:focus{text-decoration:none;color:#c8c8c8;background-color:#3e444c}button.list-group-item{width:100%;text-align:left}.list-group-item.disabled,.list-group-item.disabled:hover,.list-group-item.disabled:focus{background-color:#999999;color:#7a8288;cursor:not-allowed}.list-group-item.disabled .list-group-item-heading,.list-group-item.disabled:hover .list-group-item-heading,.list-group-item.disabled:focus .list-group-item-heading{color:inherit}.list-group-item.disabled .list-group-item-text,.list-group-item.disabled:hover .list-group-item-text,.list-group-item.disabled:focus .list-group-item-text{color:#7a8288}.list-group-item.active,.list-group-item.active:hover,.list-group-item.active:focus{z-index:2;color:#ffffff;background-color:#3e444c;border-color:rgba(0,0,0,0.6)}.list-group-item.active .list-group-item-heading,.list-group-item.active:hover .list-group-item-heading,.list-group-item.active:focus .list-group-item-heading,.list-group-item.active .list-group-item-heading>small,.list-group-item.active:hover .list-group-item-heading>small,.list-group-item.active:focus .list-group-item-heading>small,.list-group-item.active .list-group-item-heading>.small,.list-group-item.active:hover .list-group-item-heading>.small,.list-group-item.active:focus .list-group-item-heading>.small{color:inherit}.list-group-item.active .list-group-item-text,.list-group-item.active:hover .list-group-item-text,.list-group-item.active:focus .list-group-item-text{color:#a2aab4}.list-group-item-success{color:#ffffff;background-color:#62c462}a.list-group-item-success,button.list-group-item-success{color:#ffffff}a.list-group-item-success .list-group-item-heading,button.list-group-item-success .list-group-item-heading{color:inherit}a.list-group-item-success:hover,button.list-group-item-success:hover,a.list-group-item-success:focus,button.list-group-item-success:focus{color:#ffffff;background-color:#4fbd4f}a.list-group-item-success.active,button.list-group-item-success.active,a.list-group-item-success.active:hover,button.list-group-item-success.active:hover,a.list-group-item-success.active:focus,button.list-group-item-success.active:focus{color:#fff;background-color:#ffffff;border-color:#ffffff}.list-group-item-info{color:#ffffff;background-color:#5bc0de}a.list-group-item-info,button.list-group-item-info{color:#ffffff}a.list-group-item-info .list-group-item-heading,button.list-group-item-info .list-group-item-heading{color:inherit}a.list-group-item-info:hover,button.list-group-item-info:hover,a.list-group-item-info:focus,button.list-group-item-info:focus{color:#ffffff;background-color:#46b8da}a.list-group-item-info.active,button.list-group-item-info.active,a.list-group-item-info.active:hover,button.list-group-item-info.active:hover,a.list-group-item-info.active:focus,button.list-group-item-info.active:focus{color:#fff;background-color:#ffffff;border-color:#ffffff}.list-group-item-warning{color:#ffffff;background-color:#f89406}a.list-group-item-warning,button.list-group-item-warning{color:#ffffff}a.list-group-item-warning .list-group-item-heading,button.list-group-item-warning .list-group-item-heading{color:inherit}a.list-group-item-warning:hover,button.list-group-item-warning:hover,a.list-group-item-warning:focus,button.list-group-item-warning:focus{color:#ffffff;background-color:#df8505}a.list-group-item-warning.active,button.list-group-item-warning.active,a.list-group-item-warning.active:hover,button.list-group-item-warning.active:hover,a.list-group-item-warning.active:focus,button.list-group-item-warning.active:focus{color:#fff;background-color:#ffffff;border-color:#ffffff}.list-group-item-danger{color:#ffffff;background-color:#ee5f5b}a.list-group-item-danger,button.list-group-item-danger{color:#ffffff}a.list-group-item-danger .list-group-item-heading,button.list-group-item-danger .list-group-item-heading{color:inherit}a.list-group-item-danger:hover,button.list-group-item-danger:hover,a.list-group-item-danger:focus,button.list-group-item-danger:focus{color:#ffffff;background-color:#ec4844}a.list-group-item-danger.active,button.list-group-item-danger.active,a.list-group-item-danger.active:hover,button.list-group-item-danger.active:hover,a.list-group-item-danger.active:focus,button.list-group-item-danger.active:focus{color:#fff;background-color:#ffffff;border-color:#ffffff}.list-group-item-heading{margin-top:0;margin-bottom:5px}.list-group-item-text{margin-bottom:0;line-height:1.3}.panel{margin-bottom:20px;background-color:#2e3338;border:1px solid transparent;border-radius:4px;-webkit-box-shadow:0 1px 1px rgba(0,0,0,0.05);box-shadow:0 1px 1px rgba(0,0,0,0.05)}.panel-body{padding:15px}.panel-heading{padding:10px 15px;border-bottom:1px solid transparent;border-top-right-radius:3px;border-top-left-radius:3px}.panel-heading>.dropdown .dropdown-toggle{color:inherit}.panel-title{margin-top:0;margin-bottom:0;font-size:16px;color:inherit}.panel-title>a,.panel-title>small,.panel-title>.small,.panel-title>small>a,.panel-title>.small>a{color:inherit}.panel-footer{padding:10px 15px;background-color:#3e444c;border-top:1px solid rgba(0,0,0,0.6);border-bottom-right-radius:3px;border-bottom-left-radius:3px}.panel>.list-group,.panel>.panel-collapse>.list-group{margin-bottom:0}.panel>.list-group .list-group-item,.panel>.panel-collapse>.list-group .list-group-item{border-width:1px 0;border-radius:0}.panel>.list-group:first-child .list-group-item:first-child,.panel>.panel-collapse>.list-group:first-child .list-group-item:first-child{border-top:0;border-top-right-radius:3px;border-top-left-radius:3px}.panel>.list-group:last-child .list-group-item:last-child,.panel>.panel-collapse>.list-group:last-child .list-group-item:last-child{border-bottom:0;border-bottom-right-radius:3px;border-bottom-left-radius:3px}.panel>.panel-heading+.panel-collapse>.list-group .list-group-item:first-child{border-top-right-radius:0;border-top-left-radius:0}.panel-heading+.list-group .list-group-item:first-child{border-top-width:0}.list-group+.panel-footer{border-top-width:0}.panel>.table,.panel>.table-responsive>.table,.panel>.panel-collapse>.table{margin-bottom:0}.panel>.table caption,.panel>.table-responsive>.table caption,.panel>.panel-collapse>.table caption{padding-left:15px;padding-right:15px}.panel>.table:first-child,.panel>.table-responsive:first-child>.table:first-child{border-top-right-radius:3px;border-top-left-radius:3px}.panel>.table:first-child>thead:first-child>tr:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child{border-top-left-radius:3px;border-top-right-radius:3px}.panel>.table:first-child>thead:first-child>tr:first-child td:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child td:first-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:first-child,.panel>.table:first-child>thead:first-child>tr:first-child th:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child th:first-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:first-child{border-top-left-radius:3px}.panel>.table:first-child>thead:first-child>tr:first-child td:last-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:last-child,.panel>.table:first-child>tbody:first-child>tr:first-child td:last-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:last-child,.panel>.table:first-child>thead:first-child>tr:first-child th:last-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:last-child,.panel>.table:first-child>tbody:first-child>tr:first-child th:last-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:last-child{border-top-right-radius:3px}.panel>.table:last-child,.panel>.table-responsive:last-child>.table:last-child{border-bottom-right-radius:3px;border-bottom-left-radius:3px}.panel>.table:last-child>tbody:last-child>tr:last-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child{border-bottom-left-radius:3px;border-bottom-right-radius:3px}.panel>.table:last-child>tbody:last-child>tr:last-child td:first-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:first-child,.panel>.table:last-child>tfoot:last-child>tr:last-child td:first-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:first-child,.panel>.table:last-child>tbody:last-child>tr:last-child th:first-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:first-child,.panel>.table:last-child>tfoot:last-child>tr:last-child th:first-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:first-child{border-bottom-left-radius:3px}.panel>.table:last-child>tbody:last-child>tr:last-child td:last-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child td:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child th:last-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child th:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:last-child{border-bottom-right-radius:3px}.panel>.panel-body+.table,.panel>.panel-body+.table-responsive,.panel>.table+.panel-body,.panel>.table-responsive+.panel-body{border-top:1px solid #1c1e22}.panel>.table>tbody:first-child>tr:first-child th,.panel>.table>tbody:first-child>tr:first-child td{border-top:0}.panel>.table-bordered,.panel>.table-responsive>.table-bordered{border:0}.panel>.table-bordered>thead>tr>th:first-child,.panel>.table-responsive>.table-bordered>thead>tr>th:first-child,.panel>.table-bordered>tbody>tr>th:first-child,.panel>.table-responsive>.table-bordered>tbody>tr>th:first-child,.panel>.table-bordered>tfoot>tr>th:first-child,.panel>.table-responsive>.table-bordered>tfoot>tr>th:first-child,.panel>.table-bordered>thead>tr>td:first-child,.panel>.table-responsive>.table-bordered>thead>tr>td:first-child,.panel>.table-bordered>tbody>tr>td:first-child,.panel>.table-responsive>.table-bordered>tbody>tr>td:first-child,.panel>.table-bordered>tfoot>tr>td:first-child,.panel>.table-responsive>.table-bordered>tfoot>tr>td:first-child{border-left:0}.panel>.table-bordered>thead>tr>th:last-child,.panel>.table-responsive>.table-bordered>thead>tr>th:last-child,.panel>.table-bordered>tbody>tr>th:last-child,.panel>.table-responsive>.table-bordered>tbody>tr>th:last-child,.panel>.table-bordered>tfoot>tr>th:last-child,.panel>.table-responsive>.table-bordered>tfoot>tr>th:last-child,.panel>.table-bordered>thead>tr>td:last-child,.panel>.table-responsive>.table-bordered>thead>tr>td:last-child,.panel>.table-bordered>tbody>tr>td:last-child,.panel>.table-responsive>.table-bordered>tbody>tr>td:last-child,.panel>.table-bordered>tfoot>tr>td:last-child,.panel>.table-responsive>.table-bordered>tfoot>tr>td:last-child{border-right:0}.panel>.table-bordered>thead>tr:first-child>td,.panel>.table-responsive>.table-bordered>thead>tr:first-child>td,.panel>.table-bordered>tbody>tr:first-child>td,.panel>.table-responsive>.table-bordered>tbody>tr:first-child>td,.panel>.table-bordered>thead>tr:first-child>th,.panel>.table-responsive>.table-bordered>thead>tr:first-child>th,.panel>.table-bordered>tbody>tr:first-child>th,.panel>.table-responsive>.table-bordered>tbody>tr:first-child>th{border-bottom:0}.panel>.table-bordered>tbody>tr:last-child>td,.panel>.table-responsive>.table-bordered>tbody>tr:last-child>td,.panel>.table-bordered>tfoot>tr:last-child>td,.panel>.table-responsive>.table-bordered>tfoot>tr:last-child>td,.panel>.table-bordered>tbody>tr:last-child>th,.panel>.table-responsive>.table-bordered>tbody>tr:last-child>th,.panel>.table-bordered>tfoot>tr:last-child>th,.panel>.table-responsive>.table-bordered>tfoot>tr:last-child>th{border-bottom:0}.panel>.table-responsive{border:0;margin-bottom:0}.panel-group{margin-bottom:20px}.panel-group .panel{margin-bottom:0;border-radius:4px}.panel-group .panel+.panel{margin-top:5px}.panel-group .panel-heading{border-bottom:0}.panel-group .panel-heading+.panel-collapse>.panel-body,.panel-group .panel-heading+.panel-collapse>.list-group{border-top:1px solid rgba(0,0,0,0.6)}.panel-group .panel-footer{border-top:0}.panel-group .panel-footer+.panel-collapse .panel-body{border-bottom:1px solid rgba(0,0,0,0.6)}.panel-default{border-color:rgba(0,0,0,0.6)}.panel-default>.panel-heading{color:#c8c8c8;background-color:#3e444c;border-color:rgba(0,0,0,0.6)}.panel-default>.panel-heading+.panel-collapse>.panel-body{border-top-color:rgba(0,0,0,0.6)}.panel-default>.panel-heading .badge{color:#3e444c;background-color:#c8c8c8}.panel-default>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:rgba(0,0,0,0.6)}.panel-primary{border-color:rgba(0,0,0,0.6)}.panel-primary>.panel-heading{color:#ffffff;background-color:#7a8288;border-color:rgba(0,0,0,0.6)}.panel-primary>.panel-heading+.panel-collapse>.panel-body{border-top-color:rgba(0,0,0,0.6)}.panel-primary>.panel-heading .badge{color:#7a8288;background-color:#ffffff}.panel-primary>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:rgba(0,0,0,0.6)}.panel-success{border-color:rgba(0,0,0,0.6)}.panel-success>.panel-heading{color:#ffffff;background-color:#62c462;border-color:rgba(0,0,0,0.6)}.panel-success>.panel-heading+.panel-collapse>.panel-body{border-top-color:rgba(0,0,0,0.6)}.panel-success>.panel-heading .badge{color:#62c462;background-color:#ffffff}.panel-success>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:rgba(0,0,0,0.6)}.panel-info{border-color:rgba(0,0,0,0.6)}.panel-info>.panel-heading{color:#ffffff;background-color:#5bc0de;border-color:rgba(0,0,0,0.6)}.panel-info>.panel-heading+.panel-collapse>.panel-body{border-top-color:rgba(0,0,0,0.6)}.panel-info>.panel-heading .badge{color:#5bc0de;background-color:#ffffff}.panel-info>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:rgba(0,0,0,0.6)}.panel-warning{border-color:rgba(0,0,0,0.6)}.panel-warning>.panel-heading{color:#ffffff;background-color:#f89406;border-color:rgba(0,0,0,0.6)}.panel-warning>.panel-heading+.panel-collapse>.panel-body{border-top-color:rgba(0,0,0,0.6)}.panel-warning>.panel-heading .badge{color:#f89406;background-color:#ffffff}.panel-warning>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:rgba(0,0,0,0.6)}.panel-danger{border-color:rgba(0,0,0,0.6)}.panel-danger>.panel-heading{color:#ffffff;background-color:#ee5f5b;border-color:rgba(0,0,0,0.6)}.panel-danger>.panel-heading+.panel-collapse>.panel-body{border-top-color:rgba(0,0,0,0.6)}.panel-danger>.panel-heading .badge{color:#ee5f5b;background-color:#ffffff}.panel-danger>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:rgba(0,0,0,0.6)}.embed-responsive{position:relative;display:block;height:0;padding:0;overflow:hidden}.embed-responsive .embed-responsive-item,.embed-responsive iframe,.embed-responsive embed,.embed-responsive object,.embed-responsive video{position:absolute;top:0;left:0;bottom:0;height:100%;width:100%;border:0}.embed-responsive-16by9{padding-bottom:56.25%}.embed-responsive-4by3{padding-bottom:75%}.well{min-height:20px;padding:19px;margin-bottom:20px;background-color:#1c1e22;border:1px solid #0c0d0e;border-radius:4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.05);box-shadow:inset 0 1px 1px rgba(0,0,0,0.05)}.well blockquote{border-color:#ddd;border-color:rgba(0,0,0,0.15)}.well-lg{padding:24px;border-radius:6px}.well-sm{padding:9px;border-radius:3px}.close{float:right;font-size:21px;font-weight:bold;line-height:1;color:#000000;text-shadow:0 1px 0 #ffffff;opacity:0.2;filter:alpha(opacity=20)}.close:hover,.close:focus{color:#000000;text-decoration:none;cursor:pointer;opacity:0.5;filter:alpha(opacity=50)}button.close{padding:0;cursor:pointer;background:transparent;border:0;-webkit-appearance:none}.modal-open{overflow:hidden}.modal{display:none;overflow:hidden;position:fixed;top:0;right:0;bottom:0;left:0;z-index:1050;-webkit-overflow-scrolling:touch;outline:0}.modal.fade .modal-dialog{-webkit-transform:translate(0, -25%);-ms-transform:translate(0, -25%);-o-transform:translate(0, -25%);transform:translate(0, -25%);-webkit-transition:-webkit-transform .3s ease-out;-o-transition:-o-transform .3s ease-out;transition:transform .3s ease-out}.modal.in .modal-dialog{-webkit-transform:translate(0, 0);-ms-transform:translate(0, 0);-o-transform:translate(0, 0);transform:translate(0, 0)}.modal-open .modal{overflow-x:hidden;overflow-y:auto}.modal-dialog{position:relative;width:auto;margin:10px}.modal-content{position:relative;background-color:#2e3338;border:1px solid #999999;border:1px solid rgba(0,0,0,0.2);border-radius:6px;-webkit-box-shadow:0 3px 9px rgba(0,0,0,0.5);box-shadow:0 3px 9px rgba(0,0,0,0.5);-webkit-background-clip:padding-box;background-clip:padding-box;outline:0}.modal-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;background-color:#000000}.modal-backdrop.fade{opacity:0;filter:alpha(opacity=0)}.modal-backdrop.in{opacity:0.5;filter:alpha(opacity=50)}.modal-header{padding:15px;border-bottom:1px solid #1c1e22}.modal-header .close{margin-top:-2px}.modal-title{margin:0;line-height:1.42857143}.modal-body{position:relative;padding:20px}.modal-footer{padding:20px;text-align:right;border-top:1px solid #1c1e22}.modal-footer .btn+.btn{margin-left:5px;margin-bottom:0}.modal-footer .btn-group .btn+.btn{margin-left:-1px}.modal-footer .btn-block+.btn-block{margin-left:0}.modal-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}@media (min-width:768px){.modal-dialog{width:600px;margin:30px auto}.modal-content{-webkit-box-shadow:0 5px 15px rgba(0,0,0,0.5);box-shadow:0 5px 15px rgba(0,0,0,0.5)}.modal-sm{width:300px}}@media (min-width:992px){.modal-lg{width:900px}}.tooltip{position:absolute;z-index:1070;display:block;font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-style:normal;font-weight:normal;letter-spacing:normal;line-break:auto;line-height:1.42857143;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;white-space:normal;word-break:normal;word-spacing:normal;word-wrap:normal;font-size:12px;opacity:0;filter:alpha(opacity=0)}.tooltip.in{opacity:0.9;filter:alpha(opacity=90)}.tooltip.top{margin-top:-3px;padding:5px 0}.tooltip.right{margin-left:3px;padding:0 5px}.tooltip.bottom{margin-top:3px;padding:5px 0}.tooltip.left{margin-left:-3px;padding:0 5px}.tooltip-inner{max-width:200px;padding:3px 8px;color:#ffffff;text-align:center;background-color:#000000;border-radius:4px}.tooltip-arrow{position:absolute;width:0;height:0;border-color:transparent;border-style:solid}.tooltip.top .tooltip-arrow{bottom:0;left:50%;margin-left:-5px;border-width:5px 5px 0;border-top-color:#000000}.tooltip.top-left .tooltip-arrow{bottom:0;right:5px;margin-bottom:-5px;border-width:5px 5px 0;border-top-color:#000000}.tooltip.top-right .tooltip-arrow{bottom:0;left:5px;margin-bottom:-5px;border-width:5px 5px 0;border-top-color:#000000}.tooltip.right .tooltip-arrow{top:50%;left:0;margin-top:-5px;border-width:5px 5px 5px 0;border-right-color:#000000}.tooltip.left .tooltip-arrow{top:50%;right:0;margin-top:-5px;border-width:5px 0 5px 5px;border-left-color:#000000}.tooltip.bottom .tooltip-arrow{top:0;left:50%;margin-left:-5px;border-width:0 5px 5px;border-bottom-color:#000000}.tooltip.bottom-left .tooltip-arrow{top:0;right:5px;margin-top:-5px;border-width:0 5px 5px;border-bottom-color:#000000}.tooltip.bottom-right .tooltip-arrow{top:0;left:5px;margin-top:-5px;border-width:0 5px 5px;border-bottom-color:#000000}.popover{position:absolute;top:0;left:0;z-index:1060;display:none;max-width:276px;padding:1px;font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-style:normal;font-weight:normal;letter-spacing:normal;line-break:auto;line-height:1.42857143;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;white-space:normal;word-break:normal;word-spacing:normal;word-wrap:normal;font-size:14px;background-color:#2e3338;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #999999;border:1px solid rgba(0,0,0,0.2);border-radius:6px;-webkit-box-shadow:0 5px 10px rgba(0,0,0,0.2);box-shadow:0 5px 10px rgba(0,0,0,0.2)}.popover.top{margin-top:-10px}.popover.right{margin-left:10px}.popover.bottom{margin-top:10px}.popover.left{margin-left:-10px}.popover-title{margin:0;padding:8px 14px;font-size:14px;background-color:#2e3338;border-bottom:1px solid #22262a;border-radius:5px 5px 0 0}.popover-content{padding:9px 14px}.popover>.arrow,.popover>.arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}.popover>.arrow{border-width:11px}.popover>.arrow:after{border-width:10px;content:\"\"}.popover.top>.arrow{left:50%;margin-left:-11px;border-bottom-width:0;border-top-color:#666666;border-top-color:rgba(0,0,0,0.25);bottom:-11px}.popover.top>.arrow:after{content:\" \";bottom:1px;margin-left:-10px;border-bottom-width:0;border-top-color:#2e3338}.popover.right>.arrow{top:50%;left:-11px;margin-top:-11px;border-left-width:0;border-right-color:#666666;border-right-color:rgba(0,0,0,0.25)}.popover.right>.arrow:after{content:\" \";left:1px;bottom:-10px;border-left-width:0;border-right-color:#2e3338}.popover.bottom>.arrow{left:50%;margin-left:-11px;border-top-width:0;border-bottom-color:#666666;border-bottom-color:rgba(0,0,0,0.25);top:-11px}.popover.bottom>.arrow:after{content:\" \";top:1px;margin-left:-10px;border-top-width:0;border-bottom-color:#2e3338}.popover.left>.arrow{top:50%;right:-11px;margin-top:-11px;border-right-width:0;border-left-color:#666666;border-left-color:rgba(0,0,0,0.25)}.popover.left>.arrow:after{content:\" \";right:1px;border-right-width:0;border-left-color:#2e3338;bottom:-10px}.carousel{position:relative}.carousel-inner{position:relative;overflow:hidden;width:100%}.carousel-inner>.item{display:none;position:relative;-webkit-transition:.6s ease-in-out left;-o-transition:.6s ease-in-out left;transition:.6s ease-in-out left}.carousel-inner>.item>img,.carousel-inner>.item>a>img{line-height:1}@media all and (transform-3d),(-webkit-transform-3d){.carousel-inner>.item{-webkit-transition:-webkit-transform .6s ease-in-out;-o-transition:-o-transform .6s ease-in-out;transition:transform .6s ease-in-out;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-perspective:1000px;perspective:1000px}.carousel-inner>.item.next,.carousel-inner>.item.active.right{-webkit-transform:translate3d(100%, 0, 0);transform:translate3d(100%, 0, 0);left:0}.carousel-inner>.item.prev,.carousel-inner>.item.active.left{-webkit-transform:translate3d(-100%, 0, 0);transform:translate3d(-100%, 0, 0);left:0}.carousel-inner>.item.next.left,.carousel-inner>.item.prev.right,.carousel-inner>.item.active{-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);left:0}}.carousel-inner>.active,.carousel-inner>.next,.carousel-inner>.prev{display:block}.carousel-inner>.active{left:0}.carousel-inner>.next,.carousel-inner>.prev{position:absolute;top:0;width:100%}.carousel-inner>.next{left:100%}.carousel-inner>.prev{left:-100%}.carousel-inner>.next.left,.carousel-inner>.prev.right{left:0}.carousel-inner>.active.left{left:-100%}.carousel-inner>.active.right{left:100%}.carousel-control{position:absolute;top:0;left:0;bottom:0;width:15%;opacity:0.5;filter:alpha(opacity=50);font-size:20px;color:#ffffff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,0.6);background-color:rgba(0,0,0,0)}.carousel-control.left{background-image:-webkit-linear-gradient(left, rgba(0,0,0,0.5) 0, rgba(0,0,0,0.0001) 100%);background-image:-o-linear-gradient(left, rgba(0,0,0,0.5) 0, rgba(0,0,0,0.0001) 100%);background-image:-webkit-gradient(linear, left top, right top, from(rgba(0,0,0,0.5)), to(rgba(0,0,0,0.0001)));background-image:linear-gradient(to right, rgba(0,0,0,0.5) 0, rgba(0,0,0,0.0001) 100%);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1)}.carousel-control.right{left:auto;right:0;background-image:-webkit-linear-gradient(left, rgba(0,0,0,0.0001) 0, rgba(0,0,0,0.5) 100%);background-image:-o-linear-gradient(left, rgba(0,0,0,0.0001) 0, rgba(0,0,0,0.5) 100%);background-image:-webkit-gradient(linear, left top, right top, from(rgba(0,0,0,0.0001)), to(rgba(0,0,0,0.5)));background-image:linear-gradient(to right, rgba(0,0,0,0.0001) 0, rgba(0,0,0,0.5) 100%);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1)}.carousel-control:hover,.carousel-control:focus{outline:0;color:#ffffff;text-decoration:none;opacity:0.9;filter:alpha(opacity=90)}.carousel-control .icon-prev,.carousel-control .icon-next,.carousel-control .glyphicon-chevron-left,.carousel-control .glyphicon-chevron-right{position:absolute;top:50%;margin-top:-10px;z-index:5;display:inline-block}.carousel-control .icon-prev,.carousel-control .glyphicon-chevron-left{left:50%;margin-left:-10px}.carousel-control .icon-next,.carousel-control .glyphicon-chevron-right{right:50%;margin-right:-10px}.carousel-control .icon-prev,.carousel-control .icon-next{width:20px;height:20px;line-height:1;font-family:serif}.carousel-control .icon-prev:before{content:'\\2039'}.carousel-control .icon-next:before{content:'\\203a'}.carousel-indicators{position:absolute;bottom:10px;left:50%;z-index:15;width:60%;margin-left:-30%;padding-left:0;list-style:none;text-align:center}.carousel-indicators li{display:inline-block;width:10px;height:10px;margin:1px;text-indent:-999px;border:1px solid #ffffff;border-radius:10px;cursor:pointer;background-color:#000 \\9;background-color:rgba(0,0,0,0)}.carousel-indicators .active{margin:0;width:12px;height:12px;background-color:#ffffff}.carousel-caption{position:absolute;left:15%;right:15%;bottom:20px;z-index:10;padding-top:20px;padding-bottom:20px;color:#ffffff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,0.6)}.carousel-caption .btn{text-shadow:none}@media screen and (min-width:768px){.carousel-control .glyphicon-chevron-left,.carousel-control .glyphicon-chevron-right,.carousel-control .icon-prev,.carousel-control .icon-next{width:30px;height:30px;margin-top:-10px;font-size:30px}.carousel-control .glyphicon-chevron-left,.carousel-control .icon-prev{margin-left:-10px}.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next{margin-right:-10px}.carousel-caption{left:20%;right:20%;padding-bottom:30px}.carousel-indicators{bottom:20px}}.clearfix:before,.clearfix:after,.dl-horizontal dd:before,.dl-horizontal dd:after,.container:before,.container:after,.container-fluid:before,.container-fluid:after,.row:before,.row:after,.form-horizontal .form-group:before,.form-horizontal .form-group:after,.btn-toolbar:before,.btn-toolbar:after,.btn-group-vertical>.btn-group:before,.btn-group-vertical>.btn-group:after,.nav:before,.nav:after,.navbar:before,.navbar:after,.navbar-header:before,.navbar-header:after,.navbar-collapse:before,.navbar-collapse:after,.pager:before,.pager:after,.panel-body:before,.panel-body:after,.modal-header:before,.modal-header:after,.modal-footer:before,.modal-footer:after{content:\" \";display:table}.clearfix:after,.dl-horizontal dd:after,.container:after,.container-fluid:after,.row:after,.form-horizontal .form-group:after,.btn-toolbar:after,.btn-group-vertical>.btn-group:after,.nav:after,.navbar:after,.navbar-header:after,.navbar-collapse:after,.pager:after,.panel-body:after,.modal-header:after,.modal-footer:after{clear:both}.center-block{display:block;margin-left:auto;margin-right:auto}.pull-right{float:right !important}.pull-left{float:left !important}.hide{display:none !important}.show{display:block !important}.invisible{visibility:hidden}.text-hide{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.hidden{display:none !important}.affix{position:fixed}@-ms-viewport{width:device-width}.visible-xs,.visible-sm,.visible-md,.visible-lg{display:none !important}.visible-xs-block,.visible-xs-inline,.visible-xs-inline-block,.visible-sm-block,.visible-sm-inline,.visible-sm-inline-block,.visible-md-block,.visible-md-inline,.visible-md-inline-block,.visible-lg-block,.visible-lg-inline,.visible-lg-inline-block{display:none !important}@media (max-width:767px){.visible-xs{display:block !important}table.visible-xs{display:table !important}tr.visible-xs{display:table-row !important}th.visible-xs,td.visible-xs{display:table-cell !important}}@media (max-width:767px){.visible-xs-block{display:block !important}}@media (max-width:767px){.visible-xs-inline{display:inline !important}}@media (max-width:767px){.visible-xs-inline-block{display:inline-block !important}}@media (min-width:768px) and (max-width:991px){.visible-sm{display:block !important}table.visible-sm{display:table !important}tr.visible-sm{display:table-row !important}th.visible-sm,td.visible-sm{display:table-cell !important}}@media (min-width:768px) and (max-width:991px){.visible-sm-block{display:block !important}}@media (min-width:768px) and (max-width:991px){.visible-sm-inline{display:inline !important}}@media (min-width:768px) and (max-width:991px){.visible-sm-inline-block{display:inline-block !important}}@media (min-width:992px) and (max-width:1199px){.visible-md{display:block !important}table.visible-md{display:table !important}tr.visible-md{display:table-row !important}th.visible-md,td.visible-md{display:table-cell !important}}@media (min-width:992px) and (max-width:1199px){.visible-md-block{display:block !important}}@media (min-width:992px) and (max-width:1199px){.visible-md-inline{display:inline !important}}@media (min-width:992px) and (max-width:1199px){.visible-md-inline-block{display:inline-block !important}}@media (min-width:1200px){.visible-lg{display:block !important}table.visible-lg{display:table !important}tr.visible-lg{display:table-row !important}th.visible-lg,td.visible-lg{display:table-cell !important}}@media (min-width:1200px){.visible-lg-block{display:block !important}}@media (min-width:1200px){.visible-lg-inline{display:inline !important}}@media (min-width:1200px){.visible-lg-inline-block{display:inline-block !important}}@media (max-width:767px){.hidden-xs{display:none !important}}@media (min-width:768px) and (max-width:991px){.hidden-sm{display:none !important}}@media (min-width:992px) and (max-width:1199px){.hidden-md{display:none !important}}@media (min-width:1200px){.hidden-lg{display:none !important}}.visible-print{display:none !important}@media print{.visible-print{display:block !important}table.visible-print{display:table !important}tr.visible-print{display:table-row !important}th.visible-print,td.visible-print{display:table-cell !important}}.visible-print-block{display:none !important}@media print{.visible-print-block{display:block !important}}.visible-print-inline{display:none !important}@media print{.visible-print-inline{display:inline !important}}.visible-print-inline-block{display:none !important}@media print{.visible-print-inline-block{display:inline-block !important}}@media print{.hidden-print{display:none !important}}.navbar{background-image:-webkit-linear-gradient(#484e55, #3a3f44 60%, #313539);background-image:-o-linear-gradient(#484e55, #3a3f44 60%, #313539);background-image:-webkit-gradient(linear, left top, left bottom, from(#484e55), color-stop(60%, #3a3f44), to(#313539));background-image:linear-gradient(#484e55, #3a3f44 60%, #313539);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff484e55', endColorstr='#ff313539', GradientType=0);-webkit-filter:none;filter:none;border:1px solid rgba(0,0,0,0.6);text-shadow:1px 1px 1px rgba(0,0,0,0.3)}.navbar .navbar-nav>li>a{border-right:1px solid rgba(0,0,0,0.2);border-left:1px solid rgba(255,255,255,0.1)}.navbar .navbar-nav>li>a:hover{background-image:-webkit-linear-gradient(#020202, #101112 40%, #141618);background-image:-o-linear-gradient(#020202, #101112 40%, #141618);background-image:-webkit-gradient(linear, left top, left bottom, from(#020202), color-stop(40%, #101112), to(#141618));background-image:linear-gradient(#020202, #101112 40%, #141618);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff020202', endColorstr='#ff141618', GradientType=0);-webkit-filter:none;filter:none;border-left-color:transparent}.navbar-inverse{background-image:-webkit-linear-gradient(#8a9196, #7a8288 60%, #70787d);background-image:-o-linear-gradient(#8a9196, #7a8288 60%, #70787d);background-image:-webkit-gradient(linear, left top, left bottom, from(#8a9196), color-stop(60%, #7a8288), to(#70787d));background-image:linear-gradient(#8a9196, #7a8288 60%, #70787d);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff8a9196', endColorstr='#ff70787d', GradientType=0);-webkit-filter:none;filter:none}.navbar-inverse .badge{background-color:#5d6368}.navbar-inverse .navbar-nav>li>a:hover{background-image:-webkit-linear-gradient(#404448, #4e5458 40%, #53595d);background-image:-o-linear-gradient(#404448, #4e5458 40%, #53595d);background-image:-webkit-gradient(linear, left top, left bottom, from(#404448), color-stop(40%, #4e5458), to(#53595d));background-image:linear-gradient(#404448, #4e5458 40%, #53595d);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff404448', endColorstr='#ff53595d', GradientType=0);-webkit-filter:none;filter:none}.navbar .nav .open>a{border-color:transparent}.navbar-nav>li.active>a{border-left-color:transparent}.navbar-form{margin-left:5px;margin-right:5px}.btn,.btn:hover{border-color:rgba(0,0,0,0.6);text-shadow:1px 1px 1px rgba(0,0,0,0.3)}.btn-default{background-image:-webkit-linear-gradient(#484e55, #3a3f44 60%, #313539);background-image:-o-linear-gradient(#484e55, #3a3f44 60%, #313539);background-image:-webkit-gradient(linear, left top, left bottom, from(#484e55), color-stop(60%, #3a3f44), to(#313539));background-image:linear-gradient(#484e55, #3a3f44 60%, #313539);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff484e55', endColorstr='#ff313539', GradientType=0);-webkit-filter:none;filter:none}.btn-default:hover{background-image:-webkit-linear-gradient(#020202, #101112 40%, #141618);background-image:-o-linear-gradient(#020202, #101112 40%, #141618);background-image:-webkit-gradient(linear, left top, left bottom, from(#020202), color-stop(40%, #101112), to(#141618));background-image:linear-gradient(#020202, #101112 40%, #141618);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff020202', endColorstr='#ff141618', GradientType=0);-webkit-filter:none;filter:none}.btn-primary{background-image:-webkit-linear-gradient(#8a9196, #7a8288 60%, #70787d);background-image:-o-linear-gradient(#8a9196, #7a8288 60%, #70787d);background-image:-webkit-gradient(linear, left top, left bottom, from(#8a9196), color-stop(60%, #7a8288), to(#70787d));background-image:linear-gradient(#8a9196, #7a8288 60%, #70787d);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff8a9196', endColorstr='#ff70787d', GradientType=0);-webkit-filter:none;filter:none}.btn-primary:hover{background-image:-webkit-linear-gradient(#404448, #4e5458 40%, #53595d);background-image:-o-linear-gradient(#404448, #4e5458 40%, #53595d);background-image:-webkit-gradient(linear, left top, left bottom, from(#404448), color-stop(40%, #4e5458), to(#53595d));background-image:linear-gradient(#404448, #4e5458 40%, #53595d);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff404448', endColorstr='#ff53595d', GradientType=0);-webkit-filter:none;filter:none}.btn-success{background-image:-webkit-linear-gradient(#78cc78, #62c462 60%, #53be53);background-image:-o-linear-gradient(#78cc78, #62c462 60%, #53be53);background-image:-webkit-gradient(linear, left top, left bottom, from(#78cc78), color-stop(60%, #62c462), to(#53be53));background-image:linear-gradient(#78cc78, #62c462 60%, #53be53);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff78cc78', endColorstr='#ff53be53', GradientType=0);-webkit-filter:none;filter:none}.btn-success:hover{background-image:-webkit-linear-gradient(#2f7d2f, #379337 40%, #3a9a3a);background-image:-o-linear-gradient(#2f7d2f, #379337 40%, #3a9a3a);background-image:-webkit-gradient(linear, left top, left bottom, from(#2f7d2f), color-stop(40%, #379337), to(#3a9a3a));background-image:linear-gradient(#2f7d2f, #379337 40%, #3a9a3a);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff2f7d2f', endColorstr='#ff3a9a3a', GradientType=0);-webkit-filter:none;filter:none}.btn-info{background-image:-webkit-linear-gradient(#74cae3, #5bc0de 60%, #4ab9db);background-image:-o-linear-gradient(#74cae3, #5bc0de 60%, #4ab9db);background-image:-webkit-gradient(linear, left top, left bottom, from(#74cae3), color-stop(60%, #5bc0de), to(#4ab9db));background-image:linear-gradient(#74cae3, #5bc0de 60%, #4ab9db);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff74cae3', endColorstr='#ff4ab9db', GradientType=0);-webkit-filter:none;filter:none}.btn-info:hover{background-image:-webkit-linear-gradient(#20829f, #2596b8 40%, #279dc1);background-image:-o-linear-gradient(#20829f, #2596b8 40%, #279dc1);background-image:-webkit-gradient(linear, left top, left bottom, from(#20829f), color-stop(40%, #2596b8), to(#279dc1));background-image:linear-gradient(#20829f, #2596b8 40%, #279dc1);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff20829f', endColorstr='#ff279dc1', GradientType=0);-webkit-filter:none;filter:none}.btn-warning{background-image:-webkit-linear-gradient(#faa123, #f89406 60%, #e48806);background-image:-o-linear-gradient(#faa123, #f89406 60%, #e48806);background-image:-webkit-gradient(linear, left top, left bottom, from(#faa123), color-stop(60%, #f89406), to(#e48806));background-image:linear-gradient(#faa123, #f89406 60%, #e48806);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#fffaa123', endColorstr='#ffe48806', GradientType=0);-webkit-filter:none;filter:none}.btn-warning:hover{background-image:-webkit-linear-gradient(#804d03, #9e5f04 40%, #a86404);background-image:-o-linear-gradient(#804d03, #9e5f04 40%, #a86404);background-image:-webkit-gradient(linear, left top, left bottom, from(#804d03), color-stop(40%, #9e5f04), to(#a86404));background-image:linear-gradient(#804d03, #9e5f04 40%, #a86404);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff804d03', endColorstr='#ffa86404', GradientType=0);-webkit-filter:none;filter:none}.btn-danger{background-image:-webkit-linear-gradient(#f17a77, #ee5f5b 60%, #ec4d49);background-image:-o-linear-gradient(#f17a77, #ee5f5b 60%, #ec4d49);background-image:-webkit-gradient(linear, left top, left bottom, from(#f17a77), color-stop(60%, #ee5f5b), to(#ec4d49));background-image:linear-gradient(#f17a77, #ee5f5b 60%, #ec4d49);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#fff17a77', endColorstr='#ffec4d49', GradientType=0);-webkit-filter:none;filter:none}.btn-danger:hover{background-image:-webkit-linear-gradient(#bb1813, #d71c16 40%, #e01d17);background-image:-o-linear-gradient(#bb1813, #d71c16 40%, #e01d17);background-image:-webkit-gradient(linear, left top, left bottom, from(#bb1813), color-stop(40%, #d71c16), to(#e01d17));background-image:linear-gradient(#bb1813, #d71c16 40%, #e01d17);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffbb1813', endColorstr='#ffe01d17', GradientType=0);-webkit-filter:none;filter:none}.btn-link,.btn-link:hover{border-color:transparent}h1,h2,h3,h4,h5,h6{text-shadow:-1px -1px 0 rgba(0,0,0,0.3)}.text-primary,.text-primary:hover{color:#7a8288}.text-success,.text-success:hover{color:#62c462}.text-danger,.text-danger:hover{color:#ee5f5b}.text-warning,.text-warning:hover{color:#f89406}.text-info,.text-info:hover{color:#5bc0de}.table .success,.table .warning,.table .danger,.table .info{color:#fff}.table-bordered tbody tr.success td,.table-bordered tbody tr.warning td,.table-bordered tbody tr.danger td,.table-bordered tbody tr.success:hover td,.table-bordered tbody tr.warning:hover td,.table-bordered tbody tr.danger:hover td{border-color:#1c1e22}.table-responsive>.table{background-color:#2e3338}input,textarea{color:#272b30}.has-warning .help-block,.has-warning .control-label,.has-warning .radio,.has-warning .checkbox,.has-warning .radio-inline,.has-warning .checkbox-inline,.has-warning.radio label,.has-warning.checkbox label,.has-warning.radio-inline label,.has-warning.checkbox-inline label,.has-warning .form-control-feedback{color:#f89406}.has-warning .form-control,.has-warning .form-control:focus{border-color:#f89406}.has-warning .input-group-addon{background-color:#3a3f44;border-color:rgba(0,0,0,0.6)}.has-error .help-block,.has-error .control-label,.has-error .radio,.has-error .checkbox,.has-error .radio-inline,.has-error .checkbox-inline,.has-error.radio label,.has-error.checkbox label,.has-error.radio-inline label,.has-error.checkbox-inline label,.has-error .form-control-feedback{color:#ee5f5b}.has-error .form-control,.has-error .form-control:focus{border-color:#ee5f5b}.has-error .input-group-addon{background-color:#3a3f44;border-color:rgba(0,0,0,0.6)}.has-success .help-block,.has-success .control-label,.has-success .radio,.has-success .checkbox,.has-success .radio-inline,.has-success .checkbox-inline,.has-success.radio label,.has-success.checkbox label,.has-success.radio-inline label,.has-success.checkbox-inline label,.has-success .form-control-feedback{color:#62c462}.has-success .form-control,.has-success .form-control:focus{border-color:#62c462}.has-success .input-group-addon{background-color:#3a3f44;border-color:rgba(0,0,0,0.6)}legend{color:#fff}.input-group-addon{background-color:#3a3f44;background-image:-webkit-linear-gradient(#484e55, #3a3f44 60%, #313539);background-image:-o-linear-gradient(#484e55, #3a3f44 60%, #313539);background-image:-webkit-gradient(linear, left top, left bottom, from(#484e55), color-stop(60%, #3a3f44), to(#313539));background-image:linear-gradient(#484e55, #3a3f44 60%, #313539);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff484e55', endColorstr='#ff313539', GradientType=0);-webkit-filter:none;filter:none;text-shadow:1px 1px 1px rgba(0,0,0,0.3);color:#ffffff}.nav .open>a,.nav .open>a:hover,.nav .open>a:focus{border-color:rgba(0,0,0,0.6)}.nav-pills>li>a{background-image:-webkit-linear-gradient(#484e55, #3a3f44 60%, #313539);background-image:-o-linear-gradient(#484e55, #3a3f44 60%, #313539);background-image:-webkit-gradient(linear, left top, left bottom, from(#484e55), color-stop(60%, #3a3f44), to(#313539));background-image:linear-gradient(#484e55, #3a3f44 60%, #313539);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff484e55', endColorstr='#ff313539', GradientType=0);-webkit-filter:none;filter:none;border:1px solid rgba(0,0,0,0.6);text-shadow:1px 1px 1px rgba(0,0,0,0.3)}.nav-pills>li>a:hover{background-image:-webkit-linear-gradient(#020202, #101112 40%, #141618);background-image:-o-linear-gradient(#020202, #101112 40%, #141618);background-image:-webkit-gradient(linear, left top, left bottom, from(#020202), color-stop(40%, #101112), to(#141618));background-image:linear-gradient(#020202, #101112 40%, #141618);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff020202', endColorstr='#ff141618', GradientType=0);-webkit-filter:none;filter:none;border:1px solid rgba(0,0,0,0.6)}.nav-pills>li.active>a,.nav-pills>li.active>a:hover{background-color:none;background-image:-webkit-linear-gradient(#020202, #101112 40%, #141618);background-image:-o-linear-gradient(#020202, #101112 40%, #141618);background-image:-webkit-gradient(linear, left top, left bottom, from(#020202), color-stop(40%, #101112), to(#141618));background-image:linear-gradient(#020202, #101112 40%, #141618);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff020202', endColorstr='#ff141618', GradientType=0);-webkit-filter:none;filter:none;border:1px solid rgba(0,0,0,0.6)}.nav-pills>li.disabled>a,.nav-pills>li.disabled>a:hover{background-image:-webkit-linear-gradient(#484e55, #3a3f44 60%, #313539);background-image:-o-linear-gradient(#484e55, #3a3f44 60%, #313539);background-image:-webkit-gradient(linear, left top, left bottom, from(#484e55), color-stop(60%, #3a3f44), to(#313539));background-image:linear-gradient(#484e55, #3a3f44 60%, #313539);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff484e55', endColorstr='#ff313539', GradientType=0);-webkit-filter:none;filter:none}.pagination>li>a,.pagination>li>span{text-shadow:1px 1px 1px rgba(0,0,0,0.3);background-image:-webkit-linear-gradient(#484e55, #3a3f44 60%, #313539);background-image:-o-linear-gradient(#484e55, #3a3f44 60%, #313539);background-image:-webkit-gradient(linear, left top, left bottom, from(#484e55), color-stop(60%, #3a3f44), to(#313539));background-image:linear-gradient(#484e55, #3a3f44 60%, #313539);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff484e55', endColorstr='#ff313539', GradientType=0);-webkit-filter:none;filter:none}.pagination>li>a:hover,.pagination>li>span:hover{background-image:-webkit-linear-gradient(#020202, #101112 40%, #141618);background-image:-o-linear-gradient(#020202, #101112 40%, #141618);background-image:-webkit-gradient(linear, left top, left bottom, from(#020202), color-stop(40%, #101112), to(#141618));background-image:linear-gradient(#020202, #101112 40%, #141618);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff020202', endColorstr='#ff141618', GradientType=0);-webkit-filter:none;filter:none}.pagination>li.active>a,.pagination>li.active>span{background-image:-webkit-linear-gradient(#020202, #101112 40%, #141618);background-image:-o-linear-gradient(#020202, #101112 40%, #141618);background-image:-webkit-gradient(linear, left top, left bottom, from(#020202), color-stop(40%, #101112), to(#141618));background-image:linear-gradient(#020202, #101112 40%, #141618);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff020202', endColorstr='#ff141618', GradientType=0);-webkit-filter:none;filter:none}.pagination>li.disabled>a,.pagination>li.disabled>a:hover,.pagination>li.disabled>span,.pagination>li.disabled>span:hover{background-color:transparent;background-image:-webkit-linear-gradient(#484e55, #3a3f44 60%, #313539);background-image:-o-linear-gradient(#484e55, #3a3f44 60%, #313539);background-image:-webkit-gradient(linear, left top, left bottom, from(#484e55), color-stop(60%, #3a3f44), to(#313539));background-image:linear-gradient(#484e55, #3a3f44 60%, #313539);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff484e55', endColorstr='#ff313539', GradientType=0);-webkit-filter:none;filter:none}.pager>li>a{background-image:-webkit-linear-gradient(#484e55, #3a3f44 60%, #313539);background-image:-o-linear-gradient(#484e55, #3a3f44 60%, #313539);background-image:-webkit-gradient(linear, left top, left bottom, from(#484e55), color-stop(60%, #3a3f44), to(#313539));background-image:linear-gradient(#484e55, #3a3f44 60%, #313539);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff484e55', endColorstr='#ff313539', GradientType=0);-webkit-filter:none;filter:none;text-shadow:1px 1px 1px rgba(0,0,0,0.3)}.pager>li>a:hover{background-image:-webkit-linear-gradient(#020202, #101112 40%, #141618);background-image:-o-linear-gradient(#020202, #101112 40%, #141618);background-image:-webkit-gradient(linear, left top, left bottom, from(#020202), color-stop(40%, #101112), to(#141618));background-image:linear-gradient(#020202, #101112 40%, #141618);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff020202', endColorstr='#ff141618', GradientType=0);-webkit-filter:none;filter:none}.pager>li.disabled>a,.pager>li.disabled>a:hover{background-color:transparent;background-image:-webkit-linear-gradient(#484e55, #3a3f44 60%, #313539);background-image:-o-linear-gradient(#484e55, #3a3f44 60%, #313539);background-image:-webkit-gradient(linear, left top, left bottom, from(#484e55), color-stop(60%, #3a3f44), to(#313539));background-image:linear-gradient(#484e55, #3a3f44 60%, #313539);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff484e55', endColorstr='#ff313539', GradientType=0);-webkit-filter:none;filter:none}.breadcrumb{border:1px solid rgba(0,0,0,0.6);text-shadow:1px 1px 1px rgba(0,0,0,0.3);background-image:-webkit-linear-gradient(#484e55, #3a3f44 60%, #313539);background-image:-o-linear-gradient(#484e55, #3a3f44 60%, #313539);background-image:-webkit-gradient(linear, left top, left bottom, from(#484e55), color-stop(60%, #3a3f44), to(#313539));background-image:linear-gradient(#484e55, #3a3f44 60%, #313539);background-repeat:no-repeat;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff484e55', endColorstr='#ff313539', GradientType=0);-webkit-filter:none;filter:none}.alert .alert-link,.alert a{color:#fff;text-decoration:underline}.alert .close{color:#000000;text-decoration:none}a.thumbnail:hover,a.thumbnail:focus,a.thumbnail.active{border-color:#0c0d0e}a.list-group-item.active,a.list-group-item.active:hover,a.list-group-item.active:focus{border-color:rgba(0,0,0,0.6)}a.list-group-item-success.active{background-color:#62c462}a.list-group-item-success.active:hover,a.list-group-item-success.active:focus{background-color:#4fbd4f}a.list-group-item-warning.active{background-color:#f89406}a.list-group-item-warning.active:hover,a.list-group-item-warning.active:focus{background-color:#df8505}a.list-group-item-danger.active{background-color:#ee5f5b}a.list-group-item-danger.active:hover,a.list-group-item-danger.active:focus{background-color:#ec4844}.jumbotron{border:1px solid rgba(0,0,0,0.6)}.panel-primary .panel-heading,.panel-success .panel-heading,.panel-danger .panel-heading,.panel-warning .panel-heading,.panel-info .panel-heading{border-color:#000}"; });
//# sourceMappingURL=app-bundle.js.map