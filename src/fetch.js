import render from './App'
import DATA from './data'
import {currAmdtIndex} from './utils'

var PROXY = "http://derouleur.dam.io:8004/p/"

function fetch() {
    var $ = Window.$
    var proxy = PROXY

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
        DATA.currentText = bibard + '|' + bibardSuffixe + '|' + organeAbrv
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
                    position: DATA.amendements[currAmdtIndex()].position,
                }, function(data) {
                    DATA.amdts_derouleur = data
                    $.get(proxy + 'http://eliasse.assemblee-nationale.fr/eliasse/loadTextContentByBibard.do', {
                        legislature: DATA.prochainADiscuter.legislature,
                        bibard: bibard,
                        bibardSuffixe: bibardSuffixe,
                        ancreDivision: DATA.amendements[currAmdtIndex()].ancreDivisionTexteVise,
                        isSousAmdt: "false", // how to know this ???
                    }, function(data) {
                        DATA.text = Window.html_beautify(data)
                        $.getJSON(proxy + 'http://eliasse.assemblee-nationale.fr/eliasse/getListeReferenceDesOrganes.do', function(data) {
                            DATA.organes = data
                            var n = 0
                            DATA.organes.forEach(function(org, i) {
                                $.getJSON(proxy + 'http://eliasse.assemblee-nationale.fr/eliasse/textesOrdreDuJour.do', {
                                    'organeAbrv': org.value,
                                }, function(data) {
                                    DATA.organes[i].textes = data
                                    n += 1
                                    if (n === DATA.organes.length - 1) {
                                        render()
                                        fetchSuiviAuto()
                                        fetchDoslegLink()
                                        fetchDiff()
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

function fetchAmendement(num) {
    var $ = Window.$
    var proxy = PROXY

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
            numAmdt: num,
        }, function(data) {
            DATA.currentAmdt = num
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
                    position: DATA.amendements[currAmdtIndex()].position,
                }, function(data) {
                    DATA.amdts_derouleur = data
                    $.get(proxy + 'http://eliasse.assemblee-nationale.fr/eliasse/loadTextContentByBibard.do', {
                        legislature: DATA.prochainADiscuter.legislature,
                        bibard: bibard,
                        bibardSuffixe: bibardSuffixe,
                        ancreDivision: DATA.amendements[currAmdtIndex()].ancreDivisionTexteVise,
                        isSousAmdt: "false", // how to know this ???
                    }, function(data) {
                        DATA.text = Window.html_beautify(data)
                        render()
                        fetchDiff()
                    })
                })
            })
        })
    })
}

function fetchSuiviAuto() {
    if (!DATA.suiviAuto) {
        return
    }
    var $ = Window.$
    var proxy = PROXY

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
        if (data['prochainADiscuter'].bibard == bibard) {
            DATA.prochainADiscuter = data['prochainADiscuter']
            if (DATA.amendements
                && DATA.amendements[currAmdtIndex()].numero !== DATA.prochainADiscuter.numAmdt
                && DATA.amendements[currAmdtIndex()].numeroReference !== DATA.prochainADiscuter.numAmdt
                && DATA.amendements[currAmdtIndex()].numeroLong !== DATA.prochainADiscuter.numAmdt) {
                fetchAmendement(DATA.prochainADiscuter.numAmdt)
            }
            setTimeout(fetchSuiviAuto, 1000)
        }
    })
}

function fetchDivision(position) {
    var $ = Window.$
    var proxy = PROXY

    var bibard = ""
    var bibardSuffixe = ""
    var organeAbrv = ""

    if (DATA.currentText) {
        bibard = DATA.currentText.split('|')[0]
        bibardSuffixe = DATA.currentText.split('|')[1]
        organeAbrv = DATA.currentText.split('|')[2]
    }

    $.getJSON(proxy + 'http://eliasse.assemblee-nationale.fr/eliasse/amdtDerouleur.do', {
        legislature: DATA.prochainADiscuter.legislature,
        bibard: bibard,
        bibardSuffixe: bibardSuffixe,
        organeAbrv: organeAbrv,
        position: position,
    }, function(data) {
        DATA.amdts_derouleur = data
        render()
        fetchAmendement(DATA.amdts_derouleur[0].numero)
    })
}

function fetchDoslegLink() {
    var $ = Window.$
    var proxy = PROXY
    $.get(proxy + 'http://www.assemblee-nationale.fr/dyn' + DATA.amendements[0].urlPDF.replace('.pdf', ''),
        function(data) {
        var parser = new DOMParser();
        var html_doc = parser.parseFromString(data, 'text/html');
        var link = html_doc.querySelector('.mirror-card-header--options--content--item--link').getAttribute("href")
        link = 'http://www.assemblee-nationale.fr' + link
        DATA.doslegLink = link
        render()
    })
}

function fetchDiff() {
    var $ = Window.$
    $.get('http://derouleur.dam.io:8010/apply/http://www.assemblee-nationale.fr/dyn' + DATA.amendements[currAmdtIndex()].urlPDF.replace('.pdf', ''),
        function(data) {
        DATA.amendements[currAmdtIndex()].diff = data
        render()
    })
}

export {fetchAmendement, fetch, fetchSuiviAuto, fetchDivision}