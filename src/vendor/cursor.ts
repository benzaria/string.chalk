import { _store, _restore, CSI, CR, LF, HT, BS, VT, FF, DEL, ESC, BEL } from '../utils/global'
import { __linker, __xy, __move, __toggle, __shape } from '../utils/cursor'
import { isWindows } from 'environment'

export const cursor = {
    get: {
        home: ['H'],
        backLine: ['M'],
        store: [_store],
        restore: [_restore],
        showCursor: [function (this: string) { return this.toggleCursor('show') }],
        hideCursor: [function (this: string) { return this.toggleCursor('hide') }],
        blinkCursor: ['?12h'],
        blockCorsor: ['?12l'],
        storeBuffer: ['?47h'],
        restoreBuffer: ['?47l'],
        enableAlternativeBuffer: ['?1049h'],
        disableAlternativeBuffer: ['?1049l'],
        eraseLine: ['2K'],
        eraseLineEnd: ['K'],
        eraseLineStart: ['1K'],
        eraseScreen: ['2J'],
        eraseScreenEnd: ['J'],
        eraseScreenStart: ['1J'],
        eraseSavedLines: ['3J'],
        clearScreen: [null, `${ESC}c`],
        clearTerminal: ['2J' + (isWindows ? `${CSI}0f` : `${CSI}3J${CSI}H`)],
        //end: [function (this: string) { return this.x(terinalSize.columns - this.length) }],
        end: [function (this: string) { return this.lt(this.strip.length - 1).rt(100_000) }],
        bottom: [function (this: string) { return this.y(terinalSize.rows) }],
        top: [function (this: string) { return this.y(0) }],
        beep: [null, BEL],
        new: [null, LF],
        start: [null, CR],
        Vtab: [null, VT],
        Htab: [null, HT],
        DEL: [null, DEL],
        FF: [null, FF],

    },

    apply: {
        xy: [__xy],
        move: [__move],
        x: ['{n}G'],
        y: ['{n}d'],
        up: ['{n}A'],
        dn: ['{n}B'],
        down: ['{n}B'],
        rt: ['{n}C'],
        right: ['{n}C'],
        lt: ['{n}D'],
        left: ['{n}D'],
        upScroll: ['{n}S'],
        dnScroll: ['{n}T'],
        downScroll: ['{n}T'],
        upStart: ['{n}F'],
        dnStart: ['{n}E'],
        downStart: ['{n}E'],
        setScreenMode: ['={n}h'],
        unSetScreenMode: ['={n}l'],
        link: [__linker],
        _link: [__linker],
        toggleCursor: [__toggle],
        shapeCursor: [__shape],

        key: [function (this: string, c: number, s?: number | string) { return (c ? (s ? `${CSI}${c};${s}p` : `${CSI}${c}p`) : (s ? `${CSI}${s}p` : '')) + this }],
        xyRestore: [function (this: string, x: number, y: number) { return _store + this.xy(x, y) + _restore }],
        delete: [function (this: string, n?: number) { return `${BS} ${BS}`.repeat(n ?? this.length) + this }],
        upRestore: [function (this: string, n: number) { return _store + this.up(n) + _restore }],
        dnRestore: [function (this: string, n: number) { return _store + this.dn(n) + _restore }],
        rtRestore: [function (this: string, n: number) { return _store + this.rt(n) + _restore }],
        ltRestore: [function (this: string, n: number) { return _store + this.lt(n) + _restore }],
        upStartRestore: [function (this: string, n: number) { return _store + this.upStart(n) + _restore }],
        dnStartRestore: [function (this: string, n: number) { return _store + this.dnStart(n) + _restore }],

    },
} as const
