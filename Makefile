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
VITE=$(NODE_BIN)vite

## install
install:
	pnpm i --frozen-lockfile

## type check
typecheck:
	$(NODE_BIN)tsc -p tsconfig.json $(arguments) 

typecheck-watch:
	make typecheck arguments=--w

## start
start:
	(trap 'kill 0' INT; $(VITE) & make typecheck-watch)

## generate-sw
generate-sw:
	$(NODE_BIN)workbox generateSW workbox-config.cjs

## build
pre-build:
	rm -rf build && cp -R public build

build-production: pre-build
	make generate-sw && $(VITE) build --mode production

build-staging: pre-build
	make generate-sw && $(VITE) build --mode staging

build-development: pre-build
	make generate-sw && $(VITE) build --mode development

## clean-up:
clean-up:
	rm -rf src test node_modules script sql .git* docs public

## test
test:
	$(NODE_BIN)vitest

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
	$(NODE_BIN)eslint src/ test/ -f='stylish' --color &&\
		make find-unused-exports &&\
		make find-unimported-files

## find unused exports
find-unused-exports:
	$(NODE_BIN)find-unused-exports

## find unimported files
find-unimported-files:
	$(NODE_BIN)unimported
