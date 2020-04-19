import { Component, OnInit } from "@angular/core";
import { TextCategory, CategoryList } from "src/app/texts.category";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { TextService } from "../text.service";
import { TextInterface } from "../text.model";
import { TextDataService } from "src/app/shared/text-data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-text-upload",
  templateUrl: "./text-upload.component.html",
  styleUrls: ["./text-upload.component.scss"],
})
export class TextUploadComponent implements OnInit {
  public categoryListing: TextCategory[] = CategoryList;
  public textUploadForm: FormGroup;
  public isLoading: boolean = false;
  public isPosted: boolean = false;
  public message: string = "";

  constructor(
    private textService: TextService,
    private textDataService: TextDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //init form
    this.initForm();
  }

  private initForm() {
    this.textUploadForm = new FormGroup({
      textDescription: new FormControl(null, [
        Validators.required,
        Validators.minLength(50),
      ]),
      categoryArr: new FormArray([], Validators.required),
    });
  }

  //checkbox arr
  onCheckboxChange(e) {
    const checkArray: FormArray = this.textUploadForm.get(
      "categoryArr"
    ) as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onPopupRedirection() {
    this.router.navigate(["text-dashboard"]);
    this.isPosted = false;
    this.clearForm();
  }

  onSubmit() {
    const value = this.textUploadForm.value;

    const textUploaded: TextInterface = {
      description: value.textDescription,
      like: 0,
      category: value.categoryArr,
    };

    this.isLoading = true;
    if (this.textUploadForm.valid) {
      //add uploaded text

      this.textService.addText(textUploaded);

      //save post to the database
      this.textDataService.uploadText(textUploaded).subscribe((response) => {
        console.log(response);
        this.isLoading = false;
        this.message = "Your post successfully posted. let's Enjoy!";
        this.isPosted = true;
      });
    }

    this.clearForm();
  }

  private clearForm() {
    this.textUploadForm.reset();
  }
}
