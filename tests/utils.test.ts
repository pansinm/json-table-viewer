import { isLeaf, parseRows } from "../src/utils";

describe("isLeaf", () => {
  it("empty object is leaf", () => {
    expect(isLeaf({})).toBe(true);
    expect(isLeaf([])).toBe(true);
  });
  it("falsy var is leaf", () => {
    expect(isLeaf(null)).toBe(true);
  });
  it("primary type is leaf", () => {
    expect(isLeaf(3)).toBe(true);
  });
  it("when object contains key then isLeaf return false", () => {
    expect(isLeaf({ a: 1 })).toBe(false);
    expect(isLeaf([1, 2])).toBe(false);
  });
});

describe("parse", () => {
  it("empty object", () => {
    expect(parseRows({})).toEqual([
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
    expect(parseRows([])).toEqual([
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
  it("nested object", () => {
    const rows = parseRows({
      a: 1,
      b: { a: 1, b: 2 },
      c: [1,2,3],
    });
    expect(rows.length).toBe(6);
    expect(rows[0][0].colSpan).toBe(2);
    expect(rows[1][0].rowSpan).toBe(2);
    expect(rows[4][1].isLeaf).toBe(true);
  });
});
