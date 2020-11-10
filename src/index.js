import render from './App'
import DATA from './data'

render()

var $ = Window.$
var proxy = "http://127.0.0.1:5000/p/"
$.getJSON(proxy + "http://eliasse.assemblee-nationale.fr/eliasse/prochainADiscuter.do", function(data) {
    DATA.prochainADiscuter = data['prochainADiscuter']

    $.getJSON(proxy + 'http://eliasse.assemblee-nationale.fr/eliasse/discussion.do', {
        legislature: DATA.prochainADiscuter.legislature,
        bibard: DATA.prochainADiscuter.bibard,
        bibardSuffixe: DATA.prochainADiscuter.bibardSuffixe,
        organeAbrv: DATA.prochainADiscuter.organeAbrv,
        numAmdt: DATA.prochainADiscuter.numAmdt,
    }, function(data) {
        DATA.discussion = data.amdtsParOrdreDeDiscussion
        var url = 'http://eliasse.assemblee-nationale.fr/eliasse/amendement.do'
            + '?legislature=' + DATA.prochainADiscuter.legislature 
            + '&bibard=' + DATA.prochainADiscuter.bibard
            + '&bibardSuffixe=' + DATA.prochainADiscuter.bibardSuffixe
            + '&organeAbrv=' + DATA.prochainADiscuter.organeAbrv
        DATA.discussion.amendements.slice(0, 3).forEach(x => {
            url += '&numAmdt=' + x.numero
        })
        $.getJSON(proxy + url, function(data) {
            DATA.amendements = data.amendements
            var url = "http://eliasse.assemblee-nationale.fr/eliasse/amdtDerouleur.do?legislature=15&bibard=3360&bibardSuffixe=C&organeAbrv=CION-SOC&position=13%2F16&page=1&start=0&limit=25"
            $.getJSON(proxy + 'http://eliasse.assemblee-nationale.fr/eliasse/amdtDerouleur.do', {
                legislature: DATA.prochainADiscuter.legislature,
                bibard: DATA.prochainADiscuter.bibard,
                bibardSuffixe: DATA.prochainADiscuter.bibardSuffixe,
                organeAbrv: DATA.prochainADiscuter.organeAbrv,
                position: DATA.amendements[0].position,
            }, function(data) {
                DATA.amdts_derouleur = data
                render()
            })
        })
    })
})