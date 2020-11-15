import DATA from './data'

function currAmdtIndex() {
    if (DATA.currentAmdt) {
        for (var i = 0; i < DATA.amendements.length; i++) {
            if (DATA.amendements[i].numeroReference == DATA.currentAmdt) {
                return i
            }
        }
    }
    return Math.min(DATA.amendements.length-1, 2)
}
export {currAmdtIndex};