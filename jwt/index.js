const jwt = require('jsonwebtoken');

const token = jwt.sign({ id: 3, username: 'joshua' }, 'server secret', { expiresIn: '1h' });

token; // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Impvc2h1YSIsImlhdCI6MTU4ODAyNDQwNn0.sKuQjJRrTjmr0RiDqEPJQcTliB9oMACbJmoymkjph3Q'

const recoveredData = jwt.verify(token, 'server secret');

recoveredData; // { id: 3, username: 'joshua', iat: 1588024406 }


// wait 1 hour:

jwt.verify(token, 'server secret');

// Uncaught TokenExpiredError: jwt expired {
//   name: 'TokenExpiredError',
//   message: 'jwt expired',
//   expiredAt: 2020-04-27T21:58:57.000Z
// }

fetch('our api url', {
    method: 'SOME_METHOD',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer HOLYMOLEYTHISTOKENISHUGE'
    },
    body: JSON.stringify({})
  })


  server.use(async (req, res, next) => {
    const prefix = 'Bearer '
    const auth = req.headers['Authorization'];
  
    if (!auth) {
      next(); // don't set req.user, no token was passed in
    }
  
  
    if (auth.startsWith(prefix)) {
      // recover the token
      const token = auth.slice(prefix.length);
      try {
        // recover the data
        const { id } = jwt.verify(data, 'secret message');
  
        // get the user from the database
        const user = await getUserById(id);
        // note: this might be a user or it might be null depending on if it exists
  
        // attach the user and move on
        req.user = user;
  
        next();
      } catch (error) {
        // there are a few types of errors here
      }
    }
  })