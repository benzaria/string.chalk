import { isBrowser, isWindows, isDeno } from 'environment'
import { cursor } from "../vendor/cursor"
import { style } from "../vendor/style"

const isTerminalApp = !isBrowser && process.env.TERM_PROGRAM === 'Apple_Terminal'
const isTerminalWin = !isBrowser && isWindows

//@ts-expect-error Deno namespace is undefined
const { stdin, stdout } = isDeno ? Deno : process

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

global.cursorStat = 'show'

const _store = isTerminalApp ? `${ESC}7` : `${CSI}s`
const _restore = isTerminalApp ? `${ESC}8` : `${CSI}u`

const __write = stdout.write.bind(stdout)
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
    '[\\x1b\\x9b][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*' +
    '|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\x07|\\x1b\\x5c|\\x9c))' +
    '|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))', 'g')
const linkReg = /\x1b]8;;(.+)\x07(?:.+)\x1b]8;;\x07/
const posReg = /\x1b\[(\d+);(\d+)R/

function __un(this: string, styles?: AnsiStyles | AnsiStyles[], ..._args: any[]) {
    if (!styles) return this.strip
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let __styles = Array.isArray(styles) ? styles : [styles], that = this

    return __styles.forEach(s => {
        if (!style.get || !style.apply) return this
        let _style = (
            style.get[s as AnsiStylesGet] ||
            style.apply[s as AnsiStylesApply])[0]
        //TODO: make `un()` available for apply function also.
        //TODO: after that make it for cursor functions.
        const _type = typeof _style

        if (_type === 'string')
            that = that.replaceAll(`${CSI}${_style}m`, '')
        else if (_type === 'function')
            throw new Error('`un()` is not available for apply function yet')
    }), that
}

export {
    __un,
    _store,
    posReg,
    ansiReg,
    linkReg,
    stdin,
    _restore,
    stdout,
    addEcho_Write,
    isTerminalApp,
    isTerminalWin,
    __echo as echo,
    __write as write,
}
