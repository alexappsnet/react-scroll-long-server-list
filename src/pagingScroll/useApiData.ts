import {fetchRecordsAfterId, Record} from "../api/serverAPI";
import {useState} from "react";

interface PagingScrollState {
  records: Record[];
  hasMore: boolean,
  status: 'idle' | 'loading';
}

const initialState: PagingScrollState = {
  records: [],
  hasMore: true,
  status: 'idle',
};

const useApiData = () => {
  const [data, setData] = useState(initialState)

  const loadAsync = async (lastKnownId: number) => {
    setData({
      ...data,
      status: 'loading'
    })

    const response = await fetchRecordsAfterId(12, lastKnownId);
    setData({
      ...data,
      records: data.records.concat(response.records),
      hasMore: response.records.length > 0,
      status: 'idle'
    });
  };

  const reset = () => {
    setData(initialState);
  };

  return {...data, loadAsync, reset}
}

export default useApiData
