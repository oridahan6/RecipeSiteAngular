require('./common-requirements.js');

mongoose.connect('mongodb://localhost:27017/recipes', function (err) {
   if (err) throw err;
   console.log('Successfully connected');

   performAction();
});

function performAction() {

	importObjet.deleteMany({}, function(err){});

	importObjet.resetCount(function(err, nextCount) {
	    console.log("nextCount", nextCount);
	});

}

