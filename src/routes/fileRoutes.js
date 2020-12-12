const express = require('express');
const multer = require('multer');
const readXlsxFile = require('read-excel-file/node');
const async = require('async');
const schema = require('../schema');
const Candidate = require('../models/Candidate');

const { bufferToStream } = require('../util');

const upload = multer({
  fileFilter: function (req, file, callback) {
    if (
      ['xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1
    ) {
      return callback(new Error('Wrong extension type'));
    }
    callback(null, true);
  }
});

const router = express.Router();

router.post('/upload', upload.any(), async (req, res) => {
  const inputFiles = req.files;
  const file = inputFiles[0].buffer;
  const { rows, errors } = await readXlsxFile(bufferToStream(file), { schema });

  async.eachSeries(
    rows,
    async (row) => {
      if (row.name && row.email) {
        const candidate = await Candidate.findOne({ email: row.email });

        if (!candidate) {
          const newCandidate = new Candidate(row);
          await newCandidate.save();
        }
      }
    },
    (err) => {
      if (err) {
        return res.status(500).json({ message: 'Something went wrong' });
      }
      return res.status(200).json({ message: 'File Successfully Uploaded.' });
    }
  );
});

module.exports = router;
