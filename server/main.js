import { Meteor } from 'meteor/meteor';

//import startups
import '../imports/startup/server/users.js';//set default users only once
import '../imports/startup/server/mail.js';//set mail environment variables

//import images collection to server
import '../imports/api/images/images.js';
import '../imports/api/images/server/publish.js';

//import lib directory
import '../imports/lib/server/aiRekognition.js';
import '../imports/lib/server/backup.js';
import '../imports/lib/server/mail.js';
import '../imports/lib/server/storageS3.js';

Meteor.startup(() => {
    let log = new Logger('server-main');
    log.info("First time starting server.");
});
