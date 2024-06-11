import React, { useContext, useState } from "react";
import { MdEmail } from "react-icons/md";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css"; // Import the Swal CSS
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet, HelmetProvider } from "react-helmet-async";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const helmetContext = {};

  const photoIcon = (
    <div className="w-10 rounded-full">
      <lord-icon
        className="w-full h-full"
        src="https://cdn.lordicon.com/kthelypq.json"
        trigger="loop"
        delay="500"
        colors="primary:#000"
        style={{ width: "40px", height: "40px" }}
      ></lord-icon>
    </div>
  );

  const editProfile = () => {
    document.getElementById("update_modal").showModal();
    setIsModalOpen(true); // Open the modal
  };
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    document.getElementById("update_modal").close();
  };

  const handleProfileUpdateSuccess = () => {
    closeModal(); // Close the modal
    // Display SweetAlert notification
    Swal.fire({
      text: "Profile updated successfully!",
      icon: "success",
    });
  };

  return (
    <div className="my-10 p-2">
      <HelmetProvider context={helmetContext}>
        <Helmet>
          <title>Profile</title>
        </Helmet>
      </HelmetProvider>

      <div className="card bg-blue-300 glass border flex mx-auto flex-col max-w-md p-6 dark:bg-gray-50 dark:text-gray-800">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="User"
            className="flex-shrink-0 object-cover h-64 rounded-sm sm:h-96 dark:bg-gray-500 aspect-square"
          />
        ) : (
          <div className="mx-auto">{photoIcon}</div>
        )}

        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold">{user.displayName} </h2>
          <span className="justify-center pb-2 text-xl dark:text-gray-600 flex flex-row gap-2">
            <p className="my-auto">
              <MdEmail />{" "}
            </p>
            <p>{user.email} </p>
          </span>
          <button onClick={editProfile} className="btn border-indigo-700">
            Update Profile
          </button>
          {/* modal part */}

          <dialog id="update_modal" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-sm btn-square btn-ghost bg-red-500 text-white absolute right-2 top-2"
                >
                  ✕
                </button>
              </form>

              <UpdateProfile onSuccess={handleProfileUpdateSuccess} />
            </div>
            //this is for esc or outside click and the modal will be gone..bommm
            {/* <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form> */}
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Profile;
