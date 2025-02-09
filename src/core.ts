import { cursorMaker } from './utils/cursorHelper'
import { styleMaker } from './utils/styleHelper'

import './types/cursor.d'
import './types/style.d'

export class stringChalk {
    private $Proto = String.prototype

    buildStyles(styles: Styles) {
        styles.Std.forEach(entry => this.$ProtoAdd(entry, true, true))
        styles.nonStd.forEach(entry => this.$ProtoAdd(entry, false, true))
        return this
    }

    buildCursor(cursor: Cursor) {
        cursor.Std.forEach(entry => this.$ProtoAdd(entry, true, false))
        cursor.nonStd.forEach(entry => this.$ProtoAdd(entry, false, false))
        return this
    }

    $ProtoAdd(entry: any, isStd: boolean = true, isStyle: boolean = true) {
        const obj: { [key: string | number | symbol]: ((...args: any) => any) | boolean } = {
            enumerable: false,
            configurable: true,
        }

        let prop = entry[0]
        if (isStd) {
            let [, open, close = 0] = entry
            obj.get = function (this: string) {
                return isStyle ? styleMaker.call(this, open, close) : cursorMaker.call(this, open)
            }
        }

        else {
            obj.value = function (this: string, ...args: (number | string)[]) {
                let open = entry[1]
                if (typeof open === 'string') {
                    const openMath = open.match(/\{(id|[rgbxyn])\}/ig)

                    if (!openMath) return this.dblunderline

                    openMath.forEach((match, index) => {
                        if (args[index] !== undefined)
                            open = open.replace(match, args[index].toString())

                    })
                    return isStyle ? styleMaker.call(this, open, 0) : cursorMaker.call(this, open)
                }

                return open.call(this, ...args)
            }
        }

        Object.defineProperty(this.$Proto, prop, obj)
    }
}
