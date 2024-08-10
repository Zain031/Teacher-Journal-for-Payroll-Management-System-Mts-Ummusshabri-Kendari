import request from 'supertest';
import app from '../app.js';
import JP from '../models/jadwal_pelajaran.js';

jest.mock('../models/jadwal_pelajaran.js');

describe('JPController', () => {
  describe('findAll', () => {
    it('should return all JP for admin', async () => {
      JP.findAll.mockResolvedValue([{ _id: "669b037f81450a82e1bd2bd2", nama: 'JP1' }]);
      const response = await request(app)
        .get('/admin/jp')
        .set('Authorization', 'Bearer admin_token');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ _id: "669b037f81450a82e1bd2bd2", nama: 'JP1' }]);
    });

    it('should return all JP for guru', async () => {
      JP.findAllByObj.mockResolvedValue([{ _id: "669b037f81450a82e1bd2bd2", nama: 'JP1' }]);
      const response = await request(app)
        .get('/guru/jp')
        .set('Authorization', 'Bearer guru_token');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ _id: "669b037f81450a82e1bd2bd2", nama: 'JP1' }]);
    });

    it('should return 404 if no data found', async () => {
      JP.findAll.mockResolvedValue(null);
      const response = await request(app)
        .get('/admin/jp')
        .set('Authorization', 'Bearer admin_token');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Data not found' });
    });
  });

  describe('findOne', () => {
    it('should return a single JP', async () => {
      JP.findById.mockResolvedValue({ _id: "669b037f81450a82e1bd2bd2", nama: 'JP1' });
      const response = await request(app)
        .get('/admin/jp/669b037f81450a82e1bd2bd2')
        .set('Authorization', 'Bearer admin_token');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ _id: "669b037f81450a82e1bd2bd2", nama: 'JP1' });
    });

    it('should return 404 if JP not found', async () => {
      JP.findById.mockResolvedValue(null);
      const response = await request(app)
        .get('/admin/jp/669b037f81450a82e1bd2bd2')
        .set('Authorization', 'Bearer admin_token');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Data not found' });
    });
  });

  describe('create', () => {
    it('should create a new JP', async () => {
      const newJP = { _id: "669b037f81450a82e1bd2bd2", nama: 'JP1' };
      JP.create.mockResolvedValue(newJP);
      const response = await request(app)
        .post('/admin/jp')
        .send(newJP)
        .set('Authorization', 'Bearer admin_token');
      expect(response.status).toBe(201);
      expect(response.body).toEqual(newJP);
    });
  });

  describe('updateOne', () => {
    it('should update an existing JP', async () => {
      JP.updateOne.mockResolvedValue({ _id: "669b037f81450a82e1bd2bd2", nama: 'JP1' });
      const response = await request(app)
        .put('/admin/jp/669b037f81450a82e1bd2bd2')
        .send({ nama: 'Updated JP' })
        .set('Authorization', 'Bearer admin_token');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ _id: "669b037f81450a82e1bd2bd2", nama: 'JP1' });
    });

    it('should return 404 if JP not found', async () => {
      JP.updateOne.mockResolvedValue(null);
      const response = await request(app)
        .put('/admin/jp/669b037f81450a82e1bd2bd2')
        .send({ nama: 'Updated JP' })
        .set('Authorization', 'Bearer admin_token');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Data not found' });
    });
  });

  describe('deleteOne', () => {
    it('should delete an existing JP', async () => {
      JP.deleteOne.mockResolvedValue({ _id: "669b037f81450a82e1bd2bd2", nama: 'JP1' });
      const response = await request(app)
        .delete('/admin/jp/669b037f81450a82e1bd2bd2')
        .set('Authorization', 'Bearer admin_token');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ _id: "669b037f81450a82e1bd2bd2", nama: 'JP1' });
    });

    it('should return 404 if JP not found', async () => {
      JP.deleteOne.mockResolvedValue(null);
      const response = await request(app)
        .delete('/admin/jp/669b037f81450a82e1bd2bd2')
        .set('Authorization', 'Bearer admin_token');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Data not found' });
    });
  });
});