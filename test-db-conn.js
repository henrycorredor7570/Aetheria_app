import dotenv from 'dotenv';
dotenv.config();

import { conn } from './src/db.js';

console.log('🔍 Intentando conectar a la base de datos...\n');

try {
  await conn.authenticate();
  console.log('✅ Conexión exitosa a la base de datos');
  console.log(`📊 Modelos cargados: ${Object.keys(conn.models).join(', ')}`);
  process.exit(0);
} catch (error) {
  console.error('❌ Error de conexión:');
  console.error(`   ${error.message}`);
  console.error('\n💡 Verifica que:');
  console.error('   - Las variables de entorno (.env) estén correctas');
  console.error('   - DATABASE_URL O (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) existan');
  console.error('   - La base de datos esté accesible desde tu máquina');
  process.exit(1);
}
