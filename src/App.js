import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import Amendement from './Amendement';
import TexteAmendé from './TexteAmendé';
import SommaireDiscussion from './SommaireDiscussion';

import DATA from './data'
import {fetch, fetchAmendement} from './fetch'

function loadPreviousAmendement() {
  fetchAmendement(DATA.amendements[1].numero)
}

function loadNextAmendement() {
  fetchAmendement(DATA.amendements[3].numero)
}


function App() {
  return (
    <div id="app">
      <div id="left-column">
        <center>
          <button onClick={loadPreviousAmendement} title="Amendement précédent">⬅️</button>
          <button title="Suivi automatique">▶️</button>
          <button onClick={loadNextAmendement} title="Amendement suivant">➡️</button>
          </center>
        <Amendement key={DATA.amendements[0].numero} data={DATA.amendements[0]}/>
      </div>
      <div id="text-column">
        <center><h3>Texte n°{DATA.discussion.bibard} amendé par l'amendement n°{DATA.amendements[0].numero}</h3></center>
        <hr/>
        <TexteAmendé/>
      </div>
      <div id="discussion-column">
        <SommaireDiscussion/>
      </div>
    </div>
  )
}

function render() {
  console.log(DATA)
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

export default render
