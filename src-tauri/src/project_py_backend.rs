use pyo3::prelude::*;
// use pyo3::types::IntoPyDict; 
// use pyo3::types::PyTuple;


// Beginning of Project Methods from Crowd
pub fn create_project(name: String, date: String, info: String, node_or_edge: String){
    pyo3::prepare_freethreaded_python();

    Python::with_gil(|py| {
        let test_module = PyModule::import_bound(py, "crowd.api.project_api").unwrap();
        
        let args = (name, date, info, node_or_edge);
        println!("args inside python_backend.rs: {:?}", args);
        
        test_module.getattr("ProjectFunctions").unwrap().call0().unwrap().call_method1("create_project", args).unwrap().to_string();
    });
}

pub fn send_conf_and_run(data: String, project_name: String, epochs: i32, snapshot_period: i32, batch_num: i32) -> String{
    pyo3::prepare_freethreaded_python();

    let mut result = String::new();
    Python::with_gil(|py| {
        let test_module = PyModule::import_bound(py, "crowd.api.project_api").unwrap();
        
        let args = (data, project_name, epochs, snapshot_period, batch_num);
        // println!("args inside python_backend.rs: {:?}", args);
        
        result = test_module.getattr("ProjectFunctions").unwrap().call0().unwrap().call_method1("get_conf_and_run", args).unwrap().to_string();
    });

    return result;
}

// pyo3::prepare_freethreaded_python();
//     let mut result = String::new();
//      // Arc to share output between threads
//      let output_capture = Arc::new(Mutex::new(Vec::new()));

//      // Thread for capturing output 
//      let output_capture_clone = Arc::clone(&output_capture);
//      thread::spawn(move || {
//          // Continuously capture stdout from Python
//          let mut stdout = std::io::stdout();
 
//          // Here we would replace stdout with a custom writer if needed
 
//          Python::with_gil(|py| {
//              let test_module = PyModule::import_bound(py, "crowd.api.project_api").unwrap();
//              let project_functions = test_module.getattr("ProjectFunctions").unwrap();
//              let args = (data, project_name, epochs, snapshot_period, 2);
//              let run_method = project_functions.getattr("get_conf_and_run").unwrap();
 
//             // Redirect stdout temporarily to capture output
//             let code = "import sys\nfrom io import StringIO\nsys.stdout = StringIO()\nsys.stderr = StringIO()";
//             Python::run_bound(code).unwrap();

            
//              // Call the Python function
//             result = run_method.call1(args).unwrap().to_string();
 
//              // Restore stdout after execution
//              let output = Python::with_gil(|py| {
//                 let sys_module = PyModule::import_bound(py, "sys").unwrap();

//                 let captured_output: &str = sys_module.getattr("stdout").unwrap().call_method0("getvalue").unwrap().extract().unwrap();
//                 captured_output
//              });
 
//              // Emit captured output to JS
//              app_handle.emit_all("simulation-output", output).unwrap();
//          });
//      });
 
//     return result;

pub fn edge_conf_run(data: String, project_name: String, epochs: i32, snapshot_period: i32) -> String{
    pyo3::prepare_freethreaded_python();

    let mut result = String::new();
    Python::with_gil(|py| {
        let test_module = PyModule::import_bound(py, "crowd.api.project_api").unwrap();
        
        let args = (data, project_name, epochs, snapshot_period);
        // println!("args inside python_backend.rs: {:?}", args);
        
        result = test_module.getattr("ProjectFunctions").unwrap().call0().unwrap().call_method1("edge_conf_run", args).unwrap().to_string();
    });

    return result;
}


pub fn init_and_run_simulation(project_name: String, epochs: i32, snapshot_period: i32) -> String{
    pyo3::prepare_freethreaded_python();

    let mut result = String::new();
    Python::with_gil(|py| {
        let test_module = PyModule::import_bound(py, "crowd.api.project_api").unwrap();
        
        let args = ( project_name, epochs, snapshot_period, 1);
        // println!("args inside python_backend.rs: {:?}", args);
        
        result = test_module.getattr("ProjectFunctions").unwrap().call0().unwrap().call_method1("init_and_run_simulation", args).unwrap().to_string();
    });

    return result;
}

pub fn edge_sim_run(project_name: String, epochs: i32, snapshot_period: i32) -> String{
    pyo3::prepare_freethreaded_python();

    let mut result = String::new();
    Python::with_gil(|py| {
        let test_module = PyModule::import_bound(py, "crowd.api.project_api").unwrap();
        
        let args = ( project_name, epochs, snapshot_period);
        // println!("args inside python_backend.rs: {:?}", args);
        
        result = test_module.getattr("ProjectFunctions").unwrap().call0().unwrap().call_method1("edge_sim_run", args).unwrap().to_string();
    });

    return result;
}