(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC2_m0ebcrCN84PSrhOgNfiD27N1S03fss",
    authDomain: "secondproject-3558b.firebaseapp.com",
    databaseURL: "https://secondproject-3558b.firebaseio.com",
    projectId: "secondproject-3558b",
    storageBucket: "secondproject-3558b.appspot.com",
    messagingSenderId: "651145446950"
  };
  firebase.initializeApp(config);

	var textEmail = document.getElementById('txtEmail');
	var textPassword = document.getElementById('txtPassword');
	var btnLogin = document.getElementById('btnLogin');
	var btnSignup = document.getElementById('btnSignUp');
	var btnLogout = document.getElementById('btnLogout');

	if(btnSignup){
		console.log('here');
		btnSignup.addEventListener('click', e=>{
			console.log('in btnSignup');
  			firebase.auth().createUserWithEmailAndPassword(textEmail, textPassword).catch(function(error) {
   				console.log(error.message);
  			});
		});
	}

  if(btnLogin){
    console.log('here');
    btnSignup.addEventListener('click', e=>{
      console.log('in btnSignup');
        firebase.auth().signInWithEmailAndPassword(textEmail, textPassword).catch(function(error) {
          console.log(error.message);
        });
    });
  }

}());