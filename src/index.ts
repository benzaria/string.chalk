import { buildStyles, buildCursor } from './core'
import { } from './utils/cursorHelper'
import { styleMaker } from './utils/styleHelper'
import { cursor } from './vendor/cursor'
import { styles } from './vendor/style'

import './types/cursor'
import './types/style'

buildStyles(styles)
buildCursor(cursor)
