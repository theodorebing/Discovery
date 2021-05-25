const isConnected = (request, response, next) => { 
  if (!request.session.userid) {
    response
      .status(401)
      .json({"error":"please connect"});
    return;
  } else {
      next();
  }
    
}
  
module.exports = isConnected;