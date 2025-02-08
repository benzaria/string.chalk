import { buildStyles, buildCursor } from './core'
import { } from "./utils/cursorHelper"
import { styleMaker } from "./utils/styleHelper"
import { styles } from './vendor/style'
import { cursor } from './vendor/cursor'

import "./types/cursor.d";
import "./types/style.d";

buildStyles(styles)
buildCursor(cursor)
