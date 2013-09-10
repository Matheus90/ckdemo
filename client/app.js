
Meteor.startup(function () {
    if( !Session.get("page") )
        Session.set("page", App.homePage);
});

App = (function(){
    var homePage = 'page_home';
    var prevPage = currPage = 'page_home';

    function loadPage(page){
        this.prevPage = this.currPage;
        this.currPage = page;
       /* Template.content.helpers({
            htmlContent: function(page){
                //console.log('flag');
                if( typeof Template[page] == 'undefined' )
                    return Template[App.currPage]();

                return Template[App.currPage]();
            },
        });*/
        //Handlebars.htmlContent();
        //Meteor.call(Template.content.htmlContent);
        //Meteor.render(Template.content);

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
/*
Template.content.helpers({
    htmlContent: function(){
        console.log(App.currPage);
        if( typeof Template[App.currPage] == 'undefined' )
            return '404 - Page does not found.';

        return Template[App.currPage]();
    },
});*/


