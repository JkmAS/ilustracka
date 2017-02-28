import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

//import images collection
import { Images } from './images.js';

/**
 * Definition of methods for database operations on the client and server side for Images collection
 * to update as soon as possible. Client call the methods via Meteor.call
 */
Meteor.methods({
    /**
     * INSERT to Image collection
     *
     * @param {string} name Name of image
     * @param {Array} tags Tags of image
     * @param {string} src  Url address of image to storage
     *
     * @throws {Meteor.Error} Error
     */
    'images.insert'(name, tags, src) {
        let log = new Logger('images-insert');

        //make sure the user is logged in
        if (! this.userId) {
            log.error("Insert image with name "+name+" - not authorized");
            throw new Meteor.Error('not-authorized');
        }

        check(name, String);
        check(tags, [String]);
        check(src, String);

        Images.insert({
            name: name,
            src: src,
            tags: tags,
            backup: false,
            createdAt: new Date()
        });
    },
    /**
     * DELETE from Image collection
     *
     * @param {string} id Id of image
     *
     * @throws {Meteor.Error} Error
     */
    'images.delete'(id){
        let log = new Logger('images-delete');

        //make sure the user is logged in
        if (! this.userId) {
            log.error("Delete image with id "+id+" - not authorized");
            throw new Meteor.Error('not-authorized');
        }

        //make sure the user has admin role
        if(!Roles.userIsInRole(this.userId, 'admin')){
            log.error("Delete image with id "+id+" - admin is not authorized");
            throw new Meteor.Error('not-authorized');
        }

        check(id, String);

        //check if document exists
        let image = Images.findOne({_id: id});
        //if true - remove, if false - error
        if(image) {
            Images.remove(id);
        } else {
            log.error("Delete image with id "+id+" - image does not exist");
            throw new Meteor.Error('not-exists');
        }
    },
    /**
     * UPDATE of Image collection
     *
     * @param {string} id Id of image
     * @param {string} name Name of image
     * @param {Array} tags Tags of image
     *
     * @throws {Meteor.Error} Error
     */
    'images.update'(id, name, tags){
        let log = new Logger('images-update');

        //make sure the user is logged in
        if (! this.userId) {
            log.error("Update image with id "+id+" - not authorized");
            throw new Meteor.Error('not-authorized');
        }

        check(id, String);
        check(name, String);
        check(tags, [String]);

        //check if document exists
        let image = Images.findOne({_id: id});
        //if true - update, if false - error
        if(image) {
            Images.update(
                {_id: id},
                {
                    $set: {
                        name: name,
                        tags: tags,
                        backup: false,
                        createdAt: new Date()
                    }
                }
            );
        } else {
            log.error("Update image with id "+id+" - image does not exist");
            throw new Meteor.Error('not-exists');
        }
    },
});