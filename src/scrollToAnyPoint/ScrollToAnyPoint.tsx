import React, {useEffect, useRef, useState} from 'react';

import styles from './STAP.module.css';
import RecordRow from "../components/RecordRow";
import {intArray} from "../utils/intArray";
import SlidingWindow from "../components/SlidingWindow";
import {calcSlidingWindow} from "../utils/slidingWindow";
import LongDiv from "../components/LongDiv";
import useApiData from './useApiData';

const DELAY_BEFORE_API_REQUEST = 500;

export interface ScrollToAnyPointProps {
  recordsBeforeAfterVisible: number;
}

export function ScrollToAnyPoint({recordsBeforeAfterVisible}: ScrollToAnyPointProps) {
  const {recordsById, total, loadAsync, reset} = useApiData();
  let containerWindow = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(
    () => {
      const timerId = window.setTimeout(
        () => {
          let div = containerWindow.current
          if (div) {
            const windowData = calcSlidingWindow(
              scrollPos,
              recordsBeforeAfterVisible,
              total ?? 1000,
              div.clientHeight
            )

            const visibleRowIds = intArray(windowData.rowCount).map(i => windowData.indexOffset + i + 1);
            let missingDataIds: number[] = []
            for (const id of visibleRowIds) {
              if (!recordsById[id]) {
                missingDataIds.push(id)
              }
            }
            if (missingDataIds.length) {
              void loadAsync(missingDataIds)
            }
          }
        },
        DELAY_BEFORE_API_REQUEST
      );

      return () => window.clearTimeout(timerId)
    },
    [loadAsync, scrollPos, recordsById, total, recordsBeforeAfterVisible]
  );

  useEffect(
    () => {
      let div = containerWindow.current

      const listener = () => {
        div && setScrollPos(div.scrollTop)
      }

      div?.addEventListener('scroll', listener);

      return () => div?.removeEventListener('scroll', listener)
    },
    [containerWindow]
  );

  return (
    <div>
      <h5>Loaded {Object.keys(recordsById).length} records, {total ?? '?'} total on server</h5>
      <button onClick={reset}>Reset</button>
      <div className={styles.containerWindow} ref={containerWindow}>
        <LongDiv rows={total ?? 1000}/>
        <SlidingWindow
          parentDivHeight={containerWindow.current?.clientHeight ?? 10}
          total={total ?? 1000}
          scrollPos={scrollPos}
          recordsBeforeAfterVisible={recordsBeforeAfterVisible}
          rowComponent={(index, id, record) => (
            <RecordRow
              key={id}
              id={id}
              record={record}
            />
          )}
          recordAccessor={id => recordsById[id]}
        />
      </div>
    </div>
  );
}
