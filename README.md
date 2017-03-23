Ilustracka
=========================
![stable](https://img.shields.io/badge/stable-1.1.0-blue.svg) ![license](https://img.shields.io/badge/license-MIT-brightgreen.svg) 

<p align="center">
  <img src="https://github.com/JkmAS/ilustracka/blob/master/docs/ilustracka-example.png" alt="Ilustracka"/>
</p>

About
-----
Ilustracka is the application for searching images in the student journalists association iList. 
The app is based on Meteor JavaScript platform in the variant with React. The app supports only
Czech language.

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
  
Settings of app
---------------
The file with app´s settings `settings.json` has this structure:
```
{
  "public": {
    "analyticsSettings": {
      "Google Analytics": {
        "trackingId": "<GA_ID>"
      }
    }
  },
  "AWSAccessKeyId": "<AWS_ID>",
  "AWSSecretAccessKey": "<AWS_KEY>",
  "S3Bucket": "<BUCKET_NAME>",
  "S3BucketRegion": "<BUCKET_REGION>",
  "SMTP": "smtp://USERNAME:PASSWORD@HOST:PORT",
  "email": "USERNAME@HOST"  
}
```

  
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
  * aws-sdk
  * babel-runtime
  * bcrypt
  * blazy
  * clipboard
  * clipboard-js
  * file-saver
  * jszip
  * jszip-utils
  * meteor-node-stubs
  * react
  * react-addons-pure-render-mixin
  * react-dom
  * react-redux
  * react-router
  * redux
  * redux-thunk
  
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
  * 1.1.0 - bux fixed, change of readme, set limit to 12, add link to image tag, remove hotjar tracking code

Author
------

Created by [JkmAS Mejstrik](http://www.jkmas.cz)

License
-------

Ilustracka is distributed under the MIT License.