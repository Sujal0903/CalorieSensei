import {Item} from "../models/item.model.js"

export const getAllitems = async(req,res)=>{
    const result = await Item.find().sort({createAt: -1});
    res.status(200).json(result);
}

export const getSearchitems = async(req,res)=>{
    const {q} = req.query;
    try {
        let items;
        if(q){
            items =  await Item.find({name:{$regex: q, $options: 'i'}})
        }
        res.status(200).json(items);
    } catch (error) {
        res.status(404).json({message:"No items found",error});
    }
}

export const getSingleitem = async(req,res)=>{
    const {id} = req.params;
    try {
        const item = await Item.findById(id);
        res.json(item);
    } catch (error) {
        res.status(404).json({message:"No items found",error});
    }
}
