import { StyleSheet as NStyle } from '@types/react-native'
/**
 * 对单个尺寸进行转换
 */
export function pxTrans(width: number): number

/**
 * 在进行 styleTrans 或在 StyleCreate 时候，如果某个尺寸想使用原始 px，则用此函数包裹
 */
export function noTrans(width: number): number

/**
 * 非 StyleSheet.create 创建的样式，通过该函数可执行全量的 px 转换
 */
export function styleTrans<T extends NStyle.NamedStyles<T>>(styles: T): T

/**
 * 初始化函数，劫持 StyleSheet.create
 * @param StyleSheet 引自 react-native 库
 * @param Dimensions 引自 react-native 库
 * @param size 可选，默认 750
 */
export function initTrans(StyleSheet: any, Dimensions: any, size: number = 750): void

declare type RegisteredStyle<T> = number & { __registeredStyleBrand: T };
export function create<T extends NStyle.NamedStyles<T>>(styles: T): { [P in keyof T]: RegisteredStyle<T[P]> };
