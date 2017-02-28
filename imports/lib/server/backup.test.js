/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Images } from './../../api/images/images.js';
import './backup.js';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { Match } from 'meteor/check';


if (Meteor.isServer) {
    describe('Backup', () => {
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

                it('cannot set backup true to image', () => {
                    const method = Meteor.server.method_handlers['images.backupCompleted'];
                    const invocation = { userId };
                    assert.throws(() =>  method.apply(invocation,[ [{_id: imageId, src: initSrc}] ]), Meteor.Error, "not-authorized");
                });
            });

            describe('admin', () => {

                beforeEach(() => {
                    Roles.addUsersToRoles(userId, ['admin']);
                });

                it('can set backup true to image', () => {
                    const method = Meteor.server.method_handlers['images.backupCompleted'];
                    const invocation = { userId };
                    method.apply(invocation,[ [{_id: imageId, src: initSrc}] ]);
                    assert.equal(Images.findOne({_id: imageId}).backup, true);
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