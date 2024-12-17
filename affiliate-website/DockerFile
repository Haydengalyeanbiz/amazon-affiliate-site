# Build the Frontend
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Set up the Backend
FROM python:3.9 AS backend
WORKDIR /app/backend

# Install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./

# Copy the built frontend to the backend static folder
COPY --from=frontend /app/frontend/dist /app/backend/static

# Run Flask App
CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:app"]
