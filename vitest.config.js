import { defineConfig } from 'vitest/config';

export default defineConfig({
    test:{
        enviroment: 'node', //usamos entorno node.js para el backend
        globals: true,  // permite usar describe, it, expect sin importar
        include: ['__tests__/**/*.test.js'], //ruta de mis tests
    },
});