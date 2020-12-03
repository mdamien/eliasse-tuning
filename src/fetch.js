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
                                        fetchTwitterComments()
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
                        fetchTwitterComments()
                    })
                })
            })
        })
    })
}

function fetchSuiviAuto() {
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
            render()
            if (DATA.suiviAuto) {
                if (DATA.amendements
                    && DATA.amendements[currAmdtIndex()].numero !== DATA.prochainADiscuter.numAmdt
                    && DATA.amendements[currAmdtIndex()].numeroReference !== DATA.prochainADiscuter.numAmdt
                    && DATA.amendements[currAmdtIndex()].numeroLong !== DATA.prochainADiscuter.numAmdt) {
                    fetchAmendement(DATA.prochainADiscuter.numAmdt)
                }
            } else {
                // count how many amendement before selected one
                fetchHowMany(0, DATA.amdts_derouleur[0].position)
            }
            setTimeout(fetchSuiviAuto, 1000)
        }
    })
}


function comparePositions(pos1, pos2) {
   var pos1_0 = parseInt(pos1.split('/')[0])
   var pos1_1 = parseInt(pos1.split('/')[1])
   var pos2_0 = parseInt(pos2.split('/')[0])
   var pos2_1 = parseInt(pos2.split('/')[1])

   if (pos1_1 > pos2_1) {
      return true
   }
   if (pos1_1 === pos2_1) {
      return pos1_0 >= pos2_0
   }
   return false
}

function fetchHowMany(count, position) {
    var $ = Window.$
    var proxy = PROXY

    var bibard = DATA.currentText.split('|')[0]
    var bibardSuffixe = DATA.currentText.split('|')[1]
    var organeAbrv = DATA.currentText.split('|')[2]


    var url = 'http://eliasse.assemblee-nationale.fr/eliasse/amendement.do'
        + '?legislature=' + DATA.prochainADiscuter.legislature 
        + '&bibard=' + bibard
        + '&bibardSuffixe=' + bibardSuffixe
        + '&organeAbrv=' + organeAbrv
        + '&numAmdt=' + DATA.prochainADiscuter.numAmdt
    $.getJSON(proxy + url, function(data) {
        var prochainADiscuter = data.amendements[0]
        $.getJSON(proxy + 'http://eliasse.assemblee-nationale.fr/eliasse/amdtDerouleur.do', {
            legislature: DATA.prochainADiscuter.legislature,
            bibard: bibard,
            bibardSuffixe: bibardSuffixe,
            organeAbrv: organeAbrv,
            position: position,
        }, function(data) {
            var dada = DATA
            var prev_position = null
            var stop = false
            dada.discussion.divisions.forEach(div => {
                if (stop) {
                    return
                }
                if (comparePositions(div.position, position)) {
                    stop = true
                    return
                }
                prev_position = div.position
            })
            data.reverse().forEach(amdt => {
                var pos = DATA.amendements[currAmdtIndex()].position
                if (comparePositions(amdt.position, pos)) {
                    if (amdt.position == pos) {
                        count += 1
                    }
                    return
                }
                if (comparePositions(prochainADiscuter.position, amdt.position)) {
                    debugger
                    prev_position = null
                    return
                }
                if (comparePositions(amdt.position, position)) {
                    count += 1
                    return
                }
            })
            if (prev_position) {
                fetchHowMany(count, prev_position)
            } else if (count > 0) {
                DATA.amendements[currAmdtIndex()].amdtsRestants = count
                render()
            }
        })
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

function fetchTwitterComments() {
    var $ = Window.$
    $.get('http://derouleur.dam.io:8011/tweets/http://www.assemblee-nationale.fr/dyn' + DATA.amendements[currAmdtIndex()].urlPDF.replace('.pdf', ''),
        function(data) {
        DATA.amendements[currAmdtIndex()].nb_tweets = data
        render()
    })
}
export {fetchAmendement, fetch, fetchSuiviAuto, fetchDivision}