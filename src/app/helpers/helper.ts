export namespace Helper {

    export function isAllObjectPropertiesEmpty(obj: {}) : boolean { 
    	var isEmpty = true;
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (obj[key].length){
					isEmpty = false;
					break;
				}
			}
		}
		return isEmpty;
    }
}

