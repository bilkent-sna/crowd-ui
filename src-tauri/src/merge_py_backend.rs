use pyo3::prelude::*;
use pyo3::types::PyModule;
use log::{debug, error};

/// Helper function to initialize `MergeMethods` class.
fn get_merge_methods(py: Python<'_>) -> PyResult<PyObject> {
    let test_module = PyModule::import(py, "crowd.api.merge_methods");
    match test_module {
        Ok(module) => match module.getattr("MergeMethods") {
            Ok(merge_methods_class) => match merge_methods_class.call0() {
                Ok(class_instance) => Ok(class_instance.into()),
                Err(e) => {
                    error!("Error calling MergeMethods constructor: {}", e);
                    Err(e.into())
                }
            },
            Err(e) => {
                error!("Error getting MergeMethods class: {}", e);
                Err(e.into())
            }
        },
        Err(e) => {
            error!("Error importing module 'crowd.api.merge_methods': {}", e);
            Err(e.into())
        }
    }
}

/// Merges a parent simulation using Python's 'crowd.api.merge_methods'.
pub fn merge_parent_sim(
    project_name: String,
    parent_simulation_dir: String,
    simulation_dir: String,
    json_file_name: String,
    merge_method: String,
) -> String {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_merge_methods(py) {
            Ok(merge_methods_class) => match merge_methods_class.call_method1(
                py,
                "merge_in_parent_sim",
                (
                    project_name,
                    parent_simulation_dir,
                    simulation_dir,
                    json_file_name,
                    merge_method,
                ),
            ) {
                Ok(result) => match result.extract(py) {
                    Ok(result_str) => result_str,
                    Err(e) => {
                        error!("Error extracting result: {}", e);
                        "Error extracting result".to_string()
                    }
                },
                Err(e) => {
                    error!("Error calling merge_in_parent_sim: {}", e);
                    "Error calling merge_in_parent_sim".to_string()
                }
            },
            Err(e) => {
                error!("Error initializing MergeMethods: {}", e);
                "Error initializing MergeMethods".to_string()
            }
        }
    })
}

/// Merges another simulation using Python's 'crowd.api.merge_methods'.
pub fn merge_other_sim(
    project_name: String,
    parent_simulation_dir: String,
    simulation_dir: String,
    json_file_name: String,
    merge_dir_dict: String,
) -> String {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_merge_methods(py) {
            Ok(merge_methods_class) => match merge_methods_class.call_method1(
                py,
                "merge_with_other_sim",
                (
                    project_name,
                    parent_simulation_dir,
                    simulation_dir,
                    json_file_name,
                    merge_dir_dict,
                ),
            ) {
                Ok(result) => match result.extract(py) {
                    Ok(result_str) => result_str,
                    Err(e) => {
                        error!("Error extracting result: {}", e);
                        "Error extracting result".to_string()
                    }
                },
                Err(e) => {
                    error!("Error calling merge_with_other_sim: {}", e);
                    "Error calling merge_with_other_sim".to_string()
                }
            },
            Err(e) => {
                error!("Error initializing MergeMethods: {}", e);
                "Error initializing MergeMethods".to_string()
            }
        }
    })
}
