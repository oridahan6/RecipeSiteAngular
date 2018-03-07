
interface Array<T> {
    // inArray(obj): number;
    inArray : (obj: object) => number;
}

Array.prototype.inArray = function (obj) {
    var found = -1;
    this.forEach(function(item, i){
    	if (JSON.stringify(item) == JSON.stringify(obj))
    		found = i;
    });
    return found;
}
