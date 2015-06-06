'use strict';
angular.module('ajsjeeApp')
    .factory('sessionService', [function() {

            var sessionData = {};
            var appuserId;
            var accountId;
            var oauthProvider;
            var firstName;
            var lastName;
            var birthday;
            var picture;
            var accountEmail;
            var gender;
            var membershipDate;
            var lastLogin;
            var accountStatus;
            var picture;
            var returnCode;
            var appuser = {};
            var profileId;
            var agentId;
            var accessToken;
            var network;
            
            var cfgServiceId;

            //----
            sessionData.setAppuserId = function(p_AppuserId) {
                appuserId = p_AppuserId;
            };
            
            sessionData.getAppuserId = function() {
                return appuserId;
            };
            
            //----
            sessionData.setAccountId = function(p_AccountId) {
                accountId = p_AccountId;
            };
  
            sessionData.getAccountId = function() {
                return accountId;
            };
            
            //----
            sessionData.setOauthProvider = function(p_OauthProvider) {
                oauthProvider = p_OauthProvider;
            };
  
            sessionData.getOauthProvider = function() {
                return oauthProvider;
            };
            
            //----
            sessionData.setFirstName = function(p_FirstName) {
                firstName = p_FirstName;
            };
   
            sessionData.getFirstName = function() {
                return firstName;
            };
            
            //----
            sessionData.setLastName = function(p_LastName) {
                lastName = p_LastName;
            };
  
            sessionData.getLastName = function() {
                return lastName;
            };            

            //----
            sessionData.setBirthday = function(p_Birthday) {
                birthday = p_Birthday;
            };
  
            sessionData.getBirthday = function() {
                return birthday;
            };  
            
            //----
            sessionData.setAccountEmail = function(p_AccountEmail) {
                accountEmail = p_AccountEmail;
            };
  
            sessionData.getAccountEmail = function() {
                return accountEmail;
            };    
            
            //----
            sessionData.setGender = function(p_Gender) {
                gender = p_Gender;
            };
  
            sessionData.getGender = function() {
                return gender;
            };  
            
            //----
            sessionData.setMembershipDate = function(p_MembershipDate) {
                membershipDate = p_MembershipDate;
            };
  
            sessionData.getMembershipDate = function() {
                return membershipDate;
            }; 

            //----
            sessionData.setLastLogin = function(p_LastLogin) {
                lastLogin = p_LastLogin;
            };
  
            sessionData.getLastLogin = function() {
                return lastLogin;
            }; 
            
            //----
            sessionData.setAccountStatus = function(p_AccountStatus) {
                accountStatus = p_AccountStatus;
            };
  
            sessionData.getAccountStatus = function() {
                return accountStatus;
            };             
            
            //----
            sessionData.setAppuser = function(p_appuser) {
                appuser = p_appuser;
            };
              
            sessionData.getAppuser = function() {
                return appuser;
            };
            
            //----
            // NOTE: This profile will always contain NULL or 0L ID.
            sessionData.setProfileId = function(p_profileId) {
                profileId = p_profileId;
            };

            sessionData.getProfileId = function() {
                return profileId;
            };         

            //----
            // NOTE: This profile will always contain NULL or 0L ID.
            sessionData.setAgentId = function(p_agentId) {
                agentId = p_agentId;
            };

            sessionData.getAgentId = function() {
                return agentId;
            };

            //----
            sessionData.setPicture = function(p_Picture) {
                picture = p_Picture;
            };
  
            sessionData.getPicture = function() {
                return picture;
            };                
            
            //----
            sessionData.setReturnCode = function(p_returnCode) {
                returnCode = p_returnCode;
            };
  
            sessionData.getReturnCode = function() {
                return returnCode;
            };                  
            
            //----
            sessionData.setAccessToken = function(p_accessToken) {
                accessToken = p_accessToken;
            };

            sessionData.getAccessToken = function() {
                return accessToken;
            };
            
            //----
            sessionData.setCfgServiceId = function(p_cfgServiceId) {
                cfgServiceId = p_cfgServiceId;
            };
  
            sessionData.getCfgServiceId = function() {
                return cfgServiceId;
            };
            
            //----
            sessionData.setNetwork = function(net) {
                network = net;
            };
  
            sessionData.getNetwork = function() {
                return network;
            };
            
            return sessionData;

        }]);

