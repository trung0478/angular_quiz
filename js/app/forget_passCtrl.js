window.forget_passCtrl = function ($rootScope, $scope) {
    $scope.getPass = function () {
        var isValid = false;
        var pass;
        $rootScope.students.forEach(item => {
            if (item.username == $scope.username && item.email == $scope.email) {
                pass = item.password;
                isValid = true;
                return;
            }
        })

        if (isValid) {
            Swal.fire({
                title: 'Lấy lại mật khẩu thành công !',
                text: `Mật khẩu của bạn là: ${pass}`,
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
            })
        } else {
            Swal.fire({
                title: 'Sai tên đăng nhâp hoặc email',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
            })
        }
    }
}