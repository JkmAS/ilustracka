import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {Slingshot} from 'meteor/edgee:slingshot';
import { connect } from 'react-redux';
import { analytics } from "meteor/okgrow:analytics";

//actions
import {showMessage, generateMessage} from '../../../actions/message.js';
import {addImage} from '../../../actions/images.js';


/**
 * Component with upload button to uploading images to Amazon S3 storage
 */
export class UploadButton extends Component {

    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        this.upload = this.upload.bind(this);
    }

    /**
     * Function for uploading images to Amazon S3 storage and save info to database
     *
     * @param {Object} event Event.
     */
    upload(event){
        event.preventDefault();
        let log = new Logger('upload');

        //restrictions for client´s validation
        Slingshot.fileRestrictions("uploadToAmazonS3", {
            //all images .jpeg, .jpg, .gif, .bmp
            allowedFileTypes: ["image/png", "image/jpeg", "image/pjpeg", "image/gif", "image/bmp", "image/svg+xml"],
            //max size 10MB
            maxSize: 10 * 1024 * 1024
        });

        //files array
        let files = event.target.files;
        //variable indicating the continuation of uploading
        let process = true;

        for (let i = 0; i < files.length; i++){
            //check if process of uploading is still successful
            if(!process){
                break;
            }

            //upload file to S3 storage
            let uploader = new Slingshot.Upload("uploadToAmazonS3");
            uploader.send(files[i], (error, downloadUrl) => {
                //if it fails, set process var to false
                if (error) {
                    log.error("Upload with error "+error.reason);
                    process = false;
                    this.props.generateMessage("error","Nahrávání zrušeno: "+files[i].name+" "+error.reason);
                }
                //if success, insert into database
                else {
                    //get file name without extension
                    let fileName = files[i].name.substr(0, files[i].name.lastIndexOf('.')) || files[i].name;
                    this.props.addImage(fileName,[""],downloadUrl);
                }
            });

            //call tracker and show info message with progress
            Tracker.autorun(() => {
                //show only if process is successful
                if(process) {
                    //and variable progress is not null
                    if(!isNaN(uploader.progress())){
                        let progress = Math.ceil(uploader.progress() * 100);
                        //if file is uploaded, show success message
                        if(progress == 100){
                            //analytics event upload-image
                            analytics.track("upload-image", {files: files});
                            this.props.showMessage("upload_success");
                        } else {
                            this.props.generateMessage("info", "Nahráno: " + files[i].name + " " + progress + "%");
                        }
                    }
                }
            });
        }
    }

    render() {
        return (
            <form className="upload-console">
                <input type="file" id="files" accept="image/*" multiple onChange={this.upload}/>
                <label htmlFor="files" className="file">Vybrat soubory</label>
            </form>
        );
    }
}

/**
 * Props showMessage
 * Props generateMessage
 * Props addImage
 */
UploadButton.propTypes = {
    showMessage: React.PropTypes.func,
    generateMessage: React.PropTypes.func,
    addImage: React.PropTypes.func
};

/**
 * Map dispatch function to props
 */
const mapDispatchToProps = dispatch => ({
    showMessage: (messageType) => {
        dispatch(showMessage(messageType));
    },
    generateMessage: (type, messageText) => {
        dispatch(generateMessage(type, messageText));
    },
    addImage: (name, tags, src) => {
        dispatch(addImage(name, tags, src));
    },

});
/**
 * Connect function connects React components to a Redux Store
 */
export default connect(null, mapDispatchToProps)(UploadButton);


