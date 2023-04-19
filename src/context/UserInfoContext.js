import { createContext, useContext, useState } from "react";

// create context
const UserInfoContext = createContext();

const UserInfoContextProvider = ({ children }) => {
  const [imageAsset, setImageAsset] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [docId, setDocId] = useState(null);
  const [userId, setUserId] = useState(null);

  const clearUserData = () => {
    setImageAsset(null);
    setUserName("");
    setEmail("");
    setBio("");
  };

  return (
    <UserInfoContext.Provider
      value={{
        clearUserData,
        userName,
        setUserName,
        email,
        setEmail,
        bio,
        setBio,
        imageAsset,
        setImageAsset,
        docId,
        setDocId,
        userId,
        setUserId,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const UserInfo = () => {
  return useContext(UserInfoContext);
};

export default UserInfoContextProvider;
