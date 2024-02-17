import { describe, expect, it } from 'vitest'

import deepClone from './index'

describe('deep clone', () => {
    it('is function', () => {
        expect(deepClone).toBeTypeOf('function')
    })
    it('can clone basic types', () => {
        expect(deepClone(0)).toBe(0)
        expect(deepClone('')).toBe('')
        expect(deepClone(true)).toBe(true)
        expect(deepClone(undefined)).toBe(undefined)
        expect(deepClone(null)).toBe(null)
        // Symbol clone 之后不应该相等
        expect(deepClone(Symbol())).not.toBe(Symbol())
    })
    describe('object', () => {
        it('can clone normal object', () => {
            const obj = {
                name: 1,
                child: {
                    name: 'doge',
                },
            }
            const objCloned = deepClone(obj)
            expect(objCloned).not.toBe(obj)
            expect(objCloned.name).toBe(obj.name)
            expect(objCloned.child).not.toBe(obj.child)
            expect(objCloned.child.name).toBe(obj.child.name)
        })
        it('can clone array', () => {
            const a = [[1, 2], [3, 4], 5]
            const b = deepClone(a)
            expect(a).not.toBe(b)
            expect(a[0]).not.toBe(b[0])
            expect(a[1]).not.toBe(b[1])
            expect(a[2]).toBe(b[2])
            expect(a).toStrictEqual(b)
        })
        it('can clone function', () => {
            const fn = (a, b) => {
                return a + b
            }
            fn.xxx = { yyy: { zzz: 1 } }
            const fnCloned = deepClone(fn)
            expect(fnCloned).not.toBe(fn)
            expect(fnCloned.xxx.yyy.zzz).toBe(fn.xxx.yyy.zzz)
            expect(fnCloned.xxx.yyy).not.toBe(fn.xxx.yyy)
            expect(fnCloned.xxx).not.toBe(fn.xxx)
            expect(fnCloned(1, 2)).toBe(3)
            expect(fnCloned(1, 2)).toBe(fn(1, 2))
        })
    })
})
