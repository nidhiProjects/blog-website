import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AddBlogModal from "./AddBlogModal";
import UpdateBlogModal from "./UpdateBlogModal";
import DeleteBlogModal from "./DeleteBlogModal";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { readBlogs } from "../service/firebase";
import { toast } from "react-toastify";

function BlogList() {
  
  const [blogs,setBlogs]=useState([])
  const initialModal = { show: false, data: null };
  const [addModal, setAddModal] = useState(initialModal);
  const [updateModal, setUpdateModal] = useState(initialModal);
  const [deleteModal, setDeleteModal] = useState(initialModal);

  const redirect = useNavigate();

  const closeAddModal = () => {
    setAddModal(initialModal);
  };
  const closeUpdateModal = () => {
    setUpdateModal(initialModal);
  };

  const closeDeleteModal = () => {
    setDeleteModal(initialModal);
  };
  const addBlog = () => {
    console.log("Blog Added!");
  };
  const updateBlog = () => {
    console.log("Blog Updated!");
  };
  const deleteBlog = () => {
    console.log("deleted");
  };

  const handleSignOut=()=>{
    sessionStorage.removeItem("user")
    redirect("/login")
  }

  useEffect(()=>{
    const fetchBlogs = async()=>{
      try {
        const blogs=await readBlogs();
        console.log(blogs)
        setBlogs(blogs)
      } catch (error) {
        toast.error(error.message)
      }
    } 
    fetchBlogs();
  },[])
  return (
    <>
    
      {addModal?.show && (
        <AddBlogModal
          modal={addModal}
          onHide={closeAddModal}
          onSubmit={addBlog}
        />
      )}
      {updateModal?.show && (
        <UpdateBlogModal
          modal={updateModal}
          onHide={closeUpdateModal}
          onSubmit={updateBlog}
        />
      )}
      {deleteModal?.show && (
        <DeleteBlogModal
          onHide={closeDeleteModal}
          onSubmit={deleteBlog}
          modal={deleteModal}
        />
      )}
   
      <div>
      <div className=" px-24 flex justify-between items-center">

        <h1 className="text-2xl  font-bold mb-4">
          Blog Listing Page
        </h1>
        <button onClick={handleSignOut} className="border-2 px-8 py-2 rounded text-white  bg-red-400 hover:bg-red-500 ">SignOut</button>

      </div>
        <div className="container mx-auto p-4">
          <div className="mb-4 flex justify-end">
            <span
              className=" bg-emerald-400 py-2 rounded px-4 cursor-pointer font-semibold text-white  hover:bg-emerald-500"
              onClick={() => setAddModal((prev) => ({ ...prev, show: true }))}
            >
              Create Blog
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-200 text-sm">
                <tr>
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">Image</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr className="border-t  " key={blog.id}>
                    <td className="border-b py-2 px-4">{blog.title}</td>
                    <td className="border-b">
                      <img className="w-24" src={blog.image} alt={blog.title} />
                    </td>
                    <td className=" py-2 px-4 border-b">
                      {blog.description.length >= 20
                        ? blog.description.slice(0, 20) + "..."
                        : blog.description}
                    </td>
                    <td className=" border-b  ">
                      <button
                        onClick={() =>
                          redirect("/blog-detail", { state: blog })
                        }
                        className="bg-blue-500  ms-2 hover:bg-blue-600 text-white   py-1 px-2 rounded"
                      >
                        <FaEye />
                      </button>
                      <button
                        variant="primary"
                        className="bg-blue-500 ms-2 hover:bg-blue-600 text-white   py-1 px-2 rounded"
                        onClick={() =>
                          setUpdateModal((prev) => ({
                            ...prev,
                            show: true,
                            data: blog,
                          }))
                        }
                      >
                        <FaEdit />
                      </button>

                      <button
                        variant="danger"
                        className="bg-red-500 ms-2 hover:bg-red-600 text-white  py-1 px-2 rounded"
                        onClick={() =>
                          setDeleteModal((prev) => ({
                            ...prev,
                            show: true,
                            data: blog,
                          }))
                        }
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogList;
