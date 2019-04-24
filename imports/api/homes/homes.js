import { Mongo } from 'meteor/mongo';

import { SmartHomeSchema } from './schema';

export const Homes = new Mongo.Collection('smarthomes');
export const Notifs = new Mongo.Collection('notifications');

Homes.helpers({
    users() {
        const a = this.admins;
        const l = this.limited;
        const t = this.temporary;
        let val = [ ...a, ...l, ...t ];
        const set = new Set( val );
        return [ ...set ];
    }
});

Meteor.methods({
    addUser({ home, user, admin, limited, temporary }) {

        if( !this.isSimulation ) {
            const userId = Accounts.createUser( user );

            console.log({ userId });

            if( admin ) 
                Homes.update( home, {
                    $push: { admins: userId }
                });

            if( limited ) 
                Homes.update( home, {
                    $push: { limited: userId }
                });

            if( temporary ) 
                Homes.update( home, {
                    $push: { temporary: userId }
                });

            return userId;
        }
    }
});

if( Meteor.isServer ) {
    Meteor.publish('users', function() {
        return Meteor.users.find();
    });
}
