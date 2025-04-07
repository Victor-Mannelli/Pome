dev:
	git pull && npm run dev

build: 
	npm run pre-commit && npm run build

start:
	next start
