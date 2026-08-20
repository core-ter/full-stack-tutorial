FROM python:3.11

WORKDIR /app/backend

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY src/ /app/backend/src/

CMD ["python", "src/manage.py", "runserver", "0.0.0.0:8000"]
