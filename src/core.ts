import { cursorMaker } from './utils/cursorHelper'
import { styleMaker } from './utils/styleHelper'

import './types/cursor.d'
import './types/style.d'

export class stringChalk {
    private $Proto = String.prototype
    static $: string = ''

    constructor(proto?: any, $?: string) {
        if (proto && !(proto instanceof String))
            console.warn('Prototype is Not a StringConstructor')
        this.$Proto = proto ?? this.$Proto
        stringChalk.$ = $ ?? stringChalk.$
    }

    buildStyles(styles: Styles) {
        this.$ProtoAdd(['un', function (this: string, style: string | string[], ...args: Color) {
            let __style = Array.isArray(style) ? style : [style], that = this
            return __style.forEach(style => {
                const _style = styles.get[style as AnsiStylesGet][0]
                //TODO: make un() available for apply function 
                //  const _type = typeof _style
                that = that.replaceAll(styleMaker.call('', _style), '')
            }), that
        }], false)
        __builder.call(this, styles)
    }

    buildCursor(cursor: Cursor) {
        __builder.call(this, cursor, false)
    }


    $ProtoAdd(entry: any, isGet: boolean = true, isStyle: boolean = true) {
        const obj: { [key: string | number | symbol]: ((...args: any) => any) | boolean } = {
            enumerable: false,
            configurable: true,
        }

        let prop = entry[0]
        if (isGet) {
            let [, open, close] = entry
            obj.get = function (this: string) {
                if (typeof open === 'function')
                    return open.call(this)
                return isStyle ? styleMaker.call(this, open, close) : cursorMaker.call(this, open)
            }
        }

        else {
            obj.value = function (this: string, ...args: (number | string)[]) {
                let open = entry[1]
                if (typeof open === 'function')
                    return open.call(this, ...args)

                const openMath = (open as string).match(/\{(id|[rgbxyn])\}/ig)

                if (!openMath) return this

                openMath.forEach((match, index) => {
                    if (args[index] !== undefined)
                        open = open.replace(match, args[index].toString())

                })
                return isStyle ? styleMaker.call(this, open, 0) : cursorMaker.call(this, open)

            }
        }

        Object.defineProperty(this.$Proto, prop, obj)
    }
}

function __builder(this: stringChalk, obj: Cursor | Styles, isStyle: boolean = true) {
    Object.entries(obj.get).forEach(([name, values]) => this.$ProtoAdd([name, ...values], true, isStyle))
    Object.entries(obj.apply).forEach(([name, values]) => this.$ProtoAdd([name, ...values], false, isStyle))
    return this
}