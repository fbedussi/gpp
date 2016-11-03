#Gherkin preprocessor
Allows some preprocess tecniques for Gherkin files, such as including partials.

##Directive syntax
This module leverage on the [preprocess](<https://www.npmjs.com/package/preprocess>) module, so check its documentation for directive's syntax.
Just make sure to place them in a Gherkin comment:
````
#@include ../../partials/_go_to_cart.feature
````

##Usage
````
buildGherkin [optionName=option]
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

##Examples
````
buildGherkin source=mySourceFolder dest=myDestFolder exclude=myPartial
````
````
buildGherkin source=mySourceFolder dest=myDestFolder excludeRegExp=partial|otherFolder
````

