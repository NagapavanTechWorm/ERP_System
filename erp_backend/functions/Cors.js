const CORSMiddleware = (req, res, next) => {
    const allowedOrigins = "http://localhost:5173"; // Add your default allowed origins here
  
    const origin = req.headers.origin;
  
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    } else {
      // Disallow requests from unknown origins
      res.header('Access-Control-Allow-Origin', "*");//disable while testing browser and production enable for postman
      // return res.status(403).json({ error: 'Forbidden' }); //enable in production and testing browsers 
    }
  
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  };
  
  export default CORSMiddleware;
  