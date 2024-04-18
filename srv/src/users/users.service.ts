import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { PageOptionsDto } from 'src/page/page.options.dto';
import { PageMetaDto } from 'src/page/page.meta';
import { PageDto } from 'src/page/page.dto';
import { UsersResponseDto } from './users.response.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<UsersResponseDto>> {
    const queryBuilder = this.usersRepo.createQueryBuilder('user');
    queryBuilder.orderBy('user.id', pageOptionsDto.order).skip(pageOptionsDto.skip).take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
