import DATA from './data'

function Amendement(props) {
  var data = props.data;
  return (
    <div className="amendement">
      <a className="lien-pdf" href={'http://www.assemblee-nationale.fr' + data.urlPDF}>PDF</a>
      {(data.numeroLong === DATA.prochainADiscuter.numAmdt  || data.numero === DATA.prochainADiscuter.numAmdt ? <div className="en-discussion"><strong>En discussion</strong></div> : '')}
      <div className="header">
        <center><h1>Amendement n°{data.numero}</h1></center>
        <center><p>proposé par <span dangerouslySetInnerHTML={{__html: data.listeDesSignataires}}></span></p></center>
        {data.sortEnSeance ? <center><p><strong>Sort: {data.sortEnSeance}</strong></p></center> : null}
        <center><b><p dangerouslySetInnerHTML={{__html: data.place}}/></b></center>
      </div>
      <p className="dispositif" dangerouslySetInnerHTML={{__html: data.dispositif}}/>
      <center><p><strong>EXPOSÉ SOMMAIRE</strong></p></center>
      <p className="expose" dangerouslySetInnerHTML={{__html: data.exposeSommaire}}/>
    </div>
  );
}

export default Amendement;
