import { Get, Controller, Render } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';

@Controller()
export class AppController {
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
}
