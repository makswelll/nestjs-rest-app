import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Avatar } from './avatar.schema';

@Injectable()
export class AvatarService {
  constructor(
    @InjectModel('Avatar') private readonly avatarModel: Model<Avatar>,
  ) {}

  async getAvatar(userId: string): Promise<string> {
    let avatar = await this.avatarModel.findOne({ userId }).exec();
    if (!avatar) {
      const response = await axios.get(`https://reqres.in/api/users/${userId}`);
      const avatarUrl = response.data.avatar;
      const base64Avatar = await this.downloadAndSaveAvatar(avatarUrl);
      avatar = new this.avatarModel({ userId, avatarData: base64Avatar });
      await avatar.save();
      return base64Avatar;
    } else {
      return avatar.avatarData;
    }
  }

  async downloadAndSaveAvatar(avatarUrl: string): Promise<string> {
    const response = await axios.get(avatarUrl, {
      responseType: 'arraybuffer',
    });
    const base64Avatar = Buffer.from(response.data, 'binary').toString(
      'base64',
    );
    return base64Avatar;
  }

  async deleteAvatar(userId: string): Promise<void> {
    await this.avatarModel.findOneAndDelete({ userId }).exec();
  }
}
