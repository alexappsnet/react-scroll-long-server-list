import styles from "./STAPD.module.css";
import {intArray} from "../utils/intArray";
import React from "react";
import {ROW_HEIGHT} from "../utils/slidingWindow";

const RowHints = ({total, recordsBeforeAfterVisible}: {
  total: number;
  recordsBeforeAfterVisible: number;
}) => {
  const fillerRowsOnOneSide = recordsBeforeAfterVisible >= 0 ? 0 : -recordsBeforeAfterVisible;
  const allRows = 2 * fillerRowsOnOneSide + total;
  return (
    <div
      className={styles.innerLongDiv}
      style={{height: `${ROW_HEIGHT * allRows}px`}}
    >
      {intArray(allRows).map(i => (
        <div
          className={"recordRow " + styles.shadow}
          key={i}
        >
          {i + 1 - fillerRowsOnOneSide}
        </div>
      ))}
    </div>
  );
}

export default RowHints;
