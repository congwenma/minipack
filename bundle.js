(function(modules) {
  function require(id) {
    const [fn, mapping] = modules[id];

    function localRequire(name) {
      // NOTE: @eg mapping = { './message.js': 1 }, name = './message.js'
      return require(mapping[name]);
    }

    // NOTE: always creating module.exports for top level, node module compatibility ?!
    const module = { exports: {} };

    // NOTE: sends {localRequire}, which requires by filename rather than by id.
    // NOTE: sends {module}, why?!
    // NOTE: sends {exports}, for attaching exports, `exports.someString = `, `exports.default =`
    fn(localRequire, module, module.exports);

    return module.exports;
  }

  // NOTE: initial call, start point, entry
  require(0);
})({
  0: [
    // entry.js
    function(require, module, exports) {
      "use strict";

      var _message = require("./message.js");

      var _message2 = _interopRequireDefault(_message);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      console.log(_message2.default);
    },
    { "./message.js": 1 } // mapping
  ],
  1: [
    // message.js
    function(require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _name = require("./name.js");

      exports.default = "hello " + _name.name + "!";
    },
    { "./name.js": 2 }
  ],
  2: [
    // name.js, constant export
    function(require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var name = (exports.name = "world");
    },
    {}
  ]
});
