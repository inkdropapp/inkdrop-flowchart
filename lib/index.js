'use strict';

var _inkdrop = require('inkdrop');

var _flowchart = require('flowchart.js');

var _flowchart2 = _interopRequireDefault(_flowchart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Flowchart = class Flowchart extends _inkdrop.React.Component {
  componentDidMount() {
    this.renderDiagram();
  }
  componentDidUpdate() {
    this.renderDiagram();
  }
  render() {
    return _inkdrop.React.createElement('div', { ref: 'canvas' });
  }
  renderDiagram() {
    const code = this.props.children[0];
    const diagram = _flowchart2.default.parse(code);
    this.refs.canvas.innerHTML = '';
    diagram.drawSVG(this.refs.canvas);
  }
};


module.exports = {
  activate() {
    const { MDEPreview } = inkdrop.components.classes;
    if (MDEPreview) {
      MDEPreview.remarkCodeComponents.flowchart = Flowchart;
    }
  },

  deactivate() {
    const { MDEPreview } = inkdrop.components.classes;
    if (MDEPreview) {
      MDEPreview.remarkCodeComponents.flowchart = null;
    }
  }
};