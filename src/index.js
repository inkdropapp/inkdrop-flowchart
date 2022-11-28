import * as React from 'react'
import flowchart from 'flowchart.js'
import { markdownRenderer } from 'inkdrop'

class Flowchart extends React.Component {
  componentDidMount() {
    this.renderDiagram()
  }
  componentDidUpdate() {
    this.renderDiagram()
  }
  render() {
    return <div className="markdown-flowchart" ref={el => (this.canvas = el)} />
  }
  renderDiagram() {
    try {
      const code = this.props.children[0]
      const diagram = flowchart.parse(code)
      this.canvas.innerHTML = ''
      diagram.drawSVG(this.canvas)
      this.duplicateMarkers()
    } catch (error) {
      this.canvas.innerHTML = `
        <span class="ui error message mde-error-message">
          <div class="header">Failed to render flowchart. Please check if the syntax is correct.</div>
          <p>${error.message}</p>
          <p><a href="https://flowchart.js.org/" target="_blank">How to write flowchart</a></p>
        </span>
      `
    }
  }
  duplicateMarkers() {
    const { canvas } = this
    const markerDefs = document.querySelectorAll(
      '.markdown-flowchart path[id^=raphael-marker]'
    )
    for (const marker of markerDefs) {
      if (!canvas.querySelector(`path#${marker.id}`)) {
        const clonedMarker = marker.cloneNode()
        const defs = canvas.querySelector('defs')
        if (defs) {
          defs.appendChild(clonedMarker)
        }
      }
    }
  }
}

module.exports = {
  activate() {
    if (markdownRenderer) {
      markdownRenderer.remarkCodeComponents.flowchart = Flowchart
    }
  },

  deactivate() {
    if (markdownRenderer) {
      markdownRenderer.remarkCodeComponents.flowchart = null
    }
  }
}
