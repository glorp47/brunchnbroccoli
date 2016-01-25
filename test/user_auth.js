// login
$.ajax({
  url: 'api/session',
   method: "post",
    data: {user: {username: "jeff", password: "jeffjeff"}},
     success: function(success){
       console.log(success)},
      error: function(error, status){
        console.log(status)}
});

// Logout
$.ajax({
  url: 'api/session',
   method: "delete",
     success: function(success){
       console.log(success)},
      error: function(error, status){
        console.log(status)}
});

// create user account
$.ajax({
  url: 'api/users',
   method: "post",
    data: {user: {username: "jose", password: "josejose"}},
     success: function(success){
       console.log(success)},
      error: function(error, status){
        console.log(status)}
});
