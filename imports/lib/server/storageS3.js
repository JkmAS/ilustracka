import { Meteor } from 'meteor/meteor';
import {Slingshot} from 'meteor/edgee:slingshot';

/**
 * Slingshot´s directive that controls upload access rules
 * for Amazon S3 Storage
 */
if (Meteor.isServer) {
    let log = new Logger('storage-S3');

    Slingshot.createDirective("uploadToAmazonS3", Slingshot.S3Storage, {
        //settings.json
        bucket: Meteor.settings.AWSBucket,

        acl: "public-read",

        //only specific file types: .jpeg, .jpg, .gif, .bmp
        allowedFileTypes: ["image/png", "image/jpeg", "image/pjpeg", "image/gif", "image/bmp", "image/svg+xml"],

        //set Amazon S3 region
        region: Meteor.settings.S3BucketRegion,

        //max upload size 10MB
        maxSize: 10 * 1024 * 1024,


        /**
         * Function for authorization
         *
         * @return {boolean} True if the user is logged in
         *
         * @throws {Meteor.Error} Error
         */
        authorize: function () {
            //deny uploads if user is not logged in.
            if (!this.userId) {
                log.error("Image storage S3 - login required before posting files");
                throw new Meteor.Error("Login Required", "Please login before posting files");
            }
            return true;
        },

        /**
         * Function for return the name of file
         *
         * @param {Object} file Information about file
         *
         * @return {string} Unique name of file
         */
        key: function (file) {
            //Store file into a root directory in format ISO-fileName
            let dateISONow = new Date().toISOString();
            return dateISONow+"-"+file.name;
        }
    })
}