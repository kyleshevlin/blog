---
categories: ['Web Development']
date: '2016-03-09'
slug: 'using-and-and-or-in-bash-scripts'
title: 'Using && and || in Bash Scripts'
---

I write about Bash so often you might start to think it's all I do. It's not, but considering I spend a good portion of my day in the terminal, I'm always on the look out for ways to make it a more efficient experience.

Recently, I came upon a simple trick for bash scripts that just has to be shared. It involves the operators `&&` (AND) and `||` (OR). In most cases, `&&` and `||` are used for evaluation purposes, resulting in a boolean value (true or false).

In most languages, this would look something like this:

```ruby
# Using Ruby for this example
foo = true
bar = false

if foo && bar; end # returns false; && requires both expressions to evaluate to true
if foo || bar; end # returns true; || requires only one expression to evaluate to true

```

### The && Operator

Since we know that an `&&` requires both expressions to be true, we can use this knowledge to chain bash commands that we only want to run in succession if the first command was successful. For example:

```bash
cd foo && touch bar.html

```

If the terminal is able to successfully `cd` into the directory `foo`, then it will attempt to create the file `bar.html`. If it fails, no attempt at file creation will be made.

### The || Operator

In other circumstances, we might want to try one command and then another if the first fails. In this case, the `||` operator is our friend. I have specifically used this in a bash alias I've made for deploying a site. Depending upon what version of Capistrano is being used in a project, the terminal command syntax is different. Thus, we simply try one, and if it fails we try another.

```bash
# Literally my alias for deploying to production
alias capp="cap deploy -S loc=prod || cap prod deploy"

```

### Putting Them Together

So, you can see that you can quickly use these to construct larger scripts that can do a rudimentary form of error handling without a lot of effort. Often, I need to deploy the same feature branch of code to multiple environments. I made a bash function using the `&&` and `||` operators like I've laid out here to do just that with one short command.

```bash
# Deploy a branch to all branches
function mgdep () {
  # if no argument is passed to the function, get the current branch (the feature branch)
  if [ $# -eq 0 ]; then
      # get_git_branch is a bash function I've made that grabs the current branch
      branch=$(get_git_branch)
  else
    branch=$1
  fi

  git checkout master && git pull --rebase origin master && echo -e "\033[0;32mMaster checked out and pulled\033[0m"
  git merge $branch && echo -e "\033[0;32m${branch} merged into master\033[0m"
  git push origin master && echo -e "\033[0;32m${branch} pushed to master\033[0m"
  # You've seen my Capistrano alias above, ones for stage and dev are used further down
  capp && echo -e "\033[0;32m${branch} deployed to prod via master branch\033[0m"
  git checkout stage && git pull --rebase origin stage && echo -e "\033[0;32mStage checked out and pulled\033[0m"
  git merge $branch && echo -e "\033[0;32m${branch} merged into stage\033[0m"
  git push origin stage && echo -e "\033[0;32m${branch} pushed to stage\033[0m"
  caps && echo -e "\033[0;32m${branch} deployed to stage via stage branch\033[0m"
  git checkout dev && git pull --rebase origin dev && echo -e "\033[0;32mDev checked out and pulled\033[0m"
  git merge $branch && echo -e "\033[0;32m${branch} merged into dev\033[0m"
  git push origin dev && echo -e "\033[0;32m${branch} pushed to dev\033[0m"
  capd && echo -e "\033[0;32m${branch} deployed to dev via dev branch\033[0m"
  # Terminal-notifier lets me know all the deploys have completed
  git checkout master && terminal-notifier -message 'Deploys completed. Master checked out.' -sound 'default'
}

```

### Conclusion

Hope this inspires you a bit and encourages you to create your own bash scripts for programmatically adding some efficiency into your development process.
