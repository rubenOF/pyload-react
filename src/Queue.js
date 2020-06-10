import React from 'react'
import { Component } from 'react';
import { Package } from './Package';

export class Queue extends Component {
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
    fetch("/api/getQueue")
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

      if (process.env.NODE_ENV === 'development') {
        const data = [{"name": "test", "links": null, "dest": 1, "pid": 32, "site": "", "linksdone": 1, "fids": null, "sizetotal": 100908102, "sizedone": 100908102, "linkstotal": 1, "folder": "test", "password": "", "order": 5}, {"name": "moon", "links": null, "dest": 1, "pid": 29, "site": "", "linksdone": 264, "fids": null, "sizetotal": 16340867287, "sizedone": 16340867287, "linkstotal": 264, "folder": "moon", "password": "", "order": 2}, {"name": "super", "links": null, "dest": 1, "pid": 30, "site": "", "linksdone": 252, "fids": null, "sizetotal": 18368625769, "sizedone": 18368625769, "linkstotal": 252, "folder": "super", "password": "", "order": 3}, {"name": "girl", "links": null, "dest": 1, "pid": 31, "site": "", "linksdone": 420, "fids": null, "sizetotal": 29689320532, "sizedone": 29057930983, "linkstotal": 496, "folder": "girl", "password": "", "order": 4}]
        this.setState({data: data});
      }
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
