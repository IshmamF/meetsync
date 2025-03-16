"use client";
import React, { useState } from "react";
import FriendRequest from "./FriendRequest";
import FriendList from "./FriendList";
import AddFriendButton from "./AddFriendButton";
import SearchBar from "./SearchBar";
import UserSearchBar, { Person } from "../../home/components/UserSearchBar";

const pendingRequests = ["Ishmam Fardin"];
const friendsTemp = ["Mansij Mishra", "Olu Kukoyi"];

export default function Friends() {
  const [friends, setFriends] = useState<Person[]>([]);

  function addFriend(newFriend: Person) {
    setFriends((prevFriends) => [...prevFriends, newFriend]);
  }

  function removeFriend(friendId: string) {
    setFriends((prevFriends) =>
      prevFriends.filter((friend) => friend.uuid != friendId)
    );
  }
  return (
    <div className="flex flex-col pt-10 bg-lightBlue min-h-screen text-black w-full px-10">
      <div className="font-semibold text-5xl mb-6 pb-8">Friends</div>
      <div className="pb-8">
        <UserSearchBar
          people={friends}
          add={addFriend}
          remove={removeFriend}
          showSelection={false}
        />
      </div>
      {/* <div className="pb-8"><SearchBar placeholder=" Search friends..." /></div> */}
      <div className="w-full space-y-4 max-w-full pb-8">
        {pendingRequests.map((name) => (
          <div key={`pending-${name}`} className="pb-8">
            <FriendRequest name={name} onAccept={() => {}} onDeny={() => {}} />
          </div>
        ))}
        {friendsTemp.map((name) => (
          <div key={`friend-${name}`} className="pb-8">
            <FriendList name={name} onRemove={() => {}} />
          </div>
        ))}
      </div>
      <div className="flex w-full  justify-center">
        <AddFriendButton />
      </div>
    </div>
  );
}
