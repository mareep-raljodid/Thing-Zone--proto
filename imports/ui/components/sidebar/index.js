import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { ReactiveVar } from 'meteor/reactive-var';

import './sidebar.html';

export const isHidden = new ReactiveVar( true );

Template.sidebar.onRendered(function() {
    this.autorun(()=> {
        if( isHidden.get() === false )
            this.$('.sidebar').show().removeClass('hidden');
        else 
            this.$('.sidebar').addClass('hidden').hide();
    }); 
});

Template.sidebar.helpers({
    isHidden() {
        return isHidden.get();
    }
});

Template.sidebar.events({ 
    'click .overlay'() {
        isHidden.set( true );
    },
    'click a'() {
        isHidden.set( true );
    },
    'click .logout'() {
        Accounts.logout();
    }
});
