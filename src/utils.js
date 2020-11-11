import DATA from './data'

function currAmdtIndex() {
    return Math.min(DATA.amendements.length-1, 2)
}
export {currAmdtIndex};