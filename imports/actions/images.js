/**
 * Action for add new image to Images collection
 *
 * @param {string} name Name of image
 * @param {Array} tags Tags of image
 * @param {string} src  Url address of image to storage
 *
 * @return {function}
 */
export function addImage(name, tags, src) {
    return () => {
        Meteor.call('images.insert', name, tags, src, (error)=>{
            if(error){
                let log = new Logger('action-images');
                log.error("Add image with name "+name+" - "+error);
                alert("Chyba při ukládání do databáze [images] u obrázku "+name);
            }
        });
    };
}

/**
 * Action for remove image from Images collection
 *
 * @param {string} id Id of image
 * @param {string} name Name of image
 *
 * @return {function}
 */
export function removeImage(id, name) {
    return () => {
        Meteor.call('images.delete', id, (error)=>{
            if(error){
                let log = new Logger('action-images');
                log.error("Remove image with id "+id+" - "+error);
                alert("Chyba při mazání z databáze [images] u obrázku "+name);
            }
        });
    };
}

/**
 * Action for update existing image in Images collection.
 *
 * @param {string} id Id of image
 * @param {string} name Name of image
 * @param {Array} tags Tags of image
 *
 * @return {function}
 */
export function updateImage(id, name, tags) {
    return () => {
        Meteor.call('images.update', id, name, tags, (error)=>{
            if(error){
                let log = new Logger('action-images');
                log.error("Update image with id "+id+" - "+error);
                alert("Chyba při ukládání změny do databáze [images] u obrázku "+name);
            }
        });
    };
}