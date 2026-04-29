const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('list', { users });
  })
  .post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const age = req.body.age;
    const isValid = firstName !== "" && lastName !== "" && gender !== "" && age !== "";

    if (isValid) {
      console.log(`Adding user: ${firstName} ${lastName}`);

      users.push({
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        age: age
      });

      res.redirect('/users/list');
    } else {
      console.log("Error adding user!");
      res.render('new', {  
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        age: age
      });
    }
  });

router.get('/list', (req, res) => {
  res.render('list', { users }); 
});

router.get('/new', (req, res) => {
  res.render('new', {  
    firstName: "",
    lastName: "",
    gender: "",
    age: ""
  });
});

router.route('/:id')
  .get((req, res) => {
    res.send(`
      <h1>User Info</h1>
      <p>First Name: ${req.user.firstName}</p>
      <p>Last Name: ${req.user.lastName}</p>
      <p>Gender: ${req.user.gender}</p>
      <p>Age: ${req.user.age}</p>
      <a href="/users/list">Back to User List</a>
    `);
  });

const users = [
  { firstName: "George", lastName: "Salayka", gender: "Male", age: 30 },
  { firstName: "Justyna", lastName: "Example", gender: "Female", age: 25 }
];
router.param('id', (req, res, next, id) => {
  req.user = users[id];
  next();
});
module.exports = router;