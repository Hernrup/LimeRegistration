
Meteor.subscribe("entities");

Template.explorer.entities = function () {
    return Entities.find({}, { sort: { name: 1 } });
};

Template.entity.selected = function () {
    return this._id == Session.get("selected_entity") ? 'success':'';
};

Meteor.startup(function () {
    Slidepanel.init();
});

Template.sidepanel.header = function () {
    //var ent = Session.get("selected_entity");
    var ent = Entities.findOne(Session.get("selected_entity"));
    return ent && ent.name;
    //return 'test';
};

Template.expose.entity = function () {
    var ent = Entities.findOne(Session.get("selected_entity"));
    //return ent && ent.name || 'N/A';
    return ent;
};
Template.expose.description = function () {
    return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt laoreet turpis, sit amet tristique odio sodales at. Quisque lobortis, felis in convallis dictum, sapien odio pharetra lectus, eget lacinia ligula justo et lectus. Phasellus magna est';
};

Template.entity.events({
    'click': function () {
        var savedEntity = Session.get("selected_entity");

        if (!savedEntity) {
            Slidepanel.expand();
        }


        if (!savedEntity || savedEntity != this._id) {
            Session.set("selected_entity", this._id);
        } else {
            Session.set("selected_entity", null);
            Slidepanel.collapse();
        }
       
    }
});

Template.page.events({
    'click #wrapper': function (event) {
        //check if in entity-list context
        if ($(event.target).parents("table#entity-list").length == 0) {
            Slidepanel.collapse();
        }

    }
});

