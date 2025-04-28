const request = require('supertest');
const app = require('../app'); 

describe('API Routes - /account', () => {
  it('GET /account  list of users', async () => {
    const response = await request(app).get('/account');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array); });

  it('POST /account/reg - create  user', async () => {
    const newUser = {
      name: "sldsdc",
      email: 'dcscdsc@dd.com',
      login: 'sdcscds',
      password: 'asaasasasas',
    };

    const response = await request(app).post('/account/reg').send(newUser);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.msg).toBe('created');
  });


  it('PUT /account/:id -  update user', async () => {
    const userId = 'Id'; 
    const updatedData = {
      name: ' update',
      email: '@.com',
    };

    const response = await request(app).put(`/account/${userId}`).send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.msg).toBe(' updated');
  });


  it('PUT /account/:id -  user not found', async () => {
    const userId = 'error'; 
    const updatedData = {
      name: ' User',
    };

    const response = await request(app).put(`/account/${userId}`).send(updatedData);
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toBe('User not found');
  });

  it('DELETE /account/:id - delete user', async () => {
    const userId = 'Id'; 
    const response = await request(app).delete(`/account/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.msg).toBe(' deleted');
  });

});
