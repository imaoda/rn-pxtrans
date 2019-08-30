let deviceWidthDp = 0;
let baseWidth = 750;

const reg1 = /(width|height|radius|size|top|bottom|left|right|flexBasis|margin|padding)/gim
const reg2 = /shadowOffset$/gim

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
      if (reg1.test(cssName) && typeof cssValue === 'number' && !isNaN(cssName)) {
        style[cssName] = pxTrans(cssValue)
      }
      if (reg2.test(cssName)) {
        if (typeof style[cssName].height === 'number') style[cssName].height = pxTrans(style[cssName].height)
        if (typeof style[cssName].width === 'number') style[cssName].width = pxTrans(style[cssName].width)
      }
    })
  })
}

let SS = { create: () => { } }

export function create(obj) {
  const oldCreate = SS.create
  return oldCreate.call(SS, styleTrans(obj))
}

export function initTrans(StyleSheet, Dimensions, size = 750) {
  deviceWidthDp = Dimensions.get('window').width;
  baseWidth = size
  SS = StyleSheet
}