"use strict";

var _propTypes = _interopRequireDefault(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

var _flowchart = _interopRequireDefault(require("flowchart.js"));

var _inkdrop = require("inkdrop");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

      const diagram = _flowchart.default.parse(code);

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
  children: _propTypes.default.node
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