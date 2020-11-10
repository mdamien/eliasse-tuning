function Amendement(props) {
  var data = props.data;
  return (
    <div className="amendement">
    <a href={'http://www.assemblee-nationale.fr' + data.urlPDF}>PDF</a>
      <center><h1>Amendement n°{data.numero}</h1></center>
      <center><p>de <span dangerouslySetInnerHTML={{__html: data.listeDesSignataires}}></span></p></center>
      <center><p><strong>{data.division.divisionDesignation}</strong></p></center>
      <center><p><strong>{data.division.titre}</strong></p></center>
      <p className="dispositif" dangerouslySetInnerHTML={{__html: data.dispositif}}/>
      <center><p><strong>EXPOSÉ SOMMAIRE</strong></p></center>
      <p className="expose" dangerouslySetInnerHTML={{__html: data.exposeSommaire}}/>
    </div>
  );
}

export default Amendement;
