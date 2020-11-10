import DATA from './data'

function TexteAmendé() {
  var html = ''
  if (DATA.text) {
   html = DATA.text
  }
  html = Window.html_beautify(html)

  var inside_style = false;
  html = html.split('\n').map(l => {
   if (l.indexOf('<style') !== -1) {
   }
   if (l.indexOf('<style') !== -1) {
      inside_style = true;
   }
   if (l.indexOf('</style>') !== -1) {
      inside_style = false;
   }
   if (inside_style) {
      if (l.indexOf(',') !== -1 || l.indexOf('{')  !== -1) {
         l = '#text-column ' + l
      }
   }
   return l
  }).join('\n')
  return (
    <div style={{padding:10}}>
      <div dangerouslySetInnerHTML={{__html: html}} />
    </div>
  );
}

export default TexteAmendé;
