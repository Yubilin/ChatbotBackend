import { Entity,Column,PrimaryGeneratedColumn,OneToMany} from 'typeorm';
import { Respuesta } from '../../respuesta/entities/respuesta.entity';
@Entity('categorias')
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column({ type: 'text' })
    descripcion: string;
    @OneToMany(() => Respuesta, respuesta => respuesta.categoria)
    respuesta: Respuesta[];
}
