export type ChatMessages = {
  message: string;
};
export type FriendAsFData = {
  //being used at friends.tsx as the element of the friendlist
  friend: {
    user_id: number;
    username: string;
    profile_picture: string;
    timestamp: Date;
    message: string;
  };
};
export type FriendAsUData = {
  // being used at friends.tsx as the element of the friendlist
  user: {
    user_id: number;
    username: string;
    profile_picture: string;
    timestamp: Date;
    message: string;
  };
};

export type ChatMessagestype = {
  profile_picture: string;
  author: {
    username: string;
  };
  author_id: number; // don´t think I need this one
  created_at: string;
  message: string;
  message_id: number;
  receiver: {
    username: string;
  };
  receiver_id: number; // don´t think I need this one
};

export type StrangersAndFRsType = {
  strangers: FriendType[];
  friendRequests: FriendRequests[];
};
export type FriendType = {
  user_id: number;
  username: string;
};
export type FriendRequests = {
  friend_request_id: number;
  requester_id: number;
  requested_id: number;
};
