import React from 'react'
import { Component } from 'react';
import { Package } from "./Package";

export class Collector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };

    this.reloadData = this.loadData.bind(this)
  }

  orderPackages (packages) {
    return packages.sort((p, p2) => p.order - p2.order);
  }

  loadData() {
    fetch("/api/getCollector")
      .then(res => res.json())
      .then((result) => {
        result = this.orderPackages(result)

        this.setState({data: result});
      }, (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  componentDidMount() {
    this.loadData()
  }

  render() {
    return <ul id="package-list" className="ui-sortable list-unstyled">
      {this.state.data.map((value, index) => {
        return <Package key={ value.pid } { ...value } reload={ this.reloadData } />
      })}
    </ul>
  }
}
