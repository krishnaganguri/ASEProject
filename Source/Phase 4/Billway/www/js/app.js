var imageApp=angular.module('starter', ['ionic','ngCordova','firebase']);

//var fb = new Firebase("https://brilliant-fire-9489.firebaseio.com/"); //ur firebase url

imageApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

imageApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: "templates/loginpage.html",
            controller: "LoginController",
            cache: false
        })
    .state("profile", {
            url: "/profile",
            templateUrl: "templates/profile.html",
            controller: "ProfileController",
            cache: false
        })
    .state("itemscan", {
            url: "/profile",
            templateUrl: "templates/itemscan.html",
            controller: "ItemScanController",
            cache: false
        })
        .state("secure", {
            url: "/secure",
            templateUrl: "templates/secure.html",
            controller: "SecureController"
        })
    .state("home", {
            url: "/home",
            templateUrl: "templates/homepage.html",
            controller: "HomePageController"
        })
    .state("changePass", {
            url: "/changePass",
            templateUrl: "templates/changePass.html",
            controller: "ChangePassController"
        })
    .state("register", {
            url: "/register",
            templateUrl: "templates/register.html",
            controller: "RegistrationController"
        })
    .state("myBills", {
            url: "/myBills",
            templateUrl: "templates/myBills.html",
            controller: "MyBillsController"
        })
    .state("preInvoice", {
            url: "/preInvoice",
            templateUrl: "templates/preInvoice.html",
            controller: "PreInvoiceController"
        })
    .state("recommend", {
            url: "/recommend",
            templateUrl: "templates/recommendation.html",
            controller: "RecommendController"
        })
    .state("invoice", {
            url: "/invoice",
            templateUrl: "templates/invoice.html",
            controller: "InvoiceController"
        });
    $urlRouterProvider.otherwise('/login');
});

imageApp.controller("LoginController", function($scope,$http, $state, $firebaseAuth, $cordovaBarcodeScanner, $httpParamSerializerJQLike,$q, $cordovaCamera,$cordovaToast) {

        $scope.barcodes = [];

    $scope.sucmsg = localStorage.getItem("registerSuc");
    var user = new User();
    
    
    
    $scope.login = function(username, password) {
        
        /*$cordovaToast.show("hi kk", "short", "bottom").then(function(success) {
            console.log("The toast was shown");
        }, function (error) {
            console.log("The toast was not shown due to " + error);
        });*/
        
        userLogin = UserLogin.getInstance()
        userLogin.Login($http,username,password,$scope,$state)
              
        
             
        }
    
    $scope.delete = function(username, password) {
              
        console.log("inside login function");
        $http({
            type: "GET",
            url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/users?q={name:\''+username+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
           
            contentType: "application/json"
        })
        .success(function(data){
           
            if(data==""){
                //alert("null");
                  $scope.errormsg = "No user found"       
                        
            }else{
               
              if (username == data[0].name && password == data[0].password) {
                        /*localStorage.setItem("name" , username);
                  $state.go("login");*/
                  
                  $http({
                      method: 'DELETE' ,   
                url: 'https://api.mongolab.com/api/1/databases/aselab7/collections/users/'+data[0]._id.$oid+'?apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',

                     }).success(function (data) {
                     //alert("deleted");
                      $scope.sucmsg = "User deleted successfully"
                     })                  
                  
                    } else {
                       $scope.errormsg = "Invalid credentials"
                    }           
            
            }            

            })
             
        }
    
    

    $scope.register = function(username, password) {
                
        //$state.go("register");
        user.register($state);
    }
    
    
            
        
});

//secure controller

imageApp.controller("SecureController", function($scope, $ionicHistory, $firebaseArray, $cordovaCamera) {

    /*$ionicHistory.clearHistory();  //for clearing user login history

    $scope.images = [];

    var fbAuth = fb.getAuth();
    if(fbAuth) {
        var userReference = fb.child("users/" + fbAuth.uid);   //capture the user reference in data structure ,it navigates to specific user page in freebase
        var syncArray = $firebaseArray(userReference.child("images"));  //binding specific node in firebase to an array object in angularjs
        $scope.images = syncArray;
    } else {
        $state.go("login");  //directs to firebase page
    }

    $scope.upload = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            syncArray.$add({image: imageData}).then(function() {
                alert("Image has been uploaded");
            });
        }, function(error) {
            console.error(error);
        });
    }*/

});


imageApp.controller("HomePageController", function($scope, $state,$http,$cordovaBarcodeScanner,$cordovaCamera) {
    
     var appUser = new User();
    
    
    var detailsStorage = new DetailsFunction();
        var details = detailsStorage.createStorage({});
    
    var username = details.username;
    var mobileNum = details.mobile;
    
        var user = localStorage.getItem("name");
    $scope.user = "Welcome "+username;
    $scope.mobile = "Mobile : "+mobileNum
    //alert("user : "+user);
    
    $scope.getWeather = function() {

    var url = document.getElementById('imageurl').value;
    $http.get('https://api.idolondemand.com/1/api/sync/recognizebarcodes/v1?url='+url+'&apikey=77c8a034-ae01-4f7f-ac7e-f28a5f55b374').success(function(data){
    
      console.log(data);
       
          name = data.barcode[0].text;
                
    $scope.st_place = name;
     $scope.image = url;   
    
                     
});
    
    
}; 
    
$scope.getDetails = function() {
    
     
    
     var url = 'http://api.walmartlabs.com/v1/items?apiKey=avwybe6h7zkrmwvr3mqbs3r3&upc='+document.getElementById('barcode').value+'&format=json';
    
   /* var url = 'http://api.walmartlabs.com/v1/items?apiKey=avwybe6h7zkrmwvr3mqbs3r3&upc=036000291452&format=json';*/
    
        //alert("url : "+url);
    $http.get(url).success(function(data){
    
        
      // alert("out");
      console.log(data);
       
          name = data.items[0].name;
       price = data.items[0].salePrice;
                
    $scope.end_place = name;
    $scope.price = price;    
    
                     
});
};    
    
    
     $scope.changePass = function() {
        // alert("in pass");
        // alert("name : "+localStorage.getItem("name"));
         
         $state.go("changePass");
     };
    
    $scope.updateUser = function(name, pw) {
           
 
             $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/aselab7/collections/users?q={name:\''+name+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
        contentType:"application/json"
        
    }).success(function(data){
     //alert(data[0]._id.$oid);
      if (name == data[0].name ) {
         
          $http({
              method: 'PUT' ,   
        url: 'https://api.mongolab.com/api/1/databases/ase/collections/Patients/'+data[0]._id.$oid+'?apiKey=ZE5gPXuMklJoxOhGZbFKK2tLg7SXx96I',
		 data: JSON.stringify( { "$set" : { "password" : pw } } ),
		 
		  contentType: "application/json"
             }).success(function (data) { 
            // alert(1);
             })
                
            } 
                 
    })
    
    };
    
    $scope.scans = [];
    $scope.productName = [];
    $scope.productPrice = [];
    $scope.product = [];
    $scope.productNo = 0;
    
    $scope.scan = function() {
       // alert("inside scan");
        $cordovaBarcodeScanner.scan().then(function(barcodeData) {
            
        // Success! Barcode data is here
            //alert("text : "+barcodeData.text);
            //alert("format : "+barcodeData.format);
            text = barcodeData.text;
            format = barcodeData.format;
            $scope.barcode = text;
            $scope.format = format;
            $scope.msg = "Barcode is "+text+" with format "+format
            
            
            //walmart
            var url = 'http://api.walmartlabs.com/v1/items?apiKey=avwybe6h7zkrmwvr3mqbs3r3&upc='+text+'&format=json';
    
                //alert("url : "+url);
            $http.get(url).success(function(data){


              // alert("out");
              console.log(data);

                  name = data.items[0].name;
               price = data.items[0].salePrice;
                categoryPath = data.items[0].categoryPath;

               /* alert("name : "+name);
                alert("price : "+price);*/
                
            $scope.end_place = name;
            $scope.price = price;
            var category =    categoryPath.split("/");
            $scope.productdetails = "Product : "+name+" : Price : "+price;  
                
            
            $scope.productName.push(name); 
            $scope.productPrice.push(price);
           // $scope.product.push({productName:name,productPrice:price});
            $scope.product.push(name+"|"+price+"|"+category[1]);
           // $scope.product.push(price);    
                
            $scope.productNo = $scope.productNo +1;    
            $scope.scans.push( $scope.productNo+" : Product : "+name+" : Price : "+price); 
                //alert("category : "+category[1]);
            });
            
            
            //alert(); 
            
            /*$scope.barcodes.push( "Barcode is "+text+" with format "+format);*/
      },function(error) {
       alert("an error occured");
      });
    }
    
    $scope.doneScan = function(){
        
         $scope.scans = "";      
        var itemList =[];
        
       /* var countTest=['a','b','a','c','a','b']
        alert(countTest.count('a'));*/
        
        $scope.test=[];
        
        $scope.test.push("kk|2.3|a");
        $scope.test.push("mouni|3.3|a");
        $scope.test.push("mouni&kk|4.3|b");
        
       
         localStorage.setItem("itemLength",$scope.test.length);
            
        
        
        /*alert(" pro length : "+$scope.test.length)*/
        
        for(var i=0;i<$scope.product.length;i++){
            localStorage.setItem("itemList"+i,$scope.product[i]);
           // localStorage.setItem("itemList"+i,$scope.test[i]);
           // localStorage.setItem("itemListp"+i,$scope.product[i].productPrice);
        }
        
       
        localStorage.setItem("productLength",$scope.product.length);
       //  localStorage.setItem("productLength",$scope.product.length);
        
      
        
        $state.go("invoice");
        
    }
    
    
    $scope.getProfile = function(){
        
        
    }
    
 $scope.profile = function() {
//alert("hi");
   //$state.go("profile");
     appUser.updateProfile($state);
     }
 $scope.logout = function() {
//alert("hi");
     localStorage.setItem("registerSuc","");
   $state.go("login");
     }
 
 $scope.myBills = function() {
     
     //alert(mobileNum);
     
     var dates;
     
     $http({
            type: "GET",
            url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/products?q={mobile:\''+mobileNum+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
           
            contentType: "application/json"
        })
        .success(function(data){
           
            if(data==""){
                alert("null");
                $state.go("myBills");
                  //$scope.errormsg = "Bills found"       
                      
            }else{
               
                for(var i=0;i<data.length;i++){
                   
                    if(i==0){dates = data[i].date;}
                    else{dates = dates+","+data[i].date;}
                    
                }
                
                //alert("dates : "+dates);
                        /*localStorage.setItem("mobile" , data[0].mobile);*/
                localStorage.setItem("dates" ,dates);
                
                $state.go("myBills");
                  
            }
     })

   
     }
 
 $scope.recomend = function(){
     $state.go("recommend");
     
 }
 
 
 $scope.showCharts = function(){
     var mobile = localStorage.getItem("mobile");
      $http({
                    type: "GET",
                    url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/recommendation?q={mobile:\''+mobile+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',

                    contentType: "application/json"
                })
                .success(function(data){

                   var category=[];
          var category1=[];
          var categoryFinal=[];
          var preRecords = data[0].products;
          
          for ( var i = 0; i < preRecords.length; i++ ) {
                    var temp = preRecords[i].split("|");
              if(temp[2]!=""){
                   category.push(temp[2]);
              }
                   
                }
           var a = [], b = [], prev;
    
                        category.sort();
                for ( var i = 0; i < category.length; i++ ) {
                            if ( category[i] !== prev ) {
                                a.push(category[i]);
                                b.push(1);
                            } else {
                                b[b.length-1]++;
                            }
                            prev = category[i];
                        }

                  for ( var i = 0; i < b.length; i++ ) {
                            category1.push(a[i]);
                            category1.push(b[i]);
                      categoryFinal.push(category1);
                      category1=[];
                        }
          alert("category : "+category);
          alert("a : "+a);
          alert("b : "+b);
          alert("final : "+categoryFinal[0])
          
          
          google.load("visualization", "1", {packages:["corechart"]});
          google.setOnLoadCallback(drawChart);
          function drawChart() {
            var data = google.visualization.arrayToDataTable([
              ['Task', 'Hours per Day'],
              ['Work',     11],
              ['Eat',      2],
              ['Commute',  2],
              ['Watch TV', 2],
              ['Sleep',    7]
            ]);

            var options = {
              title: 'My Daily Activities',
              is3D: true,
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
            chart.draw(data, options);
          }
      
            })
     
 }
 
});




imageApp.controller("ItemScanController", function($scope, $state,$http,$cordovaBarcodeScanner,$cordovaCamera) {
    
    $scope.scans = [];
    
    $scope.productName = [];
    $scope.productPrice = [];
    $scope.product = [];
    
    $scope.scan = function() {
       // alert("inside scan");
        $cordovaBarcodeScanner.scan().then(function(barcodeData) {
            
        // Success! Barcode data is here
            //alert("text : "+barcodeData.text);
            //alert("format : "+barcodeData.format);
            text = barcodeData.text;
            format = barcodeData.format;
            $scope.barcode = text;
            $scope.format = format;
            $scope.msg = "Barcode is "+text+" with format "+format
            
            
            //walmart
            var url = 'http://api.walmartlabs.com/v1/items?apiKey=avwybe6h7zkrmwvr3mqbs3r3&upc='+text+'&format=json';
    
                //alert("url : "+url);
            $http.get(url).success(function(data){


              // alert("out");
              console.log(data);

                  name = data.items[0].name;
               price = data.items[0].salePrice;

               /* alert("name : "+name);
                alert("price : "+price);*/
                
            $scope.end_place = name;
            $scope.price = price;
            $scope.productdetails = "Product : "+name+" : Price : "+price;    
            
            $scope.productName.push(name); 
            $scope.productPrice.push(price);
           // $scope.product.push({productName:name,productPrice:price});
            $scope.product.push(name+"|"+price);
           // $scope.product.push(price);    
                
                
            $scope.scans.push( "Product : "+name+" : Price : "+price);    
            });
            
            
            //alert(); 
            
            /*$scope.barcodes.push( "Barcode is "+text+" with format "+format);*/
      },function(error) {
       alert("an error occured");
      });
    }
    
    $scope.doneScan = function(){
        alert("hi");
         $scope.addScans = "";      
        var itemList =[];
        
        $scope.test=[];
        
        $scope.test.push("abc1|5.3");
        $scope.test.push("xyz1|6.3");
        $scope.test.push("abc&xyz1|7.3");
        $scope.test.push("mounifrndkk1|8.3");
        var x=parseInt(localStorage.getItem("itemLength"));
       // alert(" pro length : "+x);
        var y = parseInt($scope.test.length);
        
       var z = x + y;
       // alert("hello"+y);
            
       // alert(" pro length1 : "+z);
        
        /*alert(" pro length : "+$scope.test.length)*/
        j=0;
        for(var i=x;i<z;i++){
         //   alert(" ival : "+i);
            
           localStorage.setItem("itemList"+i,$scope.product[i]);
           // localStorage.setItem("itemList"+i,$scope.test[j]);
            
         //   alert(" ivalue : "+$scope.test[j]);
           j++;
            // localStorage.setItem("itemListp"+i,$scope.product[i].productPrice);
        }
        
       
        localStorage.setItem("productLength",z);
        
      
        
        $state.go("invoice");
        
    }

});




imageApp.controller("RegistrationController", function($scope,$http, $state, $httpParamSerializerJQLike) {

    
    
    
    $scope.createUser = function() {
               console.log("inside login function");
        //var name = document.getElementById("username").value;
       // alert("signup");
        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;
        var mobile = document.getElementById("mobile").value;
        var email = document.getElementById("email").value;
        var address1 = document.getElementById("address1").value;
        var address2 = document.getElementById("address2").value;
        var city = document.getElementById("city").value;
        var country = document.getElementById("country").value;
        var pass = document.getElementById("pass").value;
        var repass = document.getElementById("repass").value;
        //alert("mobile : "+mobile);
        if(firstname==""){
            $scope.errormsg = "Please enter Firtsname";
        }else if(mobile == ""){
            $scope.errormsg = "Please enter Mobile number";
        }else if(email == ""){
            $scope.errormsg = "Please enter Email Addess";
        }else if(pass == ""){
            $scope.errormsg = "Please enter password";
        }else if(pass != repass){
            $scope.errormsg = "Passwords doesnot match";
        }else{
            
            $http({
            type: "GET",
            url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/users?q={mobile:\''+mobile+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
           
            contentType: "application/json"
        })
        .success(function(data){
           
            if(data==""){
               // alert("null");
                
                $http({
                    method: 'POST',
                    url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/users?apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
                    data: JSON.stringify({
                                //name: name,
                                firstname: firstname,
                                lastname: lastname,
                                email: email,
                                mobile: mobile,
                                address1:address1,
                                address2:address2,
                                city:city,
                                country:country,
                                password:pass
                            }),
                    contentType: "application/json"
                }).success(function() {
                    //alert("sucess");
                    $scope.userName ="";
                    $scope.password ="";
                    $scope.email ="";

                    var msg ="User created successfully";
                    localStorage.setItem("registerSuc",msg);
                    $state.go("login");
                        })
                
                       
                $state.go("login");
            }else{
                
                $scope.errormsg = "Mobile number already exists";
                
                    $state.go("register");
            
            }
            

            })
            
        }
        
        
        
        //alert("name : "+name);
        
}
   
$scope.back = function() { 
     $state.go("login");
     }
});



imageApp.controller("ProfileController", function($scope,$http, $state, $httpParamSerializerJQLike) {
  
    
    
  var name = localStorage.getItem("name");
        $scope.name = name;
    var lname = localStorage.getItem("lname");
        $scope.lname = lname;
   var email = localStorage.getItem("email");
        $scope.email = email; 
    var mobile = localStorage.getItem("mobile");
        $scope.mobile = mobile;
    var address1 = localStorage.getItem("address1");
        $scope.address1 = address1;
    var address2 = localStorage.getItem("address2");
        $scope.address2 = address2;
   var city = localStorage.getItem("city");
        $scope.city = city; 
    var country = localStorage.getItem("country");
        $scope.country = country;
    var password = localStorage.getItem("password");
        $scope.password = password; 
     $scope.back = function() { 
     $state.go("home");
     }
    
    $scope.savechanges = function() {  
        
        
        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;
        var mobile = document.getElementById("mobile").value;
        var email = document.getElementById("email").value;
        var address1 = document.getElementById("address1").value;
        var address2 = document.getElementById("address2").value;
        var city = document.getElementById("city").value;
        var country = document.getElementById("country").value;
        var pass = document.getElementById("pass").value;
        
        
        
        $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/aselab7/collections/users?q={mobile:\''+mobile+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
        contentType:"application/json"
        
    }).success(function(data){
    // alert(data[0]._id.$oid);
      
         
          $http({
              method: 'PUT' ,   
        url: 'https://api.mongolab.com/api/1/databases/aselab7/collections/users/'+data[0]._id.$oid+'?apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
		 data: JSON.stringify( { "$set" : { "firstname" : firstname,"lastname" : lastname,"email" : email,"mobile" : mobile,"city" : city,"country" : country,"password" : pass,"address1":address1,"address2":address2 } } ),
		 
		  contentType: "application/json"
             }).success(function (data) { 
             //alert("success");
              $scope.changemsg = "User details are changed successfully";
             })
                
            
                 
    })
    }

});


imageApp.controller("ChangePassController", function($scope,$http, $state, $httpParamSerializerJQLike) {

    var name = localStorage.getItem("name");
         $scope.name = "Welcome "+name;
   
   $scope.updateUser = function(pw) {
           
 var name = localStorage.getItem("name");
       $scope.name= "Welcome "+name;
       //alert("name : "+name);
             $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/aselab7/collections/users?q={name:\''+name+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
        contentType:"application/json"
        
    }).success(function(data){
    // alert(data[0]._id.$oid);
      if (name == data[0].name ) {
         
          $http({
              method: 'PUT' ,   
        url: 'https://api.mongolab.com/api/1/databases/aselab7/collections/users/'+data[0]._id.$oid+'?apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
		 data: JSON.stringify( { "$set" : { "password" : pw } } ),
		 
		  contentType: "application/json"
             }).success(function (data) { 
            // alert("success");
              $scope.passmsg = "Password is changed successfully";
             })
                
            } 
                 
    })
    
    };

});


imageApp.controller("InvoiceController", function($scope, $http, $state, $cordovaBarcodeScanner) {
    
    
$scope.product = [];
    $scope.productDB = [];
    var tax =0;
    var total=0;
    
     
    var productLen = localStorage.getItem("productLength");
        
          //alert("productLen : "+productLen);
    
    for(var i=0;i<productLen;i++){
           
        var prodTemp = localStorage.getItem("itemList"+i);
        //alert("value of "+i+" : "+prodTemp);
        
        if(prodTemp !=""){
            $scope.productDB.push(prodTemp);
       
        var prodTemp1 = prodTemp.split("|");
        total = total+parseFloat(prodTemp1[1]);
      
        $scope.product.push({productName:prodTemp1[0],productPrice:prodTemp1[1],index:i})
        }
        
        
        
        //localStorage.setItem("itemList"+i,"");
        }
    //alert("product len : "+$scope.product.length);
    $scope.productLen = $scope.product.length;
    
    $scope.total = Math.round(total * 100) / 100;
    $scope.tax = Math.round((($scope.total * 5)/100) * 100) / 100;
    $scope.amount  =  Math.round(($scope.total +  $scope.tax)*100) / 100;;  
   
    $scope.deleteItem = function(index) {
        ////alert("index : "+index);
        //alert("before delet : "+localStorage.getItem("itemList"+index));
        localStorage.setItem("itemList"+index,"");
        //alert("after delet : "+localStorage.getItem("itemList"+index));
        
        location.reload();
        //$state.go("invoice");
        
    }
    
    $scope.addItem = function() {
       // $state.go("itemscan");
        
        
        $cordovaBarcodeScanner.scan().then(function(barcodeData) {
            
        // Success! Barcode data is here
            //alert("text : "+barcodeData.text);
            //alert("format : "+barcodeData.format);
            text = barcodeData.text;
            format = barcodeData.format;
            $scope.barcode = text;
            $scope.format = format;
            $scope.msg = "Barcode is "+text+" with format "+format
            
            
            //walmart
            var url = 'http://api.walmartlabs.com/v1/items?apiKey=avwybe6h7zkrmwvr3mqbs3r3&upc='+text+'&format=json';
    
                //alert("url : "+url);
            $http.get(url).success(function(data){


              // alert("out");
              console.log(data);

                  name = data.items[0].name;
               price = data.items[0].salePrice;

               /* alert("name : "+name);
                alert("price : "+price);*/
                
            //$scope.end_place = name;
            //$scope.price = price;
            //$scope.productdetails = "Product : "+name+" : Price : "+price;    
            
            //$scope.productName.push(name); 
           // $scope.productPrice.push(price);
           // $scope.product.push({productName:name,productPrice:price});
           // $scope.product.push(name+"|"+price);
           // $scope.product.push(price);    
                
                
           // $scope.scans.push( "Product : "+name+" : Price : "+price); 
                var preProdLen = $scope.productLen;
                 $scope.productLen = parseInt($scope.productLen)+1;
                var productItem = name+"|"+price;
                localStorage.setItem("itemList"+preProdLen,productItem);
               // alert("loc sto : "+localStorage.getItem("itemList"+$scope.productLen));
                localStorage.setItem("productLength",$scope.productLen);
            $scope.product.push({productName:name,productPrice:price,index:$scope.productLen})
            
      var total = parseFloat($scope.total)+parseFloat(price);     
    
    $scope.total = Math.round(total * 100) / 100;
    $scope.tax = Math.round((($scope.total * 5)/100)*100)/100;
    $scope.amount  =  Math.round(($scope.total +  $scope.tax)*100) / 100;
                
                 location.reload();
            
            });
            
            
            //alert(); 
            
            /*$scope.barcodes.push( "Barcode is "+text+" with format "+format);*/
      },function(error) {
       alert("an error occured");
      });
        
        
     
    }
    
    
    $scope.confirm = function() {
       // alert($scope.tax);
        
        var productLen = localStorage.getItem("productLength");
        
          //alert("productLen : "+productLen);
    
    for(var i=0;i<productLen;i++){
        //alert("item before: "+localStorage.getItem("itemList"+i));
            localStorage.setItem("itemList"+i,"");
        //alert("item after: "+localStorage.getItem("itemList"+i));
        }
        
        var prodList = $scope.productDB;
        
        var mobile = localStorage.getItem("mobile");
        
        var date = new Date();
     var mon = date.getMonth();
     var mon1 = parseInt(mon)+1;
     //alert("date : "+date);
     //alert("actual date : "+mon1+"/"+date.getDate()+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
     var actualDate = mon1+"/"+date.getDate()+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();    
        
        
        
        $http({
                    method: 'POST',
                    url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/products?apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
                    data: JSON.stringify({
                                //name: name,
                         mobile: mobile,
                       
                        products:prodList,
                        date:actualDate
                            
                        
                                
                            }),
                    contentType: "application/json"
                }).success(function() {
                    
                $http({
                    type: "GET",
                    url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/recommendation?q={mobile:\''+mobile+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',

                    contentType: "application/json"
                })
                .success(function(data){

                   var preRecords = data[0].products;
                    for(var i=0;i<prodList.length;i++){
                        preRecords.push(prodList[i]);
                    }
                 
                 

                  $http({
                      method: 'PUT' ,   
                        url: 'https://api.mongolab.com/api/1/databases/aselab7/collections/recommendation/'+data[0]._id.$oid+'?apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
                         data: JSON.stringify( { "$set" : { "products" : preRecords } } ),

                          contentType: "application/json"
                             }).success(function (data) { 
                            $state.go("home");
                     location.reload();
                             })
      
            })
    
        })
        

   
     }
    
    
    
    

    
});

imageApp.controller("MyBillsController", function($scope, $http, $state) {

   $scope.user = "Welcome : "+localStorage.getItem("name");
    
    var dates = localStorage.getItem("dates");
    
    $scope.dates = [];
    var actualDates = dates.split(",");
    //alert("date len : "+actualDates.length);
    
    for(var i=0;i<actualDates.length;i++){
        $scope.dates.push(actualDates[i]);
    }
    
    
    $scope.thisBill = function(date) {
        //alert("this bill : "+date);
        localStorage.setItem("invoiceDate",date);
        $state.go("preInvoice");
    }
    

    
});




imageApp.controller("PreInvoiceController", function($scope, $http) {

   var date = localStorage.getItem("invoiceDate");
    var mobile = localStorage.getItem("mobile");
    $scope.products = [];
    var total = 0;
    
    
 $http({
            type: "GET",
            url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/products?q={mobile:\''+mobile+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
           
            contentType: "application/json"
        })
        .success(function(data){
           
            if(data==""){
                //alert("null");
                $state.go("myBills");
                  //$scope.errormsg = "Bills found"       
                      
            }else{
               
               
                
                //alert("data length : "+data.length);
              
                for(var i=0;i<data.length;i++){
                  if(date == data[i].date){
                      //alert("prod len : "+data[i].products.length)
                      
                      for(var j=0;j<data[i].products.length;j++){
                          
                            
                            var prodTemp1 = data[i].products[j].split("|");
                            total = total+parseFloat(prodTemp1[1]);
                            
                            $scope.products.push({productName:prodTemp1[0],productPrice:prodTemp1[1]})
                          
                           
                            }
                        $scope.total = Math.round(total * 100) / 100;
                        $scope.tax = ($scope.total * 5)/100;
                        $scope.amount  =  Math.round(($scope.total +  $scope.tax)*100) / 100;; 
                  }
                    
                    
                }
                
               
                  
            }
     })
    
});


imageApp.controller("RecommendController", function($scope, $http) {

    var mobile = localStorage.getItem("mobile");
      $http({
                    type: "GET",
                    url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/recommendation?q={mobile:\''+mobile+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',

                    contentType: "application/json"
                })
                .success(function(data){

                   var preRecords = data[0].products;
          var recordsCounter = [];
          $scope.records = [];
                   /* for(var i=0;i<data[0].products.length;i++){
                        var pro = data[0].products[i];
                        }*/
                      
                                         
                         var a = [], b = [], prev;
    
                        preRecords.sort();
                        for ( var i = 0; i < preRecords.length; i++ ) {
                            if ( preRecords[i] !== prev ) {
                                a.push(preRecords[i]);
                                b.push(1);
                            } else {
                                b[b.length-1]++;
                            }
                            prev = preRecords[i];
                        }
                        
            //alert(a);
          //alert(b);
          
                        for ( var i = 0; i < b.length; i++ ) {
                            recordsCounter.push(b[i]+"/"+a[i]);
                             $scope.records.push({productName:a[i],productQuantity:b[i]})
                        }
                        //preRecords.push(prodList[i]);
                    
                 
                // alert($scope.records);

                  
      
            })
    
});


