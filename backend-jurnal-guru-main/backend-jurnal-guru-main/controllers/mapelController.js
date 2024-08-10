import Mapel from "../models/mapel.js";

export default class MapelController {
    static async findAll(req, res, next) {
        try {
            let query = {};
            if(req.query){
                if(req.query.nama){
                    query["nama"] = {
                        $regex: req.query.nama, $options: "i"
                    }
                }
            }
            console.log(query);
            const mapel = query ? await Mapel.findByObj(query) : await Mapel.findAll();
        return mapel.length > 0
            ? res.status(200).json(mapel)
            : res.status(404).json({ message: "Data not found" });
        } catch (err) {
        next(err);
        }
    }
    
    static async findOne(req, res, next) {
        try {
        const mapel = await Mapel.findById(req.params.id);
        return mapel
            ? res.status(200).json(mapel)
            : res.status(404).json({ message: "Data not found" });
        } catch (err) {
        next(err);
        }
    }
    
    static async create(req, res, next) {
        try {
        const mapel = await Mapel.create(req.body);
        return mapel
            ? res.status(201).json(mapel)
            : res.status(400).json({ message: "Bad Request" });
        } catch (err) {
        next(err);
        }
    }
    
    static async updateOne(req, res, next) {
        try {
        const filter = { _id: req.params.id };
        const update = { $set: req.body };
        const mapel = await Mapel.updateOne(filter, update);
        return mapel
            ? res.status(200).json(mapel)
            : res.status(404).json({ message: "Data not found" });
        } catch (err) {
        next(err);
        }
    }
    
    static async deleteOne(req, res, next) {
        try {
        const filter = { _id: req.params.id };
        const mapel = await Mapel.deleteOne(filter);
        return mapel
            ? res.status(200).json(mapel)
            : res.status(404).json({ message: "Data not found" });
        } catch (err) {
        next(err);
        }
    }
    }