import { CSI } from "./global"

function hex2rgb(hex: HEX): RGB {

    const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex as string)
    if (!matches) return [0, 0, 0]

    let [colorString] = matches

    if (colorString.length === 3)
        colorString = [...colorString].map(c => c + c).join('')

    const integer = Number.parseInt(colorString, 16)

    return [
        integer >> 16 & 0xFF,
        integer >> 8 & 0xFF,
        integer & 0xFF,
    ]

}

function fg_bg(this: string, type: 'fg' | 'bg', color: Color) {
    let format = colorFormat(color)

    switch (format) {
        case 'RGB':
            return this[`${type}rgb`](...(color as RGB))
        case 'HEX':
            return this[`${type}hex`](color[0] as HEX)
        case 'ID':
            return this[`${type}256`](color[0] as ID)
        default:
            return this
    }
}

function colorFormat(color: Color) {

    if (typeof color[0] === 'string' && /^#?[a-f\d]{3,6}/i.test(color[0]))
        return 'HEX'
    if (color.length === 3 && color.every(c => typeof c === 'number'))
        return 'RGB'
    if (color.length === 1 && typeof color[0] === 'number')
        return 'ID'
    return undefined

}

function styleMaker(this: string, ...[open, close]: Color) {
    return `${CSI}${open}m${this}${CSI}${close}m`
}

export {
    fg_bg,
    hex2rgb,
    styleMaker,
    colorFormat,
}