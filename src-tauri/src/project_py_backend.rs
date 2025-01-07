use pyo3::prelude::*;
use pyo3::types::PyModule;
use log::{info, warn, error};

/// Helper function to load the Python `ProjectFunctions` class.
fn get_project_functions(py: Python<'_>) -> PyResult<PyObject> {
    // Import required Python modules
    let sys = PyModule::import(py, "sys")?;
    let io = PyModule::import(py, "io")?;
  
    // Redirect stdout and stderr to an in-memory buffer
    let string_io = io.getattr("StringIO")?.call0()?;
    sys.setattr("stdout", string_io)?;
    sys.setattr("stderr", string_io)?;

    let test_module = PyModule::import(py, "crowd.api.project_api");
    match test_module {
        Ok(module) => match module.getattr("ProjectFunctions") {
            Ok(class) => match class.call0() {
                Ok(instance) => Ok(instance.into()),  // Use `.into()` to convert &PyAny to Py<PyAny>
                Err(e) => {
                    error!("Error calling ProjectFunctions constructor: {}", e);
                    Err(e.into())
                }
            },
            Err(e) => {
                error!("Error getting ProjectFunctions attribute: {}", e);
                Err(e.into())
            }
        },
        Err(e) => {
            error!("Error importing crowd.api.project_api: {}", e);
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

/// Creates a new project using Python's `crowd.api.project_api.ProjectFunctions.create_project`.
pub fn create_project(name: String, date: String, info: String, node_or_edge: String) -> Result<String, String>  {
    pyo3::prepare_freethreaded_python();

    Python::with_gil(|py| {
        match get_project_functions(py) {
            Ok(project_functions) => {
                // Clone the String values to avoid moving them into the tuple
                let args = (name.clone(), date.clone(), info.clone(), node_or_edge.clone());
                match project_functions.call_method1(py, "create_project", args) {
                    Ok(_) => {
                        info!("Project created successfully: {}", name);
                        log_python_output(py);
                        Ok("Project created successfully".to_string())
                    },
                    Err(e) => {
                        error!("Error calling create_project: {}", e);
                        log_python_output(py);
                        Err(format!("Error calling create_project: {}", e))
                    },
                }
               
            }
            Err(e) => {
                error!("Error initializing ProjectFunctions: {}", e);
                Err(format!("Error initializing ProjectFunctions: {}", e))
            },
        }
    })
}


/// Sends configuration and runs the simulation with parameters.
pub fn send_conf_and_run(
    data: String,
    project_name: String,
    epochs: i32,
    snapshot_period: i32,
    batch_num: i32,
) -> Result<String, String> {

    pyo3::prepare_freethreaded_python();

    Python::with_gil(|py| {
        match get_project_functions(py) {
            Ok(project_functions) => {
                let args = (data, project_name, epochs, snapshot_period, batch_num);
                match project_functions.call_method1(py, "get_conf_and_run", args) {
                    Ok(py_result) => {
                        let result: String = py_result.extract(py).unwrap_or_default();
                        log_python_output(py);
                        if result.is_empty() {
                            warn!("Simulation returned an empty result.");
                        } else {
                            info!("Simulation completed successfully. Result: {}", result);
                        }
                        Ok(result)
                    }
                    Err(e) => {
                        error!("Error calling get_conf_and_run: {}", e);
                        log_python_output(py);
                        Err(format!("Error calling get_conf_and_run: {}", e))
                    }
                }
            }
            Err(e) => {
                error!("Error initializing ProjectFunctions: {}", e);
                Err(format!("Error initializing ProjectFunctions: {}", e))
            }
        }
    })
}

/// Runs the edge configuration with given parameters.
pub fn edge_conf_run(data: String, project_name: String, epochs: i32, snapshot_period: i32) -> Result<String, String> {
    pyo3::prepare_freethreaded_python();

    Python::with_gil(|py| {
        match get_project_functions(py) {
            Ok(project_functions) => {
                let args = (data, project_name, epochs, snapshot_period);
                match project_functions.call_method1(py, "edge_conf_run", args) {
                    Ok(py_result) => {
                        let result: String = py_result.extract(py).unwrap_or_default();
                        log_python_output(py);
                        if result.is_empty() {
                            warn!("Simulation returned an empty result.");
                        } else {
                            info!("Simulation completed successfully. Result: {}", result);
                        }
                        Ok(result)
                    }
                    Err(e) => {
                        error!("Error calling edge_conf_run: {}", e);
                        log_python_output(py);
                        Err(format!("Error calling edge_conf_run: {}", e))
                    }
                }
            }
            Err(e) => {
                error!("Error initializing ProjectFunctions: {}", e);
                Err(format!("Error initializing ProjectFunctions: {}", e))
            }
        }
    })
}

/// Initializes and runs a simulation for the given project.
pub fn init_and_run_simulation(project_name: String, epochs: i32, snapshot_period: i32) -> Result<String, String> {
    pyo3::prepare_freethreaded_python();

    Python::with_gil(|py| {
        match get_project_functions(py) {
            Ok(project_functions) => {
                let args = (project_name, epochs, snapshot_period, 1);
                match project_functions.call_method1(py, "init_and_run_simulation", args) {
                    Ok(py_result) => {
                        let result: String = py_result.extract(py).unwrap_or_default();
                        log_python_output(py);
                        if result.is_empty() {
                            warn!("Simulation returned an empty result.");
                        } else {
                            info!("Simulation completed successfully. Result: {}", result);
                        }
                        Ok(result)
                    }
                    Err(e) => {
                        error!("Error calling init_and_run_simulation: {}", e);
                        log_python_output(py);
                        Err(format!("Error calling init_and_run_simulation: {}", e))
                    }
                }
            }
            Err(e) => {
                error!("Error initializing ProjectFunctions: {}", e);
                Err(format!("Error initializing ProjectFunctions: {}", e))
            }
        }
    })
}

/// Runs the edge simulation with given parameters.
pub fn edge_sim_run(project_name: String, epochs: i32, snapshot_period: i32) -> Result<String, String> {
    pyo3::prepare_freethreaded_python();
    
    Python::with_gil(|py| {
        match get_project_functions(py) {
            Ok(project_functions) => {
                let args = (project_name, epochs, snapshot_period);
                match project_functions.call_method1(py, "edge_sim_run", args) {
                    Ok(py_result) => {
                        let result: String = py_result.extract(py).unwrap_or_default();
                        log_python_output(py);
                        if result.is_empty() {
                            warn!("Simulation returned an empty result.");
                        } else {
                            info!("Simulation completed successfully. Result: {}", result);
                        }
                        Ok(result)
                    }
                    Err(e) => {
                        error!("Error calling edge_sim_run: {}", e);
                        log_python_output(py);
                        Err(format!("Error calling edge_sim_run: {}", e))
                    }
                }
            }
            Err(e) => {
                error!("Error initializing ProjectFunctions: {}", e);
                Err(format!("Error initializing ProjectFunctions: {}", e))
            }
        }
    })
}
