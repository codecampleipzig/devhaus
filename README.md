# Devhaus

Devhaus is an online tool that enables collaboration between affiliates of CodeCampLeipzig eg ( students - instructors - alumni). It provides the possibility to enter a profile, including information about interest, skills and projects. The user can search profiles e.g. for common interest and skills. It also has a calender feature to facilitate events.

## Installation

### yarn install

```bash
yarn install
```

```bash
npm install -g firebase-tools
```

Use: authentication, hosting and storage

## Usage

The application runs a backend server on fire stack for the data storage and authentication. It is started with the emulators. The frontend is implemented via vue and has to be stgarted separately.

### start emulators

```bash
yarn start
```

### start frontend

```bash
yarn serve
```

### front awesome

we are using the fontawsome icons with vue, in order to use it please follow the instructions:

#### Using Icons

import the icons you need from either the light or the duotone library, by adding the name of the icon to the following line inside the main.js file.

```javascript
import { faCircle, faCheck } from "@fortawesome/free-solid-svg-icons";
```

then add them to the library

```javascript
library.add(faCircle, faCheck);
```

use them as follows in kebab case

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

1. Start with upper case letter
2. describe what the commit does to the application
3. Are not longer than 80 characters

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Share

[Twitter](https://twitter.com/CampLeipzig)

[facebook](https://www.facebook.com/search/top?q=code%20camp%20leipzig)

[Code Camp Leipzig](https://codecampleipzig.de/)

[Git Hub](https://github.com/)
