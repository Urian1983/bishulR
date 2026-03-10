# Bishul - Gestión de pedidos para restaurante

[![Docker](https://img.shields.io/badge/Docker-Available-blue?logo=docker)](https://hub.docker.com/r/urian1983/bishul)

**Bishul** es una aplicación web diseñada para la gestión interna de pedidos en un restaurante. Permite a los comensales registrarse y realizar pedidos desde su mesa, mientras que los cocineros pueden gestionar la lista de platos y controlar el flujo de trabajo en cocina en tiempo real.  

Este proyecto es **personal** y sirve como **ejemplo para portafolio**, mostrando el uso de Java, Spring Boot y MySQL en una aplicación funcional.  

---

## Tecnologías utilizadas

- **Backend:** Java 21, Spring Boot 3.5.11, Spring Security  
- **Frontend:** JavaScript, CSS (React)   
- **Base de datos:** MySQL  
- **Logging:** Log4Js  
- **Contenedores (opcional):** Docker y Docker Compose  
- **Gestión de dependencias:** Maven  

---

## Funcionalidades principales

### Para comensales
- Registro y autenticación de usuarios.
- Visualización de la carta de platos disponibles.
- Realización de pedidos desde la mesa.
- Seguimiento del estado de sus pedidos en tiempo real.

### Para cocineros
- Creación, edición y eliminación de platos.
- Visualización de los pedidos realizados.
- Organización de la cocina según los pedidos activos.

---

## Estructura del proyecto
├── bishul-frontend/ # Archivos del frontend
├── src/ # Código fuente del backend
├── Dockerfile # Configuración para crear la imagen Docker
├── docker-compose.yml # Configuración para levantar la aplicación completa
├── pom.xml # Dependencias y configuración de Maven
├── mvnw # Wrapper de Maven para Linux/Mac
├── mvnw.cmd # Wrapper de Maven para Windows
└── .gitignore


---

## Requisitos previos

- Java 21
- Maven
- MySQL
- Docker (opcional, para levantar la app con contenedores)

---

## Instalación y ejecución

### 1️⃣ Ejecutar localmente desde el código

1. Tienes que tener Docker instalado o ejecutandose, ya sea la versión para terminal o Docker Desktop
2. En una ventaja de la terminal escribe: docker compose up --build la primera vez que lo ejecutas.
3. Abre otra terminal o una pestaña de la misma y haz el comando cd bishul-frontent, si no te sale al principio usa el tabulador
4. En la segunda terminal ejecuta npm run dev.

La aplicación estará disponible en http://localhost:8080.

Si quieres probar la app sin compilar nada:

docker run -p 8080:8080 urian1983/bishul:latest
