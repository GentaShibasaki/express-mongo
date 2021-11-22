const postDocuments = async (req, res) => {
  return res
    .status(200)
    .json({ message: "This URL path is for uploading documents" });
};

module.exports = postDocuments;
