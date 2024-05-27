
  <script>
    import { Button, Container, Row, Col, Form, FormGroup, Label, Input, ListGroup, ListGroupItem } from 'sveltestrap';
    import { saveAs } from 'file-saver';
    import CodeMirrorEditor from 'svelte-codemirror-editor';
    import { python } from '@codemirror/lang-python';
  
    let code = '';
    let functions = [];
    let functionSettings = {};
  
    function extractFunctionNames(code) {
      const regex = /def\s+(\w+)\s*\(/g;
      let match;
      const result = [];
      while ((match = regex.exec(code)) !== null) {
        result.push(match[1]);
      }
      return result;
    }
  
    function handleCodeChange(value) {
      code = value;
      functions = extractFunctionNames(code);
      functions.forEach(func => {
        if (!functionSettings[func]) {
          functionSettings[func] = { every_iteration: false, after_simulation: false };
        }
      });
    }
  
    function handleCheckboxChange(func, key, value) {
      functionSettings[func][key] = value;
    }
  
    function saveMethods() {
      handleCodeChange(code);
      console.log('Methods saved', code, functionSettings);
    }
  
    function downloadMethods() {
      const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, 'methods.py');
    }
  
  </script>
  
  <Container>
    <Row>
      <Col md="9" style="border-right: 1px solid #cecece;">
        <h2>Code View</h2>
        <p>Here, we should provide user information about which simulation parameters they can use.</p>
        <Button color="primary" on:click={saveMethods}>Save Methods</Button>
        <Button color="secondary" on:click={downloadMethods}>Download Methods</Button>
        <div class="code-editor">
          <CodeMirrorEditor
            bind:value={code}
            lang={python()}
          />
        </div>
      </Col>
      <Col md="3">
        <h2>List View</h2>
        <p>Choose when do you want to call each function. If no option is selected, it will not be called explicitly. This can be useful in helper methods which you call from other methods.</p>
        <Container>
            <ListGroup>
                {#each functions as func}
                    <ListGroupItem color="danger">
                    <Form key={func}>
                        <div>{func}</div>
                        <!-- <hr> -->
                        <FormGroup check>
                            <Input 
                            type="checkbox" 
                            id="every_iteration_{func}"
                            bind:checked={functionSettings[func].every_iteration} 
                            on:change={() => handleCheckboxChange(func, 'every_iteration', !functionSettings[func].every_iteration)} 
                            label="Every iteration"
                            />
                            <Input 
                            type="checkbox" 
                            id="after_simulation_{func}"
                            bind:checked={functionSettings[func].after_simulation} 
                            on:change={() => handleCheckboxChange(func, 'after_simulation', !functionSettings[func].after_simulation)} 
                            label="After simulation"/>
                        </FormGroup>
                    </Form>
                    </ListGroupItem>
                {/each}
        </ListGroup>
        </Container>
      </Col>
    </Row>
  </Container>
  
  <style>
    .code-editor {
      width: 100%;
      height: 300px;
      font-family: monospace;
      margin-bottom: 20px;
    }
  </style>
  
  