/*
 * To change this license header, choose License Headers in Oauth Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ajsjee.web.bean.response;

import java.util.List;
import com.ajsjee.web.entity.Oauth;

/**
 *
 * @author Mikael Gulapa
 */
public class OauthListResponse {

    private List<Oauth> lstOauth;
    private int returnCode;

    public OauthListResponse() {
    }

    public OauthListResponse(int returnCode) {
        this.returnCode = returnCode;
    }

    public OauthListResponse(List<Oauth> lstOauth, int returnCode) {
        this.lstOauth = lstOauth;
        this.returnCode = returnCode;
    }

    public List<Oauth> getLstOauth() {
        return lstOauth;
    }

    public void setLstOauth(List<Oauth> lstOauth) {
        this.lstOauth = lstOauth;
    }

    public int getReturnCode() {
        return returnCode;
    }

    public void setReturnCode(int returnCode) {
        this.returnCode = returnCode;
    }
}
