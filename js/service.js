function HttpService(){
	this.getBooks = function(query){
		return $.ajax({
		url: 'https://www.googleapis.com/books/v1/volumes?q=' + (query.replace(/\s/g, '+') || 'harry potter')
	});
	}
}