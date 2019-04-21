import { Template } from 'meteor/templating';

import './home.html';

Template.App_home.helpers({
    devices() {
        return [1,2,3,4];
    }
});
