# Root

Sample program based on [these requirements](https://gist.github.com/dan-manges/1e1854d0704cb9132b74). The data file most follow the format described in the aforementioned requirements- see for more details.

## Review TL;DR

Hello, thanks for taking the time to review this submission. I had fun writing this and would love to have a chat to get some feedback- good or bad. I know this style of coding can be a bit confusing if you're not familiar and on that note, I'd like to mention that most of my background is in object oriented programming. I have been diving deeper and deeper into functional programming over the past year and have really enjoyed it. If you would have preferred object oriented... sorry and just trust that I proficient there as well.

Jump down to the "Tests" section if you'd like to run this yourself. Or, you can check out the "output" folder for some screen grabs of the output.


## Installation / Environemnt

This is targeting `node v6.9.1` and `yarn 0.21.3`. After ensuring you're running those versions, simply...

- Download project (clone or otherwise)
- `yarn install`


## Usage

This is a CLI application and expects data be provided via a plain text file. You may run `./app --help` for the full interface description, striaght from the source. Example usage:

```shell
./app ~/path/to/data/file.txt
```
or
```shell
node app ~/path/to/data/file.txt
```


## Behavior Notes / Assumptions

These notes are meant to clarify behavior you might see during runtime that is not spelled out explicitly in the specs.

- If a line in the data file is deemed invalid, it will be skipped and not factored into the final output.
- Very large files are not handled or accounted for. I'm assuming it's safe to read the file in it's entirety- If needed, I would implement a function to read a file line by line.
- If a trip is called with no drivers before hand, the trip is skipped instead of creating a new driver of that name. On that note, I'm curious why the format would even have a driver command since it doesn't contain any information that couldn't be inferred from the trip command.
- It is expected that '00:00' will occur, while '24:00' will not. In military time either are acceptable but one or the other is typically used depending on the situation.


## Architecture Notes

While adhering to the spec, I wanted to call out a few overarching assumptions/patterns I followed.

- This is basically an ETL process (Extract Transform Load)- with a transient "load" function in that it is simply written to standard out. Because of that, I thought it best to use that nomenclature along the way. Hence, you see modules named `extract`, `transform`, and `load`.
- I didn't focus too greatly on performance because I was not given any limitations on processing power. If in the future that was the case, I would adjust a few things to improve performance.
- I opted to leave a build step out of this process, which precluded using some nice transpilation tools that I would use on a larger project.

## Functional Programming Implementation

This project has been wrtten with, and adheres to functional programming philosophies. Since there are varying levels of that when it comes to something implemented in a non-FP language like javascript, allow me to clarify:

- Most every function is a pure function and side-effect free when possible and it makes sense to be.
- Side-effects are relegated to the "edges" of the application, which in this case is the `app` module and `load` module.
- I decided to not use Algebreic Data Types (ADTs) in this application to reduce complexity for those unfamiliar with Monads and Functors.
- Because of the above decision, I did not use Sanctuary, and instead just leveraged Ramda as my FP library of choice. This meant I needed to do typechecking by hand (so to speak)(see below).
- Every function is curried so that it may be partially applied and composed (unless not deemed necessary).

## Structure

The structure is fairly basic and intended for a small application. If it were to grow, I would reorganize things to fit the new constraints. Mostly, I would create proper modules with documented rule sets about what modules must include and expose. If it were to be a very large application with a long life, I would likely look to implement the "Onion Architecture". I recently toyed around with this in a pet project and am eager to give it a shot on the next greenfield project I'm working on. Anyways, the current structure is more than adequate for the current size of the application and can be seen below.

```
/ src
  /utils          // All general utilities shared accross modules live here.
  /types          // All types, regardless of module need, live here. In a larger application, this would exist in each module.
  /app            // Bootstrapping module that uses other modules and has side-effect.
  /module 1       // A set of functionality that can be leveraged by a higer order function.
  /module 2
  /module 3
  /etc...
  index.js        // Entry point of the application 
```

## Tests

- Jest as the testing framework with tests colocated.
- I'm not doing any integration testing and I did not shoot for full coverage. I only tested the building block methods when they were sufficiently involved. In other words, utilities that simply partially applied something else in a small way do not have tests. 
- Furthermore, I'm relying on the libraries I'm using to have tests and those tests to be passing- I did not write tests that verify their functionality. 
- I focused on unit testing since most all the functions are pure and meant to be composed. 
- I would have loved to have written more tests, but I ran out of the time I had set aside to complete this. Please forgive the lack of tests in the `load` module. They aren't absent because I didn't think that didn't need tests.
- I didn't strive to handle each and every edge case due to time limitations. If this were a production grade application, I would handle many more edge cases than are handled currently.

```shell
# Run tests
yarn run test

# Run "tests" by running a data file as if it were through the CLI
yarn run start

# Run linter
yarn run lint
```

## Library Justifications

I wouldn't normally include a section like this in a README, but I wanted to give my justification for why I chose to use what I did.

- **eslint** and **airbnb**: Since it's javascript, every application needs a linter of some kind. I like not fussing with a lot of custom rules and instead try to adhere to community driven constraints put upon me by airbnb's defenitions. I take exception with a few, but it's mostly a great ruleset.
- **jest**: I used jest because it's idiomatic with React applications and looks identical to Mocha/Chai, which most Javascript developers are familiar with at this point.
- **commander**: Just what I'm already familiar with and have used for other CLI apps in the past. Nothing wrong with the others out there.
- **ramda**: I much prefer using Sanctuary, but since I omitted ADTs from this implementeation, I felt ramda would be more paletable.
- **tcomb**: Because I wasn't leveraging Sanctuary and Monads to handle my typechecking, I opted to go with a runtime typechecking library in tcomb. In a larger, longer running project, I would likely use a static type checker like Flow or TypeScript. I believe in using a typechecker of somekind no matter what the size of your application. They're easy enough to setup and save you time and bugs in the long run.
- **mz**: Because ... promises.
- **moment** No need to reinvent the wheel. Moment does a great job of comparing times.

