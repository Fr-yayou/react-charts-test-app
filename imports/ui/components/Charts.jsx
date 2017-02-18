import React, {Component,PropTypes} from 'react';
// import d3 from 'd3js';
import ReactDOM from 'react-dom';

export default class Charts extends Component {
  constructor(props) {
    super(props)
    this.updateCharts = this.updateCharts.bind(this);
  }
  updateCharts(props,request) {
    console.log(props,"props,,,,,project DATA")
    let projectData = props.projectData;
    let max = 0;

    projectData.forEach((data) => {
      console.log(data)
      if(data.qty > max) {
        max = data.qty;
      }
    });

    console.log(max,"maximum value of the array is this");
    let yScale = d3.scale.linear()
      .domain([0, max + 10])
      .range([props.height -15,0]);

    let xScale = d3.scale.ordinal()
      .domain(d3.range(projectData.length))
      .rangeRoundBands([20, props.width ], 0.15);

    let yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .ticks(10);
    let svg = d3.select("svg");

    if(request == 'update') {
      let yAxis = d3.svg.axis().scale(yScale).orient("left");
      svg.selectAll("g.y.axis").transition()
      	.duration(500)
        .call(yAxis);
    }
  //  yAxisG
    svg.append("g")
      .attr("class", "y axis")
      .attr("transform","translate(30,0)")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price");

    let bars = svg.selectAll("rect").data(projectData);
    bars.enter()
        .append("rect")
        .attr("fill", function(d,i) {
          return "rgba(80,"+ (190 + (i*10))+",80,1)";
        })

    bars.transition()
    	.duration(1000)
    	.attr("x", function(d, i) {
          return xScale(i);
        })
        .attr("y", function(d, i) {
          return yScale(d.qty);
        })
        .attr("width", xScale.rangeBand())
        .attr("height", function(d, i) {
          return props.height - yScale(d.qty)
        });

    bars.exit()
        .remove();

    let qtyLabel = svg.selectAll(".qtyLabel").data(projectData);
    qtyLabel.enter()
    	  .append("text")
    	  .attr("class", "qtyLabel")
    	  .style("font-weight", "bold")
    	  .attr("text-anchor", "middle")

    qtyLabel.transition()
    	.duration(1000)
		.attr("x", function(d, i) {
			return xScale(i) + xScale.rangeBand()/2;
		})
		.attr("y", function(d, i) {
    	return yScale(d.qty)
		})
		.text(function(d, i) {
			return d.qty;
		});

   	let xLabel = svg.selectAll(".xLabel").data(projectData);
    xLabel.enter()
    	  .append("text")
    	  .attr("class", "xLabel")

    xLabel.text(function(d, i) {
    	  	return d.xLabel;
    	  })
    	  .attr("text-anchor", "middle")
    	  .attr("x", function(d, i) {
    	  	return xScale(i) + xScale.rangeBand()/2;
    	  })
    	  .attr("y", function(d, i) {
    	  	return props.height - 5;
    	  });
  }

  componentDidMount() {
    let self = this;
    let el = ReactDOM.findDOMNode(self);
    let svg = d3.select(el)
          .append('svg')
          .attr("width", self.props.width)
          .attr("height", self.props.height);

          self.updateCharts(self.props)
  }
  componentDidUpdate(){
    // perform any preparations for an upcoming update
    console.warn('updating the charts.....................')
    this.updateCharts(this.props,'update')
  }
  render() {
    return(
      <div className="charts"></div>
    )
  }
}

Charts.propTypes = {
  width : React.PropTypes.number,
  height : React.PropTypes.number
}

Charts.defaultProps = {
  width : 640,
  height : 300
}
