import React, { useEffect, useState } from "react";
import { getAllArtist } from "../api";
import { useStateValue } from "../context/StateProvide";
import { actionType } from "../context/reducer";
import { motion } from "framer-motion";
const HomeArtist = ({ getAllArtis }) => {
  const [{ artists }, dispatch] = useStateValue();

  useEffect(() => {
    if (!artists) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
      });
    }
  }, []);
  return (
    <div className="w-full p-8 flex items-center justify-center flex-col">
      <p className=" text-textColor text-right font-bold">Top Artist</p>
      <div className="relative w-full gap-3  my-4 p-4 py-12 border rounded-md flex flex-wrap justify-evenly">
     
        {artists &&
          artists.map((data, index) => (
            <>
              <ArtistCard key={index} data={data} index={index} />
            </>
          ))}
      </div>
    </div>
    // <div>
    //   <div className="w-275 min-w-[160px] flex items-center justify-center">
    //     {/* prettier-ignore */}
    //     <img src={getAllArtis.imageURL} alt="" referrerPolicy='no-referrer' className="w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md"
    // />
    //   </div>
    // </div>
  );
};
export const ArtistCard = ({ data, index }) => {
  const [isDelete, setIsDelete] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative w-35 min-w-180 px-3 py-5 gap-3 cursor-pointer rounded-full flex flex-col items-center"
    >
      <img
        src={data?.imageURL}
        alt=""
        referrerPolicy="no-referrer"
        className="w-20 h-20 object-cover rounded-full min-w-[40px] shadow-md"
      />

      <p className="text-base text-textColor">{data.name}</p>
    </motion.div>
  );
};

export default HomeArtist;
