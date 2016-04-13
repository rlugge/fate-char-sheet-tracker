# Fate Charsheet Application

This character sheet application is aimed at GMs and players for FATE games, with a particular eye & emphasis towards Dresden Files RPG.

Overal structure is a Ruby on Rails backend with PostgreSQL storage, and an AngularJS based front-end component.  Intention is to package both of them into a single repository, but future developments may require splitting.

## Installation

Instructions assume installation and use of rvm (Ruby Version Manager) and npm (node package manager).

* Run 'bundle install' to install dependencies for API.
* Run 'npm install' to install node dependencies for use in compiling front-end.  This will also compile the deployed version of the app, due to the post-install scripts aimed for heroku

## Running Application

## Test Suites

API testing is handled via RSpec.  Simply type 'rspec' to run entire suite.

## Heroku Deployment

Several aspects of application are built using steps found in the following repository:

https://github.com/vigetlabs/gulp-rails-pipeline

There is a `.buildpacks` file that may do this on it's own, but according to that repository you will need to run the following commands:

	heroku buildpacks                     # view current buildpacks
	heroku buildpacks:clear               # clear current buildpacks, if necessary
	heroku buildpacks:add heroku/nodejs   # add the buildpacks we want ...
	heroku buildpacks:add heroku/ruby     # ... in the order we want them

Your goal is to have two heroku buildpacks, node first, then ruby.