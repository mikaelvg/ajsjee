
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
 *         &lt;element name="GetMerchantTxnsResult" type="{http://api.dragonpay.ph/}ArrayOfTransaction" minOccurs="0"/>
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
    "getMerchantTxnsResult"
})
@XmlRootElement(name = "GetMerchantTxnsResponse")
public class GetMerchantTxnsResponse {

    @XmlElement(name = "GetMerchantTxnsResult")
    protected ArrayOfTransaction getMerchantTxnsResult;

    /**
     * Gets the value of the getMerchantTxnsResult property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfTransaction }
     *     
     */
    public ArrayOfTransaction getGetMerchantTxnsResult() {
        return getMerchantTxnsResult;
    }

    /**
     * Sets the value of the getMerchantTxnsResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfTransaction }
     *     
     */
    public void setGetMerchantTxnsResult(ArrayOfTransaction value) {
        this.getMerchantTxnsResult = value;
    }

}
