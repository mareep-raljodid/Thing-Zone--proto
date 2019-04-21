import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/add-device';
import '../../ui/pages/users';
import '../../ui/pages/add-user';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home', state: 'menu' });
  },
});

FlowRouter.route('/add', {
  name: 'add-device',
  action() {
    BlazeLayout.render('App_body', { main: 'Add_device', state: 'back' });
  }
});

FlowRouter.route('/users', {
  name: 'users',
  action() {
    BlazeLayout.render('App_body', { main: 'Users', state: 'menu' });
  }
});

FlowRouter.route('/users/add', {
  name: 'add-user',
  action() {
    BlazeLayout.render('App_body', { main: 'Add_user', state: 'back' });
  }
});

FlowRouter.route('/emergency', {
  name: 'emergency',
   action() {

   }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
