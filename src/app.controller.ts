import {
  Controller,
  UseGuards,
  All,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AppGuard } from './app.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All()
  getSuccess() {
    return { success: true };
  }

  @All('fail')
  @UseGuards(AppGuard)
  getHello(): any {
    return { ignored: true }
  }
}
