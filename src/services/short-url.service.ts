import { v4 as uuid } from 'uuid'
import randomstring from 'randomstring';

import DB from "@/databases";
import { ShortURL } from '@/interfaces/short-url.interface';

class ShortURLService {
    public shortURL = DB.ShortURL;

    public async shorten(urlData): Promise<ShortURL> {
        const code = randomstring.generate(5);
        const createdShortURLData: ShortURL = await this.shortURL.create({
            uuid: uuid(),
            urlCode: code,
            longUrl: urlData,
            shortUrl: `http://simform.ly/${code}`
        });
        return createdShortURLData;
    }

    public async fetch(code: string): Promise<ShortURL> {
        const findOneData = await this.shortURL.findOne({ where: { urlCode: code } });
        return findOneData;
    }
}

export default ShortURLService;