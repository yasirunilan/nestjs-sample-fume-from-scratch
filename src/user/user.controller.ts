import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: User): Promise<User> {
    return await this.userService.createUser(userData);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User | null> {
    return await this.userService.findUserById(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() userData: User): Promise<User> {
    return await this.userService.updateUser(id, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<User> {
    return await this.userService.deleteUser(id);
  }
}
