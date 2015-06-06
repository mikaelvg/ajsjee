
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
 *         &lt;element name="GetProcessorsResult" type="{http://api.dragonpay.ph/}ArrayOfProcessorInfo" minOccurs="0"/>
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
    "getProcessorsResult"
})
@XmlRootElement(name = "GetProcessorsResponse")
public class GetProcessorsResponse {

    @XmlElement(name = "GetProcessorsResult")
    protected ArrayOfProcessorInfo getProcessorsResult;

    /**
     * Gets the value of the getProcessorsResult property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfProcessorInfo }
     *     
     */
    public ArrayOfProcessorInfo getGetProcessorsResult() {
        return getProcessorsResult;
    }

    /**
     * Sets the value of the getProcessorsResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfProcessorInfo }
     *     
     */
    public void setGetProcessorsResult(ArrayOfProcessorInfo value) {
        this.getProcessorsResult = value;
    }

}
