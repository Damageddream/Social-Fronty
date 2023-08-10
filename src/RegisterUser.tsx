import { useState, FormEventHandler } from "react";
import { serverUrl } from "./utilities/URLs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { uiActions } from "./store/uiSlice";

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const ui = useSelector((state: RootState) => state.ui);

  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>();
  const [password, setPassword] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? e.target.files[0] : null;
    setFile(selected);
  };

  const register = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("password", password)
    if (file) {
      formData.append("file", file);
    }

    const response = await fetch(serverUrl + "/users/register", {
      method: "POST",
   
      body: formData,
    });
    if (!response.ok) {
      dispatch(uiActions.setError("registering user failed"));
    }
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    try {
      register().catch((err) => {
        dispatch(uiActions.setError("registering user failed"));
      });
    } catch (err) {
      dispatch(uiActions.setError("registering user failed"));
    }
  };

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
        <input type="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        <label htmlFor="photo">Photo</label>
        <input type="file" id="photo" onChange={handleFileChange} />
        <button type="submit">register</button>
      </form>
    </>
  );
};

export default Register;
