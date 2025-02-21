import { fg_bg, hex2rgb, __un } from '../utils/style'
import { ansiReg } from '../utils/global'

export const style = {
    get: {
        reset: [0],
        strip: [function (this: string) { return this.replace(ansiReg, '') }],
        stripColor: [],
        stripFg: [],
        stripBg: [],


        bold: [1, 22],
        _bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        blink: [5, 25],
        _blink: [5, 25],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29],
        overline: [53, 55],
        dblunderline: [21, 24],

        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],

        grey: [90, 39],
        gray: [90, 39],
        blackBright: [90, 39],
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39],

        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],

        bgGrey: [100, 49],
        bgGray: [100, 49],
        bgBlackBright: [100, 49],
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49],

    },

    apply: {
        un: [__un],
        fg256: ['38;5;{n}'],
        bg256: ['48;5;{n}'],
        fgrgb: ['38;2;{r};{g};{b}'],
        bgrgb: ['48;2;{r};{g};{b}'],
        fghex: [function (this: string, hex: HEX) { return this.fgrgb(...(hex2rgb(hex))) }],
        bghex: [function (this: string, hex: HEX) { return this.bgrgb(...(hex2rgb(hex))) }],
        fg: [function (this: string, ...color: Color) { return fg_bg.call(this, 'fg', color) }],
        bg: [function (this: string, ...color: Color) { return fg_bg.call(this, 'bg', color) }],
        fgbg: [function (this: string, ...[fg, bg]: any) { return this.fg(fg).bg(bg) }],

    },
} as const
