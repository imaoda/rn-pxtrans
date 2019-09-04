"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pxTrans = pxTrans;
exports.noTrans = noTrans;
exports.styleTrans = styleTrans;
exports.create = create;

var _reactNative = require("react-native");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var deviceWidthDp = _reactNative.Dimensions.get("window").width;

var baseWidth = 750;
var reg1 = /(width|height|radius|size|top|bottom|left|right|flexBasis|margin|padding)/i;
var reg2 = /shadowOffset$/i;

function pxTrans(width) {
  return deviceWidthDp * width / baseWidth;
}

function noTrans(width) {
  return baseWidth * width / deviceWidthDp;
}

function styleTrans(style) {
  style = JSON.parse(JSON.stringify(style));
  Object.keys(style).forEach(function (cssName) {
    var cssValue = style[cssName];

    if (cssName === "tranform" && cssValue instanceof Array) {
      cssValue.forEach(function (item) {
        if (typeof item.translateX === "number") item.translateX = pxTrans(item.translateX);
        if (typeof item.translateY === "number") item.translateY = pxTrans(item.translateY);
      });
    }

    if (reg1.test(cssName) && typeof cssValue === "number" && !isNaN(cssValue)) {
      style[cssName] = pxTrans(cssValue);
    }

    if (reg2.test(cssName)) {
      if (typeof style[cssName].height === "number") style[cssName].height = pxTrans(style[cssName].height);
      if (typeof style[cssName].width === "number") style[cssName].width = pxTrans(style[cssName].width);
    }
  });
  return style;
}

function styleTransAll(obj) {
  if (!obj) return {};

  var newObj = _objectSpread({}, obj);

  Object.keys(newObj).forEach(function (k) {
    newObj[k] = styleTrans(newObj[k]);
  });
  return newObj;
}

function create(obj) {
  return _reactNative.StyleSheet.create(styleTransAll(obj));
}