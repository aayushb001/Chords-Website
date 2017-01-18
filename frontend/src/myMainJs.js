function onSignIn(googleUser) {
    console.log("on sign in");
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
}

function signOut() {
    console.log('signout');
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        var status = gapi.auth2.getAuthInstance().isSignedIn.get();
        console.log(gapi.auth2.getAuthInstance().isSignedIn.get())
    });
}
