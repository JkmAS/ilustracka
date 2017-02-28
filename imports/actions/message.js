/**
 * Action for showing the selected type of message to the user.
 *
 * @param {string} messageType Name of used message.
 *
 * @return {Object}
 */
export function showMessage(messageType) {
    return {
        type: 'SHOW_MESSAGE',
        messageType: messageType
    };
}

/**
 * Action for hiding the message to the user.
 *
 * @return {Object}
 */
export function hideMessage() {
    return {
        type: 'HIDE_MESSAGE',
        messageType: ''
    };
}

/**
 * Action for appbot generated text of message.
 *
 * @param {string} type Type of message (info, error, success, message).
 * @param {string} messageText Text of message.
 *
 * @return {Object}
 */
export function generateMessage(type, messageText) {
    return {
        type: 'GENERATE_MESSAGE',
        message: {
            gen: 'appbot',
            type: type,
            text: messageText
        }
    };
}