const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: '', // replace with your MySQL password
  database: 'docsecuredb' // replace with your database name
});

// User model functions
const User = {
  create: async (userData) => {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 12);
    
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      connection.query(query, [name, email, hashedPassword], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  findOne: async (email) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE email = ?';
      connection.query(query, [email], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Ensure it returns the user object
      });
    });
  },

  comparePassword: async (candidatePassword, hashedPassword) => {
    if (!hashedPassword) {
      throw new Error('Hashed password is required for comparison');
    }
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
};

module.exports = User;
