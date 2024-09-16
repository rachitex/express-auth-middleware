const express = require('express');
const { query, validationResult } = require('express-validator');
const authenticateToken = require('./authMiddleware');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.get(
  '/add', 
  authenticateToken, 
  [
    query('num1').isNumeric().withMessage('num1 must be a number'),
    query('num2').isNumeric().withMessage('num2 must be a number')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    const result= num1 + num2;

    res.json({result});
  }
);

app.listen(port, () => {
  console.log('Server is running on port 3000')
});

const JWT_SECRET = 'my_jwt_key';
app.post(
  '/login',
  (req, res) => {
    const user = {id: 1, username: 'testuser'};
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h'})
    res.json({token})
  }
  );