/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ajsjee.web.service.facade;

import com.github.jtreport.annotation.TestSingleReport;
import java.io.IOException;
import java.util.Date;
import javax.ejb.embeddable.EJBContainer;
import javax.naming.NamingException;
import org.junit.AfterClass;
import static org.junit.Assert.*;
import org.junit.BeforeClass;
import org.junit.Test;
import com.ajsjee.web.bean.response.AppuserResponse;
import com.ajsjee.web.bean.response.CreateUpdateResponse;
import com.ajsjee.web.entity.Appuser;
import com.ajsjee.web.testutil.TestUtils;
import com.ajsjee.web.util.CommonUtil;
import com.ajsjee.web.util.CodeUtil;
import com.ajsjee.web.testutil.TestVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Mikael Gulapa
 */
//@Ignore
public class AppuserFacadeRESTTest {

    public AppuserFacadeRESTTest() {
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(AppuserFacadeRESTTest.class);
    private static EJBContainer container;
    private static AppuserFacadeREST instance;
    Appuser appuser;
    AppuserResponse expectedAppuserResponse;
    AppuserResponse actualAppuserResponse;
    CreateUpdateResponse expectedCreateUpdateResponse;
    CreateUpdateResponse actualCreateUpdateResponse;
    Long appuserId;
    Date testDate = CommonUtil.getCurrentServerDate();

    @BeforeClass
    public static void setUpClass() throws NamingException, IOException, InterruptedException {
        container = TestUtils.getEJBContainer(container);
        instance = (AppuserFacadeREST) container.getContext().
                lookup("java:global/classes/AppuserFacadeREST");
        TestUtils.runDBScript();
    }

    @AfterClass
    public static void tearDownClass() {
        container.close();
    }

    @Test
    @TestSingleReport(description = ""
            + "1. Create Appuser using NULL appuserId \n"
            + "2. Update Appuser using EXISTING AppuserId \n"
            + "3. Retrieve Appuser using EXISTING appuserId\n",
            expectations = ""
            + "1. Appuser creation must be successful. Expected return code = " + CodeUtil.CREATE_APPUSER_SUCCESS
            + " \n2. Appuser update must be successful. Expected return code = " + CodeUtil.UPDATE_APPUSER_SUCCESS
            + " \n3. Appuser retrieval must be successful. Expected return code = " + CodeUtil.RETRIEVE_APPUSER_SUCCESS)
    public void normalTestCreateUpdateRetrieveAppuserCase1() throws Exception {
        TestUtils.runDBScript();

        appuser = this.polulateAppuser();

        //----------------------------------------------------------------------
        LOGGER.info("ajsjee TEST | Creating new Appuser");
        expectedCreateUpdateResponse = new CreateUpdateResponse();
        expectedCreateUpdateResponse.setLngId(TestVariable.START_ID_APPUSER);
        expectedCreateUpdateResponse.setReturnCode(CodeUtil.CREATE_APPUSER_SUCCESS);
        actualCreateUpdateResponse = instance.createAppuser(TestVariable.ACCESS_TOKEN, appuser);
        assertEquals("AppuserID did not match the newly created ID.",
                expectedCreateUpdateResponse.getLngId(), actualCreateUpdateResponse.getLngId());
        assertEquals("Should be successfull creating Appuser",
                expectedCreateUpdateResponse.getReturnCode(), actualCreateUpdateResponse.getReturnCode());

        //----------------------------------------------------------------------
        LOGGER.info("ajsjee TEST | Update Appuser");
        expectedCreateUpdateResponse = new CreateUpdateResponse();
        expectedCreateUpdateResponse.setLngId(TestVariable.START_ID_APPUSER);
        expectedCreateUpdateResponse.setReturnCode(CodeUtil.UPDATE_APPUSER_SUCCESS);
        appuser.setPkAppuserId(TestVariable.START_ID_APPUSER);
        actualCreateUpdateResponse = instance.updateAppuser(TestVariable.ACCESS_TOKEN, TestVariable.LOGGED_APPUSER, TestVariable.OAUTH_PROVIDER, TestVariable.ACCOUNT_ID, appuser);
        assertEquals("AppuserID did not match the newly created ID.",
                expectedCreateUpdateResponse.getLngId(), actualCreateUpdateResponse.getLngId());
        assertEquals("Should be successfull updating Appuser",
                expectedCreateUpdateResponse.getReturnCode(), actualCreateUpdateResponse.getReturnCode());

        //----------------------------------------------------------------------
        LOGGER.info("ajsjee TEST | Retrieve Appuser details");
        expectedAppuserResponse = new AppuserResponse();
        expectedAppuserResponse.setAppuser(appuser);
        expectedAppuserResponse.setReturnCode(CodeUtil.RETRIEVE_APPUSER_SUCCESS);
        actualAppuserResponse = instance.findAppuser(TestVariable.LOGGED_APPUSER, TestVariable.START_ID_APPUSER);
        assertEquals("Appuser details did not match the expected ID.",
                expectedAppuserResponse.getAppuser().getPkAppuserId(), actualAppuserResponse.getAppuser().getPkAppuserId());
        assertEquals("Should be successfull retrieving Appuser details",
                expectedAppuserResponse.getReturnCode(), actualAppuserResponse.getReturnCode());

    }

    @Test
    @TestSingleReport(description = ""
            + "Create Appuser with NOT NULL appuserId.",
            expectations = ""
            + "Should NOT create appuser | Expected return code = " + CodeUtil.INVALID_PARAMETER)
    public void errorTestCreateAppuserCase1() throws Exception {

        LOGGER.info("ajsjee TEST| Create Appuser with NOT NULL appuserId");
        appuser = this.polulateAppuser();
        appuser.setPkAppuserId(TestVariable.EXISTING_APPUSER_ZERO_PACKAGE);
        actualCreateUpdateResponse = instance.createAppuser(TestVariable.ACCESS_TOKEN, appuser);
        assertEquals("Should NOT create new Appuser",
                CodeUtil.INVALID_PARAMETER, actualCreateUpdateResponse.getReturnCode());
    }

    @Test
    @TestSingleReport(description = ""
            + "Update Appuser with NULL appuserId.\n",
            expectations = ""
            + "Should NOT create appuser | Expected return code = " + CodeUtil.INVALID_PARAMETER)
    public void errorTestUpdateAppuserCase1() throws Exception {

        LOGGER.info("ajsjee TEST | Update Appuser with NULL appuserId");
        appuser = this.polulateAppuser();
        appuser.setPkAppuserId(null);
        actualCreateUpdateResponse = instance.updateAppuser(TestVariable.ACCESS_TOKEN, TestVariable.LOGGED_APPUSER, TestVariable.OAUTH_PROVIDER, TestVariable.ACCOUNT_ID, appuser);
        assertEquals("Should NOT create new Appuser",
                CodeUtil.INVALID_PARAMETER, actualCreateUpdateResponse.getReturnCode());
    }

    @Test
    @TestSingleReport(description = ""
            + "Update Appuser with NULL appuserId.\n",
            expectations = ""
            + "Should NOT update appuser | Expected return code = " + CodeUtil.DO_NOT_EXIST_APPUSER_ERROR)
    public void errorTestUpdateAppuserCase2() throws Exception {

        LOGGER.info("ajsjee TEST | Update appuser with NON EXISTING appuser ID");
        appuser = this.polulateAppuser();
        appuser.setPkAppuserId(TestVariable.NON_EXISTING_APPUSER);
        actualCreateUpdateResponse = instance.updateAppuser(TestVariable.ACCESS_TOKEN, TestVariable.LOGGED_APPUSER, TestVariable.OAUTH_PROVIDER, TestVariable.ACCOUNT_ID, appuser);
        assertEquals("Should NOT create new Appuser",
                CodeUtil.DO_NOT_EXIST_APPUSER_ERROR, actualCreateUpdateResponse.getReturnCode());
    }

    private Appuser polulateAppuser() {
        appuser = new Appuser();
        appuser.setAccountEmail("mikael@pogi.com");
        appuser.setBirthday("10/10/1990");
        appuser.setFirstName("mikael");
        appuser.setLastName("gulapa");
        appuser.setMembershipDate(testDate);
        appuser.setLastLogin(testDate);
        appuser.setGender("male");
        appuser.setAccountStatus(0);
        return appuser;
    }
}
