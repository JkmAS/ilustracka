import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Roles } from 'meteor/alanning:roles';

//components
import Header from './../Header.jsx';
import MessagePanel from "./../MessagePanel.jsx";

//actions
import {showMessage, hideMessage} from '../../../actions/message.js';

//checks
import {checkValidSpecificEmail, checkNonEmptyString} from '../../../lib/client/checkVariables.js';

/**
 * Component with login box
 */
export class Login extends Component {

    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        this.checkEmail = this.checkEmail.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.login = this.login.bind(this);
        this.showLoginManual = this.showLoginManual.bind(this);

        //prevent show messages from other components
        this.props.hideMessage();

        this.state = {
            email: '',
            emailIsValid: false,
            password: '',
            passwordIsValid: false
        };
    }

    /**
     * Login function, in case of success it will redirect to /app
     *
     * @param {Object} event Event.
     */
    login(event) {
        event.preventDefault();
        let email = this.state.email;
        let password = this.state.password;
        let emailIsValid = this.state.emailIsValid;
        let passwordIsValid = this.state.passwordIsValid;

        //if values are valid
        if (emailIsValid && passwordIsValid) {
            Meteor.loginWithPassword(email, password, (error) => {
                if (error) {
                    let log = new Logger('login');
                    log.error("User login with error "+error);
                    this.props.showMessage("login_fail");
                } else {
                    this.props.hideMessage();
                    //if admin -> /app/administration
                    if(Roles.userIsInRole(Meteor.userId(), 'admin')) {
                        browserHistory.push('/app/administration');
                    //if user -> /app
                    } else {
                        browserHistory.push('/app');
                    }
                }
            });
        } else {
            this.props.showMessage("login_fail");
        }
    }

    /**
     * The function checks the correct email form input
     *
     * @param {Object} event Event.
     */
    checkEmail(event){
       this.setState({email: event.target.value}, () => {
            if(!checkValidSpecificEmail(this.state.email)){
                this.props.showMessage("login_mail_bad_format");
                this.setState({emailIsValid: false});
            } else {
                this.props.hideMessage();
                this.setState({emailIsValid: true});
            }
        });
    }

    /**
     * The function checks the correct password form input
     *
     * @param {Object} event Event.
     */
    checkPassword(event){
        this.setState({password: event.target.value}, () => {
            if(!checkNonEmptyString(this.state.password)){
                this.props.showMessage("login_no_password");
                this.setState({passwordIsValid: false});
            } else{
                this.props.hideMessage();
                this.setState({passwordIsValid: true});
            }
        });
    }

    /**
     * The function shows detailed information about logging
     */
    showLoginManual(){
        this.props.showMessage("login_info");
    }

    render() {
        return (
            <div>
                <Header complex={false}/>
                <MessagePanel message={this.props.message} size="small"/>
                <div className="login">
                    <h2>Přihlásit se</h2>
                    <form>
                        <label>Email<span>*</span></label>
                        <input type="email"
                               placeholder="Email"
                               pattern="[a-z0-9]{5,7}@ilist\.cz$"
                               onChange={this.checkEmail}
                               required />

                        <label>Heslo<span>*</span></label>
                        <input type="password"
                               placeholder="Heslo"
                               onChange={this.checkPassword}
                               required />

                        <button onClick={this.login}>Přihlásit</button>
                        <a href="#" onClick={this.showLoginManual}>Zapomněli jste heslo?</a>
                    </form>
                </div>
            </div>
        );
    }
}

/**
 * Props showMessage
 * Props hideMessage
 * Props message
 */
Login.propTypes = {
    showMessage: React.PropTypes.func,
    hideMessage: React.PropTypes.func,
    message: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.shape({
            type: React.PropTypes.string,
            text: React.PropTypes.string,
            gen: React.PropTypes.oneOf(['appbot', undefined]),
        })
    ])
};

/**
 * Map state to props
 */
const mapStateToProps = state => ({
    message: state.message
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
    }
});
/**
 * Connect function connects React components to a Redux Store
 */
export default connect(mapStateToProps, mapDispatchToProps)(Login);
