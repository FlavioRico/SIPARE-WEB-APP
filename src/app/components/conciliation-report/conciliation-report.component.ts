import { Component, OnInit} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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

  public typeSearchGlobal: string;
  public flagIntervalo: boolean;
  public flagMes: boolean;
  public descriptionTypeSearch: string;

  constructor(
    public apiClient: SipareApiService,
    private spinner: NgxSpinnerService) 
  { }

  ngOnInit(): void {

    this.fechaDefault = this.shared.getDateFormated2();
    this.fechaStart = this.fechaDefault;
    this.fechaEnd = this.fechaDefault;
    
    this.typeSearchGlobal = "Intervalo";
    this.flagIntervalo = true;
    this.flagMes = false;
    this.descriptionTypeSearch = "Búsqueda por intervalo de fechas.";
  }

  selectOpcSearch (typeSearch: string) {
    this.typeSearchGlobal = typeSearch;
    if (this.typeSearchGlobal == "Intervalo") {
      this.flagIntervalo = true;
      this.flagMes = false;
      this.descriptionTypeSearch = "Búsqueda por intervalo de fechas.";
    }else{
      this.flagIntervalo = false;
      this.flagMes = true;
      this.descriptionTypeSearch = "Búsqueda por mes.";
    }
  }

  searchByDate () {
    var dateControlStart: any = document.getElementById('fechaStart');
    var dateControlEnd: any = document.getElementById('fechaEnd');
    this.fechaStart = dateControlStart.value;
    this.fechaEnd = dateControlEnd.value;

    if(!(this.dateType === undefined || this.dateType === null)) {

      this.spinner.show();
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
            this.spinner.hide();
          }
        },error => {
          alert('Ocurrió un error en los servicios');
          this.spinner.hide();
        }
      );

    }else {

      this.incompleteForm = true;
    }
  }

  searchByMonth() : void {

    if(!(this.month === undefined || this.month === null)
    && !(this.monthType === undefined || this.monthType === null)) {
      this.spinner.show();
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
            this.spinner.hide();
          }
        }, error => {
          this.spinner.hide();
          alert('Ocurrió un error con los servicios.');
        }
      );

    }else {

      this.incompleteForm = true;
    }

  }
}
