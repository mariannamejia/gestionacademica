import React from 'react';

const PowerBIDashboard = () => {
  return (
    <div>
      <iframe
        width="100%"
        height="600"
        src="https://app.powerbi.com/groups/me/reports/65212235-6ba7-442f-a37b-d243ba58ceac/ReportSection5c9c8565bbd699ee3658?experience=power-bi"
        //src="http://myserver/reports/powerbi/Sales?rs:embed=true"
        allowFullScreen={true}
        title="PowerBIDashboard"
      ></iframe>
    </div>
  );
}

export default PowerBIDashboard;