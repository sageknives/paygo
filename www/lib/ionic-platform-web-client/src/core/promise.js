var ES6Promise = require("es6-promise").Promise;

export var Promise = ES6Promise;

export class DeferredPromise {
  constructor() {
    var self = this;
    this._update = false;
    this.promise = new ES6Promise(function(resolve, reject) {
      self.resolve = resolve;
      self.reject = reject;
    });
    var originalThen = this.promise.then;
    this.promise.then = function(ok, fail, update) {
      self._update = 