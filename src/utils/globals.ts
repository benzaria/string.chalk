import { isBrowser, isWindows, isBun, isDeno, isNode } from 'environment'

export const isTerminalApp = !isBrowser && process.env.TERM_PROGRAM === 'Apple_Terminal'
export const isTerminalWin = !isBrowser && isWindows

export const
    ESC = '\x1b',
    CSI = `${ESC}[`, /* \x9B */
    OSC = `${ESC}]`, /* \x9D */
    DCS = `${ESC}P`, /* \x90 */
    BEL = '\x07',
    DEL = '\x7f'

export const
    BS = '\x08',
    HT = '\x09',
    LF = '\x0A',
    VT = '\x0B',
    FF = '\x0C',
    CR = '\x0D'

export const _store = isTerminalApp ? `${ESC}7` : `${CSI}s`
export const _restore = isTerminalApp ? `${ESC}8` : `${CSI}u`

export const write =
    isDeno ? console.log.bind(console) : process.stdout.write.bind(process.stdout)
// isDeno ? 