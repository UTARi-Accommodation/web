## declare PHONY
.PHONY: build test all
MAKEFLAGS += --silent

all:
	make lint &&\
		make typecheck &&\
		make format-check &&\
		make test &&\
		make build

NODE_BIN=node_modules/.bin/

## install
install:
	yarn install --frozen-lockfile

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
	rm -rf src test node_modules script sql .git* server docs public

## test
test:
	$(NODE_BIN)esbuild test/index.ts --bundle --sourcemap --minify --target=node16.3.1 --platform=node --outfile=__tests__/index.test.js &&\
		$(NODE_BIN)jest __tests__ $(arguments)

## format
prettier=$(NODE_BIN)prettier
prettify:
	$(prettier) --$(type) src/ test/

format-check:
	make prettify type=check

format:
	make prettify type=write

## lint
lint:
	$(NODE_BIN)eslint src/ test/ -f='stylish' --color
