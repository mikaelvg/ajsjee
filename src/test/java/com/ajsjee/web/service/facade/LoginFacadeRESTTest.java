/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ajsjee.web.service.facade;

import com.github.jtreport.annotation.TestClassReport;
import com.github.jtreport.annotation.TestSingleReport;
import com.ajsjee.web.bean.request.LoginRequest;
import com.ajsjee.web.bean.response.LoginResponse;
import com.ajsjee.web.entity.Appuser;
import com.ajsjee.web.testutil.TestUtils;
import com.ajsjee.web.util.CommonUtil;
import com.ajsjee.web.util.CodeUtil;
import java.io.IOException;
import java.util.Date;
import javax.ejb.embeddable.EJBContainer;
import javax.naming.NamingException;
import org.junit.AfterClass;
import static org.junit.Assert.assertEquals;
import org.junit.BeforeClass;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 *
 * @author Mikael Gulapa
 */
//@Ignore
@TestClassReport(description = "Test cases for retrieving Login Details details")
public class LoginFacadeRESTTest {

    public LoginFacadeRESTTest() {
    }
    private static final Logger LOGGER = LoggerFactory.getLogger(LoginFacadeRESTTest.class);
    private static EJBContainer container;
    private static LoginFacadeREST instance;
    Appuser appuser;
    LoginRequest loginRequest;
    LoginRequest actualLoginRequest;    
    LoginResponse expectedLoginResponse;
    LoginResponse actualLoginResponse;
    Long appuserId;
    Date testDate = CommonUtil.getCurrentServerDate();

    @BeforeClass
    public static void setUpClass() throws NamingException, IOException, InterruptedException {
        container = TestUtils.getEJBContainer(container);
        instance = (LoginFacadeREST) container.getContext().
                lookup("java:global/classes/LoginFacadeREST");
        TestUtils.runDBScript();
    }

    @AfterClass
    public static void tearDownClass() {
        container.close();
        instance = null;
    }

    @Test
    @TestSingleReport(description = ""
            + "Successful appuser detail retrieval.",
            expectations = ""
            + "Successful retrieve appuser details code = " + CodeUtil.RETRIEVE_APPUSER_SUCCESS)
    public void normalTestCreateUpdateRetrieveAppuserFromLogin() throws Exception {

        LOGGER.info("ajsjee TEST: Retrieve appuser details");
        loginRequest = new LoginRequest();
        expectedLoginResponse = new LoginResponse();
        actualLoginResponse = new LoginResponse();
        loginRequest.setAccountId("326070950890699");
        loginRequest.setOauthProvider("XX");
        
        expectedLoginResponse.setReturnCode(CodeUtil.LOGIN_SUCCESS);
        expectedLoginResponse.setAppuser(appuser);
        
        actualLoginResponse = instance.authenticateUser("dummytoken", loginRequest);

        assertEquals("Should be successful retrieving appuser details",
                expectedLoginResponse.getReturnCode(), actualLoginResponse.getReturnCode());
    }
    
    @Test
    @TestSingleReport(description = ""
            + "Invalid Parameter",
            expectations = ""
            + "Invalid Parameter = " + CodeUtil.INVALID_PARAMETER)
    public void errorTestCreateUpdateRetrieveAppuserFromLogin1() throws Exception {

        LOGGER.info("ajsjee TEST: Retrieve appuser details");
        loginRequest = new LoginRequest();
        expectedLoginResponse = new LoginResponse();
        actualLoginResponse = new LoginResponse();
        loginRequest.setAccountId("1407776916174538");
        
        expectedLoginResponse.setReturnCode(CodeUtil.INVALID_PARAMETER);
        expectedLoginResponse.setAppuser(appuser);
        
        actualLoginResponse = instance.authenticateUser(null, loginRequest);

        assertEquals("Should be successful retrieving appuser details",
                expectedLoginResponse.getReturnCode(), actualLoginResponse.getReturnCode());
    }   
    
    //@Test
    @TestSingleReport(description = ""
            + "Not existing accountId",
            expectations = ""
            + "Invalid Parameter = " + CodeUtil.RETRIEVE_APPUSER_ERROR)
    public void errorTestCreateUpdateRetrieveAppuserFromLogin2() throws Exception {

        LOGGER.info("ajsjee TEST: Retrieve appuser details");
        loginRequest = new LoginRequest();
        expectedLoginResponse = new LoginResponse();
        actualLoginResponse = new LoginResponse();
        loginRequest.setAccountId("1407697196182510");
        
        expectedLoginResponse.setReturnCode(CodeUtil.RETRIEVE_APPUSER_ERROR);
        expectedLoginResponse.setAppuser(appuser);
        
        actualLoginResponse = instance.authenticateUser("Dummy Token", loginRequest);

        assertEquals("Should be successful retrieving appuser details",
                expectedLoginResponse.getReturnCode(), actualLoginResponse.getReturnCode());
    }
}
