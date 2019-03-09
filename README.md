# CaseClosed

This is the GitHub repository for the code used in the [Arctic IOT Challenge](http://ariot.no/) 2019. Our team name was CaseClosed, and our project revolves around creating a smart suitcase. Here is a sketch of our planned solution:

![](https://i.imgur.com/YxAOcch.jpg)

## Getting started

For your convenience we provide a Makefile for bootstraping the service. Reading through that should give you a nice overview over the different features. Some functions should be executed on a Raspberry pi, while other are for local development of our application. For example `make native-app` will setup and run our application locally on your development computer, while `make wireguard && make keys` will install everything needed for running Wireguard on your Raspberry pi before generating public and private keys that can be added to your config. `make install` will download dependencies, install systemd services and enable them. Bringing everything up and running for you.  

Have a look at the file for more usefull commands :-) 
