import PropTypes from 'prop-types'
import { React } from 'inkdrop'
import flowchart from 'flowchart.js'

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
}

module.exports = {
  activate() {
    const { MDEPreview } = inkdrop.components.classes
    if (MDEPreview) {
      MDEPreview.remarkCodeComponents.flowchart = Flowchart
    }
  },

  deactivate() {
    const { MDEPreview } = inkdrop.components.classes
    if (MDEPreview) {
      MDEPreview.remarkCodeComponents.flowchart = null
    }
  }
}
