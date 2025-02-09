import { isDeno } from 'environment';
import { _restore, _store, CSI } from './globals'

//@ts-ignore
const { stdin, stdout } = isDeno ? Deno : process

function _xy(this: string, x?: number, y?: number) {
    if (x !== undefined && y !== undefined)
        return `${CSI}${x};${y}H` + this
    return getPos()
}

const getPos = () => new Promise<{ x: number, y: number }>((res, rej) => {
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');

    stdout.write(`${CSI}6n`);

    stdin.once('data', (data: string) => {
        const match = /\x1b\[(\d+);(\d+)R/.exec(data);
        stdin.setRawMode(false);
        stdin.pause();

        if (match) res({ x: +match[1], y: +match[2] });
        else rej(new Error("Failed to parse cursor position"));
    });
});


function cursorMaker(this: string, open: string) {
    return `${CSI}${open}${this}`
}

export { getPos, cursorMaker, _xy }