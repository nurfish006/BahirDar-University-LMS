const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const multer = require('multer');
const ASSresultee = require('../models/assresultee');
const Router = express.Router();


const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|ppt|pptx|mp4|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

Router.post('/uploadresultee',
  upload.single('file'),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const { path, mimetype } = req.file;
      const file = new ASSresultee({
        title,
        description,
        file_path: path,
        file_mimetype: mimetype
      });
      await file.save();
      res.send('file uploaded successfully.');
    } catch (error) {
      res.status(400).send('Error while uploading file. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);
Router.get('/assresultee', async (req, res) => {
  try {
    const files = await ASSresultee.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

Router.get('/downloadresultee/:id', async (req, res) => {
  try {
    const file = await ASSresultee.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});
//delete
Router.delete('/deleteFileca/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const file = await ASSresultee.findByIdAndDelete(id);
    if (!file) {
      return res.status(404).json('File not found');
    }
    try {
      fs.unlinkSync(file.file_path);
    } catch (error) {
      // handle error thrown by fs.unlinkSync function separately
      console.error(error);
    }
    res.json('File deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(400).json('Error while deleting file. Try again later');
  }
});


module.exports = Router;
