// Middleware
import authentication from '../middleware/authentication.js';
import Authorization from '../middleware/authorization.js';

// Controller
import AuthController from '../controllers/authController.js';
import UserController from '../controllers/userController.js';
import JPController from '../controllers/jpController.js';
import KelasController from '../controllers/kelasController.js';
import { filterByDay } from '../middleware/filterByDay.js';

import express from 'express';
import JurnalGuruController from '../controllers/jurnalGuruController.js';
import errHandler from '../middleware/errorHandling.js';
import filterByRange from '../middleware/filterByRange.js';
import MapelController from '../controllers/mapelController.js';

const router = express.Router();

router.post('/pub/register', AuthController.register);
router.get('/get-role', authentication,(req,res)=>{
    res.status(200).json({role: req.user.role});
})

// Auth
router.post('/login', AuthController.login);
router.post('/register',AuthController.register);

// Admin
// Profile
router.get('/admin/profile', authentication, Authorization.admin, UserController.findSelf);

// Get Guru
router.get('/users/role/:role', authentication, UserController.findAllByRole);
// Users
router.get('/admin/users', authentication, Authorization.admin, UserController.findAll);
router.get('/admin/users/:id', authentication, Authorization.admin, UserController.findOne);
router.post('/admin/users', authentication, Authorization.admin, UserController.create);
router.put('/admin/users/:id', authentication, Authorization.admin, UserController.updateOne);
router.delete('/admin/users/:id', authentication, Authorization.admin, UserController.deleteOne);

// JP
router.get('/admin/jp',filterByDay, authentication, Authorization.admin, JPController.findAll);
router.get('/admin/jp/:id', authentication, Authorization.admin, JPController.findOne);
router.post('/admin/jp', authentication, Authorization.admin, JPController.create);
router.put('/admin/jp/:id', authentication, Authorization.admin, JPController.updateOne);
router.delete('/admin/jp/:id', authentication, Authorization.admin, JPController.deleteOne);


// Kelas
router.get('/kelas',authentication, KelasController.findAll);
router.get('/admin/kelas',authentication, KelasController.findAll);
router.get('/kelas/:id',authentication, KelasController.findOne);
router.post('/admin/kelas', authentication, Authorization.admin, KelasController.create);
router.put('/admin/kelas/:id', authentication, Authorization.admin, KelasController.updateOne);
router.delete('/admin/kelas/:id', authentication, Authorization.admin, KelasController.deleteOne);

// Mapel
router.get('/mapel', authentication, MapelController.findAll);
router.get('/admin/mapel', authentication, MapelController.findAll);
router.get('/mapel/:id', authentication, MapelController.findOne);
router.post('/admin/mapel', authentication, Authorization.admin, MapelController.create);
router.put('/admin/mapel/:id', authentication, Authorization.admin, MapelController.updateOne);
router.delete('/admin/mapel/:id', authentication, Authorization.admin, MapelController.deleteOne);

// Jurnal Guru
router.get('/admin/jurnal-teacher', authentication, Authorization.admin, JurnalGuruController.findAll);
router.get('/admin/jurnal-teacher/:id', authentication, Authorization.admin, JurnalGuruController.findOne);
router.post('/admin/jurnal-teacher', authentication, Authorization.admin, JurnalGuruController.create);
router.put('/admin/jurnal-teacher/:id', authentication, Authorization.admin, JurnalGuruController.updateOne);
router.delete('/admin/jurnal-teacher/:id', authentication, Authorization.admin, JurnalGuruController.deleteOne);

router.get('/admin/filter/jurnal-teacher/date/:id',authentication, Authorization.admin, JurnalGuruController.findAllByRangeDate);
router.get('/admin/filter/jurnal-teacher/date',authentication, Authorization.admin, JurnalGuruController.findAllByRangeDate);
router.get('/admin/filter/jurnal-teacher/teacher/:id',authentication, Authorization.admin, JurnalGuruController.findAllByGuruId);

// teacher
// Profile
router.get('/teacher/profile', authentication, Authorization.teacher, UserController.findSelf);
// router.get('/teacher/filter/jurnal-teacher/teacher/:id',authentication, Authorization.teacher, JurnalGuruController.findAllByGuruId);
router.get('/teacher/filter/jurnal-teacher/date/:id',authentication, Authorization.teacher, JurnalGuruController.findAllByRangeDate);
router.get('/teacher/filter/jurnal-teacher/date',authentication, Authorization.teacher, JurnalGuruController.findAllByRangeDate);
// JP
router.get('/teacher/jp', filterByDay,authentication, Authorization.teacher, JPController.findAll);
router.get('/teacher/jp/:id', filterByDay,authentication, Authorization.teacher, JPController.findOne);
router.get('/teacher/myjp',filterByDay,authentication, Authorization.teacher, JPController.findAllByTeacher)

// Jurnal Guru
router.get('/teacher/jurnal-teacher/now',filterByRange,authentication, Authorization.teacher, JurnalGuruController.findNow);
router.get('/teacher/jurnal-teacher',authentication, Authorization.teacher, JurnalGuruController.findAll);
router.get('/teacher/jurnal-teacher/:id',authentication, Authorization.teacher, JurnalGuruController.findOne);
router.post('/teacher/jurnal-teacher',authentication, Authorization.teacher, JurnalGuruController.create);
router.put('/teacher/jurnal-teacher/:id',authentication, Authorization.teacher, JurnalGuruController.updateOne);
router.delete('/teacher/jurnal-teacher/:id',authentication, Authorization.teacher, JurnalGuruController.deleteOne);

// Error Handler

router.use(errHandler);

export default router;
