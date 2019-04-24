// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Devices } from '../../api/devices/devices';

Meteor.startup(() => {
  // if the Links collection is empty
  if (Devices.find().count() === 0) {

    Devices.insert({ name: 'Smart light', faIcon: 'lightbulb' });
    Devices.insert({ name: 'Camera', faIcon: 'video' });
    Devices.insert({ name: 'Door lock', faIcon: 'lock' });
    Devices.insert({ name: 'Smoke detector', faIcon: 'fire' });
    
  }
});
