import React from 'react'
import Sidebar from '../components/Sidebar'
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

const CapacitacionesCont = () => {
  return (
    <div className="Eventos__Page">
      <Sidebar />
        <div className="Administracion__div">
          <h1 className="Administracion__h1">Evaluación de Gestiones</h1>
          <PowerBIEmbed
          embedConfig={{
            type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
            id: '23dc343b-3fde-4baa-bcb8-6b853b81c43d',
            embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=23dc343b-3fde-4baa-bcb8-6b853b81c43d&groupId=3ffcc49e-1383-4901-bb9e-b029797d9fec&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUNFTlRSQUwtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19',
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNDMwNTU3YjktNzY3Yy00Y2U5LWFlNTYtOTcxNzc1YTg5N2E4LyIsImlhdCI6MTY5NTY5MDE3NCwibmJmIjoxNjk1NjkwMTc0LCJleHAiOjE2OTU2OTUzNzcsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VUFBQUFHZWFMZHZzUERvRjZCVDFsVGZqVzM1NDlRQzRqWElYZUI4U1pMZFF4U25Wdml2TEVneHlTQk44Q0RYSm4xcVJwIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiTE9Hw41TVElDTyIsImdpdmVuX25hbWUiOiJBUE9ZTyIsImlwYWRkciI6IjE5MC41My44MS43MyIsIm5hbWUiOiJBUE9ZTyAgTE9Hw41TVElDTyIsIm9pZCI6ImQwOGUxZWE1LTk5MjItNDNhMS04MjhjLTdlZDY2NjRlZTBhNSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS00MTgzMTI5MDM2LTE3Mjc2NjcyMDctNjI2ODQxNTUyLTM2MTE3IiwicHVpZCI6IjEwMDMyMDAxNDM4NTg3OEEiLCJyaCI6IjAuQVc4QXVWY0ZRM3gyNlV5dVZwY1hkYWlYcUFrQUFBQUFBQUFBd0FBQUFBQUFBQUJ2QUE0LiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6Ik82blIwdmgxWktycmxpdTdSbUR4Y2ozNW1zNDljY19UdXNheUw3TmxlRzgiLCJ0aWQiOiI0MzA1NTdiOS03NjdjLTRjZTktYWU1Ni05NzE3NzVhODk3YTgiLCJ1bmlxdWVfbmFtZSI6ImFwb3lvbG9naXN0aWNvQHVuYWguZWR1LmhuIiwidXBuIjoiYXBveW9sb2dpc3RpY29AdW5haC5lZHUuaG4iLCJ1dGkiOiJaT25oZ184N2kwaXRJc2x3cTVoS0FBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.rnj1LAWUjibzyYKapqxsh_rSRe6_IXaTN6Ci5JU2299ftfo7NNeCt1A5ONuUFQjhzltnMXHQ05YfhrfzDtXiqmQlMi5j9XBdgywmnik8TJhA617vf0RHiP9Bs2fiCtKHu6fKZ1XJmNxvg7NpNduosyjxAfRmKJu5DfXFcty7jvdOwA_UzwBMQ_pACtsBcOWAmjV_AgfbPh_lHGXDgLAxy2B8yifdr_nP42_GhkynU11T1ORPXU0yyAZuXlmbVIR4oKO2Qpat9W33dMk4aKTCH6ECXNAzXZ5CBxxE4BEQMUgx4Qf6ucLNy0VknDI7ieXlZRIUVWeRtuNQ8Nkr0ueY1w',
            tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: false
                }
              },
              /*background: models.BackgroundType.Transparent,*/
            }
          }}

          eventHandlers={
            new Map([
              ['loaded', function () { console.log('Report loaded'); }],
              ['rendered', function () { console.log('Report rendered'); }],
              ['error', function (event) { console.log(event.detail); }],
              ['visualClicked', () => console.log('visual clicked')],
              ['pageChanged', (event) => console.log(event)],
            ])
          }

          cssClassName={"Embed__container"}

          getEmbeddedComponent={(embeddedReport) => {
            window.report = embeddedReport;
          }}
        />
        </div>
    </div>
  )
}

export default CapacitacionesCont