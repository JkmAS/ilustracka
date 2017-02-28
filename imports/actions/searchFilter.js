/**
 * Action for setting the filter
 *
 * @param {string} filter String of search filter.
 *
 * @return {Object}
 */
export function setFilter(filter) {
    return {
        type: 'SET_FILTER',
        string: filter
    };
}