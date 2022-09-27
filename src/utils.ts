import isEmpty from "lodash/isEmpty";
import last from "lodash/last";
import max from "lodash/max";
import sumBy from "lodash/sumBy";

export type Pair = {
  key?: string;
  value: any;
  rowSpan: number;
  colSpan: number;
  isLeaf?: boolean;
};

export function isLeaf(val: any) {
  return !val || typeof val !== "object" || isEmpty(val);
}

export function parseRows(json: any) {
  const metrics: Pair[][] = [];
  let nextRow = 0;
  let nextCol = 0;
  function traverse(params: any) {
    return Object.keys(params).map((key, index) => {
      if (!metrics[nextRow]) {
        metrics[nextRow] = [];
      }
      const val = params[key];
      const pair: Pair = {
        key: key,
        value: val,
        colSpan: 1,
        rowSpan: 1,
        isLeaf: isLeaf(val),
      };
      metrics[nextRow][nextCol] = pair;
      if (isLeaf(val)) {
        nextRow++;
      } else {
        nextCol++;
        const pairs = traverse(val);
        pair.rowSpan = sumBy(pairs, "rowSpan");
        nextCol--;
      }
      return pair;
    });
  }

  if (isLeaf(json)) {
    metrics[0] = [];
    metrics[0][0] = {
      key: undefined,
      value: json,
      colSpan: 1,
      rowSpan: 1,
      isLeaf: true,
    };
  } else {
    traverse(json);
  }

  const len = max(metrics.map((row) => row.length)) || 0;
  metrics.forEach((row) => {
    const pair = last(row);
    if (pair) {
      pair.colSpan = len - row.length + 1;
    }
  });

  return metrics.map((row) => [...row]);
}
