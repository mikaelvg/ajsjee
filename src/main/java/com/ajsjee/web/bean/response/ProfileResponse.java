/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ajsjee.web.bean.response;

import com.ajsjee.web.entity.Profile;

/**
 *
 * @author Mikael Gulapa
 */
public class ProfileResponse {

    public ProfileResponse() {
        
    }

    public ProfileResponse(int returnCode) {
        this.returnCode = returnCode;
    }
    
    
    public ProfileResponse(Profile profile, int returnCode) {
        this.profile = profile;
        this.returnCode = returnCode;
                
    }
    
    private Profile profile;
    private int returnCode;
    
    public Profile getProfile() {
        return profile;
    }
    
    public void setProfile(Profile profile) {
        this.profile = profile;
    }
    
    public int getReturnCode() {
        return returnCode;
    }
    
    public void setReturnCode(int returnCode) {
        this.returnCode = returnCode;
    }
}
