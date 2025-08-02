# React Native Posts App

This is a React Native demo application that fetches and displays posts from the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API. Users can also create a new post using a form that sends a POST request to the same API. The created post is not saved permanently as JSONPlaceholder provides mock API endpoints for testing.

---

## Features

- Fetches and displays posts using `GET /posts` from JSONPlaceholder
- Displays each post using a reusable Post Card component
- Sends a new post using `POST /posts` (mock only, not persisted)
- Built with React Native CLI (`@react-native-community/cli`)

---

## Tech Stack

- React Native
- TypeScript 
- Fetch API
- React Navigation 

---

## Getting Started

> Make sure your environment is set up correctly: [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) (Choose the **React Native CLI** tab).

### Step:


```bash
npm install
# or
yarn install

### Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android:

### Android

sh
# Using npm
npm run android

# OR using Yarn
yarn android