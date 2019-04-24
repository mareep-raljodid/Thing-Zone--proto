import { Template } from 'meteor/templating';

import { Homes } from '../../../api/homes/homes';

import './users.html';

Template.Users.helpers({
    users() {
        return Homes
            .findOne( Session.get('home') ).users()
            .map( id=> Meteor.users.findOne( id ) );
    }
});