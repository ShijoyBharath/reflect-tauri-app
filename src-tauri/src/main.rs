// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod database;
use database::Database;

fn main() {
    let database = Database::new().expect("new");
    database.create().expect("create");
    database.create_habits_table().expect("create");
    database.create_habitsdata_table().expect("create");
    database.create_dailygoals_table().expect("create");
    database.create_weeklygoals_table().expect("create");
    database.create_timespent_table().expect("create");

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![insert_data, insert_weeklygoals_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn insert_data() {
    let database = Database::new().expect("new");
    database.insert().expect("insert");
    println!("Data inserted successfully!");
}

#[tauri::command]
fn insert_weeklygoals_data() {
    let database = Database::new().expect("new");
    database.insert_weeklygoals().expect("insert");
    println!("Data inserted successfully!");
}
