/**
* # jack-hooks
*
* Hooks for javascripts done right.
* * first tell jack what are the methods you want to hook
* * then pre/post attach new behaviour.
* * pre callbacks can modify the arguments
* * post callback can modify the returned value
*/
"use strict";

var assert = require("assert").ok;
var slice = Array.prototype.slice;

module.exports = function(cls, opt) {
  opt = opt || {};
  opt.hook_async = opt.hook_async || "hook_async";
  opt.hook_sync = opt.hook_sync || "hook";
  opt.pre = opt.pre || "pre";
  opt.post = opt.post || "post";

  var hooks = {
  };

  function hook_async(fn_name) {
    assert(this.prototype[fn_name] === undefined, "method not defined");
    assert(hooks.pre[fn_name] !== undefined, "already hooked");
    assert(hooks.post[fn_name] !== undefined, "already hooked");

    async.each
  }

  function hook_sync(fn_name) {
    assert(this.prototype[fn_name] !== undefined, "method not defined");
    assert(hooks[fn_name] === undefined, "already hooked");

    hooks[fn_name] = {
        pre: [],
        post: [],
        fn: this.prototype[fn_name],
        sync: true
    };



    var old_fn = this.prototype[fn_name];

    this.prototype[fn_name] = function() {
      var i,
        hks = hooks[fn_name].pre,
        max = hks.length,
        args = slice.call(arguments);

      function modify_args() {
        if (arguments.length) {
          args = slice.call(arguments);
        }
      }

      for (i = 0; i < max; ++i) {
        args = args.splice(0, old_fn.length);
        args.push(modify_args);

        hks[i].apply(this, args);
      }

      args = args.splice(0, old_fn.length);
      var result = old_fn.apply(this, args);

      function modify_result(res) {
        if (res !== undefined) {
          result = res;
        }
      }

      hks = hooks[fn_name].post,
      max = hks.length;

      for (i = 0; i < max; ++i) {
        args = args.splice(0, old_fn.length);
        args.push(modify_result);

        hks[i].apply(this, arguments);
      }

      return result;
    };
  }

  function pre(fn_name, callback) {
    assert(hooks[fn_name].fn.length + 1 === callback.length, "callback must have " + (hooks[fn_name].fn.length + 1) +" arguments");

    hooks[fn_name].pre.push(callback);
  }

  function post(fn_name, callback) {
    assert(hooks[fn_name].fn.length + 1 === callback.length, "callback must have " + (hooks[fn_name].fn.length + 1) +" arguments");

    hooks[fn_name].pre.push(callback);
  }

  cls[opt.hook_async] = hook_async;
  cls[opt.hook_sync] = hook_sync;
  cls[opt.pre] = pre;
  cls[opt.post] = post;
};
