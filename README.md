# delete-reddit-posts-and-comments

# Overview:
This repo is originated after I saw a vide from `Louis Rossmann` [Reddit breaks the law to quell protests - spez has gone too far](https://www.youtube.com/watch?v=mfZKkUg8jgM).
There he mentioned someone manually deleting all posts and comments.
I think for people as dedicated as that guy who might want to try it, I might help a little.

This is still involves manual intervention, but repeated-tasks are automated.


## Steps:
1. Open your reddit profile in pc.
2. Go to `comments` or `posts` tab.
3. Once data is loaded, open your browser dev-tools (generally F12 or google how to open in your browser).
4. Go to console tab in the dev-tools.
5. Copy the code from `index.js` file.
6. Paste in the browser dev-tools console.
7. Press enter.

## Flow:
1. This script loads all the `more` menu buttons.
2. Then it tries to load more (upto 200) by scrolling down.
3. Once it has all 200+ nodes or time expires, then it starts clicking on them one by one.
4. After clicking on one node it looks for delete button in menu items, if found it will click on it.
5. Finally it looks for the delete button in the modal that appears, it then clicks on it.
6. Once done it waits a few milliseconds and does the same for next item.

## Other Details:
- Once it is done deleting these initial posts it will reload the tab.
- **After that you have to rerun the code again. you can do that by hitting UP arrow once on keyboard and Enter.**
- If your computer slows try lowering the initial count of loaded posts to 100 from 200.
- You have to keep the browser window in foreground so that browser does not make it sleep, which will pause the flow.
- Once you have deleted the posts you can delete the comments similarly.

**DONT DELETE THE USER ITSELF SO THAT YOU CAN VERIFY LATER IF REDDIT `UN-DELETED` YOUR CONTENT LIKE MENTIUONED IN VIDEO**

## Limitations:
- This code is very janky and kind of like first draft.
- This is entirely dependent on the classnames for various elements on reddit.
- **If the classnames are changed by reddit it will break. This can happen if they rebuild their web-app**
- We have to then change the code to use new classnames by looking at them in the html
