import { React } from 'inkdrop'
import flowchart from 'flowchart.js'

class Flowchart extends React.Component {
  componentDidMount () {
    this.renderDiagram()
  }
  componentDidUpdate () {
    this.renderDiagram()
  }
  render () {
    return <div ref='canvas' />
  }
  renderDiagram () {
    const code = this.props.children[0]
    const diagram = flowchart.parse(code)
    this.refs.canvas.innerHTML = ''
    diagram.drawSVG(this.refs.canvas)
  }
}

module.exports = {
  activate () {
    const { MDEPreview } = inkdrop.components.classes
    if (MDEPreview) {
      MDEPreview.remarkCodeComponents.flowchart = Flowchart
    }
  },

  deactivate () {
    const { MDEPreview } = inkdrop.components.classes
    if (MDEPreview) {
      MDEPreview.remarkCodeComponents.flowchart = null
    }
  }
}
