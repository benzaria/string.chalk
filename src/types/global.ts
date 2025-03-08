import { echo as __echo, write as __write } from "../utils/global";

declare global {
    type stringChalkExtend = {
        get?: {
            readonly [key: string]: readonly (null | string | number | ((...args: any[]) => any))[]
        }

        apply?: {
            readonly [key: string]: readonly (null | string | number | ((...args: any[]) => any))[]
        }
    }

    var echo: typeof __echo
    var write: typeof __write
    var cursorStat: 'hide' | 'show'

    type stringChalkOptions = {
        proto?: object,
        Echo_Write?: boolean,
        ResizeListener?: boolean,
    }
}
