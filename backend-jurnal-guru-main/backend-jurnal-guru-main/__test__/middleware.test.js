import { verifyToken } from '../helper/jwt.js';
import authentication from '../middleware/authentication.js';
import Authorization from '../middleware/authorization.js';

jest.mock('../helper/jwt.js');

describe('Middleware', () => {
  describe('Authentication', () => {
    it('should authenticate a user', async () => {
      verifyToken.mockReturnValue({ id: 1 });
      const req = { headers: { authorization: 'Bearer valid_token' } };
      const res = {};
      const next = jest.fn();

      await authentication(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should not authenticate a user with invalid token', async () => {
      verifyToken.mockReturnValue(null);
      const req = { headers: { authorization: 'Bearer invalid_token' } };
      const res = {};
      const next = jest.fn();

      await authentication(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.objectContaining({ nama: 'JsonWebTokenError' }));
    });
  });

  describe('Authorization', () => {
    it('should authorize an admin', async () => {
      const req = { user: { role: 'admin' } };
      const res = {};
      const next = jest.fn();

      await Authorization.admin(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should not authorize a non-admin', async () => {
      const req = { user: { role: 'user' } };
      const res = {};
      const next = jest.fn();

      await Authorization.admin(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.objectContaining({ nama: 'User is not admin' }));
    });

    it('should authorize a guru', async () => {
      const req = { user: { role: 'guru' } };
      const res = {};
      const next = jest.fn();

      await Authorization.guru(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should not authorize a non-guru', async () => {
      const req = { user: { role: 'user' } };
      const res = {};
      const next = jest.fn();

      await Authorization.guru(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.objectContaining({ nama: 'User is not guru' }));
    });
  });
});