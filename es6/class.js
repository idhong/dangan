function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);

class Point {
   constructor(x,y){
     this.x =x;
     this.y =y;
   }
   toString(){
    return this.x+","+this.y
   }
}

//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true

class Bar {
  doStuff() {
    console.log('stuff');
  }
}

var b = new Bar();
b.doStuff() // "stuff"

class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}
// 等同于
Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};

class B {}
let b = new B();

b.constructor === B.prototype.constructor // true

class Point {
  constructor(){
    // ...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
Point.prototype.constructor === Point // true

class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]

var Point = function (x, y) {
  // ...
};

Point.prototype.toString = function() {
  // ...
};

//ES6直接定义在原型上的方法可以枚举
Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]

//类的属性名，可以采用表达式
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}

//constructor
class Point {
}
// 等同于
class Point {
  constructor() {}
}

//
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false

class Foo {
  constructor() {
    return Object.create(null);
  }
}

Foo()

//定义类
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var point = new Point(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true

var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__
//true

var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__.printName = function () { return 'Oops' };

p1.printName() // "Oops"
p2.printName() // "Oops"

var p3 = new Point(4,2);
p3.printName() // "Oops"

const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};

let inst = new MyClass();
inst.getClassName() // Me 
Me.name // ReferenceError: Me is not defined

const MyClass = class { /* ... */ };

let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"

class Widget {

  // 公有方法
  foo (baz) {
    this._bar(baz);
  }

  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }

  // ...
}

class Widget {
  foo (baz) {
    bar.call(this, baz);
  }

  // ...
}

function bar(baz) {
  return this.snaf = baz;
}

const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass{

  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }

  // ...
};


class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}

class Logger {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`Hello ${name}`);
    };
  }

  // ...
}

//Proxy

function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const logger = selfish(new Logger());

var colors = ['red', 'green', 'blue'];
// 扩展Array.prototype
Array.prototype.demo = function () {};

for (var i in colors) {
  console.log(i); // 输出: 0 1 2 demo
}

// 查看原生的方法[[enumberable]]特征，这里以splice为例
Array.prototype.propertyIsEnumerable('splice'); // false
Object.getOwnPropertyDescriptor(Array.prototype, 'splice'); // {writable: true, enumerable: false, configurable: true}

// 查看 demo 属性的特性
Array.prototype.propertyIsEnumerable('demo'); // true
Object.getOwnPropertyDescriptor(Array.prototype, 'demo'); // {writable: true, enumerable: true, configurable: true}

var colors = ['red', 'green', 'blue'];
Object.defineProperty(Array.prototype, 'demo', {
  enumerable: false,
  value: function() {}
});

Array.prototype.propertyIsEnumerable('demo'); // false
Object.getOwnPropertyDescriptor(Array.prototype, 'demo'); // {writable: false, enumerable: false, configurable: false}

for (var i in colors) {
  console.log(i); // 输出：0 1 2
}

// 或者使用 hasOwnProperty
var colors = ['red', 'green', 'blue'];
Array.prototype.demo = function() {};

// 安全使用hasOwnProperty方法
var hasOwn = Object.prototype.hasOwnProperty;
for (var i in colors) {
  if (hasOwn.call(colors, i)) {
    console.log(i); // 输出：0 1 2
  }
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.getName = function() {
  return this.name;
}

// 实例化
var jenemy = new Person('jenemy', 25);

for (var prop in Person) {
  console.log(prop); // name age getName
}

var hasOwn = Object.prototype.hasOwnProperty;
for (var prop2 in jenemy) {
  if (hasOwn.call(jenemy, prop2)) {
    console.log(prop2); // name age
  }
}

// 遍历数组
var colors = ['red', 'green', 'blue'];
colors.length = 10;
colors.push('yellow');
Array.prototype.demo = function () {};

Object.keys(colors); // 0 1 2 10

// 遍历对象
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.demo = function() {};

var jenemy = new Person('jenemy', 25);

Object.keys(jenemy); // name age

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function() {
    'use strict';
    var hasOwn = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

      return function(obj) {
        if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
          throw new TypeError('Object.keys called on non-object');
        }

        var result = [], prop, i;

        for (prop in obj) {
          if (hasOwn.call(obj, prop)) {
            result.push(prop);
          }
        }

        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwn.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      }
  }) ();
}