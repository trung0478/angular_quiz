window.catalogCtrl = function ($rootScope, $scope) {
    // phân trang: hiển thị 8 quiz trong 1 trang và có previous và next
    $scope.currentIndex = 0;
    $scope.prev = function () {
        if ($scope.currentIndex >= 8) {
            $scope.currentIndex -= 8;
        }
    };
    $scope.next = function () {
        if ($scope.currentIndex + 8 < $scope.subjects.length) {
            $scope.currentIndex += 8;
        }
    };
}