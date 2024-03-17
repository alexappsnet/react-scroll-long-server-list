import {fetchRecordsByIds, Record} from "../api/serverAPI";
import {useCallback, useState} from "react";

interface ScrollToAnyPointState {
  recordsById: { [name: string]: Record };
  total?: number,
  status: 'idle' | 'loading';
}

const initialState: ScrollToAnyPointState = {
  recordsById: {},
  total: undefined,
  status: 'idle',
};

const useApiData = () => {
  const [recordsById, setRecordsById] = useState(initialState.recordsById)
  const [total, setTotal] = useState(initialState.total)
  const [status, setStatus] = useState(initialState.status)

  const loadAsync = useCallback(async (ids: number[]) => {
    setStatus('loading');

    const response = await fetchRecordsByIds(ids);
    let newRecords = {...recordsById}
    response.records.forEach(r => {
      newRecords[r.index] = r;
    })
    setRecordsById(newRecords);
    setTotal(response.total);
    setStatus('idle');
  }, [recordsById]);

  const reset = () => {
    setRecordsById(initialState.recordsById);
    setTotal(initialState.total);
    setStatus(initialState.status);
  };

  return {recordsById, total, status, loadAsync, reset}
}

export default useApiData
