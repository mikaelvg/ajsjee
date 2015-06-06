/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ajsjee.web.bean.response;

/**
 *
 * @author Mikael Gulapa 
 */
public class CreateUpdateResponse {
    
    private int returnCode;
    private Long lngId;    
    
    public CreateUpdateResponse(Long lngId, int returnCode) {
        this.lngId = lngId;
        this.returnCode = returnCode;
    }

    public CreateUpdateResponse(int returnCode) {
        this.returnCode = returnCode;
    }    

    public CreateUpdateResponse() {
    }
    
    public int getReturnCode() {
        return returnCode;
    }

    public void setReturnCode(int returnCode) {
        this.returnCode = returnCode;
    }

    public Long getLngId() {
        return lngId;
    }

    public void setLngId(Long lngId) {
        this.lngId = lngId;
    }

}
