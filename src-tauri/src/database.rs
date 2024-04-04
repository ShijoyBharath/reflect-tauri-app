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
struct WeeklyGoals {
    id: i32,
    goal: String,
    start_date: String,
    end_date: String,
}

impl Database {
    pub fn new() -> Result<Self> {
        let conn = Connection::open("/Users/shijoybharath/Documents/test.sqlite")?;
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

    pub fn create_habits_table(&self) -> Result<()> {
        self.conn.execute(
            "CREATE TABLE IF NOT EXISTS habits (
                        id    INTEGER PRIMARY KEY,
                        habit  TEXT NOT NULL,
                        description  TEXT NOT NULL,
                        created_at  TEXT NOT NULL,
                        data  BLOB
                    )",
            (), // empty list of parameters.
        )?;

        Ok(())
    }
    pub fn create_habitsdata_table(&self) -> Result<()> {
        self.conn.execute(
            "CREATE TABLE IF NOT EXISTS habitsdata (
                        id    INTEGER PRIMARY KEY,
                        habit_id  INTEGER NOT NULL,
                        date  TEXT NOT NULL,
                        value  TEXT NOT NULL,
                        goal TEXT NOT NULL,
                        data  BLOB
                    )",
            (), // empty list of parameters.
        )?;

        Ok(())
    }
    pub fn create_dailygoals_table(&self) -> Result<()> {
        self.conn.execute(
            "CREATE TABLE IF NOT EXISTS dailygoals (
                        id    INTEGER PRIMARY KEY,
                        goal  TEXT NOT NULL,
                        date  TEXT NOT NULL,
                        data  BLOB
                    )",
            (), // empty list of parameters.
        )?;

        Ok(())
    }
    pub fn create_weeklygoals_table(&self) -> Result<()> {
        self.conn.execute(
            "CREATE TABLE IF NOT EXISTS weeklygoals (
                        id    INTEGER PRIMARY KEY,
                        goal  TEXT NOT NULL,
                        start_date TEXT NOT NULL,
                        end_date TEXT NOT NULL
                    )",
            (), // empty list of parameters.
        )?;

        Ok(())
    }
    pub fn create_timespent_table(&self) -> Result<()> {
        self.conn.execute(
            "CREATE TABLE IF NOT EXISTS timespent (
                        id    INTEGER PRIMARY KEY,
                        date  TEXT NOT NULL,
                        total_time_spent  TEXT NOT NULL,
                        flows TEXT NOT NULL,
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
    pub fn insert_weeklygoals(&self) -> Result<()> {
        let me = WeeklyGoals {
            id: 0,
            goal: "Complete reflect app".to_string(),
            start_date: "2024-04-07".to_string(),
            end_date: "2024-04-08".to_string(),
        };
        self.conn.execute(
            "INSERT INTO weeklygoals (goal, start_date, end_date) VALUES (?1, ?2, ?3)",
            (&me.goal, &me.start_date, &me.end_date),
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