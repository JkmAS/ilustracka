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
import SearchingImageItem from './SearchingImageItem.jsx';
import SearchingConsole from './SearchingConsole.jsx';

/**
 * Component handles searching process
 */
export class Searching extends Component {
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
            info = <p>Žádné odpovídající výsledky</p>;
        }

        return (
            <div>
                <Header complex={true} menu={{name: 'Vyhledávání', path: '/app/upload', pathName: 'Nahrávání'}}/>
                <MessagePanel message={this.props.message} size="big"/>
                <SearchingConsole/>
                <div className="search">
                    <h2>Výsledky</h2>
                    <div className="search-box">
                        {info}
                        {this.props.images.map(image =>
                            <SearchingImageItem
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
 * Props filter
 */
Searching.propTypes = {
    message: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.shape({
            type: React.PropTypes.string,
            text: React.PropTypes.string,
            gen: React.PropTypes.oneOf(['appbot', undefined]),
        })
    ]),
    images: React.PropTypes.array,
    hideMessage: React.PropTypes.func,
    filter: React.PropTypes.string
};

/**
 * Subscribe data from database
 *
 * @param {string} filter Filter from state.filter to set query
 */
const container =  createContainer(({filter}) => {
    //all images corresponding to query
    Meteor.subscribe('images', 'SHOW_ALL_BY_QUERY', filter,  12);
    return {
        images: Images.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, Searching);

/**
 * Map state to props
 */
const mapStateToProps = state => ({
    message: state.message,
    images: state.images,
    filter: state.filter,
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