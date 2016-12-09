'use strict';

/**
 * @ngdoc function
 * @name crystalcoachApp.controller:CharacterCtrl
 * @description
 * # CharacterCtrl
 * Controller of the crystalcoachApp
 */
angular.module('crystalcoachApp')
    .controller('CharacterCtrl', ["auth", "$scope", "$location", function(auth, $scope, $location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.logout = function() {
            auth.$signOut();
            console.log('logged out');
            $location.path('/login');
            $scope.authData = null;
        };

        // 0 => BMR
        // 1 => No exercise (desk job/sedentary)
        // 2 => 3 times/week
        // 3 => 4 times/week
        // 4 => 5 times/week
        // 5 => 6 times/week
        // 6 => 5 times/week (*intense)
        // 7 => Every day
        // 8 => Every day (*intense) or twice daily
        // 9 => Daily exercise + physical job

        $scope.characterStats = function(characterGender, age, foot, inch, pounds, days, goal) {
            
            var data = {
                'gender': $scope.gender, // Required if using Mifflin-St Jeor
                'age': parseInt($scope.age), // Required if using Mifflin-St Jeor
                'isMetric': false, // Provide metric inputs? (cm, kg)
                'ft': parseInt($scope.foot), // Required if using Mifflin-St Jeor and isMetric == false
                'in': parseInt($scope.inch), // Required if using Mifflin-St Jeor and isMetric == false
                'cm': null, // Required if using Mifflin-St Jeor and isMetric == true
                'lbs': parseInt($scope.pounds), // Required if isMetric == false
                'kg': null, // Required if isMetric == true
                'mifflinStJeor': true, // True for lean individuals, false for overweight
                'bodyFatPercentage': null, // Required if not using Mifflin-St Jeor
                'exerciseLevel': parseInt($scope.days) - 1, // See exerciseLevelActivityMultiplier()
                'goal': 1.00 + parseFloat($scope.goal), // TDEE Modifier. Recommended: Maintain(1.0), Cut(0.85 or 0.8), Bulk(1.05 or 1.1)
                'protein': 0.7, // Protein grams per lb of body weight. Recommend: 0.7, 0.8, or 0.9
                'fat': 0.35 // Fat grams per lb of body weight. Recommend: 0.3, 0.35, or 0.4
            };
            console.log(data)
            console.log(iifym.calculate(data));
            var calories;
            calories = ((iifym.calculate(data).protein * 4) + (iifym.calculate(data).carbs * 4) + (iifym.calculate(data).fat * 9))
            console.log("Your Calorie Count: " + calories);
            $scope.userData = data;
            $scope.userData.everything = iifym.calculate(data);
            $scope.userData.calories = calories;

        }

    }]);
