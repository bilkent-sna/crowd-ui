// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{ generate_context, generate_handler, AppHandle, Builder};

mod python_backend;
mod general_py_backend;
mod project_py_backend;
mod merge_py_backend;

// #[tauri::command]
// fn greet(name: &str) -> String {
//    format!("Hello, {}!", name)
// }

use rusqlite::{params, Connection, Result};
use serde::{Deserialize, Serialize};
use serde_json;

// Define the user struct for serialization
#[derive(Debug, Serialize, Deserialize)]
struct SimResult {
    id: i32,
    some_feature: i32,
    comment: Option<String>,
    json_result: Option<String>,
    result_type : i32,
    some_id: i32,
    some_other_id: i32
}


#[derive(Debug, Serialize, Deserialize)]
struct ResultType {
    result_type : i32,
    count: i32
}


// Query the database and return results as a JSON string
#[tauri::command]
fn query_database() -> String {
    let conn = Connection::open("C:\\Users\\SERIF\\Desktop\\nese\\dyn and soc netw\\simulation tool\\ui\\test.db").expect("Failed to open database");

    let mut stmt = conn
        .prepare("SELECT id, some_feature, comment, json_result, result_type, some_id, some_other_id FROM results")
        .expect("Failed to prepare query");

    let rows = stmt
        .query_map(params![], |row| {
            Ok(SimResult {                
                id: row.get(0)?,
                some_feature: row.get(1)?,
                comment: row.get(2)?,
                json_result: row.get(3)?,
                result_type : row.get(4)?,
                some_id: row.get(5)?,
                some_other_id: row.get(6)?,
            })
        })
        .expect("Failed to execute query");

    let results: Result<Vec<SimResult>, _> = rows.collect();
    let results = results.expect("Failed to collect results");

    serde_json::to_string(&results).expect("Failed to serialize results")
}

#[tauri::command]
fn query_result_types() -> String {
    let conn = Connection::open("C:\\Users\\SERIF\\Desktop\\nese\\dyn and soc netw\\simulation tool\\ui\\test.db")
        .expect("Failed to open database");

    let mut stmt = conn
        .prepare("SELECT result_type as result_type, count(result_type) as count FROM results group by result_type")
        .expect("Failed to prepare query");

    let rows = stmt
        .query_map(params![], |row| {
            Ok(ResultType {                
                result_type : row.get(0)?,
                count: row.get(1)?,
            })
        })
        .expect("Failed to execute query");

    let results: Result<Vec<ResultType>, _> = rows.collect();
    let results = results.expect("Failed to collect results");

    serde_json::to_string(&results).expect("Failed to serialize results")
}

#[tauri::command(rename_all = "snake_case")]
fn get_results_by_type(result_type: String) -> String {
    let conn = Connection::open("C:\\Users\\SERIF\\Desktop\\nese\\dyn and soc netw\\simulation tool\\ui\\test.db").expect("Failed to open database");
    let query_str = format!("SELECT id, some_feature, comment, json_result, result_type, some_id, some_other_id FROM results where result_type={}", result_type);
    println!("here");
    let mut stmt = conn
        .prepare(&query_str)
        .expect("Failed to prepare query");

    let rows = stmt
        .query_map(params![], |row| {
            Ok(SimResult {                
                id: row.get(0)?,
                some_feature: row.get(1)?,
                comment: row.get(2)?,
                json_result: row.get(3)?,
                result_type : row.get(4)?,
                some_id: row.get(5)?,
                some_other_id: row.get(6)?,
            })
        })
        .expect("Failed to execute query");

    let results: Result<Vec<SimResult>, _> = rows.collect();
    let results = results.expect("Failed to collect results");

    serde_json::to_string(&results).expect("Failed to serialize results")
}



#[tauri::command(rename_all = "snake_case")]
fn run_python_class_parameter() -> String {
    let results = python_backend::test_crowd_class_parameter();
    println!("Inside main.rs printing results");
    println!("{}", results);
    return results;
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_method_parameter() -> String {
    let results = python_backend::test_crowd_method_parameter();
    println!("Inside main.rs printing results");
    println!("{}", results);
    return results;
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_test_time() -> String {
    let results = python_backend::test_crowd_time();
    println!("Inside main.rs printing results");
    println!("{}", results);
    return results;
}


#[tauri::command(rename_all = "snake_case")]
fn run_python_list_projects() -> String {
    let results = general_py_backend::list_projects();
    println!("Inside main.rs printing projects list results");
    println!("{}", results);
    return results;
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_list_simulations(project_name : String) -> String {
    let results = general_py_backend::list_simulations(project_name);
    // println!("Inside main.rs printing simulations list results");
    // println!("{}", results);
    return results;
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_list_sim_and_count(project_name : String) -> String {
    let results = general_py_backend::list_sim_and_count(project_name);
    return results;
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_get_sub_simulations_info(project_name : String, simulation_directory: String) -> String{
    let results = general_py_backend::get_subsimulations_info(project_name, simulation_directory);
    return results;
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_list_parameters(project_name : String, simulation_directory: String) -> String {
    let results = general_py_backend::list_parameters(project_name, simulation_directory);
    // println!("Inside main.rs printing simulations list parameters");
    // println!("{}", results);
    return results;
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_list_datasets(project_name : String) -> String {
    let results = general_py_backend::list_datasets(project_name);
    // println!("Inside main.rs printing simulations list datasets");
    // println!("{}", results);
    return results;
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_save_dataset(project_name : String, file_name: String, file_content: Vec<u8>) -> String {
    let results = general_py_backend::save_dataset(project_name, file_name, file_content);
    // println!("Inside main.rs printing simulations list datasets");
    // println!("{}", results);
    return results;
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_load_simulation_info(project_name : String, simulation_directory: String) -> String {
    let results = general_py_backend::load_simulation_info(project_name, simulation_directory);
    // println!("Inside main.rs printing simulations info");
    // println!("{}", results);
    return results;
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_load_simulation_graph(project_name : String, simulation_directory: String) -> String {
    let results = general_py_backend::load_simulation_graph(project_name, simulation_directory);
    // println!("Inside main.rs printing simulations graph");
    // println!("{}", results);
    return results;
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_load_added_edges(project_name : String, simulation_directory: String) -> String {
    let results = general_py_backend::load_added_edges(project_name, simulation_directory);
    // println!("Inside main.rs printing added edges");
    // println!("{}", results);
    return results;
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_load_parameter_file(project_name : String, simulation_directory: String, file_name: String) -> String {
    let results = general_py_backend::load_parameter_file(project_name, simulation_directory, file_name);
    // println!("Inside main.rs printing parameter file");
    // println!("{}", results);
    return results;
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_load_methods(project_name : String) -> String {
    let results = general_py_backend::load_methods(project_name);
    // println!("Inside main.rs printing parameter file");
    // println!("{}", results);
    return results;
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_get_conf(project_name : String) -> String {
    let results = general_py_backend::get_conf(project_name);
    // println!("Inside main.rs printing conf file");
    // println!("{}", results);
    return results;
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_save_methods(project_name : String, code : String) {
    general_py_backend::save_methods(project_name, code);
    // println!("Inside main.rs printing parameter file");
    // println!("{}", results);
    
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_save_conf(project_name : String, content : String) {
    general_py_backend::save_conf(project_name, content);
    
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_save_methods_list_view(project_name : String, list_view : String) {
    general_py_backend::save_methods_list_view(project_name, list_view);
    //  println!("Inside main.rs printing parameter file");
    // println!("{}", results);
  
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_create_project(name: String, date: String, info: String, node_or_edge: String) {
    println!("Inside main.rs before python call, name: {}, date:{}, info:{}", name, date, info);
    project_py_backend::create_project(name, date, info, node_or_edge);
    println!("Inside main.rs, project successfully created");
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_send_conf_and_run(data: String, project_name: String, epochs: i32, snapshot_period: i32, batch_num: i32) -> String {
// fn run_python_send_conf_and_run(app_handle: AppHandle,data: String, project_name: String, epochs: i32, snapshot_period: i32) -> String {
    // let results = project_py_backend::send_conf_and_run(app_handle, data, project_name, epochs, snapshot_period);
    // println!("Inside main.rs, simulation successfully ran");
    let results = project_py_backend::send_conf_and_run(data, project_name, epochs, snapshot_period, batch_num);
    return results
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_init_and_run_simulation(project_name: String, epochs: i32, snapshot_period: i32) -> String {
    let results = project_py_backend::init_and_run_simulation(project_name, epochs, snapshot_period);
    println!("Inside main.rs, simulation successfully ran");
    return results
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_edge_conf_run(data: String, project_name: String, epochs: i32, snapshot_period: i32) -> String {
    let results = project_py_backend::edge_conf_run(data, project_name, epochs, snapshot_period);
    println!("Inside main.rs, simulation successfully ran");
    return results
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_edge_sim_run(project_name: String, epochs: i32, snapshot_period: i32) -> String {
    let results = project_py_backend::edge_sim_run(project_name, epochs, snapshot_period);
    println!("Inside main.rs, simulation successfully ran");
    return results
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_merge_parent_sim(project_name: String, 
    parent_simulation_dir: String,
    simulation_dir: String, 
    json_file_name: String, 
    merge_method: String) -> String{
    let results = merge_py_backend::merge_parent_sim(project_name, parent_simulation_dir, simulation_dir, json_file_name, merge_method);
    return results
}

#[tauri::command(rename_all = "snake_case")]
fn run_python_merge_other_sim(project_name: String, 
    parent_simulation_dir: String,
    simulation_dir: String, 
    json_file_name: String, 
    merge_dir_dict: String) -> String{
    let results = merge_py_backend::merge_other_sim(project_name, parent_simulation_dir, simulation_dir, json_file_name, merge_dir_dict);
    return results
}

fn main() {
    // let app = tauri::Builder::default()
    //     .invoke_handler(tauri::generate_handler![query_database, query_result_types, get_results_by_type, run_python_class_parameter, run_python_method_parameter])
    //     .run(tauri::generate_context!())
    //     .expect("Error while running Tauri application");

    // tauri::Builder::default()
    //     .run(tauri::generate_context!())
    //     .expect("Error while running Tauri application");

    Builder::default()
        .invoke_handler(generate_handler![
            query_database, 
            query_result_types, 
            get_results_by_type, 
            run_python_class_parameter, 
            run_python_method_parameter,
            run_python_test_time,
            run_python_list_projects,
            run_python_list_simulations,
            run_python_list_sim_and_count,
            run_python_get_sub_simulations_info,
            run_python_list_parameters,
            run_python_list_datasets,
            run_python_save_dataset,
            run_python_load_simulation_info,
            run_python_load_simulation_graph,
            run_python_load_added_edges,
            run_python_load_parameter_file,
            run_python_load_methods,
            run_python_save_methods,
            run_python_save_methods_list_view,
            run_python_get_conf,
            run_python_save_conf,
            run_python_create_project,
            run_python_send_conf_and_run,
            run_python_init_and_run_simulation,
            run_python_edge_conf_run,
            run_python_edge_sim_run,
            run_python_merge_parent_sim,
            run_python_merge_other_sim
        ])
        .run(generate_context!())
        .expect("Error while running Tauri application");
}