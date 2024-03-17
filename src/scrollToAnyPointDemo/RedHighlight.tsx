import styles from "./STAPD.module.css";
import React from "react";
import {ROW_HEIGHT} from "../utils/slidingWindow";

const RedHighlight = ({fillerRows}: {
  fillerRows: number;
}) => {
  const topDiv = (fillerRows < 0) ? (
    <div
      className={styles.edgeLane}
      style={{
        top: 0,
        height: (-fillerRows * ROW_HEIGHT) + "px"
      }}>
    </div>
  ) : (
    <></>
  )

  const bottomDiv = (fillerRows < 0) ? (
    <div
      className={styles.edgeLane}
      style={{
        top: (200 + fillerRows * ROW_HEIGHT) + "px",
        height: (-fillerRows * ROW_HEIGHT) + "px",
      }}>
    </div>
  ) : (
    <></>
  )

  return <>
    {topDiv}
    {bottomDiv}
  </>
}

export default RedHighlight;
