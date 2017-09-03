console.clear();

// (function($){
	var http = new HttpService();

	var $booksList = $('#books-list'),
		$selectedBook = $('#selected-book'),
		$formSearch = $('#form-search');

	var allBooks = [];

function requestBook(value){

	var request = http.getBooks(value);
	$booksList.empty();
	request.done(function(r){
		if (!r || !r.items || !Array.isArray(r.items)) return;

			allBooks = r.items;
			allBooks.forEach(function(item){

			$('<a href="">')
				.text(item.volumeInfo.title)
				.addClass('list-group-item')
				.attr('data-book-id', item.id)
				.appendTo($booksList);
		});
	});
}

	$booksList.on('click', '[data-book-id]', function(e){
		e.preventDefault();

		var bookId = $(this).data('book-id');

		$selectedBook.empty().fadeIn();

		var book = allBooks.filter(function(item){
			return item.id === bookId;
		})[0];

		if(!book.volumeInfo) return;

		$('<div>')
			.addClass('panel-heading')
			.text(book.volumeInfo.title + ': ' + book.volumeInfo.authors.join(', ') + ' (' + book.volumeInfo.pageCount + ' pages)')
			.appendTo($selectedBook);

		$('<div>')
			.addClass('panel-body')
			.appendTo($selectedBook)
			.append( $('<img>').attr('src', book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : 'img/noImage.jpg') )
			.append( $('<p>').text(book.volumeInfo.description) )
			.append( $('<a>').text('Read more ...').attr('href', book.volumeInfo.previewLink).attr('target', '_blank') )
	})

	$formSearch.on('submit', function(e){
		e.preventDefault();

		var query = $(this).find('[name=query]').val();
		console.log(query);

		requestBook(query);
	})
	
// })(jQuery);