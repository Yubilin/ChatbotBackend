import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';

import { Categoria } from '../categoria/entities/categoria.entity';
import { Respuesta } from '../respuesta/entities/respuesta.entity';
import { PalabraClave } from '../palabra-clave/entities/palabra-clave.entity';
import { Chatbot } from '../chatbot/entities/chatbot.entity';
import { Consulta } from '../consulta/entities/consulta.entity';

/*
|--------------------------------------------------------------------------
| CONEXIÓN A LA BASE DE DATOS
|--------------------------------------------------------------------------
| CAMBIO: el seed ahora lee las credenciales desde el archivo .env
| (igual que la aplicación) y sincroniza las tablas automáticamente,
| así basta con ejecutar `npm run seed` sin necesidad de crear tablas a mano.
*/
const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USER ?? 'ciel',
  password: process.env.DB_PASSWORD ?? 'zafkiel12',
  database: process.env.DB_NAME ?? 'chatbot',

  entities: [Categoria, Respuesta, PalabraClave, Chatbot, Consulta],

  synchronize: true,
});

async function seed() {
  try {
    await dataSource.initialize();

    console.log('Conectado a la base de datos');

    const categoriaRepository = dataSource.getRepository(Categoria);
    const respuestaRepository = dataSource.getRepository(Respuesta);
    const palabraClaveRepository = dataSource.getRepository(PalabraClave);    /*
    |--------------------------------------------------------------------------
    | LIMPIAR DATOS ANTERIORES
    |--------------------------------------------------------------------------
    | CAMBIO: MySQL no permite TRUNCATE en una tabla referenciada por una
    | clave foránea (palabras_clave.respuestaId -> respuestas.id). Por eso
    | se desactivan temporalmente las verificaciones de claves foráneas
    | mientras se limpian las tablas.
    */

    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0');

    await palabraClaveRepository.clear();
    await respuestaRepository.clear();
    await categoriaRepository.clear();

    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('Datos anteriores eliminados');

    /*
    |--------------------------------------------------------------------------
    | CATEGORÍAS
    |--------------------------------------------------------------------------
    | CAMBIO: base de conocimiento ampliada con los temas que el chatbot
    | debe cubrir: contactos, decanatos, pagos, plataforma, aulas, sistema
    | modular, atención, servicios, estudiantes nuevos y datos personales.
    */

    const marketing = await categoriaRepository.save(
      categoriaRepository.create({
        nombre: 'Marketing',
        descripcion: 'Comunicación institucional y actividades',
      }),
    );

    const pagos = await categoriaRepository.save(
      categoriaRepository.create({
        nombre: 'Pagos',
        descripcion: 'Cajas, fechas límite y procedimientos de pago',
      }),
    );

    const plataforma = await categoriaRepository.save(
      categoriaRepository.create({
        nombre: 'Plataforma',
        descripcion: 'Funcionamiento de la plataforma universitaria',
      }),
    );

    const decanatos = await categoriaRepository.save(
      categoriaRepository.create({
        nombre: 'Decanatos',
        descripcion: 'Decanatos, responsables y contactos por facultad',
      }),
    );

    const aulas = await categoriaRepository.save(
      categoriaRepository.create({
        nombre: 'Aulas',
        descripcion: 'Ubicación de aulas, bloques y edificios',
      }),
    );

    const sistemaModular = await categoriaRepository.save(
      categoriaRepository.create({
        nombre: 'Sistema Modular',
        descripcion: 'Funcionamiento del sistema modular',
      }),
    );

    const atencion = await categoriaRepository.save(
      categoriaRepository.create({
        nombre: 'Atención',
        descripcion: 'Horarios y servicios de atención universitaria',
      }),
    );

    const servicios = await categoriaRepository.save(
      categoriaRepository.create({
        nombre: 'Servicios',
        descripcion: 'Servicios de la universidad: biblioteca, deportes, etc.',
      }),
    );

    const estudiantesNuevos = await categoriaRepository.save(
      categoriaRepository.create({
        nombre: 'Estudiantes Nuevos',
        descripcion: 'Inscripción, matrícula, requisitos y dudas frecuentes',
      }),
    );

    const directorio = await categoriaRepository.save(
      categoriaRepository.create({
        nombre: 'Directorio',
        descripcion: 'Teléfonos y contactos de las diferentes áreas',
      }),
    );

    const informacionPersonal = await categoriaRepository.save(
      categoriaRepository.create({
        nombre: 'Información Personal',
        descripcion: 'Aclara que el chatbot no accede a datos personales',
      }),
    );

    /*
    |--------------------------------------------------------------------------
    | RESPUESTAS
    |--------------------------------------------------------------------------
    | CAMBIO: cada respuesta incluye teléfonos, nombres de responsables,
    | ubicaciones y horarios para que el chatbot sea realmente útil.
    */

    const respuestaMarketing = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
Área de Marketing

Responsable: Lic. María Fernanda Rojas (Jefa de Comunicación).
Ubicación: Edificio Administrativo, segundo piso, oficina 204.
Teléfono: 4-645-1234.
Correo: marketing@universidad.edu.bo.
Horario de atención: lunes a viernes de 08:00 a 16:00.

Funciones: comunicación institucional, actividades, campañas y
difusión de información universitaria. Si quieres participar en
una actividad, acércate a esta oficina.
        `.trim(),
        categoria: marketing,
      }),
    );

    const respuestaPagos = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
Pagos y Cajas

Caja Central:
Ubicación: Planta baja del Edificio Administrativo.
Teléfono: 4-645-1100.
Horario: lunes a viernes de 08:00 a 16:00.

Medios de pago: efectivo, tarjeta de débito, depósito o transferencia bancaria.
Se entrega comprobante de cada pago: conserva siempre tu recibo.

Fechas límite de pago:
- Matrícula: primera quincena del periodo correspondiente.
- Cuotas mensuales: vencen el día 10 de cada mes.
- Las fechas exactas se publican en el calendario académico oficial;
  consúltalo siempre antes de pagar.

Procedimiento de pago:
1. Acércate a la Caja Central con tu carnet universitario o cédula de identidad.
2. Indica el concepto de pago (matrícula, cuota, arancel).
3. Realiza el pago y conserva el comprobante.

Si tienes deudas o mora, acude a la Caja para regularizar tu situación
y evitar recargos.
        `.trim(),
        categoria: pagos,
      }),
    );

    const respuestaPlataforma = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
Plataforma Universitaria

La plataforma permite consultar información académica, realizar trámites
y acceder a los servicios institucionales.

Ingreso: utiliza tu usuario y contraseña proporcionados por la universidad.
¿Olvidaste tu contraseña? Usa la opción "¿Olvidaste tu contraseña?" en la
página de inicio de la plataforma.

Problemas para iniciar sesión: comunícate con la Mesa de Ayuda
(Teléfono: 4-645-1300, correo: mesadeayuda@universidad.edu.bo)
o con el área de sistemas.

Para cambiar tu contraseña puedes hacerlo desde tu perfil una vez que ingreses.

Importante: este chatbot no puede consultar notas ni horarios personales
desde la plataforma; esa información la ves tú con tu propia cuenta.
        `.trim(),
        categoria: plataforma,
      }),
    );

    const respuestaDecanatos = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
Decanatos: responsables y contactos

Decanato de Ingeniería:
Responsable: Ing. Carlos Mamani (Decano).
Teléfono: 4-645-2001.
Ubicación: Bloque de Ingeniería, primer piso, oficina 101.
Horario: lunes a viernes de 08:00 a 16:00.

Decanato de Ciencias Económicas:
Responsable: Lic. Ana Gutiérrez (Decana).
Teléfono: 4-645-2002.
Ubicación: Bloque de Ciencias Económicas, primer piso, oficina 102.
Horario: lunes a viernes de 08:00 a 16:00.

Decanato de Ciencias Sociales:
Responsable: Dr. Roberto Vargas (Decano).
Teléfono: 4-645-2003.
Ubicación: Bloque de Ciencias Sociales, primer piso, oficina 103.
Horario: lunes a viernes de 08:00 a 16:00.

Decanato de Derecho:
Responsable: Dra. Lucía Choque (Decana).
Teléfono: 4-645-2004.
Ubicación: Bloque de Derecho, segundo piso, oficina 204.
Horario: lunes a viernes de 08:00 a 16:00.

Decanato de Ciencias de la Salud:
Responsable: Dr. Jorge Pinto (Decano).
Teléfono: 4-645-2005.
Ubicación: Bloque de Salud, planta baja, oficina 5.
Horario: lunes a viernes de 08:00 a 16:00.

Los decanatos brindan orientación académica general y derivan
al estudiante al área correspondiente.
        `.trim(),
        categoria: decanatos,
      }),
    );

    const respuestaAulas = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
Aulas y Ubicaciones

Bloque A: aulas 101 a 110 (planta baja y primer piso).
Bloque B: aulas 201 a 210 (segundo piso).
Bloque C: laboratorios y aulas especializadas.
Edificio Administrativo: oficinas de dirección, marketing, caja central y atención.

Cada aula tiene su número visible en la puerta; puedes guiarte por los mapas
ubicados en la entrada de cada bloque.

Importante: este chatbot NO puede consultar en qué aula tienes clases ni tu
horario personal; esa información la encuentras en la plataforma universitaria.
        `.trim(),
        categoria: aulas,
      }),
    );

    const respuestaModular = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
Sistema Modular

El sistema modular organiza las actividades académicas en módulos
o periodos de estudio. Cada módulo tiene una duración aproximada
y agrupa varias asignaturas.

Para conocer las fechas de inicio, fin y el calendario de un módulo,
consulta el calendario académico oficial publicado por la universidad
o solicita información en Secretaría General.

El chatbot no puede consultar el módulo personal de un estudiante.
        `.trim(),
        categoria: sistemaModular,
      }),
    );

    const respuestaAtencion = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
Atención Universitaria

Atención general: lunes a viernes de 08:00 a 16:00.
Caja Central: lunes a viernes de 08:00 a 16:00.
Biblioteca: lunes a viernes de 08:00 a 20:00; sábados de 09:00 a 13:00.
Mesa de Ayuda (plataforma): lunes a viernes de 08:00 a 18:00.

Para trámites específicos dirígete al área correspondiente dentro de su horario.
        `.trim(),
        categoria: atencion,
      }),
    );

    const respuestaServicios = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
Servicios de la Universidad

Biblioteca Central:
Ubicación: Bloque C, segundo piso.
Teléfono: 4-645-1400.
Horario: lunes a viernes de 08:00 a 20:00; sábados de 09:00 a 13:00.
Presta libros, salas de estudio y acceso a internet.

Laboratorios de cómputo: Bloque C. Reserva con anticipación en el área de sistemas.

Bienestar Estudiantil (orientación psicológica y social):
Ubicación: Edificio Administrativo, tercer piso, oficina 301.
Teléfono: 4-645-1500.

Deportes: canchas y gimnasio universitario. Informes: 4-645-1600.

Cafetería y comedor: edificio de servicios, planta baja.

Transporte universitario: rutas desde la plaza central; consulta horarios en portería.

Correo institucional: se asigna a cada estudiante al momento de la inscripción.

Wi-Fi universitario: red "Universidad" disponible en todos los bloques.
        `.trim(),
        categoria: servicios,
      }),
    );

    const respuestaEstudiantesNuevos = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
Bienvenido a la Universidad: guía para estudiantes nuevos

Inscripción y matrícula:
- La inscripción se realiza en las fechas publicadas en el calendario académico.
- Requisitos: cédula de identidad, certificado de nacimiento, título de bachiller
  (o certificado en trámite) y fotografías tamaño carnet.
- El pago de la matrícula se realiza en la Caja Central.

Carnet universitario: se entrega después de la inscripción.
Consulta en el área de registro académico (Teléfono: 4-645-1700).

Inducción: al inicio de cada periodo se realizan charlas de orientación
para estudiantes nuevos; revisa el calendario académico.

¿Dónde solicitar información más detallada?
- Secretaría General: Edificio Administrativo, planta baja.
- Oficina de Información: Teléfono 4-645-1800, informaciones@universidad.edu.bo.
        `.trim(),
        categoria: estudiantesNuevos,
      }),
    );

    const respuestaDirectorio = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
Directorio de Contactos

Central telefónica: 4-645-1000.
Recepción: Edificio Administrativo, planta baja. Teléfono: 4-645-1001.
Mesa de Ayuda (plataforma): 4-645-1300, mesadeayuda@universidad.edu.bo.
Secretaría General: 4-645-1700, secretaria@universidad.edu.bo.
Oficina de Información: 4-645-1800, informaciones@universidad.edu.bo.
Correo general: info@universidad.edu.bo.

Cada área tiene su teléfono y correo propio. Pregúntame el contacto
de un área específica (decanatos, cajas, marketing, biblioteca, etc.)
y te lo indico.
        `.trim(),
        categoria: directorio,
      }),
    );

    const respuestaInformacionPersonal = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
Información personal de estudiantes

Este chatbot NO tiene acceso a datos personales, por lo que no puede decirte
en qué aula tienes clases, qué materias tienes, tu horario, tus notas
ni tus calificaciones.

Para esa información:
1. Ingresa a la plataforma universitaria con tu usuario y contraseña.
2. Si tienes problemas para acceder, comunícate con la Mesa de Ayuda
   (Teléfono: 4-645-1300) o con el registro académico (Teléfono: 4-645-1700).
        `.trim(),
        categoria: informacionPersonal,
      }),
    );

    /*
    |--------------------------------------------------------------------------
    | PALABRAS CLAVE
    |--------------------------------------------------------------------------
    | CAMBIO: se incluyen variantes con y sin tildes, errores comunes y
    | abreviaturas para que la búsqueda local encuentre los temas. Además,
    | DeepSeek interpreta el mensaje y elige el tema aunque la palabra
    | clave no aparezca exacta en la base de datos.
    */

    async function crearPalabrasClave(
      palabras: string[],
      respuesta: Respuesta,
    ) {
      for (const palabra of palabras) {
        await palabraClaveRepository.save(
          palabraClaveRepository.create({
            palabras: palabra,
            respuesta,
          }),
        );
      }
    }

    /*
    |--------------------------------------------------------------------------
    | MARKETING
    |--------------------------------------------------------------------------
    */

    await crearPalabrasClave(
      [
        'marketing',
        'mercadotecnia',
        'publicidad',
        'comunicación',
        'comunicacion',
        'difusión',
        'difusion',
        'actividades',
        'campañas',
        'campanas',
        'contacto marketing',
        'telefono marketing',
        'teléfono marketing',
        'número marketing',
        'numero marketing',
        'correo marketing',
      ],
      respuestaMarketing,
    );

    /*
    |--------------------------------------------------------------------------
    | PAGOS Y CAJAS
    |--------------------------------------------------------------------------
    */

    await crearPalabrasClave(
      [
        'pago',
        'pagos',
        'pagar',
        'mensualidad',
        'mensualidades',
        'cuota',
        'cuotas',
        'arancel',
        'aranceles',
        'matrícula',
        'matricula',
        'vencimiento',
        'vencimientos',
        'fecha limite',
        'fecha límite',
        'caja',
        'cajas',
        'caja central',
        'cajero',
        'telefono caja',
        'teléfono caja',
        'número caja',
        'numero caja',
        'horario caja',
        'donde pago',
        'dónde pago',
        'como pago',
        'cómo pago',
        'procedimiento de pago',
        'comprobante',
        'recibo',
        'recibo de pago',
        'mora',
        'recargos',
        'medio de pago',
        'medios de pago',
        'transferencia',
        'efectivo',
        'débito',
        'debito',
      ],
      respuestaPagos,
    );

    /*
    |--------------------------------------------------------------------------
    | PLATAFORMA
    |--------------------------------------------------------------------------
    */

    await crearPalabrasClave(
      [
        'plataforma',
        'portal',
        'sistema',
        'usuario',
        'login',
        'iniciar sesión',
        'iniciar sesion',
        'contraseña',
        'contrasena',
        'clave',
        'password',
        'recuperar contraseña',
        'recuperar contrasena',
        'olvidé mi contraseña',
        'olvide mi contrasena',
        'olvidé mi contrasena',
        'problemas plataforma',
        'no puedo entrar',
        'no puedo ingresar',
        'acceso plataforma',
        'mesa de ayuda',
        'cambiar contraseña',
        'cambiar contrasena',
      ],
      respuestaPlataforma,
    );

    /*
    |--------------------------------------------------------------------------
    | DECANATOS
    |--------------------------------------------------------------------------
    */

    await crearPalabrasClave(
      [
        'decanato',
        'decanatos',
        'decano',
        'decana',
        'decanos',
        'decanas',
        'decanato de ingeniería',
        'decanato de ingenieria',
        'decano de ingeniería',
        'decano de ingenieria',
        'ingeniería',
        'ingenieria',
        'decanato de ciencias económicas',
        'decanato de ciencias economicas',
        'ciencias económicas',
        'ciencias economicas',
        'decanato de ciencias sociales',
        'ciencias sociales',
        'decanato de derecho',
        'derecho',
        'decanato de salud',
        'ciencias de la salud',
        'salud',
        'telefono decanato',
        'teléfono decanato',
        'número decanato',
        'numero decanato',
        'número de decanos',
        'numero de decanos',
        'telefono de decanos',
        'teléfono de decanos',
        'contacto decanato',
        'contacto decanos',
        'responsable decanato',
        'nombres de decanos',
        'nombre del decano',
        'quien es el decano',
        'quién es el decano',
        'carlos mamani',
        'ana gutierrez',
        'roberto vargas',
        'lucia choque',
        'jorge pinto',
      ],
      respuestaDecanatos,
    );

    /*
    |--------------------------------------------------------------------------
    | AULAS Y UBICACIONES
    |--------------------------------------------------------------------------
    */

    await crearPalabrasClave(
      [
        'aula',
        'aulas',
        'salón',
        'salon',
        'ubicación aula',
        'ubicacion aula',
        'ubicación de aulas',
        'ubicacion de aulas',
        'donde esta el aula',
        'dónde está el aula',
        'numero de aula',
        'número de aula',
        'bloque',
        'bloque a',
        'bloque b',
        'bloque c',
        'edificio',
        'edificio administrativo',
        'laboratorio',
        'laboratorios',
        'mapa',
        'mapas',
      ],
      respuestaAulas,
    );

    /*
    |--------------------------------------------------------------------------
    | SISTEMA MODULAR
    |--------------------------------------------------------------------------
    */

    await crearPalabrasClave(
      [
        'modular',
        'sistema modular',
        'módulo',
        'modulo',
        'módulos',
        'modulos',
        'periodo académico',
        'periodo academico',
        'calendario modular',
        'calendario académico',
        'calendario academico',
      ],
      respuestaModular,
    );

    /*
    |--------------------------------------------------------------------------
    | ATENCIÓN Y HORARIOS
    |--------------------------------------------------------------------------
    */

    await crearPalabrasClave(
      [
        'atención',
        'atencion',
        'horario',
        'horarios',
        'horario de atención',
        'horario de atencion',
        'cuando atienden',
        'cuándo atienden',
        'oficinas',
        'horario de oficinas',
        'horario de la biblioteca',
        'horario biblioteca',
        'horario de la caja',
        'horario caja',
      ],
      respuestaAtencion,
    );

    /*
    |--------------------------------------------------------------------------
    | SERVICIOS DE LA UNIVERSIDAD
    |--------------------------------------------------------------------------
    */

    await crearPalabrasClave(
      [
        'servicios',
        'servicios de la universidad',
        'biblioteca',
        'libros',
        'salas de estudio',
        'laboratorio de cómputo',
        'laboratorio de computo',
        'bienestar estudiantil',
        'psicología',
        'psicologia',
        'psicólogo',
        'psicologo',
        'deportes',
        'canchas',
        'gimnasio',
        'cafetería',
        'cafeteria',
        'comedor',
        'transporte',
        'bus',
        'correo institucional',
        'correo universitario',
        'wifi',
        'internet',
        'seguro universitario',
      ],
      respuestaServicios,
    );

    /*
    |--------------------------------------------------------------------------
    | ESTUDIANTES NUEVOS
    |--------------------------------------------------------------------------
    */

    await crearPalabrasClave(
      [
        'estudiante nuevo',
        'estudiantes nuevos',
        'inscripción',
        'inscripcion',
        'matrícula',
        'matricula',
        'requisitos',
        'documentos',
        'carnet universitario',
        'carnet de estudiante',
        'inducción',
        'induccion',
        'orientación',
        'orientacion',
        'bienvenida',
        'secretaría general',
        'secretaria general',
        'oficina de información',
        'oficina de informacion',
        'donde solicitar información',
        'dónde solicitar información',
        'información más detallada',
        'informacion mas detallada',
        'dudas frecuentes',
        'preguntas frecuentes',
        'registro académico',
        'registro academico',
      ],
      respuestaEstudiantesNuevos,
    );

    /*
    |--------------------------------------------------------------------------
    | DIRECTORIO / CONTACTOS
    |--------------------------------------------------------------------------
    */

    await crearPalabrasClave(
      [
        'directorio',
        'contactos',
        'contacto',
        'teléfonos',
        'telefonos',
        'teléfono',
        'telefono',
        'número de teléfono',
        'numero de telefono',
        'números',
        'numeros',
        'teléfonos de la universidad',
        'telefonos de la universidad',
        'contactos de la universidad',
        'central telefónica',
        'central telefonica',
        'recepción',
        'recepcion',
        'quien me atiende',
        'quién me atiende',
        'a quien llamar',
        'a quién llamar',
        'como contactar',
        'correo de la universidad',
        'email',
      ],
      respuestaDirectorio,
    );

    /*
    |--------------------------------------------------------------------------
    | INFORMACIÓN PERSONAL (límite del chatbot)
    |--------------------------------------------------------------------------
    */

    await crearPalabrasClave(
      [
        'mi aula',
        'en que aula',
        'en qué aula',
        'mis materias',
        'qué materias',
        'que materias',
        'mi horario',
        'horario personal',
        'mis notas',
        'mis calificaciones',
        'calificaciones',
        'datos personales',
        'información personal',
        'informacion personal',
        'mis cursos',
        'mis clases',
      ],
      respuestaInformacionPersonal,
    );

    console.log('Categorías creadas');
    console.log('Respuestas creadas');
    console.log('Palabras clave creadas');

    await dataSource.destroy();

    console.log('Seed terminado correctamente');
  } catch (error) {
    console.error('Error ejecutando seed:', error);

    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }

    process.exit(1);
  }
}

seed();
