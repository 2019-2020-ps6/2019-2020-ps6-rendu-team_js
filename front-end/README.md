# Starter Quiz

## Installation

1) Install [NodeJS Installer](https://nodejs.org/en/download/)

Note, for those using linux, you can find instruction to install NodeJS [here](https://github.com/nodesource/distributions/blob/master/README.md#debinstall) (install the latest LTS Version 12.14.1).

2) Fork this repository

Click on the fork button on the page of the repository on github to create your own copy of the starter.

2) Clone your repository, your fork

```
git clone https://github.com/YOUR_USERNAME/starter-quiz.git
```

4) Install the dependencies

Open command prompt inside the repository (starter-quiz) and run: 

```
npm install
```

If you have an error saying that npm is not a known command, it means that NodeJS is not installed. 

4) Install angular/cli

```
npm install -g @angular/cli
```

## Run the app

```
npm start
```
Then navigate to `http://localhost:4200/` to see the application. The app will automatically reload if you change any of the source files.

You can also use the command `ng serve` to start the app and also `ng serve --open` to open directly the app in the browser.

## Run the linter

```
npm run lint
```

Note: The linter will be executed before each commit. If the linter fails then the commit will be canceled.

Several issues from the linter can be fixed automatically (for instance: trailing whitespace, missing new line etc...) thanks to the following command:
```
npm run lint -- --fix
```
But you will have to manually manage the other types of error.

## Angular documentation

The best documentation is the [Official Angular Documentation](https://angular.io/docs). 
It contains everything and it is always up to date.

#### Important note 
We are working with Angular version 2+ (here Angular 8). When you look for some documentation, add "Angular 2" in your 
research to be sure to find the right documentation. You might find documentation about AngularJS, run if it's the case! 
It's a very old version totally different from our version.

## Documentation - Links

Documentation Angular: 

- [Directives](https://angular.io/docs/ts/latest/guide/attribute-directives.html)
- [Pipes](https://angular.io/docs/ts/latest/guide/pipes.html)
- [Services](https://angular.io/docs/ts/latest/tutorial/toh-pt4.html)
- [HTTP Request with Angular](https://angular.io/docs/ts/latest/guide/server-communication.html)
- [NgOnInit](https://angular.io/docs/ts/latest/tutorial/toh-pt4.html#the-ngoninit-lifecycle-hook)
- [@Input and @Ouput](https://angular.io/docs/ts/latest/cookbook/component-communication.html)

Documentation on Observables:

- [Official Documentation rxjs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html)
- [Video Tutorial for beginers - FR](http://www.meanjs.fr/rxjs-tutoriel-1-creer-un-observable/)
- [Tutorial FR](http://home.heeere.com/tech-intro-programmation-reactive.html)

## Questions?

Any question? Do not hesitate to contact us on slack for any question. 

## Additional commands available

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
