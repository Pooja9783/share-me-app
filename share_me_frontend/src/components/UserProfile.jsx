import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import {
  userSavedPinsQuery,
  userQuery,
  userCreatedPinsQuery,
} from "../utiles/data";
import { googleLogout } from "@react-oauth/google";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { client } from "./../client";
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState(null);
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();
  const randomImg = "https://source.unsplash.com/1600x900/?nature,photo";

  const activeBtnStyle =
    "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
  const NotActiveBtnStyle =
    "bg-primary text-black font-bold p-2 rounded-full w-20 outline-none";

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => setUser(data[0]));
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  const logOutUser = () => {
    localStorage.clear();
    navigate("/login");
  };
  if (!user) {
    return <Spinner message="Loading Profile" />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center ">
            <img
              src={randomImg}
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              alt="banner-pic"
            />
            <img
              src={user.image}
              className="rounded-full w-20 h-20 -mt-10 shadow-lg object-cover"
              alt="user-pic"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
          </div>
          <div className="absolute top-0 z-1 right-0 p-2">
            <button
              type="button"
              className="px-2"
              onClick={() => {
                googleLogout();
                logOutUser();
              }}
            >
              <AiOutlineLogout color="red" />
            </button>
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("created");
            }}
            className={`${
              activeBtn === "created" ? activeBtnStyle : NotActiveBtnStyle
            }`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("saved");
            }}
            className={`${
              activeBtn === "saved" ? activeBtnStyle : NotActiveBtnStyle
            }`}
          >
            Saved
          </button>
        </div>
        <div className="px-2 ">
          {pins?.length ? (
            <MasonryLayout pins={pins} />
          ) : (
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
              No Pins Found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
