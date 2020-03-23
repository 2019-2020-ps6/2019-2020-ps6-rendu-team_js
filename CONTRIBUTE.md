# **Branching strategy** : ***Lite Git flow***

<br/>

## Requirements

* Webstorm _(by Jetbrains)_
* Node.js

<br/>

## Coding rules

* Don't comment a large block of code and leave it in the master or the development branch.
* Give functional names to methods.
* If the method comportment is complex to understand add **doc**.
* Test all methods before pushing.
* Don't write methods with useless vars.

<br/>

## Commit pattern

* Give a name easy to understand. It needs to describe the commit.
* In commit message, link the commit with the issue at the beginning and add a description if the title is not sufficient.
* _If you forget to link the commit with an issue, go to Github and add the issue number in comment._

<br/>

## Adding new features

* When we want to add new features (implement milestone's features), we create a new branch to develop it.
* Don't forget to create **tests**!.
* When it's done, cf **branch merging** rules.

<br/>

## Branch merging

* To merge a branch with the **development** branch, you need to create a **pull request** and wait that all group members approve your demand.

<br/>

## Branches organization

* New features are stored in **"features/"** branches, when they are finished and tested, you can merge your branch with the **development** branch.
* Before rendering (weekly rendering), launch all **tests**, and **read the code** again in group. If everything is good, merge the **development** branch with the **master** branch.
* Our **master** branch is a **production** branch, don't forget the tag to succeed the rendering !
