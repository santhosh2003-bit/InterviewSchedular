# Interview Scheduler
Users can manage interviews by filtering by date, interviewer, and candidate with this project's interview scheduling application. The application provides an easy-to-use interface for scheduling interviews and was developed with the help of contemporary web technology.

## Table of Contents
Features
Setup Instructions

Design Decisions

Assumptions

Challenges Faced

Screenshots

## Qualities
View, edit, add, and remove interviews.

### Sort interviews according to: 
Date (in the format ddd MMM DD YYYY).

interviewer.

candidate.

design that adapts to various screen sizes.

User-friendly interface
## Setup Instructions

### Prerequisites
Ensure you have the following installed:

Node.js (version 16 or later)

npm (Node Package Manager)

Git
## Design Decisions: 

### Date Filtering:

The date filtering feature uses the dayjs library to format and compare dates consistently in the format ddd MMM DD YYYY.

## State Management:

State is managed using React’s built-in useState and useEffect hooks to ensure a smooth user experience.

## Styling:
Tailwind CSS is used for styling to ensure a clean and consistent design, along with easy responsiveness.

## Filtering Logic:

The filtering logic allows for partial or full filtering based on the provided inputs (date, interviewer, candidate).
## Assumptions
All interview data is provided in a consistent format (e.g., date strings are valid ISO format).

Filtering by date matches exactly based on the specified format (Wed Jan 22 2025).

If no filter criteria are provided, all interviews are displayed.
## Challenges Faced
### Date Handling:

Ensuring that dates are consistently formatted across different parts of the application required careful use of the dayjs library.

## Dynamic Filtering:

Implementing a flexible filter mechanism that supports various combinations of filter criteria without affecting performance.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
