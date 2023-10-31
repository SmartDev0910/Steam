const Config = () => {
  const SESSION_SECRET = "$2y$12$nNYIs5iStm9gAsdgDGv3l.OyZN3Reav7U.YfwYW/L/171cjIHgjbm";
  const DB_URL = "mongodb+srv://wolfdev0910:Window0910!@steamcluster.dmp5kzq.mongodb.net/CircuitRP?retryWrites=true&w=majority"; // change this on production
  const BACKEND_HOST = "localhost"; // change this on production
  const BACKEND_PORT = "8080"; // change this on production
  const STEAM_API_KEY = "E20177646FC26CD4E9AE98BDFD33FBD3";
  const FRONT_END_URL = "http://localhost:3000"; // change this on production
  const DISCORD_CLIENT_ID = "1164097171902185472";
  const DISCORD_CLIENT_SECRET = "vt8r1wSmdTZh5IuADKrOJUxCSVVQibwc";
  const BACKEND_HTTPS = false; // change this on production
  const BACKEND_ROOTURL = BACKEND_HTTPS ? "https" : "http" + "://" + BACKEND_HOST + ":" + BACKEND_PORT
  
  return {
    DB_URL,
    SESSION_SECRET,
    BACKEND_PORT,
    STEAM_API_KEY,
    FRONT_END_URL,
    DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET,
    BACKEND_ROOTURL,
  }
};

module.exports = Config();
