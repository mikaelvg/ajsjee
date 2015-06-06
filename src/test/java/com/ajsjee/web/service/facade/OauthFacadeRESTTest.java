package com.ajsjee.web.service.facade;

import com.github.jtreport.annotation.TestSingleReport;
import com.ajsjee.web.bean.response.CreateUpdateResponse;
import com.ajsjee.web.bean.response.OauthListResponse;
import com.ajsjee.web.bean.response.ReturnCodeResponse;
import com.ajsjee.web.bean.response.TokenResponse;
import com.ajsjee.web.entity.Appuser;
import com.ajsjee.web.entity.Oauth;
import com.ajsjee.web.testutil.TestUtils;
import com.ajsjee.web.testutil.TestVariable;
import com.ajsjee.web.util.CodeUtil;
import java.io.IOException;
import javax.ejb.embeddable.EJBContainer;
import javax.naming.NamingException;
import org.junit.AfterClass;
import static org.junit.Assert.*;
import org.junit.BeforeClass;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Mikael Gulapa
 */
//@Ignore
public class OauthFacadeRESTTest {

    private static final Logger LOGGER = LoggerFactory.getLogger(OauthFacadeRESTTest.class);
    private static EJBContainer container;
    private static OauthFacadeREST instance;
    Appuser appuser;
    Oauth oauth;

    OauthListResponse expectedOauthListResponse;
    OauthListResponse actualOauthListResponse;

    TokenResponse expectedTokenResponse;
    TokenResponse actualTokenResponse;

    CreateUpdateResponse expectedCreateUpdateResponse;
    CreateUpdateResponse actualCreateUpdateResponse;

    ReturnCodeResponse expectedReturnCodeResponse;
    ReturnCodeResponse actualReturnCodeResponse;

    long oauthId;
    Long appuserId;

    public OauthFacadeRESTTest() {
    }

    @BeforeClass
    public static void setUpClass() throws NamingException, IOException, InterruptedException {
        container = TestUtils.getEJBContainer(container);
        instance = (OauthFacadeREST) container.getContext().
                lookup("java:global/classes/OauthFacadeREST");
    }

    @AfterClass
    public static void tearDownClass() {
        container.close();
        instance = null;
    }

    @Test
    @TestSingleReport(description = ""
            + "Create Oauth and Appuser at the same time",
            expectations = ""
            + "Should create new Oauth and Appuser. Expected return code = " + CodeUtil.CREATE_OAUTH_SUCCESS)
    public void normalTestNewAccountViaOauthCase1() throws Exception {
        LOGGER.info("ajsjee TEST | Create Oauth with NON EXISTING appuserId");

        TestUtils.runDBScript();

        appuser = new Appuser();
        appuser = TestUtils.populateAppuser(null);

        oauth = this.populateOauth();
        oauth.setAccountId("FACEBOOKID");
        oauth.setFkAppuserId(appuser);
        actualCreateUpdateResponse = instance.createNewAccount(TestVariable.ACCESS_TOKEN, oauth);
        assertEquals("Should create new Oauth",
                CodeUtil.CREATE_OAUTH_SUCCESS, actualCreateUpdateResponse.getReturnCode());
    }

    @Test
    @TestSingleReport(description = ""
            + "Create Oauth using existing appuser",
            expectations = ""
            + "Should create new Oauth and no updates on Appuser. Expected return code = " + CodeUtil.CREATE_OAUTH_SUCCESS)
    public void normalTestNewAccountViaOauthCase2() throws Exception {

        TestUtils.runDBScript();

        LOGGER.info("ajsjee TEST | Create Oauth using existing appuser");
        appuser = new Appuser();
        appuser = TestUtils.populateAppuser(TestVariable.EXISTING_APPUSER_COMPLETE_PACKAGE);

        oauth = this.populateOauth();
        oauth.setAccountId("TWITTERID");
        oauth.setFkAppuserId(appuser);
        actualCreateUpdateResponse = instance.createOauth(TestVariable.ACCESS_TOKEN, TestVariable.LOGGED_APPUSER_WITH_COMPLETE_PACKAGE_FROM_EMPLOYEE, oauth);
        assertEquals("Should create new Oauth",
                CodeUtil.CREATE_OAUTH_SUCCESS, actualCreateUpdateResponse.getReturnCode());
    }

    @Test
    @TestSingleReport(description = ""
            + "Retrieve OauthList using EXISTING appuserId",
            expectations = ""
            + "Oauth retrieval must be successful. Expected return code = " + CodeUtil.RETRIEVE_OAUTH_SUCCESS)
    public void normalTestCreateUpdateRetrieveOauth() throws Exception {

        TestUtils.runDBScript();

        LOGGER.info("ajsjee TEST | Retrieve OauthList EXISTING appuserId");
        expectedOauthListResponse = new OauthListResponse();
        expectedOauthListResponse.setReturnCode(CodeUtil.RETRIEVE_OAUTH_SUCCESS);
        actualOauthListResponse = instance.findOauthListByAppuserId(TestVariable.ACCESS_TOKEN, TestVariable.LOGGED_APPUSER, TestVariable.EXISTING_APPUSER_ZERO_PACKAGE);
        assertEquals("Oauth retrieval must be successful",
                expectedOauthListResponse.getReturnCode(), actualOauthListResponse.getReturnCode());
        assertNotNull("Oauth Object must not be null", actualOauthListResponse.getLstOauth());
    }

    @Test
    @TestSingleReport(description = ""
            + "Create Oauth with NOT NULL oauthId",
            expectations = ""
            + "Should NOT create new Oauth. Expected return code = " + CodeUtil.INVALID_PARAMETER)
    public void errorTestCreateOauthCase1() throws Exception {
        LOGGER.info("ajsjee TEST | Create Oauth with NOT NULL oauthId");

        TestUtils.runDBScript();

        oauth = this.populateOauth();
        oauth.setPkOauthId(TestVariable.START_ID_OAUTH);
        actualCreateUpdateResponse = instance.createNewAccount(TestVariable.ACCESS_TOKEN, oauth);
        assertEquals("Should NOT create new Oauth ",
                CodeUtil.INVALID_PARAMETER, actualCreateUpdateResponse.getReturnCode());
    }

    @Test
    @TestSingleReport(description = ""
            + "Create Oauth with NULL appuserId",
            expectations = ""
            + "Should NOT create new Oauth. Expected return code = " + CodeUtil.INVALID_PARAMETER)
    public void errorTestCreateOauthCase3() throws Exception {
        LOGGER.info("ajsjee TEST | Create Oauth with NULL appuserId");

        TestUtils.runDBScript();

        oauth = this.populateOauth();
        appuser = TestUtils.populateAppuser(null);
        oauth.setFkAppuserId(appuser);
        actualCreateUpdateResponse = instance.createOauth(TestVariable.ACCESS_TOKEN, TestVariable.LOGGED_APPUSER, oauth);
        assertEquals("Should NOT create new Oauth ",
                CodeUtil.INVALID_PARAMETER, actualCreateUpdateResponse.getReturnCode());
    }

    // TOKEN TESTING
    @Test
    @TestSingleReport(description = ""
            + "Retrieve token code 1",
            expectations = ""
            + "Token retrieval must be successful. Expected return code = " + CodeUtil.RETRIEVE_TOKEN_SUCCESS)
    public void normalTestRetrieveTokenCode1() throws Exception {

        LOGGER.info("ajsjee TEST | Retrieve token code 1");
        expectedTokenResponse = new TokenResponse();
        expectedTokenResponse.setReturnCode(CodeUtil.RETRIEVE_TOKEN_SUCCESS);
        actualTokenResponse = instance.getToken(TestVariable.ACCESS_TOKEN, TestVariable.LOGGED_APPUSER, TestVariable.OAUTH_PROVIDER, TestVariable.ACCOUNT_ID, 1); // Code 1
        LOGGER.info("REVERSED TOKEN = " + actualTokenResponse.getToken());
        assertEquals("Oauth retrieval must be successful",
                expectedTokenResponse.getReturnCode(), actualTokenResponse.getReturnCode());

    }

    @Test
    @TestSingleReport(description = ""
            + "Retrieve token code 2",
            expectations = ""
            + "Token retrieval must be successful. Expected return code = " + CodeUtil.RETRIEVE_TOKEN_SUCCESS)
    public void normalTestRetrieveTokenCode2() {

        LOGGER.info("ajsjee TEST | Retrieve token code 2");
        expectedTokenResponse = new TokenResponse();
        expectedTokenResponse.setReturnCode(CodeUtil.RETRIEVE_TOKEN_SUCCESS);
        actualTokenResponse = instance.getToken(TestVariable.ACCESS_TOKEN, TestVariable.LOGGED_APPUSER, TestVariable.OAUTH_PROVIDER, TestVariable.ACCOUNT_ID, 2); // Code 1
        LOGGER.info("UUID  TOKEN = " + actualTokenResponse.getToken());
        assertEquals("Oauth retrieval must be successful",
                expectedTokenResponse.getReturnCode(), actualTokenResponse.getReturnCode());
    }

    private Oauth populateOauth() throws Exception {

        oauth = new Oauth();
        oauth.setFkAppuserId(appuser);
        oauth.setIsprimary(true);
        oauth.setOauthProvider("XX");

        return oauth;
    }
}
