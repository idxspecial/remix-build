import {
  __commonJS,
  __toModule,
  init_react,
  require_main2 as require_main
} from "/build/_shared/chunk-GHK3HHDO.js";

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    init_react();
    "use strict";
    exports.parse = parse;
    exports.serialize = serialize;
    var decode = decodeURIComponent;
    var encode = encodeURIComponent;
    var pairSplitRegExp = /; */;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var pairs = str.split(pairSplitRegExp);
      var dec = opt.decode || decode;
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var eq_idx = pair.indexOf("=");
        if (eq_idx < 0) {
          continue;
        }
        var key = pair.substr(0, eq_idx).trim();
        var val = pair.substr(++eq_idx, pair.length).trim();
        if (val[0] == '"') {
          val = val.slice(1, -1);
        }
        if (obj[key] == void 0) {
          obj[key] = tryDecode(val, dec);
        }
      }
      return obj;
    }
    function serialize(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (opt.maxAge != null) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString !== "function") {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + opt.expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/@remix-run/server-runtime/cookies.js
var require_cookies = __commonJS({
  "node_modules/@remix-run/server-runtime/cookies.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var cookie = require_cookie();
    function createCookie2(name, {
      secrets = [],
      ...options
    } = {}) {
      return {
        get name() {
          return name;
        },
        get isSigned() {
          return secrets.length > 0;
        },
        get expires() {
          return typeof options.maxAge !== "undefined" ? new Date(Date.now() + options.maxAge * 1e3) : options.expires;
        },
        async parse(cookieHeader, parseOptions) {
          if (!cookieHeader)
            return null;
          let cookies = cookie.parse(cookieHeader, {
            ...options,
            ...parseOptions
          });
          return name in cookies ? cookies[name] === "" ? "" : await decodeCookieValue(cookies[name], secrets) : null;
        },
        async serialize(value, serializeOptions) {
          return cookie.serialize(name, value === "" ? "" : await encodeCookieValue(value, secrets), {
            ...options,
            ...serializeOptions
          });
        }
      };
    }
    function isCookie2(object) {
      return object != null && typeof object.name === "string" && typeof object.isSigned === "boolean" && typeof object.parse === "function" && typeof object.serialize === "function";
    }
    async function encodeCookieValue(value, secrets) {
      let encoded = encodeData(value);
      if (secrets.length > 0) {
        encoded = await sign(encoded, secrets[0]);
      }
      return encoded;
    }
    async function decodeCookieValue(value, secrets) {
      if (secrets.length > 0) {
        for (let secret of secrets) {
          let unsignedValue = await unsign(value, secret);
          if (unsignedValue !== false) {
            return decodeData(unsignedValue);
          }
        }
        return null;
      }
      return decodeData(value);
    }
    function encodeData(value) {
      return btoa(JSON.stringify(value));
    }
    function decodeData(value) {
      try {
        return JSON.parse(atob(value));
      } catch (error) {
        return {};
      }
    }
    exports.createCookie = createCookie2;
    exports.isCookie = isCookie2;
  }
});

// node_modules/@remix-run/server-runtime/responses.js
var require_responses = __commonJS({
  "node_modules/@remix-run/server-runtime/responses.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function json2(data, init = {}) {
      let responseInit = init;
      if (typeof init === "number") {
        responseInit = {
          status: init
        };
      }
      let headers = new Headers(responseInit.headers);
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json; charset=utf-8");
      }
      return new Response(JSON.stringify(data), {
        ...responseInit,
        headers
      });
    }
    function redirect2(url, init = 302) {
      let responseInit = init;
      if (typeof responseInit === "number") {
        responseInit = {
          status: responseInit
        };
      } else if (typeof responseInit.status === "undefined") {
        responseInit.status = 302;
      }
      let headers = new Headers(responseInit.headers);
      headers.set("Location", url);
      return new Response(null, {
        ...responseInit,
        headers
      });
    }
    function isResponse(value) {
      return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
    }
    var redirectStatusCodes = new Set([301, 302, 303, 307, 308]);
    function isRedirectResponse(response) {
      return redirectStatusCodes.has(response.status);
    }
    function isCatchResponse(response) {
      return response.headers.get("X-Remix-Catch") != null;
    }
    exports.isCatchResponse = isCatchResponse;
    exports.isRedirectResponse = isRedirectResponse;
    exports.isResponse = isResponse;
    exports.json = json2;
    exports.redirect = redirect2;
  }
});

// node_modules/@remix-run/server-runtime/data.js
var require_data = __commonJS({
  "node_modules/@remix-run/server-runtime/data.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var responses = require_responses();
    async function callRouteAction({
      loadContext,
      match,
      request
    }) {
      let action = match.route.module.action;
      if (!action) {
        throw new Error(`You made a ${request.method} request to ${request.url} but did not provide an \`action\` for route "${match.route.id}", so there is no way to handle the request.`);
      }
      let result;
      try {
        result = await action({
          request: stripDataParam(stripIndexParam(request.clone())),
          context: loadContext,
          params: match.params
        });
      } catch (error) {
        if (!responses.isResponse(error)) {
          throw error;
        }
        if (!responses.isRedirectResponse(error)) {
          error.headers.set("X-Remix-Catch", "yes");
        }
        result = error;
      }
      if (result === void 0) {
        throw new Error(`You defined an action for route "${match.route.id}" but didn't return anything from your \`action\` function. Please return a value or \`null\`.`);
      }
      return responses.isResponse(result) ? result : responses.json(result);
    }
    async function callRouteLoader({
      loadContext,
      match,
      request
    }) {
      let loader = match.route.module.loader;
      if (!loader) {
        throw new Error(`You made a ${request.method} request to ${request.url} but did not provide a \`loader\` for route "${match.route.id}", so there is no way to handle the request.`);
      }
      let result;
      try {
        result = await loader({
          request: stripDataParam(stripIndexParam(request.clone())),
          context: loadContext,
          params: match.params
        });
      } catch (error) {
        if (!responses.isResponse(error)) {
          throw error;
        }
        if (!responses.isRedirectResponse(error)) {
          error.headers.set("X-Remix-Catch", "yes");
        }
        result = error;
      }
      if (result === void 0) {
        throw new Error(`You defined an action for route "${match.route.id}" but didn't return anything from your \`action\` function. Please return a value or \`null\`.`);
      }
      return responses.isResponse(result) ? result : responses.json(result);
    }
    function stripIndexParam(request) {
      let url = new URL(request.url);
      let indexValues = url.searchParams.getAll("index");
      url.searchParams.delete("index");
      let indexValuesToKeep = [];
      for (let indexValue of indexValues) {
        if (indexValue) {
          indexValuesToKeep.push(indexValue);
        }
      }
      for (let toKeep of indexValuesToKeep) {
        url.searchParams.append("index", toKeep);
      }
      return new Request(url.href, request);
    }
    function stripDataParam(request) {
      let url = new URL(request.url);
      url.searchParams.delete("_data");
      return new Request(url.href, request);
    }
    function extractData(response) {
      let contentType = response.headers.get("Content-Type");
      if (contentType && /\bapplication\/json\b/.test(contentType)) {
        return response.json();
      }
      return response.text();
    }
    exports.callRouteAction = callRouteAction;
    exports.callRouteLoader = callRouteLoader;
    exports.extractData = extractData;
  }
});

// node_modules/@remix-run/server-runtime/entry.js
var require_entry = __commonJS({
  "node_modules/@remix-run/server-runtime/entry.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createEntryMatches(matches, routes) {
      return matches.map((match) => ({
        params: match.params,
        pathname: match.pathname,
        route: routes[match.route.id]
      }));
    }
    function createEntryRouteModules(manifest) {
      return Object.keys(manifest).reduce((memo, routeId) => {
        memo[routeId] = manifest[routeId].module;
        return memo;
      }, {});
    }
    exports.createEntryMatches = createEntryMatches;
    exports.createEntryRouteModules = createEntryRouteModules;
  }
});

// node_modules/@remix-run/server-runtime/errors.js
var require_errors = __commonJS({
  "node_modules/@remix-run/server-runtime/errors.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    async function serializeError(error) {
      return {
        message: error.message,
        stack: error.stack
      };
    }
    exports.serializeError = serializeError;
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    init_react();
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString(setCookieValue, options) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValue = parts.shift().split("=");
      var name = nameValue.shift();
      var value = nameValue.join("=");
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      try {
        value = options.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e);
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key === "expires") {
          cookie.expires = new Date(value2);
        } else if (key === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key === "secure") {
          cookie.secure = true;
        } else if (key === "httponly") {
          cookie.httpOnly = true;
        } else if (key === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key] = value2;
        }
      });
      return cookie;
    }
    function parse(input, options) {
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      if (!input) {
        if (!options.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers && input.headers["set-cookie"]) {
        input = input.headers["set-cookie"];
      } else if (input.headers) {
        var sch = input.headers[Object.keys(input.headers).find(function(key) {
          return key.toLowerCase() === "set-cookie";
        })];
        if (!sch && input.headers.cookie && !options.silent) {
          console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
        }
        input = sch;
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      if (!options.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString(str, options);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString(str, options);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse;
    module.exports.parse = parse;
    module.exports.parseString = parseString;
    module.exports.splitCookiesString = splitCookiesString;
  }
});

// node_modules/@remix-run/server-runtime/headers.js
var require_headers = __commonJS({
  "node_modules/@remix-run/server-runtime/headers.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var setCookieParser = require_set_cookie();
    function getDocumentHeaders(build, matches, routeLoaderResponses, actionResponse) {
      return matches.reduce((parentHeaders, match, index) => {
        let routeModule = build.routes[match.route.id].module;
        let loaderHeaders = routeLoaderResponses[index] ? routeLoaderResponses[index].headers : new Headers();
        let actionHeaders = actionResponse ? actionResponse.headers : new Headers();
        let headers = new Headers(routeModule.headers ? typeof routeModule.headers === "function" ? routeModule.headers({
          loaderHeaders,
          parentHeaders,
          actionHeaders
        }) : routeModule.headers : void 0);
        prependCookies(actionHeaders, headers);
        prependCookies(loaderHeaders, headers);
        prependCookies(parentHeaders, headers);
        return headers;
      }, new Headers());
    }
    function prependCookies(parentHeaders, childHeaders) {
      let parentSetCookieString = parentHeaders.get("Set-Cookie");
      if (parentSetCookieString) {
        let cookies = setCookieParser.splitCookiesString(parentSetCookieString);
        cookies.forEach((cookie) => {
          childHeaders.append("Set-Cookie", cookie);
        });
      }
    }
    exports.getDocumentHeaders = getDocumentHeaders;
  }
});

// node_modules/@remix-run/server-runtime/routeMatching.js
var require_routeMatching = __commonJS({
  "node_modules/@remix-run/server-runtime/routeMatching.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var reactRouterDom = require_main();
    function matchServerRoutes(routes, pathname) {
      let matches = reactRouterDom.matchRoutes(routes, pathname);
      if (!matches)
        return null;
      return matches.map((match) => ({
        params: match.params,
        pathname: match.pathname,
        route: match.route
      }));
    }
    exports.matchServerRoutes = matchServerRoutes;
  }
});

// node_modules/@remix-run/server-runtime/mode.js
var require_mode = __commonJS({
  "node_modules/@remix-run/server-runtime/mode.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ServerMode = void 0;
    (function(ServerMode) {
      ServerMode["Development"] = "development";
      ServerMode["Production"] = "production";
      ServerMode["Test"] = "test";
    })(exports.ServerMode || (exports.ServerMode = {}));
    function isServerMode(value) {
      return value === exports.ServerMode.Development || value === exports.ServerMode.Production || value === exports.ServerMode.Test;
    }
    exports.isServerMode = isServerMode;
  }
});

// node_modules/@remix-run/server-runtime/routes.js
var require_routes = __commonJS({
  "node_modules/@remix-run/server-runtime/routes.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createRoutes(manifest, parentId) {
      return Object.keys(manifest).filter((key) => manifest[key].parentId === parentId).map((id) => ({
        ...manifest[id],
        children: createRoutes(manifest, id)
      }));
    }
    exports.createRoutes = createRoutes;
  }
});

// node_modules/jsesc/jsesc.js
var require_jsesc = __commonJS({
  "node_modules/jsesc/jsesc.js"(exports, module) {
    init_react();
    "use strict";
    var object = {};
    var hasOwnProperty = object.hasOwnProperty;
    var forOwn = (object2, callback) => {
      for (const key in object2) {
        if (hasOwnProperty.call(object2, key)) {
          callback(key, object2[key]);
        }
      }
    };
    var extend = (destination, source) => {
      if (!source) {
        return destination;
      }
      forOwn(source, (key, value) => {
        destination[key] = value;
      });
      return destination;
    };
    var forEach = (array, callback) => {
      const length = array.length;
      let index = -1;
      while (++index < length) {
        callback(array[index]);
      }
    };
    var fourHexEscape = (hex) => {
      return "\\u" + ("0000" + hex).slice(-4);
    };
    var hexadecimal = (code, lowercase) => {
      let hexadecimal2 = code.toString(16);
      if (lowercase)
        return hexadecimal2;
      return hexadecimal2.toUpperCase();
    };
    var toString = object.toString;
    var isArray = Array.isArray;
    var isBuffer = (value) => {
      return typeof Buffer === "function" && Buffer.isBuffer(value);
    };
    var isObject = (value) => {
      return toString.call(value) == "[object Object]";
    };
    var isString = (value) => {
      return typeof value == "string" || toString.call(value) == "[object String]";
    };
    var isNumber = (value) => {
      return typeof value == "number" || toString.call(value) == "[object Number]";
    };
    var isFunction = (value) => {
      return typeof value == "function";
    };
    var isMap = (value) => {
      return toString.call(value) == "[object Map]";
    };
    var isSet = (value) => {
      return toString.call(value) == "[object Set]";
    };
    var singleEscapes = {
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t"
    };
    var regexSingleEscape = /[\\\b\f\n\r\t]/;
    var regexDigit = /[0-9]/;
    var regexWhitespace = /[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
    var escapeEverythingRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^]/g;
    var escapeNonAsciiRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^ !#-&\(-\[\]-_a-~]/g;
    var jsesc = (argument, options) => {
      const increaseIndentation = () => {
        oldIndent = indent;
        ++options.indentLevel;
        indent = options.indent.repeat(options.indentLevel);
      };
      const defaults = {
        "escapeEverything": false,
        "minimal": false,
        "isScriptContext": false,
        "quotes": "single",
        "wrap": false,
        "es6": false,
        "json": false,
        "compact": true,
        "lowercaseHex": false,
        "numbers": "decimal",
        "indent": "	",
        "indentLevel": 0,
        "__inline1__": false,
        "__inline2__": false
      };
      const json2 = options && options.json;
      if (json2) {
        defaults.quotes = "double";
        defaults.wrap = true;
      }
      options = extend(defaults, options);
      if (options.quotes != "single" && options.quotes != "double" && options.quotes != "backtick") {
        options.quotes = "single";
      }
      const quote = options.quotes == "double" ? '"' : options.quotes == "backtick" ? "`" : "'";
      const compact = options.compact;
      const lowercaseHex = options.lowercaseHex;
      let indent = options.indent.repeat(options.indentLevel);
      let oldIndent = "";
      const inline1 = options.__inline1__;
      const inline2 = options.__inline2__;
      const newLine = compact ? "" : "\n";
      let result;
      let isEmpty = true;
      const useBinNumbers = options.numbers == "binary";
      const useOctNumbers = options.numbers == "octal";
      const useDecNumbers = options.numbers == "decimal";
      const useHexNumbers = options.numbers == "hexadecimal";
      if (json2 && argument && isFunction(argument.toJSON)) {
        argument = argument.toJSON();
      }
      if (!isString(argument)) {
        if (isMap(argument)) {
          if (argument.size == 0) {
            return "new Map()";
          }
          if (!compact) {
            options.__inline1__ = true;
            options.__inline2__ = false;
          }
          return "new Map(" + jsesc(Array.from(argument), options) + ")";
        }
        if (isSet(argument)) {
          if (argument.size == 0) {
            return "new Set()";
          }
          return "new Set(" + jsesc(Array.from(argument), options) + ")";
        }
        if (isBuffer(argument)) {
          if (argument.length == 0) {
            return "Buffer.from([])";
          }
          return "Buffer.from(" + jsesc(Array.from(argument), options) + ")";
        }
        if (isArray(argument)) {
          result = [];
          options.wrap = true;
          if (inline1) {
            options.__inline1__ = false;
            options.__inline2__ = true;
          }
          if (!inline2) {
            increaseIndentation();
          }
          forEach(argument, (value) => {
            isEmpty = false;
            if (inline2) {
              options.__inline2__ = false;
            }
            result.push((compact || inline2 ? "" : indent) + jsesc(value, options));
          });
          if (isEmpty) {
            return "[]";
          }
          if (inline2) {
            return "[" + result.join(", ") + "]";
          }
          return "[" + newLine + result.join("," + newLine) + newLine + (compact ? "" : oldIndent) + "]";
        } else if (isNumber(argument)) {
          if (json2) {
            return JSON.stringify(argument);
          }
          if (useDecNumbers) {
            return String(argument);
          }
          if (useHexNumbers) {
            let hexadecimal2 = argument.toString(16);
            if (!lowercaseHex) {
              hexadecimal2 = hexadecimal2.toUpperCase();
            }
            return "0x" + hexadecimal2;
          }
          if (useBinNumbers) {
            return "0b" + argument.toString(2);
          }
          if (useOctNumbers) {
            return "0o" + argument.toString(8);
          }
        } else if (!isObject(argument)) {
          if (json2) {
            return JSON.stringify(argument) || "null";
          }
          return String(argument);
        } else {
          result = [];
          options.wrap = true;
          increaseIndentation();
          forOwn(argument, (key, value) => {
            isEmpty = false;
            result.push((compact ? "" : indent) + jsesc(key, options) + ":" + (compact ? "" : " ") + jsesc(value, options));
          });
          if (isEmpty) {
            return "{}";
          }
          return "{" + newLine + result.join("," + newLine) + newLine + (compact ? "" : oldIndent) + "}";
        }
      }
      const regex = options.escapeEverything ? escapeEverythingRegex : escapeNonAsciiRegex;
      result = argument.replace(regex, (char, pair, lone, quoteChar, index, string) => {
        if (pair) {
          if (options.minimal)
            return pair;
          const first = pair.charCodeAt(0);
          const second = pair.charCodeAt(1);
          if (options.es6) {
            const codePoint = (first - 55296) * 1024 + second - 56320 + 65536;
            const hex2 = hexadecimal(codePoint, lowercaseHex);
            return "\\u{" + hex2 + "}";
          }
          return fourHexEscape(hexadecimal(first, lowercaseHex)) + fourHexEscape(hexadecimal(second, lowercaseHex));
        }
        if (lone) {
          return fourHexEscape(hexadecimal(lone.charCodeAt(0), lowercaseHex));
        }
        if (char == "\0" && !json2 && !regexDigit.test(string.charAt(index + 1))) {
          return "\\0";
        }
        if (quoteChar) {
          if (quoteChar == quote || options.escapeEverything) {
            return "\\" + quoteChar;
          }
          return quoteChar;
        }
        if (regexSingleEscape.test(char)) {
          return singleEscapes[char];
        }
        if (options.minimal && !regexWhitespace.test(char)) {
          return char;
        }
        const hex = hexadecimal(char.charCodeAt(0), lowercaseHex);
        if (json2 || hex.length > 2) {
          return fourHexEscape(hex);
        }
        return "\\x" + ("00" + hex).slice(-2);
      });
      if (quote == "`") {
        result = result.replace(/\$\{/g, "\\${");
      }
      if (options.isScriptContext) {
        result = result.replace(/<\/(script|style)/gi, "<\\/$1").replace(/<!--/g, json2 ? "\\u003C!--" : "\\x3C!--");
      }
      if (options.wrap) {
        result = quote + result + quote;
      }
      return result;
    };
    jsesc.version = "3.0.2";
    module.exports = jsesc;
  }
});

// node_modules/@remix-run/server-runtime/serverHandoff.js
var require_serverHandoff = __commonJS({
  "node_modules/@remix-run/server-runtime/serverHandoff.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var jsesc = require_jsesc();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { "default": e };
    }
    var jsesc__default = /* @__PURE__ */ _interopDefaultLegacy(jsesc);
    function createServerHandoffString(serverHandoff) {
      return jsesc__default["default"](serverHandoff, {
        isScriptContext: true
      });
    }
    exports.createServerHandoffString = createServerHandoffString;
  }
});

// node_modules/@remix-run/server-runtime/server.js
var require_server = __commonJS({
  "node_modules/@remix-run/server-runtime/server.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var data = require_data();
    var entry = require_entry();
    var errors = require_errors();
    var headers = require_headers();
    var routeMatching = require_routeMatching();
    var mode = require_mode();
    var routes = require_routes();
    var responses = require_responses();
    var serverHandoff = require_serverHandoff();
    function createRequestHandler(build, platform, mode$1) {
      let routes$1 = routes.createRoutes(build.routes);
      let serverMode = mode.isServerMode(mode$1) ? mode$1 : mode.ServerMode.Production;
      return async function requestHandler(request, loadContext) {
        let url = new URL(request.url);
        let matches = routeMatching.matchServerRoutes(routes$1, url.pathname);
        let requestType = getRequestType(url, matches);
        let response;
        switch (requestType) {
          case "data":
            response = await handleDataRequest({
              request,
              loadContext,
              matches,
              handleDataRequest: build.entry.module.handleDataRequest,
              serverMode
            });
            break;
          case "document":
            response = await renderDocumentRequest({
              build,
              loadContext,
              matches,
              request,
              routes: routes$1,
              serverMode
            });
            break;
          case "resource":
            response = await handleResourceRequest({
              request,
              loadContext,
              matches,
              serverMode
            });
            break;
        }
        if (request.method.toLowerCase() === "head") {
          return new Response(null, {
            headers: response.headers,
            status: response.status,
            statusText: response.statusText
          });
        }
        return response;
      };
    }
    async function handleDataRequest({
      handleDataRequest: handleDataRequest2,
      loadContext,
      matches,
      request,
      serverMode
    }) {
      if (!isValidRequestMethod(request)) {
        return errorBoundaryError(new Error(`Invalid request method "${request.method}"`), 405);
      }
      let url = new URL(request.url);
      if (!matches) {
        return errorBoundaryError(new Error(`No route matches URL "${url.pathname}"`), 404);
      }
      let response;
      let match;
      try {
        if (isActionRequest(request)) {
          match = getActionRequestMatch(url, matches);
          response = await data.callRouteAction({
            loadContext,
            match,
            request
          });
        } else {
          let routeId = url.searchParams.get("_data");
          if (!routeId) {
            return errorBoundaryError(new Error(`Missing route id in ?_data`), 403);
          }
          let tempMatch = matches.find((match2) => match2.route.id === routeId);
          if (!tempMatch) {
            return errorBoundaryError(new Error(`Route "${routeId}" does not match URL "${url.pathname}"`), 403);
          }
          match = tempMatch;
          response = await data.callRouteLoader({
            loadContext,
            match,
            request
          });
        }
        if (responses.isRedirectResponse(response)) {
          let headers2 = new Headers(response.headers);
          headers2.set("X-Remix-Redirect", headers2.get("Location"));
          headers2.delete("Location");
          return new Response(null, {
            status: 204,
            headers: headers2
          });
        }
        if (handleDataRequest2) {
          response = await handleDataRequest2(response.clone(), {
            context: loadContext,
            params: match.params,
            request: request.clone()
          });
        }
        return response;
      } catch (error) {
        if (serverMode !== mode.ServerMode.Test) {
          console.error(error);
        }
        if (serverMode === mode.ServerMode.Development) {
          return errorBoundaryError(error, 500);
        }
        return errorBoundaryError(new Error("Unexpected Server Error"), 500);
      }
    }
    async function renderDocumentRequest({
      build,
      loadContext,
      matches,
      request,
      routes: routes2,
      serverMode
    }) {
      let url = new URL(request.url);
      let appState = {
        trackBoundaries: true,
        trackCatchBoundaries: true,
        catchBoundaryRouteId: null,
        renderBoundaryRouteId: null,
        loaderBoundaryRouteId: null,
        error: void 0,
        catch: void 0
      };
      if (!isValidRequestMethod(request)) {
        matches = null;
        appState.trackCatchBoundaries = false;
        appState.catch = {
          data: null,
          status: 405,
          statusText: "Method Not Allowed"
        };
      } else if (!matches) {
        appState.trackCatchBoundaries = false;
        appState.catch = {
          data: null,
          status: 404,
          statusText: "Not Found"
        };
      }
      let actionStatus;
      let actionData;
      let actionMatch;
      let actionResponse;
      if (matches && isActionRequest(request)) {
        actionMatch = getActionRequestMatch(url, matches);
        try {
          actionResponse = await data.callRouteAction({
            loadContext,
            match: actionMatch,
            request
          });
          if (responses.isRedirectResponse(actionResponse)) {
            return actionResponse;
          }
          actionStatus = {
            status: actionResponse.status,
            statusText: actionResponse.statusText
          };
          if (responses.isCatchResponse(actionResponse)) {
            appState.catchBoundaryRouteId = getDeepestRouteIdWithBoundary(matches, "CatchBoundary");
            appState.trackCatchBoundaries = false;
            appState.catch = {
              ...actionStatus,
              data: await data.extractData(actionResponse)
            };
          } else {
            actionData = {
              [actionMatch.route.id]: await data.extractData(actionResponse)
            };
          }
        } catch (error) {
          appState.loaderBoundaryRouteId = getDeepestRouteIdWithBoundary(matches, "ErrorBoundary");
          appState.trackBoundaries = false;
          appState.error = await errors.serializeError(error);
          if (serverMode !== mode.ServerMode.Test) {
            console.error(`There was an error running the action for route ${actionMatch.route.id}`);
          }
        }
      }
      let routeModules = entry.createEntryRouteModules(build.routes);
      let matchesToLoad = matches || [];
      if (appState.catch) {
        matchesToLoad = getMatchesUpToDeepestBoundary(matchesToLoad.slice(0, -1), "CatchBoundary");
      } else if (appState.error) {
        matchesToLoad = getMatchesUpToDeepestBoundary(matchesToLoad.slice(0, -1), "ErrorBoundary");
      }
      let routeLoaderResults = await Promise.allSettled(matchesToLoad.map((match) => match.route.module.loader ? data.callRouteLoader({
        loadContext,
        match,
        request
      }) : Promise.resolve(void 0)));
      let actionCatch = appState.catch;
      let actionError = appState.error;
      let actionCatchBoundaryRouteId = appState.catchBoundaryRouteId;
      let actionLoaderBoundaryRouteId = appState.loaderBoundaryRouteId;
      appState.catch = void 0;
      appState.error = void 0;
      let routeLoaderResponses = [];
      let loaderStatusCodes = [];
      let routeData = {};
      for (let index = 0; index < matchesToLoad.length; index++) {
        let match = matchesToLoad[index];
        let result = routeLoaderResults[index];
        let error = result.status === "rejected" ? result.reason : void 0;
        let response = result.status === "fulfilled" ? result.value : void 0;
        let isRedirect = response ? responses.isRedirectResponse(response) : false;
        let isCatch = response ? responses.isCatchResponse(response) : false;
        if (appState.catch || appState.error) {
          break;
        }
        if (!actionCatch && !actionError && response && isRedirect) {
          return response;
        }
        if (match.route.module.CatchBoundary) {
          appState.catchBoundaryRouteId = match.route.id;
        }
        if (match.route.module.ErrorBoundary) {
          appState.loaderBoundaryRouteId = match.route.id;
        }
        if (error) {
          loaderStatusCodes.push(500);
          appState.trackBoundaries = false;
          appState.error = await errors.serializeError(error);
          if (serverMode !== mode.ServerMode.Test) {
            console.error(`There was an error running the data loader for route ${match.route.id}`);
          }
          break;
        } else if (response) {
          routeLoaderResponses.push(response);
          loaderStatusCodes.push(response.status);
          if (isCatch) {
            appState.trackCatchBoundaries = false;
            appState.catch = {
              data: await data.extractData(response),
              status: response.status,
              statusText: response.statusText
            };
            break;
          } else {
            routeData[match.route.id] = await data.extractData(response);
          }
        }
      }
      if (!appState.catch) {
        appState.catchBoundaryRouteId = actionCatchBoundaryRouteId;
      }
      if (!appState.error) {
        appState.loaderBoundaryRouteId = actionLoaderBoundaryRouteId;
      }
      appState.catch = actionCatch || appState.catch;
      appState.error = actionError || appState.error;
      let renderableMatches = getRenderableMatches(matches, appState);
      if (!renderableMatches) {
        renderableMatches = [];
        let root = routes2[0];
        if (root !== null && root !== void 0 && root.module.CatchBoundary) {
          appState.catchBoundaryRouteId = "root";
          renderableMatches.push({
            params: {},
            pathname: "",
            route: routes2[0]
          });
        }
      }
      let notOkResponse = actionStatus && actionStatus.status !== 200 ? actionStatus.status : loaderStatusCodes.find((status) => status !== 200);
      let responseStatusCode = appState.error ? 500 : typeof notOkResponse === "number" ? notOkResponse : appState.catch ? appState.catch.status : 200;
      let responseHeaders = headers.getDocumentHeaders(build, renderableMatches, routeLoaderResponses, actionResponse);
      let entryMatches = entry.createEntryMatches(renderableMatches, build.assets.routes);
      let serverHandoff$1 = {
        actionData,
        appState,
        matches: entryMatches,
        routeData
      };
      let entryContext = {
        ...serverHandoff$1,
        manifest: build.assets,
        routeModules,
        serverHandoffString: serverHandoff.createServerHandoffString(serverHandoff$1)
      };
      let handleDocumentRequest = build.entry.module.default;
      try {
        return await handleDocumentRequest(request.clone(), responseStatusCode, responseHeaders, entryContext);
      } catch (error) {
        responseStatusCode = 500;
        appState.trackBoundaries = false;
        appState.error = await errors.serializeError(error);
        entryContext.serverHandoffString = serverHandoff.createServerHandoffString(serverHandoff$1);
        try {
          return await handleDocumentRequest(request.clone(), responseStatusCode, responseHeaders, entryContext);
        } catch (error2) {
          if (serverMode !== mode.ServerMode.Test) {
            console.error(error2);
          }
          let message = "Unexpected Server Error";
          if (serverMode === mode.ServerMode.Development) {
            message += `

${String(error2)}`;
          }
          return new Response(message, {
            status: 500,
            headers: {
              "Content-Type": "text/plain"
            }
          });
        }
      }
    }
    async function handleResourceRequest({
      loadContext,
      matches,
      request,
      serverMode
    }) {
      let match = matches.slice(-1)[0];
      try {
        if (isActionRequest(request)) {
          return await data.callRouteAction({
            match,
            loadContext,
            request
          });
        } else {
          return await data.callRouteLoader({
            match,
            loadContext,
            request
          });
        }
      } catch (error) {
        if (serverMode !== mode.ServerMode.Test) {
          console.error(error);
        }
        let message = "Unexpected Server Error";
        if (serverMode === mode.ServerMode.Development) {
          message += `

${String(error)}`;
        }
        return new Response(message, {
          status: 500,
          headers: {
            "Content-Type": "text/plain"
          }
        });
      }
    }
    function getRequestType(url, matches) {
      if (url.searchParams.has("_data")) {
        return "data";
      }
      if (!matches) {
        return "document";
      }
      let match = matches.slice(-1)[0];
      if (!match.route.module.default) {
        return "resource";
      }
      return "document";
    }
    function isActionRequest(request) {
      let method = request.method.toLowerCase();
      return method === "post" || method === "put" || method === "patch" || method === "delete";
    }
    function isHeadRequest(request) {
      return request.method.toLowerCase() === "head";
    }
    function isValidRequestMethod(request) {
      return request.method.toLowerCase() === "get" || isHeadRequest(request) || isActionRequest(request);
    }
    async function errorBoundaryError(error, status) {
      return responses.json(await errors.serializeError(error), {
        status,
        headers: {
          "X-Remix-Error": "yes"
        }
      });
    }
    function isIndexRequestUrl(url) {
      let indexRequest = false;
      for (let param of url.searchParams.getAll("index")) {
        if (!param) {
          indexRequest = true;
        }
      }
      return indexRequest;
    }
    function getActionRequestMatch(url, matches) {
      let match = matches.slice(-1)[0];
      if (!isIndexRequestUrl(url) && match.route.id.endsWith("/index")) {
        return matches.slice(-2)[0];
      }
      return match;
    }
    function getDeepestRouteIdWithBoundary(matches, key) {
      let matched = getMatchesUpToDeepestBoundary(matches, key).slice(-1)[0];
      return matched ? matched.route.id : null;
    }
    function getMatchesUpToDeepestBoundary(matches, key) {
      let deepestBoundaryIndex = -1;
      matches.forEach((match, index) => {
        if (match.route.module[key]) {
          deepestBoundaryIndex = index;
        }
      });
      if (deepestBoundaryIndex === -1) {
        return [];
      }
      return matches.slice(0, deepestBoundaryIndex + 1);
    }
    function getRenderableMatches(matches, appState) {
      if (!matches) {
        return null;
      }
      if (!appState.catch && !appState.error) {
        return matches;
      }
      let lastRenderableIndex = -1;
      matches.forEach((match, index) => {
        let id = match.route.id;
        if (appState.renderBoundaryRouteId === id || appState.loaderBoundaryRouteId === id || appState.catchBoundaryRouteId === id) {
          lastRenderableIndex = index;
        }
      });
      return matches.slice(0, lastRenderableIndex + 1);
    }
    exports.createRequestHandler = createRequestHandler;
  }
});

// node_modules/@remix-run/server-runtime/warnings.js
var require_warnings = __commonJS({
  "node_modules/@remix-run/server-runtime/warnings.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var alreadyWarned = {};
    function warnOnce(condition, message) {
      if (!condition && !alreadyWarned[message]) {
        alreadyWarned[message] = true;
        console.warn(message);
      }
    }
    exports.warnOnce = warnOnce;
  }
});

// node_modules/@remix-run/server-runtime/sessions.js
var require_sessions = __commonJS({
  "node_modules/@remix-run/server-runtime/sessions.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var cookies = require_cookies();
    var warnings = require_warnings();
    function flash(name) {
      return `__flash_${name}__`;
    }
    function createSession2(initialData = {}, id = "") {
      let map = new Map(Object.entries(initialData));
      return {
        get id() {
          return id;
        },
        get data() {
          return Object.fromEntries(map);
        },
        has(name) {
          return map.has(name) || map.has(flash(name));
        },
        get(name) {
          if (map.has(name))
            return map.get(name);
          let flashName = flash(name);
          if (map.has(flashName)) {
            let value = map.get(flashName);
            map.delete(flashName);
            return value;
          }
          return void 0;
        },
        set(name, value) {
          map.set(name, value);
        },
        flash(name, value) {
          map.set(flash(name), value);
        },
        unset(name) {
          map.delete(name);
        }
      };
    }
    function isSession2(object) {
      return object != null && typeof object.id === "string" && typeof object.data !== "undefined" && typeof object.has === "function" && typeof object.get === "function" && typeof object.set === "function" && typeof object.flash === "function" && typeof object.unset === "function";
    }
    function createSessionStorage2({
      cookie: cookieArg,
      createData,
      readData,
      updateData,
      deleteData
    }) {
      let cookie = cookies.isCookie(cookieArg) ? cookieArg : cookies.createCookie((cookieArg === null || cookieArg === void 0 ? void 0 : cookieArg.name) || "__session", cookieArg);
      warnOnceAboutSigningSessionCookie(cookie);
      return {
        async getSession(cookieHeader, options) {
          let id = cookieHeader && await cookie.parse(cookieHeader, options);
          let data = id && await readData(id);
          return createSession2(data || {}, id || "");
        },
        async commitSession(session, options) {
          let {
            id,
            data
          } = session;
          if (id) {
            await updateData(id, data, cookie.expires);
          } else {
            id = await createData(data, cookie.expires);
          }
          return cookie.serialize(id, options);
        },
        async destroySession(session, options) {
          await deleteData(session.id);
          return cookie.serialize("", {
            ...options,
            expires: new Date(0)
          });
        }
      };
    }
    function warnOnceAboutSigningSessionCookie(cookie) {
      warnings.warnOnce(cookie.isSigned, `The "${cookie.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server. See https://remix.run/docs/en/v1/api/remix#signing-cookies for more information.`);
    }
    exports.createSession = createSession2;
    exports.createSessionStorage = createSessionStorage2;
    exports.isSession = isSession2;
    exports.warnOnceAboutSigningSessionCookie = warnOnceAboutSigningSessionCookie;
  }
});

// node_modules/@remix-run/server-runtime/sessions/cookieStorage.js
var require_cookieStorage = __commonJS({
  "node_modules/@remix-run/server-runtime/sessions/cookieStorage.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var cookies = require_cookies();
    var sessions = require_sessions();
    function createCookieSessionStorage2({
      cookie: cookieArg
    } = {}) {
      let cookie = cookies.isCookie(cookieArg) ? cookieArg : cookies.createCookie((cookieArg === null || cookieArg === void 0 ? void 0 : cookieArg.name) || "__session", cookieArg);
      sessions.warnOnceAboutSigningSessionCookie(cookie);
      return {
        async getSession(cookieHeader, options) {
          return sessions.createSession(cookieHeader && await cookie.parse(cookieHeader, options) || {});
        },
        async commitSession(session, options) {
          return cookie.serialize(session.data, options);
        },
        async destroySession(_session, options) {
          return cookie.serialize("", {
            ...options,
            expires: new Date(0)
          });
        }
      };
    }
    exports.createCookieSessionStorage = createCookieSessionStorage2;
  }
});

// node_modules/@remix-run/server-runtime/sessions/memoryStorage.js
var require_memoryStorage = __commonJS({
  "node_modules/@remix-run/server-runtime/sessions/memoryStorage.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var sessions = require_sessions();
    function createMemorySessionStorage2({
      cookie
    } = {}) {
      let uniqueId = 0;
      let map = new Map();
      return sessions.createSessionStorage({
        cookie,
        async createData(data, expires) {
          let id = (++uniqueId).toString();
          map.set(id, {
            data,
            expires
          });
          return id;
        },
        async readData(id) {
          if (map.has(id)) {
            let {
              data,
              expires
            } = map.get(id);
            if (!expires || expires > new Date()) {
              return data;
            }
            if (expires)
              map.delete(id);
          }
          return null;
        },
        async updateData(id, data, expires) {
          map.set(id, {
            data,
            expires
          });
        },
        async deleteData(id) {
          map.delete(id);
        }
      });
    }
    exports.createMemorySessionStorage = createMemorySessionStorage2;
  }
});

// node_modules/@remix-run/server-runtime/index.js
var require_server_runtime = __commonJS({
  "node_modules/@remix-run/server-runtime/index.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var cookies = require_cookies();
    var responses = require_responses();
    var server = require_server();
    var sessions = require_sessions();
    var cookieStorage = require_cookieStorage();
    var memoryStorage = require_memoryStorage();
    exports.createCookie = cookies.createCookie;
    exports.isCookie = cookies.isCookie;
    exports.json = responses.json;
    exports.redirect = responses.redirect;
    exports.createRequestHandler = server.createRequestHandler;
    exports.createSession = sessions.createSession;
    exports.createSessionStorage = sessions.createSessionStorage;
    exports.isSession = sessions.isSession;
    exports.createCookieSessionStorage = cookieStorage.createCookieSessionStorage;
    exports.createMemorySessionStorage = memoryStorage.createMemorySessionStorage;
  }
});

// node_modules/remix/esm/server.js
init_react();
var import_server_runtime = __toModule(require_server_runtime());

export {
  import_server_runtime
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/**
 * @remix-run/server-runtime v1.1.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
//# sourceMappingURL=/build/_shared/chunk-VNW7NWUY.js.map
