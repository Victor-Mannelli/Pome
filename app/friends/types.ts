export type FriendAsFData = {
  //being used at friends.tsx as the element of the friendlist
  friend: {
    user_id: string;
    username: string;
    profile_picture: string;
    timestamp: Date;
    message: string;
  };
};
export type FriendAsUData = {
  // being used at friends.tsx as the element of the friendlist
  user: {
    user_id: string;
    username: string;
    profile_picture: string;
    timestamp: Date;
    message: string;
  };
};

export type StrangersAndFRsType = {
  strangers: FriendType[];
  friendRequests: FriendRequests[];
};
export type FriendType = {
  user_id: string;
  username: string;
  avatar?: string;
};
export type FriendRequests = {
  friend_request_id: number;
  requested_id: string;
  requester: {
    user_id: string;
    username: string;
    avatar: string | null;
  };
};
//* Friend Requests

//* FriendShip

export type FriendShip = {
  friendship_id: string;
  user_id: string;
  username: string;
  avatar: string | null;
};

//* Messages

export type ChatMessagetype = {
  message_id: number;
  message: string;
  receiver_id?: string;
  author_id?: string;
  author: {
    username: string;
    avatar: string;
  };
  created_at: string;
};
