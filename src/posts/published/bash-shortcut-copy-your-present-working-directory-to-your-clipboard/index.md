---
categories: ['Web Development']
date: "2015-07-25"
slug: "bash-shortcut-copy-your-present-working-directory-to-your-clipboard"
status: "publish"
title: "Bash Shortcut: Copy your Present Working Directory to your Clipboard"
---

Like most developers, I'm always looking for ways to increase my efficiency. One way I like to do this is through [Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) functions.

Just like other programming languages, Bash functions allow you to combine Bash commands or manipulate user input to output a desired effect. While I have a good number of Bash functions, today we're going to focus on a simple one: how to copy your present working directory to your clipboard.

While in your terminal, the present working directory (or pwd) is the directory you are currently in. Using the command `pwd` will supply you with an output of your current directory.

The other Bash command we're going to use is the `pbcopy` command. This command is short for "pasteboard copy" and will take the standard input and paste it on the clipboard. A nice feature of the `pbcopy` command is the ability to "pipe" (|) the standard output of one command into the `pbcopy` command. We're going to use that to make our Bash function. Put this in your `.bash_profile` or `.bashrc` file.

```
# Copy the PWD to the Clipboard
alias cpwd="pwd | tr -d '\n' | pbcopy && echo 'pwd copied to clipboard'"

```

Now we can use the command `cpwd` to copy our present working directory to the clipboard. I use this frequently for getting the right file paths for symlinks, but there are other uses as well.

Hope this helps!
