export class apiFeatures{
    constructor(query , queryString){
        this.query = query;
        this.queryString = queryString;
    }

    searchByCategory(){
        const keyword = this.queryString.category ? {
            category : {
                $regex : this.queryString.category,
                $options : 'i'
            }
        } : {}
        this.query = this.query.find({...keyword})
        return this;
    }
}