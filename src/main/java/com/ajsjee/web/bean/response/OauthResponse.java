/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ajsjee.web.bean.response;

import com.ajsjee.web.entity.Oauth;

/**
 *
 * @author Mikael Gulapa
 */
public class OauthResponse {

    public OauthResponse() {
        
    }

    public OauthResponse(int returnCode) {
        this.returnCode = returnCode;
    }
    
    
    public OauthResponse(Oauth oauth, int returnCode) {
        this.oauth = oauth;
        this.returnCode = returnCode;
                
    }
    
    private Oauth oauth;
    private int returnCode;
    
    public Oauth getOauth() {
        return oauth;
    }
    
    public void setOauth(Oauth oauth) {
        this.oauth = oauth;
    }
    
    public int getReturnCode() {
        return returnCode;
    }
    
    public void setReturnCode(int returnCode) {
        this.returnCode = returnCode;
    }
}
