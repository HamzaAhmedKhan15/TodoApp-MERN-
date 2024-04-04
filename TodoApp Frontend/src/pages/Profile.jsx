import React, { useContext, useState, useEffect } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";

const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    // Check if profile picture URL is stored in localStorage
    const storedPicture = localStorage.getItem("profilePicture");
    if (storedPicture) {
      setProfilePicture(storedPicture);
    }
  }, []); // Run this effect only once on component mount

  const handlePictureChange = (e) => {
    // Handle picture change and set it to state
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setProfilePicture(url);
    // Store profile picture URL in localStorage
    localStorage.setItem("profilePicture", url);
  };

  const handleRemovePicture = () => {
    // Remove profile picture
    setProfilePicture(null);
    // Remove profile picture URL from localStorage
    localStorage.removeItem("profilePicture");
  };

  return loading ? (
    <Loader />
  ) : (
    <div style={{ textAlign: "center", marginTop: "120px" }}>
      {/* Profile Picture */}
      <div
        style={{
          position: "relative",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          overflow: "hidden",
          margin: "0 auto 20px",
          backgroundColor:
            profilePicture || user.profilePicture ? "transparent" : "#ddd", // Light grey background color
          backgroundImage: `url(${
            profilePicture ? profilePicture : user.profilePicture
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!user.profilePicture && !profilePicture && (
          <button
            onClick={() => document.getElementById("uploadInput").click()}
            style={buttonStyle}
          >
            Choose Profile Picture
          </button>
        )}

        {(user.profilePicture || profilePicture) && (
          <div>
            <button
              onClick={handleRemovePicture}
              style={{
                ...buttonStyle,
                marginTop: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }} // Black background color with opacity
            >
              Remove Picture
            </button>
          </div>
        )}
      </div>

      {/* Profile Picture Upload */}
      <input
        id="uploadInput"
        type="file"
        onChange={handlePictureChange}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* User Info */}
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};

const buttonStyle = {
  position: "absolute",
  bottom: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "black",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Profile;
