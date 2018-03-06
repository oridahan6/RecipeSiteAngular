export class Category {
	constructor(
		public _id: string,	
	    public name: string,
	    public imageName: string,
	    public recipesCount: number,
    	public displayOrder: number,
	) {  }
}
