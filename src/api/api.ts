import axios from "axios";

const postApi = async (body: any) => {
  //   const a = await fetch("http://133.186.209.80:3000/emotion");
  //   console.log(a);
  //   console.log(body);
  const data = await axios.post("http://127.0.0.1:1234/predicts", body);
  return data;
};
export default postApi;
