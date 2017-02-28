import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/**
 * Fill the DB with users data on startup
 */
if (Meteor.isServer) {
    let log = new Logger('users');

    //add users with default settings
    if (Meteor.users.find().count() === 0) {
        log.info("Creating user account...");
        let userId = Accounts.createUser({
            username: 'dropbox@ilist.cz',
            email: 'dropbox@ilist.cz',
            password: 'test'
        });
        Roles.addUsersToRoles(userId, ['user']);

        log.info("Creating admin account...");
        let adminId = Accounts.createUser({
            username: 'admin@ilist.cz',
            email: 'admin@ilist.cz',
            password: 'test'
        });
        Roles.addUsersToRoles(adminId, ['admin']);

        log.info("Accounts created. Please change the passwords!");
    }

    //deny all client-side updates to user documents for security purposes
    Meteor.users.deny({
        update() {
            return true;
        }
    });

    //login token expires in 5 days, calls to createUser from the client will be rejected
    Accounts.config({
        forbidClientAccountCreation: true,
        loginExpirationInDays: 5
    });
}
