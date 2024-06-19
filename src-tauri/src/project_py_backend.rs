use pyo3::prelude::*;
// use pyo3::types::IntoPyDict; 
// use pyo3::types::PyTuple;


// Beginning of Project Methods from Crowd
pub fn create_project(name: String, date: String, info: String){
    pyo3::prepare_freethreaded_python();

    Python::with_gil(|py| {
        let test_module = PyModule::import_bound(py, "crowd.api.project_api").unwrap();
        
        let args = (name, date, info);
        println!("args inside python_backend.rs: {:?}", args);
        
        test_module.getattr("ProjectFunctions").unwrap().call0().unwrap().call_method1("create_project", args).unwrap().to_string();
    });
}

pub fn send_conf_and_run(data: String, project_name: String, epochs: i32, snapshot_period: i32) -> String{
    pyo3::prepare_freethreaded_python();

    let mut result = String::new();
    Python::with_gil(|py| {
        let test_module = PyModule::import_bound(py, "crowd.api.project_api").unwrap();
        
        let args = (data, project_name, epochs, snapshot_period);
        // println!("args inside python_backend.rs: {:?}", args);
        
        result = test_module.getattr("ProjectFunctions").unwrap().call0().unwrap().call_method1("get_conf_and_run", args).unwrap().to_string();
    });

    return result;
}