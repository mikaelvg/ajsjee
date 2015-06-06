
package com.ajsjee.web.payment.dragonpay;

import java.net.MalformedURLException;
import java.net.URL;
import javax.xml.namespace.QName;
import javax.xml.ws.Service;
import javax.xml.ws.WebEndpoint;
import javax.xml.ws.WebServiceClient;
import javax.xml.ws.WebServiceException;
import javax.xml.ws.WebServiceFeature;


/**
 * This class was generated by the JAX-WS RI.
 * JAX-WS RI 2.2.8
 * Generated source version: 2.2
 * 
 */
@WebServiceClient(name = "MerchantService", targetNamespace = "http://api.dragonpay.ph/", wsdlLocation = "http://test.dragonpay.ph/DragonPayWebService/MerchantService.asmx?wsdl")
public class MerchantService
    extends Service
{

    private final static URL MERCHANTSERVICE_WSDL_LOCATION;
    private final static WebServiceException MERCHANTSERVICE_EXCEPTION;
    private final static QName MERCHANTSERVICE_QNAME = new QName("http://api.dragonpay.ph/", "MerchantService");

    static {
        URL url = null;
        WebServiceException e = null;
        try {
            url = new URL("http://test.dragonpay.ph/DragonPayWebService/MerchantService.asmx?wsdl");
        } catch (MalformedURLException ex) {
            e = new WebServiceException(ex);
        }
        MERCHANTSERVICE_WSDL_LOCATION = url;
        MERCHANTSERVICE_EXCEPTION = e;
    }

    public MerchantService() {
        super(__getWsdlLocation(), MERCHANTSERVICE_QNAME);
    }

    public MerchantService(WebServiceFeature... features) {
        super(__getWsdlLocation(), MERCHANTSERVICE_QNAME, features);
    }

    public MerchantService(URL wsdlLocation) {
        super(wsdlLocation, MERCHANTSERVICE_QNAME);
    }

    public MerchantService(URL wsdlLocation, WebServiceFeature... features) {
        super(wsdlLocation, MERCHANTSERVICE_QNAME, features);
    }

    public MerchantService(URL wsdlLocation, QName serviceName) {
        super(wsdlLocation, serviceName);
    }

    public MerchantService(URL wsdlLocation, QName serviceName, WebServiceFeature... features) {
        super(wsdlLocation, serviceName, features);
    }

    /**
     * 
     * @return
     *     returns MerchantServiceSoap
     */
    @WebEndpoint(name = "MerchantServiceSoap")
    public MerchantServiceSoap getMerchantServiceSoap() {
        return super.getPort(new QName("http://api.dragonpay.ph/", "MerchantServiceSoap"), MerchantServiceSoap.class);
    }

    /**
     * 
     * @param features
     *     A list of {@link javax.xml.ws.WebServiceFeature} to configure on the proxy.  Supported features not in the <code>features</code> parameter will have their default values.
     * @return
     *     returns MerchantServiceSoap
     */
    @WebEndpoint(name = "MerchantServiceSoap")
    public MerchantServiceSoap getMerchantServiceSoap(WebServiceFeature... features) {
        return super.getPort(new QName("http://api.dragonpay.ph/", "MerchantServiceSoap"), MerchantServiceSoap.class, features);
    }

    /**
     * 
     * @return
     *     returns MerchantServiceSoap
     */
    @WebEndpoint(name = "MerchantServiceSoap12")
    public MerchantServiceSoap getMerchantServiceSoap12() {
        return super.getPort(new QName("http://api.dragonpay.ph/", "MerchantServiceSoap12"), MerchantServiceSoap.class);
    }

    /**
     * 
     * @param features
     *     A list of {@link javax.xml.ws.WebServiceFeature} to configure on the proxy.  Supported features not in the <code>features</code> parameter will have their default values.
     * @return
     *     returns MerchantServiceSoap
     */
    @WebEndpoint(name = "MerchantServiceSoap12")
    public MerchantServiceSoap getMerchantServiceSoap12(WebServiceFeature... features) {
        return super.getPort(new QName("http://api.dragonpay.ph/", "MerchantServiceSoap12"), MerchantServiceSoap.class, features);
    }

    private static URL __getWsdlLocation() {
        if (MERCHANTSERVICE_EXCEPTION!= null) {
            throw MERCHANTSERVICE_EXCEPTION;
        }
        return MERCHANTSERVICE_WSDL_LOCATION;
    }

}
