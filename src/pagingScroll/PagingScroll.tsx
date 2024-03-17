import React, {useEffect} from 'react';
import styles from './PS.module.css';
import RecordRow from "../components/RecordRow";
import ServerStatus from "../components/ServerStatus";
import useApiData from "./useApiData";

export function PagingScroll() {
  const {records, hasMore, status, reset, loadAsync} = useApiData();

  useEffect(
    () => {
      const timerId = window.setTimeout(() => {
        if (records.length === 0 && hasMore && status !== "loading") {
          void loadAsync(-1);
        }
      }, 0);
      return () => window.clearTimeout(timerId);
    },
    [loadAsync, records, hasMore, status]
  );

  const onLoadMoreClicked = () => {
    let lastKnownId = records[records.length - 1]?.index || -1;
    void loadAsync(lastKnownId);
  }

  return (
    <div>
      <h5>Loaded {records.length} records, {hasMore ? "MIGHT BE MORE" : "ALL LOADED"}</h5>
      <button onClick={reset}>Reset</button>

      <div className={styles.containerWindow}>
        {records.map(record => (
          <RecordRow
            key={record.index}
            id={record.index}
            record={record}
          />
        ))}

        <ServerStatus hasMore={hasMore} status={status}/>

        {hasMore && (
          <button
            onClick={onLoadMoreClicked}
            disabled={status === "loading"}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
