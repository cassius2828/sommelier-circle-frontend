import axios from "axios";

const BLOG_BASE_URL = "http://localhost:3000/blogs";

export const createBlog = async (formData) => {
  const options = {
    headers: {

      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  console.log(formData)
  try {
    const response = await axios.post(BLOG_BASE_URL, formData, options);

    return response.data;
  } catch (err) {
    console.error(err);
    console.log("Could not communicate with db to create blog");
    throw err;
  }
};
