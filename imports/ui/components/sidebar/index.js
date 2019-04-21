import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './sidebar.html';

export const isHidden = new ReactiveVar( true );

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
    }
});
