package com.ajsjee.web.payment.dragonpay.impl;

import com.ajsjee.web.bean.request.DragonPayTransactionTokenRequest;
import com.ajsjee.web.bean.request.DragonPaymentRequest;
import com.ajsjee.web.payment.dragonpay.ArrayOfCountry;
import com.ajsjee.web.payment.dragonpay.ArrayOfProcessorInfo;
import com.ajsjee.web.payment.dragonpay.ArrayOfTransaction;
import com.ajsjee.web.payment.dragonpay.ArrayOfTransactionLog;
import com.ajsjee.web.payment.dragonpay.MerchantService;
import com.ajsjee.web.payment.dragonpay.MerchantServiceSoap;
import java.text.ParseException;
import javax.xml.datatype.XMLGregorianCalendar;

/**
 *
 * @author mikaelvg
 */
public class DragonPayWebServicesClient {

    private String merchantId = "xx";
    private String password = "xx";

    public ArrayOfCountry getCountries() {
        ArrayOfCountry result = new ArrayOfCountry();
        try {
            MerchantService service = new MerchantService();
            MerchantServiceSoap port = service.getMerchantServiceSoap12();
            result = port.getCountries();
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
        return result;
    }

    public ArrayOfProcessorInfo getProcessors() {

        // List of entities that recieves payments. E.g Bayad Center, BDO and etc.
        ArrayOfProcessorInfo result = new ArrayOfProcessorInfo();
        try {
            MerchantService service = new MerchantService();
            MerchantServiceSoap port = service.getMerchantServiceSoap12();
            result = port.getProcessors();
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
        return result;
    }

    public String getTxnStatus(String transactionId) {
        String result = null;
        try {
            MerchantService service = new MerchantService();
            MerchantServiceSoap port = service.getMerchantServiceSoap12();
            result = port.getTxnStatus(merchantId, password, transactionId);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
        return result;
    }

    public String getTxnRefNo(String transactionId) {
        String result = null;
        try {
            MerchantService service = new MerchantService();
            MerchantServiceSoap port = service.getMerchantServiceSoap12();
            result = port.getTxnRefNo(merchantId, password, transactionId);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
        return result;
    }

    public String getTnxToken(DragonPayTransactionTokenRequest dragonPayTransactionTokenRequest) {
        String result = null;
        try {
            MerchantService service = new MerchantService();
            MerchantServiceSoap port = service.getMerchantServiceSoap12();
            String merchantTransationId = dragonPayTransactionTokenRequest.getMerchantTxnId();
            double amount = dragonPayTransactionTokenRequest.getAmount();
            String ccy = dragonPayTransactionTokenRequest.getCurrency();
            String description = dragonPayTransactionTokenRequest.getDescription();
            String email = dragonPayTransactionTokenRequest.getEmail();
            String param1 = dragonPayTransactionTokenRequest.getParam1();
            String param2 = dragonPayTransactionTokenRequest.getParam2();
            result = port.getTxnToken(merchantId, password, merchantTransationId, amount, ccy, description, email, param1, param2);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
        return result;
    }

    public int cancelTransaction(String merchantTransationId) {
        int result = 0;
        try {
            MerchantService service = new MerchantService();
            MerchantServiceSoap port = service.getMerchantServiceSoap12();
            result = port.cancelTransaction(merchantId, password, merchantTransationId);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
        return result;
    }

    public int sendBillingInfo(DragonPaymentRequest dragonPaymentRequest) {
        int result = 0;
        try {
            MerchantService service = new MerchantService();
            MerchantServiceSoap port = service.getMerchantServiceSoap12();

            result = port.sendBillingInfo(
                    merchantId,
                    dragonPaymentRequest.getMerchantTxnId(),
                    dragonPaymentRequest.getFirstName(),
                    dragonPaymentRequest.getLastName(),
                    dragonPaymentRequest.getAddress1(),
                    dragonPaymentRequest.getAddress2(),
                    dragonPaymentRequest.getCity(),
                    dragonPaymentRequest.getState(),
                    dragonPaymentRequest.getCountry(),
                    dragonPaymentRequest.getZipCode(),
                    dragonPaymentRequest.getTelNo(),
                    dragonPaymentRequest.getEmail());
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
        return result;
    }

    public ArrayOfTransaction getMerchantTxns(XMLGregorianCalendar dStart, XMLGregorianCalendar dEnd) throws ParseException {
 
        MerchantService service = new MerchantService();
        MerchantServiceSoap port = service.getMerchantServiceSoap12();
        ArrayOfTransaction result = port.getMerchantTxns(merchantId, password, dStart, dEnd);
        return result;
    }

    public ArrayOfTransaction getGetMerchantSettledTxns(XMLGregorianCalendar dStart, XMLGregorianCalendar dEnd) throws ParseException {
        
        MerchantService service = new MerchantService();
        MerchantServiceSoap port = service.getMerchantServiceSoap12();
        ArrayOfTransaction result = port.getMerchantSettledTxns(merchantId, password, dStart, dEnd);
        return result;
    }

    public ArrayOfTransactionLog getSwithTxnLogs() {
        ArrayOfTransactionLog result = new ArrayOfTransactionLog();
        try {
            MerchantService service = new MerchantService();
            MerchantServiceSoap port = service.getMerchantServiceSoap12();
            String refNo = "";
            result = port.getSwitchTxnLogs(merchantId, password, refNo);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
        return result;
    }


}
