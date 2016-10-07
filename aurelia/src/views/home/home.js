import {inject} from 'aurelia-framework';
import {AppHttpClient} from '../../app-service'
import {Router} from 'aurelia-router';

@inject(AppHttpClient, Router)
export class Home {  

  constructor(http, router) {
    this.http = http;
    this.router = router;
  }

  getData() {   
    
    this.http.fetch('/countries')
      .then(response => response.json())
      .then(data => {
      console.log(data);
    });
    this.router.navigate('users');    
  }
}
