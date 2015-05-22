Iron.utils.debug = true;

Players = new Mongo.Collection("players");

if (Meteor.isClient) {

  Template.siteHome.helpers({
    players: function () {
      return Players.find({});
    }
  });

  Router.route('/Quiz1/:playerName', function () {
    // render the Home template with a custom data context
    var p = Players.findOne({name:this.params.playerName});
    if(!p.count()){
      Players.insert({name:this.params.playerName});
      this.render('playerHome', {data: {name: this.params.playerName}});
    }else{
      this.render('siteHome', {data: p});
    }
  });

  Template.playerHome.helpers({
    currentBuzz: function () {
      return {title:"Question 1", timeout:60};
    }
  });

  Template.playerHome.tasks({
    "button .click": function () {
      //TODO
      return {};
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
