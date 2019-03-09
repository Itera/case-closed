.PHONY: all install uninstall copy remove start stop enable disable prepare_deps remove_deps

all: install enable start

install: prepare_deps copy

uninstall: stop disable remove remove_deps

copy:
	sudo cp ./services/caseClosed-api.service /etc/systemd/system/.
	sudo cp ./services/caseClosed-rfid.service /etc/systemd/system/.

remove:
	sudo rm /etc/systemd/system/caseClosed-api.service
	sudo rm /etc/systemd/system/caseClosed-rfid.service

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
