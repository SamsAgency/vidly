const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// article model
const Article = mongoose.model('Article', new mongoose.Schema({
  title : String,
  author : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
}))

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

// create article function
const createArticle = async (title, author) => {
  const article = new Article({
    title,
    author
  })

  const articleResults = await article.save()
  console.log(articleResults)
}

async function listCourses() { 
  const courses = await Course
    .find()
    .populate('author', '-_id')
    .select('name author')
  console.log(courses);
}

// createAuthor('Josh', 'Some bio', 'Website');

// createCourse('Javascript Course', '6075714b7d8098292c57bb83')

// createArticle('Article Title 1', '6075714b7d8098292c57bb83')

listCourses();