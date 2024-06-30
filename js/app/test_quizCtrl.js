window.test_quizCtrl = function ($rootScope, $scope, $routeParams, $http, $location, $window, $interval) {
    $rootScope.subjects.forEach(item => {
        if (item.Id = $routeParams.id) {
            $scope.subject = angular.copy(item);
            return;
        }
    })

    // lấy dữ liệu của questions và answer
    $http.get("db/Quizs/" + $routeParams.id + ".js").then(response => {
        $scope.questions = response.data;
    })

    // 
    $scope.myAns = [];
    // 
    $scope.mark = 0;
    //
    $scope.time = 900;

    // tạo index câu hỏi => chuyển câu
    $scope.indexQuestion = 0;
    $scope.move = function (x) {
        $scope.indexQuestion = x;
    }

    $scope.submitAns = function () {
        if ($scope.questions[$scope.indexQuestion].AnswerId == $scope.myAns[$scope.indexQuestion].ans) {
            Swal.fire({
                icon: 'success',
                title: 'Chúc mừng bạn đã chọn đúng!',
                text: 'Bạn đã được cộng ' + $scope.questions[$scope.indexQuestion].Marks + ' điểm',
                showConfirmButton: false,
                timer: 1200
            });
            $scope.mark += $scope.questions[$scope.indexQuestion].Marks
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Rất tiếc. Bạn đã chọn sai !',
                showConfirmButton: false,
                timer: 1200
            });
        }
    }

    $scope.finish = function () {
        Swal.fire({
            title: 'Bạn có chắc không?',
            text: "Bạn thật sự muốn kết thúc bài thi!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then(result => {
            if (result.value) {
                Swal.fire({
                    title: 'Kết thúc bài kiểm tra',
                    text: `Điểm của bạn là: ${$scope.mark}/${$scope.questions.length}`,
                    icon: 'warning',
                    confirmButtonColor: '#d33',
                    cancelButtonText: 'OK'
                }).then(result => {
                    if (result.value) {
                        $window.location.href = 'http://127.0.0.1:5500/layout.html#/';
                    }
                })
            }
        })
    }

    var countdown=$interval(function(){
        if ($scope.time>0) {
            $scope.time-=1;
        }else if($scope.time==0){
            // console.log("het gio");
            $interval.cancel(countdown)
            Swal.fire({
                title: 'Hết thời gian làm bài kiểm tra !',
                text: `Điểm của bạn là: ${$scope.mark}/${$scope.questions.length}`,
                icon: 'info',
                confirmButtonColor: '#d33',
                cancelButtonText: 'OK'
            }).then(result => {
                if (result.value) {
                    $window.location.href = 'http://127.0.0.1:5500/layout.html#/';
                }
            })
        }
    },1000)

}