# 🚀 Backend Ikualo

Servidor backend desarrollado con **NestJS**, usando **TypeScript**, **Mongoose**, y varias herramientas modernas de desarrollo y testing.

---

## 📦 Stack Tecnológico

- **NestJS** `^11.0.1`
- **TypeScript** `^5.7.3`
- **Mongoose** `^8.13.1`
- **Jest** para testing
- **Clerk** para autenticación
- **Swagger** para documentación
- **ESLint** + **Prettier** para linting y formateo

---

## 📁 Estructura de Proyecto

```txt
backend-ikualo/
├── src/
│   ├── modules/          # Módulos de la app
│   ├── common/           # Utilidades y middlewares
│   ├── main.ts           # Punto de entrada
│   └── app.module.ts     # Módulo principal
├── test/                 # Tests e2e
├── dist/                 # Código compilado
├── package.json
├── tsconfig.json
└── .eslintrc / .prettierrc
```

---

## 📜 Scripts Disponibles

| Comando             | Descripción                                |
|---------------------|--------------------------------------------|
| `npm run start`     | Inicia la aplicación                        |
| `npm run start:dev` | Inicia en modo desarrollo (watch)           |
| `npm run start:debug` | Inicia en modo debug                      |
| `npm run start:prod` | Corre el build de producción               |
| `npm run build`     | Compila el proyecto (Nest CLI)             |
| `npm run lint`      | Linting y auto-fix                          |
| `npm run format`    | Formatea el código con Prettier            |
| `npm run test`      | Ejecuta todos los tests                     |

---

## 🔐 Autenticación

Este backend usa [**Clerk**](https://clerk.dev/) para manejar la autenticación. Requiere configuración adicional con claves de Clerk en variables de entorno.

---

## 📚 Documentación de API

Está integrada con **Swagger**. Cuando la app está corriendo, podés acceder a la documentación en:

```
http://localhost:3000/api
```

---

## 🧪 Testing

Utiliza `jest` para testing unitario y de integración. La configuración se encuentra en la sección `jest` del `package.json`.

---

## ✅ Requisitos

- Node.js `^18.x`
- npm `^9.x` o superior

---

## 💻 Desarrollo

```bash
# Instalación de dependencias
npm install

# Levantar en modo desarrollo
npm run start:dev
```

---

## 🧹 Linting y Formateo

```bash
# Lint con autofix
npm run lint

# Formateo con Prettier
npm run format
```

---

## 📦 Dependencias

```txt
@clerk/backend
@clerk/express
@nestjs/common
@nestjs/config
@nestjs/core
@nestjs/mongoose
@nestjs/platform-express
@nestjs/swagger
chalk
class-transformer
class-validator
joi
mongoose
morgan
reflect-metadata
rxjs
```

---

## 🛠️ DevDependencies

```txt
@eslint/eslintrc
@eslint/js
@nestjs/cli
@nestjs/schematics
@nestjs/testing
@swc/cli
@swc/core
@types/express
@types/jest
@types/node
@types/supertest
eslint
eslint-config-prettier
eslint-plugin-prettier
globals
jest
prettier
source-map-support
supertest
ts-jest
ts-loader
ts-node
tsconfig-paths
typescript
typescript-eslint
```

---

## 👨‍💻 Autor

Creado por Dacosta96

---
