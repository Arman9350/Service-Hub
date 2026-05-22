# Service-Hub

A comprehensive service management platform built with TypeScript and modern web technologies.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Development](#development)
- [Build & Deployment](#build--deployment)
- [Available Scripts](#available-scripts)
- [Project Features](#project-features)
- [API Server](#api-server)
- [Database](#database)
- [Validation](#validation)
- [Contributing](#contributing)
- [License](#license)
- [Support & Links](#support--links)

## Overview

Service-Hub is a monorepo project designed to provide a centralized hub for managing various services. It combines an API server with database utilities and validation schemas to create a robust backend infrastructure. Built with TypeScript for type safety and modern development practices.

## Tech Stack

- **Language**: TypeScript (97% of codebase)
- **Runtime**: Node.js
- **API Framework**: Express.js 5.2.1
- **Database ORM**: Drizzle ORM
- **Validation**: Zod
- **Package Manager**: pnpm (required)
- **Development Tools**: TSX, Prettier 3.8.3
- **Logging**: Pino with HTTP integration
- **Middleware**: CORS, Cookie Parser
- **Styling**: CSS (1.6% of codebase)

## Project Structure

```
Service-Hub/
├── artifacts/
│   ├── api-server/                 # Express API server
│   │   ├── src/
│   │   ├── dist/                   # Compiled output
│   │   ├── build.mjs               # Build configuration
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── api-zod/                    # Zod validation schemas
│   │   ├── src/
│   │   └── package.json
│   │
│   └── db/                         # Database utilities & Drizzle ORM
│       ├── src/
│       └── package.json
│
├── scripts/                        # Utility and build scripts
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
│
├── package.json                    # Workspace root configuration
├── tsconfig.json                   # TypeScript configuration
└── pnpm-workspace.yaml            # pnpm workspace config
```

## Getting Started

### Prerequisites

- **Node.js** 18.0.0 or higher
- **pnpm** 8.0.0 or higher ([Installation Guide](https://pnpm.io/installation))

> **Important**: This project uses pnpm exclusively. Using npm or yarn will trigger an error.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Arman9350/Service-Hub.git
   cd Service-Hub
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

## Development

### Type Checking

```bash
# Type-check all packages
pnpm run typecheck

# Type-check only libraries
pnpm run typecheck:libs
```

### Building the Project

```bash
# Full build with type checking
pnpm run build
```

### Running the API Server

**Development Mode** (with auto-reload):
```bash
cd artifacts/api-server
pnpm run dev
```

**Production Mode**:
```bash
cd artifacts/api-server
pnpm run build
pnpm run start
```

## Build & Deployment

### Build Process

The project uses a custom build system with esbuild for optimal bundling:

```bash
# Build API Server
cd artifacts/api-server
pnpm run build
```

### Environment Variables

Create a `.env` file in `artifacts/api-server/`:
```env
NODE_ENV=production
PORT=3000
```

### Running in Production

```bash
cd artifacts/api-server
NODE_ENV=production pnpm run start
```

The server will be available at `http://localhost:3000` (default port).

## Available Scripts

### Root Workspace

| Script | Description |
|--------|-------------|
| `pnpm run build` | Build all packages with type checking |
| `pnpm run typecheck` | Type-check all packages including artifacts |
| `pnpm run typecheck:libs` | Type-check library files only |

### API Server (`artifacts/api-server`)

| Script | Description |
|--------|-------------|
| `pnpm run dev` | Start development server with auto-rebuild |
| `pnpm run build` | Bundle and prepare for production |
| `pnpm run start` | Start production server |
| `pnpm run typecheck` | Validate TypeScript types |

### Scripts Package (`scripts`)

| Script | Description |
|--------|-------------|
| `pnpm run hello` | Run hello world script |
| `pnpm run typecheck` | Type-check scripts |

## Project Features

- ✅ **Monorepo Architecture**: Organized workspace with shared packages
- ✅ **Type-Safe**: Full TypeScript support across all packages
- ✅ **Express API Server**: RESTful API with modern middleware
- ✅ **Database Integration**: Drizzle ORM for type-safe database operations
- ✅ **Validation**: Zod-based request/response validation schemas
- ✅ **Logging**: Structured logging with Pino
- ✅ **CORS Support**: Cross-origin resource sharing configured
- ✅ **Cookie Management**: Secure cookie parsing and handling
- ✅ **Development Tools**: Hot reloading and source maps in development
- ✅ **Code Quality**: Prettier for consistent code formatting

## API Server

The API server is built with Express.js and provides:

- RESTful endpoints
- CORS support for cross-origin requests
- Cookie-based session management
- Structured request/response logging
- Type-safe routing and validation
- Error handling middleware

### Starting the API Server

```bash
# Development
cd artifacts/api-server
pnpm run dev

# The server runs on http://localhost:5000 (check environment config)
```

## Database

Database operations are handled through **Drizzle ORM** with SQL support. The `@workspace/db` package provides:

- Database schema definitions
- Type-safe queries
- Migration management
- Connection pooling

Configure your database connection in environment variables.

## Validation

The `@workspace/api-zod` package provides Zod schemas for:

- Request body validation
- Response data validation
- Type inference from schemas
- API contract enforcement

## Workspace Dependencies

### Package Relationships

```
api-server
├── depends on: api-zod (validation schemas)
├── depends on: db (database utilities)
└── depends on: express, pino, cors, cookie-parser
```

All packages are interconnected through the pnpm workspace, enabling code sharing and consistent versioning.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Run `pnpm run typecheck` before submitting PRs
- Format code with Prettier (configured in `package.json`)
- Write meaningful commit messages

## Testing

Currently, no automated tests are configured. Testing utilities can be added to this project as needed.

## Troubleshooting

### "Use pnpm instead" Error
This error occurs when trying to install with npm or yarn. Use pnpm:
```bash
pnpm install
```

### Port Already in Use
If the default port is in use, specify a different port:
```bash
PORT=3001 pnpm run dev
```

### Type Errors
Run type checking to identify issues:
```bash
pnpm run typecheck
```

## Performance

- Built with esbuild for fast bundling
- Source maps enabled in development for easy debugging
- Pino logging for high-performance request tracking
- Optimized for quick development iteration

## Security

- Cookie parser with security options
- CORS configuration for controlled access
- Type safety prevents many runtime errors
- HTTP logging with Pino for audit trails

## License

MIT License - see LICENSE file for details

## Support & Links

- **GitHub Repository**: https://github.com/Arman9350/Service-Hub
- **Live Demo**: https://replit.com/@armansaifi9350/Service-Hub
- **Report Issues**: https://github.com/Arman9350/Service-Hub/issues

## Roadmap

Future enhancements may include:
- Automated testing framework
- Docker containerization
- GraphQL support
- WebSocket support
- Advanced caching mechanisms
- Authentication/Authorization system
- API documentation generation (Swagger/OpenAPI)

---

**Last Updated**: May 22, 2026

For questions or support, please open an issue on GitHub.
