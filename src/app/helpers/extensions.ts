
interface Array<T> {
    // inArray(obj): number;
    inArray : (obj: object) => number;
    findObjectPropertyByAnotherProperty : (searchPropertyName: string, searchPropertyValue: string, returnedPropertyValue: string) => any;
}

Array.prototype.inArray = function (obj) {
    var found = -1;
    this.forEach(function(item, i){
    	if (JSON.stringify(item) == JSON.stringify(obj))
    		found = i;
    });
    return found;
}

Array.prototype.findObjectPropertyByAnotherProperty = function (searchPropertyName: string, searchPropertyValue: string, returnedPropertyValue: string) {
	var foundObject = this.filter(function(e) {
		return e[searchPropertyName] == searchPropertyValue;
	});
	return foundObject.length ? foundObject[0][returnedPropertyValue] : "";
}
