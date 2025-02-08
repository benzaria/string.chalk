import { styleMaker } from "./utils/styleHelper"
import { } from "./utils/cursorHelper";

function buildStyles<T extends Styles>(styles: T) {
    styles.Std.forEach(entry => strProtoAdd(entry, 'Std'))
    styles.nonStd.forEach(entry => strProtoAdd(entry, 'nonStd'))
}

function buildCursor<T extends Cursor>(styles: T) {
    styles.Std.forEach(entry => strProtoAdd(entry, 'Std'))
    styles.nonStd.forEach(entry => strProtoAdd(entry, 'nonStd'))
}

function strProtoAdd<T>(entry: any, type: StyleKeys = 'Std') {
    const obj: { [key: string | number | symbol]: ((...args: any) => any) | boolean } = {
        enumerable: false,
        configurable: true,
    }

    let prop = entry[0]
    if (type === 'Std') {
        let [, open, close] = entry
        obj.get = function (this: string) {
            return styleMaker.call(this, open, close)
        }
    }

    else {
        obj.value = function (this: string, ...args: number[]) {
            let open = entry[1]
            if (typeof open === 'string') {
                const openMath = open.match(/\{(id|[rgb])\}/ig)

                if (!openMath) return this

                openMath.forEach((match, index) => {
                    if (args[index] !== undefined)
                        open = open.replace(match, args[index].toString())

                })
                return styleMaker.call(this, open, 0)
            }

            return open.call(this, ...args)
        }
    }

    Object.defineProperty(String.prototype, prop, obj)
}

export {
    buildStyles,
    buildCursor,
    strProtoAdd,
}