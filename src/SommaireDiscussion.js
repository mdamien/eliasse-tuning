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

// TODO: test this
function groupedByIdentiqueAndDiscussionCommune() {
  var result = []
  var current_group_identique = []
  var current_group_commune = []
  DATA.amdts_derouleur.forEach(amdt => {
    if (!amdt.discussionIdentique && !amdt.discussionCommune) {
      if (current_group_identique.length > 0) {
        if (current_group_commune.length > 0) {
          current_group_commune.push({
            _type: 'identique',
            amdts: current_group_identique
          })
          current_group_identique = []
        } else {
          result.push({
            _type: 'identique',
            amdts: current_group_identique
          })
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

      result.push(amdt)
      return
    }
    if (amdt.discussionCommune) {
      current_group_commune.push(amdt)
    }
    if (amdt.discussionIdentique) {
      current_group_identique.push(amdt)
    }
  })
  return result
}

function renderAmdt(amdt, level) {
   var amdt_span = <span>
      {level == 1 ? '-- ': ''}
      {level == 2 ? '---- ': ''}
      Amdt n°{amdt.numero} {amdt.auteurLabel == "Gouvernement" ? 'du' : 'de'} {amdt.auteurLabel} 
      {amdt.auteurGroupe ? <span> ({amdt.auteurGroupe})</span> : null} {amdt.discussionIdentique}
   </span>
   if (DATA.prochainADiscuter.numAmdt === amdt.numero) {
    amdt_span = <strong>{amdt_span} - en discussion</strong>
   }
   return <li className="amdt-line" onClick={selectAmdt.bind(null, amdt.numero)} key={amdt.numero}>
        {DATA.amendements[currAmdtIndex()].numeroLong === amdt.numero
          || DATA.amendements[currAmdtIndex()].numero === amdt.numero
          || DATA.amendements[currAmdtIndex()].numeroReference === amdt.numero ?
          <u>{amdt_span}</u>
        : amdt_span
        }
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
            return renderAmdt(group, 0)
          }
          if (group._type === 'identique') {
            return <li key={JSON.stringify(group)}>
              <br/>
              Identiques:
              <ul>
                {group.amdts.map(amdt => renderAmdt(amdt, 1))}
              </ul>
            </li>
          }
          if (group._type === 'commune') {
            return <li key={JSON.stringify(group)}>
              <br/>
              Discussion commune:
              <ul>
                {group.amdts.map(group => {
                  if (!group._type) {
                    return renderAmdt(group, 1)
                  }
                  if (group._type === 'identique') {
                    return <li key={JSON.stringify(group)}>
                      <br/>
                      -- Identiques:
                      <ul>
                        {group.amdts.map(amdt => renderAmdt(amdt, 2))}
                      </ul>
                      <br/>
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
