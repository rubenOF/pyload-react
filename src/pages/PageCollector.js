import React from 'react';
import { Collector } from '../Collector';

export function PageCollector() {
  return <>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Collector</h3>
      </div>
      <div id="load-indicator2" className="load-indicator" style={{ opacity: 0, marginTop: '5px' }}>
        <img src="/media/modern/img/ajax-loader.gif" alt="" style={{ paddingRight: '5px' }} />
        loading
      </div>
    </div>
    <Collector />
  </>;
}
