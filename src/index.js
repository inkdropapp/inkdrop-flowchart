import PropTypes from 'prop-types'
import * as React from 'react'
import flowchart from 'flowchart.js'
import { markdownRenderer } from 'inkdrop'

class Flowchart extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }
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
      this.duplicateMarkerBlock()
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
  duplicateMarkerBlock () {
    const { canvas } = this
    const marker = document.querySelector('path#raphael-marker-block')
    if (marker && !canvas.querySelector('path#raphael-marker-block')) {
      const clonedMarker = marker.cloneNode()
      const defs = canvas.querySelector('defs')
      if (defs) {
        defs.appendChild(clonedMarker)
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
