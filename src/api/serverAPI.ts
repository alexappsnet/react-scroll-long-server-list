import {intArray} from "../utils/intArray";

const SERVER_RESPONSE_DELAY = 1000;

export interface Record {
  index: number;
  data: string;
}

export interface ServerResponse {
  records: Record[];
  total?: number;
}

export function fetchRecordsByIds(ids: number[]) {
  // This promise mimics the server request for the records by ids
  return new Promise<ServerResponse>((resolve) => {
    console.log(`Requesting API for ids=${JSON.stringify(ids)}...`);
    resolveLater(ids, resolve, 500000);
  });
}

export function fetchRecordsAfterId(batchSize: number, lastKnownId: number) {
  // This promise mimics the server request for the batch of records
  return new Promise<ServerResponse>((resolve) => {
    console.log(`Requesting API for lastKnownId=${lastKnownId}...`);
    const firstId = lastKnownId + 1;
    const ids = intArray(batchSize)
      .map(i => firstId + i)
      .filter(i => i <= 45);
    resolveLater(ids, resolve);
  });
}

function resolveLater(
  ids: number[],
  resolve: (value: (PromiseLike<ServerResponse> | ServerResponse)) => void,
  total?: number
) {
  setTimeout(
    () => {
      const records = ids.map(getRecord);
      resolve({records, total: total});
    },
    SERVER_RESPONSE_DELAY
  );
}

function getRecord(index: number): Record {
  return {
    index,
    data: `Server data for ${index}`
  };
}
