import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import JSZipUtils from 'jszip-utils';
import { Meteor } from 'meteor/meteor';

/**
 * Function for making the backups zip file
 */

/**
 * Function for make backup
 *
 * @param {number} limit Limit
 * @param {Function} callback Callback with param (BACKED_UP_ERROR|EVERYTHING_BACKED_UP|
 *                            BACKED_UP_SUCCESS|BACKED_UP_ZIP_ERROR)
 */
export function backup(limit, callback){
    let log = new Logger('backup');

    //get images to backup
    Meteor.call('images.backup', limit, (error, images) => {
        if(error){
            log.error("Backup images with error "+error);
            callback("BACKED_UP_ERROR");
        } else {
            //if there is no image to backup
            if(images.length === 0){
                callback("EVERYTHING_BACKED_UP");
            //if there are images to backup
            } else {
                //generate Zip
                generateZip(images, (result) => {
                    if(result){
                        //change state of backed up images
                        Meteor.call('images.backupCompleted', images);
                        callback("BACKED_UP_SUCCESS");
                    } else {
                        callback("BACKED_UP_ZIP_ERROR");
                    }
                });
            }
        }
    });
}

/**
 * Function for generating the zip file from array of urls
 *
 * @param {Object} images Object of array of images to backup
 * @param {Function} callback Callback with param (true|false)
 */
function generateZip(images, callback){
    let log = new Logger('generate-zip');

    //get src from array of object and push them into urls array
    let urls = images.map((image) => (image.src));

    //initialize ZIP setting
    let zip = new JSZip();
    let count = 0;
    let dateISONow = new Date().toISOString();
    let zipFilename =  "zaloha-"+dateISONow+".zip";

    //download each image and zip him
    urls.forEach((url) => {
        //get filename of image from src address
        let filename = url.split('/').pop();

        //download the file and add it in a zip file
        JSZipUtils.getBinaryContent(url, (error, data) => {
            if (error) {
                log.error("Generate zip with error "+error);
                callback(false);
            } else {
                zip.file(filename, data, {binary: true});
                count++;
                //if it is equal to array length -> generate zip file
                if (count === urls.length) {
                    zip.generateAsync({type: 'blob'}).then((content) => {
                        saveAs(content, zipFilename);
                        callback(true);
                    });
                }
            }
        });
    });
}
