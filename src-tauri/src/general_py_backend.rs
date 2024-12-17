use pyo3::prelude::*;
use pyo3::types::PyModule;
use log::{debug, error};

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

pub fn list_projects() -> String {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method0(py, "list_all_projects") {
                Ok(result) => match result.extract(py) {
                    Ok(result_str) => result_str,
                    Err(e) => {
                        error!("Error extracting result: {}", e);
                        "Error extracting result".to_string()
                    }
                },
                Err(e) => {
                    error!("Error calling list_all_projects: {}", e);
                    "Error calling list_all_projects".to_string()
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                "Error initializing GeneralMethods".to_string()
            }
        }
    })
}

pub fn list_simulations(project_name: String) -> String {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "list_all_simulations", (project_name,)) {
                Ok(result) => match result.extract(py) {
                    Ok(result_str) => result_str,
                    Err(e) => {
                        error!("Error extracting result: {}", e);
                        "Error extracting result".to_string()
                    }
                },
                Err(e) => {
                    error!("Error calling list_all_simulations: {}", e);
                    "Error calling list_all_simulations".to_string()
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                "Error initializing GeneralMethods".to_string()
            }
        }
    })
}

pub fn list_sim_and_count(project_name: String) -> String {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "list_sim_and_count", (project_name,)) {
                Ok(result) => match result.extract(py) {
                    Ok(result_str) => result_str,
                    Err(e) => {
                        error!("Error extracting result: {}", e);
                        "Error extracting result".to_string()
                    }
                },
                Err(e) => {
                    error!("Error calling list_sim_and_count: {}", e);
                    "Error calling list_sim_and_count".to_string()
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                "Error initializing GeneralMethods".to_string()
            }
        }
    })
}

pub fn get_subsimulations_info(project_name: String, simulation_directory: String) -> String {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "get_subsimulations_info", (project_name, simulation_directory)) {
                Ok(result) => match result.extract(py) {
                    Ok(result_str) => result_str,
                    Err(e) => {
                        error!("Error extracting result: {}", e);
                        "Error extracting result".to_string()
                    }
                },
                Err(e) => {
                    error!("Error calling get_subsimulations_info: {}", e);
                    "Error calling get_subsimulations_info".to_string()
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                "Error initializing GeneralMethods".to_string()
            }
        }
    })
}

pub fn list_parameters(project_name: String, simulation_directory: String) -> String {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "list_all_parameters", (project_name, simulation_directory)) {
                Ok(result) => match result.extract(py) {
                    Ok(result_str) => result_str,
                    Err(e) => {
                        error!("Error extracting result: {}", e);
                        "Error extracting result".to_string()
                    }
                },
                Err(e) => {
                    error!("Error calling list_all_parameters: {}", e);
                    "Error calling list_all_parameters".to_string()
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                "Error initializing GeneralMethods".to_string()
            }
        }
    })
}

pub fn list_datasets(project_name: String) -> String {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "list_all_datasets", (project_name,)) {
                Ok(result) => match result.extract(py) {
                    Ok(result_str) => result_str,
                    Err(e) => {
                        error!("Error extracting result: {}", e);
                        "Error extracting result".to_string()
                    }
                },
                Err(e) => {
                    error!("Error calling list_all_datasets: {}", e);
                    "Error calling list_all_datasets".to_string()
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                "Error initializing GeneralMethods".to_string()
            }
        }
    })
}

pub fn save_dataset(project_name: String, file_name: String, file_content: Vec<u8>) -> String {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "save_dataset", (project_name, file_name, file_content)) {
                Ok(result) => match result.extract(py) {
                    Ok(result_str) => result_str,
                    Err(e) => {
                        error!("Error extracting result: {}", e);
                        "Error extracting result".to_string()
                    }
                },
                Err(e) => {
                    error!("Error calling save_dataset: {}", e);
                    "Error calling save_dataset".to_string()
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                "Error initializing GeneralMethods".to_string()
            }
        }
    })
}

pub fn load_simulation_info(project_name: String, simulation_directory: String) -> String {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "load_simulation_info", (project_name, simulation_directory)) {
                Ok(result) => match result.extract(py) {
                    Ok(result_str) => result_str,
                    Err(e) => {
                        error!("Error extracting result: {}", e);
                        "Error extracting result".to_string()
                    }
                },
                Err(e) => {
                    error!("Error calling load_simulation_info: {}", e);
                    "Error calling load_simulation_info".to_string()
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                "Error initializing GeneralMethods".to_string()
            }
        }
    })
}

pub fn load_simulation_graph(project_name: String, simulation_directory: String) -> String {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "load_simulation_graph", (project_name, simulation_directory)) {
                Ok(result) => match result.extract(py) {
                    Ok(result_str) => result_str,
                    Err(e) => {
                        error!("Error extracting result: {}", e);
                        "Error extracting result".to_string()
                    }
                },
                Err(e) => {
                    error!("Error calling load_simulation_graph: {}", e);
                    "Error calling load_simulation_graph".to_string()
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                "Error initializing GeneralMethods".to_string()
            }
        }
    })
}

pub fn load_added_edges(project_name: String, simulation_directory: String) -> String {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "load_added_edges", (project_name, simulation_directory)) {
                Ok(result) => match result.extract(py) {
                    Ok(result_str) => result_str,
                    Err(e) => {
                        error!("Error extracting result: {}", e);
                        "Error extracting result".to_string()
                    }
                },
                Err(e) => {
                    error!("Error calling load_added_edges: {}", e);
                    "Error calling load_added_edges".to_string()
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                "Error initializing GeneralMethods".to_string()
            }
        }
    })
}

pub fn load_parameter_file(project_name: String, simulation_directory: String, file_name: String) -> String {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "load_parameter_file", (project_name, simulation_directory, file_name)) {
                Ok(result) => match result.extract(py) {
                    Ok(result_str) => result_str,
                    Err(e) => {
                        error!("Error extracting result: {}", e);
                        "Error extracting result".to_string()
                    }
                },
                Err(e) => {
                    error!("Error calling load_parameter_file: {}", e);
                    "Error calling load_parameter_file".to_string()
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                "Error initializing GeneralMethods".to_string()
            }
        }
    })
}

pub fn load_methods(project_name: String) -> String {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "load_methods_file", (project_name,)) {
                Ok(result) => match result.extract(py) {
                    Ok(result_str) => result_str,
                    Err(e) => {
                        error!("Error extracting result: {}", e);
                        "Error extracting result".to_string()
                    }
                },
                Err(e) => {
                    error!("Error calling load_methods_file: {}", e);
                    "Error calling load_methods_file".to_string()
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                "Error initializing GeneralMethods".to_string()
            }
        }
    })
}

pub fn get_conf(project_name: String) -> String {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "get_conf", (project_name,)) {
                Ok(result) => match result.extract(py) {
                    Ok(result_str) => result_str,
                    Err(e) => {
                        error!("Error extracting result: {}", e);
                        "Error extracting result".to_string()
                    }
                },
                Err(e) => {
                    error!("Error calling get_conf: {}", e);
                    "Error calling get_conf".to_string()
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                "Error initializing GeneralMethods".to_string()
            }
        }
    })
}

pub fn save_methods(project_name: String, code: String) -> String {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "save_methods", (project_name, code)) {
                Ok(_) => "Methods saved successfully".to_string(),
                Err(e) => {
                    error!("Error calling save_methods: {}", e);
                    "Error calling save_methods".to_string()
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                "Error initializing GeneralMethods".to_string()
            }
        }
    })
}

pub fn save_conf(project_name: String, content: String) -> String {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "save_conf", (project_name, content)) {
                Ok(_) => "Config saved successfully".to_string(),
                Err(e) => {
                    error!("Error calling save_conf: {}", e);
                    "Error calling save_conf".to_string()
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                "Error initializing GeneralMethods".to_string()
            }
        }
    })
}

pub fn save_methods_list_view(project_name: String, list_view: String) -> String {
    pyo3::prepare_freethreaded_python();
    Python::with_gil(|py| {
        match get_general_methods(py) {
            Ok(new_class) => match new_class.call_method1(py, "save_methods_list_view", (project_name, list_view)) {
                Ok(_) => "Methods list view saved successfully".to_string(),
                Err(e) => {
                    error!("Error calling save_methods_list_view: {}", e);
                    "Error calling save_methods_list_view".to_string()
                }
            },
            Err(e) => {
                error!("Error initializing GeneralMethods: {}", e);
                "Error initializing GeneralMethods".to_string()
            }
        }
    })
}