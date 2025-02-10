import { cursor } from './vendor/cursor'
import { stringChalk } from './core'
import { addResizeListener } from './utils/cursorHelper'

new stringChalk()
    .buildCursor(cursor)

addResizeListener()

// if u need any components in the package just import it
// export * from './core'
// export * from './vendor/cursor'
// export * from './utils/cursorHelper'