import Cookies from "js-cookie";

export const tokenAuth = {
  setCookies(token, data) {
    Cookies.set("auth", token);
    Cookies.set("data", data);
  },

  setDeleted(token) {
    Cookies.set("isDeleted", token);
  },

  tokenAuthenticated() {
    const authToken = Cookies.get("auth");
    const dataToken = Cookies.get("data");
    console.log(dataToken)
    if (authToken) {
      return {
        authToken: true,
        dataToken: JSON.parse(dataToken)
      };
    }
    return {
      authToken: false,
      dataToken: ""
    };
  },

  checkIsDeleted (){
    return Cookies.get("isDeleted");
  },
  eraseCookies() {
    Cookies.remove("auth");
    Cookies.remove("data");
  }
};
