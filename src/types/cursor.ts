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
} & {
    top: Promise<string>
    bottom: Promise<string>
}
type StringExtendApply = {
    [key in Exclude<AnsiCursorApply, 'xy' | 'xyRestore' | 'y' | 'link' | '_link'>]: (n?: number) => string
} & {
    y(n: number): Promise<string>
    xy(): Promise<{ x: number, y: number }>
    xy(x: number, y: number): string
    xyRestore(x: number, y: number): string
    link(link: string): string
    _link(link: string): string
}
