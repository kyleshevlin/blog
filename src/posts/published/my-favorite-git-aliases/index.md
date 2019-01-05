---
categories: ['Web Development']
date: "2015-09-10"
slug: "my-favorite-git-aliases"
status: "publish"
title: "My Favorite Git Aliases"
---

If you're like me, you like to find patterns in your work and turn them into aliases and shortcuts in the terminal. I thought I'd share with you my current Git aliases, explaining a few along the way.

For starters, you'll want to add these aliases to your `.gitconfig` file.

```
[alias]
  br = branch
  brm = branch --merged
  brnm = branch --no-merged
  ci = commit
  co = checkout
  copl = "!f() { git checkout $1 && git pull --rebase origin $1; }; f"
  df = diff
  lg = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative
  mg = merge
  st = status
  plo = pull --rebase origin
  pho = push origin
  plod = pull --rebase origin dev
  phod = push origin dev
  plos = pull --rebase origin stage
  phos = push origin stage
  plom = pull --rebase origin master
  phom = push origin master
  reaper-nokill = remote prune --dry-run origin
  reaper = remote prune origin

```

Most of these aliases are self explanatory, but let's go through some of the less common ones.

#### brm

Using the `branch --merged` command will give you a list of branches merged into the branch you're currently on. It's counterpart `branch --no-merged` does exactly the opposite. These commands are great for cleaning up merged branches.

#### copl

This is a function that takes a branch name for an argument. It first checks out that branch, and then runs a `git pull --rebase` on that branch. I found myself constantly checking out a branch and pulling it immediately, so I turned it into one alias.

#### lg

This is a prettier log format. It will actually create the branch structure in the terminal.

#### reaper

Sometimes you need your local git to forget about remote branches that no longer exist. This is where pruning comes into play. When I first wrote this alias, it was `repr` for "remote prune". Phonetically, that sounded like "reaper" and given that I'm slashing branches from git, it seemed appropriate to rename the alias after our friendly harbinger of death.

So there you have it. Hope this Git aliases help you out. Leave some of your favorites in the comments below.
