import { strictEqual, throws } from 'assert'
import { describe, it } from 'mocha'
import { log as echo } from 'console'

// import { cursor } from '../src/vendor/cursor'
// import { styles } from '../src/vendor/style'
// import { stringChalk } from '../src/core'

import '../src'

// new stringChalk()
//     .buildStyles(styles)
//     .buildCursor(cursor)

describe('string.chalk testing...', () => {
    it('should style', () => {
        echo('Hello'.red.bold, 'World'.fg256(55).blink)
        echo('fff'.fgrgb(26, 122, 55))
        echo('hex'.fghex("#ff5733"))
        echo('hex'.fghex("#ff5"))
        echo('hex bg'.bghex("#349000"))
        echo('hex bg'.bghex("#3498db"))
        echo('ffff'.fg('#3498db').bg(45))
        echo('ffff'.fgbg('#3498db', 45))
    })
    it('should cursor', () => {
        echo('---------')
        echo('fff'.store.up(1))
        echo('---------')
    })
    it('should cursor', () => {
        echo('---------')
        echo('fff'.up(2))
        echo('---------')
    })
    it('should cursor', () => {
        echo('---------')
        echo('fff'.up(3))
        echo('---------')

    })

})