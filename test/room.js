//create new listings
$.ajax({
  url: 'api/rooms',
   method: "post",
    data: {room: {
      title: "Centrally Located Victorian Studio",
      type_id: "1",
      price: "200",
      city: "San Francisco",
      lat: "37.769532",
      lng: "-122.428713"
    }},
     success: function(success){
       console.log(success)},
      error: function(error, status){
        console.log(status)}
});

// show specific listing
$.ajax({
  url: 'api/rooms',
   method: "get",
    data: {
      id: 1
    },
     success: function(success){
       console.log(success)},
      error: function(error, status){
        console.log(status)}
});
// update specific Listing
$.ajax({
  url: 'api/rooms/1',
   method: "patch",
    data: {room: {
      price: "209",
    }},
     success: function(success){
       console.log(success)},
      error: function(error, status){
        console.log(status)}
});

// delete specific Listing
$.ajax({
  url: 'api/rooms/1',
   method: "delete",
     success: function(success){
       console.log(success)},
      error: function(error, status){
        console.log(status)}
});
