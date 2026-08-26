# Chatbot Universitario

Backend de un chatbot universitario hecho con NestJS, MySQL y DeepSeek.

## Requisitos

- Node.js 20 o superior
- npm
- MySQL 8 o superior
- Una API key de DeepSeek, si se desea usar la clasificación inteligente

## Instalación en otro dispositivo

1. Clona el proyecto y entra en su carpeta:

```bash
git clone URL_DEL_REPOSITORIO
cd ChatbotBackend
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea una base de datos vacía en MySQL:

```sql
CREATE DATABASE chatbot;
```

4. Crea un archivo `.env` en la raíz del proyecto con tus propios datos:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=TU_PASSWORD_DE_MYSQL
DB_NAME=chatbot

DEEPSEEK_API_KEY=TU_API_KEY_DE_DEEPSEEK
DEEPSEEK_URL=https://api.deepseek.com/chat/completions

PORT=3000
```

Si no configuras `DEEPSEEK_API_KEY`, el chatbot puede responder usando la búsqueda local y los datos de MySQL.

5. Inicia el proyecto si es primera vez:

```bash
npm run start:dev
```

6. En otra terminal ejecuta el comando y carga los datos iniciales de la DB:

```bash
npm run seed
```

7. Abre el chatbot en:

```text
http://localhost:3000
```

## Comandos útiles

```bash
npm run start:dev  # desarrollo con reinicio automático
npm run build      # compilar el proyecto
npm run start:prod # ejecutar la versión compilada
npm run test       # ejecutar pruebas
```

## Problemas comunes

- **Error de conexión con MySQL:** verifica que MySQL esté iniciado y que los datos de `.env` sean correctos.
- **La base de datos no existe:** ejecuta `CREATE DATABASE chatbot;`.
- **El puerto 3000 está ocupado:** cambia `PORT` en `.env` y abre el nuevo puerto en el navegador.
- **No responde con IA:** revisa `DEEPSEEK_API_KEY`; sin esa clave seguirá funcionando el modo local.
