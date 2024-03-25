import { Controller, Get, Param, Delete } from '@nestjs/common';
import { AvatarService } from './avatar.service';

@Controller('api/users')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Get(':userId/avatar')
  async getAvatar(@Param('userId') userId: string): Promise<string> {
    return this.avatarService.getAvatar(userId);
  }

  @Delete(':userId/avatar')
  async deleteAvatar(@Param('userId') userId: string): Promise<void> {
    return this.avatarService.deleteAvatar(userId);
  }
}
