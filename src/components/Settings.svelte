<script>
    import { onMount } from 'svelte';
    import { EditorState } from '@codemirror/state';
    import { EditorView, keymap } from '@codemirror/view';
    import { basicSetup } from 'codemirror';
    import { indentWithTab } from '@codemirror/commands';
    import { yaml } from '@codemirror/lang-yaml';

  
    let editor;
    let yamlContent = '';
  
    onMount(async () => {
      // Load the initial YAML content from the file
      const response = await fetch('src/project/conf.yaml');
      yamlContent = await response.text();
  
      // Initialize the CodeMirror editor
      editor = new EditorView({
        state: EditorState.create({
          doc: yamlContent,
          extensions: [
            basicSetup,
            yaml(),
            keymap.of([indentWithTab])
          ]
        }),
        parent: document.querySelector('#editor')
      });
    });
  
    async function saveYaml() {
      const content = editor.state.doc.toString();
      // Save the content to the YAML file
      await fetch('/path/to/conf.yaml', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/yaml'
        },
        body: content
      });
      alert('Settings saved successfully!');
    }

    function downloadYaml() {
        const content = editor.state.doc.toString();
        const blob = new Blob([content], { type: 'application/yaml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'conf2.yaml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
  </script>
  
  <style>
    #editor {
      width: 100%;
      height: 80vh;
      border: 1px solid #ddd;
      margin-bottom: 20px;
    }
  </style>
  
  <div>
    <button on:click={saveYaml}>Save Configuration</button>
    <button on:click={downloadYaml}>Download Configuration</button>
    <button>Rerun Simulation</button>
    <div id="editor"></div>
  </div>
  