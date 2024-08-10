import { db } from "./config/index.js";
import { ObjectId } from "mongodb";
import JP from "./jadwal_pelajaran.js";
import JurnalGuru from "./jurnal_teacher.js";
export default class Kelas {
  static col() {
    return db.collection("kelas");
  }

  static async findAll() {
    return await this.col().find({}).sort({nama:1}).collation({ locale: "en", caseLevel: true }).toArray();
  }

  static async findByObj(obj) {
    return await this.col().find(obj).toArray();
  }

  static async findOne(obj) {
    return await this.col().findOne(obj);
  }

  static async findById(id) {
    return await this.col().findOne({ _id: new ObjectId(id) });
  }

  static async create(obj) {
    return await this.col().insertOne(obj);
  }

  static async updateOne(filter, update) {
    if (typeof filter._id === "string") {
      filter._id = new ObjectId(filter._id);
    }

    const jp = await JP.findAllByObj({ "kelas._id": filter._id });
    if (jp.length > 0) {
      await JP.updateMany(
        {
          $or: [{ "kelas._id": filter._id }, { "kelas._id": "" + filter._id }],
        },
        { $set: { "kelas.nama": update["$set"].nama } }
      );
    }
    const jurnal = await JurnalGuru.findAllByObj({ "kelas._id": filter._id });
    if (jurnal.length > 0) {
      await JurnalGuru.updateMany(
        {
          $or: [{ "kelas._id": filter._id }, { "kelas._id": "" + filter._id }],
        },
        { $set: { "kelas.nama": update["$set"].nama } }
      );
    }

    return await this.col().updateOne(filter, update);
  }

  static async deleteOne(filter) {
    if (filter._id) {
      filter._id = new ObjectId(filter._id);
    }

    const jp = await JP.findAllByObj({ "kelas._id": filter._id });
    if (jp.length > 0) {
      await JP.updateMany(
        {
          $or: [{ "kelas._id": filter._id }, { "kelas._id": "" + filter._id }],
        },
        { $set: { kelas: null } }
      );
    }
    const jurnal = await JurnalGuru.findAllByObj({ "kelas._id": filter._id });
    if (jurnal.length > 0) {
      await JurnalGuru.updateMany(
        {
          $or: [{ "kelas._id": filter._id }, { "kelas._id": "" + filter._id }],
        },
        { $set: { kelas: null } }
      );
    }

    return await this.col().deleteOne(filter);
  }
}
