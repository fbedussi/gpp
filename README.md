#Gherkin preprocessor
Allows some preprocess tecniques for Gherkin files, such as including partials or evaluating if statements.

##Directive syntax
This module leverage on the [preprocess](<https://www.npmjs.com/package/preprocess>) module, so check its documentation for directive's syntax.
Just make sure to place them in a Gherkin comment:
````
#@include ../../partials/_go_to_cart.feature
````

##Installation
Install gherkin-preprocessor as a common node module, either locally or globally:
````
npm install [-g] gherkin-preprocessor
````
or clone the repo
https://github.com/fbedussi/gpp
 and install it as a module with `npm link`.

##Usage
````
buildGherkin [optionName=option] [optionName=option] [optionName=option]
````

##Options
###source
*Default: 'features_src'*

The source folder path (relative or absolute)

###dest
*Default: 'features'*

The destination folder path (relative or absolute)

###exclude
*Default: 'partials'*

The name of the folder to exclude

###excludeRegExp
The regExp pattern to match the folder(s) to exclude

###env
The name of the environment in which the Gherkin is intended to run, e.g. "prod", "dev", ecc.
This variable could be used in if statements:
````
#@if env='prod'
@prod
#@endif
#@if env='dev'
@dev
#@endif
````
The code above will render the `@prod` tag in the compiled Gherkin if `env` is set to `prod`, or the tag `@dev` if it's set to `dev`.

###varFile
The path to a json file containing the variables to be uesed by the preprocessor in if statemets.

##Examples
````
buildGherkin source=mySourceFolder dest=myDestFolder exclude=myPartial
````
````
buildGherkin source=mySourceFolder dest=myDestFolder excludeRegExp=partial|otherFolder
````
````
buildGherkin source=mySourceFolder dest=myDestFolder env=prod
````

