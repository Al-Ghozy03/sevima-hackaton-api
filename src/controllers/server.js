class Server {
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

module.exports = Server;
