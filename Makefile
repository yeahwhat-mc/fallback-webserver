all: push sync

push:
	git push

sync:
	git push -f origin master:gh-pages
