/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */

import { stringChalk } from '../src'

new stringChalk()
    .buildStyles()
    .buildCursor()

const obj = {
    get: {
        dd: [1, 22]
    },
}

// write(''.store + 'foo'.xy(9, 0) + ''.restore)
// echo('foo'.xyRestore(9, 2))
// echo(await 'foo'.xy())
// echo('*********')
// echo('---------')
// echo('---------')
// echo('up'.red.upRestore(2) + '---------'.green)
// echo('*********')
// echo('---------')
// echo('---------')
// echo('up'.red.up(2))
// echo('---------'.green)

echo('e'.enableAlternativeBuffer)
console.clear()
const str = 'benzaria/string.chalk'._bold.italic.fg(45)
echo(str.un().bg('#45f'))
echo(str.un().bg('#45f'))
echo(str._link('https://github.com/benzaria/string.chalk').strip)
echo('thisString'.end)
echo(str.end)
echo(str.un(['bold', 'italic']))
echo(str.toString())
echo(str.valueOf())

let tt = "link"._link('https://github.com/benzaria/string.chalk')

echo(tt._link())
echo(tt.un()._link("https://google.com"))

echo('string'.shapeCursor('block'))

/*
setTimeout(()=> echo('str'.toggleCursor()), 2e3)
setTimeout(()=> echo('str'.toggleCursor('hide')), 2e3*2)
setTimeout(()=> echo('str'.toggleCursor()), 2e3*3)
setTimeout(()=> echo('str'.toggleCursor()), 2e3*4)
*/
setTimeout(() => { echo('d'.disableAlternativeBuffer) }, 3e3)

