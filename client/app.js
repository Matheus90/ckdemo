
Meteor.startup(function () {
    Session.setDefault('page', App.homePage);
});


Meteor.subscribe("locations");

Locations = new Meteor.Collection('locations');
Products = new Meteor.Collection('products');


App = (function(){
    var homePage = 'page_home';
    var prevPage = currPage = 'page_home';

    function loadPage(page){
        this.prevPage = this.currPage;
        this.currPage = page;

        Session.set("page", page);
    }

    return {
        loadPage: loadPage,
        homePage: homePage,
        currPage: currPage,
        prevPage: prevPage,
    }
})();
window.App = App;


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
    // Determine which todos to display in main pane,
    // selected based on list_id and tag_filter.

    return Locations.find({user_id: Meteor.userId()}, {sort: {name: 1}});
};

Template.products.availableSizes = function () {
    // Determine which todos to display in main pane,
    // selected based on list_id and tag_filter.

    return [
        {name: '5 Gallon Kegerator'},
        {name: '10 Gallon Kegerator'},
        {name: '15 Gallon Kegerator'},
    ];
};
Template.products.availableFlavors = function () {
    // Determine which todos to display in main pane,
    // selected based on list_id and tag_filter.

    return [
        {name: 'Citrus'},
        {name: 'Ginger'},
        {name: 'Strawberry'},
    ];
};