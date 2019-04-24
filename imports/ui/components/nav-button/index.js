import { Template } from 'meteor/templating';

import { isHidden } from '../sidebar';

import './nav-button.html';

Template.navButton.helpers({
    isBackNav() {
        return this.state() === 'back';
    },
    isHidden() {
        return this.state() === 'hide';
    }
});

Template.navButton.events({
    'click .nav-button'( e, t ) {
        if( t.data.state() === 'back' ) window.history.back();
        else isHidden.set( !isHidden.get() );
    }
});;