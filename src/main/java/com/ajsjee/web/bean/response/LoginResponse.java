/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ajsjee.web.bean.response;

import com.ajsjee.web.entity.Appuser;
import java.util.Date;

/**
 *
 * @author Mikael Gulapa
 */
public class LoginResponse {

    private Appuser appuser;
    private Long pkProfileId;
    private String picture;
    private Long pkAgentId;
    private Long pkCompanyId;
    private Date currentServerDate;
    private int returnCode;
    
    public LoginResponse() {
    }

    public LoginResponse(int returnCode) {
        this.returnCode = returnCode;
    }

    public LoginResponse(Date currentServerDate, int returnCode) {
        this.currentServerDate = currentServerDate;
        this.returnCode = returnCode;
    }
        
    public LoginResponse(Appuser appuser, int returnCode) {
        this.appuser = appuser;
        this.returnCode = returnCode;
    }

    public LoginResponse(Appuser appuser, Date currentServerDate, int returnCode) {
        this.appuser = appuser;
        this.currentServerDate = currentServerDate;
        this.returnCode = returnCode;
    }

    public LoginResponse(Appuser appuser, Long pkProfileId, String picture, int returnCode) {
        this.appuser = appuser;
        this.pkProfileId = pkProfileId;
        this.picture = picture;
        this.returnCode = returnCode;
    }

    public LoginResponse(Appuser appuser, Long pkProfileId, String picture, Date currentServerDate, int returnCode) {
        this.appuser = appuser;
        this.pkProfileId = pkProfileId;
        this.picture = picture;
        this.currentServerDate = currentServerDate;
        this.returnCode = returnCode;
    }

    public Appuser getAppuser() {
        return appuser;
    }

    public void setAppuser(Appuser appuser) {
        this.appuser = appuser;
    }

    public Long getPkProfileId() {
        return pkProfileId;
    }

    public void setPkProfileId(Long pkProfileId) {
        this.pkProfileId = pkProfileId;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public Long getPkAgentId() {
        return pkAgentId;
    }

    public void setPkAgentId(Long pkAgentId) {
        this.pkAgentId = pkAgentId;
    }

    public int getReturnCode() {
        return returnCode;
    }

    public void setReturnCode(int returnCode) {
        this.returnCode = returnCode;
    }

    public Long getPkCompanyId() {
        return pkCompanyId;
    }

    public void setPkCompanyId(Long pkCompanyId) {
        this.pkCompanyId = pkCompanyId;
    }

    public Date getCurrentServerDate() {
        return currentServerDate;
    }

    public void setCurrentServerDate(Date currentServerDate) {
        this.currentServerDate = currentServerDate;
    }
}
