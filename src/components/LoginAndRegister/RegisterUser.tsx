import { useState, FormEventHandler, useEffect } from "react";
import { serverUrl } from "../../utilities/URLs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { uiActions } from "../../store/uiSlice";
import { useNavigate } from "react-router-dom";

const Register: React.FC<{backToDefault: ()=>void}> = ({backToDefault}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ui = useSelector((state: RootState) => state.ui);

  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //selecting file for profile photo and validate
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(uiActions.removeError())
    const selected = e.target.files ? e.target.files[0] : null;
    //validate
    if (selected) {
      const fileExtension = selected.name.split(".").pop()?.toLocaleLowerCase();
      const validExtensiosn = ["jpg", "jpeg", "png", "gif"];
      if (fileExtension && validExtensiosn.includes(fileExtension)) {
        setFile(selected);
      } else {
        dispatch(
          uiActions.setError("only: jpg, jpeg, png, gif file types accepted")
        );
        e.target.value = "";
      }
    }
  };

  //posting user register data to backend and returning info on sucess or failure
  const register = async () => {
    dispatch(uiActions.startLoading());
    const formData = new FormData();
    formData.append("name", name);
    formData.append("password", password);

    if (file) {
      formData.append("file", file);
    }

    const response = await fetch(serverUrl + "/users/register", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      dispatch(uiActions.setError("registering user failed"));
      dispatch(uiActions.endLoading());
    }
    if (response.ok) {
      dispatch(uiActions.endLoading());
      navigate("/");
    }
  };

  //form submission and validation
  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    if (
      name.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      dispatch(uiActions.setError("form rows cannot be empty"));
      return;
    }
    if (password !== confirmPassword) {
      dispatch(uiActions.setError("password and confirmation don't match"));
      return;
    }
    register().catch(() => {
      dispatch(uiActions.setError("registering user failed"));
    });
  };
  //reseting error status
  useEffect(() => {
    if (ui.error.errorStatus) {
      dispatch(uiActions.removeError());
    }
  }, []);

  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label htmlFor="passwordConfirm">Confirm password:</label>
        <input
          type="password"
          id="passwordConfirm"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <label htmlFor="photo">Photo</label>
        <input type="file" id="photo" onChange={handleFileChange} />
        {ui.error.errorStatus && <div>{ui.error.errorInfo}</div>}
        <button type="submit">{ui.loading ? "Loading..." : "Register"}</button>
      </form>
      <div onClick={() => backToDefault()}>back</div>
    </>
  );
};

export default Register;
