const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getDocuments = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db(process.env.MONGODB_NAME);
    const documents = database.collection(
      process.env.MONGODB_IMAGE_BUCKET_NAME + ".files"
    );

    let cursor;
    if (req.query.keyword) {
      cursor = documents
        .find({
          "metadata.originalFilename": {
            $regex: req.query.keyword, // Allow users to use regex
            $options: "s",
          },
        })
        .limit(3);
    } else {
      // If there is no keyword, find documenst without keyword
      cursor = documents.find({}).limit(3);
    }

    if ((await cursor.count()) === 0) {
      return res.status(500).send({
        message: "No documents found!",
      });
    }

    let fileInfo = [];
    await cursor.forEach((doc) => {
      fileInfo.push({
        originalFilename: doc.metadata.originalFilename,
        uploadDate: doc.metadata.uploadDate,
      });
    });

    return res.status(200).json({ files: fileInfo });
  } catch (error) {
    return res.status(500).json({
      message: `Error happened when trying upload image: ${error}`,
    });
  }
};

module.exports = getDocuments;
