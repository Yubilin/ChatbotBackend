import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { Chatbot } from './entities/chatbot.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Chatbot])],
  controllers: [ChatbotController],
  providers: [ChatbotService],
})
export class ChatbotModule {}
