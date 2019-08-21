[![Build Status](https://travis-ci.org/kimbugp/iot-dashboard.svg?branch=master)](https://travis-ci.org/kimbugp/iot-dashboard)
# iot-dashboard
A web application that primarily displays sensor data through different types of visualizations.

## Key features

- Consumption of ThingsSpeak API to obtain sensor data
- Visualization of sensor data using JS libraries like D3.js
- User authentication to access the platform
- Caching of consumed RESTful API data using Redis or Memcache for optimization.
- Generate PDF reports of the visualizations


## How to setup the project 
-   Check that python 3 is installed:

    ```
    python --version
    >> Python 3.6.5
    ```

-   Install pipenv:

    ```
    brew install pipenv
    ```

-   Check pipenv is installed:
    ```
    pipenv --version
    >> pipenv, version 2018.6.25
    ```
-   Check that postgres is installed:

    ```
    postgres --version
    >> postgres (PostgreSQL) 10.1
    ```
-   Clone the  repo and cd into it:

    ```
    git clone https://github.com/kimbugp/collector.git
    ```

-   Install dependencies:

    ```
    pipenv install
    ```

-   Install dev dependencies to setup development environment:

    ```
    pipenv install --dev
    ```
-   Make a copy of the .env.sample file and rename it to .env and update the variables accordingly:

-   Activate a virtual environment:

    ```
    pipenv shell
    ```

-   Apply migrations:

    ```
    python manage.py migrate
    ```

-   If you'd like to seed initial data to the database:

    ```
    python manage.py loaddata fixtures/*
    ```

*   Run the application:

    ```
    python manage.py runserver
    ```