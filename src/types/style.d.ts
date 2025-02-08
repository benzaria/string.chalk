import { styles } from '../vendor/style'

declare global {
    interface String extends StringExtend { }

    type Styles = typeof styles
    type StyleKeys = keyof Styles
    type RGB = number[]
    type HEX = string | string[] //? the other type here has no purpos else than keeping the TS server from infering the string type
    type ID = number | number[] //? the other type here has no purpos else than keeping the TS server from infering the number type
    type Color = (number | string)[]
}

type ExtractAnsiStyles<T extends ReadonlyArray<readonly [string, ...any[]]>> = T[number][0]

type AnsiStylesStd = ExtractAnsiStyles<typeof styles.Std>
// type AnsiStylesNonStd = ExtractAnsiStyles<typeof styles.nonStd>

type StringExtendStd = {
    [key in AnsiStylesStd]: string
}

type StringExtendNonStd = {
    fgrgb: (...color: RGB) => string
    bgrgb: (...color: RGB) => string
    fghex: (color: HEX) => string
    bghex: (color: HEX) => string
    fg256: (color: ID) => string
    bg256: (color: ID) => string

    fg(...color: RGB): string
    bg(...color: RGB): string
    fg(color: HEX): string
    bg(color: HEX): string
    fg(color: ID): string
    bg(color: ID): string

    fgbg(...colors: fgbg): string
}

type ColorObj = {
    'RGB': RGB
    'HEX': HEX
    'ID': ID
}

type ColorComb = {
    [K in keyof ColorObj]: {
        [J in keyof ColorObj]: (color1: ColorObj[K], color2: ColorObj[J]) => string
    }
}

type fgbg = Parameters<ColorComb[keyof ColorComb][keyof ColorComb]>

type StringExtend = StringExtendStd & StringExtendNonStd
