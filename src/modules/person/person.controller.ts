import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import {
  PersonResponse,
  PersonUpdateRequest,
} from '../../data/dtos/person.dto';
import {PersonService} from './person.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('Person')
@UseGuards(AuthGuard('jwt'))
@Controller('persons')
export class PersonController {
  constructor(private readonly service: PersonService) {
  }

  @ApiOkResponse({
    type: PersonResponse,
    description: 'Get single user',
  })
  @ApiInternalServerErrorResponse({description: 'Unexpected Errors'})
  @ApiOperation({description: 'Get Specific Admin'})
  @Get(':id')
  fetchOne(@Param('id') id: string) {
    return this.service.fetch(id);
  }

  @ApiCreatedResponse({
    type: PersonResponse,
    description: 'Person Updated Successfully',
  })
  @ApiBadRequestResponse({description: 'Issue in request data'})
  @ApiInternalServerErrorResponse({description: 'Unexpected Error'})
  @ApiOperation({description: 'Update Specific Admin'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: PersonUpdateRequest) {
    return this.service.update(id, data);
  }

  @ApiOkResponse({description: 'Person deleted successfully'})
  @ApiOperation({description: 'Delete Specific Admin'})
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
