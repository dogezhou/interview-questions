class DeepClone {
    private cache = []

    private findCache(source: unknown) {
        for (let i = 0; i < this.cache.length; i++) {
            if (this.cache[i][0] === source) {
                return this.cache[i][1]
            }
        }
        return undefined
    }

    clone<T>(source: T): T {
        //  basic types return source
        if (!(source instanceof Object)) {
            return source
        }

        // object with cache return cached target
        const cachedTarget = this.findCache(source)
        if (cachedTarget) {
            return cachedTarget
        }

        // handle object cloning
        let target: T
        if (source instanceof Array) {
            target = new Array() as T
        } else if (source instanceof Function) {
            // loadsh 是不克隆函数的，将返回 {}。 因为克隆函数没有实际意义，公用同一个函数也没问题。
            // 而且涉及到 科里化，this，闭包等问题，无法克隆相等价值的函数。​
            target = eval(source.toString()) // 安全问题

            // target = new Function("return " + source.toString())()
            // target = function () {
            //     return source.apply(this, arguments)
            // } as T
        } else if (source instanceof Date) {
            target = new Date(source) as T
        } else if (source instanceof RegExp) {
            target = new RegExp(source.source, source.flags) as T
        } else {
            target = new Object() as T
        }

        // cache before calling deepClone
        this.cache.push([source, target])

        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = this.clone(source[key])
            }
        }
        return target
    }

    // clone<T>(source: T): T {

    //     if (!(source instanceof Object)) {
    //         return source
    //     }

    //     let result = {}
    //     const stack: { source: object; target: object }[] = [
    //         { source: source as object, target: result },
    //     ]

    //     while (stack.length) {
    //         const { source, target } = stack.pop()
    //         for (let key in source) {
    //             if (source.hasOwnProperty(key)) {
    //                 if (source[key] instanceof Object) {
    //                     target[key] = {}
    //                     stack.push({ source: source[key], target: target[key] })
    //                 } else {
    //                     target[key] = source[key]
    //                 }
    //             }
    //         }
    //     }
    //     return result as T
    // }
}

export default DeepClone
