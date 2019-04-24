import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import { Homes } from '../../api/homes/homes';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/create-home';
import '../../ui/pages/add-device';
import '../../ui/pages/users';
import '../../ui/pages/add-user';
import '../../ui/pages/notif';
import '../../ui/pages/fire';
import '../../ui/pages/cyber';

const PrivateRouter = FlowRouter.group({
  triggersEnter: [( con, red )=> {
    if( !Meteor.userId() ) red('/login');
  }]
});

Accounts.onLogin(()=> {
  const userId = Meteor.userId();
  const home = Homes.findOne({
    $or: [
      { admins: userId },
      { limited: userId },
      { temporary: userId }
    ]
  });
  if( home ) {
    Session.set( 'home', home._id );
    FlowRouter.go('/');
  }
  else FlowRouter.go('/create');
  if( Notification.permission !== 'denied' ) {
    Notification.requestPermission();
  }
});

Accounts.onLogout(()=> {
  FlowRouter.go('/login');
});

PrivateRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home', state: 'menu' });
  },
});

PrivateRouter.route('/add', {
  name: 'add-device',
  triggersEnter: [( con, red )=> {
    let home = Homes.findOne({ admins: Meteor.userId() });
    if( !home ) {
      $('.wrapper > .container').append(`
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
              You cannot add devices to this home!
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
          </div>
      `);
      red('/');
    }
  }],
  action() {
    BlazeLayout.render('App_body', { main: 'Add_device', state: 'back' });
  }
});

PrivateRouter.route('/users', {
  name: 'users',
  action() {
    BlazeLayout.render('App_body', { main: 'Users', state: 'menu' });
  }
});

PrivateRouter.route('/users/add', {
  name: 'add-user',
  triggersEnter: [( con, red )=> {
    let home = Homes.findOne({ admins: Meteor.userId() });
    if( !home ) {
      $('.wrapper > .container').append(`
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
              You cannot add users to this home!
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
          </div>
      `);
      red('/users');
    }
  }],
  action() {
    BlazeLayout.render('App_body', { main: 'Add_user', state: 'back' });
  }
});

PrivateRouter.route('/notif', {
  name: 'notifications',
  action() {
    BlazeLayout.render('App_body', { main: 'Config_notif', state: 'menu' });
  }
});

PrivateRouter.route('/notif/fire', {
  name: 'fire-setup',
  action() {
    BlazeLayout.render('App_body', { main: 'Config_fire', state: 'back' });
  }
});

PrivateRouter.route('/notif/cyber', {
  name: 'cyber-setup',
  action() {
    BlazeLayout.render('App_body', { main: 'Config_cyber', state: 'back' });
  }
});

PrivateRouter.route('/fire', {
  name: 'fire-detected',
  action() {
    BlazeLayout.render('App_body', { main: 'Fire_detected', state: 'back' });
  }
});

PrivateRouter.route('/cyber', {
  name: 'cyber-detected',
  action() {
    BlazeLayout.render('App_body', { main: 'Cyber_detected', state: 'back' });
  }
});

FlowRouter.route('/login', {
  name: 'login',
  action() {
    BlazeLayout.render('App_body', { main: 'loginButtons', state: 'hide' });
  }
});

PrivateRouter.route('/create', {
  name: 'create-home',
  action() {
    BlazeLayout.render('App_body', { main: 'Create_home', state: 'hide' });
  }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound', state: 'back' });
  },
};
