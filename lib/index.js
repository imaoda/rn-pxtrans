"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pxTrans = pxTrans;
exports.noTrans = noTrans;
exports.styleTrans = styleTrans;
exports.create = create;
exports.initTrans = initTrans;
var deviceWidthDp = 0;
var baseWidth = 750;
var reg1 = /(width|height|radius|size|top|bottom|left|right|flexBasis|margin|padding)/gim;
var reg2 = /shadowOffset$/gim;

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

      if (reg1.test(cssName) && typeof cssValue === 'number' && !isNaN(cssName)) {
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

var SS = {
  create: function create() {}
};

function create(obj) {
  var oldCreate = SS.create;
  return oldCreate.call(SS, styleTrans(obj));
}

function initTrans(StyleSheet, Dimensions) {
  var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 750;
  deviceWidthDp = Dimensions.get('window').width;
  baseWidth = size;
  SS = StyleSheet;
}