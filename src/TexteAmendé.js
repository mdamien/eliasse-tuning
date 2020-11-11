import DATA from './data'

function TexteAmendé() {
  var html = ''
  if (DATA.text) {
   html = DATA.text
  }

  var inside_style = false;
  html = html.split('\n').map(l => {
   if (l.indexOf('<style') !== -1) {
      inside_style = true;
   }
   if (l.indexOf('</style>') !== -1) {
      inside_style = false;
   }
   if (inside_style) {
      if (l.indexOf(',') !== -1 || l.indexOf('{')  !== -1) {
         l = '#texte ' + l
      }
   }
   return l
  }).join('\n')
  return (
    <div style={{padding:10}}>
      <div id="texte" dangerouslySetInnerHTML={{__html: html}} />
    </div>
  );
}

export default TexteAmendé;
