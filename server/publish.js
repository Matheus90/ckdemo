
Accounts.config({
    sendVerificationEmail: true,
    forbidClientAccountCreation: false
});

Meteor.users.allow({
    insert: function(userId, doc) {
        if( Meteor.user() )
            return false;
        else
            return true;
    },
    update: function(userId, doc, fields, modifier) {
        if( doc._id == userId )
            return true;
        else
            return false;
    },
    remove: function() {
        return false;
    }
});

Locations = new Meteor.Collection("locations");
// Publish complete set of lists to all clients.
Meteor.publish('locations', function () {
    return Locations.find();
});


Locations.allow({
    'insert': function (userId,doc) {
        return true;
    },
    'update': function (userId,doc) {
        if( doc.user_id == userId )
            return true;
        else
            return false;
    },
    'remove': function (userId,doc) {
        if( doc.user_id == userId )
            return true;
        else
            return false;
    }
});