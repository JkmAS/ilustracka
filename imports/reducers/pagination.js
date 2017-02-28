/**
 * Reducer. It takes the current state and an action and returns the next state.
 *
 * @param {number} state State, by default is 9 records.
 * @param {Object} action Action.
 *
 * @return {number}
 */
export default function limit(state = 9, action = {}) {
    switch (action.type) {
        case 'CHANGE_LIMIT':
            return action.limit;
        default:
            return state;
    }
};