
# Testing AngularJS Small Project

AngularJS small app unit testing course, with Jasmine, Karma, PhantomJS & Istanbul

## Getting Started

This project was developed during the
[*Unit Testing AngularJS: Build Bugfree Apps That Always Work!*](https://www.udemy.com/unit-testing-angularjs/
"Unit Testing AngularJS Course") Course in Udemy. Some adaptations were made to follow John Papa's design pattern.

### Prerequisites

To run this project you'll need to have instaled npm and bower to install the dependencies. It's recommended Javascript
and Angular JS intermediate knowledge, specially through the directives section.

### Installing

With the npm installed, just run the command bellow to pull all the dependencies from package.json:

```
npm install -g
```

In the app/ folder you'll need to also pull dependencies, this time with bower:

```
bower install -g
```

To run a local server you'll need to install the http-server package. If it hasn't been downloaded with npm install,
run the following command:

```
npm install http-server -g
```

And to run the server just execute the [http-server](https://www.npmjs.com/package/http-server "Http-server package")
command, resulting in the following:

```
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.0.102:8080
Hit CTRL-C to stop the server
```

With all configured, you can run the unit tests in the app/js/test folders.

## Running the tests

To run all the unit tests, run the following command:

```
karma start app/js/test/karma.conf.js
```

Then, the karma will run the automate unit tests in the headless-browser PhantomJS, reporting the results with the
mocha coverage report.

To see the code coverage with Istanbul, access the following path:

localhost:8080/app/js/test/coverage/<PhantomJSversion-OSversion>/

## Built With

* [AngularJS 1.6.1](https://angularjs.org/) - The web javascript framework used
* [Jasmine 2.5.3](https://jasmine.github.io/) - BDD-testing tool
* [Karma 1.4.0](https://karma-runner.github.io/1.0/index.html) - Javascript Automated Test Runner
* [Karma PhantomJS Launcher 1.0.2](http://phantomjs.org/) - Headless Website Testing

## Authors

* **Matthias Kentzia** - *Course Professor* - [Twitter](https://twitter.com/mattkentz)
* **Davi Kawasaki** - *Course Student* - [Twitter](https://twitter.com/davikawasaki)

See also the [course](https://www.udemy.com/unit-testing-angularjs/) where most of this code was developed.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to Matthias, who developed a dense and complete unit testing course for AngularJS
* John Papa Design Pattern
