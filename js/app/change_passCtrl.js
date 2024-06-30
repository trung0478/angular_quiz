window.change_passCtrl = function ($scope, $rootScope, $http, $routeParams) {
    // $scope.displayError = false;
    // $scope.checkRePass = function () {
    //     if ($scope.pass != $scope.repass) {
    //         $scope.displayError = true;
    //     } else {
    //         $scope.displayError = false;
    //     }
    // }
    var urlAPI = "http://localhost:3000/Students";

    $scope.changePass = function () {
        if ($rootScope.currentUser != null) {
            if ($rootScope.currentUser.password == $scope.pass) { //pass cũ
                var newPass = $scope.password; // pass mới
                var updatedStudent = angular.copy($rootScope.currentUser);
                updatedStudent.password = newPass; // gán lại pass mới
                // update
                $http.put(`${urlAPI}/${$rootScope.currentUser.id}`, updatedStudent).then(response => {
                    let timerInterval;
                    Swal.fire({
                        icon: 'success',
                        title: "Đổi mật khẩu thành công!",
                        html: " Cửa sổ sẽ đóng sau <b></b> ms.",
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading();
                            const timer = Swal.getPopup().querySelector("b");
                            timerInterval = setInterval(() => {
                                timer.textContent = `${Swal.getTimerLeft()}`;
                            }, 100);
                        },
                        willClose: () => {
                            clearInterval(timerInterval);
                        }
                    })
                }, function (error) {
                    console.log(error);
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "Sai mật khẩu cũ!",
                    html: " Cửa sổ sẽ đóng sau <b></b> ms.",
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {
                            timer.textContent = `${Swal.getTimerLeft()}`;
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                })
            }
        }
    };
}