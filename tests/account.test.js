const request = require('supertest');
const app = require('../app'); // Путь к вашему файлу с сервером

describe('API Routes - /account', () => {
  // Тест для получения всех пользователей
  it('GET /account - should return a list of users', async () => {
    const response = await request(app).get('/account');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array); // Предположим, что ответом будет массив пользователей
  });

  // Тест для регистрации нового пользователя
  it('POST /account/reg - should create a new user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      login: 'johndoe',
      password: 'password123',
    };

    const response = await request(app).post('/account/reg').send(newUser);
    expect(response.status).toBe(201); // Статус код 201 для успешного создания
    expect(response.body.success).toBe(true);
    expect(response.body.msg).toBe('User created');
  });

  // Тест для неудачной регистрации (например, отсутствие обязательных полей)
  it('POST /account/reg - should return error if user is missing required fields', async () => {
    const incompleteUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      // отсутствует login и password
    };

    const response = await request(app).post('/account/reg').send(incompleteUser);
    expect(response.status).toBe(400); // Ошибка при несоответствии данных
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toBe('Failed to add user');
  });

  // Тест для обновления пользователя
  it('PUT /account/:id - should update the user', async () => {
    const userId = 'someValidUserId'; // Замените на реальный ID пользователя для теста
    const updatedData = {
      name: 'John Updated',
      email: 'john.updated@example.com',
    };

    const response = await request(app).put(`/account/${userId}`).send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.msg).toBe('User updated');
  });

  // Тест для неудачного обновления (пользователь не найден)
  it('PUT /account/:id - should return error if user not found', async () => {
    const userId = 'invalidUserId'; // Неверный ID
    const updatedData = {
      name: 'Nonexistent User',
    };

    const response = await request(app).put(`/account/${userId}`).send(updatedData);
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toBe('User not found');
  });

  // Тест для удаления пользователя
  it('DELETE /account/:id - should delete the user', async () => {
    const userId = 'someValidUserId'; // Замените на реальный ID для теста

    const response = await request(app).delete(`/account/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.msg).toBe('User deleted');
  });

  // Тест для неудачного удаления (пользователь не найден)
  it('DELETE /account/:id - should return error if user not found', async () => {
    const userId = 'invalidUserId'; // Неверный ID

    const response = await request(app).delete(`/account/${userId}`);
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toBe('User not found');
  });
});
