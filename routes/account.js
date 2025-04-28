const express = require('express');
const router = express.Router();

let users = []; // массив пользователей
let idCounter = 1; // для генерации ID

// GET /account - получить всех пользователей
router.get('/', (req, res) => {
  res.status(200).json(users);
});

// POST /account/reg - регистрация нового пользователя
router.post('/reg', (req, res) => {
  const { name, email, login, password } = req.body;
  const newUser = {
    id: idCounter.toString(), // простое строковое id
    name,
    email,
    login,
    password,
  };
  users.push(newUser);
  idCounter++;
  res.status(200).json({ success: true, msg: 'created' });
});

// PUT /account/:id - обновить пользователя по id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ success: false, msg: 'User not found' });
  }

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.status(200).json({ success: true, msg: ' updated' });
});

// DELETE /account/:id - удалить пользователя по id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, msg: 'User not found' });
  }

  users.splice(index, 1);
  res.status(200).json({ success: true, msg: ' deleted' });
});

module.exports = router;
