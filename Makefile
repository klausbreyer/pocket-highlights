setup: 
	pip3 install --user git+https://github.com/karlicoss/pockexport

export: 
	python3 -m pockexport.export --secrets pocketsecrets.py > export.json

convert:
	node convert.js

magic:
	make export && make convert
