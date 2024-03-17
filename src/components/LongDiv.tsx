import React, {ReactNode} from "react";
import {ROW_HEIGHT} from "../utils/slidingWindow";

interface LongDivProps {
  rows: number;
  children?: ReactNode;
}

const LongDiv = ({rows, children}: LongDivProps) => {
  return (
    <div style={{height: `${ROW_HEIGHT * (rows)}px`}}>
      {children && <>{children}</>}
    </div>
  );
}

export default LongDiv;
