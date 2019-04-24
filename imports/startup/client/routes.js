import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import { Homes } from '../../api/homes/homes';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/add-device';
import '../../ui/pages/users';
import '../../ui/pages/add-user';
import '../../ui/pages/create-home';

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
  action() {
    BlazeLayout.render('App_body', { main: 'Add_user', state: 'back' });
  }
});

PrivateRouter.route('/emergency', {
  name: 'emergency',
  action() {

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
