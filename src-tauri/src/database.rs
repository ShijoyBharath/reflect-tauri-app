use rusqlite::{Connection, Result};

pub struct Database {
    conn: Connection,
}

#[derive(Debug)]
struct Person {
    id: i32,
    name: String,
    data: Option<Vec<u8>>,
}

impl Database {
    pub fn new() -> Result<Self> {
        let conn = Connection::open("test.sqlite")?;
        Ok(Database { conn })
    }

    pub fn create(&self) -> Result<()> {
        self.conn.execute(
            "CREATE TABLE IF NOT EXISTS person (
                        id    INTEGER PRIMARY KEY,
                        name  TEXT NOT NULL,
                        data  BLOB
                    )",
            (), // empty list of parameters.
        )?;

        Ok(())
    }

    pub fn insert(&self) -> Result<()> {
        let me = Person {
            id: 0,
            name: "Steven".to_string(),
            data: None,
        };
        self.conn.execute(
            "INSERT INTO person (name, data) VALUES (?1, ?2)",
            (&me.name, &me.data),
        )?;

        Ok(())
    }

    pub fn get_all(&self) -> Result<()> {
        let mut stmt = self.conn.prepare("SELECT id, name, data FROM person")?;
        let person_iter = stmt.query_map([], |row| {
            Ok(Person {
                id: row.get(0)?,
                name: row.get(1)?,
                data: row.get(2)?,
            })
        })?;

        for person in person_iter {
            println!("Found person {:?}", person.unwrap());
        }
        Ok(())
    }
}