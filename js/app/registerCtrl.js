window.registerCtrl = function ($scope, $http, $location) {
    var apiUrl = "http://localhost:3000/Students";

    $scope.register = function () {
        var valid = true;
        if (!$scope.inputValue || !$scope.inputValue.fullname) {
            console.log('1');
            valid = false;
        }
        if (!$scope.inputValue || !$scope.inputValue.username || $scope.inputValue.username.length<6) {
            console.log('2');
            valid = false;
        }
        if (!$scope.inputValue || !$scope.inputValue.email) {
            console.log('3');

            valid = false;
        }
        if (!$scope.inputValue || !$scope.inputValue.birthday) {
            console.log('4');
            valid = false;
        }
        if (!$scope.inputValue || !$scope.inputValue.gender) {
            valid = false;
        }
        if (!$scope.inputValue || !$scope.inputValue.password || $scope.inputValue.password.length<6) {
            console.log('5');

            valid = false;
        }
        if (!$scope.inputValue || !$scope.inputValue.schoolfee || $scope.inputValue.schoolfee <2000000 ) {
            console.log('6');
            valid = false;
        }

        if (valid) {
            var newStudent = {
                ...$scope.inputValue
            }

            $http.post(apiUrl, newStudent).then($response => {
                if ($response.status == 201) {
                    Swal.fire({
                        title: 'Đăng ký thành công !',
                        icon: 'success',
                    })
                    // $location.path('#/login');
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: "Dữ liệu không hợp lệ.",
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
}