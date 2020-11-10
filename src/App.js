import './App.css';

var amendement = `
      <div class="amendement" style="border:4px solid black">
         <h1 style="text-align:center">Amendement n°204 (Rect)</h1>
         <p style="text-align:center">
            du Mme Luquet
         </p>
         <p style="text-align:center;font-weight:bold">
            ARTICLE 33
         </p>
         <p style="text-align:center;font-weight:bold">
            ÉTAT B
         </p>
         <p style="text-align:center;font-weight:bold">
            Mission « Écologie, développement et mobilité durables »
         </p>
         <div class="dispositifContenu">
            <div style="padding-left: 2cm;" align="justify">
               <p>
                  Modifier ainsi les autorisations d'engagement et les crédits de paiement :
               </p>
               <p>
               </p>
               <table style="white-space:normal;width:600px;" cellspacing="0" cellpadding="0">
                  <tbody>
                     <tr>
                        <td></td>
                        <td></td>
                        <td class="amdtCreditEnEuro">(en euros)</td>
                     </tr>
                     <tr height="50">
                        <td class="colonneGras" style="white-space:normal;width:50%;border-style:solid;border-width:1px;" valign="center" align="center">Programmes
                        </td>
                        <td class="colonneGras" style="white-space:normal;width:25%;border-style:solid;border-width:1px;" valign="center" align="center">+
                        </td>
                        <td class="colonneGras" style="white-space:normal;width:25%;border-style:solid;border-width:1px;" valign="center" align="center">-
                        </td>
                     </tr>
                     <tr>
                        <td class="amdtCreditProgLibelle" style="width:50%;padding-left:3px; padding-right:3px;border-left:1px solid; border-right:1px solid;" valign="center" align="left">Infrastructures et services de transports</td>
                        <td class="amdtCreditProgMt" style="padding-right:3px;width:25%; border-right: solid 1px;" valign="center" align="right">0</td>
                        <td class="amdtCreditProgMt" style="padding-right:3px;width:25%; border-right: solid 1px;" valign="center" align="right">0</td>
                     </tr>
                     <tr>
                        <td class="amdtCreditProgLibelle" style="width:50%;padding-left:3px; padding-right:3px;border-left:1px solid; border-right:1px solid;" valign="center" align="left">Affaires maritimes</td>
                        <td class="amdtCreditProgMt" style="padding-right:3px;width:25%; border-right: solid 1px;" valign="center" align="right">0</td>
                        <td class="amdtCreditProgMt" style="padding-right:3px;width:25%; border-right: solid 1px;" valign="center" align="right">0</td>
                     </tr>
                     <tr>
                        <td class="amdtCreditProgLibelle" style="width:50%;padding-left:3px; padding-right:3px;border-left:1px solid; border-right:1px solid;" valign="center" align="left">Paysages, eau et biodiversité</td>
                        <td class="amdtCreditProgMt" style="padding-right:3px;width:25%; border-right: solid 1px;" valign="center" align="right">0</td>
                        <td class="amdtCreditProgMt" style="padding-right:3px;width:25%; border-right: solid 1px;" valign="center" align="right">0</td>
                     </tr>
                     <tr>
                        <td class="amdtCreditProgLibelle" style="width:50%;padding-left:3px; padding-right:3px;border-left:1px solid; border-right:1px solid;" valign="center" align="left">Expertise, information géographique et météorologie</td>
                        <td class="amdtCreditProgMt" style="padding-right:3px;width:25%; border-right: solid 1px;" valign="center" align="right">0</td>
                        <td class="amdtCreditProgMt" style="padding-right:3px;width:25%; border-right: solid 1px;" valign="center" align="right">0</td>
                     </tr>
                     <tr>
                        <td class="amdtCreditProgLibelle" style="width:50%;padding-left:3px; padding-right:3px;border-left:1px solid; border-right:1px solid;" valign="center" align="left">Prévention des risques</td>
                        <td class="amdtCreditProgMt" style="padding-right:3px;width:25%; border-right: solid 1px;" valign="center" align="right">0</td>
                        <td class="amdtCreditProgMt" style="padding-right:3px;width:25%; border-right: solid 1px;" valign="center" align="right">0</td>
                     </tr>
                     <tr>
                        <td class="amdtCreditProgLibelle" style="width:50%;padding-left:3px; padding-right:3px;border-left:1px solid; border-right:1px solid;" valign="center" align="left">Énergie, climat et après-mines</td>
                        <td class="amdtCreditProgMt" style="padding-right:3px;width:25%; border-right: solid 1px;" valign="center" align="right">0</td>
                        <td class="amdtCreditProgMt" style="padding-right:3px;width:25%; border-right: solid 1px;" valign="center" align="right">340&nbsp;950</td>
                     </tr>
                     <tr>
                        <td class="amdtCreditProgLibelle" style="width:50%;padding-left:3px; padding-right:3px;border-left:1px solid; border-right:1px solid;" valign="center" align="left">Service public de l'énergie</td>
                        <td class="amdtCreditProgMt" style="padding-right:3px;width:25%; border-right: solid 1px;" valign="center" align="right">0</td>
                        <td class="amdtCreditProgMt" style="padding-right:3px;width:25%; border-right: solid 1px;" valign="center" align="right">0</td>
                     </tr>
                     <tr>
                        <td class="amdtCreditProgLibelle" style="width:50%;padding-left:3px; padding-right:3px;border-left:1px solid; border-right:1px solid;" valign="center" align="left">Conduite et pilotage des politiques de l'écologie, du développement et de la mobilité durables</td>
                        <td class="amdtCreditProgMt" style="padding-right:3px;width:25%; border-right: solid 1px;" valign="center" align="right">340&nbsp;950</td>
                        <td class="amdtCreditProgMt" style="padding-right:3px;width:25%; border-right: solid 1px;" valign="center" align="right">0</td>
                     </tr>
                     <tr>
                        <td class="amdtCreditProgLibelle" style="width:50%;padding-left:3px; padding-right:3px;border-left:1px solid; border-right:1px solid;" valign="center" align="left">Charge de la dette de SNCF Réseau reprise par l'État (crédits évaluatifs)</td>
                        <td class="amdtCreditProgMt" style="padding-right:3px;width:25%; border-right: solid 1px;" valign="center" align="right">0</td>
                        <td class="amdtCreditProgMt" style="padding-right:3px;width:25%; border-right: solid 1px;" valign="center" align="right">0</td>
                     </tr>
                     <tr height="50">
                        <td class="colonneGras" style="white-space:normal;width:50%;border-style:solid;border-width:1px;" align="center">TOTAUX
                        </td>
                        <td style="white-space:normal;width:25%;border-style:solid;border-width:1px;" valign="center" align="right">340&nbsp;950</td>
                        <td style="white-space:normal;width:25%;border-style:solid;border-width:1px;" valign="center" align="right">340&nbsp;950</td>
                     </tr>
                     <tr height="50">
                        <td class="colonneGras" style="white-space:normal;width:50%;border-style:solid;border-width:1px;" valign="center" align="center">SOLDE
                        </td>
                        <td style="white-space:normal;width:50%;border-style:solid;border-width:1px;" colspan="2" valign="center" align="center">0</td>
                     </tr>
                  </tbody>
               </table>
               <p></p>
            </div>
         </div>
         <p style="text-align:center;font-weight:bold">
            EXPOSÉ SOMMAIRE
         </p>
         <p>
            Dans le cadre de la gestion de l’épidémie et afin d’assurer une égalité de traitement de l’ensemble des assurés  (mis en isolement, contraints  de garder leurs  enfants ou malades)  du point de  vue  de l’application d’un délai de carence pour le  bénéfice de l’indemnisation des arrêts de  travail,  il    est proposé de supprimer, pendant  la période d’état d’urgence sanitaire, l’application de cette carence dans l’ensemble des régimes (régime général, agricole, régimes spéciaux dont fonction publique).
         </p>
      </div>
`;

function App() {
  return (
    <div id="app">
      <div id="left-column">
        <div dangerouslySetInnerHTML={{__html: amendement}} />
      </div>
      <div id="text-column">
        hello jorld.
      </div>
      <div id="discussion-column">
        hello jorld.
      </div>
    </div>
  );
}

export default App;
