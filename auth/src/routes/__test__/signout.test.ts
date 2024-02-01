import request from 'supertest';
import { app } from '../../app';

it('successfully remove the cookie when signout', async () => {
    let response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '12345678'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
    expect(response.get('Set-Cookie')[0]).not.toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');

    response = await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(200);
    expect(response.get('Set-Cookie')[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
});
