/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ajsjee.web.service.impl;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import com.ajsjee.web.bean.response.AppuserResponse;
import com.ajsjee.web.bean.response.CreateUpdateResponse;
import com.ajsjee.web.entity.Appuser;
import com.ajsjee.web.service.AbstractFacade;
import com.ajsjee.web.util.AccessUtil;
import org.apache.log4j.Logger;
import com.ajsjee.web.util.CommonUtil;
import com.ajsjee.web.util.CodeUtil;
import java.util.Objects;

/**
 *
 * @author Mikael Gulapa
 */
@Stateless
public class AppuserManagerImpl extends AbstractFacade<Appuser> {

    private static final Logger LOGGER = Logger.getLogger(AppuserManagerImpl.class);
    @PersistenceContext(unitName = "ajsjee.persistenceunit")
    private EntityManager em;

    public AppuserManagerImpl() {
        super(Appuser.class);
    }

    public CreateUpdateResponse createAppuser(String accessToken, Appuser appuser) {

        if (appuser.getPkAppuserId() != null) {
            LOGGER.error("Not appuserId : "
                    + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        // Id must be null and appuserId must not be null.
        if (accessToken == null) {
            LOGGER.error("Null accessToken : "
                    + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        // Bean completion
        appuser.setMembershipDate(CommonUtil.getCurrentServerDate());
        appuser.setLastLogin(CommonUtil.getCurrentServerDate());

        if (!AccessUtil.validateToken()) {
            LOGGER.error("Unauthorized access : "
                    + " | " + CodeUtil.CREATE_APPUSER_ERROR);
            return new CreateUpdateResponse(CodeUtil.CREATE_APPUSER_ERROR);
        }

        // Validate against entity bean
        String strReturnMessage = CommonUtil.validateObject(appuser);
        if (strReturnMessage != null) {
            LOGGER.error("Validation error Message : " + strReturnMessage + " | "
                    + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        // Insert object
        try {
            super.create(appuser);
        } catch (Exception e) {
            String errorMessasge = e.getMessage();
            LOGGER.error("Catched error Message : " + errorMessasge
                    + " | " + CodeUtil.CREATE_APPUSER_ERROR, e);
            if (errorMessasge.contains("unq_appuser_accountemail")) {
                return new CreateUpdateResponse(CodeUtil.UNQ_APPUSER_ACCOUNTEMAIL_ERROR);
            } else {
                return new CreateUpdateResponse(CodeUtil.CREATE_APPUSER_ERROR);
            }
        }

        Long appuserId = appuser.getPkAppuserId();
        if (appuserId == null) {
            LOGGER.error("Error creating Appuser : "
                    + " | " + CodeUtil.CREATE_APPUSER_ERROR);
            return new CreateUpdateResponse(CodeUtil.CREATE_APPUSER_ERROR);
        } else {
            LOGGER.info("Success creating Appuser : "
                    + " | " + CodeUtil.CREATE_APPUSER_SUCCESS);
            return new CreateUpdateResponse(appuserId, CodeUtil.CREATE_APPUSER_SUCCESS);
        }
    }

    public CreateUpdateResponse updateAppuser(String accessToken, Long loginId, String oauthProvider, String accountId, Appuser appuser) {

        // LoginId is required for all create/update/delete
        if (loginId == null) {
            LOGGER.error("Null loginId | "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        // Id must not be null
        if (appuser.getPkAppuserId() == null || accessToken == null) {
            LOGGER.error("Null appuserId or accessToken : "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        if (!AccessUtil.validateTokenWithOAuthProvider(accessToken, accountId, oauthProvider)) {
            LOGGER.error("Unauthorized access : "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        // Validate against entity bean
        String strReturnMessage = CommonUtil.validateObject(appuser);
        if (strReturnMessage != null) {
            LOGGER.error("Validation error Message : " + strReturnMessage + " | "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        //Check if appuser exist
        Appuser appuserFromDb = super.find(appuser.getPkAppuserId());
        if (appuserFromDb == null) {
            LOGGER.error("appuser Id : " + appuser.getPkAppuserId() + " do not exist | "
                    + loginId + " | " + CodeUtil.DO_NOT_EXIST_APPUSER_ERROR);
            return new CreateUpdateResponse(CodeUtil.DO_NOT_EXIST_APPUSER_ERROR);
        }

        if (!Objects.equals(appuser.getPkAppuserId(), appuserFromDb.getPkAppuserId())) {
            LOGGER.error("Invalid appuser : "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        appuser.setMembershipDate(appuserFromDb.getMembershipDate());
//        appuser.setAccountStatus(appuserFromDb.getAccountStatus());

        // Update appuser details
        try {
            super.edit(appuser);
        } catch (Exception e) {
            String errorMessasge = e.getMessage();
            LOGGER.error("Catched error Message | " + errorMessasge + " : "
                    + loginId + " | " + CodeUtil.UPDATE_APPUSER_ERROR, e);
            if (errorMessasge.contains("unq_appuser_accountemail")) {
                return new CreateUpdateResponse(CodeUtil.UNQ_APPUSER_ACCOUNTEMAIL_ERROR);
            } else {
                return new CreateUpdateResponse(CodeUtil.UPDATE_APPUSER_ERROR);
            }
        }

        Long appuserId = appuser.getPkAppuserId();
        if (appuserId == null) {
            LOGGER.error("Error updating Appuser : "
                    + loginId + " | " + CodeUtil.UPDATE_APPUSER_ERROR);
            return new CreateUpdateResponse(CodeUtil.UPDATE_APPUSER_ERROR);
        } else {
            LOGGER.info("Success updating Appuser : "
                    + loginId + " | " + CodeUtil.UPDATE_APPUSER_SUCCESS);
            return new CreateUpdateResponse(appuserId, CodeUtil.UPDATE_APPUSER_SUCCESS);
        }
    }

    public AppuserResponse findAppuser(Long loginId, Long appuserId) {

        if (loginId == null || loginId == 0) {
            loginId = CodeUtil.DEFAULT_LOGINID;
        }

        if (appuserId == null) {
            LOGGER.error("Null appuserId : "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new AppuserResponse(CodeUtil.INVALID_PARAMETER);
        }

        Appuser appuser = super.find(appuserId);
        if (appuser == null) {
            LOGGER.error("Null Appuser return : "
                    + loginId + " | " + CodeUtil.RETRIEVE_APPUSER_ERROR);
            return new AppuserResponse(appuser, CodeUtil.RETRIEVE_APPUSER_ERROR);
        } else {
            LOGGER.info("Success Appuser return :: "
                    + loginId + " | " + CodeUtil.RETRIEVE_APPUSER_SUCCESS);
            return new AppuserResponse(appuser, CodeUtil.RETRIEVE_APPUSER_SUCCESS);
        }
    }

    public CreateUpdateResponse updateLastLoginAppuser(Appuser appuser) {

        Appuser appuserNew = appuser;
        appuserNew.setLastLogin(CommonUtil.getCurrentServerDate());

        // Update appuser last login
        try {
            super.edit(appuserNew);
        } catch (Exception e) {
            String errorMessasge = e.getMessage();
            LOGGER.error("Catched error Message | " + errorMessasge + " : "
                    + appuser.getPkAppuserId() + " | " + CodeUtil.UPDATE_APPUSER_ERROR, e);
            return new CreateUpdateResponse(CodeUtil.UPDATE_APPUSER_ERROR);
        }

        Long appuserId = appuserNew.getPkAppuserId();
        if (appuserId == null) {
            LOGGER.error("Error updating Appuser : "
                    + appuser.getPkAppuserId() + " | " + CodeUtil.UPDATE_APPUSER_ERROR);
            return new CreateUpdateResponse(CodeUtil.UPDATE_APPUSER_ERROR);
        } else {
            LOGGER.info("Success updating Appuser : "
                    + appuser.getPkAppuserId() + " | " + CodeUtil.UPDATE_APPUSER_SUCCESS);
            return new CreateUpdateResponse(appuserId, CodeUtil.UPDATE_APPUSER_SUCCESS);
        }
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
}
