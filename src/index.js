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
                $.get(proxy + 'http://eliasse.assemblee-nationale.fr/eliasse/loadTextContentByBibard.do', {
                    legislature: DATA.prochainADiscuter.legislature,
                    bibard: DATA.prochainADiscuter.bibard,
                    bibardSuffixe: DATA.prochainADiscuter.bibardSuffixe,
                    ancreDivision: DATA.amendements[0].ancreDivisionTexteVise,
                    isSousAmdt: "false", // how to know this ???
                }, function(data) {
                    DATA.text = data
                    $.getJSON(proxy + 'http://eliasse.assemblee-nationale.fr/eliasse/getListeReferenceDesOrganes.do', function(data) {
                        DATA.organes = data
                        // http://eliasse.assemblee-nationale.fr/eliasse/textesOrdreDuJour.do?_dc=1605026729361&organeAbrv=AN&page=1&start=0&limit=25
                        DATA.organes.forEach(function(org, i) {
                            $.getJSON(proxy + 'http://eliasse.assemblee-nationale.fr/eliasse/textesOrdreDuJour.do', {
                                'organeAbrv': org.value,
                            }, function(data) {
                                DATA.organes[i].textes = data
                                render()
                            })
                        })
                    })
                })
            })
        })
    })
})