const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const getDocuments = async (req, res) => {
  res.status(200).json({
    message:
      "This URL path is for getting up to three documetns with query string",
  });
};

module.exports = getDocuments;
