App = (function(){
    var homePage = 'page_home';
    var prevPage = currPage = 'page_home';
    var pages = {
        page_billing:   {authRequired: true},
        page_home:      {authRequired: false},
        page_locations: {authRequired: true},
        page_products:  {authRequired: false},
        page_profile:   {authRequired: true},
    };
    var profileAttributes = [
        {attr: 'name', name: 'Name', type: 'String'},
        {attr: 'email', name: 'Email', type: 'String'},
        {attr: 'phone', name: 'Phone', type: 'String'},
        {attr: 'payment_cycle', name: 'Payment Cycle', type: 'Number'}
    ];
    var paymentCycleOptions = [
        {value: 1, name: 'Weekly', selected: 0},
        {value: 2, name: 'Bi-Weekly', selected: 0}
    ];
    var profileErrors = {};

    function checkPageAuth(page){
        if( pages[page] == 'undefined' || (pages[page].authRequired == true && Meteor.user() == null))
            return false;
        else
            return true;
    }

    function loadPage(page){
        if( !checkPageAuth(page) )
            page = this.homePage;

        this.prevPage = this.currPage;
        this.currPage = page;

        Session.set("page", page);
    }

    function getAvailableKegerators(){
        return [
            {   type: 1,
                name: '5 Gallon Kegerator',
                description:    'Capacity: <b>5 gallon</b> <br />' +
                    'Fountains: <b>1 piece</b> <br />' +
                    'Multi-flavor: <b>No</b>',
            },
            {   type: 2,
                name: '10 Gallon Kegerator',
                description:    'Capacity: <b>10 gallon</b> <br />' +
                    'Fountains: <b>2 piece</b> <br />' +
                    'Multi-flavor: <b>Yes (2)</b>',
            },
            {   type: 3,
                name: '15 Gallon Kegerator',
                description:    'Capacity: <b>15 gallon</b> <br />' +
                    'Fountains: <b>3 piece</b> <br />' +
                    'Multi-flavor: <b>Yes (3)</b>',
            },
        ];
    }

    function getKegerator(type){
        var kegTypes = getAvailableKegerators();

        return kegTypes[type-1];
    }

    function getAvailableFlavors(){
        return [
            {type: 0, flavor: 1, name: 'Citrus', color: 'yellow'},
            {type: 0, flavor: 2, name: 'Ginger', color: 'orange'},
            {type: 0, flavor: 3, name: 'Strawberry', color: 'red'},
        ];
    }

    function getFlavor(flavorId){
        var flavors = getAvailableFlavors();

        return flavors[flavorId-1];
    }

    return {
        checkPageAuth:      checkPageAuth,
        loadPage:           loadPage,
        homePage:           homePage,
        currPage:           currPage,
        prevPage:           prevPage,
        getFlavor:          getFlavor,
        availableFlavors:   getAvailableFlavors(),
        getKegerator:       getKegerator,
        availableKegerators:    getAvailableKegerators(),
        profileAttributes:      profileAttributes,
        paymentCycleOptions:    paymentCycleOptions,
        profileErrors:          profileErrors,
    }
})();
window.App = App;