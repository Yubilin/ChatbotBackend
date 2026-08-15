import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatbotModule } from './chatbot/chatbot.module';
import { ConsultaModule } from './consulta/consulta.module';
import { CategoriaModule } from './categoria/categoria.module';
import { RespuestaModule } from './respuesta/respuesta.module';
import { PalabraClaveModule } from './palabra-clave/palabra-clave.module';
import { TypeOrmModule } from '@nestjs/typeorm'; 
@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'chatbot',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ChatbotModule,
    ConsultaModule,
    CategoriaModule,
    RespuestaModule,
    PalabraClaveModule,
  ],
  controllers: [AppController],
  providers: [AppService
  ],
})
export class AppModule {}
