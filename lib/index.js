"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pxTrans = pxTrans;
exports.noTrans = noTrans;
exports.styleTrans = styleTrans;
exports.create = create;

var _reactNative = require("react-native");

var deviceWidthDp = _reactNative.Dimensions.get('window').width;

var baseWidth = 750;
var reg1 = /(width|height|radius|size|top|bottom|left|right|flexBasis|margin|padding)/i;
var reg2 = /shadowOffset$/i;

function pxTrans(width) {
  return deviceWidthDp * width / baseWidth;
}

function noTrans(width) {
  return baseWidth * width / deviceWidthDp;
}

function styleTrans(obj) {
  if (!obj) return {};
  var newObj = JSON.parse(JSON.stringify(obj));
  Object.keys(newObj).forEach(function (k) {
    var style = newObj[k];
    Object.keys(style).forEach(function (cssName) {
      var cssValue = style[cssName];

      if (cssName === 'tranform' && cssValue instanceof Array) {
        cssValue.forEach(function (item) {
          if (typeof item.translateX === 'number') item.translateX = pxTrans(item.translateX);
          if (typeof item.translateY === 'number') item.translateY = pxTrans(item.translateY);
        });
      }

      if (reg1.test(cssName) && typeof cssValue === 'number' && !isNaN(cssValue)) {
        style[cssName] = pxTrans(cssValue);
      }

      if (reg2.test(cssName)) {
        if (typeof style[cssName].height === 'number') style[cssName].height = pxTrans(style[cssName].height);
        if (typeof style[cssName].width === 'number') style[cssName].width = pxTrans(style[cssName].width);
      }
    });
  });
  return newObj;
}

function create(obj) {
  return _reactNative.StyleSheet.create(styleTrans(obj));
}