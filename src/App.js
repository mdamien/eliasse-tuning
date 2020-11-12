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
  DATA.suiviAuto = false
  render()
  fetchAmendement(DATA.amendements[currAmdtIndex()-1].numero)
}

function loadNextAmendement() {
  DATA.suiviAuto = false
  render()
  fetchAmendement(DATA.amendements[currAmdtIndex()+1].numero)
}

function toggleSuiviAuto() {
  DATA.suiviAuto = !DATA.suiviAuto
  fetchSuiviAuto()
  render()
}

function toggleAfficherTexteAmendé() {
  DATA.afficherTexteAmendé = !DATA.afficherTexteAmendé
  render()
}

function changeText(event) {
  DATA.currentText = event.target.value
  fetch()
}

function App() {
  return (
    <div id="app">
      <div id="title">
        <div style={{float:'left', height: '30px', display: 'flex', marginLeft: 20}}><span style={{margin: 'auto'}}>Dérouleur d'amendements</span></div>
        {DATA.organes ?
            <select onChange={changeText}>
              {DATA.organes.map(org => {
                if (org.textes) {
                  return org.textes.map(texte =>
                    <option key={texte.textBibard + texte.textBibardSuffixe} value={texte.textBibard + '|' + texte.textBibardSuffixe + '|' + org.value}>
                      {org.text} - {texte.textTitre} ({texte.textBibard})
                    </option>
                  )
                }
                return null
              })}
            </select>
        : null}
      </div>
      <div id="left-column" className={DATA.afficherTexteAmendé ? '' : 'full'}>
        <div style={{float: 'right'}}>
          <button onClick={toggleAfficherTexteAmendé}>
            {DATA.afficherTexteAmendé ? 'Cacher' : 'Afficher'} le texte amendé
          </button>
        </div>
        <center>
          {currAmdtIndex() > 0 ? <button onClick={loadPreviousAmendement} title="Amendement précédent">Précédent</button> : null}
          <button onClick={toggleSuiviAuto} title="Suivi automatique">{DATA.suiviAuto ? 'Désactiver le suivi automatique': 'Activer le suivi automatique'}</button>
          {DATA.amendements.length-1 > currAmdtIndex()+1 ? <button onClick={loadNextAmendement} title="Amendement suivant">Suivant</button> : null}
        </center>
        <Amendement data={DATA.amendements[currAmdtIndex()]}/>
      </div>
      {DATA.afficherTexteAmendé ?
        <div id="text-column">
          <TexteAmendé/>
        </div>
        : null }
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
