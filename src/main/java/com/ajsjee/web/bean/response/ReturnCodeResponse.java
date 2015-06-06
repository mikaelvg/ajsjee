/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ajsjee.web.bean.response;

/**
 *
 * @author Mikael Gulapa
 */
public class ReturnCodeResponse {

    private int returnCode;

    public ReturnCodeResponse() {
    }

    public ReturnCodeResponse(int returnCode) {
        this.returnCode = returnCode;
    }
    
    public int getReturnCode() {
        return returnCode;
    }
    
    public void setReturnCode(int returnCode) {
        this.returnCode = returnCode;
    }
}
