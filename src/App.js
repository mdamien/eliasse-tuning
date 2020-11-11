import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import Amendement from './Amendement';
import TexteAmendé from './TexteAmendé';
import SommaireDiscussion from './SommaireDiscussion';
import DATA from './data'
import {fetch, fetchAmendement, fetchSuiviAuto} from './fetch'
import {currAmdtIndex} from './utils'


function loadPreviousAmendement() {
  fetchAmendement(DATA.amendements[currAmdtIndex()-1].numero)
}

function loadNextAmendement() {
  fetchAmendement(DATA.amendements[currAmdtIndex()+1].numero)
}

function toggleSuiviAuto() {
  DATA.suiviAuto = !DATA.suiviAuto
  fetchSuiviAuto()
  render()
}


function App() {
  return (
    <div id="app">
      <div id="left-column">
        <center>
          {currAmdtIndex() > 0 ? <button onClick={loadPreviousAmendement} title="Amendement précédent">⬅️</button> : null}
          <button onClick={toggleSuiviAuto} title="Suivi automatique">{DATA.suiviAuto ? '⏸️': '▶️'}</button>
          {DATA.amendements.length-1 > currAmdtIndex()+1 ? <button onClick={loadNextAmendement} title="Amendement suivant">➡️</button> : null}
          </center>
        <Amendement data={DATA.amendements[currAmdtIndex()]}/>
      </div>
      <div id="text-column">
        <center><h3>Texte n°{DATA.discussion.bibard} amendé par l'amendement n°{DATA.amendements[currAmdtIndex()].numero}</h3></center>
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
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

export default render
