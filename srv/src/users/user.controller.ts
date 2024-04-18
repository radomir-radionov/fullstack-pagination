import { UserService } from './users.service';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PageOptionsDto } from 'src/page/page.options.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers(@Query() pageOptionsDto: PageOptionsDto) {
    this.logger.log('Get all users');
    console.log('pageOptionsDto', pageOptionsDto);
    const data = await this.userService.findAll(pageOptionsDto);
    return data;
  }
}
