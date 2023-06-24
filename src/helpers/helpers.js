const slug = require("slug");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_API_KEY,
  // secure:true,
});

class Helpers {
  upload(file, folder) {
    console.log(process.env.API_KEY);
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload(file, {
          folder: `/hackaton-sevima/${folder}`,
          use_filename: true,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((er) => {
          reject(er);
        });
    });
  }
  convertToSlug(text) {
    return slug(text);
  }
  response(res, code, message, data = null) {
    if (code === 200) message = "success";
    if (code === 500 && !message) message = "failed";
    return res.status(code).json({ message, data });
  }
  responseWithToken(res, code, message, token = null, data = null) {
    if (code === 200) message = "success";
    if (code === 500 && !message) message = "failed";
    return res.status(code).json({ message, token, data });
  }
  responseWithPagination(
    res,
    code,
    message,
    total = 0,
    total_page = 1,
    current_page = 0,
    data = null
  ) {
    if (code === 200) message = "success";
    if (code === 500 && !message) message = "failed";
    return res
      .status(code)
      .json({ message, total, total_page, current_page, data });
  }
}

module.exports = Helpers;
