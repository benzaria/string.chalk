import { log as echo } from 'console'
import { stdout } from 'process';
import ansi from "ansi-escapes";

import { cursor } from '../src/vendor/cursor'
import { styles } from '../src/vendor/style'
import { stringChalk } from '../src/core'
import { addResizeListener } from '../src/utils/cursorHelper'
import { write } from '../src/utils/globals'

import '../src'

addResizeListener()

// new stringChalk()
//     .buildStyles(styles)
//     .buildCursor(cursor)

console.clear()
// write(''.store + 'sheesh'.xy(9, 0) + ''.restore)
// echo(await 'sheesh'.xy())
// echo('*********')
// echo('---------')
// echo('---------')
// echo('up'.red.upRestore(2) + '---------'.green)
// echo('*********')
// echo('---------')
// echo('---------')
// echo('up'.red.up(2))
// echo('---------'.green)

const str = 'Hello'._bold.italic.fg(45)
echo(str)
echo(str.un(['bold', 'italic']))

setTimeout(() => { }, 5e3)