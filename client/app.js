
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


