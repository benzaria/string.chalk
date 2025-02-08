/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

function echo(...args: any[]) {
    console.log(...args)
}

echo.warn = console.warn
echo.err = console.error

export { echo }