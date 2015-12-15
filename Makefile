.PHONY: all npm

all: static/d3.v3.min.js npm

npm:
	npm install

static/d3.v3.min.js:
        curl -o "static/d3.v3.min.js" "http://d3js.org/d3.v3.min.js"
