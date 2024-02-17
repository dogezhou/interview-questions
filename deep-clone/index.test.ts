import { describe, expect, it } from "vitest"

import deepClone from './index'


describe("deep clone", () => {
    it('is function', () => {
        expect(deepClone).toBeTypeOf('function')        
    })
})