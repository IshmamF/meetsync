"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import FriendRequest from "./FriendRequest";
import FriendList from "./FriendList";
import AddFriendButton from "./AddFriendButton";
import SearchBar from "./SearchBar";
import { getApiBase } from "@/utils/etc/apiBase";
import { useUser } from "@/utils/context/userContext";
import { toast } from "react-hot-toast";
import Loading from "@/app/components/loading";
import AddFriendModal from "../../hangouts/_components/AddFriendModal";

type FetchFriendsResponse = {
  status: string;
  friends: Friend[];
};

export type Friend = {
  id: string;
  friend_auth_id: string;
  friend_email: string;
  friend_username: string;
  status: string;
  sender: string;
};

type APIResponse = {
  status: number;
  message: string;
};

const TOAST_DURATION = 2000;

export default function Friends() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [pendingFriends, setPendingFriends] = useState<Friend[]>([]);
  const [mergedFriends, setMergedFriends] = useState<Friend[]>([]);
  const [query, setQuery] = useState("");
  const [suggestion, setSuggestion] = useState<Friend[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasTrigged, setHasTrigged] = useState<boolean>(false);
  const user = useUser();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  async function fetchFriends() {
    if (!hasTrigged) {
      setLoading(true);
      setHasTrigged(true);
    }
    const base = getApiBase();
    const response = await fetch(`${base}/fetch-friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid: user?.auth_id,
      }),
    });

    if (response.ok) {
      const data = (await response.json()) as FetchFriendsResponse;
      setFriends(data.friends.filter((friend) => friend.status == "accepted"));
      setPendingFriends(
        data.friends.filter((friend) => friend.status === "pending")
      );
      setMergedFriends(data.friends);
      setLoading(false);
    }
  }

  async function acceptFriendRequest(friendshipId: string) {
    const base = getApiBase();
    const response = await fetch(`${base}/add-friend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        friendship_id: friendshipId,
      }),
    });

    if (response.ok) {
      const data = (await response.json()) as APIResponse;
      if (data.status !== 200) {
        toast.error("Unable to add friend", {
          duration: TOAST_DURATION,
        });
      } else {
        toast.success("Succesfully added new friend", {
          duration: TOAST_DURATION,
        });
        fetchFriends();
        setSuggestion(null);
      }
    }
  }

  async function declineFriendRequest(
    friendshipId: string,
    removing: boolean,
    canceling?: boolean
  ) {
    const base = getApiBase();
    const response = await fetch(`${base}/remove-friend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        friendship_id: friendshipId,
      }),
    });

    if (response.ok) {
      let toastSuccessMessage = removing
        ? "Succesfully removed friend"
        : "Succesfully declined friend request";
      let toastErrorMessage = removing
        ? "Unable to removed friend"
        : "Unable to decline friend request";
      if (canceling) {
        toastSuccessMessage = "Succesfully canceled pending friend request.";
        toastErrorMessage = "Unable to cancel pending friend-request";
      }

      const data = (await response.json()) as APIResponse;
      if (data.status !== 200) {
        toast.error(toastErrorMessage, {
          duration: TOAST_DURATION,
        });
      } else {
        toast.success(toastSuccessMessage, {
          duration: TOAST_DURATION,
        });
        fetchFriends();
        setSuggestion(null);
      }
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    const filteredFriends = mergedFriends.filter((friend) =>
      friend.friend_username.includes(value)
    );
    setQuery(value);
    setSuggestion(filteredFriends.length !== 0 ? filteredFriends : []);
  }

  useEffect(() => {
    fetchFriends();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestion(null);
    }
  }, [query]);

  return (
    <>
      <AddFriendModal
        friends={friends.map((friend) => friend.friend_auth_id)}
        pendingFriends={pendingFriends.map((friend) => friend.friend_auth_id)}
        isOpen={isModalOpen}
        onClose={(rerender: boolean) => {
          if (rerender) {
            fetchFriends();
          }
          setIsModalOpen(false);
        }}
      />

      <div className="flex flex-col pt-10 bg-lightBlue min-h-screen text-black w-full px-10">
        <div className="font-semibold text-5xl mb-6 pb-8">Friends</div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex w-full items-center justify-between pb-8">
              <SearchBar
                value={query}
                onChange={handleChange}
                placeholder=" Search friends..."
              />
              <div
                className="flex w-full justify-end"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <AddFriendButton />
              </div>
            </div>
            {suggestion ? (
              suggestion?.map((friend) => {
                if (friend.status === "pending") {
                  return (
                    <div key={`pending-${friend.id}`} className="pb-8">
                      <FriendRequest
                        isSender={friend.sender === user?.auth_id}
                        name={friend.friend_username}
                        onAccept={() => {
                          acceptFriendRequest(friend.id);
                        }}
                        onDeny={() => {
                          declineFriendRequest(friend.id, false);
                        }}
                        onCancel={() => {
                          declineFriendRequest(friend.id, false, true);
                        }}
                      />
                    </div>
                  );
                } else
                  return (
                    <div key={`pending-${friend.id}`} className="pb-8">
                      <FriendList
                        name={friend.friend_username}
                        onRemove={() => {
                          declineFriendRequest(friend.id, true);
                        }}
                      />
                    </div>
                  );
              })
            ) : (
              <div className="w-full space-y-4 max-w-full pb-8">
                {pendingFriends.map((friend) => (
                  <div key={`pending-${friend.id}`} className="pb-8">
                    <FriendRequest
                      isSender={friend.sender === user?.auth_id}
                      name={friend.friend_username}
                      onAccept={() => {
                        acceptFriendRequest(friend.id);
                      }}
                      onDeny={() => {
                        declineFriendRequest(friend.id, false);
                      }}
                      onCancel={() => {
                        declineFriendRequest(friend.id, false, true);
                      }}
                    />
                  </div>
                ))}
                {friends.map((friend) => (
                  <div key={`friend-${friend.id}`} className="pb-8">
                    <FriendList
                      name={friend.friend_username}
                      onRemove={() => {
                        declineFriendRequest(friend.id, true);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
