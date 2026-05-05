# --- STAGE 1: Build ---
# We use a lightweight Node image to build the app
FROM node:25-alpine3.19 AS builder

WORKDIR /app

# 1. We copy the dependency files to leverage Docker's caching
COPY package*.json ./
RUN npm install

# 2. We copy the rest of the project files
COPY . .

# 3. We run the build (this uses the tsconfig.json we already fixed)
RUN npm run build

# --- STAGE 2: Production ---
FROM nginx:1.27.11-alpine3.21

# Update OS packages to reduce known vulnerabilities at build time
RUN apk update && apk upgrade --no-cache && rm -rf /var/cache/apk/*

# 4. We copy only the built files (dist) from the previous stage
# This makes the final image extremely small (approx 20-40MB)
COPY --from=builder /app/dist /usr/share/nginx/html

# 5. We expose port 80
EXPOSE 80

# 6. We start Nginx
CMD ["nginx", "-g", "daemon off;"]