
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
 *         &lt;element name="GetSwitchTxnLogsResult" type="{http://api.dragonpay.ph/}ArrayOfTransactionLog" minOccurs="0"/>
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
    "getSwitchTxnLogsResult"
})
@XmlRootElement(name = "GetSwitchTxnLogsResponse")
public class GetSwitchTxnLogsResponse {

    @XmlElement(name = "GetSwitchTxnLogsResult")
    protected ArrayOfTransactionLog getSwitchTxnLogsResult;

    /**
     * Gets the value of the getSwitchTxnLogsResult property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfTransactionLog }
     *     
     */
    public ArrayOfTransactionLog getGetSwitchTxnLogsResult() {
        return getSwitchTxnLogsResult;
    }

    /**
     * Sets the value of the getSwitchTxnLogsResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfTransactionLog }
     *     
     */
    public void setGetSwitchTxnLogsResult(ArrayOfTransactionLog value) {
        this.getSwitchTxnLogsResult = value;
    }

}
