use pyo3::prelude::*;
// use pyo3::types::IntoPyDict; 
use pyo3::types::PyTuple;

// Beginning of General Methods from Crowd
pub fn list_projects() -> String {
    pyo3::prepare_freethreaded_python();

    let mut result = String::new();
    Python::with_gil(|py| {
        let test_module: Bound<PyModule> = PyModule::import_bound(py, "crowd.api.general_methods").unwrap();

        let new_class = test_module.getattr("GeneralMethods").unwrap().call0().unwrap();
        println!("New class: {:?}", new_class);
        result = new_class.call_method0("list_all_projects").unwrap().to_string();
        // println!("Result: {:?}", result);
    });
    return result;
}


pub fn list_simulations(project_name : String) -> String {
    pyo3::prepare_freethreaded_python();

    let mut result = String::new();
    Python::with_gil(|py| {
        let test_module: Bound<PyModule> = PyModule::import_bound(py, "crowd.api.general_methods").unwrap();

        let new_class = test_module.getattr("GeneralMethods").unwrap().call0().unwrap();

        let args = PyTuple::new_bound(py, vec![project_name]);
        result = new_class.call_method1("list_all_simulations", args).unwrap().to_string();
        // println!("Result: {:?}", result);
    });
    return result;
}

pub fn list_parameters(project_name : String, simulation_directory: String) -> String {
    pyo3::prepare_freethreaded_python();

    let mut result = String::new();
    Python::with_gil(|py| {
        let test_module: Bound<PyModule> = PyModule::import_bound(py, "crowd.api.general_methods").unwrap();

        let new_class = test_module.getattr("GeneralMethods").unwrap().call0().unwrap();

        let args = (project_name, simulation_directory);
        result = new_class.call_method1("list_all_parameters", args).unwrap().to_string();
        // println!("Result: {:?}", result);
    });
    return result;
}


pub fn list_datasets(project_name : String) -> String {
    pyo3::prepare_freethreaded_python();

    let mut result = String::new();
    Python::with_gil(|py| {
        let test_module: Bound<PyModule> = PyModule::import_bound(py, "crowd.api.general_methods").unwrap();

        let new_class = test_module.getattr("GeneralMethods").unwrap().call0().unwrap();

        let args = PyTuple::new_bound(py, vec![project_name]);
        result = new_class.call_method1("list_all_datasets", args).unwrap().to_string();
        // println!("Result: {:?}", result);
    });
    return result;
}

pub fn save_dataset(project_name : String, file_name: String, file_content: Vec<u8>) -> String {
    pyo3::prepare_freethreaded_python();

    let mut result = String::new();
    Python::with_gil(|py| {
        let test_module: Bound<PyModule> = PyModule::import_bound(py, "crowd.api.general_methods").unwrap();

        let new_class = test_module.getattr("GeneralMethods").unwrap().call0().unwrap();

        let args = (project_name, file_name, file_content);
        result = new_class.call_method1("save_dataset", args).unwrap().to_string();
        // println!("Result: {:?}", result);
    });
    return result;
}


pub fn load_simulation_info(project_name : String, simulation_directory: String) -> String {
    pyo3::prepare_freethreaded_python();

    let mut result = String::new();
    Python::with_gil(|py| {
        let test_module: Bound<PyModule> = PyModule::import_bound(py, "crowd.api.general_methods").unwrap();

        let new_class = test_module.getattr("GeneralMethods").unwrap().call0().unwrap();

        let args = (project_name, simulation_directory);
        result = new_class.call_method1("load_simulation_info", args).unwrap().to_string();
        // println!("Result: {:?}", result);
    });
    return result;
}

pub fn load_simulation_graph(project_name : String, simulation_directory: String) -> String {
    pyo3::prepare_freethreaded_python();

    let mut result = String::new();
    Python::with_gil(|py| {
        let test_module: Bound<PyModule> = PyModule::import_bound(py, "crowd.api.general_methods").unwrap();

        let new_class = test_module.getattr("GeneralMethods").unwrap().call0().unwrap();

        let args = (project_name, simulation_directory);
        result = new_class.call_method1("load_simulation_graph", args).unwrap().to_string();
        // println!("Result: {:?}", result);
    });
    return result;
}

pub fn load_parameter_file(project_name : String, simulation_directory: String, file_name: String) -> String {
    pyo3::prepare_freethreaded_python();

    let mut result = String::new();
    Python::with_gil(|py| {
        let test_module: Bound<PyModule> = PyModule::import_bound(py, "crowd.api.general_methods").unwrap();

        let new_class = test_module.getattr("GeneralMethods").unwrap().call0().unwrap();

        let args = (project_name, simulation_directory, file_name);
        result = new_class.call_method1("load_parameter_file", args).unwrap().to_string();
        // println!("Result: {:?}", result);
    });
    return result;
}

pub fn load_methods(project_name : String) -> String {
    pyo3::prepare_freethreaded_python();

    let mut result = String::new();
    Python::with_gil(|py| {
        let test_module: Bound<PyModule> = PyModule::import_bound(py, "crowd.api.general_methods").unwrap();

        let new_class = test_module.getattr("GeneralMethods").unwrap().call0().unwrap();

        let args = PyTuple::new_bound(py, vec![project_name]); 
        result = new_class.call_method1("load_methods_file", args).unwrap().to_string();
        // println!("Result: {:?}", result);
    });
    return result;
}

pub fn save_methods(project_name : String, code: String){
    pyo3::prepare_freethreaded_python();

    // let mut result = String::new();
    Python::with_gil(|py| {
        let test_module: Bound<PyModule> = PyModule::import_bound(py, "crowd.api.general_methods").unwrap();

        let new_class = test_module.getattr("GeneralMethods").unwrap().call0().unwrap();

        let args = (project_name, code); 
        new_class.call_method1("save_methods", args).unwrap().to_string();
        // println!("Result: {:?}", result);
    });
   
}

pub fn save_methods_list_view(project_name : String, list_view: String)  {
    pyo3::prepare_freethreaded_python();

    // let mut result = String::new();
    Python::with_gil(|py| {
        let test_module: Bound<PyModule> = PyModule::import_bound(py, "crowd.api.general_methods").unwrap();

        let new_class = test_module.getattr("GeneralMethods").unwrap().call0().unwrap();

        let args = (project_name, list_view); 
        new_class.call_method1("save_methods_list_view", args).unwrap().to_string();
        // println!("Result: {:?}", result);
    });
    
}
