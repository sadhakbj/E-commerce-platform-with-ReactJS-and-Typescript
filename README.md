## React Products APP

- Simple APP to show how to use TypeScript and Redux.
- Use [FakeStoreAPI](https://fakestoreapi.com/docs) to fetch the products and display them.

### Requirements:
- Nodejs
- Yarn (as dependency manager) `npm i -g yarn`

##### Installation

> The application can be installed using the following steps:
- Clone the repository: `git clone git@github.com:sadhakbj/React-products---2022.git app`
- Change the directory to the cloned repository: `cd app`
- Install dependencies: `yarn` `(npm install) if yarn is not installed`
- Run the application: `yarn start`
- Open the application: `http://localhost:3000`
- Running tests: `yarn test`

#### Login Credentials:
- We have used FakeStoreAPI for the basic authentication.
- You can use the following credentials to login: `username: "mor_2314", password: "83r5^_"`
- Or you can use credentials from the [USERS API](https://fakestoreapi.com/users)

#### Features:
> [Demo video](https://www.awesomescreenshot.com/video/7273651?key=5899809315d7f53cd60467c1e3ae8c8a)
- Show a login page if the user is not logged in.
- Allow user to login and logout.
- Show a list of products with the details (title, price, rating, image)
  - Search the products by name
  - Sort the products by (rating, price asc to desc, price desc to asc)
  - filter the products by categories 
  > Since, fakeStoreAPI does not provide functionalities like: `searching, sorting and filtering` we have used our own implementation in JavaScript.
- Bookmark / un-bookmark a product
- View the details of the product

#### Tools Used:
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React-Router v6](https://reactrouter.com/docs/en/v6/getting-started/overview) 
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework for styled components
- [Redux](https://redux.js.org/)
- [React-Redux](https://react-redux.js.org/)
- [HeadlessUI for React](https://headlessui.dev/)

#### Code Quality and formatting
- Code quality: [ESLint](https://eslint.org/)
- Code formatting: [Prettier](https://prettier.io/)
> Make sure that you have prettier & eslint plugin installed for your IDE and settings is changed to format on save..
