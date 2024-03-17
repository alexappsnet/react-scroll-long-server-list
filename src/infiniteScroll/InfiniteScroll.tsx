import React, {useEffect, useRef} from 'react';

import styles from './IS.module.css';
import RecordRow from "../components/RecordRow";
import ServerStatus from "../components/ServerStatus";
import useApiData from "../pagingScroll/useApiData";

export function InfiniteScroll() {
  const {records, hasMore, status, loadAsync, reset} = useApiData();
  let containerWindow = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      let div = containerWindow.current;
      const listener = () => {
        if (div && div.scrollHeight - div.clientHeight - div.scrollTop < 10 && hasMore && status !== "loading") {
          void loadAsync(records[records.length - 1]?.index || -1);
        }
      }

      const timerId = window.setTimeout(listener, 0);
      div?.addEventListener('scroll', listener);

      return () => {
        div?.removeEventListener('scroll', listener);
        window.clearTimeout(timerId);
      }
    },
    [loadAsync, records, status, hasMore, containerWindow]
  );

  return (
    <div>
      <h5>Loaded {records.length} records, {hasMore ? "MIGHT BE MORE" : "ALL LOADED"}</h5>
      <button onClick={reset}>Reset</button>
      <div className={styles.containerWindow} ref={containerWindow}>
        {records.map(record => (
          <RecordRow
            key={record.index}
            id={record.index}
            record={record}
          />
        ))}
        
        <ServerStatus hasMore={hasMore} status={status}/>
      </div>
    </div>
  );
}
