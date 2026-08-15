import { Entity,PrimaryGeneratedColumn,Column,ManyToOne } from 'typeorm';
import { Chatbot } from 'src/chatbot/entities/chatbot.entity';

@Entity('consultas')
export class Consulta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mensaje: string;

    @ManyToOne(() => Chatbot, chatbot => chatbot.consultas)
    chatbot: Chatbot;
}
