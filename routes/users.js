var express = require('express');
var router = express.Router();
const { User } = require('../models');
/* GET users listing. */
router.get('/getUser', async (req, res, next) => {
  const result = await User.findAll();
  if (result == null) {
    res.json({
      status: 400,
      data: 'ERROR GET DATA',
    });
  }
  res.json({
    status: 200,
    message: 'DATA FOUND ON DATABASE',
    data: result,
  });
});
// GET USER BY ID
router.get('/getUser/:id', async (req, res, next) => {
  const id = req.params.id;
  const result = await User.findByPk(id);
  if (!result) {
    res.json({
      status: 400,
      data: 'ERROR GET DATA',
    });
  }
  res.json({
    status: 200,
    message: `DATA FOUND WITH ID ${result.id}`,
    data: result,
  });
});
// UPDATE USER
router.put('/update/:id', async (req, res, next) => {
  const id = req.params.id;
  const result = await User.findByPk(id);
  if (!result) {
    res.json({
      status: 400,
      data: 'ERROR GET DATA',
    });
  }
  const data = req.body;
  result.update(data);
  res.json({
    status: 200,
    message: 'DATA SUCCESSFULLY UPDATED',
    data: result,
  });
});
// CREATE USER
router.post('/create', async (req, res, next) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
  };
  const result = await User.create(data);
  if (!result) {
    res.json({
      status: 400,
      data: 'ERROR CREATE DATA',
    });
  }
  res.json({
    data: {
      id: result.id,
      name: result.name,
      email: result.email,
      status: 'DATA SUCCESSFULLY CREATED',
    },
  });
});
// DELETE USER
router.delete('/delete/:id', async (req, res, next) => {
  const id = req.params.id;
  const data = await User.findByPk(id);
  //CHECK IF MENTOR IS EMPTY
  if (!data) {
    return res.json({
      status: 'error',
      message: 'DATA NOT FOUND',
    });
  }

  await data.destroy();

  return res.json({
    status: 200,
    data: `USER SUCCESSFULLY DELETED WITH ID ${id}`,
  });
});

module.exports = router;
