# Rise of Kingdoms Gathering timer

A timer that calculates how much time it takes for you to gather and notifies you.

Live version in github.io; https://merikrotti.github.io/rok_gathering_notifications/

Incomplete. So is this readme.

## Version plan:

### pre-v0.2
Semi-functional program with all of the gathering calculations done.

### v0.2
Layout finished, additions to help handling data

### v0.3
Final data fixes, cleaning up.

### after-v0.3
Middleware API, maybe other features.

## Bugs

### Major:
- Errors with modified/removed accounts are TODO. Creating a context provider to handle this.
- JSON saves accounts as the name as the primary key. Not a bug, but terrible practice. Will change to ID's
- Most of programming errors related to modified data will be fixed at 0.3.

### Minor:
- Filters stay when every timer is removed.

## I have an issue?

Open an issue on github and double check try to make it as comprehensive as possible.

## How are times calculated?

TODO

## How do I host my own?

There is a build branch, if you don't know how to, try to find information how to host html files. That is basic information and don't open an issue on it
