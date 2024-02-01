import request from 'supertest';
import { app } from '../../app';

it('fails when email that does not exists is supplied', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: '12345678'
        })
        .expect(400);
});

it('fails when incorrect password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '12345678'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: '12345'
        })
        .expect(400);
});

it('send cookie back when logged in successfully', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '12345678'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: '12345678'
        })
        .expect(200);
    
    expect(response.get('Set-Cookie')).toBeDefined();
});

