module.exports = () => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Bill</title>
  
      <style>
        body {
          font-size: 0.688rem;
          line-height: 1.7;
          padding:5px;
        }
        tr {
          padding: 0;
        }
        td,
        th {
          font-size: 0.5rem;
          padding: 0 2px;
        }
        .border {
          border: 1px solid black;
        }
        .box {
          padding: 0.4rem;
        }
        .invoice-box {
          max-width: 915px;
          margin: auto;
          font-size: 16px;
          font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
        }
  
        .invoice-box table {
          width: 100%;
          text-align: left;
        }
        h1 {
          font-size: 1.2rem;
          margin: 0;
        }
      </style>
    </head>
  
    <body>
      <div class="invoice-box">
        <h1>Rückforderungsbeleg</h1>
        <div class="border box">
          <table>
            <!-- line  -->
            <tr>
              <td style="font-weight: bold">Dokument</td>
              <td>Identification</td>
              <td>1364223556</td>
              <td>25.03.2022 15:59PM</td>
              <td>Seite : 1</td>
            </tr>
            <!-- line ends -->
            <!-- line  -->
            <tr>
              <td style="font-weight: bold">Rechnungssteller</td>
              <td>GLN-Nr. (B)</td>
              <td>7634567890111</td>
              <td>Dr. Med. Patrizia Arztin</td>
              <td>Tel : 061 956 99 00</td>
            </tr>
            <!-- line ends -->
            <!-- line  -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>ZSR-Nr. (B)</td>
              <td>P123456</td>
              <td>Arztgasse 17b 8000 Zurich</td>
              <td>Fax : 061 956 99 00</td>
            </tr>
            <!-- line ends -->
            <!-- line  -->
            <tr>
              <td style="font-weight: bold">Leistungserbringer</td>
              <td>ZSR-Nr. (B)</td>
              <td>P123456</td>
              <td>Arztgasse 17b 8000 Zurich</td>
              <td>Fax : 061 956 99 00</td>
            </tr>
            <!-- line ends -->
            <!-- line  -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>Identification</td>
              <td>1364223556</td>
              <td>25.03.2022 15:59PM</td>
              <td>Fax: 061 956 99 00</td>
            </tr>
            <!-- line ends -->
          </table>
        </div>
        <div style="border-top: 0" class="border box">
          <table>
            <!-- line -->
            <tr>
              <td style="font-weight: bold">Patient</td>
              <td>Name</td>
              <td>Camenisch</td>
              <td></td>
              <td>GLN-Nr</td>
              <td>124q723948017</td>
              <td></td>
            </tr>
            <!-- line ends -->
            <!-- line -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>Vorname</td>
              <td>Camenisch</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <!-- line ends -->
            <!-- line -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>Strasse</td>
              <td>Camenisch</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <!-- line ends -->
            <!-- line -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>PLZ</td>
              <td>Camenisch</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <!-- line ends -->
            <!-- line -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>Ort</td>
              <td>Camenisch</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <!-- line ends -->
            <!-- line -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>Geburtsdatum</td>
              <td>Camenisch</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <!-- line ends -->
            <!-- line -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>Falldatum</td>
              <td>Camenisch</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <!-- line ends -->
            <!-- line -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>Fall-Nr</td>
              <td>Camenisch</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <!-- line ends -->
            <!-- line -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>AHV-Nr</td>
              <td>Camenisch</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <!-- line ends -->
            <!-- line -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>VEKA-Nr.</td>
              <td>Camenisch</td>
              <td></td>
              <td>KoGu-Datum/-Nr.</td>
              <td>124q723948017</td>
              <td></td>
            </tr>
            <!-- line ends -->
            <!-- line -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>Versicherten-Nr.</td>
              <td>Camenisch</td>
              <td></td>
              <td>Rechnungs-Datum/-Nr.</td>
              <td>124q723948017</td>
              <td></td>
            </tr>
            <!-- line ends -->
  
            <!-- line -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>Kanton</td>
              <td>Camenisch</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <!-- line ends -->
  
            <!-- line -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>Kopie</td>
              <td>Camenisch</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <!-- line ends -->
  
            <!-- line -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>Vergutungsart</td>
              <td>Camenisch</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <!-- line ends -->
  
            <!-- line -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>Gesetz</td>
              <td>Camenisch</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <!-- line ends -->
  
            <!-- line -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>Behandlung</td>
              <td>Camenisch</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <!-- line ends -->
  
            <!-- line -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>Behandlungsart</td>
              <td>Camenisch</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <!-- line ends -->
  
            <!-- line -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>Behandlungsgrund</td>
              <td>Camenisch</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <!-- line ends -->
  
            <!-- line -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>Betriebs-Nr./-Name</td>
              <td>Camenisch</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <!-- line ends -->
  
            <!-- line -->
            <tr>
              <td style="font-weight: bold"></td>
              <td>Rolle/Ort</td>
              <td>Camenisch</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <!-- line ends -->
          </table>
        </div>
        <div style="border-top: 0" class="border box">
          <table>
            <tr>
              <td style="font-weight: bold">Zuweiser</td>
              <td>GLN/ZSR-Nr</td>
              <td>202343523452/R232341</td>
              <td>Dr. Med. Herbert Ueberweiser</td>
              <td>Referrerstrasse 11 8000 Zurich</td>
            </tr>
          </table>
        </div>
        <div style="border-top: 0" class="border box">
          <table>
            <tr>
              <td style="font-weight: bold; width: 10%">Diagnose</td>
              <td style="width: 20%">Contract</td>
              <td style="width: 20%">N9</td>
              <td style="width: 40%"></td>
            </tr>
          </table>
        </div>
        <div style="border-top: 0" class="border box">
          <table>
            <tr>
              <td style="font-weight: bold">Bemerkung</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
        <!-- bill table -->
        <table style="margin-top: 10px">
          <!-- heading starts -->
          <tr>
            <th>Datum</th>
            <th>Tarif</th>
            <th>Tarifziffer</th>
            <th>Bezugsziffer Si</th>
            <th>St</th>
            <th>Ttd</th>
            <th>AL/tdreis</th>
            <th>fAL</th>
            <th>TtdW AL</th>
            <th>Ttd TL</th>
            <th>fTl</th>
            <th>TtdW TL</th>
            <th>A</th>
            <th>V</th>
            <th>td</th>
            <th>M</th>
            <th>Betrag</th>
          </tr>
          <!-- headings ends -->
          <!-- line -->
          <tr>
            <td>11.07.2022</td>
            <td>001</td>
            <td>00.0010</td>
            <td>1</td>
            <td></td>
            <td>1.00</td>
            <td>10.42</td>
            <td>1.00</td>
            <td>0.89</td>
            <td>8.19</td>
            <td>1.00</td>
            <td>0.89</td>
            <td>1</td>
            <td>2</td>
            <td>1</td>
            <td>0</td>
            <td>16.56</td>
          </tr>
          <!-- line ends -->
          <!-- line -->
          <tr>
            <td>11.07.2022</td>
            <td>001</td>
            <td>00.0010</td>
            <td>1</td>
            <td></td>
            <td>1.00</td>
            <td>10.42</td>
            <td>1.00</td>
            <td>0.89</td>
            <td>8.19</td>
            <td>1.00</td>
            <td>0.89</td>
            <td>1</td>
            <td>2</td>
            <td>1</td>
            <td>0</td>
            <td>16.56</td>
          </tr>
          <!-- line ends -->
          <!-- line -->
          <tr>
            <td>11.07.2022</td>
            <td>001</td>
            <td>00.0010</td>
            <td>1</td>
            <td></td>
            <td>1.00</td>
            <td>10.42</td>
            <td>1.00</td>
            <td>0.89</td>
            <td>8.19</td>
            <td>1.00</td>
            <td>0.89</td>
            <td>1</td>
            <td>2</td>
            <td>1</td>
            <td>0</td>
            <td>16.56</td>
          </tr>
          <!-- line ends -->
          <!-- line -->
          <tr>
            <td>11.07.2022</td>
            <td>001</td>
            <td>00.0010</td>
            <td>1</td>
            <td></td>
            <td>1.00</td>
            <td>10.42</td>
            <td>1.00</td>
            <td>0.89</td>
            <td>8.19</td>
            <td>1.00</td>
            <td>0.89</td>
            <td>1</td>
            <td>2</td>
            <td>1</td>
            <td>0</td>
            <td>16.56</td>
          </tr>
          <!-- line ends -->
        </table>
        <!-- bill table ends -->
      </div>
    </body>
  </html>
  `;
};
