import { __linker, __shape, __toggle } from '../cursor'
import { cursor } from '../vendor/cursor'

declare global {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface String extends StringExtend { }

    var terinalSize: { columns: number, rows: number }

    type Cursor = typeof cursor
    type CursorKeys = keyof Cursor

    type AnsiCursorGet = ExtractAnsiCursor<Cursor['get']>
    type AnsiCursorApply = ExtractAnsiCursor<Cursor['apply']>
    type AnsiCursor = AnsiCursorGet | AnsiCursorApply
}

type ExtractAnsiCursor<T extends Cursor[CursorKeys]> = keyof T

type StringExtend = StringExtendGet & StringExtendApply
type StringExtendGet = {
    [key in AnsiCursorGet]: string
}
type StringExtendApply = {
    [key in Exclude<AnsiCursorApply, 'xy' | 'xyRestore' | 'link' | '_link' | 'toggleCursor' | 'shapeCursor'>]: (n?: number) => string
} & {
    xy(): Promise<{ x: number, y: number }>
    xy(x: number, y: number): string
    xyRestore(x: number, y: number): string
    link(...args: Parameters<typeof __linker>): string
    _link(...args: Parameters<typeof __linker>): string
    toggleCursor(...args: Parameters<typeof __toggle>): string
    shapeCursor(...args: Parameters<typeof __shape>): string
}
