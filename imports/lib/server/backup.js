import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

//import images collection
import { Images } from './../../api/images/images.js';

/**
 * Definition of method for getting src and id of not backup images to client
 * Client call the methods via Meteor.call
 */
Meteor.methods({
    /**
     * Return object array with src and id of not backup images
     *
     * @param {number} limit Limit.
     *
     * @return {Array}  Array of objects of not backup images.
     *
     * @throws {Meteor.Error} Error
     */
    'images.backup'(limit) {
        if (Meteor.isServer) {
            let log = new Logger('images-backup');

            //make sure the user is logged in before inserting
            if (!this.userId) {
                log.error("Image backup - not authorized");
                throw new Meteor.Error('not-authorized');
            }

            //make sure the user has admin role
            if(!Roles.userIsInRole(this.userId, 'admin')){
                log.error("Image backup - admin is not authorized");
                throw new Meteor.Error('not-authorized');
            }

            check(limit, Number);

            //get only not backup images - only the src and id field, sorted by date
            return Images.find(
                {
                    backup: false
                },
                {
                    limit: limit,
                    fields: {
                        'src': 1
                    },
                    sort: {
                        createdAt: -1
                    }
                }
            ).fetch();
        }
    },
    /**
     * Change the state already backed up files to backup: true
     *
     * @param {Object} images Images.
     *
     * @throws {Meteor.Error} Error
     */
    'images.backupCompleted'(images) {
        if (Meteor.isServer) {
            let log = new Logger('images-backup-completed');

            //make sure the user is logged in before inserting
            if (!this.userId) {
                log.error("Image backup completed - not authorized");
                throw new Meteor.Error('not-authorized');
            }

            //make sure the user has admin role
            if(!Roles.userIsInRole(this.userId, 'admin')){
                log.error("Image backup completed - admin is not authorized");
                throw new Meteor.Error('not-authorized');
            }

            check(images,[
                {
                    _id: String,
                    src: String
                }
            ]);

            //get id from array of object and push them into ids array
            let ids = images.map((image) => (image._id));
            //download each image and zip him
            ids.forEach((id) => {
                //check if document exists
                let image = Images.findOne({_id: id});
                //if exists, update
                if(image) {
                    Images.update(
                        {_id: id},
                        {
                            $set: {
                                backup: true
                            }
                        }
                    );
                }
            });
        }
    },
});