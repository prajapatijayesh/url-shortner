/**
 * 
 */
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User } from '@/interfaces/user.interface';

export type UserCreationAttributes = Optional<User, 'id' | 'email' | 'password'>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
    public id: number;
    public profile_id: string;
    public provider: string;
    public givenName: string;
    public familyName: string;
    public email: string;
    public password: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
    UserModel.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        profile_id: {
            type: DataTypes.STRING(45)
        },
        provider: {
            type: DataTypes.STRING(45),
        },
        givenName: {
            type: DataTypes.STRING(45),
        },
        familyName: {
            type: DataTypes.STRING(45),
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING(45),
        },
        password: {
            type: DataTypes.STRING(255),
        },

    }, {
        tableName: 'users',
        sequelize,
    });

    return UserModel;
}