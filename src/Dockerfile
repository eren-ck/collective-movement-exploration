FROM python:3.8-buster

# set work directory
WORKDIR /usr/src/app/server

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/app/server/requirements.txt
RUN pip install -r requirements.txt

# copy project
COPY . /usr/src/app
