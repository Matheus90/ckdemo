
Meteor.startup(function () {
    Session.setDefault('page', App.homePage);

    if( Meteor.user() && Meteor.user().profile == 'undefined' )
        Meteor.users.update({_id: Meteor.userId()}, {$set: {profile: {}}});
});

Meteor.subscribe("locations");

Locations = new Meteor.Collection('locations');
Products = new Meteor.Collection('products');
MyKegs = new Meteor.Collection('mykegs');
Bills = new Meteor.Collection('bills');


Template.content.htmlContent = function () {
    var page = Session.get("page");
    if( typeof Template[page] == 'undefined' )
        return '404 - Page does not found.';

    return Template[page]();
};


Template.locations.events({
    'click #addLocationButton' : function (event) {
        var location = {
            name:       $('#location-name').val(),
            address:    $('#location-address').val(),
            user_id:    Meteor.userId(),
            timestamp:  (new Date()).getTime(),
        };
        Locations.insert(location);
    },
    'click .delete-btn' : function (event) {
        if( confirm('Are you sure you want to delete this location?', "Yes, I'm sure", "No, cancel") )
            Locations.remove(this._id);
    },
});


Template.locations.locations = function () {
    return Locations.find({user_id: Meteor.userId()}, {sort: {name: 1}});
};


Template.products.availableKegerators = function () {
    return App.availableKegerators;
};


Template.products.availableFlavors = function () {
    return App.availableFlavors;
};


Template.myProductsBilling.bills = function(){
    var location = Locations.findOne();
    if( !location )
        location = {_id: 'unknown'};

    var myProducts = [
        {type: 3, flavor1: 1, flavor2: 2, flavor3: 3, location_id: location._id, paid: false},
        {type: 3, flavor1: 1, flavor2: 2, flavor3: 3, location_id: location._id, paid: true}
    ];

    return myProducts;
}

Template.myProductsBilling.flavorName = function(flavorId){
    var flavor = App.getFlavor(flavorId);
    if( flavor ){
        //return '<span class="white-text-shadow" style="color:'+flavor.color+';">'++'</span>';
        return flavor.name;
    }else
        return 'Unknown';

};

Template.myProductsBilling.getKegerator = function(type){
    var keg = App.getKegerator(type);
    if( keg )
        return keg;
    else
        return {};
};

Template.profile.user = function(userId){
    if( !userId )
        userId = Meteor.userId();

    var user = Meteor.user();
    return user;
};

Template.profile.paymentCycleOptions = function(){
    var options = App.paymentCycleOptions;

    if( user = Meteor.user() ){
        for(i in options){
            options[i].selected = (options[i].value == user.profile.payment_cycle);
        }
    }

    return options;
}

Template.profile.events({
    'click #save-profile-btn' : function(){
        var userProfile = { profile: {}};
        var attr = App.profileAttributes;
        for(i in attr){
            if( attr[i].attr == 'email' )
                continue;

            userProfile.profile[attr[i].attr] = $('#profileAttribute_'+attr[i].attr).val();
        }

        var email = $('#profileAttribute_email').val();
        if( email ){
            Meteor.users.update(
                {_id: Meteor.userId()},
                {$set: {'emails.0.address': email, 'emails.0.verified': false}},
                function(a, b){
                    //console.log('<<'+a+'>> '+b);
                    if( typeof a == 'object' ){
                        if(a.error == 409 )
                            App.profileErrors.email = "'" + email + "' is already in use.";
                    }else
                        delete App.profileErrors.email;
                }
            );
        }

        Meteor.users.update({_id: Meteor.userId()}, {$set: userProfile});
    }
});

Template.profile.helpers({
    errors : function(){
        var errorArray = App.profileErrors;

        var errors = {};
        for(i in errorArray){
            errors[i] = '<div class="error">' + errorArray[i] + '</div>';
        }
        return errors;
    }
});