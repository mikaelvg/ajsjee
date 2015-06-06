/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ajsjee.web.service.impl;

import com.ajsjee.web.bean.response.CreateUpdateResponse;
import com.ajsjee.web.bean.response.ProfileResponse;
import com.ajsjee.web.entity.Profile;
import com.ajsjee.web.service.AbstractFacade;
import com.ajsjee.web.util.AccessUtil;
import com.ajsjee.web.util.CodeUtil;
import com.ajsjee.web.util.CommonUtil;
import java.util.List;
import java.util.Objects;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.apache.log4j.Logger;

/**
 *
 * @author Mikael Gulapa
 */
@Stateless
public class ProfileManagerImpl extends AbstractFacade<Profile> {

    private static final Logger LOGGER = Logger.getLogger(ProfileManagerImpl.class);
    @PersistenceContext(unitName = "ajsjee.persistenceunit")
    private EntityManager em;

    public ProfileManagerImpl() {
        super(Profile.class);
    }

    public CreateUpdateResponse createProfile(String accessToken, Long loginId, String oauthProvider, String accountId, Profile profile) {

        // LoginId is required for all create/update/delete
        if (loginId == null) {
            LOGGER.error("Null loginId | "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        // Id must be null and appuserId must not be null.
        if (profile.getPkProfileId() != null || profile.getFkAppuserId() == null || profile.getFkAppuserId().getPkAppuserId() == null || accessToken == null) {
            LOGGER.error("Not null profileId or null appuserId or null accessToken : "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        if (!AccessUtil.validateTokenWithOAuthProvider(accessToken, accountId, oauthProvider)) {
            LOGGER.error("Unauthorized access : "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        // Bean completion
        //profile.setCreationDate(CommonUtil.getCurrentServerDate());
        // Validate against entity bean
        String strReturnMessage = CommonUtil.validateObject(profile);
        if (strReturnMessage != null) {
            LOGGER.error("Validation error Message | " + strReturnMessage + " | "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        // Insert object
        try {
            super.create(profile);
        } catch (Exception e) {
            String errorMessasge = e.getMessage();
            LOGGER.error("Catched error Message | " + errorMessasge + " | "
                    + loginId + " | " + CodeUtil.CREATE_PROFILE_ERROR);
            if (errorMessasge.contains("unq_profile_fkappuser")) {
                return new CreateUpdateResponse(CodeUtil.UNQ_PROFILE_FKAPPUSER_ERROR);
            } else if (errorMessasge.contains("unq_profile_urlid")) {
                return new CreateUpdateResponse(CodeUtil.UNQ_PROFILE_URLID_ERROR);
            } else if (errorMessasge.contains("unq_profile_mobilenumber")) {
                return new CreateUpdateResponse(CodeUtil.UNQ_PROFILE_MOBILENUMBER_ERROR);
            } else if (errorMessasge.contains("unq_profile_landline")) {
                return new CreateUpdateResponse(CodeUtil.UNQ_PROFILE_LANDLINE_ERROR);
            } else if (errorMessasge.contains("unq_profile_businessemail")) {
                return new CreateUpdateResponse(CodeUtil.UNQ_PROFILE_BUSINESSEMAIL_ERROR);
            } else {
                return new CreateUpdateResponse(CodeUtil.CREATE_PROFILE_ERROR);
            }
        }

        Long profileId = profile.getPkProfileId();
        if (profileId == null) {
            LOGGER.error("Error creating Profile : "
                    + loginId + " | " + CodeUtil.CREATE_PROFILE_ERROR);
            return new CreateUpdateResponse(CodeUtil.CREATE_PROFILE_ERROR);
        } else {
            LOGGER.info("Success creating Profile : "
                    + loginId + " | " + CodeUtil.CREATE_PROFILE_SUCCESS);
            return new CreateUpdateResponse(profileId, CodeUtil.CREATE_PROFILE_SUCCESS);
        }
    }

    public CreateUpdateResponse updateProfile(String accessToken, Long loginId, String oauthProvider, String accountId, Profile profile) {

        // LoginId is required for all create/update/delete
        if (loginId == null) {
            LOGGER.error("Null loginId | "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        // Id must not be null
        if (profile.getPkProfileId() == null || profile.getFkAppuserId() == null || profile.getFkAppuserId().getPkAppuserId() == null || accessToken == null) {
            LOGGER.error("Not null profileId or null appuserId or null accessToken : "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        if (!AccessUtil.validateTokenWithOAuthProvider(accessToken, accountId, oauthProvider)) {
            LOGGER.error("Unauthorized access : "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        //Check if profile exist
        Profile profileFromDb = super.find(profile.getPkProfileId());
        if (profileFromDb == null) {
            LOGGER.error("profileId : " + profile.getPkProfileId() + " with appuserId : " + profile.getFkAppuserId().getPkAppuserId() + " do not exist | "
                    + loginId + " | " + CodeUtil.DO_NOT_EXIST_PROFILE_ERROR);
            return new CreateUpdateResponse(CodeUtil.DO_NOT_EXIST_PROFILE_ERROR);
        }

        if (!Objects.equals(profileFromDb.getFkAppuserId().getPkAppuserId(), profile.getFkAppuserId().getPkAppuserId())) {
            LOGGER.error("Invalid appuser : "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        // Bean completion
        //profile.setCreationDate(profileFromDb.getCreationDate());
        // Validate against entity bean
        String strReturnMessage = CommonUtil.validateObject(profile);
        if (strReturnMessage != null) {
            LOGGER.error("Validation error Message : " + strReturnMessage + " | "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new CreateUpdateResponse(CodeUtil.INVALID_PARAMETER);
        }

        // Update profile details
        try {
            super.edit(profile);
        } catch (Exception e) {
            String errorMessasge = e.getMessage();
            LOGGER.error("Catched error Message | " + errorMessasge + " | "
                    + loginId + " | " + CodeUtil.CREATE_PROFILE_ERROR);
            if (errorMessasge.contains("unq_profile_fkappuser")) {
                return new CreateUpdateResponse(CodeUtil.UNQ_PROFILE_FKAPPUSER_ERROR);
            } else if (errorMessasge.contains("unq_profile_urlid")) {
                return new CreateUpdateResponse(CodeUtil.UNQ_PROFILE_URLID_ERROR);
            } else if (errorMessasge.contains("unq_profile_mobilenumber")) {
                return new CreateUpdateResponse(CodeUtil.UNQ_PROFILE_MOBILENUMBER_ERROR);
            } else if (errorMessasge.contains("unq_profile_landline")) {
                return new CreateUpdateResponse(CodeUtil.UNQ_PROFILE_LANDLINE_ERROR);
            } else if (errorMessasge.contains("unq_profile_businessemail")) {
                return new CreateUpdateResponse(CodeUtil.UNQ_PROFILE_BUSINESSEMAIL_ERROR);
            } else {
                return new CreateUpdateResponse(CodeUtil.CREATE_PROFILE_ERROR);
            }
        }

        Long profileId = profile.getPkProfileId();
        if (profileId == null) {
            LOGGER.error("Error updating Profile : "
                    + loginId + " | " + CodeUtil.UPDATE_PROFILE_ERROR);
            return new CreateUpdateResponse(CodeUtil.UPDATE_PROFILE_ERROR);
        } else {
            LOGGER.info("Success updating Profile : "
                    + loginId + " | " + CodeUtil.UPDATE_PROFILE_SUCCESS);
            return new CreateUpdateResponse(profileId, CodeUtil.UPDATE_PROFILE_SUCCESS);
        }
    }

    public ProfileResponse findProfileByAppuserId(Long loginId, Long appuserId) {

        if (loginId == null || loginId == 0) {
            loginId = CodeUtil.DEFAULT_LOGINID;
        }

        if (appuserId == null) {
            LOGGER.error("Null appuserId | "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new ProfileResponse(CodeUtil.INVALID_PARAMETER);
        }

        List<Profile> lstProfile = super.findByKeyPairValue("pkAppuserId", appuserId, "Profile.findByPkAppuserId");

        if (lstProfile == null) {
            LOGGER.warn("Null Profile : "
                    + loginId + " | " + CodeUtil.RETRIEVE_PROFILE_ERROR);
            return new ProfileResponse(CodeUtil.RETRIEVE_PROFILE_ERROR);
        } else {
            LOGGER.info("Success Profile : "
                    + loginId + " | " + CodeUtil.RETRIEVE_PROFILE_SUCCESS);
            return new ProfileResponse(lstProfile.get(0), CodeUtil.RETRIEVE_PROFILE_SUCCESS);
        }
    }

    public ProfileResponse findProfileByUrlId(String urlId) {

        if (urlId == null) {
            LOGGER.error("Null urlId | "
                    + urlId + " | " + CodeUtil.INVALID_PARAMETER);
            return new ProfileResponse(CodeUtil.INVALID_PARAMETER);
        }

        List<Profile> lstProfile = super.findByKeyPairValue("urlId", urlId, "Profile.findByUrlId");

        if (lstProfile == null) {
            LOGGER.warn("Null Profile : "
                    + urlId + " | " + CodeUtil.RETRIEVE_PROFILE_ERROR);
            return new ProfileResponse(CodeUtil.RETRIEVE_PROFILE_ERROR);
        } else {
            LOGGER.info("Success Profile : "
                    + urlId + " | " + CodeUtil.RETRIEVE_PROFILE_SUCCESS);
            return new ProfileResponse(lstProfile.get(0), CodeUtil.RETRIEVE_PROFILE_SUCCESS);
        }
    }

    public ProfileResponse findProfile(Long loginId, Long profileId) {

        if (loginId == null || loginId == 0) {
            loginId = CodeUtil.DEFAULT_LOGINID;
        }

        if (profileId == null) {
            LOGGER.error("profileId is empty : "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new ProfileResponse(CodeUtil.INVALID_PARAMETER);
        }

        Profile profile = super.find(profileId);
        if (profile == null) {
            LOGGER.warn("Null Profile : "
                    + loginId + " | " + CodeUtil.RETRIEVE_PROFILE_ERROR);
            return new ProfileResponse(profile, CodeUtil.RETRIEVE_PROFILE_ERROR);
        } else {
            LOGGER.info("Success Profile : "
                    + loginId + " | " + CodeUtil.RETRIEVE_PROFILE_SUCCESS);
            return new ProfileResponse(profile, CodeUtil.RETRIEVE_PROFILE_SUCCESS);
        }
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
}
