import {Component, NgModule, ViewChild,ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms/src/directives";
//import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';

import {ModalModule} from "ng2-modal";
import {Headers,Http} from "@angular/http";
import {AppCommonservices} from  '../../services/app.commonservices'
import {CookieService} from 'angular2-cookie/core';
import {DomSanitizer} from "@angular/platform-browser";
declare var $: any;

@Component({
    selector: 'my-app',
    //template: '<h1>Welcome to my First Angular 2 App </h1>'
    templateUrl:'app/pages/dealerdashboard/home.html',
    providers: [AppCommonservices]
    //directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AppDealerdashboard {
    // /@ViewChild(Modal) modal;
    //dealerloginform: FormGroup;
    myModal :ModalModule;
    data:any;
    http:Http;
    items:any;
    serverUrl:any;
    commonservices:AppCommonservices;
    loginerror:any;
    private router: Router;
    private userInfo:any;
    details:any;
    username:any;
    filesrc:any;
    sharefilesrc:any;
    carlogolist:any;
    carautoyearlist:any;
    carmileagelist:any;
    colorlist:any;
    carlistarr:any;
    auctionlistarr:any;
    datamsg:any;
    private query_model:any;
    private query_auction:any;
    private query_make:any;
    private query_year:any;
    private query:any;
    private inventorymatcharr:Array<any>;
    private orderbyqueryinventorymatch:any;
    private orderbytypeinventorymatch:any;
    customercount:any;
    private rsvplist:any;
    private rsvplistarr:any;
    private rsvplistarr1:any;
    private rsvplistarr2:any;
    private oldarr:any;
    private nextauctiondate:any;
    private customerlist: any;
    private dealerlist: any;
    private messageaar: Array<any>;
    private messageaarpub:any;


    constructor(fb: FormBuilder , http:Http ,commonservices: AppCommonservices,userInfo:CookieService,router: Router,private _sanitizer: DomSanitizer) {
        this.router=router;
        this._sanitizer=_sanitizer;
        this.http=http;
        this.router=router;
        this.rsvplistarr=[];
        this.rsvplistarr1=[];
        this.rsvplistarr2=[];
        this.rsvplist=[];
        this.commonservices=commonservices;
        this.items = commonservices.getItems();
        this.serverUrl = this.items[0].serverUrl;
        this.query_model=0;
        this.query_auction=0;
        this.query_make=0;
        this.query_year=0;
        this.carlistarr=[];
        this.auctionlistarr=[];
        this.messageaar=[];
        this.messageaarpub=[];
        this.dealerlist=[];
        this.customerlist=[];
        this.details=[];
        this.inventorymatcharr=[];
        this.orderbyqueryinventorymatch='inventorymatchval';
        this.orderbytypeinventorymatch=-1;

        this.userInfo=userInfo.getObject('userdetails');
        this.username = this.userInfo.username; // (+) converts string 'id' to a number
        console.log(this.username);
        let ids={dealerusername:this.username};
        this.http.post(this.serverUrl+'getcustomerbyusername',ids)
            .subscribe(data => {
                this.filesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                this.details=data.json();
                //console.log(this.details);
                this.manageinventory();


            }, error => {
                console.log("Oooops!");
            });
        this.http.post(this.serverUrl+'getcustomerbyusernamecount',ids)
            .subscribe(data => {
                this.filesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                this.customercount=data.json();
                this.customercount=this.customercount.length;
                //console.log('customer count');
                //console.log(this.customercount.length);


            }, error => {
                console.log("Oooops!");
            });


        let linkv1 = this.serverUrl+'getrsvpbydealerid';
        let var11={dealerid:this.userInfo.username};
        this.http.post(linkv1,var11)
            .subscribe(data1 => {

                this.rsvplist = data1.json();
                console.log('rsvp list arr');
                console.log(this.rsvplist);
                this.rsvplistarr=this.rsvplist.slice(0,6);
                this.rsvplistarr1=this.rsvplist.slice(0,10);
                this.rsvplistarr2=this.rsvplist.slice(0,8);


            }, error => {
                console.log("Oooops!");
            });

        let link='';
        link = this.serverUrl+'getinventoryfordealer?dealerid='+this.userInfo.id;
        console.log('link ==='+link);
        this.http.get(link)
            .subscribe(data1 => {
                this.data = data1.json();
                //console.log('dealer inventorydata');
                //console.log(this.data);
                this.manageinventory();
                //alert(this.inventorymatcharr.length);
                let timeoutId = setInterval(() => {
                    //alert($('.inventorysinglelistblockcon').length);
                    if($('.inventorysinglelistblockcon').length>0) {
                        $('.noresinventory').css('display','none');
                        //alert(9);
                    }
                    else {
                        //alert(7);
                        $('.noresinventory').css('display','inline-block');
                    }
                    $('.inventorysinglelistblockcon').each(function (index:any) {
                        if(index>8) $(this).css('display','none');
                    });

                    // alert($('#query_model').val());
                    //alert($('#query_auction').val());
                }, 5000);
                this.sharefilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')

            }, error => {
                console.log("Oooops!");
            });

        this.http.get(this.serverUrl+'carlogolist')
            .subscribe(data => {
                //console.log(data);
                this.carlogolist=data.json();

                //console.log(this.carlogolist);


            }, error => {
                console.log("Oooops!");
                //return '22';
            });

        this.http.get(this.serverUrl+'carautoyearlist')
            .subscribe(data => {
                this.carautoyearlist=data.json();

                // console.log(this.carautoyearlist);


            }, error => {
                console.log("Oooops!");
            });
        this.http.get(this.serverUrl+'listcarautomileage')
            .subscribe(data => {
                this.carmileagelist=data.json();


            }, error => {
                console.log("Oooops!");
            });
        this.http.get(this.serverUrl+'colorlist')
            .subscribe(data => {
                this.colorlist=data.json();
            }, error => {
                console.log("Oooops!");
            });


        this.http.get(this.serverUrl+'carlist')
            .subscribe(data1 => {
                this.carlistarr = data1.json();
                //console.log(this.data);

            }, error => {
                console.log("Oooops!");
            });
        this.oldarr=999999999;
        this.http.get(this.serverUrl+'auctionlist')
            .subscribe(data1 => {
                this.auctionlistarr = data1.json();
                //console.log('auction data ..');
                //console.log(this.auctionlistarr);
                var x:any;
                for(x in this.auctionlistarr){
                    //console.log('logging auction data ...');
                    //console.log(this.auctionlistarr[x].auction_date);
                    var myarr = this.auctionlistarr[x].auction_date.split("-");
                    //console.log(myarr);
                    //console.log(myarr[2]+'.'+myarr[0]+'.'+myarr[1]);
                    myarr=(myarr[2]+'-'+myarr[0]+'-'+myarr[1]);
                    var myarr1=(myarr[2]+''+myarr[0]+''+myarr[1]);
                    var timestamp = parseInt((new Date(myarr).getTime() / 1000).toFixed(0));
                    //console.log(timestamp);
                    //console.log('myarr1');
                    //console.log(myarr1);
                    //console.log(parseInt(myarr.replace('-','')));
                    //console.log(commonservices.convertunixtodate(timestamp));
                    if((myarr.replace('-',''))<this.oldarr){
                        this.nextauctiondate=this.auctionlistarr[x].auction_date.replace('-','/');
                        this.nextauctiondate=this.nextauctiondate.replace('-','/');
                    }
                    this.oldarr=(myarr.replace('-',''));
                }

            }, error => {
                console.log("Oooops!");
            });


        link = this.serverUrl+'messagelist';
        this.http.get(link)
            .subscribe(data1 => {
                this.datamsg = data1.json();
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                this.sharefilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                //this.pagec=Math.ceil(this.data.length / 10);
                // console.log(' message list ...');
                // console.log(this.data);
                //console.log(this.data.length);
                this.makemessagelist();

            }, error => {
                console.log("Oooops!");
            });

        link = this.serverUrl+'customerlist';
        // console.log(link);
        this.http.get(link)
            .subscribe(data1 => {
                this.customerlist = data1.json();
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                this.sharefilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                //this.pagec=Math.ceil(this.data.length / 10);
                //console.log(' customer list ...');
                // console.log(this.customerlist);
                this.makemessagelist();

            }, error => {
                console.log("Oooops!");
            });

        link = this.serverUrl+'dealerlist';
        // console.log(link);
        this.http.get(link)
            .subscribe(data1 => {
                this.dealerlist = data1.json();
                // this.router.navigateByUrl('/adminlist(adminheader:adminheader//adminfooter:adminfooter)')
                this.sharefilesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                //this.pagec=Math.ceil(this.data.length / 10);
                // console.log(' dealer list ...');
                //console.log(this.dealerlist);
                this.makemessagelist();

            }, error => {
                console.log("Oooops!");
            });

    }

    private makemessagelist() {
        // if(this.dealerlist.length>0 && this.customerlist.length>0) {
        this.messageaar = [];
        this.messageaarpub=[];
        // console.log('userinfo  in makemessagelist.. .. ');
        // console.log(this.userInfo.username);
        //console.log(this.data.length);
        var x: any;
        for (x in this.datamsg) {
            if(this.datamsg[x].parentid!=0) this.datamsg[x]._id=this.datamsg[x].parentid;
            if (this.datamsg[x].to == this.userInfo.username) {
                this.datamsg[x].fromfullname = this.getuserinfo(this.datamsg[x].from);
                this.messageaar[this.datamsg[x]._id]=(this.datamsg[x]);
            }
        }

        for ( var key in this.messageaar ){
            this.messageaarpub.push(this.messageaar[key]);
        }
       // this.pagec=Math.ceil(this.messageaarpub.length / 10);

        // console.log('message final array');
        // console.log(this.messageaar);
        // console.log(this.messageaar.length);
       // this.sendmessagelist();
        //}
    }
    private getuserinfo(from:any) {
        var y:any;
        for(y in this.customerlist){
            this.breaklog++;

            if(from==this.customerlist[y].username){
                return this.customerlist[y].fname+' '+this.customerlist[y].lname+' ( '+this.customerlist[y].username+' ) ';
            }

        }
        var z:any;
        for(z in this.dealerlist){
            this.breaklog1++;

            if(from==this.dealerlist[z].username){
                return this.dealerlist[z].fname+' '+this.dealerlist[z].lname+' ( '+this.dealerlist[z].username+' ) ';
            }

        }

        return '';

    }
    getcustomerdetails(val:any,val1:any){

        let ids={dealerusername:this.username};
        if(this.details.length==0)
        {
            this.http.post(this.serverUrl+'getcustomerbyusername',ids)
            .subscribe(data => {
                this.filesrc="http://probidbackend.influxiq.com/uploadedfiles/sharelinks/";
                this.details=data.json();
                //console.log(this.details);
                //this.manageinventory();
                var x:any;
                for(x in this.details){
                    if(val==this.details[x].username){

                        if (val1=='name')return this.details[x].fname+' '+this.details[x].lname;
                        if (val1=='image'){
                            if(typeof (this.details[x].filename)!='undefined')
                                return this._sanitizer.bypassSecurityTrustHtml("<img  src = "+this.filesrc+this.details[x].filename+ " />");
                            else return this._sanitizer.bypassSecurityTrustHtml("<img  src ='images/logo_61.png' />");
                        }
                        return this.details[x];
                    }
                }
                return 'N/A';


            }, error => {
                console.log("Oooops!");
            });
        }
        else
        {
            var x: any;
            for (x in this.details) {
                if (val == this.details[x].username) {
                    if (val1=='name')return this.details[x].fname+' '+this.details[x].lname;
                    if (val1=='username')return this.details[x].username;
                    if (val1=='image'){
                        if(typeof (this.details[x].filename)!='undefined')
                            return this._sanitizer.bypassSecurityTrustHtml("<img  src = "+this.filesrc+this.details[x].filename+ " />");
                        else return this._sanitizer.bypassSecurityTrustHtml("<img  src = 'images/logo_61.png' />");
                    }

                    return this.details[x];
                }
            }
            return 'N/A';
        }
    }

    getcardetails(val:any,val1:any){

        if(this.carlistarr.length==0){
            this.http.get(this.serverUrl+'carlist')
                .subscribe(data1 => {
                    this.carlistarr = data1.json();
                    //console.log(this.data);

                    var x:any;
                    for(x in this.carlistarr){
                        if(val==this.carlistarr[x]._id){

                            if (val1=='make'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return this.getcarlogo(this.carlistarr[x]);
                            }
                            if (val1=='mileage'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return this.getmileage(this.carlistarr[x]);
                            }
                            if (val1=='model'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].model);
                            }
                            if (val1=='year'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return this.getcaryear(this.carlistarr[x]);
                            }
                            if (val1=='image'){
                                if(typeof (this.carlistarr[x].filename)!='undefined')
                                    return this._sanitizer.bypassSecurityTrustHtml("<img  src = "+this.filesrc+this.carlistarr[x].filename+ " />");
                                else return this._sanitizer.bypassSecurityTrustHtml("<img  src = 'images/logo_61.png' />");
                            }
                            if (val1=='color'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return this.getcolor(this.carlistarr[x]);
                            }
                            if (val1=='price'){
                                //console.log(this.carlistarr[x]);
                                //console.log(this.carlistarr[x].carlogolist);
                                return (this.carlistarr[x].est_retail_value);
                            }
                            return this.carlistarr[x];
                        }

                    }

                }, error => {
                    console.log("Oooops!");
                });
        }
        else{
            var x:any;
            for(x in this.carlistarr){
                if(val==this.carlistarr[x]._id){
                    if (val1=='mileage'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return this.getmileage(this.carlistarr[x]);
                    }
                    if (val1=='model'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].model);
                    }
                    if (val1=='color'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return this.getcolor(this.carlistarr[x]);
                    }
                    if (val1=='price'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].est_retail_value);
                    }

                    if (val1=='make'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return this.getcarlogo(this.carlistarr[x]);
                    }
                    if (val1=='auctionname'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return (this.carlistarr[x].auctiondata[0].name);
                    }
                    if (val1=='year'){
                        //console.log(this.carlistarr[x]);
                        //console.log(this.carlistarr[x].carlogolist);
                        return this.getcaryear(this.carlistarr[x]);
                    }
                    if (val1=='image'){
                        if(typeof (this.carlistarr[x].filename)!='undefined')
                            return this._sanitizer.bypassSecurityTrustHtml("<img  src = "+this.filesrc+this.carlistarr[x].filename+ " />");
                        else return this._sanitizer.bypassSecurityTrustHtml("<img  src = 'images/logo_61.png' />");
                    }
                    if (val1=='auctionimage'){
                        if(typeof (this.carlistarr[x].auctiondata[0].filename)!='undefined')
                            return this._sanitizer.bypassSecurityTrustHtml("<img  src = "+this.filesrc+this.carlistarr[x].auctiondata[0].filename+ " />");
                        else return this._sanitizer.bypassSecurityTrustHtml("<img  src = 'images/logo_61.png' />");
                    }

                    return this.carlistarr[x];
                }

            }
        }
        return 'N/A'

    }

    getauctiondetails(val:any,val1:any){

        var x: any;
        for (x in this.auctionlistarr) {
            if (val == this.auctionlistarr[x]._id) {
                //if (val1=='name')return this.auctionlistarr[x].fname+' '+this.details[x].lname;
                //if (val1=='username')return this.details[x].username;
                if (val1=='image'){
                    if(typeof (this.details[x].filename)!='undefined')
                        return this._sanitizer.bypassSecurityTrustHtml("<img  src = "+this.filesrc+this.details[x].filename+ " />");
                    else return this._sanitizer.bypassSecurityTrustHtml("<img  src = 'images/logo_61.png' />");
                }

                return this.details[x];
            }
        }
        return 'N/A';

    }

    getrsvpapprovalstatus(val:any,val1:any){

        //console.log('val1'+val1+'-- val --'+val);
        if(val==val1) return true;
        return false;

    }
    checkcustomerfinancestatus(val:any,val1:any){

        //console.log('val1'+val1+'-- val --'+val);
        if(val==val1) return true;
        return false;

    }

    getmatchpercentageval(val:any,val1:any){

        var customerdata:any=0;
        customerdata=this.getcustomerdetails(val1,'');
        var cardata:any=0;
        cardata=this.getcardetails(val,'');

        //console.log('match data');
        //console.log(customerdata);
        //////console.log(cardata);
        var matchval:any=0;
        if(typeof (customerdata)!='undefined' && typeof (cardata)!='undefined') {

            if ($.inArray(cardata.carautoyearlist ,customerdata.car_auto_year) > -1) matchval += 14.3;
            //if (cardata.carautoyearlist == customerdata.car_auto_year) matchval += 14.3;
            if ($.inArray(cardata.basepricerange , customerdata.base_price)) matchval += 14.3;
            if ($.inArray(cardata.car_body_style , customerdata.car_body_style)) matchval += 14.3;
            if ($.inArray(cardata.color , customerdata.color_opiton)) matchval += 14.3;
            if ($.inArray(cardata.carlogolist , customerdata.upcoming_auction)) matchval += 14.3;
            if (cardata.mileage == customerdata.car_mileage) matchval += 14.3;
        }
       /* else{
            let timeout=setTimeout(() => {

                if (cardata.carautoyearlist == customerdata.car_auto_year) matchval += 14.3;
                if (cardata.basepricerange == customerdata.base_price) matchval += 14.3;
                if (cardata.car_body_style == customerdata.car_body_style) matchval += 14.3;
                if (cardata.color == customerdata.color_opiton) matchval += 14.3;
                if (cardata.carlogolist == customerdata.upcoming_auction) matchval += 14.3;
                if (cardata.mileage == customerdata.car_mileage) matchval += 14.3;

            },2000);

        }*/

        return Math.ceil(matchval)+'%';



    }

    manageinventory(){
        var x:any;
        var y:any;
        var z:any;
        var inventorymatchvalue:any;
        var inventorymatchvaluearr:Array<any>;
        var inventorymatchvalueclass:Array<any>;
        var tempcustomerarrforiventorymatches:Array<any>;
        let timeout=setInterval(() => {

            for (x in this.data) {
                for (y in this.data[x].cardata) {
                    tempcustomerarrforiventorymatches = [];

                    this.data[x].cardata[y].auctionids = this.data[x].cardata[y].auctionid.join("-");
                    this.data[x].cardata[y].auctiondata = this.data[x].auctiondata;


                    for (z in this.details) {
                        if(this.checkrsvp(this.details[z], this.data[x].cardata[y]) != 1){
                            clearInterval(timeout);

                            let cflag: any = 0;
                            //console.log('details.. users ...');
                            //console.log(this.details[z]);

                            if (typeof (this.details[z].base_price != 'undefined' )) {
                                inventorymatchvalue = 0;
                                inventorymatchvaluearr = [];
                                inventorymatchvalueclass = [];

                                if ($.inArray(this.data[x].cardata[y].carautoyearlist, this.details[z].car_auto_year) > -1) {

                                    inventorymatchvalue += 14.3;
                                    inventorymatchvaluearr.push('Year /');
                                    inventorymatchvalueclass['yr'] = 'match';
                                }
                                else {
                                    inventorymatchvalueclass['yr'] = 'unmatched';
                                }
                                if ($.inArray(this.data[x].cardata[y].basepricerange, this.details[z].base_price) > -1) {

                                    inventorymatchvalue += 14.3;
                                    inventorymatchvaluearr.push('Price /');
                                    inventorymatchvalueclass['bp'] = 'match';
                                }
                                else {
                                    inventorymatchvalueclass['bp'] = 'unmatched';
                                }
                                if ($.inArray(this.data[x].cardata[y].car_body_style, this.details[z].car_body_style) > -1) {

                                    inventorymatchvalue += 14.3;
                                    inventorymatchvaluearr.push('Body Style / ');
                                    inventorymatchvalueclass['bs'] = 'matched';
                                }
                                else {
                                    inventorymatchvalueclass['bs'] = 'unmatched';
                                }
                                if ($.inArray(this.data[x].cardata[y].color, this.details[z].color_opiton) > -1) {

                                    inventorymatchvalue += 14.3;
                                    inventorymatchvaluearr.push('Color /');
                                    inventorymatchvalueclass['cl'] = 'match';
                                }
                                else {
                                    inventorymatchvalueclass['cl'] = 'unmatched';
                                }
                                if ($.inArray(this.data[x].cardata[y].carlogolist, this.details[z].upcoming_auction) > -1) {


                                    inventorymatchvalue += 14.3;
                                    inventorymatchvaluearr.push('Make /');
                                    inventorymatchvalueclass['mk'] = 'match';
                                }
                                else {
                                    inventorymatchvalueclass['mk'] = 'unmatched';
                                }
                                if (this.data[x].cardata[y].mileage == this.details[z].car_mileage) {

                                    inventorymatchvalue += 14.3;
                                    inventorymatchvaluearr.push('Mileage /');
                                    inventorymatchvalueclass['ml'] = 'match';

                                }
                                else {
                                    inventorymatchvalueclass['ml'] = 'unmatched';
                                }
                                //console.log('push arr...');
                                //console.log(this.details[z]);
                                //console.log('class arr...');
                                //console.log(inventorymatchvalueclass);

                                this.details[z].inventorymatchval = Math.ceil(inventorymatchvalue);
                                this.details[z].inventorymatchvaluearr = inventorymatchvaluearr;
                                this.details[z].inventorymatchvalueclass = inventorymatchvalueclass;
                                if (inventorymatchvalue > 0)tempcustomerarrforiventorymatches.push(this.details[z]);
                                //console.log('inventorymatchvalue == ' + inventorymatchvalue);
                            }
                        }
                    }
                    this.data[x].cardata[y].userdetails = tempcustomerarrforiventorymatches;


                    ///alert(tempcustomerarrforiventorymatches.length);
                    if (tempcustomerarrforiventorymatches.length > 0) {
                        this.inventorymatcharr.push(this.data[x].cardata[y]);
                        //console.log('inventory user array length d');
                        //console.log(this.data[x].cardata[y].userdetails.length);
                    }

                }
            }

            this.inventorymatcharr.slice(0,6);
        },2000);
    }

    checkrsvp(val1:any,val2:any){
        let z1:any;

        for(z1 in this.rsvplist){
            /* console.log('rsvp .. users ...');
             console.log(this.rsvplist[z1].dealerid);
             console.log(val1.dealerusername);
             console.log(val1.customerusername);
             console.log(val1.username);
             console.log('car data id');
             console.log(val2._id);
             console.log(this.rsvplist[z1].inventoryid);*/
            //if(this.data[x].cardata[y]._id == this.rsvplist[z1].inventoryid) alert(890);
            if(val1.username==this.rsvplist[z1].customerusername && val1.dealerusername==this.rsvplist[z1].dealerid && this.rsvplist[z1].inventoryid==val2._id){
                //console.log('rsvp found ...');
                //console.log(val1);
                //console.log(val2);
                return 1;
                //alert(9);
            }
        }
        return 0;

    }


    getcarlogo(val:any){
        //console.log('get car logo ...');
        //console.log(val);
        //carlogolist
        var x:any;
        for(x in this.carlogolist){
            if(this.carlogolist[x]._id==val.carlogolist) return this.carlogolist[x].name;
        }
        return 'N/A';
    }
    getcaryear(val:any){
        //console.log(val);
        //carlogolist
        var y:any;
        for(y in this.carautoyearlist){
            if(this.carautoyearlist[y]._id==val.carautoyearlist) return this.carautoyearlist[y].year;
        }
        return 'N/A';
    }
    getmileage(val:any){
        //console.log(val);
        //carlogolist
        var z:any;
        for(z in this.carmileagelist){
            if(this.carmileagelist[z]._id==val.mileage) return this.carmileagelist[z].mileage;
        }
        return 'N/A';
    }
    getcolor(val:any){
        //console.log(val);
        //carlogolist
        var a:any;
        for(a in this.colorlist){
            if(this.colorlist[a]._id==val.color) return this.colorlist[a].color;
        }
        return 'N/A';
    }

    startquerysearch(ev:any){

        var target = ev.target || ev.srcElement || ev.originalTarget;
        var tval=$(target).val();
        $('.inventory_review').val(0);
        $(target).val(tval);
        //alert($(target).val());
        //alert(tval);
        this.query=$(target).val();
        //alert(this.query);
    }
    getarrcount(item:any,i:any,icar:any){
        //var target = ev.target || ev.srcElement || ev.originalTarget;
        //console.log('ev counter ...');
        //console.log($(target).index());

        $('.inventorysinglelistblockcon').eq(8).nextAll().remove();
        var x=0;
        var totalc=0;
        if(i==0){
            totalc=icar;
            if(totalc>8 )return false;
            else return true;
        }


        //console.log('car i counter before loop  '+i);
        while(i+1>x){

           /* console.log('car counter in loop '+totalc);
            console.log('car  i counter in loop '+i);
            console.log('car  i counter in loop '+i);
            console.log('car x counter in loop '+x);
            console.log('car item data in loop ');
            console.log(item);*/
            if(i>0){

                totalc=item[0].cardata.length+icar;
                //console.log('car counter in loop '+totalc);
            }

            x++;
        }
        //console.log('car counter '+totalc);
        //alert(totalc);
        if(totalc>8 )return false;
        else return true;
    }
    goinventoryDetails(inventoryid:any){


    }

    getmatchpercentage(val:any){
        return this._sanitizer.bypassSecurityTrustHtml(val);
    }
}


