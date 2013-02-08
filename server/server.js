

if (Meteor.isServer) {
    Meteor.startup(function () {
        
    });
}

Meteor.publish("entities", function () {
    return Entities.find({}, { sort: { name: 1 } });
});

