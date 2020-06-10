import React from 'react';
import { Downloads } from "../Downloads";

export function PageHome() {
  return <>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Active Downloads</h3>
      </div>
      <div id="load-indicator2" className="load-indicator" style={{ opacity: 0, marginTop: '5px' }}>
        <img src="/media/modern/img/ajax-loader.gif" alt="" style={{ paddingRight: '5px' }} />
        loading
      </div>
    </div>
    <Downloads />
  </>;
}
