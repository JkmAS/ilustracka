import { Mongo } from 'meteor/mongo';

//import methods
import './methods.js';

/**
 * Definition of Images collection
 */
export const Images = new Mongo.Collection('images');

/**
 * The fields specify what will be publish from the collection to client side,
 * they prevent later added secret field from publishing to client side
 */
Images.publicFields = {
    _id: 1,
    name: 1,
    src: 1,
    tags: 1,
    backup: 1,
    createdAt: 1
};