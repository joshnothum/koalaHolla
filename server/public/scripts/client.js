console.log( 'js' );

$( document ).ready(readyNow);

function readyNow() {
  $('#addButton').on('click', appendKoalas);
  console.log('JQ');
  // load existing koalas on page load
  getKoalas();
}
  


  // add koala button click
  function addKoala() {
    console.log('in addButton on click');
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var koalaName = $('#nameIn').val();
    var koalaAge = $('#ageIn').val();
    var koalaGender = $('#genderIn').val();
    var koalaReady = $('#readyForTransferIn').val();
    var koalaNotes = $('#notesIn').val();
    console.log('koala name', koalaName);
    var objectToSend = {
      name: koalaName,
      age: koalaAge,
      gender: koalaGender,
      readyForTransfer: koalaReady,
      notes: koalaNotes
  }
    console.log(objectToSend);
    $('#addKoala').val('');
    // call saveKoala with the new obejct
    saveKoala(objectToSend);

}; //end addButton on click 
    
  
    
   

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'GET',
  }).done(function( data ){
      console.log( 'got some koalas: ', data );
    }) // end success
    .fail(function(error){
      console.log('not working', error);
    }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
    } // end success
  }); //end ajax
}

function appendKoalas(koalas) {
  $('#addKoala').empty();
  for (var i = 0; i < koalas.length; i += 1);
  var koala = koalas[i];
  var $tr = $('<tr></tr>');
  $tr.data('koala', koala);
  $tr.append('<td>' + koala.name + '</td>');
  $tr.append('<td>' + koala.age + '</td>');
  $tr.append('<td>' + koala.gender + '</td>');
  $tr.append('<td>' + koala.transfer + '</td>');
  $tr.append('<td>' + koala.notes + '</td>');
  $tr.append('<td>button class="deleteButton" data-id="' + koala.id + '">Delete</button></td>');
  $tr.append('<td>button class="transferButton" data-id="' + koala.id + '">Transer</button></td>');
  $('#viewKoalas').append($tr);

}

function deleteClicked() {
  var koalaId = $(this).data('id');
  console.log('Delete koala with id', koalaId);
  $.ajax({
    method: 'DELETE',
    url: '/koalas' + koalaId,
  }).done (function (response){
    console.log(response);
    refreshKoalas();
  }).fail(function(error){
    console.log('something is wrong with the koalas', error);
  })
}
