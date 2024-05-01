clear:
	clear

npm:
	npm install
	npm update
	npm audit fix

git: clear
	git add .
	git commit -m "$(m)"
	git push origin $(b)

start: clear
	npm run start:dev