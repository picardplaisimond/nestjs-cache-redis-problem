import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';

@Injectable()
export class AppService {

  
  getHello(): string {
    return 'Hello World!';
  }

  
  async getSitemapBuffer(): Promise<Buffer> {

    try {
      const smStream = new SitemapStream({ hostname: 'https://example.com' })
      const pipeline = smStream.pipe(createGzip())

      // pipe your entries or directly write them.
      smStream.write({ url: '/page-1/', changefreq: 'daily', priority: 0.3 })
      smStream.write({ url: '/page-2/', changefreq: 'monthly', priority: 0.7 })

      smStream.end()
      const xml = await streamToPromise(pipeline)
      return xml;

    } catch (err) {
      console.error(err)
      throw new InternalServerErrorException();
    }
  };
}
