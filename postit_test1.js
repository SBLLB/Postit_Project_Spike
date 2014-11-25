Postits = new Mongo.Collection("postits");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    postits: function () {
      return Postits.find({});
    }
  });

  $(function () {

    var pushPostit = document.getElementById('submit-postit');
    var hammertime = new Hammer(pushPostit);

    // let the pan gesture support all directions.
    // this will block the vertical scrolling on a touch-device while on the element
    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    
    // listen to events...
    hammertime.on("swipeup", function(event) {
      var text = $('#test').val();
      Postits.insert({
        text: text,
        createdAt: new Date() 
      });

      event.target.text.value = "";

      return false;

    });
  });

  // Template.body.events({
  // "submit .new-postit": function (event) {
  //   // This function is called when the new task form is submitted
  //   var text = event.target.text.value;

  //   Postits.insert({
  //     text: text,
  //     createdAt: new Date() // current time
  //   });
  //   // Clear form
  //   event.target.text.value = "";
  //   // Prevent default form submit
  //   return false;
  //   }

  // });

  Template.document_ready.rendered = function() {
    var width = $(window).width(), height = $(window).height();
    if (width <= 400) {
      alert('Im a mobile device!')
      $(".columns").hide();
    } else {
      // alert('Im a browser');
      $("#submit-postit").hide();
    }
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}