run:
	docker run -p 3000:3000 -v "$(PWD)/src:/app/src":ro --rm --name booksApp react-image

stop:
	docker stop booksApp
