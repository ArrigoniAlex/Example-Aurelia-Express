import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AppHttpClient} from '../../../app-service'

@inject(AppHttpClient, Router)
export class Signup {
  constructor(http, router) {
    this.http = http;
    this.router = router;

    this.name = '';
    this.email = '';    
    this.password = '';
    this.admin = false;
  }

  signup() {
    var user = { 
      name: this.name, 
      email: this.email, 
      password: this.password, 
      admin: this.admin 
    }
    this.http.fetch('/users', {
      method: "POST",
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) this.router.navigate('users');
      //console.log(data);
    });
  }  
}
