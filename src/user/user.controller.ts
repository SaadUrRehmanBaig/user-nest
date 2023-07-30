import { Controller, Post, Body, UseGuards, Put, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterFileFilter, fileStorage } from 'src/multer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/signup")
  createUser(@Body() createUserDto: CreateUserDto ) {
    return this.userService.createUser(createUserDto);
  }

  @Post("/signup-admin")
  createAdmin(@Body() createUserDto: CreateUserDto ) {
    return this.userService.creatAdmin(createUserDto);
  }
  @Put("/update")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('userImage', {
    storage: fileStorage,
    fileFilter:MulterFileFilter,
  }))
  updateUser( @Request() req, @Body() updateUser: UpdateUserDto, @UploadedFile() userImage: Express.Multer.File) {
    return this.userService.update(req.user.id, updateUser, userImage.path)
  }
}
