import DATA from './data'

function Amendement(props) {
  var data = props.data;
  var lienND = "https://www.nosdeputes.fr/"
    + DATA.prochainADiscuter.legislature
    + "/amendement/"
    + DATA.currentText.split('|')[0] + DATA.currentText.split('|')[1]
    + "/"
    + data.numeroLong
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
      <br/>
      <br/>
      <div className="lien-pdf">
        <a href={'http://www.assemblee-nationale.fr/dyn' +  data.urlPDF.replace('.pdf', '')}>
          Amendement sur le site de l'Assemblée Nationale
        </a>
        <br/>
        {data.nb_tweets ? <span>
          <a href={'https://twitter.com/search?q=http://www.assemblee-nationale.fr/dyn' +  data.urlPDF.replace('.pdf', '')}>
          {data.nb_tweets} commentaire{data.nb_tweets > 1 ? 's':''} sur Twitter
        </a>
        <br/>
        </span> : null}
        
        <a href={lienND}>
          Amendement sur NosDéputés.fr
        </a>
      </div>
    </div>
  );
}

export default Amendement;
