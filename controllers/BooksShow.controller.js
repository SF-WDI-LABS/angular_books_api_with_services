angular.module('libraryApp')
  .controller('BooksShowController', BooksShowController);

/********************************************
  remove $http from the controller
  add BookService as a dependency
*******************************************/
BooksShowController.$inject=['$routeParams', '$location', 'BookService'];
function BooksShowController($routeParams,    $location, BookService) {
  var vm = this;
  var bookId = $routeParams.id;
  // exports
  vm.book = {};  // initially empty, getBook will fill
  vm.getBook = getBook;
  vm.updateBook = updateBook;
  vm.deleteBook = deleteBook;

  // initialization
  getBook(bookId);


  function getBook(bookId) {
    /*************************************
      REMOVE $http here -
      make use of the service instead
      BookService.get(id).then()
    **************************************/
      console.log('controller getbook:', bookId);
      BookService.get(bookId).then(onBookShowSuccess, onError);

      function onBookShowSuccess(bookId){
        console.log('here is the data for the book', bookId);
        vm.book = bookId;
      }
      function onError() {
        console.log("error getting book");
      }
    }



  /*****************************************
  *  THIS FUNCTION HAS ALREADY BEEN
  *  REFACTORED TO USE BOOK SERVICE
  *****************************************/
  function updateBook(book) {
    console.log('controller updating book: ', book);
    BookService.update(book).then(onBookUpdateSuccess, onError);

    function onBookUpdateSuccess(book){
      console.log('controller got updated data for book ', book._id, ':', book);
      vm.book = book;
      $location.path('/');
    }
    function onError() {
      console.log("error updating the book");
    }
  }
/////////////////////////////////////////////////
  function deleteBook(book) {
      console.log('deleting book: ', book);
      BookService.remove(book._id).then(onBookDeleteSuccess);

    function onBookDeleteSuccess(response){
       console.log('book delete response data:', response.data);
       $location.path('/');
     }
}
}
