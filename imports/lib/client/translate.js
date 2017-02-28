import { HTTP } from 'meteor/http';

//checks
import {checkNonEmptyString} from '../client/checkVariables.js';

/**
 * Functions for translate string to the defined language using Transltr.org API
 */

/**
 * Function for translating the string
 *
 * @param {string} string String to translate.
 * @param {string} from From language.
 * @param {string} to To language.
 * @param {Function} callback Callback function.
 *
 * @see http://www.transltr.org/Developers
 *
 * @return {string|boolean} Return translated string or false if failed
 */
export function translate(string, from, to, callback){
    let log = new Logger('translate');

    HTTP.post('http://www.transltr.org/api/translate',
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
            }, function(error, response){
                if (error) {
                    log.error("Translate string "+string+" with error "+error);
                    //call callback with false
                    callback(false);
                } else {
                    //parse string to JSON and get only one parameter 'translationText'
                    let parsedResponse = JSON.parse(response.content).translationText;

                    //check if string is not empty
                    if(checkNonEmptyString(parsedResponse)){
                        callback(parsedResponse);
                    } else {
                        callback(false);
                    }
                }
            }
    );
}
