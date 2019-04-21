import { Template } from 'meteor/templating';

import './add-device.html';

Template.Add_device.helpers({
    devices() {
        return [1,2,3,4];
    }
});
