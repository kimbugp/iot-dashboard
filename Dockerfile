FROM python:3.7-alpine AS python_env
COPY . .

ENV PYTHONUNBUFFERED 1
RUN pip install -r requirements.txt


FROM node:10.15-slim
COPY --from=python_env . .
ENV DJANGO_SETTINGS_MODULE config.default
RUN npm install
RUN npm run build
CMD ["gunicorn", "config.wsgi","-b 0.0.0.0"]

EXPOSE 80 8080 8000