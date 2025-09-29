import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// initial state
const intialState = {
  student: null,
  teacher:null,
  head:null,
  admin:null,
};

// create context
const Context = createContext();

// root reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, student: action.payload };
    case "LOGOUT":
      return { ...state, student: null };
      /////teacher
      case "LOGIN_TEACHER":
        return { ...state, teacher: action.payload };
      case "LOGOUT_TEACHER":
        return { ...state, teacher: null };
        //head
        case "LOGIN_HEAD":
          return { ...state, head: action.payload };
        case "LOGOUT_HEAD":
          return { ...state, head: null };
          //admin
          case "LOGIN_ADMIN":
            return { ...state, admin: action.payload };
          case "LOGOUT_ADMIN":
            return { ...state, admin: null };
    default:
      return state;
  }
};

// context provider
const Provider = ({ children }) => {

  const navigate = useNavigate();
  const [state, dispatch] = useReducer(rootReducer, intialState);


  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("student")),
    });

  },[]);
  useEffect(() => {
    dispatch({
      type: "LOGIN_TEACHER",
      payload: JSON.parse(window.localStorage.getItem("teacher")),
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: "LOGIN_HEAD",
      payload: JSON.parse(window.localStorage.getItem("head")),
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "LOGIN_ADMIN",
      payload: JSON.parse(window.localStorage.getItem("admin")),
    });
  }, []);

  axios.interceptors.response.use(
    function (response) {
      // any status code that lie within the range of 2XX cause this function
      // to trigger
      return response;
    },
    function (error) {
     
      // any status codes that falls outside the range of 2xx cause this function
      // to trigger
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get(`http://localhost:8000/api/studentlogout`)
            .then((data) => {
              console.log("/401 error > stlogout");
              dispatch({ type: "LOGOUT" });
              window.localStorage.removeItem("student");
              navigate("/studentlogin");
              })
            .catch((err) => {
              console.log("AXIOS INTERCEPTORS ERR", err);
              reject(error);
            });
        });
      }
      //teacher
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get(`http://localhost:8000/api/teacherslogout`)
            .then((data) => {
              console.log("/401 error > tchlogout");
              dispatch({ type: "TEACHER_LOGOUT" });
              window.localStorage.removeItem("teacher");
              navigate("/teacherslogin");
            })
            .catch((err) => {
              console.log("AXIOS INTERCEPTORS ERR", err);
              reject(error);
            });
        });
      }
      //head
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get(`http://localhost:8000/api/teacherslogout`)
            .then((data) => {
              console.log("/401 error > tchlogout");
              dispatch({ type: "HEAD_LOGOUT" });
              window.localStorage.removeItem("teacher");
              navigate("/headlogin");
            })
            .catch((err) => {
              console.log("AXIOS INTERCEPTORS ERR", err);
              reject(error);
            });
        });
      }
      //admin
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get(`http://localhost:8000/api/adminlogout`)
            .then((data) => {
              console.log("/401 error > tchlogout");
              dispatch({ type: "ADMIN_LOGOUT" });
              window.localStorage.removeItem("admin");
              navigate("/adminlogin");
            })
            .catch((err) => {
              console.log("AXIOS INTERCEPTORS ERR", err);
              reject(error);
            });
        });
      }
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(`http://localhost:8000/api/csrf-token`);
       console.log("CSRF", data);
      axios.defaults.headers["X-CSRF-Token"] = data.getCsrfToken;
    };
    getCsrfToken();
  }, []);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
