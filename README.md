# Fate Charsheet Application

This character sheet application is aimed at GMs and players for FATE games, with a particular eye & emphasis towards Dresden Files RPG.

Overal structure is a Ruby on Rails backend with PostgreSQL storage, and an AngularJS based front-end component.  Intention is to package both of them into a single repository, but future developments may require splitting.

## Installation

Instructions assume installation and use of rvm (Ruby Version Manager) and npm (node package manager).

* Run 'bundle install' to install dependencies for API.
* Run 'npm install' to install node dependencies for use in compiling front-end
* Run 'bower install' to install font-end dependencies

## Test Suites

API testing is handled via RSpec.  Simply type 'rspec' to run entire suite.