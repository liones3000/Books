function HttpService(){
	this.getBooks = function(query){
		return $.ajax({
		url: 'https://www.googleapis.com/books/v1/volumes?q=' + (query.replace(/\s/g, '+') || 'JavaScript')
	});
	}
	this.getVideo = function(){
		return $.ajax({
			url: 'https://itunes.apple.com/search?term=' + 'beyonce' + '&entity=musicVideo&limit=10'
		})
	}
}