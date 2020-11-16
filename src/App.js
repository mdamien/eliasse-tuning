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
  fetchAmendement(DATA.amendements[currAmdtIndex()-1].numeroReference)
}

function loadNextAmendement() {
  DATA.suiviAuto = false
  render()
  fetchAmendement(DATA.amendements[currAmdtIndex()+1].numeroReference)
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

function toggleAfficherDerouleur() {
  DATA.afficherDerouleur = !DATA.afficherDerouleur
  render()
}

function changeText(event) {
  DATA.currentText = event.target.value
  fetch()
}

function toggleAfficherDiff() {
  DATA.afficherDiff = !DATA.afficherDiff
  DATA.afficherTexteAmendé = false
  render()
}

function App() {
  var linkLaFab = ''
  if (DATA.doslegLink) {
    linkLaFab = DATA.doslegLink.split('/')
    var legislature = DATA.doslegLink.split('/')
    legislature = legislature[legislature.length-3]
    linkLaFab = linkLaFab[linkLaFab.length-1]
    linkLaFab = "https://www.lafabriquedelaloi.fr/articles.html?loi=" + legislature+ "-" + linkLaFab
  }
  return (
    <div id="app" className={window.location.toString().indexOf("neon") !== -1 ? "neon" : ""}>
      <div id="title">
        <div className="title-left">
          <span>Dérouleur d'amendements</span>
        </div>
        <span className="title-middle">
          <button onClick={toggleSuiviAuto}>
            {DATA.suiviAuto ? 'Désactiver le suivi automatique': 'Activer le suivi automatique'}
          </button>
          {DATA.organes ?
              <select onChange={changeText} value={DATA.currentText}>
                {DATA.organes.map(org => {
                  if (org.textes) {
                    return org.textes.map(texte =>
                      <option
                        key={texte.textBibard + texte.textBibardSuffixe}
                        value={texte.textBibard + '|' + texte.textBibardSuffixe + '|' + org.value}>
                        {org.text} - {texte.textTitre} ({texte.textBibard + texte.textBibardSuffixe})
                      </option>
                    )
                  }
                  return null
                })}
              </select>
          : null}
          {DATA.doslegLink ? <a href={DATA.doslegLink}>dossier législatif</a> : null}
          {DATA.doslegLink ? <a href={linkLaFab}>dossier sur la fabrique de la loi</a> : null}
        </span>
      </div>
      {DATA.afficherDerouleur ?
      <div id="discussion-column">
        <SommaireDiscussion/>
      </div>
      : null}
      <div id="left-column" className={
        (DATA.afficherTexteAmendé || (DATA.afficherDiff && DATA.amendements[currAmdtIndex()].diff) ? '': 'no-text-column')
        + (DATA.afficherDerouleur ? '': ' no-discussion-column')
      }>
        <center>
          {currAmdtIndex() > 0 ? <button
            onClick={loadPreviousAmendement}
            title="Amendement précédent">Précédent
          </button> : null}
          {DATA.amendements.length > currAmdtIndex()+1 ? <button
            onClick={loadNextAmendement}
            title="Amendement suivant">Suivant
          </button> : null}
          <button onClick={toggleAfficherTexteAmendé}>
            {DATA.afficherTexteAmendé ? 'Cacher' : 'Afficher'} le texte amendé
          </button>
          {DATA.amendements[currAmdtIndex()].diff ? <button onClick={toggleAfficherDiff}>
            {DATA.afficherDiff ? 'Cacher' : 'Afficher'} l'aperçu
          </button> : null}
        </center>
        <Amendement data={DATA.amendements[currAmdtIndex()]}/>
      </div>
      {DATA.afficherTexteAmendé ?
        <div id="text-column">
          <TexteAmendé/>
        </div>
        : null }
      {DATA.afficherDiff && DATA.amendements[currAmdtIndex()].diff?
        <div id="text-column">
          <div style={{padding:10}}>
            <div id="texte" dangerouslySetInnerHTML={{__html: DATA.amendements[currAmdtIndex()].diff}} />
          </div>
        </div>
        : null }
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
