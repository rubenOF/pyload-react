import React from 'react';
import { Component } from 'react';
import { MDBProgress, MDBTable, MDBTableBody, MDBTableHead, MDBCloseIcon } from 'mdbreact';
import Helper from './Helper'
import cogoToast from 'cogo-toast';

export class Downloads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
      links: []
    };
  }
  _isMounted = false;

  labelcolor(color) {
    switch (color) {
      case 5:
        return 'badge-warning';
      case 7:
        return 'badge-info';
      case 12:
        return 'badge-success';
      case 13:
        return 'badge-primary';
      default:
        return 'badge-default';
    }
  }

  remove(fid, event) {
    var formData  = new FormData();
    formData.append('fids', '[' + fid + ']');

    fetch("/api/stopDownloads", {
      method: 'post',
      body: formData
    })
      .then((result) => {
        cogoToast.success("Success!", { heading: "Stop download" });

        this.timer();
      }, (error) => {
        cogoToast.error("Error!", { heading: "Stop download" });
      });
  }

  timer() {
    Helper.timeoutableFetch("/json/links", {timeout: 2500})
      .then(res => res.json())
      .then((result) => {
        if (this._isMounted){
          this.setState(result);
        }
      }, (error) => {
        if (this._isMounted) {
          this.setState({
            isLoaded: true,
            error
          });
        }
      });

    if (process.env.NODE_ENV === 'development') {
      const data = { "ids": [78,79,84], "links": [
        { "status": 12, "info": "00:01:14 @ 5.03 MiB/s", "format_size": "1000.00 MiB", "name": "1GB.bin", "plugin": "BasePlugin", "format_wait": "00:00:00", "packageName": "asasd", "percent": 22, "wait_until": 0, "packageID": 13, "eta": 74.53326017716627, "bleft": 393008448, "fid": 78, "statusmsg": "downloading", "speed": 5272927.107519719, "format_eta": "00:01:14", "size": 1048576000 },
        { "status": 12, "info": "00:01:14 @ 5.03 MiB/s", "format_size": "1000.00 MiB", "name": "1GB.bin", "plugin": "BasePlugin", "format_wait": "00:00:00", "packageName": "asasd", "percent": 72, "wait_until": 0, "packageID": 12, "eta": 74.53326017716627, "bleft": 393008448, "fid": 79, "statusmsg": "downloading", "speed": 5272927.107519719, "format_eta": "00:01:14", "size": 1048576000 },
        { "status": 12, "info": "00:01:14 @ 5.03 MiB/s", "format_size": "1000.00 MiB", "name": "1GB.bin", "plugin": "BasePlugin", "format_wait": "00:00:00", "packageName": "asasd", "percent": 12, "wait_until": 0, "packageID": 15, "eta": 74.53326017716627, "bleft": 393008448, "fid": 84, "statusmsg": "downloading", "speed": 5272927.107519719, "format_eta": "00:01:14", "size": 1048576000 },
      ] }
      this.setState(data);
    }
  }
  componentDidMount() {
    this._isMounted = true;

    this.intervalId = setInterval(this.timer.bind(this), 2500);
    this.timer();
  }
  componentWillUnmount() {
    this._isMounted = false;

    clearInterval(this.intervalId);
  }
  render() {
    return <MDBTable responsive>
      <MDBTableHead>
        <tr className="header">
          <th className="d-none d-md-table-cell">Status</th>
          <th>Name</th>
          <th className="d-none d-md-table-cell">Hoster</th>
          <th>Information</th>
          <th>Size</th>
          <th className="d-none d-md-table-cell">Progress</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {this.state.links.map((value, index) => {
          const bar = Helper.getLabelColors(value.fid)

          return <React.Fragment key={ value.fid }>
            <tr>
              <td className="d-none d-md-table-cell">
                <span className={"badge " + this.labelcolor(value.status)}>{ value.statusmsg }</span>
              </td>
              <td>{value.name}</td>
              <td className="d-none d-md-table-cell">{value.plugin}</td>
              <td>{value.info}</td>
              <td>{value.format_size}</td>
              <td>
                <span className="d-none d-md-table-cell">{ value.percent }% / { Helper.humanFileSize(value.size - value.bleft) }</span>
                <MDBCloseIcon title="Stop download" data-id={value.fid} onClick={this.remove.bind(this, value.fid)} />
              </td>
            </tr>
            <tr>
              <td colSpan="6">
                <MDBProgress height="20px" material value={value.percent} barClassName={ bar }>
                  {value.percent}%
                </MDBProgress>
              </td>
            </tr>
          </React.Fragment>;
        })}
      </MDBTableBody>
    </MDBTable>;
  }
}
