import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';

//Redux store
import Store from './../imports/store/store.js';

//containers
import NonAuthApp from '../imports/ui/containers/NonAuthApp.jsx';
import AuthApp from '../imports/ui/containers/AuthApp.jsx';

//components
import Login from '../imports/ui/components/login/Login.jsx';
import Searching from '../imports/ui/components/searching/Searching.jsx';
import Uploading from '../imports/ui/components/uploading/Uploading.jsx';
import Administration from '../imports/ui/components/administration/Administration.jsx';
import NotFound from '../imports/ui/components/NotFound.js';

/**
 * Routes of application and setting of provider
 *
 * / -> login
 * /app -> searching
 * /app/upload -> uploading of images
 * /app/administration -> page for admin of app
 * /404 -> Not found page
 *
 */
function Routes () {
    return (
        <Provider store={Store}>
            <Router history={browserHistory}>
                <Route path="/" component={NonAuthApp}>
                    <IndexRoute component={Login}/>
                </Route>
                <Route path="/app" component={AuthApp}>
                    <IndexRoute component={Searching}/>
                    <Route path="upload" component={Uploading}/>
                    <Route path="administration" component={Administration}/>
                </Route>
                <Route path="/404" component={NotFound} />
                <Redirect from='*' to='/404' />
            </Router>
        </Provider>
    )
}

/**
 * Function for waiting on data using in Meteor.user() method,
 * it is because of authentication in React-router
 *
 * Since there's no way to check whether the universal publication is ready,
 * add "do Tracker.autorun -> Meteor.user()" to react to the user data being published
 * @see https://github.com/meteor/docs/issues/62
 *
 * @param {Function} done Function, which will be call, when the data is ready
 */
function waitForAuthentication(done) {
    Tracker.autorun((computation) => {
        //if subscription ready, stop and call the function from parameter
        if (Roles.subscription.ready()) {
            computation.stop();
            done();
        }
    });
}

/**
 * Meteor startup method for generating code
 */
Meteor.startup(() => {
    //wait for data
    waitForAuthentication(()=>{
        render(<Routes/>, document.getElementById('app'));
    })
});