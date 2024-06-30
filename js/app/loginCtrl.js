window.loginCtrl = function ($scope, $rootScope) {

    $scope.login = function () {
        var valid = false;
        // $rootScope.students: lấy từ main, lấy dữ liệu từ db
        $rootScope.students.forEach(item => {
            if (item.username == $scope.username) { // $scope.username: 
                if (item.password == $scope.password) {
                    valid = true;
                    // Lưu thông tin người dùng vào local storage
                    localStorage.setItem("currentUser", JSON.stringify(item)) // chuyển về dạng json

                    // gán lại vào currentUser
                    $rootScope.currentUser = item;
                    return;
                }
            }
        });

        let timerInterval;
        if (valid == true) {
            Swal.fire({
                icon: 'success',
                title: "Đăng nhập thành công!",
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
            window.location.href = "#/";
        } else {
            Swal.fire({
                icon: 'error',
                title: "Đăng nhập thất bại!",
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
            }).then(() => {
                // Chuyển hướng sau khi Swal đã đóng
                // window.location.href = "#/login";
            });
        }
    }

    $scope.showPass = true;
    $scope.togglePass = function () {
        $scope.showPass = !$scope.showPass;
    }
}