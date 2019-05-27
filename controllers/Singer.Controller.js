import { Singer } from "../models/Singer.Model";

const singerController = {
    getAllSinger: async () => {
        return await Singer.find({});
    },

    addNewSinger: async (name, image) => {
        const newSinger = new Singer({ name, image })
        return await newSinger.save();
    },

    //Get info to update
    editInfoSinger: async (id) => {
        return await Singer.findById(id);
    },

    //Post update
    updateInfoSinger: async (id, updateObj) => {
        return await Singer.findByIdAndUpdate(id, updateObj);
    },

    deleteSinger: async (id) => {
        return await Singer.findByIdAndRemove(id);
    }
}

export default singerController;