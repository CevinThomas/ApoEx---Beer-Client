# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Welcome to ApoEx Beer Client! This Readme will get you started with starting the development server and then running the tests that currently exist:

### Prerequisites
1. Node installed

### Installing dependencies

Inside the root directory, run the command `npm ci`. This will do a clean install of the projects dependencies

### Adding environment variables
Inside the root directory, create a file called `.env.development` and add this to the top level of the file `REACT_APP_BEER_BASE_API=https://api.punkapi.com/v2`

If you have the server already started, please restart it after adding the `.env` file

### Starting development server
Inside the root directory, run the command `npm run start`. This will spin up the local development server. Once finished, you can visit the project under `localhost:3000`

### Testing
Testing is being done with Cypress

1. In the root directory, run the command `npx cypress open`. This will open the cypress client
2. Press "Component testing" of the 2 options, this should already be configured. 
3. Choose which browser to open the UI and test with, I choose Chrome
4. Press "Start component testing"
5. Left hand side, under "Specs", choose which component to run tests for
6. Test files can be found under `components/[componentName]/[componentName].cy.tsx`
