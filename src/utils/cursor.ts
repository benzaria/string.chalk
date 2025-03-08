import { _restore, _store, BEL, CSI, OSC, linkReg, posReg, stdin, stdout } from './global'
import { isDeno } from 'environment'


//const { stdin, stdout } = isDeno ? Deno : process

function __xy(this: string, x?: number, y?: number) {
    if (x !== undefined && y !== undefined)
        return `${CSI}${y};${x}H` + this
    return getPos()
}

const getPos = () => new Promise<{ x: number, y: number }>(res => {
    stdin.setRawMode(true)
    stdin.resume()
    stdin.setEncoding('utf8')

    stdout.write(`${CSI}6n`)

    stdin.once('data', (data: string) => {
        const match = data.match(posReg)
        stdin.setRawMode(false)
        stdin.pause()

        if (match) res({ y: +match[1], x: +match[2] })
        else throw new Error('Failed to parse cursor position')
    })
})

function cursorMaker(this: string, open: string | number) {
    return `${CSI}${open}${this}`
}

function __linker(this: string, link?: string) {
    if (link === undefined) return this.match(linkReg)?.[1] ?? ''
    return `${OSC}8;;${link}${BEL}${this}${OSC}8;;${BEL}`
}

function __restorer(this: string, fn: AnsiCursorApply, ...args: any[]): string {
    throw new Error('function not ready yet.')
    //@ts-ignore
    return _store + this[fn](...args) + _restore
}

function addPositionListener() {
    throw new Error('function not ready yet.')
}

function addResizeListener() {

    if (isDeno) return

    // if (isDeno) {
    //     //? well this is the best u can do with Deno
    //     //@ts-ignore
    //     let lastSize = Deno.consoleSize()
    //     globalThis.terinalSize = { columns: lastSize.columns, rows: lastSize.rows }
    //     //@ts-ignore
    //     setInterval((newSize = Deno.consoleSize()) => {
    //         if (newSize.columns !== lastSize.columns || newSize.rows !== lastSize.rows) {
    //             globalThis.terinalSize = { columns: newSize.columns, rows: newSize.rows }
    //             lastSize = newSize
    //         }
    //     }, 500)
    // }
    // else {
    globalThis.terinalSize = { columns: stdout.columns, rows: stdout.rows }
    stdout.on("resize", () =>
        globalThis.terinalSize = { columns: stdout.columns, rows: stdout.rows }
    )
    // }
}

function __move(this: string, x: number, y: number) {
    let that = this
    if (x > 0) that = that.rt(x)
    if (x < 0) that = that.lt(x)
    if (y > 0) that = that.dn(x)
    if (y < 0) that = that.up(x)
    return that
}

function __toggle(this: string, stat?: 'show' | 'hide') {
    let _stat: typeof stat, stats = { show: '?25h', hide: '?25l' }

    if (stat && Object.keys(stats).includes(stat))
        _stat = stat.toLowerCase() as typeof stat
    else
        _stat = global.cursorStat === 'show' ? 'hide' : 'show'

    global.cursorStat = _stat
    return cursorMaker.call(this, stats[_stat]) //this[`${_stat}Cursor`]
}

function __shape(this: string, stat: 'bar' | 'block' | 'underline' | 'user' = 'user', blink: boolean = true) {
    let stats = { user: 0, block: 1, underline: 3, bar: 5 }
    const shape = stats[stat.toLowerCase() as typeof stat]
    return cursorMaker.call(this, `${shape + ((blink && shape > 0) ? 1 : 0)} q`)
}

export {
    __xy,
    __move,
    getPos,
    __shape,
    __linker,
    __toggle,
    __restorer,
    cursorMaker,
    addResizeListener,
    addPositionListener,
}
