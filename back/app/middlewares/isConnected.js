const isConnected = (request, response, next) => { 
  if (!request.session.id) {
    response
      .status(401)
      .json({"error":"please connect"});
    return;
  } else {
      next();
  }
    
}
  
module.exports = isConnected;