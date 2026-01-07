const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis');

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  const current = await getAsync('added_todos');
  const addedTodos = Number(current) || 0;

  res.json({ added_todos: addedTodos });
});


module.exports = router;
