import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

/**
 * Definition of method for translate string to the defined language using Transltr.org API
 * Client call the methods via Meteor.call
 */
Meteor.methods({
    /**
     * Function for translating the string
     *
     * @param {string} string String to translate.
     * @param {string} from From language.
     * @param {string} to To language.
     *
     * @see http://www.transltr.org/Developers
     *
     * @return {string} Return translated string
     *
     * @throws {Meteor.Error} Error
     */
    'translate'(string, from, to) {
        if (Meteor.isServer) {
            let log = new Logger('translate');

            //make sure the user is logged in before translating
            if (!this.userId) {
                log.error("Translate text "+string+" - not authorized");
                throw new Meteor.Error('not-authorized');
            }

            check(string, String);
            check(from, String);
            check(to, String);

            try {
                let result = HTTP.post('http://www.transltr.org/api/translate',
                    {
                        data: {
                            text: string,
                            from: from,
                            to: to
                        },
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                );

                //parse string to JSON and get only one parameter 'translationText'
                return JSON.parse(result.content).translationText;

            } catch(error){
                log.error("Translate text "+string+" with error "+error);
                throw new Meteor.Error(error);
            }
        }
    },
});