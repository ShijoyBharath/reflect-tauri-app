// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod database;
use database::Database;
use serde::{Serialize, Deserialize};

fn main() {
    let database = Database::new().expect("new");
    database.create().expect("create");
    database.create_habits_table().expect("create");
    database.create_habitsdata_table().expect("create");
    database.create_dailygoals_table().expect("create");
    database.create_weeklygoals_table().expect("create");
    database.create_timespent_table().expect("create");

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            insert_data,
            insert_weeklygoals_data,
            get_weeklygoals_data
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn insert_data() {
    let database = Database::new().expect("new");
    database.insert().expect("insert");
    println!("Data inserted successfully!");
}

#[tauri::command(rename_all = "snake_case")]
fn insert_weeklygoals_data(goals_array: &str) {
    let database = Database::new().expect("new");
    database.insert_weeklygoals(&goals_array).expect("insert");
    println!(
        "Data inserted successfully! {}",
        goals_array
    );
}

#[tauri::command(rename_all = "snake_case")]
fn get_weeklygoals_data(start_date: String, end_date: String) -> String {
    let database = Database::new().expect("new");
    let data = database.get_weeklygoals(start_date, end_date).expect("insert");

    let response = serde_json::to_string(&data).unwrap();

    response.into()
}
