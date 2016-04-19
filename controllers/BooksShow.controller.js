angular.module('libraryApp')
  .controller('BooksShowController', BooksShowController);

/********************************************
  remove $http from the controller
  add BookService as a dependency
*******************************************/
BooksShowController.$inject=['BookService','$routeParams', '$location', '$http'];
function BooksShowController(BookService, $routeParams,    $location,   $http) {
  var vm = this;
  var bookId = $routeParams.id;
  // exports
  vm.book = {};  // initially empty, getBook will fill
  vm.getBook = getBook;
  vm.updateBook = updateBook;
  vm.deleteBook = deleteBook;

  // initialization
  getBook(bookId);


  function getBook(id) {

    BookService.get(id).then(onBookShowSuccess, onError);

    function onBookShowSuccess(taco){
      console.log(taco);
      vm.book=taco;
    }
    function onError(error){
      console.log('there was an error: ', error);
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

  function deleteBook(book) {
      console.log('deleting book: ', book);

      BookService.remove(book).then(onBookDeleteSuccess);

      function onBookDeleteSuccess(response){
        console.log('book delete response data:', response.data);
        $location.path('/');
      }
    }
}
