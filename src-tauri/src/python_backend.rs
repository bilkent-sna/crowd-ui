use pyo3::prelude::*;
// use pyo3::types::IntoPyDict; 
// use pyo3::types::PyTuple;



pub fn test_crowd_class_parameter() -> String {
    pyo3::prepare_freethreaded_python();
    let input1 = "Input Text as Class Parameter!";
    let input2 = 235;
    let mut result = String::new();
    Python::with_gil(|py| {
        let test_module = PyModule::import_bound(py, "crowd.api.test").unwrap();
        
        let args = (input1, input2);

        let new_class = test_module.getattr("test").unwrap().call1(args).unwrap();
        
        result = new_class.call_method0("get_values").unwrap().to_string();  
        println!("Result: {:?}", result);
    });
    return result;
}


pub fn test_crowd_method_parameter() -> String {
    pyo3::prepare_freethreaded_python();
    let input1 = "Input Text as Method Parameter!";
    let input2 = 235;
    let mut result = String::new();
    Python::with_gil(|py| {
        let test_module = PyModule::import_bound(py, "crowd.api.test").unwrap();
        
        let args = (input1, input2);
        
        result = test_module.getattr("test2").unwrap().call0().unwrap().call_method1("get_values",args).unwrap().to_string();
        println!("Result: {:?}", result);
    });
    return result;
}
    
pub fn test_crowd_time() -> String {
    pyo3::prepare_freethreaded_python();

    let mut result = String::new();
    Python::with_gil(|py| {
        let test_module = PyModule::import_bound(py, "crowd.api.test").unwrap();
        
        result = test_module.getattr("test2").unwrap().call0().unwrap().call_method0("waitForX").unwrap().to_string();
        println!("Result: {:?}", result);
    });
    return result;
}


