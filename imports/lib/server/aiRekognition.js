import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

//import images collection
import { Images } from './../../api/images/images.js';

/**
 * Definition of method for Amazon Rekognition AI operations on the server side.
 * Client call the methods via Meteor.call
 */
Meteor.methods({
    /**
     * Use Amazon Rekognition AI for pre-filling the tags.
     * Meteor.settings.S3Bucket must be same region like Rekognition AI.
     *
     * @param {string} id ID of image.
     *
     * @return {Object}  Object with recognize labels
     *
     * @throws {Meteor.Error} Error
     */
    'ai.recognize'(id) {
        if (Meteor.isServer) {
            let log = new Logger('ai-recognize');

            //make sure the user is logged in before inserting
            if (!this.userId) {
                log.error("Recognize image with id "+id+" - not authorized");
                throw new Meteor.Error('not-authorized');
            }

            check(id, String);

            //check if document exists
            let image = Images.findOne({_id: id});
            if(typeof image === 'undefined'){
                log.error("Recognize image with id "+id+" - image does not exist");
                throw new Meteor.Error('not-exists');
            }

            // Load the AWS SDK for Node.js
            let AWS = require('aws-sdk');

            AWS.config = new AWS.Config();
            AWS.config.accessKeyId = Meteor.settings.AWSAccessKeyId;
            AWS.config.secretAccessKey = Meteor.settings.AWSSecretAccessKey;
            AWS.config.region = Meteor.settings.S3BucketRegion;
            // other service API versions
            AWS.config.apiVersions = {
                rekognition: '2016-06-27'
            };

            //In order to ensure that the Rekognition object uses this specific API,
            let rekognition = new AWS.Rekognition();

            //remove S3 storage domain name from image
            let fileName = image.src.replace(/^.*[\\\/]/, '');

            //set parameters for searching
            let params = {
                Image: {
                    S3Object: {
                        Bucket: Meteor.settings.S3Bucket,
                        Name: fileName
                    }
                },
                MaxLabels: 5,
                MinConfidence: 60
            };

            // get a sync version of API Amazon async function to return result to client side call method
            let detectLabelsSync=Meteor.wrapAsync(rekognition.detectLabels, rekognition);
            // handle the result and error return
            try{
                let result = detectLabelsSync(params);
                return result.Labels;
            }catch(error){
                log.error("Recognize image with id "+id+" with error "+error);
                throw new Meteor.Error(error.code);
            }
        }
    },
});