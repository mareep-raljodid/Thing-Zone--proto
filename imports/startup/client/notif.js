import { Homes, Notifs } from '../../api/homes/homes';
console.log({ Notifs });
Notifs.find().observe({
    added( doc ) {
        console.log('showing notifss');
        const home = Homes.findOne( doc.home );
        console.log(home);
        if( doc.index === -1 ) {
            //check if current user is an admin
            if( home.admins.indexOf( Meteor.userId() ) !== -1 ) {
                //show notif
                showNotif( doc.emergency, doc.route );
            }
        } else {
            if( home.emergency[ doc.index ].indexOf( Meteor.userId() ) !== -1 ) {
                //show notif
                showNotif( doc.emergency, doc.route );
            }
        }
    }
});

export function showNotif( e, r ) {
    console.info(`A ${ e } has been detected`);
    if( Notification.permission === 'granted' ) {
        const notification = new Notification('Hi!', {
            body: `A ${ e } has been detected`
        });
        notification.onclick = e=> FlowRouter.go(r);
    }
}