import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { userQuery } from "./utiles/data";
import { fetchUser } from "./utiles/fetchUser";

import { client } from "./client";

const App = () => {
  const [user, setUser] = useState(null);
  const userInfo = fetchUser();
  // const navigate = useNavigate();
  useEffect(() => {
    const query = userQuery(userInfo?._id);
    client.fetch(query).then((data) => setUser(data[0]));
    console.log(user);
  }, [user, userInfo?._id]);

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
      <Routes>
        {!user?._id ? (
          <>
            {" "}
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="login" element={<Login />} />
            <Route path="/*" element={<Home />} />
          </>
        )}
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
