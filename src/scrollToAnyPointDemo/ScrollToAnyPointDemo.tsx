import React, {useEffect, useRef, useState} from 'react';
import styles from './STAPD.module.css';
import {ScrollToAnyPointProps} from "../scrollToAnyPoint/ScrollToAnyPoint";
import RowHints from "./RowHints";
import RedHighlight from "./RedHighlight";
import SlidingWindow from "../components/SlidingWindow";

export function ScrollToAnyPointDemo({recordsBeforeAfterVisible}: ScrollToAnyPointProps) {
  const total = 200;
  let containerWindow = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(-1);

  useEffect(
    () => {
      let div = containerWindow.current;
      const listener = () => {
        div && setScrollPos(div.scrollTop);
      }
      listener()
      div?.addEventListener('scroll', listener);
      return () => div?.removeEventListener('scroll', listener);
    },
    [containerWindow]
  );

  return (
    <div>
      <h3>Demo For Sliding Window (total: {total})</h3>
      <div className={styles.containerWindow} ref={containerWindow}>
        <RowHints total={total ?? 0} recordsBeforeAfterVisible={recordsBeforeAfterVisible}/>
        
        <SlidingWindow
          parentDivHeight={containerWindow.current?.clientHeight ?? 10}
          total={total ?? 1000}
          scrollPos={scrollPos}
          recordsBeforeAfterVisible={recordsBeforeAfterVisible}
          style={{left: "60px", right: "20px"}}
          rowComponent={(index, id) => (
            <div
              className={"recordRow " + styles.shadow}
              key={id}
            >
              {index}: record {id}
            </div>
          )}
        />

        <RedHighlight fillerRows={recordsBeforeAfterVisible}/>
      </div>
    </div>
  );
}
