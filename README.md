## 解决什么痛点：

痛点：我们在编写 RN 引用时，通常会使用 750 设计稿；而 RN 默认单位是 px，因此我们需要频繁的转换

本工具的目的即解决设计稿转换问题

## 开始使用

已支持 Typescript

### 初始化

在 RN 程序初始化的地方，进行转换的初始化，即在进入页面前初始化即可，比如在入口文件 `index.tsx` 或者路由定义文件 `routes.tsx` 或者根路由 `App.tsx`

```js
import { initTrans } from 'rn-pxtrans'
import { Dimensions, StyleSheet } from 'react-native'

initTrans(StyleSheet, Dimensions)
```

假设我们的设计稿是 640，我们在 initTrans 的时候显示传入 *(缺省是 750)*

```js
initTrans(StyleSheet, Dimensions, 640)
```

> 注，这里之所以还要显示传递一遍 StyleSheet Dimensions，而不直接在 initTrans 里集成，是因为好多公司会对 RN 进行二次封装

### create 方法将实现自动转换 (无需额外配置)

初始化之后，任意 create 里的尺寸数据，自动按照 750 设计稿算

使用 rn-pxtrans 里的 create 替代原有的 StyleSheet.create

### 内联样式需手动加入

非 create 创建的样式，比如直接在 jsx 直接写的 style，还是需要转换

```jsx
import { styleTrans } from 'rn-pxtrans'

const Home = () => <View style={styleTrans({ height: 100, width: 100 })}>...</View> 
```

在内联样式中，也可以只对某个值进行转化，如

```jsx
import { pxTrans } from 'rn-pxtrans'

const Home = () => <View style={{ height: pxTrans(100), width: 100 }}>...</View> 
```

### 如何排除不转换的尺寸

在有些时候，整体需要转换，但个别的属性我们希望使用原始的 px，此时，只需用 noTrans 包裹个别的尺寸即可

```js
import { noTrans, create } from 'rn-pxtrans'
create({
  height: 100,
  width: 100,
  borderRadius: noTrans(2) // 依旧保留 2px
})
```

同样，在内联里，类似使用

```jsx
import { styleTrans, noTrans } from 'rn-pxtrans'

const Home = () => (
  <View style={styleTrans({ height: 100, width: 100, borderRadius: noTrans(2) })}>...</View>
)
```