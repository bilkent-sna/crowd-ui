use pyo3::prelude::*;
use pyo3::types::PyModule;
use log::error;
// use log::debug;

/// Helper function to initialize `GeneralMethods` class.
fn get_general_methods(py: Python<'_>) -> PyResult<PyObject> {
    let test_module = PyModule::import(py, "crowd.api.general_methods");
    match test_module {
        Ok(module) => {
            match module.getattr("GeneralMethods") {
                Ok(general_methods_class) => match general_methods_class.call0() {
                    Ok(class_instance) => Ok(class_instance.into()),
                    Err(e) => {
                        error!("Error calling GeneralMethods constructor: {}", e);
                        Err(e.into())
                    }
                },
                Err(e) => {
                    error!("Error getting GeneralMethods class: {}", e);
                    Err(e.into())
                }
            }
        }
        Err(e) => {
            error!("Error importing module 'crowd.api.general_methods': {}", e);
            Err(e.into())
        }
    }
}

pub fn list_projects() -> Result<String, String> {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method0(py, "list_all_projects") {
                Ok(result) => match result.extract::<String>(py) {
                    Ok(result_str) => Ok(result_str), // Wrap the result in `Ok`
                    Err(e) => {
                        error!("Error extracting result: {}", e);
                        Err(format!("Error extracting result: {}", e))
                    }
                },
                Err(e) => {
                    error!("Error calling list_all_projects: {}", e);
                    Err(format!("Error calling list_all_projects: {}", e))
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                Err(format!("Error initializing GeneralMethods: {}", e))
            }
        }
    })
}


pub fn list_simulations(project_name: String) -> Result<String, String> {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "list_all_simulations", (project_name,)) {
                Ok(result) => match result.extract::<String>(py) {
                    Ok(result_str) => Ok(result_str),
                    Err(e) => {
                        error!("Error extracting result: {}", e);
                        Err(format!("Error extracting result: {}", e))
                    }
                },
                Err(e) => {
                    error!("Error calling list_all_simulations: {}", e);
                    Err(format!("Error calling list_all_simulations: {}", e))
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                Err(format!("Error initializing GeneralMethods: {}", e))
            }
        }
    })
}

pub fn list_sim_and_count(project_name: String) -> Result<String, String> {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "list_sim_and_count", (project_name,)) {
                Ok(result) => result.extract::<String>(py).map_err(|e| format!("Error extracting result: {}", e)),
                Err(e) => Err(format!("Error calling list_sim_and_count: {}", e)),
            },
            Err(e) => Err(format!("Error initializing GeneralMethods: {}", e)),
        }
    })
}

pub fn get_subsimulations_info(project_name: String, simulation_directory: String) -> Result<String, String> {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "get_subsimulations_info", (project_name, simulation_directory)) {
                Ok(result) => result.extract::<String>(py).map_err(|e| format!("Error extracting result: {}", e)),
                Err(e) => Err(format!("Error calling get_subsimulations_info: {}", e)),
            },
            Err(e) => Err(format!("Error initializing GeneralMethods: {}", e)),
        }
    })
}


pub fn list_parameters(project_name: String, simulation_directory: String) -> Result<String, String> {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "list_all_parameters", (project_name, simulation_directory)) {
                Ok(result) => result.extract::<String>(py).map_err(|e| format!("Error extracting result: {}", e)),
                Err(e) => Err(format!("Error calling list_all_parameters: {}", e)),
            },
            Err(e) => Err(format!("Error initializing GeneralMethods: {}", e)),
        }
    })
}

pub fn list_datasets(project_name: String) -> Result<String, String> {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "list_all_datasets", (project_name,)) {
                Ok(result) => result.extract::<String>(py).map_err(|e| format!("Error extracting result: {}", e)),
                Err(e) => Err(format!("Error calling list_all_datasets: {}", e)),
            },
            Err(e) => Err(format!("Error initializing GeneralMethods: {}", e)),
        }
    })
}

pub fn save_dataset(project_name: String, file_name: String, file_content: Vec<u8>) -> Result<String, String> {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "save_dataset", (project_name, file_name, file_content)) {
                Ok(result) => result.extract::<String>(py).map_err(|e| format!("Error extracting result: {}", e)),
                Err(e) => Err(format!("Error calling save_dataset: {}", e)),
            },
            Err(e) => Err(format!("Error initializing GeneralMethods: {}", e)),
        }
    })
}

pub fn load_simulation_info(project_name: String, simulation_directory: String) -> Result<String, String> {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "load_simulation_info", (project_name, simulation_directory)) {
                Ok(result) => result.extract::<String>(py).map_err(|e| format!("Error extracting result: {}", e)),
                Err(e) => Err(format!("Error calling load_simulation_info: {}", e)),
            },
            Err(e) => Err(format!("Error initializing GeneralMethods: {}", e)),
        }
    })
}

pub fn load_simulation_graph(project_name: String, simulation_directory: String) -> Result<String, String> {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "load_simulation_graph", (project_name, simulation_directory)) {
                Ok(result) => result.extract::<String>(py).map_err(|e| format!("Error extracting result: {}", e)),
                Err(e) => Err(format!("Error calling load_simulation_graph: {}", e)),
            },
            Err(e) => Err(format!("Error initializing GeneralMethods: {}", e)),
        }
    })
}

pub fn load_added_edges(project_name: String, simulation_directory: String) -> Result<String, String> {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "load_added_edges", (project_name, simulation_directory)) {
                Ok(result) => result.extract::<String>(py).map_err(|e| format!("Error extracting result: {}", e)),
                Err(e) => Err(format!("Error calling load_added_edges: {}", e)),
            },
            Err(e) => Err(format!("Error initializing GeneralMethods: {}", e)),
        }
    })
}

pub fn load_parameter_file(project_name: String, simulation_directory: String, file_name: String) -> Result<String, String> {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "load_parameter_file", (project_name, simulation_directory, file_name)) {
                Ok(result) => match result.extract::<String>(py) {
                    Ok(result_str) => Ok(result_str),
                    Err(e) => {
                        error!("Error extracting result: {}", e);
                        Err(format!("Error extracting result: {}", e))
                    }
                },
                Err(e) => {
                    error!("Error calling load_parameter_file: {}", e);
                    Err(format!("Error calling load_parameter_file: {}", e))
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                Err(format!("Error initializing GeneralMethods: {}", e))
            }
        }
    })
}

pub fn load_methods(project_name: String) -> Result<String, String> {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "load_methods_file", (project_name,)) {
                Ok(result) => match result.extract::<String>(py) {
                    Ok(result_str) => Ok(result_str),
                    Err(e) => {
                        error!("Error extracting result: {}", e);
                        Err(format!("Error extracting result: {}", e))
                    }
                },
                Err(e) => {
                    error!("Error calling load_methods_file: {}", e);
                    Err(format!("Error calling load_methods_file: {}", e))
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                Err(format!("Error initializing GeneralMethods: {}", e))
            }
        }
    })
}

pub fn get_conf(project_name: String) -> Result<String, String> {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "get_conf", (project_name,)) {
                Ok(result) => match result.extract::<String>(py) {
                    Ok(result_str) => Ok(result_str),
                    Err(e) => {
                        error!("Error extracting result: {}", e);
                        Err(format!("Error extracting result: {}", e))
                    }
                },
                Err(e) => {
                    error!("Error calling get_conf: {}", e);
                    Err(format!("Error calling get_conf: {}", e))
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                Err(format!("Error initializing GeneralMethods: {}", e))
            }
        }
    })
}

pub fn save_methods(project_name: String, code: String) ->  Result<String, String>  {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "save_methods", (project_name, code)) {
                Ok(_) => Ok("Methods saved successfully".to_string()),
                Err(e) => {
                    error!("Error calling save_methods: {}", e);
                    Err(format!("Error calling save_methods: {}", e))
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                Err(format!("Error initializing GeneralMethods: {}", e))

            }
        }
    })
}

pub fn save_conf(project_name: String, content: String) -> Result<String, String> {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "save_conf", (project_name, content)) {
                Ok(_) => Ok("Config saved successfully".to_string()),
                Err(e) => {
                    error!("Error calling save_conf: {}", e);
                    Err(format!("Error calling save_conf: {}", e))
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                Err(format!("Error initializing GeneralMethods: {}", e))
            }
        }
    })
}

pub fn save_methods_list_view(project_name: String, list_view: String) -> Result<String, String> {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "save_methods_list_view", (project_name, list_view)) {
                Ok(_) => Ok("Methods list view saved successfully".to_string()),
                Err(e) => {
                    error!("Error calling save_methods_list_view: {}", e);
                    Err(format!("Error calling save_methods_list_view: {}", e))
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                Err(format!("Error initializing GeneralMethods: {}", e))
            }
        }
    })
}