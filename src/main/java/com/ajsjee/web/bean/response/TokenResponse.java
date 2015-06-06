/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ajsjee.web.bean.response;


/**
 *
 * @author Mikael Gulapa
 */
public class TokenResponse {

    public TokenResponse() {
    }

    public TokenResponse(int returnCode) {
        this.returnCode = returnCode;
    }

    public TokenResponse(String Token, int returnCode) {
        this.Token = Token;
        this.returnCode = returnCode;
    }
    
    private String Token;
    private int returnCode;

    public String getToken() {
        return Token;
    }

    public void setToken(String Token) {
        this.Token = Token;
    }

    public int getReturnCode() {
        return returnCode;
    }

    public void setReturnCode(int returnCode) {
        this.returnCode = returnCode;
    }

}
