import axios from "axios";
import Constants from "expo-constants";

class Auth {
  getAuhorization() {
    return axios.get(
      Constants.manifest.extra.sysEnv === "PRODUCTION"
        ? `${Constants.manifest.extra.apiProdBaseURL}userJsonWebToken?user=anonymous&password=12345678`
        : `${Constants.manifest.extra.apiDevBaseURL}userJsonWebToken?user=anonymous&password=12345678`
    );
  }
}

export default new Auth();
