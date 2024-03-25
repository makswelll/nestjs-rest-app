import * as mongoose from 'mongoose';

export const AvatarSchema = new mongoose.Schema({
  userId: String,
  avatarData: String,
});

export interface Avatar extends mongoose.Document {
  userId: string;
  avatarData: string;
}
