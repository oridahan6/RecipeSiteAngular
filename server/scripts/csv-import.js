
require('./common-requirements.js');

var stream = fs.createReadStream('data-backup/' + type + '.csv');

mongoose.connect('mongodb://localhost:27017/recipes', function (err) {
   if (err) throw err;
   console.log('Successfully connected');

   performAction();
});

function performAction() {

	// read in CSV as stream row by row
	csv.fromStream(stream, {headers:true})
	    .on('data', function(data){
	      addToCollection(data);
	    })
	    .on('end', function(){
	    });

	function addToCollection(data){
		importObjet.findById(data._id, function (err, obj) {
			if (err) console.log(err);

			if (obj) {
				delete data._id;
				delete data.updated;
				delete data.created;

				for (var key in data) {
				    if (data.hasOwnProperty(key)) {
				        obj[key] = data[key];
				    }
				}
			} else {
				obj = new importObjet(data);
			}

			obj.save(function (err, updatedObj) {
				if (err) return console.log(err);
			});
		});

	}

}

