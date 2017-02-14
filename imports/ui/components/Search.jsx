import React , { Component, PropTypes} from 'react';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelectBox : false,
      showInput : false,
      type : ''
    }
  }

  handleFilterDataSubmit(event) {
    event.preventDefault();
    let refObj = this.refs;
    let dataToSearch;
    if(this.state.type == 'course') {
      dataToSearch = refObj.courses[refObj.courses.selectedIndex].value;
    }
    else if (this.state.type == 'classes') {
      dataToSearch = refObj.classes[refObj.classes.selectedIndex].value;
    }
    else {
      dataToSearch = refObj.filterInput.value;
    }

    this.props.onSearchInputs(dataToSearch,this.state.type);
    //filter.set(dataToSearch);
  }

  handleSortBy(event) {
    event.preventDefault();
    var sortBy = this.refs.sortBy;
    var value = sortBy[sortBy.selectedIndex].value;
    if(value != 'unknown') {
      this.setState({
        type : value
      })
      if(value == 'course' || value == 'classes') {
          this.setState({
            showSelectBox : true,
            showInput : false
          })
      }else {
        this.setState({
          showSelectBox : false,
          showInput : true
        })
      }
    }
  }

  renderConditionalData() {
    if(this.state.showInput) {
      return <input type="search" ref="filterInput" onChange={this.handleFilterDataSubmit.bind(this)}/>
    }
    else if(this.state.showDateInput) {
      return <input type="date" ref="filterInput" onChange={this.handleFilterDataSubmit.bind(this)}/>
    }
    else if(this.state.showSelectBox && this.state.type == 'course') {
        return (
          <label>
            Courses
            <select className="course" ref="courses" onChange={this.handleFilterDataSubmit.bind(this)}>
              <option value="unknown">See options below</option>
              <option value="course 1">course 1</option>
              <option value="course 2">course 2</option>
              <option value="course 3">course 3</option>
              <option value="course 4">course 4</option>
              <option value="course 5">course 5</option>
            </select>
          </label> );
      }
      else if(this.state.showSelectBox && this.state.type == 'classes') {
        return (
        <label>
          Classes
          <select className="classes" ref="classes" onChange={this.handleFilterDataSubmit.bind(this)}>
            <option value="unknown" >See options below</option>
            <option value="class 1">class 1</option>
            <option value="class 2">class 2</option>
            <option value="class 3">class 3</option>
          </select>
        </label>
        );
      }else return;
    }

  render() {
    return (
      <div className="search-through-data">
        <form className="filter-data" onSubmit={this.handleFilterDataSubmit.bind(this)}>
          <label>Filter data by
            <select className="sort-by" ref="sortBy" onChange={this.handleSortBy.bind(this)}>
              <option value="unknown" >See options below</option>
              <option value="hours">hours</option>
              <option value="price">price(greater than)</option>
              <option value="name">name</option>
              <option value="date">Date</option>
              <option value="course">course</option>
              <option value="classes">class</option>
            </select>
          </label>
          {this.renderConditionalData()}
        </form>
      </div>
    )
  }
}

Search.propTypes = {
  filter: React.PropTypes.object,
};
