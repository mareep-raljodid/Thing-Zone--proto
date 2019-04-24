import { Template } from 'meteor/templating';

import { Homes } from '../../../api/homes/homes';

import './notif.html';

Template.Config_fire.helpers({
    users() {
        return Homes.findOne( Session.get('home') )
            .temporary.map( id=> Meteor.users.findOne( id ) );
    }
});

Template.Config_fire.events({
    'submit #first'( e, t ) {
        e.preventDefault();
        const users = Homes.findOne( Session.get('home') )
            .temporary.filter( id=> e.target[`f${id}`].checked );
        console.log( users );
        Homes.update( Session.get('home'), {
            $set: { 'emergency.0': users }
        });
    }
});