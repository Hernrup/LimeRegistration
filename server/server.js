

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}

Meteor.publish("entities", function () {
    return Entities.find({}, { sort: { name: 1 } });
});