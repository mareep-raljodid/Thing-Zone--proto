// Import client startup through a single index entry point

import 'bootstrap';
import './routes.js';
import './notif';

Meteor.subscribe('users');
