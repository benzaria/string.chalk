import { cursor } from '../vendor/cursor'

declare global {
    interface String extends StringExtend { }

    type Cursor = typeof cursor
    type CursorKeys = keyof Cursor
}

type ExtractAnsiCursor<T extends ReadonlyArray<readonly [string, ...any[]]>> = T[number][0]

type AnsiCursorStd = ExtractAnsiCursor<typeof cursor.Std>
type AnsiCursorNonStd = ExtractAnsiCursor<typeof cursor.nonStd>

type StringExtendStd = {
    [key in AnsiCursorStd]: string
}

type StringExtendNonStd = {
    [key in AnsiCursorNonStd]: string
}

type StringExtend = StringExtendStd & StringExtendNonStd
