import { Template } from 'meteor/templating';

import { Homes } from '../../../api/homes/homes';
import { Devices } from '../../../api/devices/devices';

import './add-device.html';

Template.Add_device.helpers({
    devices() {
        return Devices.find();
    }
});

Template.Add_device.events({
    'click .device'( e ) {
        const id = e.target.dataset.id;
        Homes.update( Session.get('home'), {
            $push: { devices: id }
        }, ()=> {
            $('.wrapper > .container').append(`
                <div class="alert alert-primary alert-dismissible fade show" role="alert">
                    ${ Devices.findOne( id ).name } has been added to your smarthome!
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `);
        });
    }
});
