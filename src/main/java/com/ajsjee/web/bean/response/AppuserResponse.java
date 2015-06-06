/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ajsjee.web.bean.response;

import com.ajsjee.web.entity.Appuser;

/**
 *
 * @author Mikael Gulapa 
 */
public class AppuserResponse {

    public AppuserResponse() {
    }

    public AppuserResponse(int returnCode) {
        this.returnCode = returnCode;
    }  

    public AppuserResponse(Appuser appuser, int returnCode) {
        this.appuser = appuser;
        this.returnCode = returnCode;
    }

    private Appuser appuser;
    private int returnCode;

    public Appuser getAppuser() {
        return appuser;
    }

    public void setAppuser(Appuser appuser) {
        this.appuser = appuser;
    }

    public int getReturnCode() {
        return returnCode;
    }

    public void setReturnCode(int returnCode) {
        this.returnCode = returnCode;
    }
}
