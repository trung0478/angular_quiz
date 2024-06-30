var app = angular.module("app", ['ngRoute']);

app.run(function ($rootScope, $http, $location) {
    $http.get("db/Subjects.js").then(function (response) {
        $rootScope.subjects = response.data;
    });

    $http.get("http://localhost:3000/Students").then(function (response) {
        $rootScope.students = response.data;
    });

    // Lấy dữ liệu từ localStorage => trách load lại trang mất dữ liệu
    var currentUserJSON = localStorage.getItem("currentUser");
    if (currentUserJSON) {
        $rootScope.currentUser = JSON.parse(currentUserJSON); // chuyển dữ liệu về js
    } 

    $rootScope.logOut = function () {
        // xoá dữ liệu
        localStorage.removeItem("currentUser");
        $rootScope.currentUser = null;

        Swal.fire({
            icon: 'error',
            title: "Bạn đã đăng xuất tài khoản!",
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
                $location.path("#/");
            }
        })
        $location.path("#/");
    }

    $rootScope.InfoPerson=function(id){
        $location.path(`info_personal/${id}`)
    }
});

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", { templateUrl: "html/home.html", controller: homeCtrl })
        .when("/catalog", { templateUrl: "html/catalog.html", controller: catalogCtrl })
        .when("/introduce", { templateUrl: "html/introduce.html" })
        .when("/contact", { templateUrl: "html/contact.html" })
        .when("/q&a_feedback", { templateUrl: "html/q&a_feedback.html" })
        .when("/info_personal/:id", { templateUrl: "html/info_personal.html", controller: info_personalCtrl })
        .when("/change_pass", { templateUrl: "html/change_pass.html", controller: change_passCtrl })
        .when("/login", { templateUrl: "html/login.html", controller: loginCtrl })
        .when("/register", { templateUrl: "html/register.html", controller: registerCtrl })
        .when("/forget_pass", { templateUrl: "html/forget_pass.html", controller: forget_passCtrl })
        .when("/detail/:id", { templateUrl: "html/detail.html", controller: detailCtrl })
        .when("/test_quiz/:id", { templateUrl: "html/test_quiz.html", controller: test_quizCtrl })
        .otherwise({ redirectTo: "/" });
});


