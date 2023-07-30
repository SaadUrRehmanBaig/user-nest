import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    if (
      await this.userRepository.findOne({
        where: {
          username: createUserDto.username,
        },
      })
    ) {
      return {
        message: 'user with this username already exit',
        data: null,
      };
    }
    const response = await this.userRepository.save({
      name: createUserDto.name,
      password: hash,
      username: createUserDto.username,
    });
    return {
      data: {
        ...response,
      },
      message: 'user created successfully',
    };
  }

  async creatAdmin(createUserDto: CreateUserDto) {
    if (
      await this.userRepository.findOne({
        where: {
          username: createUserDto.username,
        },
      })
    ) {
      return {
        message: 'user with this username already exit',
        data: null,
      };
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    const response = await this.userRepository.save({
      name: createUserDto.name,
      password: hash,
      username: createUserDto.username,
      role: 'admin',
    });
    return {
      data: {
        ...response,
      },
      message: 'user created successfully',
    };
  }

  async findOneUser(username: string) {
    const response = await this.userRepository.findOne({
      where:{
        username,
        role: "user"
      }
    })
    return response;
  }

  async findOneAdmin(username: string) {
    const response = await this.userRepository.findOne({
      where:{
        username,
        role: "admin"
      }
    })
    return response;
  }

  async update(id: number, updateUserDto: UpdateUserDto, path: string) {
    const user = await this.userRepository.findOne({
      where:{
        id
      }
    })
    if(user){
      const data = await this.userRepository.save({
        id,
        name: updateUserDto.name || user.name,
        password: (updateUserDto.password && bcrypt.hashSync(updateUserDto.password,10)) || user.password,
        image:  path || user.image
      })
      return {
        data: data,
        message : "user updated successfully"
      };
    }
    throw new NotFoundException()
  }
}
