import React from 'react';
import { Status } from './Status';
import { ActionAdd } from './actions/ActionAdd';
import { ActionStop } from './actions/ActionStop';
import { ActionCancel } from './actions/ActionCancel';
import { ActionPlay } from './actions/ActionPlay';
import { ActionRestart } from './actions/ActionRestart';
import { ActionDelete } from './actions/ActionDelete';


export function Toolbar() {
  var status = {};

  return <div className="btn-toolbar d-flex" role="toolbar" aria-label="...">
    <div className="col-12 col-lg-6 order-lg-1 order-2">
      <div className="btn-group btn-group-sm col-lg-auto col-12 col-sm-8 px-0" role="group" aria-label="...">
        <ActionPlay title="Resume queue" status={status} />
        <ActionCancel title="Pause queue" status={status} />
        <ActionStop title="Abort downloads" status={status} />
        <ActionAdd title="Add package" status={status} />
      </div>

      <div className="btn-group btn-group-sm col-lg-auto col-12 col-sm-4 px-0" role="group" aria-label="...">
        <ActionDelete title="Clear finished" status={status} />
        <ActionRestart title="Restart failed" status={status} />
      </div>
    </div>

    <Status status={status} />
  </div>
}


