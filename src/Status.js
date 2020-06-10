import React from 'react';
import { Component } from 'react';
import Helper from './Helper'

import { faDownload, faSync, faTachometerAlt, faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Status extends Component {
  constructor(props){
    super(props);
    this.state = {
      download: false,
      pause: false,
      reconnect: false,
      queue: 0,
      active: 0,
      total: 0,
      speed: Helper.humanFileSize(0),
    }

    this.props.status.refresh = this.timer.bind(this)
  }

  _isMounted = false;

  timer() {
    Helper.timeoutableFetch("/json/status", {timeout: 4000})
      .then(res => res.json())
      .then(
        (result) => {
          var state = {
            download: result.download,
            pause: result.pause,
            reconnect: result.reconnect,
            queue: result.queue,
            active: result.active,
            total: result.total,
            speed: Helper.humanFileSize(result.speed)
          };

          if (JSON.stringify(this.state) === JSON.stringify(state) ) {
            return;
          }
          if (this._isMounted) {
            this.setState(state);
          }
        },
        (error) => {
          if (this._isMounted) {
            this.setState({
              isLoaded: true,
              error
            });
          }
        }
      )
  }
  componentDidMount() {
    this._isMounted = true;

    this.intervalId = setInterval(this.timer.bind(this), 4000);
    this.timer();
  }
  componentWillUnmount() {
    this._isMounted = false;

    clearInterval(this.intervalId);
  }
  render() {
    const { download, reconnect, queue, active, total, speed } = this.state;

    return <div className="btn-group btn-group-sm col-lg-6 col-12 order-lg-2 order-1" role="group" aria-label="...">
      <button className="btn col-xs-3 col-sm-auto">
        <span className="d-none d-lg-block">Download: </span>
        <FontAwesomeIcon className="d-lg-none" icon={faDownload} size="lg" />&nbsp;
        <span className={"badge badge-" + (download ? 'success' : 'danger')}>{download ? 'on' : 'off'}</span>
      </button>
      <button type="button" className="btn col-xs-3 col-sm-auto">
        <span className="d-none d-lg-block">Reconnect: </span>
        <FontAwesomeIcon className="d-lg-none" icon={faSync} size="lg" />&nbsp;
        <span className={"badge badge-" + (reconnect ? 'success' : 'danger')}>{ reconnect ? 'on' : 'off' }</span>
      </button>
      <button type="button" className="btn col-xs-3 col-sm-auto">
        <span className="action backlink">
          <span className="d-none d-lg-block">Speed: </span>
          <FontAwesomeIcon className="d-lg-none" icon={faTachometerAlt} size="lg" />&nbsp;
          <b>{ speed }/s</b>
        </span>
      </button>
      <span className="btn col-xs-3 col-sm-auto">
        <span>
          <span className="d-none d-lg-block">Active: </span>
          <FontAwesomeIcon className="d-lg-none" icon={faHeartbeat} size="lg" />&nbsp;
          <b title="Active">{ active }</b> / <b title="Queued">{ queue }</b> / <b title="Total">{ total }</b>
        </span>
      </span>
    </div>
  }
}
