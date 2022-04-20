## declare PHONY
.PHONY: build test all

all:
	make lint &&\
		make typecheck &&\
		make format-check &&\
		make test &&\
		make build

NODE_BIN=node_modules/.bin/

## install dev server
install-server:
	cd server && yarn

## install dev server
install-server:
	cd server && yarn

## type check
typecheck:
	$(NODE_BIN)tsc -p tsconfig.json $(arguments) 

typecheck-watch:
	make typecheck arguments=--w

## serve
serve:
	node server

## start
start:
	(trap 'kill 0' INT; make serve & make build & make typecheck-watch)

## generate-sw
generate-sw:
	$(NODE_BIN)workbox generateSW workbox-config.cjs

## transpile
transpile:
	node script/esbuild.js\
		&& cd build/ && cp index.html 200.html && cd ../\
		&& node script/terser.js

## build
pre-build:
	rm -rf build && cp -R public build

build: pre-build
	make generate-sw && make transpile

## clean-up:
clean-up:
	rm -rf src test node_modules script sql .github .git server

## test
test:
	$(NODE_BIN)esbuild test/index.ts --bundle --minify --target=node16.3.1 --platform=node --outfile=__tests__/index.test.js &&\
		$(NODE_BIN)jest __tests__ $(arguments)

## code coverage
code-cov:
	make test arguments=--coverage

## format
prettier=$(NODE_BIN)prettier
prettify-src:
	$(prettier) --$(type) src/

prettify-test:
	$(prettier) --$(type) test/

format-check:
	(trap 'kill 0' INT; make prettify-src type=check & make prettify-test type=check)

format:
	(trap 'kill 0' INT; make prettify-src type=write & make prettify-test type=write)

## lint
eslint:
	$(NODE_BIN)eslint $(folder)/** -f='stylish' --color
lint-src:
	make eslint folder=src

lint-test:
	make eslint folder=test

lint:
	(trap 'kill 0' INT; make lint-src & make lint-test)
