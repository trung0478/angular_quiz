window.info_personalCtrl = function ($rootScope, $scope, $http, $routeParams, $location) {
    var apiUrl = "http://localhost:3000/Students";
    var id = $routeParams.id;

    $http.get(`${apiUrl}/${id}`).then(response => {
        $scope.info = response.data;
    }, function (error) {
        console.log(error)
    })

    $scope.updateInfo = function () {
        var updateStudent = {
            ...$scope.info
        }
        $http.put(`${apiUrl}/${id}`, updateStudent).then(response => {
            // gán lại localStorage
            localStorage.setItem("currentUser",JSON.stringify(updateStudent)) // chuyển về dạng json
            // gán lại currentUser
            $rootScope.currentUser=updateStudent;
            Swal.fire({
                title: 'Thay đổi thành công !',
                icon: 'success',
            })
        }, function (error) {
            console.log(error)
        })
    }
}