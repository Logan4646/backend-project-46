install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
make test-coverage:
	npx jest
