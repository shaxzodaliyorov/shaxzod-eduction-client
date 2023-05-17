import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Error from "../Components/Error";
import Loading from "../Components/Loading";
import {
  ErrorRegsiter,
  successRegister,
} from "../redux/Reducers/Auth/AuthRegister";
import AUTH from "../services/Auth/Auth";
import { AiOutlineGoogle } from "react-icons/ai";
const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { error, Errortext } = useSelector((state) => state.AuthRegister);

  const [isLoading, setIsloading] = useState(false);

  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsernme] = useState("");
  const [password, setPassword] = useState("");

  const [NameValid, setNameValid] = useState({
    ms: "",
    active: false,
    sendval: false,
  });
  const [emailValid, setEmailValid] = useState({
    ms: "",
    active: false,
    sendval: false,
  });
  const [usernameValid, setusernameValid] = useState({
    ms: "",
    active: false,
    sendval: false,
  });
  const [passwordValid, setPasswordValid] = useState({
    ms: "",
    active: false,
    sendval: false,
  });

  React.useEffect(() => {
    document.title = "Shaxzod | Ro'yxatdan o'tish";
  }, []);

  const HandelerChange = (e) => {
    const { name, value } = e.target;
    // name
    if (name === "Name") {
      if (value === "") {
        setNameValid({
          ms: "Ismingizni Kiriting !",
          active: true,
          sendval: false,
        });
      } else if (value.match(/\d/)) {
        setNameValid({ ms: "Son Yozmang !", active: true, sendval: false });
      } else {
        setNameValid({ ms: "", active: false, sendval: true });
      }
      setName(value);
    }
    //   email
    if (name === "email") {
      if (value === "") {
        setEmailValid({
          ms: "Emailingizni Kiriting !",
          active: true,
          sendval: false,
        });
      } else {
        setEmailValid({ ms: "", active: false, sendval: true });
      }
      setEmail(value);
    }
    // lastname
    if (name === "lastname") {
      if (value === "") {
        setusernameValid({
          ms: "Familyaingizni Kiriting !",
          active: true,
          sendval: false,
        });
      } else {
        setusernameValid({ ms: "", active: false, sendval: true });
      }
      setUsernme(value);
    }
    // password
    if (name === "Password") {
      if (value === "") {
        setPassword({
          ms: "Parolingizni Kiriting !",
          active: true,
          sendval: false,
        });
      } else if (value.length < 6) {
        setPasswordValid({
          ms: "Parol 6 tadan kam bo'lmasin !",
          active: true,
          sendval: false,
        });
      } else {
        setPasswordValid({ ms: "", active: false, sendval: true });
      }
      setPassword(value);
    }
  };

  const ChangeHandeler = (e) => {
    HandelerChange(e);
  };

  const onBlurValid = (e) => {
    const { value, name } = e.target;
    if (name === "Name") {
      if (value === "") {
        setNameValid({
          ms: "Ism Kiritilmadi ! ",
          active: true,
          sendval: false,
        });
      }
    }

    if (name === "email") {
      if (value === "") {
        setEmailValid({
          ms: "Email kiritilmadi !",
          active: true,
          sendval: false,
        });
      }
    }

    if (name === "lastname") {
      if (value === "") {
        setusernameValid({
          ms: "Familya kiritilmadi !",
          active: true,
          sendval: false,
        });
      }
    }

    if (name === "Password") {
      if (value === "") {
        setPasswordValid({
          ms: "Parol kiritilmadi !",
          active: true,
          sendval: false,
        });
      }
    }
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (!Name && !email && !username && !password) {
      setNameValid({ ms: "Ism Kiritilmadi !", active: true, sendval: false });
      setEmailValid({
        ms: "Email Kiritilmadi !",
        active: true,
        sendval: false,
      });
      setusernameValid({
        ms: "Familya Kiritilmadi !",
        active: true,
        sendval: false,
      });
      setPasswordValid({
        ms: "Parol Kiritilmadi !",
        active: true,
        sendval: false,
      });
    } else {
      if (Name && email && username && password) {
        try {
          const user = {
            firstname: Name,
            lastname: username,
            email: email,
            password,
          };
          setIsloading(true);
          const data = await AUTH.Register(user);
          if (data) {
            dispatch(successRegister());
            setIsloading(false);
            navigate("/login");
          }
        } catch (error) {
          const { response } = error;
          setIsloading(false);
          dispatch(ErrorRegsiter(response.data.err));
        }
      }
    }
  };

  useEffect(() => {
    document.title = "Shaxzod | Ro'yxatdan O'tish ";
  }, []);

  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="card mb-3">
                  <div className="card-body">
                    <div>
                      <h5 className="card-title text-center pb-0 fs-4">
                        Ro'yxatdan O'tish !
                      </h5>
                      <p className="text-center small">
                        Ma'lumotlaringizni Kiriting va Ro'yxatdan o'ting !
                      </p>
                    </div>
                    {error && <Error text={Errortext} />}
                    <form
                      className="row g-3 needs-validation"
                      onSubmit={SubmitHandler}
                    >
                      <div className="col-12">
                        <label htmlFor="yourName" className="form-label">
                          Ismingiz
                        </label>
                        <input
                          type="text"
                          name="Name"
                          autoComplete="off"
                          className="form-control"
                          id="yourName"
                          value={Name}
                          onChange={ChangeHandeler}
                          onBlur={onBlurValid}
                        />
                        {NameValid.active && (
                          <div
                            style={{ fontSize: ".875em" }}
                            className="text-danger"
                          >
                            {NameValid.ms}
                          </div>
                        )}
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">
                          Familyaingiz
                        </label>
                        <div className="input-group has-validation">
                          <input
                            type="text"
                            name="lastname"
                            className="form-control"
                            id="yourUsername"
                            value={username}
                            onChange={ChangeHandeler}
                            onBlur={onBlurValid}
                          />
                        </div>
                        {usernameValid.active && (
                          <div
                            style={{ fontSize: ".875em" }}
                            className="text-danger"
                          >
                            {usernameValid.ms}
                          </div>
                        )}
                      </div>
                      <div className="col-12">
                        <label htmlFor="yourEmail" className="form-label">
                          Emailingiz
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          id="yourEmail"
                          value={email}
                          autoComplete="off"
                          onChange={ChangeHandeler}
                          onBlur={onBlurValid}
                        />
                        {emailValid.active && (
                          <div
                            style={{ fontSize: ".875em" }}
                            className="text-danger"
                          >
                            {emailValid.ms}
                          </div>
                        )}
                      </div>
                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">
                          Parolingiz
                        </label>
                        <input
                          type="password"
                          name="Password"
                          autoComplete={"off"}
                          className="form-control"
                          id="yourPassword"
                          value={password}
                          onChange={ChangeHandeler}
                          onBlur={onBlurValid}
                        />
                        {passwordValid.active && (
                          <div
                            style={{ fontSize: ".875em" }}
                            className="text-danger"
                          >
                            {passwordValid.ms}
                          </div>
                        )}
                      </div>
                      <div className="col-12">
                        <button
                          className={`btn btn-primary w-100 ${
                            isLoading ? "cursor-no-drop" : ""
                          }`}
                          type="submit"
                          disabled={isLoading}
                        >
                          {" "}
                          {isLoading ? <Loading /> : "Create Account"}{" "}
                        </button>
                      </div>

                      <div className="row-12">
                        <hr />
                        <button
                          type="button"
                          className="btn w-100 btn-danger btn-sm text-white "
                          disabled
                        >
                          <AiOutlineGoogle size={"2rem"} color={"#fff"} />{" "}
                        </button>
                      </div>

                      <div className="col-12">
                        <p className="small mb-0">
                          Akkauntingiz Bormi ? <Link to="/login">Kirish</Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
export default Register;
