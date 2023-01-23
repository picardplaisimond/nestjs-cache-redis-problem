import { CacheInterceptor, Controller, Get, Header, StreamableFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('/sitemap')
  @Header('Content-Type', 'application/xml')
  @Header('Content-Encoding', 'gzip')
  @UseInterceptors(CacheInterceptor)
  async getSitemap(): Promise<StreamableFile> {
    const xml = await this.appService.getSitemapBuffer();
    return new StreamableFile(xml);
  }
}
