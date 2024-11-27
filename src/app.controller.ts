import { Get, Controller, Render, UseGuards, Post, Request } from '@nestjs/common';
import { join } from 'path';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import { Public } from './common/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  @Public()
  @Get()
  @Render('index')
  root() {
    // TODO: put this in a helper or a service in nestjs
    const headerTemplatePath = join(__dirname, '../views/header.hbs')
    const headerTemplateContent = fs.readFileSync(headerTemplatePath, 'utf8')

    const compiledHeader = Handlebars.compile(headerTemplateContent);
    const header = compiledHeader({ title: 'My Header Title' });

    return {
      header,
      message: 'Welcome to Mahi'
    };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
