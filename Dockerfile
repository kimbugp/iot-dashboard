FROM node:10.15-slim as node_stage
RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

COPY fend/static/fend/main.js .


FROM python:3.7
RUN mkdir /code
WORKDIR /code
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
COPY --from=node_stage app/main.js fend/static/fend

ENV DJANGO_SETTINGS_MODULE config.default
ENV PYTHONUNBUFFERED 1

CMD ["gunicorn", "config.wsgi","-b 0.0.0.0"]