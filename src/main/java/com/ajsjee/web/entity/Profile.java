/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ajsjee.web.entity;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Mikael Gulapa
 */
@Entity
@Table(name = "profile")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Profile.findByPkAppuserId", query = "SELECT p FROM Profile p WHERE p.fkAppuserId.pkAppuserId = :pkAppuserId"),
    @NamedQuery(name = "Profile.findByUrlId", query = "SELECT p FROM Profile p WHERE p.urlId = :urlId")
})
public class Profile implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "pk_profile_id")
    private Long pkProfileId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "url_id")
    private String urlId;
    @Lob
    @Column(name = "profile_picture")
    private String profilePicture;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "mobile_number")
    private String mobileNumber;
    @Size(max = 500)
    @Column(name = "business_email")
    private String businessEmail;
    @Size(max = 50)
    @Column(name = "landline")
    private String landline;
    @Size(max = 6)
    @Column(name = "zip_code")
    private String zipCode;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "streetsubdivision")
    private String streetsubdivision;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "unitbuilding")
    private String unitbuilding;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Size(max = 50)
    @Column(name = "google_map")
    private String googleMap;
//    @Size(max = 50)
//    @Column(name = "identification_no_type")
//    private String identificationNoType;
//    @Size(max = 100)
//    @Column(name = "identification_no")
//    private String identificationNo;
    @Size(max = 2147483647)
    @Column(name = "site_link")
    private String siteLink;
    @Size(max = 100)
    @Column(name = "regular_job")
    private String regularJob;
    @Basic(optional = false)
    @NotNull
    @Column(name = "privacy_level")
    private int privacyLevel;
//    @Size(max = 50)
//    @Column(name = "emergency_contactname")
//    private String emergencyContactname;
//    @Size(max = 50)
//    @Column(name = "emergency_contactnumber")
//    private String emergencyContactnumber;
    @Size(max = 2147483647)
    @Column(name = "remarks")
    private String remarks;
    @JoinColumn(name = "fk_appuser_id", referencedColumnName = "pk_appuser_id")
    @ManyToOne(optional = false)
    private Appuser fkAppuserId;

    public Profile() {
    }

    public Profile(Long pkProfileId) {
        this.pkProfileId = pkProfileId;
    }

    public Long getPkProfileId() {
        return pkProfileId;
    }

    public void setPkProfileId(Long pkProfileId) {
        this.pkProfileId = pkProfileId;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getBusinessEmail() {
        return businessEmail;
    }

    public void setBusinessEmail(String businessEmail) {
        this.businessEmail = businessEmail;
    }

    public String getLandline() {
        return landline;
    }

    public void setLandline(String landline) {
        this.landline = landline;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getStreetsubdivision() {
        return streetsubdivision;
    }

    public void setStreetsubdivision(String streetsubdivision) {
        this.streetsubdivision = streetsubdivision;
    }

    public String getUnitbuilding() {
        return unitbuilding;
    }

    public void setUnitbuilding(String unitbuilding) {
        this.unitbuilding = unitbuilding;
    }

    public String getGoogleMap() {
        return googleMap;
    }

    public void setGoogleMap(String googleMap) {
        this.googleMap = googleMap;
    }

    public String getSiteLink() {
        return siteLink;
    }

    public void setSiteLink(String siteLink) {
        this.siteLink = siteLink;
    }

    public String getRegularJob() {
        return regularJob;
    }

    public void setRegularJob(String regularJob) {
        this.regularJob = regularJob;
    }

    public int getPrivacyLevel() {
        return privacyLevel;
    }

    public void setPrivacyLevel(int privacyLevel) {
        this.privacyLevel = privacyLevel;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Appuser getFkAppuserId() {
        return fkAppuserId;
    }

    public void setFkAppuserId(Appuser fkAppuserId) {
        this.fkAppuserId = fkAppuserId;
    }

    public String getUrlId() {
        return urlId;
    }

    public void setUrlId(String urlId) {
        this.urlId = urlId;
    }
}
