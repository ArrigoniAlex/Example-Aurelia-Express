import $ from 'jquery'

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia';
    config.options.pushState = true;
    config.options.root = '/';    
    config.map([
      { route: ['','home'],  name: 'home', moduleId: './views/home/home' },
      { route: 'login',  name: 'login', moduleId: './views/auth/login/login' },
      { route: 'signup',  name: 'signup', moduleId: './views/auth/signup/signup' },
      { route: 'users',  name: 'users', moduleId: './views/users/users' }      
    ]);    
  }

  attached() {
    $('.nav a:not(.dropdown-toggle)').on('click', function(){    
        $('.navbar-toggle').click();
    });
    // $("#menu-toggle").click(function(e) {
    //     e.preventDefault();
    //     $("#wrapper").toggleClass("toggled");
    // });
  }   
    
}