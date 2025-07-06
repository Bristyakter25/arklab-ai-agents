"use client";

import { useUser } from "@/app/context/UserContext";
import Image from "next/image";
import React from "react";


const UserProfile = () => {
  const { user, logout } = useUser();

  if (!user) return <p>Please log in.</p>;

  return (
    <div>
{user.photoURL ? (
  <Image
    src={user.photoURL}
    alt={user.name ?? "User"}
    width={100}
    height={100}
  />
) : (
  <p>No profile picture</p>
)}
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserProfile;
