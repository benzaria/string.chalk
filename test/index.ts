import { log as echo } from 'console'
import { stdout } from 'process';
import ansi from "ansi-escapes";

import { cursor } from '../src/vendor/cursor'
import { styles } from '../src/vendor/style'
import { stringChalk } from '../src/core'


// import '../src'

const write = stdout.write.bind(stdout)

new stringChalk()
    .buildStyles(styles)
    .buildCursor(cursor)

console.clear()
// write(''.store + 'sheesh'.xy(9, 0) + ''.restore)
echo(await 'sheesh'.xy())
echo('*********')
echo('---------')
echo('---------')
echo('up'.red.upRestore(2) + '---------'.green)
echo('*********')
echo('---------')
echo('---------')
echo('up'.red.up(2))
echo('---------'.green)



setTimeout(() => { }, 2e3)