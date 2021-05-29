const isConnected = (request, response, next) => { 
  // console.log("request.session.userid isconnected", request.session.id)
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