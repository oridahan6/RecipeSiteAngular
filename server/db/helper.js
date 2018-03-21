
// Private
// var x = require('x');
// var y = 'I am private';
// var z = true;

// function sum(num1, num2) {
//   return num1 + num2;
// }


// Public
var self = module.exports = {

  // someProperty: 'I am public',
  
  createResponseFromDocs: function (docType, collectionName, sortby, response) {
    collectionName.find({})
 		.sort(sortby)
		.exec( function (err, docs) {
			if (err) {
				response.json({success:false, message: `Failed to load all ` + docType + `. Error: ${err}`});
			}
			response.set({ 'content-type': 'application/json; charset=utf-8' });
			var resObject = {
				success: true
			};
			resObject[docType] = docs;
			response.write(JSON.stringify(resObject,null,2));
	        response.end();
	  	});
  }
  
};