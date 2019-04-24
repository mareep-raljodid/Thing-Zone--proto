import { Homes, Notifs } from '../../../api/homes/homes';

import './cyber.html';

const timer = new ReactiveVar(0);
let h;

Template.Cyber_detected.onCreated(function() {
    const notif = Notifs.findOne();
    timer.set(15);
    h = Meteor.setInterval(()=> {
        timer.set( timer.get() - 1 );
    }, 1000);
    this.autorun(()=> { 
        if( timer.get() === 0 ) {
            Meteor.clearInterval( h );
            timer.set( 15 );
            Notifs.remove( Notifs.findOne()._id );
            notif.index++;
            delete notif._id;
            Notifs.insert(notif);
        }
    });
});

Template.Cyber_detected.helpers({
    timer() { return timer.get(); }
});

Template.Cyber_detected.events({
    'click .resolve'() {
        Meteor.clearInterval( h );
        timer.set(15);
        Notifs.remove( Notifs.findOne()._id );
    },
    'click .add'() {
        timer.set( timer.get() + 10 );
    }
});

Template.Cyber_detected.onDestroyed(function() {
    Meteor.clearInterval(h);
});