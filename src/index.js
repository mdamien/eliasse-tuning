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
            $.getJSON(proxy + 'http://eliasse.assemblee-nationale.fr/eliasse/amdtDerouleur.do', {
                legislature: DATA.prochainADiscuter.legislature,
                bibard: DATA.prochainADiscuter.bibard,
                bibardSuffixe: DATA.prochainADiscuter.bibardSuffixe,
                organeAbrv: DATA.prochainADiscuter.organeAbrv,
                position: DATA.amendements[0].position,
            }, function(data) {
                DATA.amdts_derouleur = data
                render()
                // http://eliasse.assemblee-nationale.fr/eliasse/loadTextContentByBibard.do?
                // _dc=1605015241519&bibard=3522&legislature=15&bibardSuffixe=&ancreDivision=D_Article_liminaire&isSousAmdt=false
                $.get(proxy + 'http://eliasse.assemblee-nationale.fr/eliasse/loadTextContentByBibard.do', {
                    legislature: DATA.prochainADiscuter.legislature,
                    bibard: DATA.prochainADiscuter.bibard,
                    bibardSuffixe: DATA.prochainADiscuter.bibardSuffixe,
                    ancreDivision: DATA.amendements[0].ancreDivisionTexteVise,
                    isSousAmdt: "false", // how to know this ???
                }, function(data) {
                    DATA.text = data
                    render()
                })
            })
        })
    })
})