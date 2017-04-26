console.log('js');

$(document).ready(onReady);

function onReady(){
  console.log('jQ sourced');
  getKoalas();

  $('#addButton').on('click', addKoala);
}

function getKoalas(){
$.ajax ({
  url: "/getKoalas",
  type: "GET",
  success: function(response){
    console.log('in get koalas route', response);
    appendKoalas(response);
  }

});
}

function appendKoalas (responseArray){
  $('#viewKoalas').empty();
  for (var i = 0; i < responseArray.length; i++) {
    $('#viewKoalas').append('<p>' + responseArray[i].name + " " + responseArray[i].sex + " "  + responseArray[i].age + " "  + responseArray[i].ready_for_transfer + " "  + responseArray[i].notes + '</p>');
  }
}


function addKoala(){

  var koalaToSend = {
    name: $('#nameIn').val(),
    age : $('#ageIn').val(),
    sex: $('#sexIn').val(),
    ready_for_transfer: $('#transferIn').val(),
    notes: $('#notesIn').val()
  };

  console.log("koala to send : ", koalaToSend);

$.ajax ({
  url: "/addKoala",
  type: "POST",
  data: koalaToSend,
  success: function(response){
    console.log('in addKoala koalas route', response);
    console.log(response);
  }

  });

}
