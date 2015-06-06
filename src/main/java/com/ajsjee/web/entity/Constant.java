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
@Table(name = "constant")
@XmlRootElement
public class Constant implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "pk_constant_id")
    private Long pkConstantId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "constant_name")
    private String constantName;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2147483647)
    @Column(name = "constant_value")
    private String constantValue;

    public Constant() {
    }

    public Constant(Long pkConstantId) {
        this.pkConstantId = pkConstantId;
    }

    public Constant(Long pkConstantId, String constantName, String constantValue) {
        this.pkConstantId = pkConstantId;
        this.constantName = constantName;
        this.constantValue = constantValue;
    }

    public Long getPkConstantId() {
        return pkConstantId;
    }

    public void setPkConstantId(Long pkConstantId) {
        this.pkConstantId = pkConstantId;
    }

    public String getConstantName() {
        return constantName;
    }

    public void setConstantName(String constantName) {
        this.constantName = constantName;
    }

    public String getConstantValue() {
        return constantValue;
    }

    public void setConstantValue(String constantValue) {
        this.constantValue = constantValue;
    }
   
}
