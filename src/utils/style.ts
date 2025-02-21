import { style } from "../vendor/style"
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
    switch (colorFormat(color)) {
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

function __un(this: string, styles?: string | string[], ..._args: any[]) {
    if (!styles) return this.strip
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let __styles = Array.isArray(styles) ? styles : [styles], that = this

    return __styles.forEach(s => {
        if (!style.get || !style.apply) return this
        let _style = style.get[s][0] || style.apply[s][0]
        //TODO: make `un()` available for apply function also.
        const _type = typeof _style

        if (_type === 'string')
            that = that.replaceAll(`${CSI}${_style}m`, '')
        else if (_type === 'function')
            throw new Error('`un()` is not available for apply function yet')
    }), that
}

export {
    __un,
    fg_bg,
    hex2rgb,
    styleMaker,
    colorFormat,
}
