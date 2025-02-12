import { addResizeListener, cursorMaker } from './utils/cursor'
import { CSI, addEcho_Write } from './utils/global'
import { styleMaker } from './utils/style'
import { cursor } from './vendor/cursor'
import { style } from './vendor/style'

import './types/global'
import './types/cursor'
import './types/style'

export class stringChalk {
    private $Proto: object = String.prototype
    private options: stringChalkOptions = {
        proto: String.prototype,
        ResizeListener: true,
        Echo_Write: true,
    }

    constructor(options?: stringChalkOptions) {
        let __options = { ...this.options, ...options }
        if (__options.proto && !(typeof __options.proto === 'object'))
            throw new Error('Prototype is Not an Object')

        this.$Proto = __options.proto ?? this.$Proto

        /* eslint-disable @typescript-eslint/no-unused-expressions */
        __options.Echo_Write ? addEcho_Write() : null
        __options.ResizeListener ? addResizeListener() : null
        /* eslint-enable @typescript-eslint/no-unused-expressions */

    }

    private __builder<T extends stringChalkExtend>(obj: T, isStyle: boolean = true) {
        Object.entries(obj.get ?? {}).forEach(([name, values]) => this.$ProtoAdd([name, ...values], true, isStyle))
        Object.entries(obj.apply ?? {}).forEach(([name, values]) => this.$ProtoAdd([name, ...values], false, isStyle))
        return this
    }

    /**
     * Build styles obj and attatch it to the String Obj
     * @param {Styles} [styles]
     * @memberof stringChalk
     */
    buildStyles<T extends stringChalkExtend>(styles: T = (style as any)) {
        //? it need to be here insted of the vendor/style in case u want to use a custom styles obj.
        this.$ProtoAdd(['un', function (this: string, style: string | string[], ..._args: any[]) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            let __style = Array.isArray(style) ? style : [style], that = this

            return __style.forEach(s => {
                if (!styles.get || !styles.apply) return
                let _style = styles.get[s][0] || styles.apply[s][0]
                //TODO: make `un()` available for apply function also.
                const _type = typeof _style

                if (_type === 'string')
                    that = that.replaceAll(`${CSI}${_style}m`, '')
                else if (_type === 'function')
                    throw new Error('`un()` is not available for apply function yet')

            }), that
        }], false)

        return this.__builder(styles)
    }

    /**
     * Build cursor obj and attatch it to the String Obj
     * @param {Cursor} [cursors]
     * @memberof stringChalk
     */
    buildCursor<T extends stringChalkExtend>(cursors: T = (cursor as any)) {
        return this.__builder(cursors, false)
    }

    /**
     * Attatch props to the String Obj
     * @param {[name: string, ...any]} entry
     * @param {boolean} [isGet=true]
     * @param {boolean} [isStyle=true]
     * @memberof stringChalk
     */
    $ProtoAdd(entry: [name: string, ...any], isGet: boolean = true, isStyle: boolean = true) {
        const obj: { [key: string]: ((...args: any) => any) | boolean } = {
            enumerable: false,
            configurable: true,
        }

        let prop = entry[0]
        if (isGet) {
            let [, open, close] = entry
            obj.get = function (this: string) {
                if (open === null) return close + this
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

                const openMath = (open as string).match(/\{([a-z])\}/ig)

                if (!openMath) return this

                openMath.forEach((match, index) => {
                    if (args[index] !== undefined)
                        open = open.replace(match, args[index].toString())

                })
                return isStyle ? styleMaker.call(this, open, 0) : cursorMaker.call(this, open)

            }
        }

        Object.defineProperty(this.$Proto, prop, obj)
        return this
    }
}
