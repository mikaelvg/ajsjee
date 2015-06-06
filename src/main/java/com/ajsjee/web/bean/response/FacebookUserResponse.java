/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ajsjee.web.bean.response;

import com.restfb.Facebook;
/**
 *
 * @author Mikael Gulapa
 */
public class FacebookUserResponse {

    @Facebook("id")
    private String facebookId;
    
    public String getFacebookId() {
        return facebookId;
    }
    
    public void setFacebookId(String facebookId) {
        this.facebookId = facebookId;
    }
}
