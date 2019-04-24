import { Template } from 'meteor/templating';

import './add-user.html';

Template.Add_user.helpers({
    
});

Template.Add_user.events({ 
    'submit #add-user'( e, t ) {

        const admin = e.target.admin.checked,
            limited = e.target.limited.checked,
            temporary = e.target.temporary.checked;

        e.preventDefault();
        console.log( e.target );

        if( admin || limited || temporary )
            Meteor.call('addUser', {
                home: Session.get('home'),
                admin, limited, temporary,
                user: {
                    email: e.target.email.value,
                    password: e.target.password.value,
                    profile: { name: e.target.name.value }
                }
            }, ( err )=> {
                if( err ) $('.wrapper > .container').append(`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        ${ err.reason }
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
                else FlowRouter.go('/users');
            });
        else 
            $('.wrapper > .container').append(`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    You must check atleast one of the permission presets
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `);
    }
});