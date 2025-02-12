import { stringChalk as _ } from './core'

type map = Omit<InstanceType<typeof _>, "buildStyles">

type stringChalk = {
    [key in keyof map]: (...args: Parameters<map[key]>) => stringChalk
} & {
    new(options?: stringChalkOptions): stringChalk
}

const stringChalk: stringChalk = _ as any;

new stringChalk()
    .buildCursor()

// if u need any components in the package just import it
export { stringChalk }
export * from './utils/cursor'
export * from './vendor/cursor'