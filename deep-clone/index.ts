let cache = []
function findCache(source: unknown) {
    for (let i = 0; i < cache.length; i++) {
        if (cache[i][0] === source) {
            return cache[i][1]
        }
    }
    return undefined
}

function deepClone<T>(source: T): T {
    //  basic types return source
    if (!(source instanceof Object)) {
        return source
    }

    // object with cache return cached target
    const cachedTarget = findCache(source)
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
    } else {
        target = new Object() as T
    }

    // cache before calling deepClone
    cache.push([source, target])

    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = deepClone(source[key])
        }
    }
    return target
}

export default deepClone
