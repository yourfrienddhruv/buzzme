Iron.utils.debug = true;

Players = new Mongo.Collection("players");
Quiz = new Mongo.Collection("quiz");
Buzz = new Mongo.Collection('buzz');

Result = new Mongo.Collection('result');


if (Meteor.isClient) {

  Template.siteHome.helpers({
    players: function () {
      return Players.find({});
    }
  });

  Router.route('/:quizName', function () {
      var seft = this;
      this.render('playerRegister', {
        data: {
          quizName: this.params.quizName
        }
      });

 
  });

   Template.playerRegister.events({
      "submit .new-player": function (event) {
        // This function is called when the new task form is submitted
        var text = event.target.playerName.value;

        if (text) {
          // Meteor.call("addPlayer", text);
          window.location.href = this.quizName + '/' + text;
        }
        // Clear form
        event.target.playerName.value = "";

        event.preventDefault();
        event.stopPropagation();
        // Prevent default form submit
        return false;
      },
      "change .hide-completed input": function (event) {
        Session.set("hideCompleted", event.target.checked);
      }
    });


  Router.route('/:quizName/admin', function () {
    this.render('adminHome', {
      data: {
        quizName: this.params.quizName
      }
    });
  });

  Template.adminHome.helpers({
    players: function () {
      return Quiz.find({quizName: this.quizName});
    }
  });

  Router.route('/:quizName/:playerName', function () {
    // render the Home template with a custom data context
    var p = Players.findOne({playerName:this.params.playerName});

    if(!p){
      Players.insert({playerName:this.params.playerName});
    }

    this.render('playerHome', {data: {playerName: this.params.playerName, quizName: this.params.quizName}});

    var findPlayerInQuiz = Quiz.findOne({playerName: this.params.playerName, quizName: this.params.quizName});

    if (!findPlayerInQuiz){
      Quiz.insert({
        playerName: this.params.playerName,
        quizName: this.params.quizName
      });
    }
  });

  Template.playerHome.helpers({
    currentBuzz: function () {
      return Buzz.findOne({quizName: this.quizName, isLive: true});
    }
  });


  // Template.playerHome.tasks({
  //   "button .click": function () {
  //     //TODO
  //     return {};
  //   }
  // });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

// Meteor.methods({
//   addPlayer: function (playerName) {
//     // Make sure the user is logged in before inserting a task
//     // if (! Meteor.userId()) {
//     //   throw new Meteor.Error("not-authorized");
//     // }

//     // Tasks.insert({
//     //   text: text,
//     //   createdAt: new Date(),
//     //   owner: Meteor.userId(),
//     //   username: Meteor.user().username
//     // });
//     Players.inser({
//       name: playerName
//     });
//   }
// });