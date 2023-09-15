"use client";
import axios from "axios";

export default function CreateLink() {
  const create = async () => {
    try {
      const { data } = await axios.post("/api/me/link", {
        image: "https://via.placeholder.com/1000",
        title: "discord.js",
        url: "https://discordjs.org",
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* <button onClick={create}>Create</button> */}
      <button onClick={create}>YOYO</button>
    </div>
  );
}
