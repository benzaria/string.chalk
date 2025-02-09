import { styles } from './vendor/style'
import { stringChalk } from './core'

new stringChalk()
    .buildStyles(styles)

// if u need any components in the package just import it
// export * from './core'
// export * from './vendor/style'
// export * from './utils/styleHelper'