Entities = new Meteor.Collection("entities");

LoadDummyData = function () {
    Entities.remove({});
    for (var i = 1; i < 50; i++) {
        Entities.insert(
            {
                //name: "Kampanj ",
                name: lipsum.words(3),
                description: lipsum.sentence(20),

            }
        );
    }
}

