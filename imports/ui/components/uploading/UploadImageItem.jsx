import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { analytics } from "meteor/okgrow:analytics";

//checks
import {checkNonEmptyArray, checkNonEmptyString} from '../../../lib/client/checkVariables.js';

//translating
import {translate} from '../../../lib/client/translate.js';

//actions
import {showMessage} from '../../../actions/message.js';
import {updateImage} from '../../../actions/images.js';



/**
 * Component for saving documents into database and using AI to generate tags
 */
export class UploadImageItem extends Component {

    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        this.useAI = this.useAI.bind(this);
        this.save = this.save.bind(this);
        this.handleAIResponse = this.handleAIResponse.bind(this);
        this.showTranslatedTags = this.showTranslatedTags.bind(this);
        this.changeTags = this.changeTags.bind(this);

        this.state = {
            tags: '',
            loading: false
        };
    }



    /**
     * Call server method to use Amazon Rekognition AI for pre-filling the tags,
     * callback is handled with handleAIResponse function.
     *
     * @param {Object} event Event.
     */
    useAI(event){
        event.preventDefault();

        //set loading icon
        this.setState({loading: true});

        //analytics event use-ai
        analytics.track("use-ai", {image: this.props.name});

        //call server method
        Meteor.call('ai.recognize', this.props._id, this.handleAIResponse);
    }

    /**
     * Function for handle the response of Amazon Rekognition AI
     * and call translation to defined language,
     * callback of translation is handled with showTranslatedTags function.
     *
     * @param {Meteor.Error} error Error.
     * @param {Object} result Success result.
     */
    handleAIResponse(error, result){
        //if error - show message
        if(error){
            let log = new Logger('handle-ai-response');
            log.error("Use AI image recognition with error "+ error);
            this.props.showMessage("ai_error");
            this.setState({loading: false});
        //if success - map the array of objects to string and translate
        } else {
            //if there is no tags related to image
            if(result.length === 0) {
                this.props.showMessage("ai_empty");
                this.setState({loading: false});
            //if there is tags related to image
            } else {
                let tagsAI = [];
                //get from objects only the name of tag
                for (let i = 0; i < result.length; i++) {
                    tagsAI.push(result[i].Name);
                }
                //translate the tags, join the array to string
                translate(tagsAI.join(" "), "en", "cs", this.showTranslatedTags);
            }
        }
    }

    /**
     * Function for handle the response of translation api
     *
     * @param {string|boolean} response False or response.
     */
    showTranslatedTags(response){
        //if response is successful
        if(response !== false) {
            //add comma to string
            let readyTags = response.split(' ').join(',');
            //set state and add to input value
            this.setState({tags: readyTags});
        //if response failed
        } else {
            this.props.showMessage("ai_error");
        }
        this.setState({loading: false});
    }

    /**
     * Function, which set the tags to the state tags
     *
     * @param {Object} event Event.
     */
    changeTags(event){
        this.setState({tags: event.target.value});
    }

    /**
     * Function for saving into database
     *
     * @param {Object} event Event.
     */
    save(event){
        event.preventDefault();

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
        this.props.showMessage("upload_success_completed");
    }

    render() {
        return (
            <div className="upload-item">
                <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                     alt={this.props.name} data-src={this.props.src} className="b-lazy"/>
                <div>
                    <form>
                        <label>Název<span>*</span></label>
                        <input type="text" placeholder="Název" defaultValue={this.props.name} ref="name" required/>

                        <label>Tagy<span>*</span></label>
                        <input type="text" placeholder="Klíčová slova oddělená čárkou!" value={this.state.tags} ref="tags" onChange={this.changeTags} required/>

                        <button className={this.state.loading ? 'ai-loading' : 'ai'} title="Automaticky vygenerovat tagy" onClick={this.useAI}></button>
                        <button className="save" title="Uložit změny" onClick={this.save}>Uložit</button>
                    </form>
                </div>
            </div>
        );
    }
}

/**
 * Props showMessage
 * Props updateImage
 * Props _id
 * Props name
 * Props src
 */
UploadImageItem.propTypes = {
    showMessage: React.PropTypes.func,
    updateImage: React.PropTypes.func,
    _id: React.PropTypes.string,
    name: React.PropTypes.string,
    src: React.PropTypes.string
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
});
/**
 * Connect function connects React components to a Redux Store
 */
export default connect(null, mapDispatchToProps)(UploadImageItem);