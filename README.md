# Github Commits

This is a take home assigment app which renders Github Commits compleated in 1 day

## 3rd Party libraries

### Styling
1. [styled-componets](https://styled-components.com) - Allows writting CSS like components, makes my life easier.
1. [tailwindcss](https://github.com/ben-rogerson/twin.macro) - Allows quick prototyping of components, setting up design systems and more.
1. [twin.macro](https://github.com/ben-rogerson/twin.macro) - Allows to use Tailwind in css-in-js frameworks like styled-components.
1. [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer) - Simple React implementation of intersecetion observer API

### Other
1. [react-router](https://reactrouter.com/en/main) - Allows client side routing in SPAs.
1. [react-query](https://react-query-v3.tanstack.com) - Allows simple to setup fetch and data caching in React app.
1. [dayjs](https://day.js.org) - 2kb alternative to date time manipulation libraries like moment.js
1. [jest-fetch-mock](https://github.com/jefflau/jest-fetch-mock) - Allows mocking fetch requests


## Project Structure
1. `components` - contains all of the used components
1. `pages` - contains all of the used pages
1. `hooks` - contails all of used hooks
1. `types` - contains additional types needed

## Things to improve
1. Impove accessability, rethink some of the html elemts used
1. Testing, edge case unit testing, component testing, and slow network/error testing
1. Navigation, aside from browser
1. Fixing styling


## Setup

Set up Github token by creating `.env.local` file with `REACT_APP_GITHUB_TOKEN=your-token`

## Available Scripts
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

