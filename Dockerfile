# ==========================================
# Stage 1: Install dependencies
# ==========================================
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --ignore-scripts

# ==========================================
# Stage 2: Build TypeScript & generate Prisma
# ==========================================
FROM node:20-alpine AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Compile TypeScript to JavaScript
RUN npm run build

# ==========================================
# Stage 3: Production image
# ==========================================
FROM node:20-alpine AS production

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy package files and install production-only dependencies
COPY package.json package-lock.json ./
RUN npm install --omit=dev --ignore-scripts

# Generate Prisma Client in production node_modules
COPY prisma ./prisma
RUN npx prisma generate

# Copy compiled output from build stage
COPY --from=build /app/dist ./dist

EXPOSE 4000

# Run database migrations then start the server
CMD ["sh", "-c", "npx prisma db push && node dist/server.js"]
