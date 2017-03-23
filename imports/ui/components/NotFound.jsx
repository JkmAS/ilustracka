import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

//components
import Header from './Header.jsx';

/**
 * Component handles 404 state
 */
export default class NotFound extends Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <Header complex={false}/>
                <div className="not-found">
                    <h2>404 - nenalezeno</h2>
                    <strong>Nemysleli jste některou z následujících stránek?</strong>
                    <ul>
                        <li><Link to={"/"}>Přihlášení</Link></li>
                        <li><Link to={"/app"}>Vyhledávání</Link></li>
                        <li><Link to={"/app/upload"}>Nahrávání</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}
