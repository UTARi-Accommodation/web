## declare PHONY
.PHONY: build test

## type check
tsc=node_modules/.bin/tsc
typecheck:
	$(tsc) --pretty --skipLibCheck --noEmit

typecheck-watch:
	$(tsc) --pretty --skipLibCheck --noEmit --w

## start
start:
	(trap 'kill 0' INT; make typecheck & make build)

start-watch:
	node_modules/.bin/nodemon

## build
build:
	rm -rf build\
		&& cp -R public build\
		&& node script/esbuild.js\
		&& cd build/ && cp index.html 200.html && cd ../\
		&& node script/terser.js

## test
jest=node_modules/.bin/jest
test-parser:
	$(jest) test/parser/*

test-url:
	$(jest) test/url/*

test-converter:
	$(jest) test/converter/*

test:
	${jest}
	echo "All tests passed"

## code coverage
cov=code-cov
$(cov):
	${jest} ${cov} --coverage --coverageDirectory='coverage'

## format
prettier=node_modules/.bin/prettier
format-ts:
	${prettier} --write src/

format:
	make format-ts

format-check:
	${prettier} --check src/

## lint
eslint=node_modules/.bin/eslint
lint-src:
	${eslint} src/** -f='stylish' --color
