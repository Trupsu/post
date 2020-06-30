# post

# git clone 'https://github.com/Trupsu/blog.git'

# cd blog 
# npm install // to install all packages 

# create new database in mongodb with localhost:27017
# database name as 'post'
# create collection name as 'feeds' ( can use query as db.getCollection('feeds').insert([ /* all locl json data here */]) to insert all the data into collection) 

# api details to get all feeds

# api name : localhost:3000/post/feeds
# method : POST
# headers : { Key : 'Content-Type' , Value : 'application/json' }
# body : {}  // to get all list of feeds 