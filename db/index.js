const { Client } = require('pg') // imports the pg module

const client = new Client('postgres://localhost:5432/juicebox-dev');

async function createUser({ 
  username, 
  password, 
  name, 
  location
 }) {
  try {
    const { rows } = await client.query(`
      INSERT INTO users(username, password, name, location) 
      VALUES($1, $2, $3, $4) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `, [username, password, name, location]);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, fields ={}) {

  const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=${ index + 1 }`
  ).join(', ');

  if (setString.length === 0) {
      return;
  }

  try {
      const { rows: [ user ] } = await client.query(`
      UPDATE users
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
      `, []);

      return user;
  }   catch (error) {
      throw error;
  }
}

async function getAllUsers() {
  const { rows } = await client.query(`SELECT id, username, name, location, active FROM users;`);

  return rows;
}

// async function getUserById(userId) {
//   // first get the user (NOTE: Remember the query returns 
//   const { rows } = await client.query(`SELECT user FROM users;`);

//   if (rows.length === 0) {
//     return NULL;
// }
//   else {

//   }}


//   return rows;
// }
//     // (1) an object that contains 
//     // (2) a `rows` array that (in this case) will contain 
//     // (3) one object, which is our user.
//     // if it doesn't exist (if there are no `rows` or `rows.length`), return null

//   // if it does:
//   // delete the 'password' key from the returned object
//   // get their posts (use getPostsByUser)
//   // then add the posts to the user object with key 'posts'
//   // return the user object
// }





async function createPost({ 
  authorId, 
  title, 
  content 
  
 }) {
  try {
    const { rows } = await client.query(`
      INSERT INTO users(authorID, title, content) 
      VALUES($1, $2, $3) 
      ON CONFLICT (authorID) DO NOTHING 
      RETURNING *;
    `, [authorID, title, content]);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function updatePost(id, {
  title, 
  content, 
  active
}) {

  try {
      const { rows: [ posts ] } = await client.query(`
      UPDATE posts
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
      `, []);

      return posts;
  }   catch (error) {
      throw error;
  }

  async function getPostsByUser(userId) {
    try {
      const { rows } = client.query(`
        SELECT * FROM posts
        WHERE "authorId"=${ userId };
      `);
  
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

async function getAllUsers() {
  const { rows } = await client.query(`SELECT id, title, content, active FROM posts;`);

  return rows;
}




module.exports = {  
  client,
  createUser,
  getAllUsers,
  updateUser,
  createPost,
  getAllPosts,
  updatePost,
  getAllTags,
  getPostsByUser,
   
}