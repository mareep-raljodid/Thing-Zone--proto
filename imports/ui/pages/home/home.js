import { Template } from 'meteor/templating';

import { Homes } from '../../../api/homes/homes';
import { Devices } from '../../../api/devices/devices';

import './home.html';

Template.App_home.helpers({
    devices() {
        return Homes.findOne( Session.get('home') ).devices.map( id=> Devices.findOne( id ));
    }
});
