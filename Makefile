.PHONY: all install uninstall copy remove start stop enable disable prepare_deps remove_deps

all: install enable start

install: prepare_deps copy

uninstall: stop disable remove remove_deps

copy:
	sudo cp ./services/caseClosed-api.service /etc/systemd/system/.
	sudo cp ./services/caseClosed-rfid.service /etc/systemd/system/.
	sudo mkdir -p /usr/local/bin/caseClosed/python/libs/
	sudo cp ./python/src/* /usr/local/bin/caseClosed/python/*
	sudo cp ./python/src/libs/* /usr/local/bin/caseClosed/python/libs/*

remove:
	sudo rm /etc/systemd/system/caseClosed-api.service
	sudo rm /etc/systemd/system/caseClosed-rfid.service
	sudo rm /usr/local/bin/caseClosed/python/*
	sudo rm /usr/local/bin/caseClosed/python/libs/*
	sudo rmdir /usr/local/bin/caseClosed/python/libs/
	sudo rmdir /usr/local/bin/caseClosed/python/

start:
	sudo systemctl start caseClosed-api.service
	sudo systemctl start caseClosed-rfid.service

stop:
	sudo systemctl stop caseClosed-api.service
	sudo systemctl stop caseClosed-rfid.service

restart: stop start

enable:
	sudo systemctl enable caseClosed-api.service
	sudo systemctl enable caseClosed-rfid.service

disable: 
	sudo systemctl disable caseClosed-api.service
	sudo systemctl disable caseClosed-rfid.service

prepare_deps:
	sudo pip install -r ./python/requirements.txt

remove_deps:
	sudo pip remove -r ./python/requirements.txt

wireguard:
	sudo apt-get update
	sudo apt-get upgrade 
	sudo apt-get install raspberrypi-kernel-headers
	echo "deb http://deb.debian.org/debian/ unstable main" | sudo tee --append /etc/apt/sources.list.d/unstable.list
	sudo apt-get install dirmngr 
	sudo apt-key adv --keyserver   keyserver.ubuntu.com --recv-keys 8B48AD6246925553 
	printf 'Package: *\nPin: release a=unstable\nPin-Priority: 150\n' | sudo tee --append /etc/apt/preferences.d/limit-unstable
	sudo apt-get update
	sudo apt-get install wireguard 
	sudo reboot

keys:
	wg genkey | tee privatekey | wg pubkey > publickey
	@echo Use generated privatekey and publickey in Wireguard config

harden:
	# Blocks all requests not passing through Wireguard VPN
	# Obs! Not thouroghly tested. Might have unforseen effects
	#allow related,established
	sudo iptables -A INPUT  -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
	#Don't mess with loopback
	sudo iptables -A INPUT -i lo -j ACCEPT
	#Don't mess with Wireguard
	sudo iptables -A INPUT -i wg0 -j ACCEPT
	#literally drop everything else on every adapter
	sudo iptables -A INPUT -j DROP

	#allow related,established
	sudo iptables -A FORWARD -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
	#Don't mess with loopback
	sudo iptables -A FORWARD -i lo -j ACCEPT
	#Don't mess with Wireguard
	sudo iptables -A FORWARD -i wg0 -j ACCEPT

	#anything not allowed anywhere dropped.
	sudo iptables -A FORWARD -j DROP
	sudo reboot

native-app:
	yarn --cwd react-native/ReactApp
	yarn --cwd react-native/ReactApp start
	yarn start
