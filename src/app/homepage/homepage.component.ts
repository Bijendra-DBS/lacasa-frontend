import { Component, Injectable, OnInit } from '@angular/core';
import { homeServices } from './homepage.services';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

interface DataItem {
  Headlines: string;
  Time: number;
  Description: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {


  listOfData = [];
  editId: any = null;
  sortValue = '';
  visible = false;
  p: number = 1

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  monthsName = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  public barChartLabels: Label[] = this.monthsName;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Headlines' },
  ];

  constructor(private _service: homeServices ) { }


  ngOnInit(): void {
    this.getCSVData() // get csv function

  }

  getCSVData(){
    this._service.getRecord().subscribe(async(responseObject)=>{

      let responseMessage = responseObject.message;
      let month = [];
      const monthCounts = [];

      if(responseObject.status == 200){
        this.listOfData = responseObject.body;
        this._service.message('success', responseMessage);
        this.listOfData.map((item)=>{
        let splitDate = item.Time.split(",");
        let DateFormat = new Date(splitDate[1].trim());
        month.push(DateFormat.getMonth());
        })
        month.forEach((x) => {
          monthCounts[x] = (monthCounts[x] || 0) + 1;
        });
        this.barChartData[0].data = monthCounts
      } else {
        this._service.message('error', responseMessage);
      }
    })
  }

  startEdit(id: any): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  updateData(data){ // update csv function
    this._service.updateRecord(data).subscribe(async(responseObject)=>{
    let responseMessage = responseObject.message;
    if(responseObject.status == 200){
      this._service.message('success', responseMessage);
    } else {
      this._service.message('error', responseMessage);
    }
    })
  }
  reset(): void { // sort reset button
    this.sortValue = '';
    this.getCSVData()
    this.visible = false;
  }
  sort(): void { // sort function
    this.visible = false;
    this.listOfData = this.listOfData.filter((item:DataItem) =>
     item.Headlines.indexOf(this.sortValue) !== -1
    );
    }
  }

