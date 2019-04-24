// Import client startup through a single index entry point

import 'bootstrap';
import './routes.js';

Meteor.subscribe('users');
