import { StyleSheet, Dimensions } from 'react-native'

const deviceWidthDp = Dimensions.get('window').width;
const baseWidth = 750

const reg1 = /(width|height|radius|size|top|bottom|left|right|flexBasis|margin|padding)/i
const reg2 = /shadowOffset$/i

export function pxTrans(width) {
  return deviceWidthDp * width / baseWidth;
}

export function noTrans(width) {
  return baseWidth * width / deviceWidthDp
}

export function styleTrans(obj) {
  if (!obj) return {}
  const newObj = JSON.parse(JSON.stringify(obj))
  Object.keys(newObj).forEach(k => {
    const style = newObj[k]
    Object.keys(style).forEach(cssName => {
      const cssValue = style[cssName]
      if (cssName === 'tranform' && cssValue instanceof Array) {
        cssValue.forEach(item => {
          if (typeof item.translateX === 'number') item.translateX = pxTrans(item.translateX)
          if (typeof item.translateY === 'number') item.translateY = pxTrans(item.translateY)
        });
      }
      if (reg1.test(cssName) && typeof cssValue === 'number' && !isNaN(cssValue)) {
        style[cssName] = pxTrans(cssValue)
      }
      if (reg2.test(cssName)) {
        if (typeof style[cssName].height === 'number') style[cssName].height = pxTrans(style[cssName].height)
        if (typeof style[cssName].width === 'number') style[cssName].width = pxTrans(style[cssName].width)
      }
    })
  })
  return newObj
}

export function create(obj) {
  return StyleSheet.create(styleTrans(obj))
}