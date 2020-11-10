import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import Amendement from './Amendement';
import TexteAmendé from './TexteAmendé';
import SommaireDiscussion from './SommaireDiscussion';

import DATA from './data'

function App() {
  return (
    <div id="app">
      <div id="left-column">
        {DATA.amendements ? DATA.amendements.map(amdt => 
          <Amendement data={amdt}/>
          ) : null}
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

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

export default render;
