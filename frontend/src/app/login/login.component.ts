import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import { RouterModule, Router}   from '@angular/router';
import * as myGlobals from '../global';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public http:Http, private router: Router) {
  }

  ngOnInit() {
  }
  
  title = `Welcome! This web application allows users to create, display and share guitar chords with song lyrics! 
  You may login and create,update and/or your versions of chord sheets. Guest users can enjoy looking at chords made
  public by the authors. Users with accounts can make certain chords public or private. Enjoy your stay!`;
  
  public startVerification(){
    var usernameInput = (<HTMLInputElement>document.getElementById("usernameBox")).value;
    var passwordInput = (<HTMLInputElement>document.getElementById("passwordBox")).value;
    this.http.get("https://se3316a-ab96.c9users.io/api/authentication?email=" + usernameInput + "&password=" + passwordInput)
                .toPromise()
                .then(
                    response => this.verificationStep2(response.json(), usernameInput)
                 )
               .catch(this.handleError);
  }
  
  public verificationStep2(jsonData, username){
      
      if(jsonData.result == true){
        console.log("logged in"); 
        myGlobals.setValue(username);
        this.router.navigate(['/profile']);
      }
      else{
        alert("log in error - incorrect password or email");
      }
      
  }
  
  public startSignUp(){
    var email1 = (<HTMLInputElement>document.getElementById("usBox1")).value;
    var email2 = (<HTMLInputElement>document.getElementById("usBox2")).value;
    var pass1 = (<HTMLInputElement>document.getElementById("psBox1")).value;
    var pass2 = (<HTMLInputElement>document.getElementById("psBox2")).value;
    var body = JSON.stringify({ 'test': "1"});
    var headers = new Headers({ 'Content-Type': 'application/json' });
    
    if(email1 == "" || email2 == ""){
      alert('Please enter email');
    }
    else{
      if(pass1 == "" || pass2 == ""){
        alert('Please enter password');
      }else{
        if(email1 == email2 && pass1 == pass2){
          this.http.post('https://se3316a-ab96.c9users.io/api/authentication/?email=' + email1 + '&password=' + pass1,
            body, headers).map((res: Response) => res.json()).catch(this.handleError).subscribe(data => this.signUp2(data));
        }else{
          alert('Please enter valid credentials');
        }
      }
    }
  }
  
  public signUp2(data){
    if(data.result == true){
      alert('user created');
    }else{
      alert('user already exists');
    }
  }
  
  public guestContinue(){
    this.router.navigate(['/guest']);
  }
  
 private handleError(error: any): Promise<any> {
      console.error('There was an error: ', error);
      return Promise.reject(error.message || error);
 }
  
}
