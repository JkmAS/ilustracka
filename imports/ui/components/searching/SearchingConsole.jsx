import React, { Component } from 'react';
import { connect } from 'react-redux';
import { analytics } from "meteor/okgrow:analytics";

//actions
import {showMessage, hideMessage} from '../../../actions/message.js';
import {setFilter} from '../../../actions/searchFilter.js';

/**
 * Component for working with search filter and manual
 */
export class SearchingConsole extends Component {

    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        this.manual = this.manual.bind(this);
        this.setQuery = this.setQuery.bind(this);

        this.state = {
            isManualOpen: false
        };
    }

    /**
     * Function, which set the query in the search filter
     *
     * @param {Object} event Event.
     */
    setQuery(event){
        //analytics event search-query
        analytics.track("search-query", {query: event.target.value});

        this.props.setFilter(event.target.value);
    }

    /**
     * Function for show and hide the manual
     */
    manual(){
        //if manual is already displayed - hide
        if(this.state.isManualOpen) {
            this.props.hideMessage();
            this.setState({isManualOpen: false});
        //if manual is hidden - show
        } else {
            this.props.showMessage("manual");
            this.setState({isManualOpen: true});
        }
    }

    render() {
        return (
            <div className="search-console">
                <input type="text" value={this.props.filter} onChange={this.setQuery}/>
                <button className="find"></button>
                <button className="info" onClick={this.manual}></button>
            </div>
        );
    }
}

/**
 * Props filter
 * Props showMessage
 * Props hideMessage
 * Props setFilter
 */
SearchingConsole.propTypes = {
    hideMessage: React.PropTypes.func,
    showMessage: React.PropTypes.func,
    setFilter: React.PropTypes.func,
    filter: React.PropTypes.string
};

/**
 * Map state to props
 */
const mapStateToProps = state => ({
    filter: state.filter
});
/**
 * Map dispatch function to props
 */
const mapDispatchToProps = dispatch => ({
    showMessage: (messageType) => {
        dispatch(showMessage(messageType));
    },
    hideMessage: () => {
        dispatch(hideMessage());
    },
    setFilter: (filter) => {
        dispatch(setFilter(filter));
    }
});
/**
 * Connect function connects React components to a Redux Store
 */
export default connect(mapStateToProps, mapDispatchToProps)(SearchingConsole);