import {ScrollToAnyPointDemo} from "./scrollToAnyPointDemo/ScrollToAnyPointDemo";
import {ScrollToAnyPoint} from "./scrollToAnyPoint/ScrollToAnyPoint";
import {InfiniteScroll} from "./infiniteScroll/InfiniteScroll";
import DisplayPanel from "./components/DisplayPanel";
import {PagingScroll} from "./pagingScroll/PagingScroll";

function App() {
  return (
    <div>
      <h1>Scrolling Demo</h1>

      <DisplayPanel title="Paging Scroll">
        <PagingScroll/>
      </DisplayPanel>

      <DisplayPanel title="Infinite Scroll">
        <InfiniteScroll/>
      </DisplayPanel>

      <DisplayPanel title="Scroll To Any Point">
        <ScrollToAnyPoint recordsBeforeAfterVisible={0}/>
      </DisplayPanel>

      <DisplayPanel title="Internals of Scroll To Any Point">
        <ScrollToAnyPointDemo recordsBeforeAfterVisible={-2}/>
      </DisplayPanel>
    </div>
  );
}

export default App;
