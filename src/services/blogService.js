import axios from "axios";

const BLOG_BASE_URL = "http://localhost:3000/blogs";

///////////////////////////
// ? POST | Create a new blog
///////////////////////////
export const createBlog = async (formData) => {
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  console.log(formData);
  try {
    const response = await axios.post(BLOG_BASE_URL, formData, options);

    return response.data;
  } catch (err) {
    console.error(err);
    console.log("Could not communicate with db to create blog");
    throw err;
  }
};

///////////////////////////
// * PUT | Create a new blog
///////////////////////////
export const updateBlogWithImg = async (formData, blogId) => {
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  console.log(formData);
  try {
    const response = await axios.put(
      `${BLOG_BASE_URL}/${blogId}`,
      formData,
      options
    );

    return response.data;
  } catch (err) {
    console.error(err);
    console.log("Could not communicate with db to update blog including img");
    throw err;
  }
};

///////////////////////////
// * PUT | Create a new blog
///////////////////////////
export const updateBlogNoImg = async (formData, blogId) => {
    const options = {
      headers: {
        "Content-Type":'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    console.log(formData);
    try {
      const response = await axios.put(
        `${BLOG_BASE_URL}/${blogId}`,
        formData,
        options
      );
  
      return response.data;
    } catch (err) {
      console.error(err);
      console.log("Could not communicate with db to update blog without an image");
      throw err;
    }
  };
///////////////////////////
// ! DELETE | Delete a blog by ID
///////////////////////////
export const deleteBlog = async (blogId) => {
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const response = await axios.delete(`${BLOG_BASE_URL}/${blogId}`, options);
    return response.data;
  } catch (err) {
    console.error("Error deleting blog:", err);
    throw err;
  }
};

///////////////////////////
// GET | Retrieve a single blog by ID
///////////////////////////
export const getBlog = async (blogId) => {
  try {
    const response = await axios.get(`${BLOG_BASE_URL}/${blogId}`);
    return response.data;
  } catch (err) {
    console.error("Error getting blog:", err);
    throw err;
  }
};


