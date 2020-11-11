import DATA from './data'
import {fetch, fetchAmendement} from './fetch'

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

function changeText(event) {
  DATA.currentText = event.target.value
  fetch()
}

function SommaireDiscussion() {
  return (
   <div style={{padding:10}}>
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
    <br/>
    <br/>
    <ul>
      {DATA.discussion ? DATA.discussion.divisions.map((div, i) => <div key={div.position}>
        <li>
           <strong>- {div.place}</strong>
           <ul>
             {DATA.amdts_derouleur ? DATA.amdts_derouleur.map((amdt, j) => {
               var amdt_span = <span onClick={fetchAmendement.bind(null, DATA.amdts_derouleur[(j+2 < DATA.amdts_derouleur.length) ? j+2 : j].numero)}>
                  Amdt n°{amdt.numero} de {amdt.auteurLabel} 
                  {amdt.auteurGroupe ? <span> ({amdt.auteurGroupe})</span> : null}
               </span>
               if (DATA.prochainADiscuter.numAmdt === amdt.numero) {
                amdt_span = <strong>{amdt_span} (en discussion)</strong>
               }
               return (DATA.discussion.divisions[i+1] 
                     && comparePositions(amdt.position, div.position))
                     && comparePositions(DATA.discussion.divisions[i+1].position, amdt.position) ? 
                  <li key={amdt.numero}>
                    {DATA.amendements[0].numero === amdt.numero ?
                      <u>{amdt_span}</u>
                    : amdt_span
                    }
                  </li>
               : null
             }) : null}
           </ul>
         </li>
         <br/>
         </div>) : null}
    </ul>
   </div>
  );
}

export default SommaireDiscussion;
