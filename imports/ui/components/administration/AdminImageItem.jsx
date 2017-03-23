import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { analytics } from "meteor/okgrow:analytics";

//actions
import {showMessage} from '../../../actions/message.js';
import {updateImage, removeImage} from '../../../actions/images.js';

//checks
import {checkNonEmptyArray, checkNonEmptyString} from '../../../lib/client/checkVariables.js';

/**
 * Component for administration of the image item and its buttons
 */
export class AdminImageItem extends Component {

    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        this.updateImage = this.updateImage.bind(this);
        this.deleteImage = this.deleteImage.bind(this);

        //shorten the id of image
        let id = this.props._id;
        this.shortId = id.substring(0, 6)+"...";

        //make date user friendly
        let date = this.props.createdAt;
        this.userFriendlyDate = date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();

        //shorten the link name
        let link = this.props.name;
        this.shortLink = link.substring(0, 25);
    }

    /**
     * Function for updating the image
     */
    updateImage(){
        //get input values
        let name = ReactDOM.findDOMNode(this.refs.name).value.trim();
        let tags = ReactDOM.findDOMNode(this.refs.tags).value.split(",");

        //check the correct format
        if(!checkNonEmptyString(name)){
            this.props.showMessage("file_name_bad_format");
            return;
        }
        if(!checkNonEmptyArray(tags)){
            this.props.showMessage("file_tags_bad_format");
            return;
        }

        //update and show message
        this.props.updateImage(this.props._id, name, tags);
        this.props.showMessage("update_success");
    }

    /**
     * Function for removing the image from database,
     * remove only the record from database, it doesn´t delete file in the storage.
     */
    deleteImage(){
        this.props.removeImage(this.props._id, this.props.name);

        //analytics event delete-image
        analytics.track('delete-image', {
            category: 'Delete button',
            label: this.props.name
        });

        this.props.showMessage("remove_success");
    }

    render() {
        return (
            <tr>
                <td title={this.props._id}>#{this.shortId}</td>
                <td><a href={this.props.src} target="_blank">{this.shortLink}</a></td>
                <td title={this.props.createdAt.toString()}>{this.userFriendlyDate}</td>
                <td><input type="text" defaultValue={this.props.name} ref="name" required/></td>
                <td><input type="text" defaultValue={this.props.tags.join(",")} ref="tags" required/></td>
                <td><button onClick={this.updateImage}>Změnit</button></td>
                <td><button onClick={this.deleteImage}>Smazat</button></td>
            </tr>
        );
    }
}

/**
 * Props showMessage
 * Props updateImage
 * Props removeImage
 * Props _id
 * Props name
 * Props src
 * Props tags
 * Props createdAt
 */
AdminImageItem.propTypes = {
    showMessage: React.PropTypes.func,
    updateImage: React.PropTypes.func,
    removeImage: React.PropTypes.func,
    _id: React.PropTypes.string,
    name: React.PropTypes.string,
    src: React.PropTypes.string,
    tags: React.PropTypes.array,
    createdAt: React.PropTypes.instanceOf(Date)
};

/**
 * Map dispatch function to props
 */
const mapDispatchToProps = dispatch => ({
    showMessage: (messageType) => {
        dispatch(showMessage(messageType));
    },
    updateImage: (id, name, tags) => {
        dispatch(updateImage(id, name, tags));
    },
    removeImage: (id, name) => {
        dispatch(removeImage(id, name));
    },

});
/**
 * Connect function connects React components to a Redux Store
 */
export default connect(null, mapDispatchToProps)(AdminImageItem);
