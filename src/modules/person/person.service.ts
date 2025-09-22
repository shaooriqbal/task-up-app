import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Person, PersonDocument} from '../../data/schemas/person.schema';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name) private readonly model: Model<PersonDocument>,
  ) {
  }

  fetch(id?: string) {
    if (id) return this.model.findById(id).exec();
    return this.model.find().exec();
  }

  async create(data: any) {
    if (await this.model.findOne({username: data.username})) {
      throw new HttpException(
        'User with this email already exist',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    return (await this.model.create(data)) as PersonDocument;
  }

  update(id: string, data: any) {
    return this.model.findByIdAndUpdate(id, data).exec();
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }

  async fetchByUsername(username: string): Promise<Person> {
    return await this.model.findOne({username}).exec();
  }

  async fetchByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<Person> {
    return await this.model.findOne({username, password}).exec();
  }
}
