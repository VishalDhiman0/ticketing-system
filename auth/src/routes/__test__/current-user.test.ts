import request from 'supertest';
import { app } from '../../app';

it('returns current user details when logged in successfully', async () => {
    const cookie = await global.signin();
    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .expect(200);
    
    expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('returns null if user is not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .expect(200);
    
    expect(response.body.currentUser).toBeNull();
});
