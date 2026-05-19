const fs = require("fs");
const Client = require("../models/Client");
const cloudinary = require("../config/cloudinary");
const deleteCloudinaryImage = require("../utils/deleteCloudinaryImage");

const uploadImage = async (file) => {
  if (!file) return null;

  const result = await cloudinary.uploader.upload(file.path, {
    folder: "nurnobibamboocraft/clients",
  });

  fs.unlinkSync(file.path);

  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};

const getClients = async (req, res, next) => {
  try {
    const clients = await Client.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });

    res.json({
      success: true,
      clients,
    });
  } catch (error) {
    next(error);
  }
};

const getAllClientsAdmin = async (req, res, next) => {
  try {
    const clients = await Client.find().sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      clients,
    });
  } catch (error) {
    next(error);
  }
};

const createClient = async (req, res, next) => {
  try {
    const { name, country, website, order, isActive } = req.body;

    const logo = await uploadImage(req.file);

    const client = await Client.create({
      name,
      country,
      website,
      order,
      isActive,
      logo,
    });

    res.status(201).json({
      success: true,
      message: "Client created successfully",
      client,
    });
  } catch (error) {
    next(error);
  }
};

const updateClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      res.status(404);
      throw new Error("Client not found");
    }

    const fields = ["name", "country", "website", "order", "isActive"];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) client[field] = req.body[field];
    });

    if (req.file) {
      await deleteCloudinaryImage(client.logo?.public_id);
      client.logo = await uploadImage(req.file);
    }

    const updatedClient = await client.save();

    res.json({
      success: true,
      message: "Client updated successfully",
      client: updatedClient,
    });
  } catch (error) {
    next(error);
  }
};

const deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      res.status(404);
      throw new Error("Client not found");
    }

    await deleteCloudinaryImage(client.logo?.public_id);
    await client.deleteOne();

    res.json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getClients,
  getAllClientsAdmin,
  createClient,
  updateClient,
  deleteClient,
};
