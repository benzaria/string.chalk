import { style } from '../vendor/style'

declare global {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface String extends StringExtend { }

    type Styles = typeof style
    type StyleKeys = keyof Styles

    type RGB = [r: number, g: number, b: number]
    type HEX = string | string[] //? the other type here has no purpos else than keeping the TS server from infering the string type
    type ID = number | number[] //? the other type here has no purpos else than keeping the TS server from infering the number type
    type Color = (number | string)[]

    type AnsiStylesGet = ExtractAnsiStyles<Styles['get']>
    type AnsiStylesApply = ExtractAnsiStyles<Styles['apply']>
    type AnsiStyles = AnsiStylesGet | AnsiStylesApply
}

type ExtractAnsiStyles<T extends Styles[StyleKeys]> = keyof T

type StringExtend = StringExtendGet & StringExtendApply
type StringExtendGet = { [key in AnsiStylesGet]: string }
type StringExtendApply = {
    fgrgb(...color: RGB): string
    bgrgb(...color: RGB): string
    fghex(color: HEX): string
    bghex(color: HEX): string
    fg256(color: ID): string
    bg256(color: ID): string

    /**
     * Set's the Foreground Colors
     * @param {Color} color
     * @return {string} The modified String
     */
    fg(...color: RGB): string
    fg(color: HEX): string
    fg(color: ID): string
    /**
     * Set's the Background Colors
     * @param {Color} color
     * @return {string} The modified String
     */
    bg(...color: RGB): string
    bg(color: HEX): string
    bg(color: ID): string

    /**
     * Set's the Foreground and Background Colors
     * @param {fgbg[0]} fgColor
     * @param {fgbg[1]} bgColor
     * @return {string} The modified String
     */
    fgbg(...[fgColor, bgColor]: fgbg): string

    /**
     * Remove Styles from Strings
     * @param {(AnsiStyles | AnsiStyles[])} style 
     * @return {string} The modified String
     */
    un(style: AnsiStyles | AnsiStyles[], ...args: Color): string
}

type ColorObj = {
    RGB: RGB
    HEX: HEX
    ID: ID
}

type ColorComb = {
    [K in keyof ColorObj]: {
        [J in keyof ColorObj]: (fgColor: ColorObj[K], bgColor: ColorObj[J]) => string
    }
}

type fgbg = Parameters<ColorComb[keyof ColorComb][keyof ColorComb]>
