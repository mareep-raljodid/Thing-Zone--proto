import { Template } from 'meteor/templating';

import './users.html';

Template.Users.helpers({
    users() {
        return [1,2,3,4];
    }
});