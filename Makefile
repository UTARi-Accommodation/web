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

## generate-sw
generate-sw:
	node_modules/.bin/workbox generateSW workbox-config.cjs

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
	node_modules/.bin/esbuild test/index.ts --bundle --minify --target=node16.3.1 --platform=node --outfile=__tests__/index.test.js &&\
		node_modules/.bin/jest __tests__ $(arguments)

## code coverage
code-cov:
	make test arguments=$(test-dir) --coverage --coverageDirectory='coverage'

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
