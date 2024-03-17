import {Record} from "../api/serverAPI";

const RecordRow = ({id, record}: { id: number, record?: Record }) => {
  if (record) {
    return (
      <div className="recordRow">
        {record.index} | {record.data}
      </div>
    );
  } else {
    return (
      <div className="recordRow grayish">
        Loading {id}...
      </div>
    );
  }
}

export default RecordRow;
