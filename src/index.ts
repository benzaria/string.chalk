import { stringChalk } from './core'

new stringChalk()
    .buildStyles()
    .buildCursor()

//? if u need any components in the package just import it
export * from './core'
export * from './utils/style'
export * from './utils/cursor'
export * from './vendor/style'
export * from './vendor/cursor'
