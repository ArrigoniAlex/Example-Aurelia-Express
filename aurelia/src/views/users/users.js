import $ from 'jquery'
//import 

import {inject} from 'aurelia-framework';
import {AppHttpClient} from '../../app-service';

@inject(AppHttpClient)
export class Users {
  editing = false;
  users = [];

  constructor(http) {    
    this.http = http;    
    this.http.fetch('/users')
      .then(response => response.json())
      .then(users => this.users = users);          
  }
 
  sort() {
    this.users.sort((a, b) => a.name - b.name);
  }

  edit(user) { 
    this.oldUsers = this.users;
    this.editing = user;    
  }

  cancel(user) {
    this.editing = false;    
  }  
  
  save(user) {
    this.http.fetch('/users/' + user._id, {
      method: "PUT",
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      //if (data.success) if(err)
    });
    this.editing = false;    
  }  
  
  delete(user) {
    this.http.fetch('/users/' + user._id, {
      method: "DELETE",
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      //if (data.success) if(err)
    });
    
    this.users = this.users.filter(function(item) { 
      return item._id !== user._id;  
    });

    this.editing = false;    
  }
}
