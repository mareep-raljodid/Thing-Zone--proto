import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Homes } from '../../../api/homes/homes';

import './create-home.html';

Template.Create_home.events({ 
    'submit #create-home'( e ) {
        e.preventDefault();
        console.log('creating new smarthome');

        Meteor.users.update( Meteor.userId(), {
            $set: { 'profile.name': e.target.name.value }
        });

        Homes.insert({
            devices: [],
            admins: [ Meteor.userId() ],
            limited: [],
            temporary: [],
            emergency: [[]]
        }, ( err, res )=> {
            Session.set('home', res );
            FlowRouter.go('/');
        });
    }
});
