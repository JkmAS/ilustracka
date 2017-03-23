import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import Clipboard from 'clipboard';
import { analytics } from "meteor/okgrow:analytics";

//actions
import {showMessage} from '../../../actions/message.js';

//checks
import {checkValidEmail} from '../../../lib/client/checkVariables.js';

/**
 * Component for image item and its buttons
 */
export class SearchingImageItem extends Component {

    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        this.saveLink = this.saveLink.bind(this);
        this.sendMail = this.sendMail.bind(this);
        this.handleMailResponse = this.handleMailResponse.bind(this);

        //initialize the clipboard event listeners
        new Clipboard('.link');
    }

    /**
     * Function shows message related to clipboard
     * Clipboard is call automatically by event listener
     */
    saveLink(){
        //analytics event save-link
        analytics.track('save-link');

        //check if the clipboard is supported by browser
        if(Clipboard.isSupported()){
            this.props.showMessage("clipboard_success");
        } else {
            this.props.showMessage("clipboard_not_supported");
        }
    }

    /**
     * Function for sending the email with the image link,
     * callback is handled with handleMailResponse function.
     */
    sendMail(){
        let address = prompt("Zadejte emailovou adresu");

        //validate email address
        if (address != null && checkValidEmail(address)){
            Meteor.call('email.send', address, this.props.src, this.props.name, this.handleMailResponse);

            //analytics event send-mail
            analytics.track('send-mail', {
                category: 'Send mail button',
                label: address
            });
        } else {
            this.props.showMessage("mail_bad_format");
        }
    }

    /**
     * Function for handle the response of mail function
     *
     * @param {Meteor.Error} error Error.
     */
    handleMailResponse(error){
        //if error - show message
        if(error){
            let log = new Logger('handle-mail-response');
            log.error("Mail send with error "+ error);
            this.props.showMessage("mail_error");
        } else {
            this.props.showMessage("mail_success");
        }
    }

    render() {
        return (
            <div className="search-item">
                <a href={this.props.src} target="_blank">
                    <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                         alt={this.props.name} data-src={this.props.src} className="b-lazy"/>
                </a>
                <h3>{this.props.name}</h3>
                <span>#{this.props.tags.join()}</span>
                <div>
                    <button className="link" title="Zkopírovat odkaz do schránky"
                            onClick={this.saveLink}
                            data-clipboard-text={this.props.src}></button>
                    <button className="mail" title="Odeslat obrázek mailem" onClick={this.sendMail}></button>
                    <a href={this.props.src} download>Stáhnout</a>
                </div>
            </div>
        );
    }
}

/**
 * Props showMessage
 * Props src
 * Props name
 * Props tags
 */
SearchingImageItem.propTypes = {
    showMessage: React.PropTypes.func,
    name: React.PropTypes.string,
    src: React.PropTypes.string,
    tags: React.PropTypes.array
};

/**
 * Map dispatch function to props
 */
const mapDispatchToProps = dispatch => ({
    showMessage: (messageType) => {
        dispatch(showMessage(messageType));
    }
});
/**
 * Connect function connects React components to a Redux Store
 */
export default connect(null, mapDispatchToProps)(SearchingImageItem);