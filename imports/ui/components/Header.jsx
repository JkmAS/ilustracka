import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory, Link } from 'react-router';

/**
 * Header component with the logo of app and apps navigation
 *
 * Using the component Link for change route without reloading the whole page
 */
export default class Header extends Component {

    /**
     * @constructor
     */
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    /**
     * Logout the user and redirect to root of app
     *
     * @param {Object} event Event.
     */
    logout(event){
        event.preventDefault();
        Meteor.logout(() => {
            browserHistory.push('/');
        });
    }

    render() {
        if(this.props.complex){
            return (
                <header>
                    <h1 className="complex">
                        <img src="/img/logo.png" alt="Ilustračka logo"/>
                        Ilustračka <small>{this.props.menu.name}</small>
                    </h1>
                    <div className="button-group">
                        <Link to={this.props.menu.path}>{this.props.menu.pathName}</Link>
                        <a href="#" onClick={this.logout}>Odhlásit</a>
                    </div>
                </header>
            );
        } else {
            return (
                <header>
                    <h1><img src="/img/logo.png" alt="Ilustračka logo" />Ilustračka</h1>
                </header>
            );
        }
    }
}

/**
 * Props complex
 * Props menu
 */
Header.propTypes = {
    complex: React.PropTypes.bool,
    menu: React.PropTypes.shape({
        name: React.PropTypes.oneOfType([React.PropTypes.string, undefined]),
        path: React.PropTypes.oneOfType([React.PropTypes.string, undefined]),
        pathName: React.PropTypes.oneOfType([React.PropTypes.string, undefined])
    }),
};
