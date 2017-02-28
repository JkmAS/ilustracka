/**
 * Reducer. It takes the current state and an action and returns the next state.
 *
 * @param {string} state State.
 * @param {Object} action Action.
 *
 * @return {string}
 */
export default function filter(state = "", action = {}) {
    switch (action.type) {
        case 'SET_FILTER':
            return action.string;
        default:
            return state;
    }
};