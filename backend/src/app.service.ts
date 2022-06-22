import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CardInfo} from "./app.model";

@Injectable()
export class AppService {
  constructor(@InjectModel(CardInfo) private cardInfoRepository: typeof CardInfo) {}

  async save(dto) {
    const item = await this.cardInfoRepository.create({...dto})
    return {
      RequestId: item.id,
      Amount: item.amount
    };
  }
}
