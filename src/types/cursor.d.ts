import { cursor } from '../vendor/cursor'

declare global {
    var terinalSize: { columns: number, rows: number }
    interface String extends StringExtend { }

    type Cursor = typeof cursor
    type CursorKeys = keyof Cursor
}

type ExtractAnsiCursor<T extends Cursor[CursorKeys]> = keyof T

type AnsiCursorGet = ExtractAnsiCursor<Cursor['get']>
type AnsiCursorApply = ExtractAnsiCursor<Cursor['apply']>

type StringExtendGet = {
    [key in AnsiCursorGet]: string
} & {
    top: Promise<string>
    bottom: Promise<string>
}

type StringExtendApply = {
    [key in Exclude<AnsiCursorApply, 'xy' | 'xyRestore' | 'y'>]: (n?: number) => string
} & {
    y(n: number): Promise<string>
    xy(): Promise<{ x: number, y: number }>
    xy(x: number, y: number): string
    xyRestore(x: number, y: number): string
}

type StringExtend = StringExtendGet & StringExtendApply
