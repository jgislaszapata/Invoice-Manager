create table invoice(
    ref_number INT NOT NULL PRIMARY KEY,
    amount INT,
    due_date DATE,
    memo VARCHAR(100),
    id INT,
    FOREIGN KEY (id)
    REFERENCES client_details(id)
    ON DELETE SET NULL
    );
    