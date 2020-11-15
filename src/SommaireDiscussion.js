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

function SommaireDiscussion() {
  const selectedAmdtRef = useRef();

  useEffect(() => {
    if (selectedAmdtRef.current) {
      selectedAmdtRef.current.scrollIntoView()
    }
  });

  return (
   <div style={{padding:10}}>
      <ul>
       {DATA.amdts_derouleur ? DATA.amdts_derouleur.map(amdt => {
         var amdt_span = <span>
            Amdt n°{amdt.numero} de {amdt.auteurLabel} 
            {amdt.auteurGroupe ? <span> ({amdt.auteurGroupe})</span> : null}
         </span>
         if (DATA.prochainADiscuter.numAmdt === amdt.numero) {
          amdt_span = <strong>{amdt_span} - en discussion</strong>
         }
         return <li onClick={selectAmdt.bind(null, amdt.numero)} key={amdt.numero}>
              {DATA.amendements[currAmdtIndex()].numeroLong === amdt.numero || DATA.amendements[currAmdtIndex()].numero === amdt.numero ?
                <u ref={selectedAmdtRef}>{amdt_span}</u>
              : amdt_span
              }
            </li>
       }) : null}
   </ul>
   </div>
  );
}

export default SommaireDiscussion;
