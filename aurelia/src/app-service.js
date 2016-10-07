import {HttpClient} from 'aurelia-fetch-client';

export class AppHttpClient extends HttpClient {
  constructor() {
    super();
    this.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:3000/api')
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        })
        .withInterceptor({
          request(request) {
            console.log(`Requesting ${request.method} ${request.url}`);
            return request;
          },
          response(response) {
            console.log(`Received ${response.status} ${response.url}`);
            return response;
          }
        });
    });
  }
}
