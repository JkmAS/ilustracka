import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import Blazy from 'blazy';

//Images collection
import { Images } from '../../../api/images/images.js';
import { createContainer } from 'meteor/react-meteor-data';

//actions
import {hideMessage} from '../../../actions/message.js';

//components
import Header from './../Header.jsx';
import MessagePanel from './../MessagePanel.jsx';
import UploadButton from './UploadButton.jsx';
import UploadImageItem from './UploadImageItem.jsx';

/**
 * Component handles uploading process
 */
export class Uploading extends Component {

    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        //prevent show messages from other components
        this.props.hideMessage();

        //construct the lazyloading with default offset 100px
        this.lazyloading = new Blazy();
    }


    /**
     * Function is invoked immediately after updating occurs and calls lazy loading
     */
    componentDidUpdate(){
        this.lazyloading.revalidate();
    }

    render() {
        let info = '';
        //show info message, if it is empty
        if(this.props.images == 0){
            info = <p>Žádné nedokončené nahrávání</p>;
        }

        return (
            <div>
                <Header complex={true} menu={{name: 'Nahrávání', path: '/app', pathName: 'Vyhledávání'}}/>
                <MessagePanel message={this.props.message} size="big"/>
                <UploadButton/>

                <div className="upload">
                    <h2>Nedokončené</h2>
                    <div className="upload-box">
                        {info}
                        {this.props.images.map(image =>
                            <UploadImageItem
                                key={image._id}
                                {...image}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Props message
 * Props images
 * Props hideMessage
 */
Uploading.propTypes = {
    message: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.shape({
            type: React.PropTypes.string,
            text: React.PropTypes.string,
            gen: React.PropTypes.oneOf(['appbot', undefined]),
        })
    ]),
    images: React.PropTypes.array,
    hideMessage: React.PropTypes.func
};

/**
 * Subscribe data from database
 */
const container =  createContainer(() => {
    //only images, which upload is not completed
    Meteor.subscribe('images', 'SHOW_UPLOAD_NOT_COMPLETED');
    //sort by date
    return {
        images: Images.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, Uploading);

/**
 * Map state to props
 */
const mapStateToProps = state => ({
    message: state.message,
    images: state.images
});
/**
 * Map dispatch function to props
 */
const mapDispatchToProps = dispatch => ({
    hideMessage: () => {
        dispatch(hideMessage());
    }
});
/**
 * Connect function connects React components to a Redux Store
 *
 * At first connect container, which is related to component
 */
export default connect(mapStateToProps, mapDispatchToProps)(container);