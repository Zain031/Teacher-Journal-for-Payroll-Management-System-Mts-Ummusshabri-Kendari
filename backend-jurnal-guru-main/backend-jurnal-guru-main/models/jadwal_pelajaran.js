import { db } from "./config/index.js";
import { ObjectId } from "mongodb";
export default class JP {
  static col() {
    return db.collection("jp");
  }

  static async findAll(){
    return await this.col().find({}).toArray();
  }


  static async findAllByObj(obj){
    return await this.col().find(obj).toArray();
  }

  static async findAllByGuru(teacher){
    return await this.col().find({ "teacher.nama": { $regex: ""+teacher, $options: "i" } }).toArray();
  }

  static async findAllByGuruAndHari(teacher, hari){
    return await this.col().find({ "teacher.nama": { $regex: ""+teacher, $options: "i" }, "hari": { $regex: ""+hari, $options: "i" } }).toArray();
  }

  static async findOne(obj){
    return await this.col().findOne(obj);
  }

  static async findById(id){
    return await this.col().findOne({ _id:new ObjectId(id) });
  }

  static async findByObjId(obj){
    if (obj._id){
      obj._id =new ObjectId(obj._id);
    }
    return await this.col().findOne(obj);
  }
  
  static async create(obj){
    Object.keys(obj).forEach((key) => {
      if(obj[key] && typeof obj[key]!=='string' && Object.keys(obj[key]).length > 0){
        obj[key]._id = new ObjectId(obj[key]._id);
      }
    }
    );
    return await this.col().insertOne(obj);
  }

  static async updateOne(filter, update){
    if (filter._id){
      filter._id = new ObjectId(filter._id);
    }
    Object.keys(update["$set"]).forEach((key) => {
      if(update["$set"][key] && typeof update["$set"][key]!=='string' && Object.keys(update["$set"][key]).length > 0){
        update["$set"][key]._id = new ObjectId(update["$set"][key]._id);
      }
    }
    );

    return await this.col().updateOne(filter, update);
  }

  static async updateMany(filter, update){
    if (filter._id){
      filter._id = new ObjectId(filter._id);
    }
    return await this.col().updateMany(filter, update);
  }


  static async deleteOne(filter){
    if (filter._id){
      filter._id = new ObjectId(filter._id);
    }
    return await this.col().deleteOne(filter);
  }
  
}

