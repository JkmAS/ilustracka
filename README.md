Ilustracka
=========================
![stable](https://img.shields.io/badge/stable-1.0.0-blue.svg) ![license](https://img.shields.io/badge/license-MIT-brightgreen.svg) 

<p align="center">
  <img src="https://github.com/JkmAS/ilustracka/blob/master/docs/ilustracka-example.png" alt="Ilustracka"/>
</p>

About
-----
Ilustracka is the application for searching images in the student journalists association iList. 
The app is based on Meteor JavaScript platform in the variant with React. 

Installation
------------
App
  1. Install Meteor `curl https://install.meteor.com/ | sh`
  2. Install required packages `meteor npm install --save`
  3. Set your Google Analytics, Amazon S3 Storage and email server via `settings.json`
  4. Run locally `npm start` at http://localhost:3000/ 
  5. Change user and admin default password in DB
Tests
  1. Run locally `npm test` at http://localhost:3000/
   

Features
--------

  * Searching images (with Regex features)
  * Uploading images
  * Adding tags and name to image
  * Automatic generating of tags
  * Renaming/updating/deleting images
  * Backup the images via ZIP files
  * Send email with the link to image
  
Google analytics events
-----------------------

Name of event  | Description
-------------  | -----------
search-query   | Query of user in search console
save-link      | Copy a link to image
send-mail      | Email address
upload-image   | Array of images
use-ai         | The name of the analyzed image
delete-image   | The name of the deleted image
make-backup    | That admin generated the backup

Requirements
------------

NPM packages
  * aws-sdk: ^2.12.0
  * babel-runtime: ^6.22.0
  * bcrypt: ^1.0.2
  * blazy: ^1.8.2
  * clipboard: ^1.6.0
  * clipboard-js: ^0.3.3
  * file-saver: ^1.3.3
  * jszip: ^3.1.3
  * jszip-utils: 0.0.2
  * meteor-node-stubs: ^0.2.5
  * react: ^15.4.2
  * react-addons-pure-render-mixin: ^15.4.2
  * react-dom: ^15.4.2
  * react-redux: ^5.0.2
  * react-router: ^3.0.2
  * redux: ^3.6.0
  * redux-thunk: ^2.2.0
  
Meteor packages 
  * meteor-base
  * mobile-experience
  * mongo
  * blaze-html-templates
  * reactive-var
  * jquery
  * tracker  
  * standard-minifier-css
  * standard-minifier-js
  * es5-shim
  * ecmascript
  * shell-server  
  * react-meteor-data
  * accounts-password
  * check
  * audit-argument-checks
  * edgee:slingshot
  * http
  * email
  * alanning:roles
  * jag:pince
  * okgrow:analytics
  * practicalmeteor:mocha

Support of browsers
-------------------

It works on all versions of current browsers.

Browser        | version
-------------  | -------
IE             | 11+
Edge           | 
Firefox        | 51+
Chrome         | 56+
Chrome mobile  | 55+
Android Browser| 42+
Safari         | 10+
Safari Mobile  | 10+
Opera          | 42+

Version
------

  * 1.0.0 - initial release

Author
------

Created by [JkmAS Mejstrik](http://www.jkmas.cz)

License
-------

Ilustracka is distributed under the MIT License.