import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "stringTruncate",
})
export class StringTruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 100) {
    let newValue = "";
    if (value.length > limit) {
      newValue = value.slice(0, limit) + "...";
    } else {
      newValue = value;
    }

    return newValue;
  }
}
