import { stringChalk as _ } from './core'

type map = Omit<InstanceType<typeof _>, "buildCursor">

type stringChalk = {
    [key in keyof map]: (...args: Parameters<map[key]>) => stringChalk
} & {
    new(options?: stringChalkOptions): stringChalk
}

const stringChalk: stringChalk = _ as any;

new stringChalk({ ResizeListener: false })
    .buildStyles()

// if u need any components in the package just import it
export { stringChalk }
export * from './utils/style'
export * from './vendor/style'