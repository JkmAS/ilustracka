import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';

/**
 * Definition of method for sending the mail on the server side.
 * Client call the methods via Meteor.call
 */
Meteor.methods({
    /**
     * Use Meteor Email to send email
     *
     * @param {string} to Addressee.
     * @param {string} link Link to image.
     * @param {string} name Name of image.
     *
     * @throws {Meteor.Error} Error
     */
    'email.send'(to, link, name) {
        let log = new Logger('mail-send');

        check([to, link, name], [String]);

        //make sure the user is logged in before inserting
        if (!this.userId) {
            log.error("Mail send - not authorized");
            throw new Meteor.Error('not-authorized');
        }

        //set the subject and the html message
        let html = "<p>Aplikace <strong>Ilustračka</strong> vám zasílá <a href='"+link+"'>odkaz na obrázek</a>.</p>";
        let subject = "Ilustračka: "+name;

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        try{
            Email.send({
                to: to,
                from: Meteor.settings.email,
                subject: subject,
                html: html
            });
        }catch(error){
            log.error("Mail send with error "+error);
            throw new Meteor.Error(error.code);
        }
    }
});