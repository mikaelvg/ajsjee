package com.ajsjee.web.service.impl;

import com.ajsjee.web.bean.response.AccountResponse;
import com.ajsjee.web.bean.response.AppuserResponse;
import com.ajsjee.web.bean.response.ProfileResponse;
import com.ajsjee.web.util.AccessUtil;
import com.ajsjee.web.util.CodeUtil;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import org.apache.log4j.Logger;

/**
 *
 * @author Mikael Gulapa
 */
@Stateless
public class AccountManagerImpl {
    @EJB
    AppuserManagerImpl appuserManagerImpl;

    @EJB
    ProfileManagerImpl profileManagerImpl;

    private static final Logger LOGGER = Logger.getLogger(AccountManagerImpl.class);

    public AccountManagerImpl() {
    }

    public AccountResponse getAccountDetails(String accessToken, Long loginId, Long appuserId) {

        if (appuserId == null) {
            LOGGER.error("Null appuserId : "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new AccountResponse(CodeUtil.INVALID_PARAMETER);
        }

        if (loginId == null || loginId == 0) {
            loginId = CodeUtil.DEFAULT_LOGINID;
        } else {
            if (accessToken == null) {
                LOGGER.error("Null accessToken : "
                        + loginId + " | " + CodeUtil.INVALID_PARAMETER);
                return new AccountResponse(CodeUtil.INVALID_PARAMETER);
            }

            if (!AccessUtil.validateToken()) {
                LOGGER.error("Unauthorized access : "
                        + loginId + " | " + CodeUtil.LOGIN_ERROR);
                return new AccountResponse(CodeUtil.LOGIN_ERROR);
            }
        }

        AppuserResponse appuserResponse = appuserManagerImpl.findAppuser(loginId, appuserId);
        if (appuserResponse.getReturnCode() == CodeUtil.RETRIEVE_APPUSER_ERROR) {
            LOGGER.error(appuserId + " Do not exist : "
                    + loginId + " | " + CodeUtil.DO_NOT_EXIST_APPUSER_ERROR);
            return new AccountResponse(CodeUtil.DO_NOT_EXIST_APPUSER_ERROR);
        }

        ProfileResponse profileResponse = profileManagerImpl.findProfileByAppuserId(loginId, appuserId);
        if (profileResponse.getReturnCode() == CodeUtil.RETRIEVE_PROFILE_ERROR) {
            LOGGER.warn("No Profile : " + loginId);
            return new AccountResponse(appuserResponse.getAppuser(), CodeUtil.RETRIEVE_ACCOUNT_SUCCESS);
        } else if (profileResponse.getReturnCode() == CodeUtil.RETRIEVE_PROFILE_ERROR) {
            LOGGER.warn("No Profile : " + loginId);
            return new AccountResponse(appuserResponse.getAppuser(), CodeUtil.RETRIEVE_ACCOUNT_SUCCESS);
        }

        // This code should be unreacheable
        return new AccountResponse(CodeUtil.RETRIEVE_ACCOUNT_ERROR);
    }
}
