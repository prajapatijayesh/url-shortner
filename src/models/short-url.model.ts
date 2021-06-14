/**
 * 
 */
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ShortURL } from '@/interfaces/short-url.interface';

export type ShortURLCreationAttributes = Optional<ShortURL, 'uuid' | 'urlCode' | 'longUrl' | 'shortUrl'>;

export class URLModel extends Model<ShortURL, ShortURLCreationAttributes> implements ShortURL {
    public uuid: string;
    public urlCode: string;
    public longUrl: string;
    public shortUrl: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof URLModel {
    URLModel.init({
        uuid: {
            allowNull: false,
            type: DataTypes.STRING(45)
        },
        urlCode: {
            allowNull: false,
            type: DataTypes.STRING(255)
        },
        longUrl: {
            allowNull: false,
            type: DataTypes.STRING(255)

        },
        shortUrl: {
            allowNull: false,
            type: DataTypes.STRING(255)
        }
    }, {
        tableName: 'short_url',
        sequelize
    })
    return URLModel;
}