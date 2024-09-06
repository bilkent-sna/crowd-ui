use pyo3::prelude::*;
// use pyo3::types::PyTuple;

// Beginning of merge methods from Crowd
pub fn merge_parent_sim(project_name: String, 
            parent_simulation_dir: String,
            simulation_dir: String, 
            json_file_name: String, 
            merge_method: String) -> String{

    pyo3::prepare_freethreaded_python();

    let mut result = String::new();
    Python::with_gil(|py| {
    let test_module: Bound<PyModule> = PyModule::import_bound(py, "crowd.api.merge_methods").unwrap();

    let new_class = test_module.getattr("MergeMethods").unwrap().call0().unwrap();

    let args = (project_name, parent_simulation_dir, simulation_dir, json_file_name, merge_method);
    result = new_class.call_method1("merge_in_parent_sim", args).unwrap().to_string();
    // println!("Result: {:?}", result);
    });
    return result;
}


pub fn merge_other_sim(project_name: String, 
                        parent_simulation_dir: String,
                        simulation_dir: String, 
                        json_file_name: String, 
                        merge_dir_dict: String) -> String{
    pyo3::prepare_freethreaded_python();

    let mut result = String::new();
    Python::with_gil(|py| {
        let test_module: Bound<PyModule> = PyModule::import_bound(py, "crowd.api.merge_methods").unwrap();

        let new_class = test_module.getattr("MergeMethods").unwrap().call0().unwrap();

        let args = (project_name, parent_simulation_dir, simulation_dir, json_file_name, merge_dir_dict);
        result = new_class.call_method1("merge_with_other_sim", args).unwrap().to_string();
        // println!("Result: {:?}", result);
    });
    return result;
}