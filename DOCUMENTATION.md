# SERVICE-HUB: COMPREHENSIVE TECHNICAL DOCUMENTATION

**Project Submission Document**  
**Author**: Arman Saifi  
**Repository**: https://github.com/Arman9350/Service-Hub  
**Date**: May 22, 2026  
**Version**: 1.0.0  

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [Business Requirements](#3-business-requirements)
4. [System Architecture](#4-system-architecture)
5. [Technology Stack](#5-technology-stack)
6. [Project Structure](#6-project-structure)
7. [Installation & Setup](#7-installation--setup)
8. [Development Environment](#8-development-environment)
9. [API Server Architecture](#9-api-server-architecture)
10. [Database Design](#10-database-design)
11. [Validation & Schema](#11-validation--schema)
12. [Security Considerations](#12-security-considerations)
13. [Performance Optimization](#13-performance-optimization)
14. [Development Workflow](#14-development-workflow)
15. [Testing Strategy](#15-testing-strategy)
16. [Deployment Guide](#16-deployment-guide)
17. [Troubleshooting](#17-troubleshooting)
18. [Future Enhancements](#18-future-enhancements)
19. [Conclusion](#19-conclusion)
20. [Appendices](#20-appendices)

---

## 1. EXECUTIVE SUMMARY

### 1.1 Project Overview

Service-Hub is a modern, full-stack service management platform built with TypeScript and Node.js. It provides a centralized hub for managing various services with a focus on type safety, performance, and scalability.

### 1.2 Key Objectives

- **Type Safety**: Leverage TypeScript to prevent runtime errors and ensure code reliability
- **Scalability**: Design a monorepo architecture that supports growth
- **Developer Experience**: Provide a smooth development workflow with modern tooling
- **Performance**: Optimize for fast response times and efficient resource usage
- **Maintainability**: Use clean code practices and comprehensive documentation

### 1.3 Problem Statement

Many organizations struggle with managing multiple services without a centralized platform. Service-Hub addresses this by providing:
- A unified API interface
- Type-safe database operations
- Request validation and error handling
- Structured logging for monitoring
- Easy deployment and scaling

### 1.4 Solution Approach

Service-Hub implements a monorepo architecture using pnpm workspace, separating concerns into:
- **API Server**: Express.js-based REST API
- **Database Layer**: Drizzle ORM with SQL integration
- **Validation Layer**: Zod schemas for request/response validation
- **Shared Scripts**: Utility functions and build processes

### 1.5 Expected Outcomes

- A production-ready service management platform
- Comprehensive documentation and code examples
- Scalable architecture for future expansions
- Type-safe codebase with minimal runtime errors
- Easy-to-maintain project structure

---

## 2. PROJECT OVERVIEW

### 2.1 What is Service-Hub?

Service-Hub is a full-stack application designed to serve as a central management platform for various services. It combines modern web technologies to create a robust, scalable, and maintainable backend system.

### 2.2 Key Features

#### 2.2.1 API Server
- Built with Express.js 5.2.1
- RESTful architecture
- CORS support for cross-origin requests
- Cookie-based session management
- Comprehensive error handling
- Request/response logging

#### 2.2.2 Database Integration
- Drizzle ORM for type-safe queries
- SQL database support
- Migration management
- Connection pooling
- Optimized query performance

#### 2.2.3 Validation Framework
- Zod-based schema validation
- Type inference from schemas
- Request body validation
- Response data validation
- API contract enforcement

#### 2.2.4 Development Tools
- TypeScript for type safety
- Hot reloading in development
- Source maps for debugging
- Prettier for code formatting
- TSX for TypeScript execution

#### 2.2.5 Monitoring & Logging
- Pino structured logging
- HTTP request logging
- Performance metrics
- Error tracking
- Debug information

### 2.3 Target Users

- **Developers**: Need a scalable, type-safe platform
- **DevOps Engineers**: Require easy deployment and monitoring
- **System Administrators**: Want centralized service management
- **Businesses**: Seeking reliable service orchestration

### 2.4 Use Cases

1. **Microservices Management**: Coordinate multiple services
2. **API Gateway**: Route requests to appropriate services
3. **Service Discovery**: Maintain service registry
4. **Load Balancing**: Distribute traffic across instances
5. **Health Monitoring**: Track service health and status

---

## 3. BUSINESS REQUIREMENTS

### 3.1 Functional Requirements

#### 3.1.1 User Management
- User registration and authentication
- Role-based access control (RBAC)
- Permission management
- Session management

#### 3.1.2 Service Management
- Create, read, update, delete (CRUD) services
- Service configuration management
- Version control for services
- Service dependencies tracking

#### 3.1.3 Monitoring & Analytics
- Real-time service status monitoring
- Performance metrics collection
- Error rate tracking
- Request/response logging
- Uptime monitoring

#### 3.1.4 API Management
- API endpoint management
- Rate limiting
- Request throttling
- API key management
- Documentation generation

### 3.2 Non-Functional Requirements

#### 3.2.1 Performance
- Response time < 100ms for standard requests
- Support 1000+ concurrent connections
- Throughput of 10,000+ requests per minute
- Database query optimization

#### 3.2.2 Reliability
- 99.9% uptime SLA
- Automatic error recovery
- Data backup and recovery
- Disaster recovery procedures

#### 3.2.3 Security
- HTTPS/TLS encryption
- Secure authentication
- CORS configuration
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting
- Security headers

#### 3.2.4 Scalability
- Horizontal scaling support
- Load balancing ready
- Database replication support
- Caching mechanisms
- CDN integration ready

#### 3.2.5 Maintainability
- Clear code organization
- Comprehensive documentation
- Code review process
- Version control
- Automated testing

### 3.3 User Stories

#### User Story 1: Developer Setup
```
As a developer,
I want to quickly set up the development environment,
So that I can start working on features immediately.
```

**Acceptance Criteria:**
- Clear installation instructions
- Pre-configured development tools
- Fast build and start times
- Hot reloading support

#### User Story 2: Service Configuration
```
As a service administrator,
I want to configure service properties,
So that I can customize behavior for my environment.
```

**Acceptance Criteria:**
- Easy configuration interface
- Environment variable support
- Configuration validation
- Safe defaults

#### User Story 3: Monitoring
```
As a DevOps engineer,
I want to monitor service health,
So that I can quickly identify and resolve issues.
```

**Acceptance Criteria:**
- Real-time health checks
- Alert mechanisms
- Performance dashboards
- Log aggregation

---

## 4. SYSTEM ARCHITECTURE

### 4.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                            │
│              (Web, Mobile, Third-party APIs)                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway Layer                         │
│        (CORS, Authentication, Rate Limiting)                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                  API Server Layer                            │
│     (Express.js, Route Handlers, Business Logic)             │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ↓                ↓                ↓
    ┌────────┐    ┌────────────┐   ┌────────────┐
    │Database │    │Validation  │   │  Cache    │
    │Layer   │    │Layer (Zod) │   │(Optional) │
    └────────┘    └────────────┘   └────────────┘
```

### 4.2 Architectural Patterns

#### 4.2.1 Monorepo Architecture
- **pnpm Workspace**: Manages multiple packages
- **Package Isolation**: Each package has its own scope
- **Shared Dependencies**: Centralized version management
- **Cross-package References**: Seamless inter-package imports

#### 4.2.2 Layered Architecture
1. **Presentation Layer**: API endpoints
2. **Business Logic Layer**: Service implementations
3. **Persistence Layer**: Database operations
4. **Validation Layer**: Data validation

#### 4.2.3 MVC Pattern
- **Models**: Database schemas (Drizzle)
- **Views**: API responses (JSON)
- **Controllers**: Route handlers (Express)

### 4.3 Component Interaction

```
Client Request
      │
      ↓
Express Router (Route Handler)
      │
      ↓
Validation Layer (Zod Schema)
      │
      ├─→ Valid: Continue
      ├─→ Invalid: Return 400 Error
      │
      ↓
Business Logic (Service Methods)
      │
      ↓
Database Layer (Drizzle ORM)
      │
      ├─→ Query Database
      ├─→ Get Results
      │
      ↓
Format Response
      │
      ↓
Send Response to Client
```

### 4.4 Data Flow

#### 4.4.1 Request Processing Flow
1. **Receive Request**: Client sends HTTP request
2. **Parse Headers**: Extract authentication, content-type
3. **Validate Input**: Zod validates request body/params
4. **Process Business Logic**: Execute service methods
5. **Database Operations**: Query/modify data via Drizzle
6. **Format Response**: Convert data to JSON
7. **Send Response**: HTTP response to client

#### 4.4.2 Error Handling Flow
```
Error Occurs
    │
    ├─→ Validation Error → Return 400
    ├─→ Authentication Error → Return 401
    ├─→ Authorization Error → Return 403
    ├─→ Not Found → Return 404
    ├─→ Server Error → Return 500
    │
    ↓
Log Error Details
    │
    ↓
Send Error Response to Client
```

---

## 5. TECHNOLOGY STACK

### 5.1 Core Technologies

| Technology | Version | Purpose | Why Chosen |
|-----------|---------|---------|-----------|
| **TypeScript** | 5.9.3 | Language | Type safety, IDE support |
| **Node.js** | 18.0.0+ | Runtime | JavaScript server-side |
| **Express.js** | 5.2.1 | Web Framework | Lightweight, flexible, mature |
| **Drizzle ORM** | Latest | Database ORM | Type-safe, lightweight |
| **Zod** | Latest | Validation | TypeScript-first, zero deps |
| **Pino** | 9.14.0 | Logging | High-performance, structured |
| **pnpm** | 8.0.0+ | Package Manager | Fast, efficient, monorepo support |

### 5.2 Development Tools

| Tool | Purpose |
|------|---------|
| **TSX** | TypeScript execution in Node.js |
| **Prettier** | Code formatting |
| **esbuild** | Fast JavaScript bundler |
| **Pino Pretty** | Dev-friendly log output |
| **Thread Stream** | Streaming logs |

### 5.3 Runtime Dependencies

```json
{
  "dependencies": {
    "@workspace/api-zod": "workspace:*",
    "@workspace/db": "workspace:*",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "drizzle-orm": "latest",
    "express": "^5.2.1",
    "pino": "^9.14.0",
    "pino-http": "^10.5.0"
  }
}
```

### 5.4 Development Dependencies

```json
{
  "devDependencies": {
    "@types/cookie-parser": "^1.4.10",
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.6",
    "@types/node": "latest",
    "esbuild": "0.27.3",
    "esbuild-plugin-pino": "^2.3.3",
    "pino-pretty": "^13.1.3",
    "thread-stream": "3.1.0"
  }
}
```

### 5.5 Technology Justification

#### Why TypeScript?
- **Type Safety**: Catch errors at compile time
- **IDE Support**: Better autocomplete and refactoring
- **Self-Documenting**: Types serve as documentation
- **Reduced Bugs**: Many potential errors prevented
- **Developer Experience**: Better tooling integration

#### Why Express.js?
- **Lightweight**: Minimal overhead
- **Flexible**: Extensive middleware ecosystem
- **Mature**: Battle-tested in production
- **Learning Curve**: Easy to learn and use
- **Community**: Large, active community

#### Why Drizzle ORM?
- **Type-Safe**: TypeScript-first design
- **Lightweight**: Minimal runtime overhead
- **SQL**: Direct control over queries
- **Migrations**: Built-in migration support
- **Performance**: Optimized query generation

#### Why Zod?
- **TypeScript Native**: Designed for TS ecosystem
- **Zero Dependencies**: No external deps
- **Type Inference**: Automatic type generation
- **Composable**: Build complex schemas easily
- **Error Messages**: Clear, helpful validation errors

#### Why Pino?
- **Performance**: Low-overhead logging
- **Structured**: JSON-based structured logs
- **Browser Support**: Works in multiple environments
- **Streaming**: Efficient stream handling
- **HTTP Integration**: Built-in HTTP logging

---

## 6. PROJECT STRUCTURE

### 6.1 Directory Layout

```
Service-Hub/
│
├── artifacts/                          # Compiled outputs and packages
│   │
│   ├── api-server/                    # Express API Server
│   │   ├── src/
│   │   │   ├── index.ts              # Server entry point
│   │   │   ├── routes/               # API route definitions
│   │   │   ├── middleware/           # Custom middleware
│   │   │   ├── services/             # Business logic
│   │   │   └── types/                # TypeScript types
│   │   │
│   │   ├── dist/                     # Compiled JavaScript
│   │   ├── build.mjs                 # Build configuration
│   │   ├── tsconfig.json            # TypeScript config
│   │   ├── package.json             # Dependencies
│   │   └── README.md                # API Server docs
│   │
│   ├── api-zod/                      # Zod Validation Schemas
│   │   ├── src/
│   │   │   ├── schemas/             # Schema definitions
│   │   │   ├── types.ts             # Inferred types
│   │   │   └── index.ts             # Exports
│   │   │
│   │   ├── tsconfig.json
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── db/                           # Database Layer
│       ├── src/
│       │   ├── schema/              # Database schema
│       │   ├── migrations/          # DB migrations
│       │   ├── queries/             # Prepared queries
│       │   ├── seed/                # Database seeding
│       │   └── index.ts             # Exports
│       │
│       ├── tsconfig.json
│       ├── package.json
│       └── README.md
│
├── scripts/                           # Utility Scripts
│   ├── src/
│   │   ├── hello.ts                # Example script
│   │   └── build-tools/            # Build utilities
│   │
│   ├── tsconfig.json
│   ├── package.json
│   └── README.md
│
├── node_modules/                      # Dependencies (ignored in git)
├── package.json                       # Workspace root config
├── pnpm-workspace.yaml               # pnpm workspace config
├── tsconfig.json                     # Root TypeScript config
├── .gitignore                        # Git ignore patterns
├── .prettierrc                       # Prettier config
├── README.md                         # Quick start guide
├── DOCUMENTATION.md                  # This file
└── LICENSE                           # MIT License
```

### 6.2 Key Files Explained

#### 6.2.1 package.json (Root)
```json
{
  "name": "workspace",
  "version": "0.0.0",
  "license": "MIT",
  "scripts": {
    "build": "pnpm run typecheck && pnpm -r --if-present run build",
    "typecheck": "pnpm run typecheck:libs && pnpm -r --filter ... run typecheck"
  },
  "private": true
}
```

**Purpose**: Defines workspace-level scripts and configuration.

#### 6.2.2 pnpm-workspace.yaml
```yaml
packages:
  - 'artifacts/**'
  - 'scripts'
```

**Purpose**: Declares which packages are part of this workspace.

#### 6.2.3 tsconfig.json (Root)
**Purpose**: Base TypeScript configuration for the entire project.

### 6.3 Package Relationships

```
Dependencies Flow:

api-server
  ├── Imports from: api-zod
  ├── Imports from: db
  ├── Runtime deps: express, cors, cookie-parser, pino
  └── Dev deps: @types/*, typescript, esbuild

api-zod
  ├── No internal deps
  └── Runtime deps: zod

db
  ├── No internal deps (can import from api-zod)
  └── Runtime deps: drizzle-orm
```

---

## 7. INSTALLATION & SETUP

### 7.1 Prerequisites

**System Requirements:**
- Operating System: Linux, macOS, or Windows
- RAM: Minimum 4GB
- Disk Space: 500MB for dependencies
- Network: Internet connection for package downloads

**Software Requirements:**
- Node.js 18.0.0 or higher
- npm (for initial pnpm installation)
- Git (for version control)
- A code editor (VS Code recommended)

### 7.2 Installing Node.js

#### On macOS (using Homebrew)
```bash
brew install node
```

#### On Windows
1. Download from https://nodejs.org/
2. Run the installer
3. Follow the installation wizard

#### On Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install nodejs npm
```

### 7.3 Installing pnpm

```bash
npm install -g pnpm
```

**Verify Installation:**
```bash
pnpm --version
# Output: 8.15.4 (or higher)
```

### 7.4 Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/Arman9350/Service-Hub.git
cd Service-Hub

# Using SSH (if SSH key is configured)
git clone git@github.com:Arman9350/Service-Hub.git
cd Service-Hub
```

### 7.5 Install Dependencies

```bash
# Install all workspace dependencies
pnpm install

# This will:
# 1. Install root dependencies
# 2. Install dependencies for all packages
# 3. Create symbolic links between packages
# 4. Set up development environment
```

**Expected Output:**
```
...
dependencies resolved in 45s
packages in workspace installed [XX packages]
...
```

### 7.6 Verify Installation

```bash
# Check pnpm version
pnpm --version

# Check Node version
node --version

# Check TypeScript
pnpm exec tsc --version

# List installed packages
pnpm list
```

### 7.7 Configuration

#### API Server Configuration

Create `.env` file in `artifacts/api-server/`:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
HOST=localhost

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=service_hub
DB_USER=postgres
DB_PASSWORD=password

# Logging
LOG_LEVEL=debug

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Session Configuration
SESSION_SECRET=your-secret-key-here
```

#### Environment Setup Verification

```bash
cd artifacts/api-server
cat .env  # Verify configuration
```

### 7.8 Initial Setup Complete

Your environment is now ready! Next, move to the [Development Environment](#8-development-environment) section.

---

## 8. DEVELOPMENT ENVIRONMENT

### 8.1 IDE Setup

#### 8.1.1 VS Code Configuration

**Recommended Extensions:**
```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "eamodio.gitlens",
    "esbenp.prettier-vscode",
    "orta.vscode-jest",
    "usernamehw.errorlens"
  ]
}
```

**Install Extensions:**
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search and install each extension
4. Reload VS Code

**Recommended Settings (.vscode/settings.json):**
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.defaultRulesDirectory": ["node_modules/@typescript-eslint/eslint-plugin/dist/rules"]
}
```

### 8.2 Development Commands

#### 8.2.1 Type Checking

```bash
# Type-check all packages
pnpm run typecheck

# Type-check only libraries
pnpm run typecheck:libs

# Watch mode (re-check on file changes)
pnpm run typecheck -- --watch
```

#### 8.2.2 Building

```bash
# Full build with type checking
pnpm run build

# Build specific package
cd artifacts/api-server
pnpm run build

# Build without type checking (faster, not recommended)
pnpm run build:fast
```

#### 8.2.3 Development Server

```bash
# Start API server in development mode
cd artifacts/api-server
pnpm run dev

# Server output:
# ✓ Server running on http://localhost:5000
# ✓ Auto-reload enabled
# ✓ Source maps available
```

#### 8.2.4 Format Code

```bash
# Format all files
pnpm exec prettier --write .

# Format specific file
pnpm exec prettier --write src/index.ts

# Check formatting without changing
pnpm exec prettier --check .
```

### 8.3 Git Workflow

#### 8.3.1 Creating Feature Branches

```bash
# Create and checkout new branch
git checkout -b feature/your-feature-name

# Naming conventions:
# feature/add-user-authentication
# fix/resolve-cors-issue
# docs/update-readme
# test/add-api-tests
```

#### 8.3.2 Making Commits

```bash
# Stage changes
git add .

# Commit with meaningful message
git commit -m "feat: Add user authentication"

# Commit message format:
# feat: New feature
# fix: Bug fix
# docs: Documentation
# style: Code style
# refactor: Code refactoring
# test: Testing
```

#### 8.3.3 Pushing Changes

```bash
# Push to remote
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

### 8.4 Debugging

#### 8.4.1 Console Logging

```typescript
// In development, use Pino logging
import pino from 'pino';

const logger = pino();
logger.info('Message', { data: value });
logger.debug('Debug info');
logger.error('Error occurred', error);
```

#### 8.4.2 VS Code Debugger

**Create .vscode/launch.json:**
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch API Server",
      "program": "${workspaceFolder}/artifacts/api-server/dist/index.mjs",
      "restart": true,
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

**Launch Debugger:**
1. Press F5 in VS Code
2. Select "Launch API Server"
3. Set breakpoints in code
4. Execution pauses at breakpoints

#### 8.4.3 Network Debugging

Use tools like Postman or Insomnia to test API endpoints:

```
GET http://localhost:5000/api/health

Headers:
- Content-Type: application/json
- Authorization: Bearer token

Response:
{
  "status": "ok",
  "timestamp": "2026-05-22T23:00:00Z"
}
```

### 8.5 Performance Optimization Tips

1. **Use Pnpm**: Already using faster package manager
2. **Enable Caching**: Git clean -fd to clear cache
3. **Parallel Builds**: pnpm runs scripts in parallel by default
4. **Tree Shaking**: esbuild automatically removes unused code
5. **Lazy Loading**: Import modules only when needed

---

## 9. API SERVER ARCHITECTURE

### 9.1 Express.js Server Setup

#### 9.1.1 Server Entry Point

**File: artifacts/api-server/src/index.ts**

```typescript
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pino from 'pino';
import pinoHttp from 'pino-http';

// Initialize logger
const logger = pino();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(pinoHttp({ logger }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Error handling
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

export default app;
```

### 9.2 Middleware Architecture

#### 9.2.1 CORS Middleware

```typescript
// Enable CORS for specific origins
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**CORS Configuration Options:**
- **origin**: Allowed origins
- **credentials**: Allow cookies/auth headers
- **methods**: Allowed HTTP methods
- **allowedHeaders**: Allowed request headers

#### 9.2.2 Cookie Parser Middleware

```typescript
// Parse cookies in requests
app.use(cookieParser(process.env.COOKIE_SECRET));

// Usage in routes
app.get('/profile', (req, res) => {
  const sessionId = req.cookies.sessionId;
  // ... use sessionId
});

// Set cookies in responses
res.cookie('sessionId', 'abc123', {
  httpOnly: true,
  secure: true,
  sameSite: 'strict'
});
```

#### 9.2.3 Request Logging Middleware

```typescript
import pinoHttp from 'pino-http';

app.use(pinoHttp({
  logger,
  customReceivedMessage: (req) => 
    `${req.method} ${req.url}`,
  customSuccessMessage: (req, res) => 
    `${req.method} ${req.url} - ${res.statusCode}`,
}));
```

### 9.3 Route Organization

#### 9.3.1 Route Structure

```typescript
// routes/users.ts
import express, { Router } from 'express';
import { getAllUsers, getUserById, createUser } from '../services/userService';
import { validateUser } from '../middleware/validation';

const router = Router();

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// POST /api/users
router.post('/', validateUser, async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
```

#### 9.3.2 Mounting Routes in Main App

```typescript
// index.ts
import userRoutes from './routes/users';
import serviceRoutes from './routes/services';

app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
```

### 9.4 Request-Response Cycle

#### 9.4.1 Request Validation

```typescript
// middleware/validation.ts
import { z } from 'zod';

export const validateUser = (req, res, next) => {
  try {
    const userSchema = z.object({
      name: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(8)
    });

    const validated = userSchema.parse(req.body);
    req.body = validated;
    next();
  } catch (error) {
    res.status(400).json({ 
      error: 'Validation failed',
      details: error.errors 
    });
  }
};
```

#### 9.4.2 Error Handling

```typescript
// middleware/errorHandler.ts
export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error({
    error: message,
    status,
    url: req.url,
    method: req.method,
    stack: err.stack
  });

  res.status(status).json({
    error: message,
    status,
    timestamp: new Date()
  });
};

// In main app
app.use(errorHandler);
```

### 9.5 API Endpoints

#### 9.5.1 Health Check Endpoint

```
GET /health
Response: { status: "ok", timestamp: "2026-05-22..." }
```

#### 9.5.2 Service Endpoints

```
GET /api/services              # List all services
GET /api/services/:id         # Get service by ID
POST /api/services            # Create new service
PUT /api/services/:id         # Update service
DELETE /api/services/:id      # Delete service
```

#### 9.5.3 Authentication Endpoints

```
POST /api/auth/register       # User registration
POST /api/auth/login         # User login
POST /api/auth/logout        # User logout
GET /api/auth/profile        # Get user profile
```

---

## 10. DATABASE DESIGN

### 10.1 Database Schema

#### 10.1.1 Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role VARCHAR(50) DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
```

#### 10.1.2 Services Table

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  owner_id UUID NOT NULL REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'active',
  version VARCHAR(20),
  config JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_services_owner_id ON services(owner_id);
CREATE INDEX idx_services_status ON services(status);
```

#### 10.1.3 Service Logs Table

```sql
CREATE TABLE service_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES services(id),
  level VARCHAR(50),
  message TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_service_logs_service_id ON service_logs(service_id);
CREATE INDEX idx_service_logs_created_at ON service_logs(created_at);
```

### 10.2 Drizzle ORM Schema Definition

#### 10.2.1 Schema File Structure

**File: artifacts/db/src/schema/index.ts**

```typescript
import { pgTable, uuid, varchar, text, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  role: varchar('role', { length: 50 }).default('user'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

// Services table
export const services = pgTable('services', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  ownerId: uuid('owner_id').notNull().references(() => users.id),
  status: varchar('status', { length: 50 }).default('active'),
  version: varchar('version', { length: 20 }),
  config: jsonb('config'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

// Service Logs table
export const serviceLogs = pgTable('service_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  serviceId: uuid('service_id').notNull().references(() => services.id),
  level: varchar('level', { length: 50 }),
  message: text('message'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  services: many(services),
}));

export const servicesRelations = relations(services, ({ one, many }) => ({
  owner: one(users, {
    fields: [services.ownerId],
    references: [users.id],
  }),
  logs: many(serviceLogs),
}));

export const serviceLogsRelations = relations(serviceLogs, ({ one }) => ({
  service: one(services, {
    fields: [serviceLogs.serviceId],
    references: [services.id],
  }),
}));
```

### 10.3 Database Operations with Drizzle ORM

#### 10.3.1 Creating Records

```typescript
import { db } from './db';
import { users } from './schema';
import { eq } from 'drizzle-orm';

// Create a new user
const newUser = await db.insert(users).values({
  email: 'user@example.com',
  username: 'username',
  passwordHash: 'hashed_password',
  firstName: 'John',
  lastName: 'Doe',
}).returning();

console.log('User created:', newUser);
```

#### 10.3.2 Reading Records

```typescript
// Get all users
const allUsers = await db.select().from(users);

// Get specific user by email
const user = await db.select().from(users)
  .where(eq(users.email, 'user@example.com'))
  .limit(1);

// Get user with their services
const userWithServices = await db.query.users.findFirst({
  where: eq(users.id, userId),
  with: {
    services: true,
  },
});
```

#### 10.3.3 Updating Records

```typescript
// Update user
const updated = await db.update(users)
  .set({
    firstName: 'Jane',
    updatedAt: new Date(),
  })
  .where(eq(users.id, userId))
  .returning();

console.log('Updated:', updated);
```

#### 10.3.4 Deleting Records

```typescript
// Soft delete
const deleted = await db.update(users)
  .set({ deletedAt: new Date() })
  .where(eq(users.id, userId))
  .returning();

// Hard delete (be careful!)
const hardDeleted = await db.delete(users)
  .where(eq(users.id, userId))
  .returning();
```

### 10.4 Database Migrations

#### 10.4.1 Creating Migrations

```bash
# Drizzle Kit generates migrations
npx drizzle-kit generate:pg --out ./drizzle/migrations
```

#### 10.4.2 Migration File Example

**File: drizzle/migrations/0001_create_users.sql**

```sql
-- Migration: 0001_create_users
-- Created at: 2026-05-22
-- Description: Create users table

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email varchar(255) UNIQUE NOT NULL,
  username varchar(100) UNIQUE NOT NULL,
  password_hash varchar(255) NOT NULL,
  first_name varchar(100),
  last_name varchar(100),
  role varchar(50) DEFAULT 'user',
  is_active boolean DEFAULT true,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
```

#### 10.4.3 Running Migrations

```bash
# Run all pending migrations
npx drizzle-kit migrate

# Verify migrations
npx drizzle-kit introspect:pg
```

### 10.5 Database Connection Management

#### 10.5.1 Connection Pool Setup

**File: artifacts/db/src/db.ts**

```typescript
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'service_hub',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  max: 20, // Connection pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const db = drizzle(pool, { schema });

// Health check
export async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected:', result.rows[0]);
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}
```

---

## 11. VALIDATION & SCHEMA

### 11.1 Zod Schema Basics

#### 11.1.1 Basic Type Validation

```typescript
import { z } from 'zod';

// String validation
const nameSchema = z.string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be at most 100 characters');

// Email validation
const emailSchema = z.string()
  .email('Invalid email address');

// Number validation
const ageSchema = z.number()
  .min(0, 'Age must be positive')
  .max(150, 'Age must be realistic');

// Boolean validation
const activeSchema = z.boolean();

// Date validation
const dateSchema = z.date()
  .refine(date => date > new Date(), 'Date must be in the future');
```

### 11.2 Complex Object Schemas

#### 11.2.1 User Registration Schema

```typescript
export const userRegistrationSchema = z.object({
  email: z.string().email('Invalid email'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be at most 50 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscore, and dash'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .refine(pwd => /[A-Z]/.test(pwd), 'Password must contain uppercase letter')
    .refine(pwd => /[0-9]/.test(pwd), 'Password must contain number'),
  confirmPassword: z.string(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type UserRegistration = z.infer<typeof userRegistrationSchema>;
```

#### 11.2.2 Service Creation Schema

```typescript
export const serviceCreationSchema = z.object({
  name: z.string().min(1, 'Service name is required'),
  description: z.string().optional(),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Invalid version format (use semver)'),
  config: z.record(z.any()).optional(),
  tags: z.array(z.string()).optional(),
});

export type ServiceCreation = z.infer<typeof serviceCreationSchema>;
```

### 11.3 API Request/Response Schemas

#### 11.3.1 Request Body Validation

```typescript
// Middleware for validating request bodies
export const validateBody = (schema: z.ZodSchema) => {
  return (req, res, next) => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
      }
      next(error);
    }
  };
};

// Usage in routes
app.post('/api/users/register',
  validateBody(userRegistrationSchema),
  async (req, res) => {
    // req.body is now validated
    const user = await createUser(req.body);
    res.status(201).json(user);
  }
);
```

#### 11.3.2 Response Schema Validation

```typescript
const userResponseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  role: z.enum(['user', 'admin', 'moderator']),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Validate before sending response
app.get('/api/users/:id', async (req, res) => {
  const user = await getUserById(req.params.id);
  const validated = userResponseSchema.parse(user);
  res.json(validated);
});
```

### 11.4 Custom Validations

#### 11.4.1 Async Validators

```typescript
const uniqueEmailSchema = z.string().email().refine(
  async (email) => {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    return !existingUser;
  },
  { message: 'Email is already in use' }
);
```

#### 11.4.2 Conditional Schemas

```typescript
const serviceSchema = z.object({
  name: z.string(),
  isDraft: z.boolean(),
  publicUrl: z.string().url().optional(),
}).refine(
  (data) => !data.isDraft || data.publicUrl === undefined,
  { message: 'Draft services cannot have public URLs' }
);
```

---

## 12. SECURITY CONSIDERATIONS

### 12.1 Authentication

#### 12.1.1 Password Hashing

```typescript
import bcrypt from 'bcrypt';

// Hash password on registration
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// Verify password on login
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
```

#### 12.1.2 JWT Tokens

```typescript
import jwt from 'jsonwebtoken';

// Generate JWT
function generateToken(userId: string): string {
  return jwt.sign(
    { userId, exp: Math.floor(Date.now() / 1000) + 3600 },
    process.env.JWT_SECRET!
  );
}

// Verify JWT
function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
  } catch {
    return null;
  }
}

// Middleware for protected routes
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.userId = decoded.userId;
  next();
}
```

### 12.2 Authorization

#### 12.2.1 Role-Based Access Control (RBAC)

```typescript
// User roles
enum UserRole {
  USER = 'user',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
}

// Permission checker
function checkPermission(requiredRole: UserRole) {
  return (req, res, next) => {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, req.userId),
    });

    const roleHierarchy = {
      [UserRole.USER]: 1,
      [UserRole.MODERATOR]: 2,
      [UserRole.ADMIN]: 3,
    };

    if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
}

// Usage
app.delete('/api/users/:id',
  authMiddleware,
  checkPermission(UserRole.ADMIN),
  async (req, res) => {
    // Delete user
  }
);
```

### 12.3 Data Protection

#### 12.3.1 HTTPS Configuration

```typescript
import https from 'https';
import fs from 'fs';

const key = fs.readFileSync('/path/to/key.pem');
const cert = fs.readFileSync('/path/to/cert.pem');

https.createServer({ key, cert }, app).listen(443);
```

#### 12.3.2 Data Encryption

```typescript
import crypto from 'crypto';

// Encrypt sensitive data
function encryptData(data: string, key: string): string {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Decrypt data
function decryptData(encrypted: string, key: string): string {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
```

### 12.4 Input Validation & Sanitization

#### 12.4.1 Input Validation with Zod

```typescript
// Already using Zod for validation
const userSchema = z.object({
  email: z.string().email(),
  username: z.string().regex(/^[a-zA-Z0-9_-]+$/),
});
```

#### 12.4.2 SQL Injection Prevention

```typescript
// Using Drizzle ORM prevents SQL injection
// DON'T do this:
// const query = `SELECT * FROM users WHERE id = ${userId}`;

// DO this:
const user = await db.select().from(users)
  .where(eq(users.id, userId));
```

### 12.5 Security Headers

```typescript
import helmet from 'helmet';

// Add security headers
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    scriptSrc: ["'self'"],
    imgSrc: ["'self'", 'data:', 'https:'],
  },
}));
```

### 12.6 Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests, please try again later',
});

// Apply to all routes
app.use(limiter);

// Apply to specific routes
app.post('/api/auth/login', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 login attempts per 15 minutes
}), loginHandler);
```

---

## 13. PERFORMANCE OPTIMIZATION

### 13.1 Database Performance

#### 13.1.1 Query Optimization

```typescript
// Bad: N+1 query problem
const services = await db.select().from(services);
for (const service of services) {
  const owner = await db.select().from(users)
    .where(eq(users.id, service.ownerId));
  // ...
}

// Good: Use relations
const services = await db.query.services.findMany({
  with: {
    owner: true,
  },
});
```

#### 13.1.2 Indexes

```typescript
// Create indexes for frequently queried fields
CREATE INDEX idx_services_owner_id ON services(owner_id);
CREATE INDEX idx_services_status ON services(status);
CREATE INDEX idx_service_logs_created_at ON service_logs(created_at);

// Composite indexes for common filter combinations
CREATE INDEX idx_services_owner_status 
  ON services(owner_id, status);
```

#### 13.1.3 Connection Pooling

```typescript
// Already configured in database setup
const pool = new Pool({
  max: 20, // Maximum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### 13.2 Caching

#### 13.2.1 In-Memory Caching

```typescript
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes

// Cache user data
app.get('/api/users/:id', (req, res) => {
  const cached = cache.get(`user:${req.params.id}`);
  if (cached) {
    return res.json(cached);
  }

  const user = await db.select().from(users)
    .where(eq(users.id, req.params.id));
  
  cache.set(`user:${req.params.id}`, user);
  res.json(user);
});
```

#### 13.2.2 Redis Caching

```typescript
import redis from 'redis';

const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

// Cache middleware
async function cacheMiddleware(key: string, fetch: () => Promise<any>) {
  const cached = await client.get(key);
  if (cached) {
    return JSON.parse(cached);
  }

  const data = await fetch();
  await client.setex(key, 600, JSON.stringify(data)); // 10 minute TTL
  return data;
}
```

### 13.3 Response Compression

```typescript
import compression from 'compression';

// Enable gzip compression
app.use(compression());

// Compression options
app.use(compression({
  level: 6, // Compression level (0-9)
  threshold: 1024, // Only compress responses > 1KB
}));
```

### 13.4 Pagination

```typescript
// Pagination middleware
app.get('/api/services', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  const services = await db.select().from(services)
    .limit(limit)
    .offset(offset);

  const total = await db.select({ count: count() })
    .from(services);

  res.json({
    data: services,
    pagination: {
      page,
      limit,
      total: total[0].count,
      pages: Math.ceil(total[0].count / limit),
    },
  });
});
```

### 13.5 Load Testing

```bash
# Using Apache Bench
ab -n 1000 -c 100 http://localhost:5000/api/health

# Using wrk
wrk -t12 -c400 -d30s http://localhost:5000/api/health

# Using autocannon (Node.js)
npx autocannon http://localhost:5000/api/health
```

---

## 14. DEVELOPMENT WORKFLOW

### 14.1 Daily Development Routine

```bash
# Start of day: Update code
git pull origin main

# Install any new dependencies
pnpm install

# Type check your changes
pnpm run typecheck

# Start development server
cd artifacts/api-server
pnpm run dev
```

### 14.2 Feature Development

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes, test locally
# ... edit files ...

# Type check
pnpm run typecheck

# Commit changes
git add .
git commit -m "feat: Implement my feature"

# Push to remote
git push origin feature/my-feature

# Create Pull Request on GitHub
```

### 14.3 Code Review Checklist

Before submitting PR, ensure:

- [ ] All tests pass
- [ ] TypeScript compilation succeeds
- [ ] Code is formatted with Prettier
- [ ] No console.log statements left
- [ ] No commented-out code
- [ ] Documentation is updated
- [ ] Commit messages are descriptive
- [ ] No hardcoded credentials
- [ ] Performance optimizations considered
- [ ] Security best practices followed

### 14.4 Commit Message Convention

```
<type>(<scope>): <subject>

<body>

<footer>

Examples:
feat(auth): Add JWT authentication
fix(api): Resolve CORS issue with preflight requests
docs(readme): Update installation instructions
style(code): Format files with Prettier
refactor(db): Optimize query performance
test(auth): Add authentication tests
chore(deps): Update dependencies
```

---

## 15. TESTING STRATEGY

### 15.1 Unit Testing

```typescript
// Example test file: src/services/__tests__/userService.test.ts
import { describe, it, expect } from '@jest/globals';
import { createUser, getUserById } from '../userService';

describe('UserService', () => {
  describe('createUser', () => {
    it('should create a user with valid data', async () => {
      const userData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'SecurePass123',
      };

      const user = await createUser(userData);

      expect(user).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user.username).toBe(userData.username);
    });

    it('should throw error for duplicate email', async () => {
      const userData = {
        email: 'existing@example.com',
        username: 'newuser',
        password: 'SecurePass123',
      };

      expect(createUser(userData)).rejects.toThrow();
    });
  });

  describe('getUserById', () => {
    it('should retrieve user by ID', async () => {
      const userId = '123e4567-e89b-12d3-a456-426614174000';
      const user = await getUserById(userId);

      expect(user).toBeDefined();
      expect(user.id).toBe(userId);
    });

    it('should return null for non-existent user', async () => {
      const userId = 'non-existent-id';
      const user = await getUserById(userId);

      expect(user).toBeNull();
    });
  });
});
```

### 15.2 Integration Testing

```typescript
// Example: Integration test for API endpoints
import request from 'supertest';
import app from '../index';

describe('User API Integration', () => {
  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/users/register')
        .send({
          email: 'newuser@example.com',
          username: 'newuser',
          password: 'SecurePass123',
          confirmPassword: 'SecurePass123',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe('newuser@example.com');
    });

    it('should return validation error for invalid email', async () => {
      const response = await request(app)
        .post('/api/users/register')
        .send({
          email: 'invalid-email',
          username: 'newuser',
          password: 'SecurePass123',
          confirmPassword: 'SecurePass123',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should retrieve user details', async () => {
      const response = await request(app)
        .get('/api/users/123e4567-e89b-12d3-a456-426614174000');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/api/users/non-existent-id');

      expect(response.status).toBe(404);
    });
  });
});
```

### 15.3 Running Tests

```bash
# Run all tests
pnpm run test

# Run specific test file
pnpm run test -- userService.test.ts

# Run with coverage
pnpm run test -- --coverage

# Watch mode
pnpm run test -- --watch
```

---

## 16. DEPLOYMENT GUIDE

### 16.1 Pre-Deployment Checklist

- [ ] All tests pass
- [ ] Code review completed
- [ ] Documentation updated
- [ ] Environment variables configured
- [ ] Database migrations created
- [ ] Security audit completed
- [ ] Performance testing done
- [ ] Backup procedures in place
- [ ] Rollback plan prepared
- [ ] Monitoring configured

### 16.2 Build for Production

```bash
# Type check
pnpm run typecheck

# Build all packages
pnpm run build

# Verify build artifacts
ls -la artifacts/api-server/dist/
```

### 16.3 Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --prod

# Copy source code
COPY . .

# Build application
RUN pnpm run build

# Expose port
EXPOSE 5000

# Start application
CMD ["node", "artifacts/api-server/dist/index.mjs"]
```

```bash
# Build Docker image
docker build -t service-hub:1.0.0 .

# Run Docker container
docker run -p 5000:5000 \
  -e NODE_ENV=production \
  -e DB_HOST=postgres.example.com \
  -e DB_PASSWORD=secure_password \
  service-hub:1.0.0
```

### 16.4 Environment Configuration

```env
# .env.production
NODE_ENV=production
PORT=5000

# Database
DB_HOST=prod-db.example.com
DB_PORT=5432
DB_NAME=service_hub
DB_USER=app_user
DB_PASSWORD=${DB_PASSWORD}

# Security
JWT_SECRET=${JWT_SECRET}
SESSION_SECRET=${SESSION_SECRET}
CORS_ORIGIN=https://example.com

# Logging
LOG_LEVEL=info

# Monitoring
SENTRY_DSN=${SENTRY_DSN}
```

### 16.5 Deployment Strategies

#### Rolling Deployment
```bash
# Deploy to 25% of servers
docker pull service-hub:2.0.0
docker-compose up -d --scale api=4

# Gradually shift traffic
# Monitor for errors
# Complete rollout once stable
```

#### Blue-Green Deployment
```bash
# Deploy to green environment
docker-compose -f docker-compose.green.yml up -d

# Run smoke tests
# Switch traffic to green
# Keep blue as backup
```

---

## 17. TROUBLESHOOTING

### 17.1 Common Issues

#### Issue: "Use pnpm instead" Error

**Symptom**: `npm install` returns error message

**Solution**:
```bash
# Use pnpm instead
pnpm install
```

#### Issue: Port Already in Use

**Symptom**: `EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>

# Or use different port
PORT=5001 pnpm run dev
```

#### Issue: Database Connection Failed

**Symptom**: `connect ECONNREFUSED 127.0.0.1:5432`

**Solution**:
```bash
# Check database service
sudo systemctl status postgresql

# Start database if stopped
sudo systemctl start postgresql

# Verify environment variables
cat .env
```

#### Issue: TypeScript Compilation Errors

**Symptom**: Various type errors on build

**Solution**:
```bash
# Check TypeScript version
pnpm exec tsc --version

# Rebuild node_modules
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Run type check
pnpm run typecheck
```

### 17.2 Debug Mode

```bash
# Run with debug logging
DEBUG=* pnpm run dev

# Run with Pino pretty output
NODE_ENV=development pnpm run dev | npx pino-pretty
```

### 17.3 Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `Module not found` | Missing dependency | `pnpm install` |
| `Cannot find type definition` | Missing @types package | `pnpm add -D @types/module` |
| `CORS error` | CORS not configured | Configure CORS in server |
| `Validation failed` | Invalid request data | Check request body schema |
| `Database error` | Connection or query issue | Check DB connection, verify SQL |

---

## 18. FUTURE ENHANCEMENTS

### 18.1 Planned Features

#### Phase 2: Authentication & Authorization
- [ ] OAuth2/OpenID Connect integration
- [ ] Multi-factor authentication (MFA)
- [ ] Role-based access control (RBAC)
- [ ] API key management
- [ ] Service-to-service authentication

#### Phase 3: Monitoring & Analytics
- [ ] Real-time service status dashboard
- [ ] Performance metrics collection
- [ ] Error tracking and alerting
- [ ] Usage analytics
- [ ] Cost tracking

#### Phase 4: Advanced Capabilities
- [ ] GraphQL API support
- [ ] WebSocket support for real-time updates
- [ ] Event streaming
- [ ] Service mesh integration
- [ ] Machine learning integration

### 18.2 Technology Roadmap

```
2026 Q2: v1.0 Release
├── Core API functionality
├── Basic authentication
└── Database integration

2026 Q3: v1.1 Release
├── Advanced auth (OAuth2)
├── Monitoring dashboard
└── API documentation

2026 Q4: v2.0 Release
├── GraphQL support
├── WebSocket support
└── Advanced analytics

2027 Q1: v2.1 Release
├── ML integration
├── Service mesh
└── Cost optimization
```

### 18.3 Scalability Improvements

- [ ] Horizontal scaling with load balancing
- [ ] Database sharding
- [ ] Caching layer (Redis)
- [ ] Message queue (RabbitMQ/Kafka)
- [ ] CDN integration
- [ ] Microservices separation

---

## 19. CONCLUSION

### 19.1 Project Summary

Service-Hub is a comprehensive, type-safe service management platform built with modern technologies. It provides:

- **Robust Architecture**: Monorepo structure with clear separation of concerns
- **Type Safety**: Full TypeScript coverage preventing runtime errors
- **Scalability**: Designed to grow from small projects to enterprise scale
- **Developer Experience**: Clear documentation and intuitive workflow
- **Production Ready**: Security, performance, and monitoring built-in

### 19.2 Key Achievements

✅ Complete TypeScript codebase (97%)  
✅ Express.js-based REST API  
✅ Type-safe database with Drizzle ORM  
✅ Comprehensive validation with Zod  
✅ Structured logging with Pino  
✅ Security best practices  
✅ Performance optimization  
✅ Comprehensive documentation  

### 19.3 Getting Started

To begin using Service-Hub:

1. **Clone Repository**
   ```bash
   git clone https://github.com/Arman9350/Service-Hub.git
   cd Service-Hub
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Start Development**
   ```bash
   cd artifacts/api-server
   pnpm run dev
   ```

4. **Explore API**
   - GET: http://localhost:5000/health
   - Visit GitHub repository for more

### 19.4 Support & Resources

- **Repository**: https://github.com/Arman9350/Service-Hub
- **Live Demo**: https://replit.com/@armansaifi9350/Service-Hub
- **Issues**: Report bugs on GitHub
- **Documentation**: Read DOCUMENTATION.md (this file)

### 19.5 License

MIT License - Free to use for personal and commercial projects

---

## 20. APPENDICES

### 20.1 Appendix A: API Reference

#### Health Check Endpoint
```
GET /health
Response: 200 OK
Body: { "status": "ok", "timestamp": "2026-05-22T..." }
```

#### User Registration
```
POST /api/users/register
Body: {
  "email": "user@example.com",
  "username": "username",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123"
}
Response: 201 Created
Body: { "id": "uuid", "email": "...", "username": "..." }
```

#### Service Creation
```
POST /api/services
Headers: { "Authorization": "Bearer token" }
Body: {
  "name": "My Service",
  "description": "Service description",
  "version": "1.0.0"
}
Response: 201 Created
Body: { "id": "uuid", "name": "...", ... }
```

### 20.2 Appendix B: Environment Variables Reference

```env
# Server Configuration
NODE_ENV              # development | production
PORT                  # Default: 5000
HOST                  # Default: localhost

# Database
DB_HOST              # PostgreSQL host
DB_PORT              # PostgreSQL port (5432)
DB_NAME              # Database name
DB_USER              # Database user
DB_PASSWORD          # Database password

# Security
JWT_SECRET           # JWT signing secret
SESSION_SECRET       # Session encryption secret
COOKIE_SECRET        # Cookie encryption secret

# CORS
CORS_ORIGIN          # Allowed origin for CORS

# Logging
LOG_LEVEL            # debug | info | warn | error
```

### 20.3 Appendix C: File Structure Quick Reference

```
artifacts/api-server/  <- API server package
├── src/
│   └── index.ts       <- Entry point
artifacts/api-zod/     <- Validation schemas
├── src/
│   └── schemas/       <- Zod schema definitions
artifacts/db/          <- Database layer
├── src/
│   ├── schema/        <- Drizzle schema
│   ├── queries/       <- Database queries
│   └── migrations/    <- Database migrations
scripts/               <- Utility scripts
package.json           <- Workspace config
```

### 20.4 Appendix D: Useful Commands Reference

```bash
# Installation & Setup
pnpm install
pnpm install -g pnpm

# Development
pnpm run typecheck
pnpm run build
cd artifacts/api-server && pnpm run dev

# Testing
pnpm run test
pnpm run test -- --coverage

# Code Quality
pnpm exec prettier --write .
pnpm exec eslint .

# Database
npx drizzle-kit generate:pg
npx drizzle-kit migrate

# Git & Deployment
git clone https://github.com/Arman9350/Service-Hub.git
git checkout -b feature/my-feature
git push origin feature/my-feature
```

### 20.5 Appendix E: Glossary

- **API**: Application Programming Interface
- **CORS**: Cross-Origin Resource Sharing
- **JWT**: JSON Web Token
- **ORM**: Object-Relational Mapping
- **REST**: Representational State Transfer
- **RBAC**: Role-Based Access Control
- **SQL**: Structured Query Language
- **TypeScript**: JavaScript with static typing
- **UUID**: Universally Unique Identifier
- **Zod**: TypeScript-first schema validation

---

**END OF DOCUMENTATION**

---

**Document Information**
- **Total Pages**: ~50 pages (when printed)
- **Version**: 1.0.0
- **Last Updated**: May 22, 2026
- **Author**: Arman Saifi
- **Repository**: https://github.com/Arman9350/Service-Hub

This comprehensive documentation provides complete guidance for understanding, developing, deploying, and maintaining the Service-Hub project.
