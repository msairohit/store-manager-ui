import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-medicines',
  templateUrl: './manage-medicines.component.html',
  styleUrls: ['./manage-medicines.component.css']
})
export class ManageMedicinesComponent implements OnInit {

  /**
   * TODO:
   * clear once any operation performed
   * add pagination
   * add http calls to other Crud operations
   * add alerts for responses
   */
  displayTable: boolean = false;
  medicinesData;
  keys;
  editEnabled: boolean = false;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {

    let date = new Date();
    let aYearFromNow = date.setFullYear(date.getFullYear() + 1);
    let aYearFromNowDate = new Date(aYearFromNow).toISOString().substring(0, 10);
    this.medicineForm = this.fb.group({
      "name": ['', Validators.required],
      "company": ['', Validators.required],
      "description": [''],
      "manufactureDate": [(new Date()).toISOString().substring(0, 10)],//by default setting todays date
      "expiryDate": [aYearFromNowDate],//by default setting a year from now
      "quantity": [1.0],
      "mrp": ['', Validators.required],
      "price": [''],//by default set price = mrp
      "batchId": ['']
    });

  }

  medicineForm: FormGroup;

  ngOnInit(): void {


    /*         // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
              form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
                form.classList.add('was-validated');
              }, false);
            }); */
  }

  addProduct() {
    this.medicineForm.get('price').value == '' || this.medicineForm.get('price').value == null ? this.medicineForm.get('price').setValue(this.medicineForm.get('mrp').value) : '';
    let body = this.medicineForm.value;
    body.photo = this.file;
    // body.image = this.file;

    const uploadImageData = new FormData();
    uploadImageData.append('medicine', JSON.stringify(this.medicineForm.value));
    // uploadImageData.append('image', this.file, this.file.name);
    // uploadImageData.append('photo', this.file, this.file.name);

    this.httpClient.post('http://localhost:8080/medicine', body/* uploadImageData */)
      .subscribe(
        res => {
          console.log(res)
        },
        error => {
          console.error(error);
        }
      );
  }

  search() {
    //FIXME: when entered something in any of the fields and removed its value is going as empty and search is failing.
    this.setToNullIfEmpty();
    this.httpClient.post('http://localhost:8080/medicine/fieldSearch', this.medicineForm.value)
      .subscribe(
        (res: any) => {
          this.displayTable = true;
          console.log(res);
          this.medicinesData = res;
          if(res.result.length > 0) {
            this.keys = Object.keys(res.result[0]);

          }
        },
        error => {
          console.error(error);
        }
      );
  }

  updateProduct() {
    this.httpClient.put('http://localhost:8080/medicine', this.medicineForm.value)
      .subscribe(
        res => {
          console.log(res)
        },
        error => {
          console.error(error);
        }
      );
  }

  onClear() {
    this.medicineForm.reset();
    this.displayTable = false;
    this.editEnabled = false;
  }

  rowClicked(data) {
    console.log(data);
  }

  editClicked(data) {
    console.log(data);
    //set table data to fields.
    this.medicineForm.patchValue(data);
    this.editEnabled = true;
  }

  deleteClicked(data) {
    console.log(data);

    this.httpClient.delete('http://localhost:8080/medicine/' + data.name)
      .subscribe(
        res => {
          console.log(res)
        },
        error => {
          console.error(error);
        }
      );
  }

  setToNullIfEmpty() {
    Object.keys(this.medicineForm.controls).forEach(key => {
      if(this.medicineForm.controls[key].value === '') {
        this.medicineForm.controls[key].setValue(null);
      }
    });
  }

  file: File;
  onFileChanged(event) {
    this.file = event.target.files[0];
  }

  onUpload() {
        //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
        const uploadImageData = new FormData();
        uploadImageData.append('imageFile', this.file, this.file.name);
    this.httpClient.post('http://localhost:8080/medicine/file-upload', uploadImageData)
      .subscribe(
        (data) => {
          console.log(data);
        }, (error) => {
          console.error(error);
        }
      );
  }
}

