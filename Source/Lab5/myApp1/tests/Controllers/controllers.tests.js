describe('Controllers', function () {
    /*var scope;
  beforeEach(module('starter.controllers'));

  //var $controller;
    

  beforeEach(inject(function($rootscope,$controller){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    
      scope = $rootscope.$new();
      $controller('DashCtrl', {$scope: scope});
  }));
    
    

  
    it('Tests barcode function of DashCtrl', function() {
      /*var $scope = {};
      var controller = $controller('DashCtrl', { $scope: $scope });*/
      /*var firstname = 'Sravani';
      var lastname = 'Punyamurthula';*/
     /* expect($scope.fullName(firstname, lastname)).toEqual('Punyamurthula Sravani');   // succeeds
      expect($scope.fullName('Tony' , 'Willams')).toEqual('Punyamurthula Sravani');    // fails
        
        expect(scope.st_place).toEqual('0045557350017');   // succeeds
      expect(scope.st_place).toEqual('0045557350018');    // fails
      
    
  });*/
    
    var scope;
	
	beforeEach(angular.mock.module('starter.controllers'));
	beforeEach(angular.mock.inject(function($rootScope, $controller,$http) {
		scope = $rootScope.$new();
        http = $http;
		$controller('DashCtrl', {$scope: scope,$http:http});
        
	}));

	/*it("Checks the task creation", function () {
		
        scope.getWeather();
        
      expect(scope.id).toEqual('2');    // fails
	});
    
    it("Checks the barcode", function () {
		
        scope.getWeather();
        
      expect(scope.id).toEqual('1');    // fails
	});*/
    
    it("Checks the product", function () {
		/*var size = scope.tasks.length;
		scope.createTask({ title: 'Hello' });
		expect(scope.tasks.length).toEqual(size+1);*/
        scope.getProducts();
        //expect(scope.id).toEqual('0045557350017');   // succeeds
        //expect(scope.st_place).toEqual('1');   // succeeds
     var itemID='12417832';
			
			expect(scope.productId(itemID)).toEqual('12417832');
	});
    
    it("Checks the barcode", function () {
		
        scope.getBarcodeDetails();
        
     var barcodeType='ean-13';
			
			expect(scope.getType(barcodeType)).toEqual('ean-13');
	});
    
    it("Checks the store", function () {
		
        scope.getStores();
        
     var name='Missouri';
			
			expect(scope.getState(name)).toEqual('Missouri');
	});
    

});