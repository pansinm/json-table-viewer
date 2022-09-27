"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../src/utils");
describe("isLeaf", function () {
    it("empty object is leaf", function () {
        expect((0, utils_1.isLeaf)({})).toBe(true);
        expect((0, utils_1.isLeaf)([])).toBe(true);
    });
    it("falsy var is leaf", function () {
        expect((0, utils_1.isLeaf)(null)).toBe(true);
    });
    it("primary type is leaf", function () {
        expect((0, utils_1.isLeaf)(3)).toBe(true);
    });
    it("when object contains key then isLeaf return false", function () {
        expect((0, utils_1.isLeaf)({ a: 1 })).toBe(false);
        expect((0, utils_1.isLeaf)([1, 2])).toBe(false);
    });
});
describe("parse", function () {
    it("empty object", function () {
        expect((0, utils_1.parseRows)({})).toEqual([
            [
                {
                    key: undefined,
                    colSpan: 1,
                    rowSpan: 1,
                    value: {},
                    isLeaf: true,
                },
            ],
        ]);
        expect((0, utils_1.parseRows)([])).toEqual([
            [
                {
                    isLeaf: true,
                    key: undefined,
                    colSpan: 1,
                    rowSpan: 1,
                    value: [],
                },
            ],
        ]);
    });
    it("nested object", function () {
        var rows = (0, utils_1.parseRows)({
            a: 1,
            b: { a: 1, b: 2 },
            c: [1, 2, 3],
        });
        expect(rows.length).toBe(6);
        expect(rows[0][0].colSpan).toBe(2);
        expect(rows[1][0].rowSpan).toBe(2);
        expect(rows[4][1].isLeaf).toBe(true);
    });
});
