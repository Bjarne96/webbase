export function findDataset (el) {
    try{
        let Checkparent = function (e) {
            if(Object.entries(e.dataset).length) {
                return e.dataset;
            } else {
                return Checkparent(e.parentElement)
            }
        }
        return Checkparent(el.target);
    }catch(e) {
        console.error('Error in finding the dataset to navigate to.', e);
        return null;
    }
}