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
    BookService.get(id).then(function(book){
      console.log('book by id in the controller', book);
      vm.book = book;
    });

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
      var def = $q.defer();

      $http({
        method: 'DELETE',
        url: 'https://super-crud.herokuapp.com/books/' + book._id,
      }).then(onBookDeleteSuccess);

      return def.promise;

      function onBookDeteleSuccess(response){
        console.log('book delete response data:', response.data, this);
        self.book = {};


        def.resolve(self.book);
      }

      function onError(error) {
        console.log('service reported error on delete', book);
        self.book = {error: error};

        def.reject(self.books.error);
      }
  }
}
