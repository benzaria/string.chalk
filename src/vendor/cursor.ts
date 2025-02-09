import { _store, _restore } from '../utils/globals'
import { _xy } from '../utils/cursorHelper'

export const cursor = {
    Std: [
        ['home', 'H'],
        ['upScroll', 'M'],
        ['store', _store],
        ['restore', _restore],
        ['', ''],
        ['', ''],

    ],

    nonStd: [
        ['xy', _xy],
        ['up', '{n}A'],
        ['dn', '{n}B'],
        ['down', '{n}B'],
        ['rt', '{n}C'],
        ['right', '{n}C'],
        ['lt', '{n}D'],
        ['left', '{n}D'],
        ['upStart', '{n}F'],
        ['dnStart', '{n}E'],
        ['downStart', '{n}E'],
        ['xyRestore', function (this: string, x: number, y: number) { return _store + this.xy(x, y) + _restore }],
        ['upRestore', function (this: string, n: number) { return _store + this.up(n) + _restore }],
        ['dnRestore', function (this: string, n: number) { return _store + this.dn(n) + _restore }],
        ['rtRestore', function (this: string, n: number) { return _store + this.rt(n) + _restore }],
        ['ltRestore', function (this: string, n: number) { return _store + this.lt(n) + _restore }],
        ['upStartRestore', function (this: string, n: number) { return _store + this.upStart(n) + _restore }],
        ['dnStartRestore', function (this: string, n: number) { return _store + this.dnStart(n) + _restore }],
        ['', ''],
        ['', ''],

    ],
} as const
