import DATA from './data'
import {fetchAmendement} from './fetch'
import {currAmdtIndex} from './utils'
import { useEffect, useRef } from 'react';
import render from './App';

function comparePositions(pos1, pos2) {
   var pos1_0 = parseInt(pos1.split('/')[0])
   var pos1_1 = parseInt(pos1.split('/')[1])
   var pos2_0 = parseInt(pos2.split('/')[0])
   var pos2_1 = parseInt(pos2.split('/')[1])

   if (pos1_1 > pos2_1) {
      return true
   }
   if (pos1_1 === pos2_1) {
      return pos1_0 >= pos2_0
   }
   return false
}

function selectAmdt(num) {
  DATA.suiviAuto = false
  render()
  fetchAmendement(num)
}

function hasPrevDivision() {
  var div = DATA.amdts_derouleur[0].place
  for (var i = 0; i < DATA.discussion.divisions.length; i++) {
    if (DATA.discussion.divisions[i].place === div) {
      return i > 0
    }
  }
}

function hasNextDivision() {
  var div = DATA.amdts_derouleur[0].place
  for (var i = 0; i < DATA.discussion.divisions.length; i++) {
    if (DATA.discussion.divisions[i].place === div) {
      return i < DATA.discussion.divisions.length - 1
    }
  }
}

function SommaireDiscussion() {
  console.log(DATA)

  return (
   <div style={{padding:10}}>
       {hasPrevDivision() ? <button>prev</button> : null}
       {DATA.amdts_derouleur ? DATA.amdts_derouleur[0].place : null}
       {hasNextDivision() ? <button>suiv</button> : null}
      <ul>
       {DATA.amdts_derouleur ? DATA.amdts_derouleur.map(amdt => {
         var amdt_span = <span>
            Amdt n°{amdt.numero} {amdt.auteurLabel == "Gouvernement" ? 'du' : 'de'} {amdt.auteurLabel} 
            {amdt.auteurGroupe ? <span> ({amdt.auteurGroupe})</span> : null}
         </span>
         if (DATA.prochainADiscuter.numAmdt === amdt.numero) {
          amdt_span = <strong>{amdt_span} - en discussion</strong>
         }
         return <li onClick={selectAmdt.bind(null, amdt.numero)} key={amdt.numero}>
              {DATA.amendements[currAmdtIndex()].numeroLong === amdt.numero
                || DATA.amendements[currAmdtIndex()].numero === amdt.numero
                || DATA.amendements[currAmdtIndex()].numeroReference === amdt.numero ?
                <u>{amdt_span}</u>
              : amdt_span
              }
            </li>
       }) : null}
   </ul>
   </div>
  );
}

export default SommaireDiscussion;
