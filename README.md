Show Me Beer
=====================

Show Me Beer is an unfinished application built using React, Redux, Webpack and Firebase 3.x that shows you what beers are being sold at pubs in London. It is still in progress and is meant more of a side project to test out new packages and ideas, rather than a production ready project. All the beers and locations are being served up by Firebase, more locations need to be added...but the thought is there.

You can login using Google authentication and save the beers you like by clicking on the stars next to the beer! This will write your saves to the Firebase DB. You can also create beers and locations which will automatically update both lists.

![Show me beer 1](https://firebasestorage.googleapis.com/v0/b/show-me-beer.appspot.com/o/images%2Fshow-me-beer-1.jpg?alt=media&token=1e415ea7-a466-4d19-ae43-b19b219cdfd6)



---



![Show me beer 2](https://firebasestorage.googleapis.com/v0/b/show-me-beer.appspot.com/o/images%2Fshow-me-beer-2.jpg?alt=media&token=2c77974b-f343-4600-af9a-a776c4432fc3)

### How to run

1. `git clone` the repo
2. `npm install` to get the node_modules folder
3. `npm start` to initialize the app
4. visit [http://localhost:8080/](http://localhost:8080/)

### Eslint rules

These rules are applied to the code using the `.eslint.json` file in the root of the project. I am also running an atom package named [linter-eslint](https://atom.io/packages/linter-eslint) which provides an interface to eslint.

(0 = off, 1 = warn, 2 = error)

* `no-var: 2` - require let or const instead of var
* `constructor-super: 2` - make sure every constructor has a super()
* `no-trailing-spaces: 2` - disallow trailing whitespace at the end of lines
* `max-len: 0` - ignore the maximum line length
* `no-underscore-dangle: 0` - allow dangling underscores in identifiers such as `_variable`
* `linebreak-style: 0` - ignores consistent linebreak style as we may be using both unix & windows
* `comma-dangle: [ 2, "never" ]` - disallow trailing commas in object literals
* `indent": [ 2, 4 ]` - will throw an error if the line is not indented with a tab (4 spaces in this case)
* `quotes: [ 2, "single" ]` - single quotation marks within a string
* `semi: [ 2, "always" ]` - enforce semi colons at the end of statements
* `no-console: 0` - allows console.logs to be added in the code

#### Pre-commit

[pre-commit](https://www.npmjs.com/package/pre-commit) is being used to catch any errors when trying to commit code with errors. The eslint rules above need to be adhered by.
