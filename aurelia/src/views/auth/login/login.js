import {HttpClient} from 'aurelia-fetch-client';

let httpClient = new HttpClient()
  .configure(x => {
    x.withBaseUrl('http://localhost:3000/api/');
    //x.withHeader('Authorization', 'bearer 123');
  });

export class Login {
  constructor() {
    this.email = '';
    this.password = '';
  }

  login() {
    var myUser = { email: this.email, password: this.password }
    console.log(myUser);
  };
  
  getData() {
    httpClient.fetch('countries/')
      .then(response => response.json())
      .then(data => {
      console.log(data);
    });
  }
}
