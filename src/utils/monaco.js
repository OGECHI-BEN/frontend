import * as monaco from 'monaco-editor'

let isInitialized = false

export const initMonaco = async (container, options = {}) => {
  if (!isInitialized) {
    // Load Monaco editor
    await import('monaco-editor/esm/vs/editor/editor.worker')
    await import('monaco-editor/esm/vs/language/json/json.worker')
    await import('monaco-editor/esm/vs/language/css/css.worker')
    await import('monaco-editor/esm/vs/language/html/html.worker')
    await import('monaco-editor/esm/vs/language/typescript/ts.worker')

    // Define custom theme
    monaco.editor.defineTheme('vs-dark-custom', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: 'C586C0' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'function', foreground: 'DCDCAA' },
      ],
      colors: {
        'editor.background': '#1E1E1E',
        'editor.foreground': '#D4D4D4',
        'editor.lineHighlightBackground': '#2A2D2E',
        'editor.selectionBackground': '#264F78',
        'editor.inactiveSelectionBackground': '#3A3D41',
      },
    })

    isInitialized = true
  }

  // Create editor instance
  const editor = monaco.editor.create(container, {
    value: options.value || '',
    language: options.language || 'javascript',
    theme: options.theme || 'vs-dark-custom',
    readOnly: options.readOnly || false,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    lineNumbers: 'on',
    roundedSelection: false,
    scrollbar: {
      vertical: 'visible',
      horizontal: 'visible',
      useShadows: false,
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10,
    },
    ...options,
  })

  return editor
}

export { monaco }
