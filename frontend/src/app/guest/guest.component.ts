import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { RouterModule, Router}   from '@angular/router';
let chordpro = require('chordprojs');

import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  constructor(public http:Http, private router: Router) { }

  ngOnInit() {
    this.loadFiles();
  }
  
  //the following vairables show 
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
  
  public loadList(responseJson){
    this.items = [];
    for(var i = 0; i < responseJson.length; i++){
      
      var temp = new chordItem(responseJson[i].sheetname, responseJson[i].author, chordpro.format(responseJson[i].chordsstring), 
      responseJson[i].sheetversion, responseJson[i].viewstatus, responseJson[i]._id, responseJson[i].datetime);
      if(temp.viewstatus == 'public'){
        this.items.push(temp);
      }
    }
    
    //making sure list has a multiple of 5 number of elements in it so the the front end doesnt run into issues while displaying, as there
    // are only 5 elements.
    
    if (this.items.length%5 != 0){
      while (this.items.length%5!=0)
      {
        this.items.push(new chordItem('', '', '', '', '', '', ''));
      }
    }
    this.itemsShown = [];
    this.itemsShown = [this.items[0], this.items[1], this.items[2], this.items[3], this.items[4]];
  }
  
  public guestBackToLogin(){
    this.router.navigate(['/']);
  }
  
  public loginButtonFunction(){
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