import { ObjectId } from "mongodb";
import JurnalGuru from "../models/jurnal_teacher.js";

export default class JurnalGuruController {
  static async findAll(req, res, next) {
    try {
      let jurnalGuru;
      console.log(req.user, "<<");
      if (req.user.role.toLowerCase() === "admin") {
        // Filter Feature
        if (req.query.teacher) {
          console.log(req.query.teacher);
          jurnalGuru = await JurnalGuru.findAllByGuru(req.query.teacher);
          console.log(jurnalGuru);
        } else if (req.query.kelas) {
          jurnalGuru = await JurnalGuru.findAllByObj({
            kelas: req.query.kelas,
          });
        } else if (req.query.hari) {
          jurnalGuru = await JurnalGuru.findAllByObj({
            hari: req.query.hari,
          });
        } else {
          jurnalGuru = await JurnalGuru.findAll();
        }
      } else if (req.user.role.toLowerCase() === "teacher") {
        jurnalGuru = await JurnalGuru.findAllByGuruId(req.user.id);
      }
      jurnalGuru.map((jurnal) => {
        jurnal.createAt = new Date(jurnal.createAt).toDateString();
        jurnal.updateAt = new Date(jurnal.updateAt).toDateString();
      });
      // Main Feature
      return res.status(200).json(jurnalGuru)
       
    } catch (err) {
      next(err);
    }
  }

  static async findAllByRangeDate(req, res, next) {
    try {
      console.log(
        req.query,
        "<<<<<<<<<<<<<<<RANGNGNGNGN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
      );
      const month = req.query?.month
        ? req.query?.month
        : new Date().getMonth() > 9
        ? new Date().getMonth() + 1
        : `0${new Date().getMonth() + 1}`;
      const year = req.query?.year ? req.query?.year : new Date().getFullYear();

      const from = req.query.from ? req.query.from : null;
      const to = req.query.to ? req.query.to : null;

      console.log(
        req.query.year ? req.query.month : new Date().getFullYear(),
        to,
        "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
      );
      console.log(
        req.query.month,
        req.query.year,
        "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
      );
      console.log(
        month,
        year,
        "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
      );

      const startDate = from ? new Date(from) : new Date(`${year}-${month}`);
      const endDate = to ? new Date(to) : new Date(`${year}`, `${month}`, 1);

      console.log(startDate);
      console.log(endDate);

      let teacher =
        req.user.role.toLowerCase() === "admin"
          ? new ObjectId(req.params.id)
          : req.user.id;
      if(!req.params.id){
        teacher = null;
      }
      if(req.user.role.toLowerCase() === "teacher"){
        teacher = req.user.id;
      }
      
      console.log(teacher ? teacher : "", "<<<<<<<<<<<<<<<<GURUURUR");
      console.log(req.params.id, "<<");
      const jurnalGuru = await JurnalGuru.findAllByGuruDateRange(
        teacher ? teacher : "",
        startDate,
        endDate
      );
      console.log(jurnalGuru, "<<AAAAAAAAAAAAAA");

      let totalJP = 0;
      let dataJP = {};
      jurnalGuru.forEach((jurnal) => {
        console.log(
          "" + jurnal?.teacher?._id, "===", "" + teacher,
          "<<<<<<<<<<<<<<<"
        );
        console.log(
          "" + jurnal?.teacherReplacement?._id, "===", "" + teacher,
          "<<<<<<<AAAAAAAAAAAA<<<<<<<<"
        );
        let condition;
        condition = `${jurnal?.teacherReplacement?._id}` === `${teacher}`;
        condition = condition || `${jurnal?.teacher?._id}` === `${teacher}`;
        condition = condition && !!jurnal.jumlahJP;
        console.log(condition, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        if (condition) {
          console.log(jurnal.jumlahJP, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
          totalJP += parseInt(jurnal.jumlahJP);
          const monthKey = jurnal.updateAt.getMonth();
          console.log(monthKey, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
          const jumlahJP = jurnal.jumlahJP ? parseInt(jurnal.jumlahJP) : 0;
          if (dataJP[monthKey]) {
            dataJP[monthKey]["jumlahJP"] += jumlahJP;
            dataJP[monthKey]["gaji"] += jumlahJP * 8000;
          } else {
            dataJP[monthKey] = {};
            dataJP[monthKey]["jumlahJP"] = jumlahJP;
            dataJP[monthKey]["gaji"] = jumlahJP * 8000;
          }
        }
      });
      jurnalGuru.map((jurnal) => {
        jurnal.createAt = new Date(jurnal.createAt).toDateString();
        jurnal.updateAt = new Date(jurnal.updateAt).toDateString();
      });
      const gaji = totalJP * 8000;

      console.log("DEBUG", dataJP);
      return jurnalGuru.length > 0
        ? res.status(200).json({
            totalJP,
            gaji,
            dataJP,
            data: jurnalGuru,
          })
        : res.status(404).json({ message: "Data not found" });
    } catch (error) {
      next(error);
    }
  }

  static async findNow(req, res, next) {
    try {
      const startDate = req.user.startDate;
      const endDate = req.user.endDate;
      const teacher = req.user.nama;
      const jurnalGuru = await JurnalGuru.findAllByGuruDateRange(
        teacher,
        startDate,
        endDate
      );
      jurnalGuru.map((jurnal) => {
        jurnal.createAt = new Date(jurnal.createAt).toDateString();
        jurnal.updateAt = new Date(jurnal.updateAt).toDateString();
      });
      console.log(jurnalGuru, "JURNOAL OW");
      return res.status(200).json(jurnalGuru);
    } catch (err) {
      next(err);
    }
  }
  static async findAllByGuruId(req, res, next) {
    try {
      console.log(req.params.id, "<<<<<<<<<<<<<<<<<<<<<<<<<<,");
      const jurnalGuru = await JurnalGuru.findAllByGuruId(req.params.id);
      jurnalGuru?.map((jurnal) => {
        jurnal.createAt = new Date(jurnal.createAt).toDateString();
        jurnal.updateAt = new Date(jurnal.updateAt).toDateString();
      });
      return jurnalGuru.length > 0
        ? res.status(200).json(jurnalGuru)
        : res.status(404).json({ message: "Data not found" });
    } catch (err) {
      next(err);
    }
  }

  static async findAllByGuru(req, res, next) {
    try {
      const jurnalGuru = await JurnalGuru.findAllByGuru(req.params.teacher);
      jurnalGuru.map((jurnal) => {
        jurnal.createAt = new Date(jurnal.createAt).toDateString();
        jurnal.updateAt = new Date(jurnal.updateAt).toDateString();
      });
      return jurnalGuru.length > 0
        ? res.status(200).json(jurnalGuru)
        : res.status(404).json({ message: "Data not found" });
    } catch (err) {
      next(err);
    }
  }

  static async findOne(req, res, next) {
    try {
      const jurnalGuru = await JurnalGuru.findById(req.params.id);
      jurnalGuru.createAt = new Date(jurnalGuru.createAt).toDateString();
      jurnalGuru.updateAt = new Date(jurnalGuru.updateAt).toDateString();
      return jurnalGuru
        ? res.status(200).json(jurnalGuru)
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
      teacher._id = new ObjectId(teacher._id);
      if (teacherReplacement?._id) {
        teacherReplacement._id = new ObjectId(teacherReplacement._id);
      }
      console.log(req.body);
      const jurnalGuru = await JurnalGuru.create({
        hari,
        mapel,
        kelas,
        jamKe,
        createAt: new Date(),
        updateAt: new Date(),
        teacher,
        teacherReplacement,
        materi,
        jumlahJP,
      });

      res.status(201).json(jurnalGuru);
    } catch (err) {
      next(err);
    }
  }

  static async updateOne(req, res, next) {
    try {
      const filter = { _id: req.params.id };
      req.body.teacher._id = new ObjectId(req.body.teacher._id);
      if (req.body.teacherReplacement?._id) {
        req.body.teacherReplacement._id = new ObjectId(
          req.body.teacherReplacement._id
        );
      }
      const update = { $set: { ...req.body, updateAt: new Date() } };
      console.log(update);
      const jurnalGuru = await JurnalGuru.updateOne(filter, update);
      console.log(jurnalGuru);
      return jurnalGuru
        ? res.status(200).json(jurnalGuru)
        : res.status(404).json({ message: "Data not found" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const filter = { _id: req.params.id };
      const jurnalGuru = await JurnalGuru.deleteOne(filter);
      return jurnalGuru
        ? res.status(200).json(jurnalGuru)
        : res.status(404).json({ message: "Data not found" });
    } catch (err) {
      next(err);
    }
  }
}
