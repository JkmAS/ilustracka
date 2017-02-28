import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { analytics } from "meteor/okgrow:analytics";

//Images collection
import { Images } from '../../../api/images/images.js';
import { createContainer } from 'meteor/react-meteor-data';

//actions
import {changeLimit} from '../../../actions/pagination.js';
import {showMessage, hideMessage} from '../../../actions/message.js';

//zip generator
import {backup} from '../../../lib/client/zipGenerator.js';

//components
import Header from './../Header.jsx';
import MessagePanel from './../MessagePanel.jsx';
import SearchingConsole from './../searching/SearchingConsole.jsx';
import AdminImageItem from './AdminImageItem.jsx';

/**
 * Component handles administration of app
 */
export class Administration extends Component {

    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        this.increaseLimit = this.increaseLimit.bind(this);
        this.makeBackup = this.makeBackup.bind(this);

        //prevent show messages from other components
        this.props.hideMessage();
    }


    /**
     * Function for increasing limit of displayed records (+ 9 records)
     */
    increaseLimit(){
        this.props.changeLimit(this.props.limit+9);
    }

    /**
     * Function for making zip file with backup images (20 images on one zipping)
     */
    makeBackup(){
        backup(20, (result) => {
            //analytics event make-backup
            analytics.track("make-backup");

            this.props.showMessage(result.toLowerCase());
        });
    }


    render() {
        let info = '';
        //show info message, if it is empty
        if(this.props.images == 0){
            info = <p>Nic nenalezeno</p>;
        }

        return (
            <div>
                <Header complex={true} menu={{name: 'Administrace', path: '/app/administration', pathName: 'Administrace'}}/>
                <MessagePanel message={this.props.message} size="big"/>
                <SearchingConsole/>

                <div className="admin">
                    <h2>Poslední nahrané</h2>
                    {info}
                    <table>
                        <thead>
                            <tr>
                                <th>ID obrázku</th>
                                <th>Odkaz</th>
                                <th>Datum změny</th>
                                <th>Název</th>
                                <th>Tagy</th>
                                <th colSpan="2">Akce</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.images.map(image =>
                                <AdminImageItem
                                    key={image._id}
                                    {...image}
                                />
                            )}
                        </tbody>
                    </table>
                    <div>
                        <button onClick={this.increaseLimit}>Načíst další</button>
                        <button onClick={this.makeBackup}>Stáhnout zálohu</button>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Props changeLimit
 * Props showMessage
 * Props hideMessage
 * Props message
 * Props images
 * Props limit
 * Props filter
 */
AdminImageItem.propTypes = {
    changeLimit: React.PropTypes.func,
    showMessage: React.PropTypes.func,
    hideMessage: React.PropTypes.func,
    message: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.shape({
            type: React.PropTypes.string,
            text: React.PropTypes.string,
            gen: React.PropTypes.oneOf(['appbot', undefined]),
        })
    ]),
    images: React.PropTypes.array,
    limit: React.PropTypes.number,
    filter: React.PropTypes.string
};

/**
 * Subscribe data from database
 *
 * @param {string} filter Filter from state.filter to set query
 * @param {number} limit Limit
 */
const container =  createContainer(({filter, limit}) => {
    //all images to limit
    Meteor.subscribe('images', 'SHOW_ALL_BY_QUERY', filter, limit);
    //sort by date
    return {
        images: Images.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, Administration);

/**
 * Map state to props
 */
const mapStateToProps = state => ({
    message: state.message,
    images: state.images,
    limit: state.limit,
    filter: state.filter
});

/**
 * Map dispatch function to props
 */
const mapDispatchToProps = dispatch => ({
    changeLimit: (limit) => {
        dispatch(changeLimit(limit));
    },
    showMessage: (messageType) => {
        dispatch(showMessage(messageType));
    },
    hideMessage: () => {
        dispatch(hideMessage());
    }
});
/**
 * Connect function connects React components to a Redux Store
 *
 * At first connect container, which is related to component
 */
export default connect(mapStateToProps,mapDispatchToProps)(container);