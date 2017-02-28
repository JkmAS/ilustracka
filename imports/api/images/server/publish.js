import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

//import images
import { Images } from '../images.js';

/**
 * Definition of what server send to client-side database
 */
if (Meteor.isServer) {
    /**
     * Publish images collection
     *
     * @param {string} filter Filter (SHOW_ALL|SHOW_ALL_BY_QUERY|SHOW_NOT_BACKUP|SHOW_UPLOAD_NOT_COMPLETED)
     * @param {string} query Query from search filter
     * @param {number} limit Specify the limit, by default is 9 records
     *
     * @return {Array}
     */
    Meteor.publish('images', (filter = '', query = '', limit = 9) => {
        check(filter, String);
        check(query, String);
        check(limit, Number);

        switch (filter) {
            case 'SHOW_ALL':
                return Images.find();
            case 'SHOW_ALL_BY_QUERY':
                /**
                 * Remove special characters like \/^$*[]{}
                 * Allowed characters: |().?+-
                 * @see http://stackoverflow.com/a/16023953/4157378
                 * @see http://stackoverflow.com/questions/42282992
                 */
                let escapedQuery = query.replace(/[\/\\^$*[\]{}]/g, "");

                //search in name or in tags array, limit 9 results, case insensitive
                return Images.find(
                    {
                        $or :  [
                                    {
                                        "name" : {
                                            $regex : ".*"+escapedQuery+".*",
                                            $options : 'i'
                                        }
                                    }, {
                                        "tags": {
                                            $regex : ".*"+escapedQuery+".*",
                                            $options : 'i'
                                        }
                                    }
                                ]
                    },
                    {
                        limit: limit
                    }
                );
            case 'SHOW_UPLOAD_NOT_COMPLETED':
                return Images.find({tags: [""]});
            default:
                return Images.find();
        }
    });
}
