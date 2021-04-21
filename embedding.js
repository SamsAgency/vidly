const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

// querry first
// const updateAuthor = async (courseId) => {
//   const course = await Course.findById(courseId)
//   course.author.name = "Joseph 1"
//   course.save()
// }

// update directly
// const updateAuthor = async (courseId) => {
//   const course = await Course.findByIdAndUpdate(courseId, {
//     $unset : {
//       'author._id' : ''
//     }
//   })
// }

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

// adding author function
const addAuthor = async (courseId, author) => {
  const course = await Course.findById(courseId)
  course.authors.push(author)
  course.save()
}

// removing authors
const removeAuthor = async (courseId, authorId) => {
  const course = await Course.findById(courseId)
  const author = course.authors.id(authorId)
  author.remove()
  course.save()
}

// createCourse('Node Course', [
//   new Author({ name: 'Author 1' }),
//   new Author({ name: 'Author 2' }),
//   new Author({ name: 'Author 3' })
// ]);
// updateAuthor('60757c7d29855f143c09dbc6')

// addAuthor('607583dc24291936d4da48dd', new Author({ name: 'Author 4' }))
removeAuthor('607583dc24291936d4da48dd', '607586346d07c92de4fe0ad6')