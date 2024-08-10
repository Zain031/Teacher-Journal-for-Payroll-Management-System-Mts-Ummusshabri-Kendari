import request from 'supertest';
import app from '../app.js';

describe('Routes', () => {
  it('should create a new JP', async () => {
    const newJP = { hari: 'Monday', mapel: 'Math', kelas: '1A', jamKe: 1, mataPelajaran: 'Math', guru: 'Mr. A', guruPengganti: 'Mr. B', materi: 'Algebra', jumlahJP: 2 };
    const response = await request(app)
      .post('/admin/jp')
      .send(newJP)
      .set('Authorization', 'Bearer admin_token');
    expect(response.status).toBe(201);
  });

  it('should update an existing JP', async () => {
    const response = await request(app)
      .put('/admin/jp/66994cf2cd262ac3ae8ae718')
      .send({ nama: 'Updated JP' })
      .set('Authorization', 'Bearer admin_token');
    expect(response.status).toBe(200);
  });

  it('should delete an existing JP', async () => {
    const response = await request(app)
      .delete('/admin/jp/66994cf2cd262ac3ae8ae718')
      .set('Authorization', 'Bearer admin_token');
    expect(response.status).toBe(200);
  });

  it('should get all JPs for admin', async () => {
    const response = await request(app)
      .get('/admin/jp')
      .set('Authorization', 'Bearer admin_token');
    expect(response.status).toBe(200);
  });

  it('should get all JPs for guru', async () => {
    const response = await request(app)
      .get('/guru/jp')
      .set('Authorization', 'Bearer guru_token');
    expect(response.status).toBe(200);
  });

  it('should get a single JP', async () => {
    const response = await request(app)
      .get('/admin/jp/66994cf2cd262ac3ae8ae718')
      .set('Authorization', 'Bearer admin_token');
    expect(response.status).toBe(200);
  });

  it('should return 404 for non-existent JP', async () => {
    const response = await request(app)
      .get('/admin/jp/66994cf2cd262ac3ae8ae798')
      .set('Authorization', 'Bearer admin_token');
    expect(response.status).toBe(404);
  });
});