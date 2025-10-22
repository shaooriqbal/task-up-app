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

  async fetch(id?: string) {
    if (id) return await this.model.findById(id).exec();
    return await this.model.find().exec();
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

  async update(id: string, data: any) {
    return await this.model.findByIdAndUpdate(id, data).exec();
  }

  async delete(id: string) {
    return  await this.model.findByIdAndDelete(id).exec();
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
