'use strict';

angular.module('ajsjeeApp')
        .factory('sharedDataFactory', [function() {

                var sharedDataFactory = {
                    months: [
                        {id: 1, description: 'January'},
                        {id: 2, description: 'February'},
                        {id: 3, description: 'March'},
                        {id: 4, description: 'April'},
                        {id: 5, description: 'May'},
                        {id: 6, description: 'June'},
                        {id: 7, description: 'July'},
                        {id: 8, description: 'August'},
                        {id: 9, description: 'September'},
                        {id: 10, description: 'October'},
                        {id: 11, description: 'November'},
                        {id: 12, description: 'December'}],
                    priceUnit: [
                        {id: 1, description: 'per hour'},
                        {id: 2, description: 'per session'},
                        {id: 3, description: 'per day'},
                        {id: 4, description: 'per week'},
                        {id: 5, description: 'per month'},
                        {id: 6, description: 'per year'},
                        {id: 7, description: 'per package'},
                        {id: 8, description: 'per person'}],
                    serviceType: [
                        {id: 2, description: 'package deal'},
                        {id: 3, description: 'rent only'}],
                    privacylevel: [
                        {id: 1, description: 'Complete address is viewable'},
                        {id: 2, description: 'Unit, building is not viewable'},
                        {id: 3, description: 'Street, Subdivision is not viewable'},
                        {id: 4, description: 'Barangay is not viewable'}],
                    employeeStatus: [
                        {id: 1, description: 'For Hire'},
                        {id: 2, description: 'Deployed'}],
                    companyTypes: [
                        {id: 1, description: 'Single Proprietorship'},
                        {id: 2, description: 'Partnership'},
                        {id: 3, description: 'Corporation'}],
                    agentTab: '',
                    cfgServiceId: '',
                    feedbackTab: '',
                    firstName: '',
                    fromUrl: '',
                    jobpostTab: '',
                    loginId: '',
                    accountId: '',
                    agentId: '',
                    companyId: '',
                    lstCfgCategory: '',
                    lstCfgCitytown: '',
                    notRegistered: '',
                    oAuthProvider: '',
                    profileId: '',
                    popupWasBlocked: '',
                    postad: '',
                    serviceTab: '',
                    employeeId: '',
                    companyTab: '',
                    currentServerDate: '',
                    lstMapCfgserviceCfgcategory: '',
                    lstCfgBarangay: '',
                    lstCfgStateprovince: '',
                    picture: ''
                };

                return sharedDataFactory;
            }]);