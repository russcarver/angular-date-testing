import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { format } from 'date-fns';

interface Parsed {
  myDate: string;
  myStr: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public formGroup: any;
  public formattedDate: any;
  public dateType: any;
  public originalDateFormControlValue: any;
  public originalDateType: any;
  public parsedData: Parsed | undefined = undefined;
  public parsedDateType: any;
  public serverDateType: any;
  public serverDateValue: any = 'uninitialized';
  public strForm: any = undefined;

  public startNull(): void {
    this.formGroup = undefined;
    this.strForm = undefined;
    this.parsedData = undefined;
    this.serverDateValue = null;
    this.serverDateType = typeof this.serverDateValue === 'string';
    this.init();
  }

  public startEmpty(): void {
    this.formGroup = undefined;
    this.strForm = undefined;
    this.parsedData = undefined;
    this.serverDateValue = '';
    this.serverDateType = typeof this.serverDateValue === 'string';
    this.init();
  }

  public startDate(): void {
    this.formGroup = undefined;
    this.strForm = undefined;
    this.parsedData = undefined;
    this.serverDateValue = '02/02/2022';
    this.serverDateType = typeof this.serverDateValue === 'string';
    this.init();
  }

  public changeDate(event: MatDatepickerInputEvent<Date>): void {
    console.log(event?.value, typeof event?.value === 'string'); // Appears to always be a date
    this.dateType = typeof this.formGroup.get('myDate').value === 'string';
    this.formattedDate = this.formGroup.get('myDate').value
                         ? format(this.formGroup.get('myDate').value, 'MM/dd/yyyy')
                         : '';
  }

  public stringify(): void {
    this.strForm = JSON.stringify(this.formGroup.value);
    this.formGroup.get('myDate').setValue('');
    this.formGroup.get('myStr').setValue('');
    this.dateType = typeof this.formGroup.get('myDate').value === 'string';
    this.formattedDate = this.formGroup.get('myDate').value
                         ? format(this.formGroup.get('myDate').value, 'MM/dd/yyyy')
                         : '';
  }

  public parse(): void {
    this.parsedData = JSON.parse(this.strForm);
    this.parsedDateType = typeof this.parsedData?.myDate === 'string';
    this.formGroup.get('myDate').setValue(this.parsedData?.myDate && this.parsedData.myDate.length > 0
                                            ? new Date(this.parsedData?.myDate) : '');
    this.formGroup.get('myStr').setValue(this.parsedData?.myStr);
    this.dateType = typeof this.formGroup.get('myDate').value === 'string';
    this.formattedDate = this.formGroup.get('myDate').value
                         ? format(this.formGroup.get('myDate').value, 'MM/dd/yyyy')
                         : '';
  }

  private init(): void {
    this.formGroup = new FormGroup(
      {
        originalDate: new FormControl(this.serverDateValue && this.serverDateValue?.length > 0
                                        ? new Date(this.serverDateValue) : ''),
        // Must convert to date or it won't populate field; empty str results in using undefined & form ctrl value=null
        myDate: new FormControl(this.serverDateValue && this.serverDateValue?.length > 0
                                  ? new Date(this.serverDateValue) : ''),
        myStr: new FormControl('test strr')
      }
    );
    this.dateType = typeof this.formGroup.get('myDate').value === 'string';

    this.originalDateFormControlValue = this.formGroup.get('originalDate').value;
    this.originalDateType = typeof this.formGroup.get('originalDate').value === 'string';

    this.formattedDate = this.formGroup.get('myDate').value
                           ? format(this.formGroup.get('myDate').value, 'MM/dd/yyyy')
                           : '';
  }
}
