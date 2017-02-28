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
export default class AuthApp extends Component {

    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        this.checkAuthentication = this.checkAuthentication.bind(this);

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
     * Check if the user is logged and check the roles
     */
    checkAuthentication(){
        //get current path
        let path = this.props.location.pathname;

        //if logged user gets /app/administration and is not admin, redirect to root
        if (this.state.isAuthenticated &&
            path.includes("/app/administration") &&
            !Roles.userIsInRole(Meteor.userId(), 'admin')){
                browserHistory.push('/');

        }

        //if user is not authenticated, redirect to root
        if (!this.state.isAuthenticated) {
            browserHistory.push('/');
        }
    }

    /**
     * Check if the user is logged in before the component mounts
     */
    componentWillMount() {
        this.checkAuthentication();
    }

    /**
     * Check if the user is logged in immediately after updating components
     */
    componentDidUpdate(){
        this.checkAuthentication();
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