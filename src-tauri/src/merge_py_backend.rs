use pyo3::prelude::*;
use pyo3::types::PyModule;
use log::{info, warn, error};


/// Helper function to initialize `MergeMethods` class.
fn get_merge_methods(py: Python<'_>) -> PyResult<PyObject> {
    // Import required Python modules
    let sys = PyModule::import(py, "sys")?;
    let io = PyModule::import(py, "io")?;
   
    // Redirect stdout and stderr to an in-memory buffer
    let string_io = io.getattr("StringIO")?.call0()?;
    sys.setattr("stdout", string_io)?;
    sys.setattr("stderr", string_io)?;
    
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

/// Captures and logs Python stdout and stderr after a function call.
fn log_python_output(py: Python<'_>) {
    let sys = PyModule::import(py, "sys").expect("Failed to import sys module");

    // Retrieve and log stdout
    if let Ok(stdout) = sys.getattr("stdout") {
        if let Ok(output) = stdout.call_method0("getvalue") {
            let output: String = output.extract().unwrap_or_default();
            if !output.trim().is_empty() {
                info!("Python stdout: {}", output);
            }
        }
    }

    // Retrieve and log stderr
    if let Ok(stderr) = sys.getattr("stderr") {
        if let Ok(error_output) = stderr.call_method0("getvalue") {
            let error_output: String = error_output.extract().unwrap_or_default();
            if !error_output.trim().is_empty() {
                warn!("Python stderr: {}", error_output);
            }
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
            Ok(merge_methods_class) => {
                let result = merge_methods_class.call_method1(
                    py,
                    "merge_in_parent_sim",
                    (
                        project_name,
                        parent_simulation_dir,
                        simulation_dir,
                        json_file_name,
                        merge_method,
                    ),
                );

                // Capture and log Python stdout and stderr
                log_python_output(py);

                match result {
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
                }
            }
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
            Ok(merge_methods_class) => {
                let result = merge_methods_class.call_method1(
                    py,
                    "merge_with_other_sim",
                    (
                        project_name,
                        parent_simulation_dir,
                        simulation_dir,
                        json_file_name,
                        merge_dir_dict,
                    ),
                );

                // Capture and log Python stdout and stderr
                log_python_output(py);

                match result {
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
                }
            }
            Err(e) => {
                error!("Error initializing MergeMethods: {}", e);
                "Error initializing MergeMethods".to_string()
            }
        }
    })
}
