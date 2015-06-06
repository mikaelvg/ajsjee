/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ajsjee.web.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Kim
 */
@Entity
@Table(name = "oauth")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Oauth.findAll", query = "SELECT o FROM Oauth o"),
    @NamedQuery(name = "Oauth.findByPkAppuserId", query = "SELECT o FROM Oauth o WHERE o.fkAppuserId.pkAppuserId = :pkAppuserId"),
    @NamedQuery(name = "Oauth.findByAccountId", query = "SELECT o FROM Oauth o WHERE o.accountId = :accountId")})
public class Oauth implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "pk_oauth_id")
    private Long pkOauthId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2)
    @Column(name = "oauth_provider")
    private String oauthProvider;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2147483647)
    @Column(name = "account_id")
    private String accountId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "creation_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;
    @Basic(optional = false)
    @NotNull
    @Column(name = "isprimary")
    private boolean isprimary;
    @JoinColumn(name = "fk_appuser_id", referencedColumnName = "pk_appuser_id")
    @ManyToOne(optional = false, cascade = CascadeType.PERSIST) // Cascased create the appuser if not existing.
    private Appuser fkAppuserId;

    public Oauth() {
    }

    public Oauth(Long pkOauthId) {
        this.pkOauthId = pkOauthId;
    }

    public Oauth(Long pkOauthId, String oauthProvider, String accountId, Date creationDate, boolean showname) {
        this.pkOauthId = pkOauthId;
        this.oauthProvider = oauthProvider;
        this.accountId = accountId;
        this.creationDate = creationDate;
        this.isprimary = showname;
    }

    public Long getPkOauthId() {
        return pkOauthId;
    }

    public void setPkOauthId(Long pkOauthId) {
        this.pkOauthId = pkOauthId;
    }

    public String getOauthProvider() {
        return oauthProvider;
    }

    public void setOauthProvider(String oauthProvider) {
        this.oauthProvider = oauthProvider;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public boolean getShowname() {
        return isprimary;
    }

    public void setIsprimary(boolean isprimary) {
        this.isprimary = isprimary;
    }

    public Appuser getFkAppuserId() {
        return fkAppuserId;
    }

    public void setFkAppuserId(Appuser fkAppuserId) {
        this.fkAppuserId = fkAppuserId;
    }
 
}
