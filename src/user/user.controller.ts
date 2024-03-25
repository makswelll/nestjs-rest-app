import { Controller, Get, Param } from '@nestjs/common';
import axios from 'axios';

@Controller('api/users')
export class UserController {
  @Get(':userId')
  async getUserById(@Param('userId') userId: string): Promise<any> {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user data: ${error.message}`);
    }
  }
}
