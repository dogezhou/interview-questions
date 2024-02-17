import { describe, expect, it } from 'vitest'

import DeepClone from './index'

describe('deep clone', () => {
    // 每一个it 添加一个 deepClone 对象

    it('can clone basic types', () => {
        expect(new DeepClone().clone(0)).toBe(0)
        expect(new DeepClone().clone('')).toBe('')
        expect(new DeepClone().clone(true)).toBe(true)
        expect(new DeepClone().clone(undefined)).toBe(undefined)
        expect(new DeepClone().clone(null)).toBe(null)
        // Symbol clone 之后不应该相等
        expect(new DeepClone().clone(Symbol())).not.toBe(Symbol())
    })
    describe('object', () => {
        it('can clone normal object', () => {
            const obj = {
                name: 1,
                child: {
                    name: 'doge',
                },
            }
            const objCloned = new DeepClone().clone(obj)
            expect(objCloned).not.toBe(obj)
            expect(objCloned.name).toBe(obj.name)
            expect(objCloned.child).not.toBe(obj.child)
            expect(objCloned.child.name).toBe(obj.child.name)
        })
        it('can clone array', () => {
            const a = [[1, 2], [3, 4], 5]
            const b = new DeepClone().clone(a)
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
            const fnCloned = new DeepClone().clone(fn)
            expect(fnCloned).not.toBe(fn)
            expect(fnCloned.xxx.yyy.zzz).toBe(fn.xxx.yyy.zzz)
            expect(fnCloned.xxx.yyy).not.toBe(fn.xxx.yyy)
            expect(fnCloned.xxx).not.toBe(fn.xxx)
            expect(fnCloned(1, 2)).toBe(3)
            expect(fnCloned(1, 2)).toBe(fn(1, 2))
        })
        it('can clone circular object', () => {
            const a = { name: 'a', self: null}
            a.self = a
            const b = new DeepClone().clone(a)
            expect(b.self).not.toBe(a)
            expect(b.name).toBe(a.name)
            expect(b.self).not.toBe(a.self)
            expect(b.self).toBe(b)
        })
        it.skip('handle stack overflow', () => {
            const a = { child: null }
            let pointer = a
            for (let index = 0; index <= 20000; index++) {
                pointer.child = { child: null }
                pointer = pointer.child
            }
            const b = new DeepClone().clone(a)
            expect(a).not.toBe(b)
            expect(a.child).not.toBe(b.child)
        })
        it('can clone RegExp', () => {
            const a = new RegExp('/[1-9]/', 'gi')
            const b = new DeepClone().clone(a)
            expect(a.source).toBe(b.source)
            expect(a.flags).toBe(b.flags)
        })
        it('can clone Date', () => {
            const a = new Date()
            const b = new DeepClone().clone(a)
            expect(a).not.toBe(b)
            expect(a.getTime()).toBe(b.getTime())
        })
    })
})
