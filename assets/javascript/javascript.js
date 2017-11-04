$(function(){
  populateButtons(searchArray,'searchButton','#buttonsArea');
  console.log("page Loaded");
})

//---Array---//
var searchArray = ['Soccer Dance','Angry Coach','Archery Trick Shot','Hiking fails','Little Boys',
'Homework', 'Computers','Redhead Wife Hot','Mini Van']


//---function---//
function populateButtons(searchArray,classToAdd,areaToAddTo){
  $(areaToAddTo).empty();
  // for loop//
  for(var i=0; i<searchArray.length; i++){
    var a = $('<button>');
    a.addClass(classToAdd);
    a.attr('data-type', searchArray[i]);
    a.text(searchArray[i]);
    $(areaToAddTo).append(a);
  }
}
//------create butons based on the screen and make sure they work--//
$(document).on('click','.searchButton', function(){
  $('#searches').empty();
  var type = $(this).data('type');
  var queryURL = 'http://api.giphy.com/v1/gifs/search?q='+type+'&api_key=XUi1GkVQ6LH8rtFgfBfrB61BGXham062&limit=25&rating=G&rating=PG'
  $.ajax({url:queryURL,method:'GET'})
    .done(function(response){
      for(var i=0;i<response.data.length;i++){
        var searchDiv = $('<div class="search-item">');
        var rating = response.data[i].rating;
        var p = $('<P>').text('rating: '+rating);
        // look at "Images: Object in console"
        var still = response.data[i].images.fixed_height.url;
        var animated = response.data[i].images.fixed_height_still.url;
        var image = $('<img>');
          // Alter Images//
          // Still images//
          image.attr('src',still);
          image.attr('data-still',still);
          // animated//
          image.attr('data-animated',animated);
          // reference 'still' string//
          image.attr('data-state','still');
          image.addClass('searchImage');
          // rating//
          searchDiv.append(p);
          //image//
          searchDiv.append(image);
          $('#searches').append(searchDiv);

      }
    })
})
//---Animation please!---//
$(document).on('click','.searchImage',function(){
  var state = $(this).data('state');
  if(state == 'still'){
    //---animate---//
    $(this).attr('src',$(this).data('animated'));
    $(this).attr('data-state','animated');
  } else {
    //---freeze state---//
    $(this).attr('src',$(this).data('still'));
    $(this).attr('data-state','still');

  }
 });

//-- make a way to add new giff's and their buttons--//

$('#addSearch').on('click',function(){
  var newSearch = $('input').eq(0).val();
  searchArray.push(newSearch);
  populateButtons(searchArray,'searchButton','buttonsArea');
  //---RETURN FALSE TO STOP RELOADING PAGE!!!!!!!!---//
  //---Place below animations---//
  return false;
})
//---Done?---//
