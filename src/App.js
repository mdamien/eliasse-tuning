import './App.css';
import Amendement from './Amendement';
import TexteAmendé from './TexteAmendé';
import SommaireDiscussion from './SommaireDiscussion';

function App() {
  return (
    <div id="app">
      <div id="left-column">
        <Amendement/>
        <Amendement/>
        <Amendement/>
      </div>
      <div id="text-column">
        <TexteAmendé/>
      </div>
      <div id="discussion-column">
        <SommaireDiscussion/>
      </div>
    </div>
  );
}

export default App;
