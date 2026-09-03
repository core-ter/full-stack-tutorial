FROM python:3.11

WORKDIR /app/backend

RUN apt-get update && apt-get install -y \
    texlive-latex-base \
    texlive-latex-extra \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY src/ /app/backend/src/

CMD ["python", "src/manage.py", "runserver", "0.0.0.0:8000"]
