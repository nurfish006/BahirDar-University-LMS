const path = require('path');
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const CEass = require('../models/ce_assignment');
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

Router.post('/uploadceass',
  upload.single('file'),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const { path, mimetype } = req.file;
      const file = new CEass({
        title,
        description,
        file_path: path,
        file_mimetype: mimetype
      });
      await file.save();
      res.send('file uploaded successfully.');
    } catch (error) {
      console.error(error);
      res.status(400).send('Error while uploading file. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
);

Router.get('/getAllceass', async (req, res) => {
  try {
    const files = await CEass.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

Router.get('/downloadceass/:id', async (req, res) => {
  try {
    const file = await CEass.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

//delete
Router.delete('/deleteFileceass/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const file = await CEass.findByIdAndDelete(id);
    if (!file) {
      return res.status(404).json('File not found');
    }
    try {
      fs.unlinkSync(file.file_path);
    } catch (error) {
      // handle error thrown by fs.unlinkSync function separately
      console.error(error);
    }
    res.json('Assignment deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(400).json('Error while deleting file. Try again later');
  }
});

module.exports = Router;
