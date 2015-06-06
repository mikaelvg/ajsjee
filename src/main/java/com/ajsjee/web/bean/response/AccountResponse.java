/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ajsjee.web.bean.response;


import com.ajsjee.web.entity.Appuser;
import com.ajsjee.web.entity.Profile;


/**
 *
 * @author Mikael Gulapa
 */
public class AccountResponse {

    private Appuser appuser;
    private Profile profile;
    private int returnCode;

    public AccountResponse() {
    }

    public AccountResponse(int returnCode) {
        this.returnCode = returnCode;
    }

    public AccountResponse(Appuser appuser, int returnCode) {
        this.appuser = appuser;
        this.returnCode = returnCode;
    }

    public Appuser getAppuser() {
        return appuser;
    }

    public void setAppuser(Appuser appuser) {
        this.appuser = appuser;
    }

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
