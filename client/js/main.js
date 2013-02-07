
Meteor.subscribe("entities");

Template.mainExplorer.entities = function () {
    return Entities.find({}, { sort: { name: 1 } });
};

Meteor.startup(function () {
    Slidepanel.init();
});

Template.sidepanel.header = function () {
    //var ent = Entities.findOne(Session.get("selected_entity"));
    //return ent && ent.name;
    return 'test';
};

Template.expose.header = function () {
    var ent = Entities.findOne(Session.get("selected_entity"));
    return ent && ent.name || 'N/A';
};
Template.expose.description = function () {
    return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt laoreet turpis, sit amet tristique odio sodales at. Quisque lobortis, felis in convallis dictum, sapien odio pharetra lectus, eget lacinia ligula justo et lectus. Phasellus magna est';
};

Template.entity.events({
    'click': function () {
        var savedEntity = Session.get("selected_entity")
        if (!savedEntity || savedEntity != this._id) {
            Session.set("selected_entity", this._id);
            Slidepanel.expand();
        } else {
            Session.set("selected_entity", null);
            Slidepanel.collapse();
        }
    }
});


