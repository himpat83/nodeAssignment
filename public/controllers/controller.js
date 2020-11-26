var app = angular.module('myApp', []);
app.controller('CAppCtrl', function($scope, $http) {

    var refresh = function() {

        $http.get("/contactlist")
            .then(function(response) {
                console.log("i got data" + JSON.stringify(response));
                $scope.contactlist = response.data;
                $scope.contact.name = "";
                $scope.contact.email = "";
                $scope.contact.number = "";

            });

    }
    $scope.addContact = function() {
        console.log($scope.contact);
        if ($scope.contact.name != '' && $scope.contact.email != "" && $scope.contact.number != "") {
            $http.post('/contactlist', $scope.contact).then(function(response) {
                console.log(response);
                refresh();


            });
        }
    }

    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/contactlist/' + id).then(function(response) {
            console.log(response);
            refresh();

        });
    }
    $scope.edit = function(id) {
        console.log("update req =" + id);
        $http.get('/contactlist/' + id).then(function(response) {
            console.log("updated data =" + JSON.stringify(response));
            $scope.contact = response.data;
        });

    }
    $scope.update = function() {
        console.log($scope.contact._id);
        $http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function(response) {
            refresh();

        });

    }

    $scope.deselect = function() {

        $scope.contact.name = "";
        $scope.contact.email = "";
        $scope.contact.number = "";
    }

    refresh();


});