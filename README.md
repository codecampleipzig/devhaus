# Dev Haus

Dev Haus is an online community platform, meant to enable collaboration between the affiliates of CodeCampLeipzig, those being students, instructors, and graduates. It provides the possibility to create a profile, which includes information about one's interests, skills, and projects. Users can search profiles using tags, such as common interests and or a user's mentor status. It also has a calendar feature to facilitate in the creation and organization of community events.

## Installation

### yarn install

```bash
yarn install
```

```bash
npm install -g firebase-tools
```

Use: authentication, hosting, and storage

## Usage

The application runs a backend server on the Firebase stack for data storage and authentication. It is started using emulators. The frontend is implemented with Vue.js and must be started separately.

### Start Emulators

```bash
yarn start:emulators
```

### Start Frontend

```bash
yarn start:frontend
```

### Fontawesome

We are using the Fontawsome icon library with Vue. To use it, please follow the instructions below:

#### Using Icons

Import the icons you need from either the light or the duotone library, by adding the name of the icon to the following line inside the main.js file:

```javascript
import { faCircle, faCheck } from "@fortawesome/free-solid-svg-icons";
```

Then, add them to the library:

```javascript
library.add(faCircle, faCheck);
```

Use them as follows in kebab case:

```javascript
// circle icon
<font-awesome-icon icon="circle" />
// check icon
<font-awesome-icon icon="check" />
```

## Tools

Unit testing: JEST - <https://jestjs.io/docs/en/getting-started>

Backend: firebase: hosting, storage, authentication - <https://firebase.google.com/>

CSS Style framework: tailwind - <https://tailwindcss.com/>

End to end Testing: Cypress - <https://docs.cypress.io/>

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

Please follow the git naming and commit conventions:

1. Never commit in the master or develop branch
2. Create your own branch and use the feature name as your branch name.
3. branch names should be written in kebab case.

Commit messages:

1. Start with an upper case letter
2. Describe what the commit does to the application
3. Should not be longer than 80 characters

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Share

[Twitter](https://twitter.com/CampLeipzig)

[facebook](https://www.facebook.com/search/top?q=code%20camp%20leipzig)

[Code Camp Leipzig](https://codecampleipzig.de/)

[Git Hub](https://github.com/)
