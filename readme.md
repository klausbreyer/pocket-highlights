# Pocket-Highlights

I started this open source project to extracts my Highlights from [Pocket](https://app.getpocket.com) and optimize the format for easy copy & paste into [Roam Research](https://roamresearch.com).

While doing so, my personal extracted highlights are also publicly available: https://pocket.v01.io


* The core is based on this Python Package: https://github.com/karlicoss/pockexport
* But it is extented by my individual convert Script in Node to create html.
* The whole thing is then published daily init to a github page.

## Create your own instance
* Fork this repository for yourself.
* Set Github repository secrets
    * __CONSUMER_KEY__: Your Pocket consumer key, [see here how to obtain them by using the _chaotic way_](https://github.com/karlicoss/pockexport)
    *  __ACCESS_TOKEN__: Your Pocket access token, [follow the pocket developer documentation with your _chaotic_ consumer key all the way to the end](https://getpocket.com/developer/docs/authentication)
    * __PERSONAL_TOKEN__: A personal Github Access token to push the result as a github page in the branch _gh-pages_, [see Github Docs on how to create one](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token)
* Make sure, that the action runs. 


## Development
Everything is step by step described in the files provided for this purpose.
* __Dev__: [Makefile](https://github.com/klausbreyer/pocket-highlights/blob/main/Makefile)
* __Drod__: [Github workflow](https://github.com/klausbreyer/pocket-highlights/blob/main/.github/workflows/main.yml)

