# post

This project follows MVC pattern 

This project includes a Feeds api in routes folder, model for post and middleware as Express.

to run the project on to the desktop

Goto terminal and type following commands

 -> git clone 'https://github.com/Trupsu/blog.git'

 -> cd blog 

 -> npm install // to install all packages 

to create new database in mongodb 

create a localhost server with database name as -> 'post'
create collection name as -> 'feeds' to insert all the data into collection 

use query as db.getCollection('feeds').insert([ /* all mock_data.json copied json here */])

goto terminal to run the project

 -> npm start // to establish database connection

to run post feeds api 

go to postman

url name : localhost:3000/post/feeds
method : POST
headers : { Key : 'Content-Type' , Value : 'application/json' }
body : {}  // to get all list of feeds (default all feeds)

body request : 
1. Search ( i. for normal search use "text" field name in request ,
ii. for quote search use "quotetext" field name in request

2. Sort : Can sort by name or date (lastDateEdited) fields in request

3. Pagination : Can add skip & limit fields in request

In response we will get list of feeds by given search and total count of feeds.


