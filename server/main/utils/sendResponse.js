function sendData(res, status, data) {
    return res.status(status).send({
      success: true,
      data
    });
  }
  
module.exports = sendData;
  