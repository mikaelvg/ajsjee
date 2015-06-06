/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ajsjee.web.service.facade;

import com.github.jtreport.annotation.TestClassReport;
import com.github.jtreport.annotation.TestSingleReport;
import java.io.IOException;
import javax.ejb.embeddable.EJBContainer;
import javax.naming.NamingException;
import org.junit.AfterClass;
import static org.junit.Assert.assertEquals;
import org.junit.BeforeClass;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.ajsjee.web.bean.response.ReturnCodeResponse;
import com.ajsjee.web.testutil.TestUtils;
import com.ajsjee.web.util.ConstantsLoaderUtils;
import com.ajsjee.web.util.CodeUtil;

/**
 *
 * @author Mikael Gulapa
 */
//@Ignore
@TestClassReport(description = "Test case for Constant Manager")
public class ConstantsFacadeRESTTest {

    public ConstantsFacadeRESTTest() {
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(ConstantsFacadeRESTTest.class);
    private static EJBContainer container;
    private static ConstantFacadeREST instance;

    @BeforeClass
    public static void setUpClass() throws NamingException, IOException, InterruptedException {
        container = TestUtils.getEJBContainer(container);
        instance = (ConstantFacadeREST) container.getContext().
                lookup("java:global/classes/ConstantFacadeREST");
        TestUtils.runDBScript();
    }

    @AfterClass
    public static void tearDownClass() {
        container.close();
    }

    @Test
    @TestSingleReport(description = ""
            + "Reloads the constants from the Database",
            expectations = ""
            + "Should be successful in reloading/retrieving the constants, "
            + "expected Return Code = " + CodeUtil.RETRIEVE_CONSTANT_SUCCESS + "\n")
    public void normalTestReloadConstantFromDatabase() throws Exception {
        LOGGER.info("ajsjee TEST: Reloading constants from Database");
        ReturnCodeResponse expectedResponse = new ReturnCodeResponse();
        expectedResponse.setReturnCode(CodeUtil.RETRIEVE_CONSTANT_SUCCESS);
        ReturnCodeResponse result = instance.reloadContants();
        assertEquals(expectedResponse.getReturnCode(), result.getReturnCode());
        assertEquals(ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_USER"), "ajsjee.com@gmail.com");
        assertEquals(ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_HOST"), "smtp.gmail.com");
        assertEquals(ConstantsLoaderUtils.ConstantsMap.get("SMTP_PORT"), "25");
        assertEquals(ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_AUTH"), "TRUE");
        assertEquals(ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_STARTTLS_ENABLE"), "TRUE");
        assertEquals(ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_ENABLESSL_ENABLE"), "TRUE");
        assertEquals(ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_SOCKETFACTORY_CLASS"), "javax.net.ssl.SSLSocketFactory");
        assertEquals(ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_SOCKETFACTORY_FALLBACK"), "FALSE");
        assertEquals(ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_PORT"), "465");
        assertEquals(ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_SOCKETFACTORY_PORT"), "465");
    }
}
