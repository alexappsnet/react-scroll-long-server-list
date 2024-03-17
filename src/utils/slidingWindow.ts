export const ROW_HEIGHT = 12;

export function calcSlidingWindow(
  scrollPos: number,
  recordsBeforeAfterVisible: number,
  totalRecordsOnServer: number,
  containerWindowHeight: number
) {
  let windowTop = scrollPos - (scrollPos % ROW_HEIGHT) - ROW_HEIGHT * recordsBeforeAfterVisible;
  let rowIndex = Math.floor(windowTop / ROW_HEIGHT);
  if (rowIndex < 0) {
    windowTop += (-rowIndex * ROW_HEIGHT);
    rowIndex = Math.floor(windowTop / ROW_HEIGHT);
  }
  const visibleRecords = Math.ceil(containerWindowHeight / ROW_HEIGHT);
  const totalRecordsInSlidingWindow = Math.max(0, 2 * recordsBeforeAfterVisible + visibleRecords);
  const indexOffset = Math.min(0, recordsBeforeAfterVisible) + rowIndex;

  return {
    indexOffset,
    windowTop,
    rowCount: Math.min(Math.max(0, totalRecordsOnServer - indexOffset), totalRecordsInSlidingWindow + 1),
  };
}
