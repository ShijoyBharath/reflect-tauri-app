use rusqlite::{Connection, Result};
use serde::{Deserialize, Serialize};

pub struct Database {
    conn: Connection,
}

#[derive(Debug)]
struct Person {
    id: i32,
    name: String,
    data: Option<Vec<u8>>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct WeeklyGoals {
    id: Option<i32>,
    goal: String,
    start_date: String,
    end_date: String,
}

pub struct AppConfig {
    id: Option<i32>,
    start_date: String,
    theme: String,
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
    pub fn create_appconfig_table(&self, start_date: String) -> Result<()> {
        self.conn.execute(
            "CREATE TABLE IF NOT EXISTS appconfig (
                        id    INTEGER PRIMARY KEY,
                        start_date  TEXT NOT NULL,
                        theme  TEXT NOT NULL
                    )",
            (), // empty list of parameters.
        )?;

        // Check if a row already exists in the table
        let count: i64 = self
            .conn
            .query_row("SELECT COUNT(*) FROM appconfig", [], |row| row.get(0))?;
        if count == 0 {
            // Insert a row with the current date as the installation date
            self.conn.execute(
                "INSERT OR REPLACE INTO appconfig (id, start_date, theme) VALUES (1, ?, ?)",
                (start_date, "light"),
            )?;
        }

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

    pub fn insert_appconfig_data(&self, theme_data: &String) -> Result<()> {
        self.conn.execute(
            "UPDATE appconfig SET theme = ? WHERE id = 1",
            &[&theme_data],
        )?;

        Ok(())
    }

    pub fn insert_weeklygoals(&self, goals_array: &str) -> Result<()> {
        // let me = WeeklyGoals {
        //     id: 0,
        //     goal: "Complete reflect app".to_string(),
        //     start_date: "2024-05-07".to_string(),
        //     end_date: "2024-05-15".to_string(),
        // };
        // self.conn.execute(
        //     "INSERT INTO weeklygoals (goal, start_date, end_date) VALUES (?1, ?2, ?3)",
        //     (&me.goal, &me.start_date, &me.end_date),
        // )?;

        let goals: Vec<WeeklyGoals> = serde_json::from_str(goals_array).unwrap();

        let mut stmt = self
            .conn
            .prepare("INSERT INTO weeklygoals (goal, start_date, end_date) VALUES (?, ?, ?)")?;
        for goal in goals {
            stmt.execute(&[&goal.goal, &goal.start_date, &goal.end_date])?;
        }

        Ok(())
    }
    pub fn get_weeklygoals(
        &self,
        start_date: String,
        end_date: String,
    ) -> Result<Vec<WeeklyGoals>> {
        let mut stmt = self.conn.prepare(
            "SELECT *
            FROM weeklygoals
            WHERE DATE(start_date) BETWEEN DATE(?) AND DATE(?)",
        )?;
        let data_iter = stmt.query_map([start_date, end_date], |row| {
            Ok(WeeklyGoals {
                id: row.get(0)?,
                goal: row.get(1)?,
                start_date: row.get(2)?,
                end_date: row.get(3)?,
            })
        })?;

        let mut result = Vec::new();
        for data in data_iter {
            result.push(data?);
        }
        Ok(result)
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
