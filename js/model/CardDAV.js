var cds = cds || {}
cds.model = cds.model || {}
cds.model.cardDAV = (function(){

	/*
	 * Object attributes are
	 *
	 *  id
	 *  alternativeId
	 *
	 *  tel {
	 *    type1 : number ,
	 *    type2 : number ,
	 *    ...
	 *  }
	 *  email
	 *  lastModified
	 *  category : [
	 *     category1 ,
	 *     category2 ,
	 *     ...
	 *  ]
	 *  
	 *  photo
	 */  

	var parser = cds.utils.CardDAVParser

	return Object.create( cds.model.Abstract ).extend({



	})
})()
