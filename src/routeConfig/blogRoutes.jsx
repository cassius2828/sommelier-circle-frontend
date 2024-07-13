// src/routes/blogRoutes.js
import { lazy } from "react";

const ExploreBlogs = lazy(() => import("../components/Blogs/ExploreBlogs"));
const BlogsFollowing = lazy(() => import("../components/Blogs/BlogsFollowing"));
const BlogManager = lazy(() => import("../components/Blogs/BlogManager"));
const MyBlogs = lazy(() => import("../components/Blogs/MyBlogs"));
const ShowBlog = lazy(() => import("../components/Blogs/ShowBlog"));

const blogRoutes = [
  { path: "blogs/explore", element: <ExploreBlogs /> },
  { path: "blogs/following", element: <BlogsFollowing /> },
  { path: "blogs/new", element: <BlogManager /> },
  { path: "blogs/user-blogs/:userId", element: <MyBlogs /> },
  { path: "blogs/:blogId", element: <ShowBlog /> },
  { path: "blogs/:blogId/edit", element: <BlogManager /> },
];

export default blogRoutes;
