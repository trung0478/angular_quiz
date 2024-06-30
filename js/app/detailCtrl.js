window.detailCtrl = function ($scope, $routeParams,$http, $rootScope) {
    // dùng trong hiển thị thông tin quiz
    $rootScope.subjects.forEach(item => {
        if (item.Id == $routeParams.id) {
            $scope.subject = angular.copy(item);
            return;
        }
    });

    // dùng trong lấy ra số câu hỏi của quiz
    $http.get("db/Quizs/" + $routeParams.id + ".js").then(response => {
        $scope.questions = response.data;
    })

    // bấm nút kiểm tra
    $scope.test = function () {
        if ($rootScope.currentUser == null) {
            Swal.fire({
                title: 'Bắt đầu kiểm tra !',
                text: "Bạn chưa đăng nhập.",
                icon: 'error',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                confirmButtonColor: '#3085d6',
                cancelButtonText: 'Thoát',
                confirmButtonText: 'Đăng nhập ngay!!'
            }).then(result => { // sử dụng then và bên trong then có func có chứa tham số hứng kết quả khi người dùng lụa chọn (result.value)
                if (result.value) {  // nếu chọn là ok 
                    window.location.href = "#/login"
                }
            })
        } else {
            Swal.fire({
                title: 'Bắt đầu kiểm tra !',
                text: "Bạn đã sẳn sàng chưa ???",
                icon: 'question',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                confirmButtonColor: '#3085d6',
                cancelButtonText: 'Chưa',
                confirmButtonText: 'Bắt đầu kiểm tra'
            }).then(result => { // sử dụng then và bên trong then có func có chứa tham số hứng kết quả khi người dùng lụa chọn (result.value)
                if (result.value) {  // nếu chọn là ok 
                    window.location.href = "#/test_quiz/" + $scope.subject.Id
                }
            })
        }
    }
}


