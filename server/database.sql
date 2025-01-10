CREATE DATABASE jobopportunities;

CREATE TABLE jobs(
    job_id SERIAL PRIMARY KEY,
    company VARCHAR(255),
    job VARCHAR(255),
    skills VARCHAR(255),
    responsibilities VARCHAR(255),
    pay VARCHAR(255),
    located VARCHAR(255),
    deadline VARCHAR(255),
    link VARCHAR(255),
    Edit VARCHAR(255),
    Delete VARCHAR(255)
);