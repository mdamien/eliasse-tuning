import render from './App'
import DATA from './data'

function fetch() {
    var $ = Window.$
    var proxy = "http://127.0.0.1:5000/p/"

    var bibard = ""
    var bibardSuffixe = ""
    var organeAbrv = ""

    if (DATA.currentText) {
        bibard = DATA.currentText.split('|')[0]
        bibardSuffixe = DATA.currentText.split('|')[1]
        organeAbrv = DATA.currentText.split('|')[2]
    }

    $.getJSON(proxy + "http://eliasse.assemblee-nationale.fr/eliasse/prochainADiscuter.do", {
        bibard: bibard,
        bibardSuffixe: bibardSuffixe,
        organeAbrv: organeAbrv,
    }, function(data) {
        DATA.prochainADiscuter = data['prochainADiscuter']
        if (!DATA.currentText) {
            bibard = DATA.prochainADiscuter.bibard
            bibardSuffixe = DATA.prochainADiscuter.bibardSuffixe
            organeAbrv = DATA.prochainADiscuter.organeAbrv
        }
        $.getJSON(proxy + 'http://eliasse.assemblee-nationale.fr/eliasse/discussion.do', {
            legislature: DATA.prochainADiscuter.legislature,
            bibard: bibard,
            bibardSuffixe: bibardSuffixe,
            organeAbrv: organeAbrv,
            numAmdt: DATA.prochainADiscuter.numAmdt,
        }, function(data) {
            DATA.discussion = data.amdtsParOrdreDeDiscussion
            var url = 'http://eliasse.assemblee-nationale.fr/eliasse/amendement.do'
                + '?legislature=' + DATA.prochainADiscuter.legislature 
                + '&bibard=' + bibard
                + '&bibardSuffixe=' + bibardSuffixe
                + '&organeAbrv=' + organeAbrv
            DATA.discussion.amendements.forEach(x => {
                url += '&numAmdt=' + x.numero
            })
            $.getJSON(proxy + url, function(data) {
                DATA.amendements = data.amendements
                $.getJSON(proxy + 'http://eliasse.assemblee-nationale.fr/eliasse/amdtDerouleur.do', {
                    legislature: DATA.prochainADiscuter.legislature,
                    bibard: bibard,
                    bibardSuffixe: bibardSuffixe,
                    organeAbrv: organeAbrv,
                    position: DATA.amendements[0].position,
                }, function(data) {
                    DATA.amdts_derouleur = data
                    $.get(proxy + 'http://eliasse.assemblee-nationale.fr/eliasse/loadTextContentByBibard.do', {
                        legislature: DATA.prochainADiscuter.legislature,
                        bibard: bibard,
                        bibardSuffixe: bibardSuffixe,
                        ancreDivision: DATA.amendements[0].ancreDivisionTexteVise,
                        isSousAmdt: "false", // how to know this ???
                    }, function(data) {
                        DATA.text = data
                        $.getJSON(proxy + 'http://eliasse.assemblee-nationale.fr/eliasse/getListeReferenceDesOrganes.do', function(data) {
                            DATA.organes = data
                            // http://eliasse.assemblee-nationale.fr/eliasse/textesOrdreDuJour.do?_dc=1605026729361&organeAbrv=AN&page=1&start=0&limit=25
                            var n = 0
                            DATA.organes.forEach(function(org, i) {
                                $.getJSON(proxy + 'http://eliasse.assemblee-nationale.fr/eliasse/textesOrdreDuJour.do', {
                                    'organeAbrv': org.value,
                                }, function(data) {
                                    DATA.organes[i].textes = data
                                    n += 1
                                    if (n === DATA.organes.length - 1) {
                                        render()
                                    }
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}


function fetchPrev() {
    var $ = Window.$
    var proxy = "http://127.0.0.1:5000/p/"

    var bibard = ""
    var bibardSuffixe = ""
    var organeAbrv = ""

    if (DATA.currentText) {
        bibard = DATA.currentText.split('|')[0]
        bibardSuffixe = DATA.currentText.split('|')[1]
        organeAbrv = DATA.currentText.split('|')[2]
    }

    $.getJSON(proxy + "http://eliasse.assemblee-nationale.fr/eliasse/prochainADiscuter.do", {
        bibard: bibard,
        bibardSuffixe: bibardSuffixe,
        organeAbrv: organeAbrv,
    }, function(data) {
        DATA.prochainADiscuter = data['prochainADiscuter']
        if (!DATA.currentText) {
            bibard = DATA.prochainADiscuter.bibard
            bibardSuffixe = DATA.prochainADiscuter.bibardSuffixe
            organeAbrv = DATA.prochainADiscuter.organeAbrv
        }
        $.getJSON(proxy + 'http://eliasse.assemblee-nationale.fr/eliasse/discussion.do', {
            legislature: DATA.prochainADiscuter.legislature,
            bibard: bibard,
            bibardSuffixe: bibardSuffixe,
            organeAbrv: organeAbrv,
            numAmdt: DATA.amendements[0].numero,
        }, function(data) {
            DATA.discussion = data.amdtsParOrdreDeDiscussion
            var url = 'http://eliasse.assemblee-nationale.fr/eliasse/amendement.do'
                + '?legislature=' + DATA.prochainADiscuter.legislature 
                + '&bibard=' + bibard
                + '&bibardSuffixe=' + bibardSuffixe
                + '&organeAbrv=' + organeAbrv
            DATA.discussion.amendements.forEach(x => {
                url += '&numAmdt=' + x.numero
            })
            $.getJSON(proxy + url, function(data) {
                DATA.amendements = data.amendements
                render()
            })
        })
    })
}


function fetchNext() {
    var $ = Window.$
    var proxy = "http://127.0.0.1:5000/p/"

    var bibard = ""
    var bibardSuffixe = ""
    var organeAbrv = ""

    if (DATA.currentText) {
        bibard = DATA.currentText.split('|')[0]
        bibardSuffixe = DATA.currentText.split('|')[1]
        organeAbrv = DATA.currentText.split('|')[2]
    }

    $.getJSON(proxy + "http://eliasse.assemblee-nationale.fr/eliasse/prochainADiscuter.do", {
        bibard: bibard,
        bibardSuffixe: bibardSuffixe,
        organeAbrv: organeAbrv,
    }, function(data) {
        DATA.prochainADiscuter = data['prochainADiscuter']
        if (!DATA.currentText) {
            bibard = DATA.prochainADiscuter.bibard
            bibardSuffixe = DATA.prochainADiscuter.bibardSuffixe
            organeAbrv = DATA.prochainADiscuter.organeAbrv
        }
        $.getJSON(proxy + 'http://eliasse.assemblee-nationale.fr/eliasse/discussion.do', {
            legislature: DATA.prochainADiscuter.legislature,
            bibard: bibard,
            bibardSuffixe: bibardSuffixe,
            organeAbrv: organeAbrv,
            numAmdt: DATA.amendements[DATA.amendements.length-1].numero,
        }, function(data) {
            DATA.discussion = data.amdtsParOrdreDeDiscussion
            var url = 'http://eliasse.assemblee-nationale.fr/eliasse/amendement.do'
                + '?legislature=' + DATA.prochainADiscuter.legislature 
                + '&bibard=' + bibard
                + '&bibardSuffixe=' + bibardSuffixe
                + '&organeAbrv=' + organeAbrv
            DATA.discussion.amendements.forEach(x => {
                url += '&numAmdt=' + x.numero
            })
            $.getJSON(proxy + url, function(data) {
                DATA.amendements = data.amendements
                render()
            })
        })
    })
}

export {fetchPrev, fetchNext, fetch}