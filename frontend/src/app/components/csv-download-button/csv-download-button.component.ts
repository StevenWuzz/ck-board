import { Component, Input, OnInit } from '@angular/core';
import { parseAsync } from 'json2csv';
import { Trace } from 'src/app/models/trace';
import { TraceService } from 'src/app/services/trace.service';
import traceDefaults from './traceDefaults';

@Component({
  selector: 'app-csv-download-button',
  templateUrl: './csv-download-button.component.html',
  styleUrls: ['./csv-download-button.component.scss'],
})
export class CsvDownloadButtonComponent implements OnInit {
  @Input() projectID: string;

  private static readonly CSV_FILENAME: string = 'CK_Trace.csv';

  constructor(private traceService: TraceService) {}

  ngOnInit(): void {}
  /**
   * Converts csv string to csv file an downloads it
   * @param csvContent Csv string to convert and download
   */
  downloadCSV(csvContent: string): void {
    let encodedUri = encodeURIComponent(csvContent);
    // create a dummy link element
    let link = document.createElement('a');
    link.setAttribute('href', 'data:attachment/csv,' + encodedUri);
    link.setAttribute('download', CsvDownloadButtonComponent.CSV_FILENAME);
    document.body.appendChild(link);
    // click created link to dowload csv
    link.click();
  }

  async exportToCSV(): Promise<void> {
    let traceCollection = await this.traceService.getTraceRecords(
      this.projectID
    );
    let traceData: any[] = [];
    traceCollection.forEach((data) => {
      // extract nested event object and flatten it before converting to csv
      // json2csv also has a builtin function for flattening
      let { event, ...otherfields } = data;
      traceData.push({
        ...otherfields,
        ...event,
      });
    });
    console.log(traceData);
    let csvContent = await parseAsync(traceData, { fields: traceDefaults });
    console.log(csvContent);
    this.downloadCSV(csvContent);
  }
}
