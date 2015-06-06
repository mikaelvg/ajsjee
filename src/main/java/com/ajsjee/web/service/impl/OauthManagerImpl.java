/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ajsjee.web.service.impl;

import com.ajsjee.web.bean.response.AppuserResponse;
import com.ajsjee.web.bean.response.CreateUpdateResponse;
import com.ajsjee.web.bean.response.OauthListResponse;
import com.ajsjee.web.bean.response.OauthResponse;
import com.ajsjee.web.bean.response.ReturnCodeResponse;
import com.ajsjee.web.entity.Appuser;
import com.ajsjee.web.entity.Oauth;
import com.ajsjee.web.service.AbstractFacade;
import com.ajsjee.web.util.AccessUtil;
import com.ajsjee.web.util.CodeUtil;
import com.ajsjee.web.util.CommonUtil;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.apache.log4j.Logger;

/**
 *
 * @author Mikael Gulapa
 */
@Stateless
public class OauthManagerImpl extends AbstractFacade<Oauth> {

    @EJB
    AppuserManagerImpl appuserManagerImpl;

    private static final Logger LOGGER = Logger.getLogger(OauthManagerImpl.class);
    @PersistenceContext(unitName = "ajsjee.persistenceunit")
    private EntityManager em;

    public OauthManagerImpl() {
        super(Oauth.class);
    }

    public CreateUpdateResponse createNewAccount(String accessToken, Oauth oauth) {

        // LoginId is not required because its not existent
        // Id must be null and appuserId must not be null.
        if (oauth.getPkOauthId() != null || oauth.getFkAppuserId() == null || accessToken == null) {
            LOGGER.error("Not null oauthId or null appuser or null accessToken : "
                    + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        Appuser appuser = oauth.getFkAppuserId();

        if (appuser.getPkAppuserId() != null
                || appuser.getAccountEmail() == null
                || appuser.getFirstName() == null
                || appuser.getLastName() == null
                || appuser.getGender() == null) {
            LOGGER.error("Invalid appuser object : "
                    + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        if (!AccessUtil.validateTokenWithOAuthProvider(accessToken, oauth.getAccountId(), oauth.getOauthProvider())) {
            LOGGER.error("Unauthorized access : "
                    + " | " + CodeUtil.LOGIN_ERROR);
            return new CreateUpdateResponse(CodeUtil.LOGIN_ERROR);
        }

        // Bean completion
        appuser.setLastLogin(CommonUtil.getCurrentServerDate());
        appuser.setMembershipDate(CommonUtil.getCurrentServerDate());
        appuser.setAccountStatus(CodeUtil.ACTIVE_STATUS);

        oauth.setCreationDate(CommonUtil.getCurrentServerDate());
        oauth.setFkAppuserId(appuser);
        oauth.setIsprimary(true);

        // Validate against entity bean
        String strReturnMessage = CommonUtil.validateObject(oauth);
        if (strReturnMessage
                != null) {
            LOGGER.error("Validation error Message | " + strReturnMessage + " | "
                    + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        // Insert object
        try {
            super.create(oauth);
        } catch (Exception e) {
            String errorMessasge = e.getMessage();
            LOGGER.error("Catched error Message | " + errorMessasge + " | "
                    + CodeUtil.CREATE_OAUTH_ERROR);
            if (errorMessasge.contains("unq_appuser_accountemail")) {
                return new CreateUpdateResponse(CodeUtil.UNQ_APPUSER_ACCOUNTEMAIL_ERROR);
            } else if (errorMessasge.contains("unq_oauth_accountid_oauthprovider")) {
                return new CreateUpdateResponse(CodeUtil.UNQ_OAUTH_ACCOUNTID_ERROR);
            } else {
                return new CreateUpdateResponse(CodeUtil.CREATE_OAUTH_ERROR);
            }
        }

        Long oauthId = oauth.getPkOauthId();
        if (oauthId == null) {
            LOGGER.error("Error creating Oauth : "
                    + " | " + CodeUtil.CREATE_OAUTH_ERROR);
            return new CreateUpdateResponse(CodeUtil.CREATE_OAUTH_ERROR);
        } else {

            LOGGER.info("Success creating Oauth : "
                    + " | " + CodeUtil.CREATE_OAUTH_SUCCESS);
            return new CreateUpdateResponse(oauthId, CodeUtil.CREATE_OAUTH_SUCCESS);
        }
    }

    public CreateUpdateResponse createOauth(String accessToken, Long loginId, Oauth oauth) {

        // LoginId is required for all create/update/delete
        if (loginId == null) {
            LOGGER.error("Null loginId | "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        // Id must be null and appuserId must not be null.
        if (oauth.getPkOauthId() != null || oauth.getFkAppuserId() == null || oauth.getFkAppuserId().getPkAppuserId() == null || accessToken == null) {
            LOGGER.error("Not null oauthId or null appuserId or null accessToken : "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        if (!AccessUtil.validateTokenWithOAuthProvider(accessToken, oauth.getAccountId(), oauth.getOauthProvider())) {
            LOGGER.error("Unauthorized access : "
                    + loginId + " | " + CodeUtil.LOGIN_ERROR);
            return new CreateUpdateResponse(CodeUtil.LOGIN_ERROR);
        }

        // Bean completion
        Appuser appuser;
        AppuserResponse appuserResponseFromDb = appuserManagerImpl.findAppuser(loginId, oauth.getFkAppuserId().getPkAppuserId());
        if (appuserResponseFromDb.getReturnCode() == CodeUtil.RETRIEVE_APPUSER_SUCCESS) {
            appuser = appuserResponseFromDb.getAppuser();
        } else {
            LOGGER.error("Invalid appuser : "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        oauth.setCreationDate(CommonUtil.getCurrentServerDate());
        oauth.setFkAppuserId(appuser);

        // Validate against entity bean
        String strReturnMessage = CommonUtil.validateObject(oauth);
        if (strReturnMessage != null) {
            LOGGER.error("Validation error Message | " + strReturnMessage + " | "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        // Insert object
        try {
            super.create(oauth);
        } catch (Exception e) {
            String errorMessasge = e.getMessage();
            LOGGER.error("Catched error Message | " + errorMessasge + " | "
                    + loginId + " | " + CodeUtil.CREATE_OAUTH_ERROR);
            if (errorMessasge.contains("unq_appuser_accountemail")) {
                return new CreateUpdateResponse(CodeUtil.UNQ_APPUSER_ACCOUNTEMAIL_ERROR);
            } else if (errorMessasge.contains("unq_oauth_accountid_oauthprovider")) {
                return new CreateUpdateResponse(CodeUtil.UNQ_OAUTH_ACCOUNTID_ERROR);
            } else {
                return new CreateUpdateResponse(CodeUtil.CREATE_OAUTH_ERROR);
            }
        }

        Long oauthId = oauth.getPkOauthId();
        if (oauthId == null) {
            LOGGER.error("Error creating Oauth : "
                    + loginId + " | " + CodeUtil.CREATE_OAUTH_ERROR);
            return new CreateUpdateResponse(CodeUtil.CREATE_OAUTH_ERROR);
        } else {
            LOGGER.info("Success creating Oauth : "
                    + loginId + " | " + CodeUtil.CREATE_OAUTH_SUCCESS);
            return new CreateUpdateResponse(oauthId, CodeUtil.CREATE_OAUTH_SUCCESS);
        }
    }

    public OauthListResponse findOauthListByAppuserId(String accessToken, Long loginId, Long appuserId) {

        if (loginId == null || loginId == 0) {
            loginId = CodeUtil.DEFAULT_LOGINID;
        }

        if (appuserId == null) {
            LOGGER.error("Null appuserId | "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new OauthListResponse(CodeUtil.INVALID_PARAMETER);
        }

        if (!AccessUtil.validateToken()) {
            LOGGER.error("Unauthorized access : "
                    + loginId + " | " + CodeUtil.LOGIN_ERROR);
            return new OauthListResponse(CodeUtil.LOGIN_ERROR);
        }

        List<Oauth> lstOauth = super.findByKeyPairValue("pkAppuserId", appuserId, "Oauth.findByPkAppuserId");

        if (lstOauth == null) {
            LOGGER.warn("Null Oauth : "
                    + loginId + " | " + CodeUtil.RETRIEVE_OAUTH_ERROR);
            return new OauthListResponse(CodeUtil.RETRIEVE_OAUTH_ERROR);
        } else {
            LOGGER.info("Success Oauth : "
                    + loginId + " | " + CodeUtil.RETRIEVE_OAUTH_SUCCESS);
            return new OauthListResponse(lstOauth, CodeUtil.RETRIEVE_OAUTH_SUCCESS);
        }
    }

    public OauthResponse findOauthByAccountId(String accountId) {

        if (accountId == null) {
            LOGGER.error("Null AccountId | "
                    + " | " + CodeUtil.INVALID_PARAMETER);
            return new OauthResponse(CodeUtil.INVALID_PARAMETER);
        }

        List<Oauth> lstOauth = super.findByKeyPairValue("accountId", accountId, "Oauth.findByAccountId");

        if (lstOauth == null) {
            LOGGER.warn("Null Oauth : "
                    + " | " + CodeUtil.RETRIEVE_OAUTH_ERROR);
            return new OauthResponse(CodeUtil.RETRIEVE_OAUTH_ERROR);
        } else {
            LOGGER.info("Success Oauth : "
                    + " | " + CodeUtil.RETRIEVE_OAUTH_SUCCESS);
            return new OauthResponse(lstOauth.get(0), CodeUtil.RETRIEVE_OAUTH_SUCCESS);
        }
    }

    public ReturnCodeResponse removeOauth(String accessToken, Long loginId, String oauthProvider, String accountId, Long oauthId) {

        // LoginId is required for all create/update/delete
        if (loginId == null) {
            LOGGER.error("Null loginId | "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new ReturnCodeResponse(CodeUtil.INVALID_PARAMETER);
        }

        //ID Checking must not be null
        if (oauthId == null) {
            LOGGER.error("Null oauthId | "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new ReturnCodeResponse(CodeUtil.INVALID_PARAMETER);
        }

        if (!AccessUtil.validateTokenWithOAuthProvider(accessToken, accountId, oauthProvider)) {
            LOGGER.error("Unauthorized access : "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new ReturnCodeResponse(CodeUtil.INVALID_PARAMETER);
        }

        // Check if ID if exist and get the rest of the data
        Oauth oauth = super.find(oauthId);
        if (oauth == null) {
            LOGGER.error("oauthId : " + oauthId + " do not exist | "
                    + loginId + " | " + CodeUtil.DO_NOT_EXIST_OAUTH_ERROR);
            return new ReturnCodeResponse(CodeUtil.DO_NOT_EXIST_OAUTH_ERROR);
        }

        // Bean completion
        Appuser appuser;
        AppuserResponse appuserResponseFromDb = appuserManagerImpl.findAppuser(loginId, oauth.getFkAppuserId().getPkAppuserId());
        if (appuserResponseFromDb.getReturnCode() == CodeUtil.RETRIEVE_APPUSER_SUCCESS) {
            appuser = appuserResponseFromDb.getAppuser();
        } else {
            LOGGER.error("Invalid appuser : "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new ReturnCodeResponse(CodeUtil.INVALID_PARAMETER);
        }

        try {
            super.remove(oauth);
        } catch (Exception e) {
            LOGGER.error("Catched error Message | " + e.getMessage() + " | "
                    + loginId + " | " + CodeUtil.DELETE_OAUTH_ERROR, e);
            return new ReturnCodeResponse(CodeUtil.DELETE_OAUTH_ERROR);
        }

        LOGGER.info("Success Oauth deletion : "
                + loginId + " | " + CodeUtil.DELETE_OAUTH_SUCCESS);
        return new ReturnCodeResponse(CodeUtil.DELETE_OAUTH_SUCCESS);
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
}
