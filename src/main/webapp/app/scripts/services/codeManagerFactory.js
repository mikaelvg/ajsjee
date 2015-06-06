'use strict';
angular.module('ajsjeeApp')
        .factory('codeManagerFactory', [function() {

                var codeManagerFactory = {};

                codeManagerFactory.getMessage = function(returnCode) {


                    var returnString = returnCode.toString();
                    var statusID = returnString.substring(0, 1);
                    var classID = returnString.substring(1, 3);
                    var processID = returnString.substring(3, 5);
                    var uniqueID = returnString.substring(1, 5);
                    var statusMessage;
                    var className;
                    var eventMessage;
                    var promptMessage;

                    console.log('---------- Code Manager ----------');
                    console.log("statusID =" + statusID);
                    console.log("classID =" + classID);
                    console.log("processID =" + processID);
                    console.log('---------- Code Manager ----------');

                    // Specific error messeges/
                    if (returnCode === 0) {
                        promptMessage = "System error";
                        return promptMessage;
                    }

                    // Specific error messeges/
                    if (returnCode === 2000) {
                        promptMessage = "login failed";
                        return promptMessage;
                    }

                    if (statusID == "5") {
                        switch (uniqueID) {
                            case "0101":
                                statusMessage = "Account email ";
                                break;
                            case "0201":
                                statusMessage = "You are not allowed to create another company!";
                                return promptMessage;
                                break;
                            case "0301":
                                statusMessage = "URL ID ";
                                break;
                            case "0302":
                                statusMessage = "Mobile number ";
                                break;
                            case "0303":
                                statusMessage = "Landline number ";
                                break;
                            case "0304":
                                statusMessage = "Business email ";
                                break;
                            case "0401":
                                statusMessage = "Login account !";
                                break;
                            default:
                                statusMessage = "Uncategorized ";
                        }
                        eventMessage = "already used!";
                        promptMessage = statusMessage + eventMessage;
                        return promptMessage;
                    }

                    // Status
                    switch (statusID) {
                        case "1":
                            statusMessage = "Success in ";
                            break;
                        case "2":
                            statusMessage = "Fail in ";
                            break;
                        case "3":
                            statusMessage = "Generic Error: ";
                            break;
                        default:
                            statusMessage = "Uncategorized in ";
                    }

                    // Status
                    switch (processID) {
                        case "01":
                            eventMessage = "creating ";
                            break;
                        case "02":
                            eventMessage = "updating ";
                            break;
                        case "03":
                            eventMessage = "retrieving ";
                            break;
                        case "04":
                            eventMessage = "deleting ";
                            break;
                        case "05":
                            eventMessage = "using search criteria. It does not exist ";
                            break;
                        case "06":
                            eventMessage = "User validation ";
                            promptMessage = statusMessage + eventMessage;
                            return promptMessage;
                            break;
                        case "07":
                            eventMessage = "Disabled user ";
                            promptMessage = statusMessage + eventMessage;
                            return promptMessage;
                            break;
                        case "08":
                            eventMessage = "Blocked user ";
                            promptMessage = statusMessage + eventMessage;
                            return promptMessage;
                            break;
                        case "09":
                            eventMessage = "Unknow System Error ";
                            promptMessage = statusMessage + eventMessage;
                            return promptMessage;
                            break;
                        case "10":
                            eventMessage = "Invalid Parameter ";
                            promptMessage = statusMessage + eventMessage;
                            return promptMessage;
                            break;
                        case "11":
                            eventMessage = "Contraints and database related error ";
                            promptMessage = statusMessage + eventMessage;
                            return promptMessage;
                            break;
                        default:
                            eventMessage = "Uncategorized ";
                    }


                    // Classes
                    switch (classID) {
                        case "01":
                            className = "user details"; // Appuser
                            break;
                        case "02":
                            className = "contact details"; // Profile details
                            break;
                        case "03":
                            className = "agent";
                            break;
                        case "04":
                            className = "badge credential";
                            break;
                        case "05":
                            className = "company";
                            break;
                        case "06":
                            className = "constant";
                            break;
                        case "07":
                            className = "credential";
                            break;
                        case "08":
                            className = "employee";
                            break;
                        case "09":
                            className = "favorite";
                            break;
                        case "10":
                            className = "feedback";
                            break;
                        case "11":
                            className = "job opening";
                            break;
                        case "12":
                            className = "login account"; // oauth
                            break;
                        case "13":
                            className = "payment";
                            break;
                        case "14":
                            className = "program";
                            break;
                        case "15":
                            className = "rating";
                            break;
                        case "16":
                            className = "referral";
                            break;
                        case "17":
                            className = "service";
                            break;
                        case "18":
                            className = "asset"; // service tool
                            break;
                        case "19":
                            className = "trainer";
                            break;
                        case "20":
                            className = "training module";
                            break;
                        case "21":
                            className = "training schedule";
                            break;
                        case "22":
                            className = "workrequest(Patrabaho)";
                            break;
                        case "23":
                            className = "agent package"; // map_agent_cfgagentpackage
                            break;
                        case "24":
                            className = "user's agent"; // map_appuser_agent
                            break;
                        case "25":
                            className = "user's training module"; // map_appuser_trainingmodule
                            break;
                        case "26":
                            className = "service list"; // map_cfgservice_cfgcategory
                            break;
                        case "27":
                            className = "company package"; // map_company_cfgcompanypackage
                            break;
                        case "28":
                            className = "job post package"; //  map_service_cfgjobpostpackage
                            break;
                        case "29":
                            className = "service package list"; // map_service_cfgservicepackage
                            break;
                        case "30":
                            className = "map_workrequest_cfgservice";
                            break;
                        case "31":
                            className = "work request list"; // map_workrequest_cfgworkrequest
                            break;

                        case "35":
                            className = "agent package list"; // cfg_agentpackage
                            break;
                        case "36":
                            className = "badge credential list"; // cfg_badge_credential
                            break;
                        case "37":
                            className = "barangay list"; // cfg_barangay
                            break;
                        case "38":
                            className = "category list"; // cfg_category
                            break;
                        case "39":
                            className = "city/town list"; // cfg_citytown
                            break;
                        case "40":
                            className = "company package list"; // cfg_companypackage
                            break;
                        case "41":
                            className = "credential list"; // cfg_credential
                            break;
                        case "42":
                            className = "job post package list"; // cfg_jobpostpackage
                            break;
                        case "43":
                            className = "service list"; // cfg_service
                            break;
                        case "44":
                            className = "service package list"; // cfg_servicepackage
                            break;
                        case "45":
                            className = "state/province list"; // cfg_stateprovince
                            break;
                        case "46":
                            className = "work request list"; // cfg_workrequest
                            break;

                        case "51":
                            className = "agent list"; // vagent
                            break;
                        case "52":
                            className = "company list"; // vcompany
                            break;
                        case "53":
                            className = "job opening list"; // vjobpost
                            break;
                        case "54":
                            className = "name list"; // vname
                            break;
                        case "55":
                            className = "service list"; // vservice
                            break;
                        case "56":
                            className = "service tool list"; // vservice_tool
                            break;
                        case "57":
                            className = "training list"; // vtraining
                            break;
                        case "58":
                            className = "work request list"; // vworkrequest
                            break;

                        case "61":
                            className = "account";
                            break;
                        case "62":
                            className = "agent"; // agent_display
                        case "63":
                            className = "company"; // company_display
                            break;
                        case "64":
                            className = "program";
                            break;
                        case "65":
                            className = "token";
                            break;

                        case "71":
                            className = "published jobpost";
                            break;

                        case "81":
                            className = "published service";
                            break;

                        case "91":
                            className = "published service tool list";
                            break;
                        default:
                            className = "Uncategorized";
                    }

                    promptMessage = statusMessage + eventMessage + className;

                    return promptMessage;

                };


                codeManagerFactory.isSuccess = function(returnCode) {

                    var returnString = returnCode.toString();
                    var statusID = returnString.substring(0, 1);
                    var isSucess = true;

                    switch (statusID) {
                        case "1":
                            isSucess = true;
                            console.log("Success: Success Code = " + returnCode);
                            break;
                        case "2":
                            isSucess = false;
                            console.log("ERROR: Error Code = " + returnCode);
                            break;
                        case "3":
                            isSucess = false;
                            console.log("GENERIC ERROR: Error Code = " + returnCode);
                            break;
                        case "5":
                            isSucess = false;
                            console.log("VIOLATES UNIQUE CONSTRAINT: Error Code = " + returnCode);
                            break;
                        default:
                            isSucess = true;
                    }

                    return isSucess;

                };

                return codeManagerFactory;
            }]);

