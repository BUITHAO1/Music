import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useStateValue } from "../context/StateProvide";
import { Link } from "react-router-dom";
import { IoLogoInstagram, IoLogoTwitter } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { deleteArtistById, getAllArtist } from "../api";
import { actionType } from "../context/reducer";
import { NavLink } from "react-router-dom";
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";

const DashboardArtist = () => {
  const [{ allArtists }, dispatch] = useStateValue();
  const [songFilter, setSongFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [filteredSongs, setFilteredSongs] = useState(null);

  useEffect(() => {
    if (!allArtists) {
      getAllArtist().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.data,
        });
      });
    }
  }, []);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-24">
        <NavLink
          to={"/dashboard/newArtist"}
          className="flex items-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-400 hover:shadow-md cursor-pointer"
        >
          <IoAdd />
        </NavLink>
        <input
          type="text"
          placeholder="Tìm kiếm ở đây"
          className={`w-52 px-4 py-2 border ${
            isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
          } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
          value={songFilter}
          onChange={(e) => setSongFilter(e.target.value)}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />

        {songFilter && (
          <motion.i
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.75 }}
            onClick={() => {
              setSongFilter("");
              setFilteredSongs(null);
            }}
          >
            <AiOutlineClear className="text-3xl text-textColor cursor-pointer" />
          </motion.i>
        )}
      </div>
      <div className="relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
        {allArtists &&
          allArtists.map((data, index) => (
            <>
              <ArtistCard key={index} data={data} index={index} />
            </>
          ))}
      </div>
    </div>
  );
};

export const ArtistCard = ({ data, index }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [{ allArtists }, dispatch] = useStateValue();
 
  const deleteObject = (id) => {
    deleteArtistById(id).then((res) => {
      if (res.data.success) {
        setAlert("success");
        setAlertMsg(res.data.msg);
        getAllArtist().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ARTISTS,
            allArtists: data.data,
          });
        });
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      } else {
        setAlert("error");
        setAlertMsg(res.data.msg);
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      }
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
    >
      <img
        src={data?.imageURL}
        className="w-full h-40 object-cover rounded-md"
        alt=""
      />

      <p className="text-base text-textColor">{data.name}</p>
      <div className="flex items-center gap-4">
        <a href={data.instagram} target="_blank">
          <motion.i whileTap={{ scale: 0.75 }}>
            <IoLogoInstagram className="text-gray-500 hover:text-headingColor text-xl" />
          </motion.i>
        </a>
        <a href={data.twitter} target="_blank">
          <motion.i whileTap={{ scale: 0.75 }}>
            <IoLogoTwitter className="text-gray-500 hover:text-headingColor text-xl" />
          </motion.i>
        </a>
      </div>
      <motion.i
        className="absolute bottom-2 right-2"
        whileTap={{ scale: 0.75 }}
        onClick={() => setIsDelete(true)}
      >
        <MdDelete className=" text-gray-400 hover:text-red-400 text-xl cursor-pointer" />
      </motion.i>

      {isDelete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute inset-0 p-2 bg-darkOverlay  backdrop-blur-md flex flex-col items-center justify-center gap-4"
        >
          <p className="text-gray-100 text-base text-center">
            Bạn có chắc chắn muốn xóa không
          </p>
          <div className="flex items-center w-full justify-center gap-3">
            <div className="bg-red-300 px-3 rounded-md">
              <p
                className="text-headingColor text-sm"
                onClick={() => deleteObject(data._id)}
              >
                Có
              </p>
            </div>
            <div
              className="bg-green-300 px-3 rounded-md"
              onClick={() => setIsDelete(false)}
            >
              <p className="text-headingColor text-sm">Không</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardArtist;
