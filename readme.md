# Pocket-Highlights

![Pocket-Highlights](https://v01.io/wp-content/uploads/2020/12/2020-12-31-v01-pocket-highlights.png "Pocket-Highlights")


An open source project to format exported highlights from [Pocket](https://app.getpocket.com) in plain html, so that they are is easy to copy & paste (e.g. into [Roam Research](https://roamresearch.com)). 

You can see an example (meaning my personal, daily updated, Pocket highlights) here: https://pocket.v01.io

Read more on my Blog Post: https://v01.io/2020/12/31/pocket-highlights/

## About 
* The core is based on this Python Package: https://github.com/karlicoss/pockexport
* But it is extented by my individual convert Script in Node to create html.
* The whole thing is then published daily init to a github page.

## Installation / create your own instance
* Fork this repository for yourself.
* Set Github repository secrets
    * __CONSUMER_KEY__: Your Pocket consumer key, [see here how to obtain them by using the _chaotic way_](https://github.com/karlicoss/pockexport)
    *  __ACCESS_TOKEN__: Your Pocket access token, [follow the pocket developer documentation with your _chaotic_ consumer key all the way to the end](https://getpocket.com/developer/docs/authentication)
    * __PERSONAL_TOKEN__: A personal Github Access token to push the result as a github page in the branch _gh-pages_, [see Github Docs on how to create one](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token)
* Make sure, that the action runs. 


## Development
Everything is step by step described in the respective files.
* __Dev__: [Makefile](https://github.com/klausbreyer/pocket-highlights/blob/main/Makefile)
* __Drod__: [Github workflow](https://github.com/klausbreyer/pocket-highlights/blob/main/.github/workflows/main.yml)

