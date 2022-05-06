# About the project

This project was built as a test task, according to below description:

> github.com has public APIs to get list of users:
> REST: “https://api.github.com/users”.
> GraphQl: “https://api.github.com/graphql”
> There are helpfull parameters like “per_page” and “since”, check them.You need to create a single page application, which allows to get list of github users. Each row contains login, profile link (html_url) and avatar preview(100x100). Clicking on row should result in opening new route with bigger avatar version and additional user info from “https://api.github.com/users/:username”, such as name, followers, following, created_at, company, email, location, blog, bio.
> We expect application will allow to browse at least first 100 users.
> Using React, ES2015 and one way of data organization as Redux or Apollo GraphQL is required.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
