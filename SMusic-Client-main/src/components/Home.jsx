import React from "react";
import HomeSong from "./HomeSong";
import Header from "./Header";
import HomeArtist from "./HomeArtist";
import DashboardArtist from "./DashboardArtist";

const Home = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 ...">
        <div class="col-span-2">
          <HomeSong />
        </div>
        <div>
          <HomeArtist />
        </div>
      </div>
    </div>
  );
};

export default Home;
