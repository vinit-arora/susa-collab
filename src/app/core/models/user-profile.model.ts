export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  userId: string;
  photoUrl: string;
  bio: string;
  followers:string[];
  following:string[];
  joinedChannels:string[];
  createdAt: Date;
  updatedAt: Date;
  dataStatus?: string;
}
