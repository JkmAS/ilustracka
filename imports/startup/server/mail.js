import { Meteor } from 'meteor/meteor';

/**
 * Set the vars for mail on startup,
 * Meteor.settings.SMTP must be in format smtp://USERNAME:PASSWORD@HOST:PORT.
 *
 * Now using seznam.cz SMTP server
 * @see https://napoveda.seznam.cz/cz/email/imap-pop3-smtp/
 *
 */
if (Meteor.isServer) {
    process.env.MAIL_URL = Meteor.settings.SMTP;
}
