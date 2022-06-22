import {Column, DataType, Model, Table} from "sequelize-typescript";

interface CardInfoCreationAttrs {
    cardNumber: string
    date: string
    cvv: string
    amount: string
}

@Table({tableName: 'cardInfo'})
export class CardInfo extends Model<CardInfo, CardInfoCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING(20), allowNull: false})
    cardNumber: string;

    @Column({type: DataType.STRING(20), allowNull: false})
    date: string;

    @Column({type: DataType.STRING(20), allowNull: false})
    cvv: string;

    @Column({type: DataType.STRING(200), allowNull: false})
    amount: string;
}