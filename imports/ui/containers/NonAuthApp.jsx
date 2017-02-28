import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

/**
 * Container for checking if the user is already logged in
 *
 * There are two possible variants to control authenticated Routes - using onEnter or using components
 * @see https://forums.meteor.com/t/meteor-guide-authenticated-routes/20507
 */
export default class NonAuthApp extends Component {

    /**
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = this.getMeteorData();
    }

    /**
     * Get the current user id, or null if no user is logged in
     *
     * @return {Object} If user is authenticated, return object with true
     */
    getMeteorData(){
        return {
            isAuthenticated: Meteor.userId() !== null
        };
    }

    /**
     * Check if the user is logged in before the component mounts
     * If its true, then redirect according to his role to /app or /app/administration
     */
    componentWillMount() {
        if (this.state.isAuthenticated) {
            if(Roles.userIsInRole(Meteor.userId(), 'admin')){
                browserHistory.push('/app/administration');
            } else {
                browserHistory.push('/app');
            }
        }
    }

    render() {
        return (
            <div>
                {/* Components will be rendered here*/}
                {this.props.children}
            </div>
        );
    }
}