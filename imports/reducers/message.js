/**
 * Reducer. It takes the current state and an action and returns the next state.
 *
 * @param {string} state State.
 * @param {Object} action Action.
 *
 * @return {string}
 */
export default function message(state = "", action = {}) {
    //scroll users to top of the page
    scroll(0,0);
    switch (action.type) {
        case 'SHOW_MESSAGE':
            return action.messageType;
        case 'HIDE_MESSAGE':
            return action.messageType;
        case 'GENERATE_MESSAGE':
            return action.message;
        default:
            return state;
    }
};
