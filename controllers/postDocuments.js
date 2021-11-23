const storeDocuements = require("../middleware/storeDocuements");

const postDocuments = async (req, res) => {
  try {
    // Store documents in mongodb's gridfs
    await storeDocuements(req, res);

    if (!req.files) {
      // multiple files or single file are not attached with request,
      // then send the following error message with bad request code 400
      return res.status(400).json({
        message:
          "You must create documents field in body and put least one pdf file in this field.",
      });
    }

    if (req.files.length === 0) {
      // multiple files or single file are not attached with request,
      // then send the following error message with bad request code 400
      return res.status(400).json({
        message: "You must select at least one pdf file in documents field.",
      });
    }
    if (req.fileValidationError)
      return res.status(400).json({
        message: req.fileValidationError,
      });

    return res
      .status(200)
      .json(
        req.files.length === 1
          ? { message: "Document have been uploaded." }
          : { message: "Documents has been uploaded." }
      );
  } catch (error) {
    // If users choose a file more than 20MB, send an error message
    if (error.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({
        message: "You must select a pdf file less than 20MB",
      });
    }

    //If users set documents in unexpected field, send an error message
    if (error.code === "LIMIT_UNEXPECTED_FILE" && error.field === "documents") {
      res.status(400).json({
        message: "You must select less than or equal to 5 files.",
      });
    }

    //If users set documents in unexpected field, send an error message
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      res.status(400).json({
        message: "Field name for uploading documents must be 'documents'",
      });
    }

    //Following is for displaying error message on server side when unexpected error occurred
    // console.log("Following error happened :", error);
    return res.status(500).json({
      message: `Error happened when trying upload image: ${error}`,
    });
  }
};

module.exports = postDocuments;
