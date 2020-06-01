import { Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class AppGuard implements CanActivate {
  canActivate() {
    return true;
  }
}