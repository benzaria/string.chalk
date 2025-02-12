import { isBrowser, isWindows } from 'environment'

const isTerminalApp = !isBrowser && process.env.TERM_PROGRAM === 'Apple_Terminal'
const isTerminalWin = !isBrowser && isWindows

export const
    ESC = '\x1b',
    CSI = `${ESC}[`, /* \x9B */
    OSC = `${ESC}]`, /* \x9D */
    DCS = `${ESC}P`, /* \x90 */
    BEL = '\x07',
    DEL = '\x7f'

export const
    BS = '\b',
    HT = '\t',
    LF = '\n',
    VT = '\v',
    FF = '\f',
    CR = '\r'

const _store = isTerminalApp ? `${ESC}7` : `${CSI}s`
const _restore = isTerminalApp ? `${ESC}8` : `${CSI}u`

const __write = /*isDeno ? echo 0:*/ process.stdout.write.bind(process.stdout)

const __echo: {
    (...data: any[]): void
    err(...data: any[]): void
    warn(...data: any[]): void
    // eslint-disable-next-line no-console
} = (...data: any[]) => console.log(...data)
__echo.err = (...data: any[]) => __echo(...(data.map(c => c.red)))
__echo.warn = (...data: any[]) => __echo(...(data.map(c => c.yellow)))

function addEcho_Write(): void {
    globalThis.echo = __echo
    globalThis.write = __write
}

const ansiReg = new RegExp(
    `[\\x1b\\x9b][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*` +
    `|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\x07|\\x1b\\x5c|\\x9c))` +
    '|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))', 'g')

export {
    _store,
    ansiReg,
    _restore,
    addEcho_Write,
    isTerminalApp,
    isTerminalWin,
    __echo as echo,
    __write as write,
}