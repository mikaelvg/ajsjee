/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ajsjee.web.bean.request;

/**
 *
 * @author Mikael Gulapa
 */
public class SearchRequest {

    private Long cfgCategoryId;
    private Long cfgBarangayId;
    private Long cfgCitytownId;
    private Long cfgStateprovinceId;
    private Long cfgServiceId;
    private int serviceType;
    private String searchKey;
    private int pageNumber;
    private int recordCountPerPage;
    
    
    public SearchRequest() {        
    }

    public Long getCfgCategoryId() {
        return cfgCategoryId;
    }

    public void setCfgCategoryId(Long cfgCategoryId) {
        this.cfgCategoryId = cfgCategoryId;
    }

    public Long getCfgCitytownId() {
        return cfgCitytownId;
    }

    public void setCfgCitytownId(Long cfgCitytownId) {
        this.cfgCitytownId = cfgCitytownId;
    }

    public Long getCfgServiceId() {
        return cfgServiceId;
    }

    public void setCfgServiceId(Long cfgServiceId) {
        this.cfgServiceId = cfgServiceId;
    }

    public int getServiceType() {
        return serviceType;
    }

    public void setServiceType(int serviceType) {
        this.serviceType = serviceType;
    }

    public String getSearchKey() {
        return searchKey;
    }

    public void setSearchKey(String searchKey) {
        this.searchKey = searchKey;
    }

    public int getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public int getRecordCountPerPage() {
        return recordCountPerPage;
    }

    public void setRecordCountPerPage(int recordCountPerPage) {
        this.recordCountPerPage = recordCountPerPage;
    }

    public Long getCfgBarangayId() {
        return cfgBarangayId;
    }

    public void setCfgBarangayId(Long cfgBarangayId) {
        this.cfgBarangayId = cfgBarangayId;
    }

    public Long getCfgStateprovinceId() {
        return cfgStateprovinceId;
    }

    public void setCfgStateprovinceId(Long cfgStateprovinceId) {
        this.cfgStateprovinceId = cfgStateprovinceId;
    }
}
