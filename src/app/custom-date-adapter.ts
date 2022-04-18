import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public override parse(value: any): Date | null {
    const numberRegex: RegExp = /^[0-9]*$/;
    const splitBy2Regex: RegExp = /(.{2})/;
    const monthRegex: RegExp = /^(1[012])$/;
    const dateRegex: RegExp = /^(1[0-9]|2[0-9]|3[0-1])$/;

    if ((typeof value === 'string') && value.length >= 6 && value.match(numberRegex)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const str: string[] = value.split(splitBy2Regex).filter((result: any): boolean => result);
      let month: string = '1';
      let date: string = '1';

      if (str[0].match(monthRegex)) {
        month = this.to2digit(Number(str[0]));
      } else if (value.charAt(0) === '0') {
        month = this.to2digit(Number(value.charAt(1)));
      } else {
        month = this.to2digit(Number(value.charAt(0)));
        str[1] = str[0].charAt(1) + str[1].charAt(0);
        str[0] = str[0].charAt(0);
      }

      if (str[1].match(dateRegex)) {
        date = str[1];
        str[2] = value.slice((str[0].length + str[1].length));
      } else if (str[1].charAt(0) === '0') {
        date = this.to2digit(Number(str[1].charAt(1)));
        str[2] = value.slice((str[0].length + str[1].length));
      } else {
        date = this.to2digit(Number(str[1].charAt(0)));
        str[1] = str[1].charAt(0);
        str[2] = value.slice((str[0].length + str[1].length));
      }

      return new Date(Number(str[2]), Number(month) - 1, Number(date));
    }

    const timestamp: number = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? new Date(NaN) : new Date(timestamp);
  }

  public override format(date: Date, displayFormat: string): string {
    if (displayFormat === 'input') {
      const day: number = date.getDate();
      const month: number = date.getMonth() + 1;
      const year: number = date.getFullYear();
      return `${month}/${day}/${year}`;
    } else {
      return date.toDateString();
    }
  }

  private to2digit(n: number): string {
    return (`00${n}`).slice(-2);
  }
}
