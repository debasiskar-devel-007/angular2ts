import {Component, NgModule, ViewChild,ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Routes, RouterModule, Router} from '@angular/router';
import {ModalModule} from "ng2-modal";
import {Headers,Http} from "@angular/http";
import {AppCommonservices} from  '../../services/app.commonservices'
import {CookieService} from 'angular2-cookie/core';




@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/customersignup/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppCustomersignup {
    // /@ViewChild(Modal) modal;
    customersignupform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    private customerInfo:CookieService;
    private router: Router;


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices ,customerInfo:CookieService ,router: Router) {

        this.items = commonservices.getItems();
        this.http=http;
        this.router=router;
        this.customerInfo=customerInfo;
        console.log(this.items);
        console.log(this.items[0].serverUrl);

        this.serverUrl = this.items[0].serverUrl;

        this.customersignupform = fb.group({
            username: ["", Validators.required],
            password: ["", Validators.required],
            fname: ["", Validators.required],
            lname: ["", Validators.required],
            email: ["", AppCustomersignup.validateEmail],
            phone: ["", Validators.required],
            zip: ["", Validators.required],
            term: ["", AppCustomersignup.validateTerms]
        });
    }


    static validateTerms(control: FormControl){

        if(control.value==false){
            return { 'isTermsChecked': true };
        }
    }

    static validateEmail(control: FormControl){

        if (control.value=='' || !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {

            return { 'invalidEmailAddress': true };
        }
    }
    submitform(){
        let x:any;

        for(x in this.customersignupform.controls){
            this.customersignupform.controls[x].markAsTouched();
        }
        this.customersignupform.markAsDirty();
        //this.signupform.controls['fname'].markAsTouched();
        if(this.customersignupform.valid){

            let link = this.serverUrl+'addcustomer';
            var submitdata = this.customersignupform.value;

            this.http.post(link,submitdata)
                .subscribe(data => {
                    // /this.data1.response = data.json();
                    this.customersignupform.value.password='';
                    this.customerInfo.putObject('customerInfo', this.customersignupform.value);
                    this.router.navigate(['/customercreditcard']);
                }, error => {
                    console.log("Oooops!");
                });
        }
    }
}


