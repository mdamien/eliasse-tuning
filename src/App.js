import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import Amendement from './Amendement';
import TexteAmendé from './TexteAmendé';
import SommaireDiscussion from './SommaireDiscussion';

import DATA from './data'
import {fetch, fetchPrev, fetchNext} from './fetch'

function loadPreviousAmendement() {
  console.log('load previous')
  fetchPrev()
}

function loadNextAmendement() {
  console.log('load next')
  fetchNext()
}


function App() {
  return (
    <div id="app">
      <div id="left-column">
        <center><button onClick={loadPreviousAmendement}>charger l'amendement précédent</button></center>
        {DATA.amendements ? DATA.amendements.map(amdt => 
          <Amendement key={amdt.numero} data={amdt}/>
          ) : null}
        <center><button onClick={loadNextAmendement}>charger l'amendement suivant</button></center>
      </div>
      <div id="text-column">
        <center><h3>Texte amendé par l'amendement n°{DATA.amendements[0].numero}</h3></center>
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
