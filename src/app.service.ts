import { Injectable } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Task Up running ...';
  }
}
