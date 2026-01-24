import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

console.log('🔐 Generando y verificando JWT...\n');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('❌ Error: JWT_SECRET no está definido en .env');
  console.error('💡 Añade JWT_SECRET=tu_secreto en tu archivo .env');
  process.exit(1);
}

try {
  // Generar un token de prueba
  const payload = { id: 1, email: 'test@example.com', role: 'user' };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  
  console.log('✅ Token generado exitosamente:');
  console.log(`   ${token}\n`);
  
  // Verificar el token
  const decoded = jwt.verify(token, JWT_SECRET);
  console.log('✅ Token verificado correctamente:');
  console.log(`   ID: ${decoded.id}`);
  console.log(`   Email: ${decoded.email}`);
  console.log(`   Role: ${decoded.role}`);
  console.log(`   Expira en: ${new Date(decoded.exp * 1000).toLocaleString()}`);
  
  process.exit(0);
} catch (error) {
  console.error('❌ Error al trabajar con JWT:');
  console.error(`   ${error.message}`);
  console.error('\n💡 Verifica que JWT_SECRET esté correctamente definido en .env');
  process.exit(1);
}
