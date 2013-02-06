
Meteor.subscribe("entities");

Template.mainExplorer.entities = function () {
    return Entities.find({}, { sort: { name: 1 } });
};