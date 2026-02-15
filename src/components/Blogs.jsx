import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, moveToPage, removeBlog } from "../fetures/BlogSlice";

const Blogs = () => {
  const { blogs, currentPage, loading, error } = useSelector(
    (state) => state.blogs,
  );
  const dispatch = useDispatch();

  const [currentBlogs, setCurrentBlogs] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);
  const limit = 6;

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  useEffect(() => {
    if (!loading) {
      const skip = (currentPage - 1) * limit;
      const temp = blogs.slice(skip, skip + limit);
      setCurrentBlogs(temp);
    }
  }, [currentPage, loading, blogs]);

  useEffect(() => {
    let count = 1;
    let pages = [];
    const pageLimit = Math.ceil(blogs.length / limit);
    for (count; count <= pageLimit; count++) {
      pages.push(count);
    }
    setPageNumbers(pages);
  }, [blogs]);

  return (
    <>
      <p className="text-2xl m-5 ml-[5%]">Blogs</p>
      <div className="grid grid-cols-3 gap-3 m-[5%] mt-5">
        {currentBlogs.length > 1 ? (
          currentBlogs.map((value) => {
            return (
              <div
                key={value.id}
                className="w-full h-100 border p-3 m-3 overflow-y-auto rounded-2xl bg-blue-50"
              >
                <button
                  onClick={() => dispatch(removeBlog(value.id))}
                  className="bg-red-500 p-2 m-2 ml-0 border rounded text-white hover:bg-red-600 hover:text-white border-white"
                >
                  delete
                </button>
                <p>
                  <span className="font-semibold">Blog id:</span> {value.id}
                </p>
                <p>
                  <span className="font-semibold">user id:</span> {value.userId}
                </p>
                <p>
                  <span className="font-semibold">Title :</span> {value.title}
                </p>
                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  {value.body}
                </p>
              </div>
            );
          })
        ) : (
          <p>No blogs to show</p>
        )}
      </div>

      <div>
        {loading && (
          <p className="text-2xl font-bold text-center">loading ... </p>
        )}
        {error && <p className="font-semibold text-center">{error}</p>}
      </div>

      <div className="flex flex-row gap-2 items-center justify-center m-5 ">
        {pageNumbers ? (
          pageNumbers.map((value) => {
            return (
              <p
                key={value}
                onClick={() => dispatch(moveToPage(value))}
                className="border p-2 rounded-lg m-2 cursor-pointer hover:bg-blue-300"
              >
                {String(value).padStart(2, "0")}
              </p>
            );
          })
        ) : (
          <p>no pages</p>
        )}
      </div>
    </>
  );
};

export default Blogs;
