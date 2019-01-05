---
categories: ['Web Development']
date: "2015-07-25"
slug: "bash-shortcut-how-to-make-directory-and-change-directory-in-one-command"
status: "publish"
title: "Bash Shortcut: How to Make Directory and Change Directory in One Command"
---

If you're like me, you're constantly using the command line to make a directory and then immediately change to that directory. Here's a Bash function that will allows you to do that:

```
# Make a directory && cd into that directory
function mkdircd () { mkdir -p "$@" && eval cd "\"\$$#\""; }

```

This function takes the user supplied directory name, makes all the directories needed to get there, and then `cd`s to that directory.

Hope you find it useful!
