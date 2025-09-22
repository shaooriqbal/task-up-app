import {Module} from '@nestjs/common';
import {PersonService} from './person.service';
import {MongooseModule} from '@nestjs/mongoose';
import {PersonController} from './person.controller';
import {Person, PersonSchema} from '../../data/schemas/person.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Person.name, schema: PersonSchema}]),
  ],
  providers: [PersonService],
  controllers: [PersonController],
  exports: [PersonService],
})
export class PersonModule {
}
