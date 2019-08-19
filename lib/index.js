"use strict";

var _propTypes = _interopRequireDefault(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

var _flowchart = _interopRequireDefault(require("flowchart.js"));

var _inkdrop = require("inkdrop");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Flowchart extends React.Component {
  componentDidMount() {
    this.renderDiagram();
  }

  componentDidUpdate() {
    this.renderDiagram();
  }

  render() {
    return React.createElement("div", {
      className: "markdown-flowchart",
      ref: el => this.canvas = el
    });
  }

  renderDiagram() {
    try {
      const code = this.props.children[0];

      const diagram = _flowchart["default"].parse(code);

      this.canvas.innerHTML = '';
      diagram.drawSVG(this.canvas);
      this.duplicateMarkers();
    } catch (error) {
      this.canvas.innerHTML = `
        <span class="ui error message mde-error-message">
          <div class="header">Failed to render flowchart. Please check if the syntax is correct.</div>
          <p>${error.message}</p>
          <p><a href="https://flowchart.js.org/" target="_blank">How to write flowchart</a></p>
        </span>
      `;
    }
  }

  duplicateMarkers() {
    const {
      canvas
    } = this;
    const markerDefs = document.querySelectorAll('.markdown-flowchart path[id^=raphael-marker]');

    for (const marker of markerDefs) {
      if (!canvas.querySelector(`path#${marker.id}`)) {
        const clonedMarker = marker.cloneNode();
        const defs = canvas.querySelector('defs');

        if (defs) {
          defs.appendChild(clonedMarker);
        }
      }
    }
  }

}

_defineProperty(Flowchart, "propTypes", {
  children: _propTypes["default"].node
});

module.exports = {
  activate() {
    if (_inkdrop.markdownRenderer) {
      _inkdrop.markdownRenderer.remarkCodeComponents.flowchart = Flowchart;
    }
  },

  deactivate() {
    if (_inkdrop.markdownRenderer) {
      _inkdrop.markdownRenderer.remarkCodeComponents.flowchart = null;
    }
  }

};