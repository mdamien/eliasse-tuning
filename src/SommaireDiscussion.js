import DATA from './data'
import {fetchAmendement, fetchDivision} from './fetch'
import {currAmdtIndex} from './utils'
import { useEffect, useRef } from 'react';
import render from './App';


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
  var current_group_commune = []

  var push = () => {
    if (current_group_commune.length > 0) {
      result.push({
        _type: 'commune',
        amdts: current_group_commune,
      })
      current_group_commune = []
    }
  }

  DATA.amdts_derouleur.forEach(amdt => {
    if (!amdt.discussionCommune) {
      push()
      result.push(amdt)
      return
    }
    else {
      if (current_group_commune.length > 0
          && current_group_commune[0].discussionCommune != amdt.discussionCommune) {
        push()
      }
      current_group_commune.push(amdt)
    }
  })
  push()

  var grouped_by_discussion_commune = result
  var current_group_identique = []
  result = []

  push = () => {
    if (current_group_identique.length > 0) {
      result.push({
        _type: 'identique',
        amdts: current_group_identique,
      })
      current_group_identique = []
    }
  }

  grouped_by_discussion_commune.forEach(group => {
    if (!group._type) {
      var amdt = group
      if (!amdt.discussionIdentique) {
        push()
        result.push(amdt)
        return
      }
      else {
        if (current_group_identique.length > 0
            && current_group_identique[0].discussionIdentique != amdt.discussionIdentique) {
          push()
        }
        current_group_identique.push(amdt)
      }
    } else {
      var new_group_amdts = []

      var pushInside = () => {
        if (current_group_identique.length > 0) {
          new_group_amdts.push({
            _type: 'identique',
            amdts: current_group_identique,
          })
          current_group_identique = []
        }
      }

      group.amdts.forEach(amdt => {
        if (!amdt.discussionIdentique) {
          pushInside()
          new_group_amdts.push(amdt)
          return
        }
        else {
          if (current_group_identique.length > 0
              && current_group_identique[0].discussionIdentique != amdt.discussionIdentique) {
            pushInside()
          }
          current_group_identique.push(amdt)
        }
      })
      pushInside()
      group.amdts = new_group_amdts
      result.push(group)
    }
  })
  push()

  return result
}

function renderAmdt(amdt) {
   var amdt_span = <span>
      {amdt.parentNumero !== 'X' && amdt.parentNumero ? 'Sous-Amdt':''} {amdt.numero} {amdt.auteurLabel == "Gouvernement" ? 'du' : 'de'} {amdt.auteurLabel} 
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
