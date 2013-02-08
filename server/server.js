

if (Meteor.isServer) {
    Meteor.startup(function () {
        LoadDummyData();
    });
}

Meteor.publish("entities", function () {
    return Entities.find({}, { sort: { name: 1 } });
});

LoadDummyData = function () {
    Entities.remove({});
    Entities.insert({ name: "Kampanj1" });
    Entities.insert({ name: "Kampanj2" });
    Entities.insert({ name: "Kampanj3" });
    Entities.insert({ name: "Kampanj4" });
    Entities.insert({ name: "Kampanj5" });
    Entities.insert({ name: "Kampanj6" });
}