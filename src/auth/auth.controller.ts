import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Render,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { join } from 'path';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Get('login')
  @Render('public')
  signInForm(@Request() req) {
    // TODO: put this in a helper or a service in nestjs
    const loginTemplatePath = join(__dirname, '../../views/login.hbs');
    const publicTemplateContent = fs.readFileSync(loginTemplatePath, 'utf8')

    const compiledLogin = Handlebars.compile(publicTemplateContent);
    const content = compiledLogin({ title: 'Login' });

    return {
      content
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
