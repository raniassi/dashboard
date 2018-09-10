import Cookies from "js-cookie";

export const tokenAuth = {
  setCookies(token, data) {
    Cookies.set("auth", token);
    Cookies.set("data", data);
  },

  setVoted(token) {
    Cookies.set("isVoted", token);
  },

  tokenAuthenticated() {
    const authToken = Cookies.get("auth");
    const dataToken = Cookies.get("data");
    if (authToken) {
      return {
        authToken: true,
        authData: authToken,
        dataToken: JSON.parse(dataToken)
      };
    }
    return {
      authToken: false,
      dataToken: ""
    };
  },

  checkIsVoted() {
    return Cookies.get("isVoted");
  },
  eraseCookies() {
    Cookies.remove("auth");
    Cookies.remove("data");
  }
};
