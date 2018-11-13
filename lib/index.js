"use strict";

var _propTypes = _interopRequireDefault(require("prop-types"));

var _inkdrop = require("inkdrop");

var _flowchart = _interopRequireDefault(require("flowchart.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Flowchart extends _inkdrop.React.Component {
  componentDidMount() {
    this.renderDiagram();
  }

  componentDidUpdate() {
    this.renderDiagram();
  }

  render() {
    return _inkdrop.React.createElement("div", {
      className: "markdown-flowchart",
      ref: el => this.canvas = el
    });
  }

  renderDiagram() {
    try {
      const code = this.props.children[0];

      const diagram = _flowchart.default.parse(code);

      this.canvas.innerHTML = '';
      diagram.drawSVG(this.canvas);
    } catch (error) {
      this.canvas.innerHTML = `
        <span class="markdown-flowchart ui error message mde-error-message">
          <div class="header">Failed to render flowchart. Please check if the syntax is correct.</div>
          <p>${error.message}</p>
          <p><a href="https://flowchart.js.org/" target="_blank">How to write flowchart</a></p>
        </span>
      `;
    }
  }

}

_defineProperty(Flowchart, "propTypes", {
  children: _propTypes.default.node
});

module.exports = {
  activate() {
    const {
      MDEPreview
    } = inkdrop.components.classes;

    if (MDEPreview) {
      MDEPreview.remarkCodeComponents.flowchart = Flowchart;
    }
  },

  deactivate() {
    const {
      MDEPreview
    } = inkdrop.components.classes;

    if (MDEPreview) {
      MDEPreview.remarkCodeComponents.flowchart = null;
    }
  }

};
