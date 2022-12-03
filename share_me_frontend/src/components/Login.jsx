import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
// import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/assets/share.mp4";
import logo from "../assets/assets/logowhite.png";
import { client } from "../client";
import jwt_decode from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const createOrGetUser = async (response) => {
    const { name, picture, sub } = jwt_decode(response.credential);
    // console.log(name, picture, sub);

    const user = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };
    console.log(user);
    client.createIfNotExists(user).then(() => {
      navigate("/");
    });
    localStorage.setItem("user", JSON.stringify(user));
  };
  return (
    <div className="flex justify-start-items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          control="false"
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin onSuccess={createOrGetUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
