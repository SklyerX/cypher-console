import axios from "axios";

const IP_API = "https://ifconfig.is/json/";

export async function getIpInfo(ip?: string) {
  const { data } = await axios.get(`${IP_API}${ip ? ip : ""}`);
  return data;
}
