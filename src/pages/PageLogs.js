import React, { Component } from 'react';
import { MDBTable, MDBTableBody } from 'mdbreact';

export function PageLogs() {
  return <>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Logs</h3>
      </div>
      <div id="load-indicator2" className="load-indicator" style={{ opacity: 0, marginTop: '5px' }}>
        <img src="/media/modern/img/ajax-loader.gif" alt="" style={{ paddingRight: '5px' }} />
        loading
      </div>
    </div>
    <Logs />
  </>;
}

export class Logs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  loadData() {
    fetch("/api/getLog/100")
      .then(res => res.json())
      .then((result) => {
        result = result.reverse();
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

    return <div className="logdiv">
      <MDBTable responsive>
        <MDBTableBody>
        {this.state.data.map((value, index) => {
          // eslint-disable-next-line
          var [_, date, time, loglevel, logline] = value.split(/(\S+) (\S+) (\S+) (.+)/)

          return <tr key={index}>
            <td className="logline">{index}</td>
            <td>{time} {date}</td>
            <td className="loglevel">{loglevel}</td>
            <td>{logline.trim()}</td>
          </tr>
          })}
        </MDBTableBody>
      </MDBTable>
    </div>
  }
}