const handleErrorResponse = (err, res, message) => {
  res.send({
    success: false,
    message,
    err,
  });
};

const handleSuccessResponse = (value, res, message) => {
  res.send({
    success: true,
    message,
    value,
  });
};

module.exports = {
  handleErrorResponse,
  handleSuccessResponse
};
