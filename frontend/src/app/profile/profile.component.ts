import { Component, OnInit } from '@angular/core';
//import { Headers, Http } from '@angular/http';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { RouterModule, Router}   from '@angular/router';
let chordpro = require('chordprojs');
import * as myGlobals from '../global';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public http:Http, private router: Router) { }

  ngOnInit() {
    if(myGlobals.userLogin == null){
      this.router.navigate(['/']);
    }
    this.loadFiles();
  }
  
   //the following vairables show 
  public currentUserName = myGlobals.userLogin;
  public val1 = 0;
  public val2 = 1;
  public val3 = 2;
  public val4 = 3;
  public val5 = 4;
  
  public itemsShown = [ new chordItem('', '', '', '', '', '', ''),new chordItem('', '', '', '', '', '', ''),
  new chordItem('', '', '', '', '', '', ''),new chordItem('', '', '', '', '', '', ''),new chordItem('', '', '', '', '', '', '')];
  
  public items = [];
  
  public loadFiles(){
    this.http.get("https://se3316a-ab96.c9users.io/api/chords")
                .toPromise()
                .then(
                    response => this.loadList(response.json())
                 )
               .catch(this.handleError);
  }
  
  public refresh(){
    this.loadFiles();
    alert('Refreshed');
  }
  
  public logoutButtonFunction(){
    myGlobals.setValue("");
    this.router.navigate(['/']);
  }
  
  public loadList(responseJson){
    this.items = [];
    for(var i = 0; i < responseJson.length; i++){
      var temp = new chordItem(responseJson[i].sheetname, responseJson[i].author, chordpro.format(responseJson[i].chordsstring), 
      responseJson[i].sheetversion, responseJson[i].viewstatus, responseJson[i]._id, responseJson[i].datetime);
      if(temp.author == myGlobals.userLogin){
        this.items.push(temp);
      }
    }
    
    //making sure list has a multiple of 5 number of elements in it so the the front end doesnt run into issues while displaying, as there
    // are only 5 elements.
    
    if (this.items.length%5 != 0){
      while (this.items.length%5!=0)
      {
        this.items.push(new chordItem('', '', '', '', '', '',''));
      }
    }
    this.itemsShown = [];
    this.itemsShown = [this.items[0], this.items[1], this.items[2], this.items[3], this.items[4]];
  }
  
  public guestBackToLogin(){
    this.router.navigate(['/']);
  }
  
  private handleError(error: any): Promise<any> {
      console.error('There was an error: ', error);
      return Promise.reject(error.message || error);
  }
  
  public showNextChords(){
    if((this.val5+5) <= this.items.length){
      this.val1 = this.val1 + 5;
      this.val2 = this.val2 + 5;
      this.val3 = this.val3 + 5;
      this.val4 = this.val4 + 5;
      this.val5 = this.val5 + 5;
      this.itemsShown = [this.items[this.val1], this.items[this.val2], this.items[this.val3], this.items[this.val4], this.items[this.val5]];
    }
  }
  
  public showLastChords(){
     if((this.val1-5) >= 0){
      this.val1 = this.val1 - 5;
      this.val2 = this.val2 - 5;
      this.val3 = this.val3 - 5;
      this.val4 = this.val4 - 5;
      this.val5 = this.val5 - 5;
      this.itemsShown = [this.items[this.val1], this.items[this.val2], this.items[this.val3], this.items[this.val4], this.items[this.val5]];
    }
  }
  
  public deleteChord(){
    var deleteID = (<HTMLInputElement>document.getElementById("deleteInputBox")).value;
    this.http.delete("https://se3316a-ab96.c9users.io/api/chords/"+deleteID).map((res:Response) => res.json()).catch(this.handleError).subscribe(data => console.log(data));
    
  }
  
  public renameChord(){
    var renameID = (<HTMLInputElement>document.getElementById("renameIDInputBox")).value;
    var renameName = (<HTMLInputElement>document.getElementById("renameNameInputBox")).value;
    var body = JSON.stringify({ 'test': "1" });
    var headers = new Headers({ 'Content-Type': 'application/json' });
    if(renameName != ""){
      this.http.put('https://se3316a-ab96.c9users.io/api/chords/' + renameID + '?sheetname=' + renameName + '&datetime=' + Date(), body, headers).map((res: Response) => res.json()).catch(this.handleError).subscribe(data => console.log(data));
    }else{
      alert('please enter a valid new name');
    }
  }
  
  public changeSettingChord(){
    var psettingID = (<HTMLInputElement>document.getElementById("psettingIDInputBox")).value;
    var psetting = (<HTMLInputElement>document.getElementById("psettingInputBox")).value;
    var body = JSON.stringify({ 'test': "1"});
    var headers = new Headers({ 'Content-Type': 'application/json' });
    if(psetting == "public" || psetting =="private"){
      this.http.put('https://se3316a-ab96.c9users.io/api/chords/' + psettingID + '?viewstatus=' + psetting + '&datetime=' + Date(), body, headers).map((res: Response) => res.json()).catch(this.handleError).subscribe(data => console.log(data));

    }else{
      alert('please enter a valid setting value')
    }
  }
 
 public clearTextArea(){
    if (confirm('Are you sure you want to clear?')) {
      (<HTMLInputElement>document.getElementById("textArea")).value = "";
      (<HTMLInputElement>document.getElementById("createSheetNameInputBox")).value ="";
      (<HTMLInputElement>document.getElementById("psettingCreateInputBox")).value="";
      (<HTMLInputElement>document.getElementById("versionCreateInputBox")).value="";
    } else {
        // Do nothing
    }  
  }
  
  public clearTextArea2(){
    if (confirm('Are you sure you want to clear?')) {
      (<HTMLInputElement>document.getElementById("updateArea")).value = "";
      (<HTMLInputElement>document.getElementById("sheetNumberEditInputBox")).value ="";
     
    } else {
        // Do nothing
    }  
  }
 
 public saveNewChordSheet(){
    var newSheetName = (<HTMLInputElement>document.getElementById("createSheetNameInputBox")).value;
    var newPrivacy = (<HTMLInputElement>document.getElementById("psettingCreateInputBox")).value;
    var newVersion = (<HTMLInputElement>document.getElementById("versionCreateInputBox")).value;
    var newChord = (<HTMLInputElement>document.getElementById("textArea")).value;
    var body = JSON.stringify({ 'test': "1"});
    var headers = new Headers({ 'Content-Type': 'application/json' });
    
    var parsedRes = chordpro.parse(newChord).title;
    
    if(parsedRes){
      newSheetName = parsedRes;
    }
    
    var bracketnum = (newChord.split("[").length - 1);
    var bracketnum2 = (newChord.split("]").length - 1);
    
    var paranthnum = (newChord.split("{").length - 1);
    var paranthnum2 = (newChord.split("}").length - 1);
    
    if(paranthnum != paranthnum2){
      alert('Incorrect number of parathesis');
    }
    else{
      if(bracketnum != bracketnum2){
        alert('Incorrect number of brackets');
      }
      else {
        this.http.post('https://se3316a-ab96.c9users.io/api/chords/?viewstatus=' + newPrivacy + '&sheetname=' + newSheetName + '&author=' + myGlobals.userLogin 
        + '&chordsstring='+ newChord + '&sheetversion=' + newVersion + '&datetime=' + Date(),
        body, headers).map((res: Response) => res.json()).catch(this.handleError).subscribe(data => console.log(data));
      }
    }
 }
 
  public pullsheetdata(){
    this.http.get("https://se3316a-ab96.c9users.io/api/chords")
                .toPromise()
                .then(
                    response => this.getSpecificSheetData(response.json())
                 )
               .catch(this.handleError);
  }
  
  public chordtoupdate = new chordItem('', '', '', '', '', '', '');
  
  public getSpecificSheetData(responseJson){
    var sheetID = (<HTMLInputElement>document.getElementById("sheetNumberEditInputBox")).value;
    for(var i = 0; i < responseJson.length; i++){
      if (responseJson[i]._id == sheetID) {
        
        (<HTMLInputElement>document.getElementById("updateArea")).value = responseJson[i].chordsstring;
        
        this.chordtoupdate = new chordItem(responseJson[i].sheetname, responseJson[i].author, chordpro.format(responseJson[i].chordsstring), 
      responseJson[i].sheetversion, responseJson[i].viewstatus, responseJson[i]._id, responseJson[i].datetime);
      }
    }
  }
  
  public updateChordSheet(){
    var newversion = parseInt(this.chordtoupdate.sheetversion) + 1;
    var newstring = (<HTMLInputElement>document.getElementById("updateArea")).value;
    var body = JSON.stringify({ 'test': "1"});
    var headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('https://se3316a-ab96.c9users.io/api/chords/?viewstatus=' + this.chordtoupdate.viewstatus + '&sheetname=' + this.chordtoupdate.sheetname + '&author=' + myGlobals.userLogin 
      + '&chordsstring='+ newstring + '&sheetversion=' + newversion  + '&datetime=' + Date(),
      body, headers).map((res: Response) => res.json()).catch(this.handleError).subscribe(data => console.log(data));
  }
 
  public openNav() {
    (<HTMLInputElement>document.getElementById("myNav")).style.height = "100%";
  }
  
  public closeNav() {
    (<HTMLInputElement>document.getElementById("myNav")).style.height = "0%";
  }
  
   public openNav2() {
    (<HTMLInputElement>document.getElementById("myNav2")).style.height = "100%";
  }
  
  public closeNav2() {
    (<HTMLInputElement>document.getElementById("myNav2")).style.height = "0%";
  }
  
   public openNav3() {
    (<HTMLInputElement>document.getElementById("myNav3")).style.height = "100%";
  }
  
  public closeNav3() {
    (<HTMLInputElement>document.getElementById("myNav3")).style.height = "0%";
  }
  
   public openNav4() {
    (<HTMLInputElement>document.getElementById("myNav4")).style.height = "100%";
  }
  
  public closeNav4() {
    (<HTMLInputElement>document.getElementById("myNav4")).style.height = "0%";
  }
  
   public openNav5() {
    (<HTMLInputElement>document.getElementById("myNav5")).style.height = "100%";
  }
  
  public closeNav5() {
    (<HTMLInputElement>document.getElementById("myNav5")).style.height = "0%";
  }
  
}

class chordItem {
    sheetname: string;
    author: string;
    chordsstring: string;
    sheetversion: string;
    viewstatus: string;
    bearid: string;
    datetime : string;
    constructor(sn:string, an:string, cs:string,sv:string, vs:string, bi:string, dt:string) {
        this.sheetname = sn;
        this.author = an;
        this.chordsstring = cs;
        this.sheetversion = sv;
        this.viewstatus = vs;
        this.bearid = bi;
        this.datetime = dt;
    }
}