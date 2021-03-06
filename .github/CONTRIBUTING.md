# Contributing to Pattern Lab Node
If you'd like to contribute to Pattern Lab Node, please do so! There is always a lot of ground to cover and something for your wheelhouse.

No pull request is too small. Check out any [up for grabs issues](https://github.com/pattern-lab/patternlab-node/labels/up%20for%20grabs) as a good way to get your feet wet, or add some more unit tests.

## Developing Locally

The best way to make changes to the Pattern Lab Node core and test them is through your existing edition.

* Fork this repository on Github.
* Create a new branch in your fork and push your changes in that fork.
* `npm install`
* `npm link`
* `cd /path/to/your/edition`
* `npm link patternlab-node`

## Guidelines

* _ALWAYS_ submit pull requests against the [dev branch](https://github.com/pattern-lab/patternlab-node/tree/dev). If this does not occur, I will first, try to redirect you gently, second, port over your contribution manually if time allows, and/or third, close your pull request. If you have a major feature to stabilize over time, talk to @bmuenzenmeyer via an issue about making a dedicated `feature-branch`
* Please keep your pull requests concise and limited to **ONE** substantive change at a time. This makes reviewing and testing so much easier.
* Commits should reference the issue you are adressing. For any Pull Request that you send, use the template provided.
* If you can, add some unit tests using the existing patterns in the `./test` directory
* Large enhancements should begin with opening an issue. This will result in a more systematic way for us to review your contribution and determine if a [specifcation discussion](https://github.com/pattern-lab/the-spec/issues) needs to occur.

## Coding style
Two files combine within the project to define and maintain our coding style.

* The `.editorconfig` controls spaces / tabs within supported editors. Check out their [site](http://editorconfig.org/).
* The `.eslintrc` defines our javascript standards. Some editors will evaluate this real-time - otherwise it's run using `grunt|gulp build`
