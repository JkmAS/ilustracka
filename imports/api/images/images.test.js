/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Images } from './images.js';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { Match } from 'meteor/check';


if (Meteor.isServer) {
    describe('Images', () => {
        describe('methods', () => {

            let userId;
            let imageId;

            let initName = "Name";
            let initSrc = "http://placehold.it/350x150";
            let initTags = ["tag1", "tag2", "tag3"];

            beforeEach(() => {
                Meteor.users.remove({});
                Images.remove({});

                userId = Accounts.createUser({
                    username: 'test@ilist.cz',
                    email: 'test@ilist.cz',
                    password: 'test'
                });

                imageId = Images.insert({
                    name: initName,
                    src: initSrc,
                    tags: initTags,
                    backup: false,
                    createdAt: new Date()
                });
            });

            describe('user', () => {

                beforeEach(() => {
                    Roles.addUsersToRoles(userId, ['user']);
                });

                it('can create image', () => {
                    const method = Meteor.server.method_handlers['images.insert'];
                    const invocation = { userId };
                    method.apply(invocation, ["Name", ["tag1", "tag2"], "http://placehold.it/350x150"]);
                    assert.equal(Images.find().count(), 2);
                });

                it('can update image', () => {
                    const method = Meteor.server.method_handlers['images.update'];
                    const invocation = { userId };
                    method.apply(invocation,[imageId, "Name2", initTags]);
                    assert.equal(Images.findOne({name: "Name2"}).name, "Name2");
                });

                it('cannot delete image', () => {
                    const method = Meteor.server.method_handlers['images.delete'];
                    const invocation = { userId };
                    assert.throws(() => method.apply(invocation,[imageId]), Meteor.Error, "not-authorized");
                });

                it('update image with no array of tags', () => {
                    const method = Meteor.server.method_handlers['images.update'];
                    const invocation = { userId };
                    assert.throws(() => method.apply(invocation,[imageId, initName, "tag1"]), Match.Error, 'Match error: Expected array, got "tag1"');
                });
            });

            describe('admin', () => {

                beforeEach(() => {
                    Roles.addUsersToRoles(userId, ['admin']);
                });

                it('can update image', () => {
                    const method = Meteor.server.method_handlers['images.update'];
                    const invocation = { userId };
                    method.apply(invocation,[imageId, "Name2", initTags]);
                    assert.equal(Images.findOne({name: "Name2"}).name, "Name2");
                });

                it('can delete image', () => {
                    const method = Meteor.server.method_handlers['images.delete'];
                    const invocation = { userId };
                    method.apply(invocation,[imageId]);
                    assert.equal(Images.find().count(), 0);
                });

                it('cannot delete no existing image', () => {
                    const method = Meteor.server.method_handlers['images.delete'];
                    const invocation = { userId };
                    assert.throws(() => method.apply(invocation,["NOTEXISTS"]), Meteor.Error, "not-exists");
                });
            });

            afterEach(() => {
                Meteor.users.remove({});
                Meteor.roles.remove({});
                Images.remove({});
            });
        });
    });
}