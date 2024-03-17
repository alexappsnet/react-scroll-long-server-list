import React from "react";
import style from './ServerStatus.module.css'

function ServerStatus({hasMore, status}: { hasMore: boolean, status: string }) {
  if (status === "loading") {
    return <div className={style.status}>...loading more...</div>;
  } else if (!hasMore) {
    return <div className={style.status}>...done, no more data on server</div>;
  } else {
    return <></>;
  }
}

export default ServerStatus;
