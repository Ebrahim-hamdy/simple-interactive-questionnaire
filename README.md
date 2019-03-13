# A Simple Interactive Questionnaire

a simple questionnaire form in which the user can answer given questions and finally see the form in a completed state!

- The questionnaire consist of multiple questions alongside of a CTA to submit the answer and a linkButton to cancel user input, per question. Each question also has a title, a description and set of options if needed.

- Questions can be dependent or not, meaning that if they are dependent, the answer of one question can disable or enable another question.

- Questions also need to be validated if it was asked, meaning if a validation was required, given error message needs to be shown to user if input was not valid.

## What were using

* React 16
* Webpack 4
* SASS
* Babel Cli
* Hot Module Reloading
* Bootstrap


## Installation

Use the package manager [npm](https://www.npmjs.com/get-npm) / [yarn](https://yarnpkg.com/en/docs/getting-started) to install the dependencies

```bash
npm install / yarn install
```

## Run development server:

```
yarn dev --mode=development
```

## To build the production

```
yarn build --mode=production
```

## License
[MIT](https://choosealicense.com/licenses/mit/)