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
};
export type FriendRequests = {
  friend_request_id: number;
  requester_id: string;
  requested_id: string;
};

//* Messages

export type ChatMessagetype = {
  message_id: number;
  message: string;
  // author_id: string; // don´t think I need this one
  // receiver_id: string; // don´t think I need this one
  author: {
    username: string;
    avatar: string;
  };
  created_at: string;
  // receiver: {
  // username: string;
  // };
};
