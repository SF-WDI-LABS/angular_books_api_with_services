
angular.module('libraryApp')
  .controller('BooksShowController', BooksShowController);

/********************************************
  remove $http from the controller
  add BookService as a dependency
*******************************************/
BooksShowController.$inject=['$routeParams', '$location', 'BookService'];
function BooksShowController($routeParams,    $location,   BookService) {
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
    console.log('YOUR CONTROLLER IS getting a single book: ', bookId);
    BookService.get(id).then(onBookShowSuccess, onError);
    /*************************************
      REMOVE $http here -
      make use of the service instead
      BookService.get(id).then()
      $http({
        method: 'GET',
        url: 'https://super-crud.herokuapp.com/books/'+id
      }).then(onBookShowSuccess, onError);

    **************************************/

    function onBookShowSuccess(response){
      // console.log('here\'s the data for book', id, ':', response);
      vm.book = response;
    }
    function onError(error){
      console.error('ERROR getting single book info: ', error);
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
      console.error("ERROR updating the book");
    }
  }

  function deleteBook(book) {
      // console.log('deleting book: ', book);
      BookService.remove(book).then(onBookDeleteSuccess, onError);
      // console.log("BOOK ID IS: " , book);

    /*************************************
      REMOVE $http here -
      make use of the service instead
      BookService.remove(id).then()
      // $http({
      //   method: 'DELETE',
      //   url: 'https://super-crud.herokuapp.com/books/' + book._id,
      // }).then(onBookDeleteSuccess);
      //
    **************************************/

      function onBookDeleteSuccess(book){
        console.log('book DELETE response data:', book);
        $location.path('/');
      }
      function onError(book){
        console.error('ERROR! CANNOT DELETE book:', book);
      }
    }
}
