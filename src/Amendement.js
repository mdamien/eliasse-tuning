import DATA from './data'

function Amendement(props) {
  var data = props.data;
  return (
    <div className="amendement">
      {data.sortEnSeance ? <div className="sort">{data.sortEnSeance}</div> : null}
      {(data.numeroLong === DATA.prochainADiscuter.numAmdt  || data.numero === DATA.prochainADiscuter.numAmdt ?
        <div className="en-discussion"><strong>En discussion</strong></div> : '')}
      <div className="header">
        <center><h1>{data.numeroParent ? 'Sous-': ''}Amendement n°{data.numero}</h1></center>
        <center><p>proposé par <span dangerouslySetInnerHTML={{__html: data.listeDesSignataires}}></span></p></center>
        
        <center><b><p dangerouslySetInnerHTML={{__html: data.place}}/></b></center>
      </div>
      <p className="dispositif" dangerouslySetInnerHTML={{__html: data.dispositif}}/>
      <center><p><strong>EXPOSÉ SOMMAIRE</strong></p></center>
      <p className="expose" dangerouslySetInnerHTML={{__html: data.exposeSommaire}}/>
      <a className="lien-pdf" href={'http://www.assemblee-nationale.fr/dyn' +  data.urlPDF.replace('.pdf', '')}>
        Amendement sur le site de l'Assemblée Nationale
      </a>
    </div>
  );
}

export default Amendement;
