import JP from "../models/jadwal_pelajaran.js";
import { ObjectId } from "mongodb";
class JPController {
  static async findAll(req, res, next) {
    try {
        console.log(req.query, "QUERYAAAAAAAAAAAAAAAAaaa<<");
      if (req.user.role.toLowerCase() === "admin") {
        if (req.query) {
          let query = {};
          if (req.query.teacher) {
            query["teacher.nama"] = { $regex: "" + req.query.teacher, $options: "i" };
          }
          if (req.query.kelas) {
            query["kelas.nama"] = {
              $regex: "" + req.query.kelas,
              $options: "i",
            };
          }
          if (req.query.hari) {
            query["hari"] = { $regex: "" + req.query.hari, $options: "i" };
          }
          const jp = await JP.findAllByObj(query);
          return jp
            ? res.status(200).json(jp)
            : res.status(404).json({ message: "Data not found" });
        }
        const jp = await JP.findAll();
        return jp.length > 0
          ? res.status(200).json(jp)
          : res.status(404).json({ message: "Data not found" });
      } else if (req.user.role.toLowerCase() === "teacher") {
        
        // Hapus ini Jika ingin sesuai dengan nama gurunya 
        req.user.nama=""

        const jp = await JP.findAllByGuruAndHari(req.user.nama, req.user.hari);
        console.log(jp, "jp");
        console.log(req.user.nama, req.user.hari);
        return jp
          ? res.status(200).json(jp)
          : res.status(404).json({ message: "Data not found" });
      }
    } catch (err) {
      next(err);
    }
  }

  static async findAllByTeacher(req, res, next) {
    try {
        console.log(req.query, "QUERYAAAAAAAAAAAAAAAAaaa<<");

        let query = {};
        if (req.query) {
          if (req.query.teacher) {
            query["teacher.nama"] = { $regex: "" + req.query.teacher, $options: "i" };
          }
          else{
            query["teacher.nama"] = { $regex: "" + req.user.nama, $options: "i" };
          }
          if (req.query.kelas) {
            query["kelas.nama"] = {
              $regex: "" + req.query.kelas,
              $options: "i",
            };
          }
          if (req.query.hari) {
            query["hari"] = { $regex: "" + req.query.hari, $options: "i" };
          }
          else{
            query["hari"] = { $regex: "" + req.user.hari, $options: "i" };
          }
        }
        else{
          query["teacher.nama"] = { $regex: "" + req.user.nama, $options: "i" };
          query["hari"] = { $regex: "" + req.user.hari, $options: "i" };
        }
        const jp = await JP.findAllByObj(query);
        return res.status(200).json(jp)
          
      
    } catch (err) {
      next(err);
    }
  }


  static async findOne(req, res, next) {
    try {
      const jp = await JP.findById(req.params.id);
      console.log(!jp);
      return jp
        ? res.status(200).json(jp)
        : res.status(404).json({ message: "Data not found" });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const {
        hari,
        mapel,
        kelas,
        jamKe,
        teacher,
        teacherReplacement,
        materi,
        jumlahJP,
      } = req.body;

      console.log(teacher._id);
      teacher._id = new ObjectId(teacher._id);
      if (teacherReplacement?._id) {
        teacherReplacement._id = new ObjectId(teacherReplacement._id);
      }
      console.log(teacher._id);
      const jp = await JP.create({
        hari,
        mapel,
        kelas,
        jamKe,

        teacher,
        teacherReplacement,
        materi,
        jumlahJP,
      });

      res.status(201).json(jp);
    } catch (err) {
      next(err);
    }
  }

  static async updateOne(req, res, next) {
    try {
      req.body.teacher._id = new ObjectId(req.body.teacher._id);
      if (req.body.teacherReplacement?._id) {
        req.body.teacherReplacement._id = new ObjectId(req.body.teacherReplacement._id);
      }
      const filter = { _id: req.params.id };
      const update = { $set: req.body };
      const jp = await JP.updateOne(filter, update);
      return jp
        ? res.status(200).json(jp)
        : res.status(404).json({ message: "Data not found" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const filter = { _id: req.params.id };
      const jp = await JP.deleteOne(filter);
      console.log(jp);
      return jp
        ? res.status(200).json(jp)
        : res.status(404).json({ message: "Data not found" });
    } catch (err) {
      next(err);
    }
  }
}

export default JPController;
