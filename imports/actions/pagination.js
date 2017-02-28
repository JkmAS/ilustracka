/**
 * Action for changing limit of pagination.
 *
 * @param {number} limit Limit
 *
 * @return {Object}
 */
export function changeLimit(limit) {
    return {
        type: 'CHANGE_LIMIT',
        limit: limit
    };
}