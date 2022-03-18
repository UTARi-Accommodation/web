## declare PHONY
.PHONY: build test

## type check
typecheck:
	node_modules/.bin/tsc -p tsconfig.json $(arguments) 

typecheck-watch:
	make typecheck arguments=--w

## serve
serve:
	node server

## start
start:
	(trap 'kill 0' INT; make serve & make build & make typecheck-watch)

## build
build:
	rm -rf build\
		&& cp -R public build\
		&& node script/esbuild.js\
		&& cd build/ && cp index.html 200.html && cd ../\
		&& node script/terser.js

## test
test-command:
	rm -rf __tests__ \
	&& node script/test.js\
	&& node_modules/.bin/jest $(arguments) --runInBand

test-dir=__tests__

test:
	make test-command arguments=$(test-dir)

test-parser:
	make test-command arguments=$(test-dir)/parser/*

test-url:
	make test-command arguments=$(test-dir)/url/*

test-converter:
	make test-command arguments=$(test-dir)/converter/*

## code coverage
code-cov:
	make test-command arguments=$(test-dir) --coverage --coverageDirectory='coverage'

## format
prettier=node_modules/.bin/prettier
format-ts:
	$(prettier) --write src/

format-check:
	$(prettier) --check src/

format:
	make format-ts

## lint
eslint=
lint-src:
	node_modules/.bin/eslint src/** -f='stylish' --color
