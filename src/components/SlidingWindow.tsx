import {Record} from "../api/serverAPI";
import React, {ReactElement} from "react";
import {intArray} from "../utils/intArray";
import styles from "./SlidingWindow.module.css";
import {calcSlidingWindow} from "../utils/slidingWindow";

interface SlidingWindowProps {
  parentDivHeight: number,
  scrollPos: number;
  recordsBeforeAfterVisible: number;
  recordAccessor?: (id: number) => Record | undefined,
  rowComponent: (index: number, id: number, record?: Record) => ReactElement,
  total: number;
  style?: { [name: string]: string | number }
}

const SlidingWindow = ({
                         parentDivHeight,
                         scrollPos,
                         recordAccessor,
                         rowComponent,
                         recordsBeforeAfterVisible,
                         total,
                         style = {}
                       }: SlidingWindowProps) => {
  let windowData = calcSlidingWindow(
    scrollPos,
    recordsBeforeAfterVisible,
    total,
    parentDivHeight
  );
  return (
    <div className={styles.slidingWindow} style={{top: windowData.windowTop + "px", ...style}}>
      {intArray(windowData.rowCount).map(i => {
        const id = windowData.indexOffset + i + 1;
        return rowComponent(i, id, recordAccessor?.call(undefined, id));
      })}
    </div>
  );
}

export default SlidingWindow
