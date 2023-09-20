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
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNDMwNTU3YjktNzY3Yy00Y2U5LWFlNTYtOTcxNzc1YTg5N2E4LyIsImlhdCI6MTY5NTA5MDMxNSwibmJmIjoxNjk1MDkwMzE1LCJleHAiOjE2OTUwOTU1NzMsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJFMkVBQXFjMW0rc1hscHkydFRraHJKZnJ3SC9uR2NmcWVReWZlcG5tK2RhZjBQbTRzblhDNnFrcS9CSlRsQlZ6amd0ZXpUZ0dBQT09IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiTE9Hw41TVElDTyIsImdpdmVuX25hbWUiOiJBUE9ZTyIsImlwYWRkciI6IjE5MC41My44MS43MyIsIm5hbWUiOiJBUE9ZTyAgTE9Hw41TVElDTyIsIm9pZCI6ImQwOGUxZWE1LTk5MjItNDNhMS04MjhjLTdlZDY2NjRlZTBhNSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS00MTgzMTI5MDM2LTE3Mjc2NjcyMDctNjI2ODQxNTUyLTM2MTE3IiwicHVpZCI6IjEwMDMyMDAxNDM4NTg3OEEiLCJyaCI6IjAuQVc4QXVWY0ZRM3gyNlV5dVZwY1hkYWlYcUFrQUFBQUFBQUFBd0FBQUFBQUFBQUJ2QUE0LiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6Ik82blIwdmgxWktycmxpdTdSbUR4Y2ozNW1zNDljY19UdXNheUw3TmxlRzgiLCJ0aWQiOiI0MzA1NTdiOS03NjdjLTRjZTktYWU1Ni05NzE3NzVhODk3YTgiLCJ1bmlxdWVfbmFtZSI6ImFwb3lvbG9naXN0aWNvQHVuYWguZWR1LmhuIiwidXBuIjoiYXBveW9sb2dpc3RpY29AdW5haC5lZHUuaG4iLCJ1dGkiOiJJeVFMVVowbjhFdTBELUFGUnEydEFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.oxe84GMjwx6NvePGIp0XzFJBg6Sc7cpuzKyMn-AABdihHvhRweAQGI9ct0LrlEdJ6V64CHqOn_TX15Pocfpvw3m1Qr-ns1uqbY7Fhu-SlxJqNROdx8EiRPIpvcd8ugfYp6FowDsDf-MTYpIXfbimsZEETd6D_mvhr7BqM1sMRMBOcxgI44TdFnkbn5Xd3FlY8Uy3O1BklS6fDvdgnQx_oZFNow8O3DBCHEj4RQsLY_C59X1IeD48_P3WgcjqGiuJeOXyq8RwkZKvGpojvIRqkVLtb7Ayh6AjDOkZLkSmIhPktzpUpFNBI99bCbdVsjSX6PMLNklLrJTFG4CbIyPIMQ',
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