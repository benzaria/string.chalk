/* eslint-disable no-console */
import { strictEqual, throws } from 'assert'
import { describe, it } from 'mocha'
import { log as echo } from 'console'

import "../src"

globalThis.iterations = 1_000_000

describe('tms function tests', () => {
    it('should ...', () => {
        echo('Hello'._bold.red, 'hh'.fg256(55)._bold)
        echo('fff'.fgrgb(26, 122, 55))
        echo('hex'.fghex("#ff5733"))
        echo('hex'.fghex("#ff5"))
        echo('hex bg'.bghex("#349000"))
        echo('hex bg'.bghex("#3498db"))
        echo('ffff'.fg('#3498db').bg(45))
        echo('ffff'.fgbg('#3498db', 45))
    })

})