
package com.ajsjee.web.payment.dragonpay;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="GetTxnRefNoResult" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "getTxnRefNoResult"
})
@XmlRootElement(name = "GetTxnRefNoResponse")
public class GetTxnRefNoResponse {

    @XmlElement(name = "GetTxnRefNoResult")
    protected String getTxnRefNoResult;

    /**
     * Gets the value of the getTxnRefNoResult property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getGetTxnRefNoResult() {
        return getTxnRefNoResult;
    }

    /**
     * Sets the value of the getTxnRefNoResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setGetTxnRefNoResult(String value) {
        this.getTxnRefNoResult = value;
    }

}
