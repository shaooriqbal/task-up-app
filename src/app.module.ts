import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './common/auth/auth.module';
import { DbModule } from './common/db/db.module';
import { ProjectModule } from './modules/project/project.module';
import {TaskModule} from "./modules/task/task.module";

@Module({
  imports: [DbModule, AuthModule, ProjectModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
