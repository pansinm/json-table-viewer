import trim from "lodash/trim";
import type { CSSProperties, FC, ReactNode } from "react";
import React from "react";
import { parseRows } from "./utils";

type KeyRenderer = (key: string) => ReactNode;
type ValueRenderer = (value: any) => ReactNode;

export interface JsonToTableProps extends  React.TableHTMLAttributes<HTMLTableElement> {
  style?: CSSProperties;
  className?: string;
  json: object;
  renderKey?: KeyRenderer;
  renderValue?: ValueRenderer;
}

const defaultKeyRenderer = (key: string) => {
  return key;
};

const defaultValueRenderer = (value: any) => {
  return typeof value === "object" ? JSON.stringify(value) : value;
};

function renderRows(
  json: any,
  keyRenderer: KeyRenderer,
  valueRenderer: ValueRenderer
) {
  const rows = parseRows(json);

  return rows.map((row, index) => {
    return (
      <tr key={index}>
        {row.map((col) => {
          if (!col) {
            return;
          }
          const res = [];
          if (col.key !== undefined) {
            res.push(
              <td className="json-table-viewer__key" rowSpan={col.rowSpan}>
                {keyRenderer(col.key)}
              </td>
            );
          }
          if (col.isLeaf) {
            res.push(
              <td className="json-table-viewer__value" colSpan={col.colSpan}>
                {valueRenderer(col.value)}
              </td>
            );
          }
          return res;
        })}
      </tr>
    );
  });
}

const JSONTableViewer: FC<JsonToTableProps> = (props) => {
  const {
    json,
    className,
    renderKey = defaultKeyRenderer,
    renderValue: renderVal = defaultValueRenderer,
    ...rest
  } = props;

  const clz = trim([className || "", "json-table-viewer"].join(" "));
  return (
    <table className={clz} {...rest}>
      <tbody>{renderRows(json, renderKey, renderVal)}</tbody>
    </table>
  );
};

export default JSONTableViewer;
