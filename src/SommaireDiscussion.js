import DATA from './data'
import {fetchAmendement, fetchDivision} from './fetch'
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

function changeDivision(event) {
  DATA.suiviAuto = false
  render()
  fetchDivision(event.target.value)
}

function groupedByIdentiqueAndDiscussionCommune() {
  var result = []
  var current_group_identique = []
  var current_group_commune = []

  function push() {
    if (current_group_identique.length > 0) {
      if (current_group_commune.length > 0) {
        if (current_group_identique.length == 1) {
          current_group_commune.push(current_group_identique[0])
        } else {
          current_group_commune.push({
            _type: 'identique',
            amdts: current_group_identique
          })
        }
        current_group_identique = []
      } else {
        if (current_group_identique.length == 1) {
          result.push(current_group_identique[0])
        } else {
          result.push({
            _type: 'identique',
            amdts: current_group_identique
          })
        }
        current_group_identique = []
      }
    }
    if (current_group_commune.length > 0) {
      result.push({
        _type: 'commune',
        amdts: current_group_commune,
      })
      current_group_commune = []
    }
  }

  DATA.amdts_derouleur.forEach(amdt => {
    if (!amdt.discussionIdentique && !amdt.discussionCommune) {
      push()
      result.push(amdt)
      return
    }
    if (amdt.discussionCommune) {
      // todo consecutive discussion commune
      current_group_commune.push(amdt)
    }
    if (amdt.discussionIdentique) {
      // todo consecutive identiques
      current_group_identique.push(amdt)
    }
  })
  push()
  return result
}

function renderAmdt(amdt) {
   var amdt_span = <span>
      {amdt.parentNumero !== 'X' && amdt.parentNumero ? 'Sous-':''}Amdt n°{amdt.numero} {amdt.auteurLabel == "Gouvernement" ? 'du' : 'de'} {amdt.auteurLabel} 
      {amdt.auteurGroupe ? <span> ({amdt.auteurGroupe})</span> : null}
   </span>
   if (DATA.prochainADiscuter.numAmdt === amdt.numero) {
    amdt_span = <strong>{amdt_span} - en discussion</strong>
   }
   var current = DATA.amendements[currAmdtIndex()].numeroLong === amdt.numero
          || DATA.amendements[currAmdtIndex()].numero === amdt.numero
          || DATA.amendements[currAmdtIndex()].numeroReference === amdt.numero
   return <li className={"amdt-line" + (current ? ' current': '')}
          onClick={selectAmdt.bind(null, amdt.numero)} key={amdt.numero}>
        {amdt_span}
      </li>
}

function SommaireDiscussion() {
  console.log(DATA)

  return (
   <div style={{padding:10}}>
      <b>Division:</b> <select onChange={changeDivision} value={DATA.amdts_derouleur[0].position}>
        {DATA.discussion.divisions.map(div =>
            <option
              key={div.position}
              value={div.position}>
              {div.place}
            </option>
        )}
      </select>
      <ul>
       {groupedByIdentiqueAndDiscussionCommune().map(group => {
          if (!group._type) {
            return renderAmdt(group)
          }
          if (group._type === 'identique') {
            return <li key={JSON.stringify(group)}>
              <i>Id</i>
              <ul className="discussion-identique">
                {group.amdts.map(amdt => renderAmdt(amdt))}
              </ul>
            </li>
          }
          if (group._type === 'commune') {
            return <li key={JSON.stringify(group)}>
              <i>Dc</i>
              <ul className="discussion-commune">
                {group.amdts.map(group => {
                  if (!group._type) {
                    return renderAmdt(group)
                  }
                  if (group._type === 'identique') {
                    return <li key={JSON.stringify(group)}>
                      <i>Id</i>
                      <ul className="discussion-identique">
                        {group.amdts.map(amdt => renderAmdt(amdt))}
                      </ul>
                    </li>
                  }
                })}
              </ul>
            </li>
          }
       })}
   </ul>
   </div>
  );
}

export default SommaireDiscussion;
