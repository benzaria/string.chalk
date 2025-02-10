import { isDeno } from 'environment'
import { _restore, _store, CSI } from './globals'

//@ts-ignore
const { stdin, stdout } = isDeno ? Deno : process

function _xy(this: string, x?: number, y?: number) {
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
        console.log(data);

        const match = /\x1b\[(\d+);(\d+)R/.exec(data)
        stdin.setRawMode(false)
        stdin.pause()

        if (match) res({ y: +match[1], x: +match[2] })
        else throw new Error('Failed to parse cursor position')
    })
})


function cursorMaker(this: string, open: string | number) {
    return `${CSI}${open}${this}`
}

function addPositionListener() {

}

function addResizeListener() {

    if (isDeno) {
        // well this is the best u can do with Deno
        //@ts-ignore
        let lastSize = Deno.consoleSize()
        globalThis.terinalSize = { columns: lastSize.columns, rows: lastSize.rows }
        //@ts-ignore
        setInterval((newSize = Deno.consoleSize()) => {
            if (newSize.columns !== lastSize.columns || newSize.rows !== lastSize.rows) {
                globalThis.terinalSize = { columns: newSize.columns, rows: newSize.rows }
                lastSize = newSize
            }
        }, 500)
    }
    else {
        globalThis.terinalSize = { columns: stdout.columns, rows: stdout.rows }
        stdout.on("resize", () =>
            globalThis.terinalSize = { columns: stdout.columns, rows: stdout.rows }
        )
    }
}

export { getPos, cursorMaker, _xy, addResizeListener }