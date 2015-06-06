package com.ajsjee.web.service.impl;

import com.ajsjee.web.bean.request.LoginRequest;
import com.ajsjee.web.bean.response.CreateUpdateResponse;
import com.ajsjee.web.bean.response.LoginResponse;
import com.ajsjee.web.bean.response.OauthResponse;
import com.ajsjee.web.entity.Appuser;
import com.ajsjee.web.entity.Profile;
import com.ajsjee.web.util.AccessUtil;
import com.ajsjee.web.util.CodeUtil;
import com.ajsjee.web.util.CommonUtil;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import org.apache.log4j.Logger;

/**
 *
 * @author Mikael Gulapa
 */
@Stateless
public class LoginManagerImpl {

    private static final Logger LOGGER = Logger.getLogger(LoginManagerImpl.class);

    @EJB
    AppuserManagerImpl appuserManagerImpl;

    @EJB
    OauthManagerImpl oauthManagerImpl;

    @EJB
    ProfileManagerImpl profileManagerImpl;

    public LoginManagerImpl() {
    }

    public LoginResponse authenticateUser(LoginRequest loginRequest, String accessToken) {

        if (accessToken == null) {
            LOGGER.error("Null Access Token | "
                    + CodeUtil.INVALID_PARAMETER);
            return new LoginResponse(CommonUtil.getCurrentServerDate(), CodeUtil.INVALID_PARAMETER);
        }

        // FB ID or AccountId is required
        if (loginRequest.getAccountId() == null || loginRequest.getOauthProvider() == null) {
            LOGGER.error("Null accountId or oauthProvider | "
                    + CodeUtil.INVALID_PARAMETER);
            return new LoginResponse(CommonUtil.getCurrentServerDate(), CodeUtil.INVALID_PARAMETER);
        }

        // Ensure that the Token and AppID matches.
        String accountId = loginRequest.getAccountId();
        if (!AccessUtil.validateTokenWithOAuthProvider(accessToken, accountId, loginRequest.getOauthProvider())) {
            LOGGER.error("Unauthorized access : "
                    + accountId + " | " + CodeUtil.LOGIN_ERROR);
            return new LoginResponse(CommonUtil.getCurrentServerDate(), CodeUtil.LOGIN_ERROR);
        }

        // Get the Appuser object using accountId as the search criteria.
        /*
         List<Appuser> lstAppuser = appuserManagerImpl.findByKeyPairValue("accountId", accountId, "Appuser.findByAccountId");
         if (lstAppuser == null) {
         LOGGER.error("AccountId : " + accountId + " | "
         + CodeUtil.RETRIEVE_APPUSER_ERROR);
         return new LoginResponse(CodeUtil.RETRIEVE_APPUSER_ERROR);
         }*/
        OauthResponse oauthResponse = oauthManagerImpl.findOauthByAccountId(accountId);
        if (oauthResponse.getReturnCode() == CodeUtil.RETRIEVE_OAUTH_ERROR) {
            LOGGER.error("Retrieve Oauth Error : "
                    + accountId + " | " + CodeUtil.RETRIEVE_OAUTH_ERROR);
            return new LoginResponse(CommonUtil.getCurrentServerDate(), CodeUtil.RETRIEVE_OAUTH_ERROR);
        }

        // Validate  the status of the user. e.g. Janet Napoles is a Blocked user.
        Appuser appuser = oauthResponse.getOauth().getFkAppuserId();
        int intReturnCode = validateUser(appuser);
        if (validateUser(appuser) == CodeUtil.VALIDATE_APPUSER_BLOCKED
                || validateUser(appuser) == CodeUtil.GENERIC_ERROR) {
            LOGGER.error("Invalid User : "
                    + appuser.getPkAppuserId() + " | "
                    + intReturnCode);
            return new LoginResponse(CommonUtil.getCurrentServerDate(), intReturnCode);
        } else {
            CreateUpdateResponse createUpdateResponse = appuserManagerImpl.updateLastLoginAppuser(appuser);
            if (createUpdateResponse.getReturnCode() == CodeUtil.UPDATE_APPUSER_ERROR) {
                LOGGER.error("Error update appuser last login : "
                        + appuser.getPkAppuserId() + " | " + CodeUtil.UPDATE_APPUSER_ERROR);
            }
            Profile profile = profileManagerImpl.find(appuser.getProfileId());
            if (profile != null) {
                    return new LoginResponse(appuser, profile.getPkProfileId(), profile.getProfilePicture(), CommonUtil.getCurrentServerDate(), CodeUtil.LOGIN_SUCCESS);
            } else {
                LOGGER.info("No profile : "
                        + appuser.getPkAppuserId() + " | "
                        + CodeUtil.LOGIN_SUCCESS);
                return new LoginResponse(appuser, CommonUtil.getCurrentServerDate(), CodeUtil.LOGIN_SUCCESS);
            }
        }
    }

    private int validateUser(Appuser appuser) {

        int intReturnCode;
        switch (appuser.getAccountStatus()) {
            case 0:
                intReturnCode = CodeUtil.VALIDATE_APPUSER_ACTIVE;
                LOGGER.info(appuser.getPkAppuserId() + " | " + intReturnCode);
                break;

            case 1:
                intReturnCode = CodeUtil.VALIDATE_APPUSER_NOT_AVAILABLE;
                LOGGER.info(appuser.getPkAppuserId() + " | " + intReturnCode);
                break;

            case 2:
                intReturnCode = CodeUtil.VALIDATE_APPUSER_DEACTIVATE;
                LOGGER.info(appuser.getPkAppuserId() + " | " + intReturnCode);
                break;

            case 3:
                intReturnCode = CodeUtil.VALIDATE_APPUSER_BLOCKED;
                LOGGER.info(appuser.getPkAppuserId() + " | " + intReturnCode);
                break;

            default:
                intReturnCode = CodeUtil.GENERIC_ERROR;
                LOGGER.info("validateUser error | " + intReturnCode);
        }
        return intReturnCode;
    }

    private void updateLoginDetails(Appuser appuser) {

        // in case of error, no big deal
        //appuser.setLastLogin(CommonUtil.getCurrentServerDate());
        //appUserManagerImpl.edit(appuser);
        // This should be asych
    }
}
