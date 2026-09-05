import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';

import { Categoria } from '../categoria/entities/categoria.entity';
import { Respuesta } from '../respuesta/entities/respuesta.entity';
import { PalabraClave } from '../palabra-clave/entities/palabra-clave.entity';
import { Chatbot } from '../chatbot/entities/chatbot.entity';
import { Consulta } from '../consulta/entities/consulta.entity';

/*
| Conexión DB
*/
const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USER ?? 'ciel',
  password: process.env.DB_PASSWORD ?? 'xiel13!',
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
    const palabraClaveRepository = dataSource.getRepository(PalabraClave);    

    // LIMPIAR DATOS ANTERIORES
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0');

    await palabraClaveRepository.clear();
    await respuestaRepository.clear();
    await categoriaRepository.clear();

    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('Datos anteriores eliminados');

    // CATEGORÍAS
    const marketing = await categoriaRepository.save(
      categoriaRepository.create({
        nombre: 'Marketing',
        descripcion: 'Comunicación institucional y actividades',
      }),
    );

    const pagos = await categoriaRepository.save(
      categoriaRepository.create({
        nombre: 'Pagos',
        descripcion: 'Cajas, fechas límite y procedimientos de pago modalidad presencial como semipresencial',
      }),
    );

    const plataforma = await categoriaRepository.save(
      categoriaRepository.create({
        nombre: 'Plataforma',
        descripcion: 'Funcionamiento de la plataforma universitaria y problemas de acceso',
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
        descripcion: 'Otorgar un enlace que redirige al portal académico del estudiante',
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

    const informacionPersonal = await categoriaRepository.save(
      categoriaRepository.create({
        nombre: 'Información Personal Aula',
        descripcion: 'Aclara que el chatbot no accede a datos personales',
      }),
    );

    const carreras = await categoriaRepository.save(
      categoriaRepository.create({
        nombre: 'Carreras',
        descripcion: 'Información sobre las carreras profesionales',
      }),
    );

    const ubicacionUPDS = await categoriaRepository.save(
      categoriaRepository.create({
        nombre: 'Ubicación de la Universidad',
        descripcion: 'Información de la ubicación de la universidad',
      }),
    );

    const becas = await categoriaRepository.save(
      categoriaRepository.create({
        nombre: 'Becas',
        descripcion: 'Información de Becas de la universidad',
      }),
    );

    // RESPUESTAS
    const respuestaMarketing = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
          Área de Marketing

          Horario de atención: Lunes a viernes de 08:00 a 12:30 y de 15:00 a 19:30 | Sábados: 08:30 a 12:30 
          Responsable: Lic. Andrés Cueto (Asesor Comercial).
          Ubicación: Edificio Administrativo, planta baja 
          Celular: 74163220
          Funciones: comunicación institucional, actividades, campañas y difusión de información universitaria. 

          Si quieres participar en una actividad, acércate a esta oficina.
        `.trim(),
        categoria: marketing,
      }),
    );

    const respuestaPagos = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
          Pagos, Cajas e Ing. Marcelo Taboada Mendoza

          Caja Central:
          Ubicación: Planta baja del Edificio Administrativo.
          Celular: 69672492
          Horario: Lunes a viernes de 08:00 a 12:30 y de 15:00 a 19:30.

          Secretaría General: Ing. Marcelo Taboada Mendoza
          Celular: 76111383
          Correo electrónico: marcelo.taboada@upds.edu.bo

          Medios de pago: efectivo, tarjeta de débito, depósito o transferencia bancaria.
          Se entrega comprobante de cada pago: conserva siempre tu recibo.

          Fechas límite de pago:
          - Matrícula: primera quincena del periodo correspondiente.
          - Cuotas mensuales: vencen el día 10 de cada mes.
          - Las fechas exactas se publican en el calendario académico oficial; consúltalo siempre antes de pagar.

          Procedimiento de pago:
          1. Acércate a la Caja Central con tu carnet universitario o cédula de identidad.
          2. Indica el concepto de pago (matrícula, cuota, arancel).
          3. Realiza el pago y conserva el comprobante.

          Si tienes deudas o demoras, acude a la Caja para regularizar tu situación y evitar recargos.
        `.trim(),
        categoria: pagos,
      }),
    );

    const respuestaPlataforma = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
          Plataforma Universitaria

          Sirve para que el estudiante pueda gestionar y consultar diferentes aspectos académicos. Entre sus funciones están consultar materias y horarios, revisar calificaciones, acceder a información académica, realizar o consultar actividades, revisar comunicados, gestionar procesos relacionados con la inscripción y matrícula y acceder a recursos o servicios que la universidad pone a disposición de los estudiantes.

          Entrega de Trabajos: los estudiantes pueden subir sus tareas y trabajos mediante la plataforma universitaria virtual, dentro de la materia correspondiente. El docente publica la actividad, indica las instrucciones y la fecha límite, y el estudiante debe subir allí el archivo o trabajo solicitado.

          Pasos que debes seguir para entregar tareas y trabajos:
          1. Al ingresar al enlace, entra al área asignada (UPDS NET)
          2. Haz clic sobre las tres líneas que están en la esquina superior derecha y dirígete a (Histórico Registro)
          3. Ingresa a la materia pendiente que tienes (Ir a Curso)
          4. Al estar en la materia correspondiente, dirígete hacia la parte inferior
          5. Podrás observar los trabajos que están pendientes como también los entregados

          Enlace oficial: https://portal.upds.edu.bo/ 

          Ingreso: utiliza tu usuario y contraseña proporcionados por la universidad.
          ¿Olvidaste tu contraseña? Usa la opción "¿Olvidaste tu contraseña?" en la página de inicio de la plataforma.

          Problemas para iniciar sesión: comunícate con el Ing. Ignacio Vaca (Teléfono: 77040459, correo: jose.vaca@upds.edu.bo) o con el área de Sistemas.

          Para cambiar tu contraseña puedes hacerlo desde tu perfil una vez que ingreses.

          Importante: este chatbot no puede consultar notas ni horarios personales desde la plataforma; esa información la ves tú con tu propia cuenta.
        `.trim(),
        categoria: plataforma,
      }),
    );

    const respuestaDecanatos = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
          Decanatos: responsables y contactos

          Decanato de Ingeniería:
          Responsable: Ing. Tania Coro (Decana).
          Celular: 77348103
          Ubicación: Primer piso, bloques académicos.
          Horario: Lunes a viernes de 08:00 a 16:00.

          Decanato de Ciencias Empresariales:
          Responsable: Lic. Zandra Bellido (Decana).
          Celular: 69672494.
          Ubicación: Primer piso, bloques académicos.
          Horario: Lunes a viernes de 08:00 a 16:00.

          Decanato de Ciencias Jurídicas:
          Responsable: Lic. Wara Alurralde.
          Celular: 77040632.
          Ubicación: Primer piso, bloques académicos.
          Horario: Lunes a viernes de 08:00 a 16:00.

          Jefe de Modalidad Semipresencial:
          Responsable: Lic. Jesús Escalante.
          Celular: 74165912.
          Ubicación: Primer piso, bloques académicos.
          Horario: Lunes a viernes de 08:00 a 16:00.

          Decanato de Ciencias de la Salud:
          Responsable: Dra. Ingrid Cuellar Callejas (Decana).
          Teléfono: 4-645-2005.
          Ubicación: Bloque de Salud, planta baja, oficina 5.
          Horario: Lunes a viernes de 08:00 a 16:00.

          Los decanatos brindan orientación académica general y derivan al estudiante al área correspondiente.
        `.trim(),
        categoria: decanatos,
      }),
    );

    const respuestaAulas = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
          Aulas y Ubicaciones

          Bloque A: aulas 1 a 8 (planta baja y primer piso), Cómputo 1, Cómputo 2 y Decanaturas.
          Bloque B: aulas 1 a 8 (segundo piso), Cómputo 3, Laboratorio de Física y Gabinete de Fisioterapia.
          Bloque C: aulas 1 a 8, Salón Auditorio y baños.
          Bloque E: aulas 1 a 8 en el último piso de la universidad.
          Bloque F: aulas 1 a 8 en el último piso, ubicado en el bloque de Medicina.
          Edificio Administrativo: Marketing, Registros, Cajas, Sistemas y Rectorado.

          Cada aula tiene su número visible en la puerta; puedes guiarte por los mapas ubicados en la entrada de cada bloque.

          Importante: este chatbot no puede consultar en qué aula tienes clases ni tu horario personal; esa información la encuentras en la plataforma universitaria.
        `.trim(),
        categoria: aulas,
      }),
    );

    const respuestaModular = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
          Sistema Modular
          
          Consiste en organizar las materias en módulos consecutivos, cursando una materia por mes, en lugar de llevar varias materias al mismo tiempo durante todo un semestre. Durante ese mes te concentras principalmente en esa asignatura, realizando sus clases, trabajos, prácticas y evaluaciones, y cuando termina el módulo pasas a la siguiente materia.
          
          Para conocer las fechas de inicio, fin y el calendario de un módulo, consulta el calendario académico oficial publicado por la universidad o solicita información en Secretaría General.

          El chatbot no puede consultar el módulo personal de un estudiante.
        `.trim(),
        categoria: sistemaModular,
      }),
    );

    const respuestaAtencion = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
          Horarios de atención

          Atención general: Lunes a viernes de 08:00 a 19:30.
          Caja Central: Lunes a viernes de 08:00 a 19:30.
          Biblioteca: Lunes a viernes de 08:00 a 21:00 (Ubicación: Bloque C en dirección a la cafetería).
          Sistemas (Plataforma): Lunes a viernes de 08:00 a 19:00.
          Marketing: Lunes a viernes de 08:00 a 12:30 y de 15:00 a 19:30 | Sábados: 08:30 a 12:30.

          Horarios de Clases:
          - Turno Mañana: 08:00 a 11:00
          - Turno Tarde: 14:30 a 17:30
          - Turno Noche: 19:00 a 22:00

          Para trámites específicos dirígete al área correspondiente dentro de su horario.
        `.trim(),
        categoria: atencion,
      }),
    );

    const respuestaServicios = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
          Servicios de la Universidad

          Beneficios: oportunidades de prácticas profesionales mediante convenios.
          Cafetería: 3er piso.
          Biblioteca Virtual y Biblioteca Central.
          Correo institucional: se asigna a cada estudiante al momento de la inscripción.
          Descuentos en negocios afiliados presentando tu carnet universitario.
          Wi-Fi universitario: red "UniversidadUPDS" disponible en todos los bloques.
          Sedes: La universidad, al tener presencia en los nueve departamentos de Bolivia, permite la ventaja de cambiarte de ciudad sin perder materias ni retrasar tu carrera, ya que todas las sedes usan el mismo plan de estudios y sistema modular. Además, esta enorme red nacional multiplica tus opciones de prácticas profesionales por sus convenios en todo el país.
          
          Modalidad Semipresencial: La modalidad semipresencial de la Universidad Privada Domingo Savio sede Sucre es un sistema educativo flexible diseñado para que personas que trabajan, tienen responsabilidades familiares o viven lejos de la ciudad puedan obtener un título universitario sin descuidar sus actividades cotidianas, asistiendo únicamente los días sábados en el turno mañana de 08:00 am a 12:00 pm.
        `.trim(),
        categoria: servicios,
      }),
    );

    const respuestaInformacionPersonal = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
          Información personal de estudiantes

          Este chatbot NO tiene acceso a datos personales, por lo que no puede decirte en qué aula tienes clases, qué materias tienes, tu horario, tus notas ni tus calificaciones.

          Para esa información:
          Ingresa a la plataforma universitaria con tu usuario y contraseña mediante este enlace: https://portal.upds.edu.bo/ 

          Pasos que debes seguir para ver tus notas:
          1. Al ingresar al enlace, entra al área asignada (UPDS NET).
          2. Haz clic sobre las tres líneas que están en la esquina superior derecha y dirígete a (Histórico Registro).
          3. Ingresa a la materia pendiente que tienes (Ir a Curso).
          4. En la parte superior, dirígete a Calificaciones y podrás ver tus notas.

          SEGUNDO MÉTODO MATERIAS:
          1. Haz clic sobre las tres líneas que están en la esquina superior derecha y dirígete a (Seguimiento & Registro).
          2. En este apartado verás las materias que cursaste y las que te faltan. Cada materia aprobada está marcada en verde; en la esquina superior indica el nombre de la materia y la nota obtenida.
        `.trim(),
        categoria: informacionPersonal,
      }),
    );

    const respuestaCarreras = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
          Facultades y carreras

          Facultad de Ciencias Jurídicas: Derecho.
          Facultad de Ciencias Empresariales: Administración de Empresas, Contaduría Pública, Ingeniería Comercial y Marketing y Publicidad.
          Facultad de Ingeniería: Ingeniería de Sistemas, Ingeniería Industrial, Ingeniería en Redes y Telecomunicaciones, Ingeniería en Gestión Petrolera.
          Facultad de Ciencias Sociales: Psicología.
          Facultad de Ciencias de la Salud: Medicina, Fisioterapia y Kinesiología.

          Carreras Semipresenciales: Derecho semipresencial, Administración de Empresas semipresencial, Ingeniería Comercial semipresencial, Ciencias de la Comunicación Social semipresencial, Psicología semipresencial.
          
          Información de las carreras:
          Para obtener información sobre tu carrera, consulta al decano asignado de tu facultad o dirígete al Área de Marketing.

          Responsables de Facultades:
          - Área de Marketing: Lic. Andrés Cueto (Asesor Comercial) | Ubicación: Edificio Administrativo, planta baja | Celular: 74163220 | Horario: Lunes a viernes de 08:00 a 12:30 y de 15:00 a 19:30, Sábados: 08:30 a 12:30.
          - Carreras de Ingeniería: Ing. Tania Coro | Celular: 77348103 | Ubicación: Primer piso, bloques académicos.
          - Carreras de Ciencias Empresariales: Lic. Zandra Bellido | Celular: 69672494 | Ubicación: Primer piso, bloques académicos.
          - Carreras de Ciencias Jurídicas: Lic. Wara Alurralde | Celular: 77040632 | Ubicación: Primer piso, bloques académicos.
          - Carreras en Modalidad Semipresencial: Lic. Jesús Escalante | Celular: 74165912 | Ubicación: Primer piso, bloques académicos.
          - Carreras de Ciencias de la Salud: Dra. Ingrid Cuellar | Ubicación: Bloque de Salud, planta baja, oficina 5.
        `.trim(),
        categoria: carreras,
      }),
    );
    
    const respuestaubicacionUPDS = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
          Información de la Universidad

          La Universidad Privada Domingo Sabio sede Sucre se encuentra ubicada en Cacique Titu # 175, Zona Villa Charcas.
        `.trim(),
        categoria: ubicacionUPDS,
      }),
    );

    const respuestaBecasUPDS = await respuestaRepository.save(
      respuestaRepository.create({
        respuesta: `
          Información de becas UPDS 

          Una beca es una ayuda que brinda la UPDS a los estudiantes para reducir o cubrir parte de los costos de sus estudios. La universidad ofrece diferentes tipos de becas por excelencia académica. Cada beca tiene requisitos y porcentajes de cobertura diferentes.

          Becas de estudio UPDS Sede Sucre:
          La Universidad Privada Domingo Savio (UPDS) sede Sucre ofrece becas de estudio a los estudiantes de acuerdo con su rendimiento académico y sus notas. Se ofrecen becas de estudio del 50% y 100% en relación a tu rendimiento académico.

          Para acceder a la beca:
          - El estudiante debe solicitar formalmente la beca al momento de realizar su inscripción.
          - El estudiante debe cumplir con los requisitos establecidos por la universidad.

          Información adicional:
          Para obtener más información sobre las becas y sus requisitos, el estudiante debe comunicarse con el Área de Marketing.
        `.trim(),
        categoria: becas,
      }),
    );

    // PALABRAS CLAVE
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

    // Marketing
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

    // Cajas y pagos
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
        'donde esta caja central',
        'dónde está caja central',
        'ubicacion caja central',
        'ubicación caja central',
        'horario caja central',
        'telefono caja central',
        'teléfono caja central',
        'numero caja central',
        'número caja central',
        'contacto caja central',
      ],
      respuestaPagos,
    );

    // Plataforma Universitaria
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

    // Decanos
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
        'decanato de ciencias empresariales',
        'decano de ciencias empresariales',
        'ciencias empresariales',
        'decanato de derecho',
        'decanato de salud',
        'ciencias de la salud',
        'salud',
        'jefe de modalidad semipresencial',
        'jefe semipresencial',
        'modalidad semipresencial',
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
        'tania coro',
        'zandra bellido',
        'wara alurralde',
        'jesus escalante',
        'jesús escalante',
        'ingrid cuellar',
        'ingrid cuellar callejas',
      ],
      respuestaDecanatos,
    );

    // Aulas y bloques
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
        'bloque e',
        'bloque f',
        'edificio',
        'edificio administrativo',
        'laboratorio',
        'laboratorios',
        'mapa del bloque',
        'mapa de aulas',
        'mapas de los bloques',
      ],
      respuestaAulas,
    );

    // Sistema modular
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

    // Horarios de atención
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
        'biblioteca',
        'horario biblioteca',
        'horario de biblioteca',
        'horario de la biblioteca',
        'ubicacion biblioteca',
        'ubicación biblioteca',
        'donde esta biblioteca',
        'dónde está la biblioteca',
      ],
      respuestaAtencion,
    );

    // Servicios de la Universidad
    await crearPalabrasClave(
      [
        'servicios',
        'servicios de la universidad',
        'biblioteca virtual',
        'biblioteca central',
        'prácticas profesionales',
        'practicas profesionales',
        'convenios',
        'cafetería',
        'cafeteria',
        'correo institucional',
        'correo universitario',
        'wifi',
        'internet',
        'descuentos',
        'descuento',
        'carnet universitario',
        'semipresencial',
        'semi presencial',
      ],
      respuestaServicios,
    );

    // Información Personal Aula
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

    // Carreras
    await crearPalabrasClave(
      [
        'carreras',
        'carrera',
        'carreras de la upds',
        'carreras upds',
        'carreras que ofrece',
        'carreras disponibles',
        'qué carreras ofrecen',
        'que carreras ofrecen',
        'qué carreras tiene',
        'que carreras tiene',
        'qué puedo estudiar',
        'que puedo estudiar',
        'oferta académica',
        'oferta academica',
        'facultades',
        'facultad',
        'ingenierías',
        'ingenierias',
        'ingeniería de sistemas',
        'ingenieria de sistemas',
        'ingeniería industrial',
        'ingenieria industrial',
        'ingeniería comercial',
        'ingenieria comercial',
        'derecho',
        'medicina',
        'psicología',
        'psicologia',
        'contaduría pública',
        'contaduria publica',
        'administración de empresas',
        'administracion de empresas',
        'marketing y publicidad',
        'fisioterapia y kinesiología',
        'fisioterapia y kinesiologia',
        'redes y telecomunicaciones',
        'gestión petrolera',
        'gestion petrolera',
        'información de mi carrera',
        'informacion de mi carrera',
        'información sobre mi carrera',
        'informacion sobre mi carrera',
        'información carrera',
        'informacion carrera',
        'información de la carrera',
        'informacion de la carrera',
        'información sobre la carrera',
        'informacion sobre la carrera',
        'mi carrera',
        'mi carrera universitaria',
        'mi carrera profesional',
        'carrera que estudio',
        'carrera que estoy estudiando',
        'sobre mi carrera',
        'sobre la carrera',
        'quiero información de mi carrera',
        'quiero informacion de mi carrera',
        'quiero saber sobre mi carrera',
        'quiero saber de mi carrera',
        'necesito información de mi carrera',
        'necesito informacion de mi carrera',
        'dame información de mi carrera',
        'dame informacion de mi carrera',
        'más información de mi carrera',
        'mas informacion de mi carrera',
        'datos de mi carrera',
        'información académica de mi carrera',
        'informacion academica de mi carrera',
        'información de mi carrera universitaria',
        'informacion de mi carrera universitaria',
        'plan de estudios de mi carrera',
        'materias de mi carrera',
        'materias de la carrera',
        'asignaturas de mi carrera',
        'duración de mi carrera',
        'duracion de mi carrera',
        'perfil de mi carrera',
        'campo laboral de mi carrera',
        'salida laboral de mi carrera',
        'requisitos de mi carrera',
        'horarios de mi carrera',
        'modalidad de mi carrera',
        'dónde se estudia mi carrera',
        'donde se estudia mi carrera',
      ],
      respuestaCarreras,
    );
    
    // Ubicación UPDS
    await crearPalabrasClave(
      [
        'ubicación',
        'ubicacion',
        'dónde queda',
        'donde queda',
        'dónde están',
        'donde estan',
        'dirección',
        'direccion',
        'direcciones',
        'dónde se encuentra',
        'donde se encuentra',
        'sedes',
        'sede',
        'campus',
        'sucursal',
        'sucursales',
        'cómo llegar',
        'como llegar',
        'localización',
        'localizacion',
        'en qué lugar está',
        'en que lugar esta',
        'dirección de la upds',
        'direccion de la upds',
        'ubicación upds',
        'ubicacion upds',
        'dónde queda la upds',
        'donde queda la upds',
        'dónde está la upds',
        'donde esta la upds',
        'sedes upds',
        'sede upds',
        'dirección exacta',
        'direccion exacta',
        'en qué departamentos está',
        'en que departamentos esta',
        'dónde estudiar upds',
        'donde estudiar upds',
        'donde esta la universidad',
        'dónde está la universidad',
        'donde esta la upds',
        'dónde está la upds',
        'ubicacion universidad',
        'ubicación universidad',
        'direccion universidad',
        'dirección universidad',
      ],
      respuestaubicacionUPDS,
    );

    // Becas
    await crearPalabrasClave(
      [
        'beca',
        'becas',
        'beca upds',
        'becas upds',
        'beca universitaria',
        'becas universitarias',
        'beca de estudio',
        'becas de estudio',
        'ayuda económica',
        'ayuda economica',
        'apoyo económico',
        'apoyo economico',
        'beneficio estudiantil',
        'beneficios estudiantiles',
        'descuento en la universidad',
        'descuentos universidad',
        'cómo obtener una beca',
        'como obtener una beca',
        'cómo conseguir una beca',
        'como conseguir una beca',
        'cómo solicitar una beca',
        'como solicitar una beca',
        'cómo postular a una beca',
        'como postular a una beca',
        'requisitos para una beca',
        'requisitos beca',
        'requisitos de becas',
        'postulación a becas',
        'postulacion a becas',
        'solicitud de beca',
        'solicitud de becas',
        'qué becas ofrece la upds',
        'que becas ofrece la upds',
        'becas que ofrece la upds',
        'tipos de becas',
        'tipo de becas',
        'beca social',
        'beca social solidaria',
        'beca por excelencia',
        'beca excelencia académica',
        'beca excelencia academica',
        'beca deportiva',
        'beca cultural',
        'beca por convenio',
        'beca convenios institucionales',
        'beca comunidad universitaria',
        'beca trabajo',
        'beca UPDSol',
        'beca para bachilleres',
        'beca para estudiantes',
        'beca para nuevos estudiantes',
        'cuánto cubre la beca',
        'cuanto cubre la beca',
        'porcentaje de beca',
        'porcentaje de las becas',
        'cuánto es la beca',
        'cuanto es la beca',
        'beca del 100%',
        'beca completa',
        'media beca',
        'beca parcial',
        'beca total',
        'fecha para postular a becas',
        'convocatoria de becas',
        'convocatorias de becas',
      ],
      respuestaBecasUPDS,
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
