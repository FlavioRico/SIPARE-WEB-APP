import { Component, OnInit} from '@angular/core';
import { SharedComponent } from 'src/app/shared/shared/shared.component';
import { SipareApiService } from '../../services/conciliation-report/sipare-api.service';

@Component({
  selector: 'app-conciliation-report',
  templateUrl: './conciliation-report.component.html',
  styleUrls: ['./conciliation-report.component.scss']
})
export class ConciliationReportComponent implements OnInit {

  /* Forms values */
  public dateRange : any;
  public dateType : any;
  public dateTypePersonalizado : any;
  public month : any;
  public monthType : any;

  public fechaStart;
  public fechaEnd;
  public fechaDefault;

  /* Response values */ 
  public parameters : any;
  public rows : [any];

  /* Content display conditions */
  public incompleteForm : boolean;
  public noContentAvailable : boolean;
  public contentAvailable : boolean;

  public url : string;

  shared = new SharedComponent();
  
  constructor(public apiClient: SipareApiService) { }

  ngOnInit(): void {

    this.fechaDefault = this.shared.getDateFormated2();
    this.fechaStart = this.fechaDefault;
    this.fechaEnd = this.fechaDefault;
    
  }

  clicked () {
    var dateControlStart: any = document.getElementById('fechaStart');
    var dateControlEnd: any = document.getElementById('fechaEnd');
    console.log(dateControlStart.value);
    this.fechaStart = dateControlStart.value;
    this.fechaEnd = dateControlEnd.value;

    if(!(this.dateType === undefined || this.dateType === null)) {
      
      this.incompleteForm = false;

      this.apiClient.retrieveSummaryReportByDate(
        
        this.fechaStart,
        this.fechaEnd,
        this.dateType

      ).subscribe(
        
        data => {
            
          if(data.rows.length === 0) {

            this.noContentAvailable = true;
            this.contentAvailable = false;

          }else {

            this.parameters = data.parameters;
            this.rows = data.rows;
            this.contentAvailable = true;
            this.noContentAvailable = false;
            this.url = "http://localhost:9091/sipare/api/v1/reports/conciliation/date_types/"
              + this.dateType + "/download?" 
              + "from=" + this.fechaStart 
              + "&to=" + this.fechaEnd;
          }
        },error => {
          alert('Ocurrió un error en los servicios');
        }
      );

    }else {

      this.incompleteForm = true;
    }
  }

  private buildDate(date : Date) : string {

    var formattedDate : string = 
      date.getUTCFullYear() + "-"
      + (date.getUTCMonth() + 1) + "-"
      + date.getUTCDate();

    return formattedDate;
  }

  searchByDate() : void {

    if(!(this.dateRange === undefined || this.dateRange === null)
    && !(this.dateTypePersonalizado === undefined || this.dateTypePersonalizado === null)) {
      
      this.incompleteForm = false;

      this.apiClient.retrieveSummaryReportByDate(
        
        this.buildDate(this.dateRange.from),
        this.buildDate(this.dateRange.to),
        this.dateTypePersonalizado

      ).subscribe(
        
        data => {
            
          if(data.rows.length === 0) {

            this.noContentAvailable = true;
            this.contentAvailable = false;

          }else {

            this.parameters = data.parameters;
            this.rows = data.rows;
            this.contentAvailable = true;
            this.noContentAvailable = false;
            this.url = "http://localhost:9091/sipare/api/v1/reports/conciliation/date_types/"
              + this.dateTypePersonalizado + "/download?" 
              + "from=" + this.buildDate(this.dateRange.from) 
              + "&to=" + this.buildDate(this.dateRange.to);
          }
        }
      );

    }else {

      this.incompleteForm = true;
    }

  }

  searchByMonth() : void {

    if(!(this.month === undefined || this.month === null)
    && !(this.monthType === undefined || this.monthType === null)) {
      
      this.incompleteForm = false;

      this.apiClient.retrieveSummaryReportByMonth(

        this.month,
        this.monthType

      ).subscribe(
        
        data => {
            
          if(data.rows.length === 0) {

            this.noContentAvailable = true;
            this.contentAvailable = false;

          }else {

            this.parameters = data.parameters;
            this.rows = data.rows;
            this.contentAvailable = true;
            this.noContentAvailable = false;
            this.url = "http://localhost:9091/sipare/api/v1/reports/conciliation/date_types/"
              + this.monthType + "/months/" + this.month +"/download";

          }
        }
      );

    }else {

      this.incompleteForm = true;
    }

  }
}
