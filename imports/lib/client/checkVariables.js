import { check } from 'meteor/check';
import { Match } from 'meteor/check';

/**
 * Functions for check variables from user input
 */

/**
 * Function for check if variable is non empty string
 *
 * @param {string} string String for check.
 *
 * @return {boolean} True if it is non empty string
 */
export function checkNonEmptyString(string){
    try {
        let nonEmptyString = Match.Where((string) => {
            //if string
            check(string, String);
            //if nonempty string
            return string.length > 0;
        });
        check(string, nonEmptyString);
        return true;
    } catch(e){
        return false;
    }
}

/**
 * Function for check if variable is non empty array
 *
 * @param {Array} array Array for check.
 *
 * @return {boolean} True if it is non empty array
 */
export function checkNonEmptyArray(array){
    try {
        let nonEmptyArray = Match.Where((array) => {
            //if string array
            check(array, [String]);
            //if only one element array - check nonempty element, or check empty array
            if (array.length == 1) {
                return array[0].length > 0;
            } else {
                return array.length > 0;
            }
        });
        check(array, nonEmptyArray);
        return true;
    } catch(e){
        return false;
    }
}

/**
 * Function for check if variable is valid email address
 *
 * Regex is taken from stackoverflow.com
 * @see http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
 *
 * @param {string} email Email address.
 *
 * @return {boolean} True if it is valid
 */
export function checkValidEmail(email){
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

/**
 * Function for check if variable is valid ilist email address
 *
 * @param {string} email Email address.
 *
 * @return {boolean} True if it is valid
 */
export function checkValidSpecificEmail(email){
    let regex = /[a-z0-9]{5,7}@ilist\.cz$/;
    return regex.test(email);
}