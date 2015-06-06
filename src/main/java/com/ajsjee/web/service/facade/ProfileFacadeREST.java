/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ajsjee.web.service.facade;

import com.ajsjee.web.bean.response.CreateUpdateResponse;
import com.ajsjee.web.bean.response.ProfileResponse;
import com.ajsjee.web.entity.Profile;
import com.ajsjee.web.service.impl.ProfileManagerImpl;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

/**
 *
 * @author Mikael Gulapa
 */
@Stateless
@Path("rest.profile")
public class ProfileFacadeREST {

    @EJB
    ProfileManagerImpl profileManagerImpl;

    public ProfileFacadeREST() {
    }

    @POST
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public CreateUpdateResponse createProfile(@HeaderParam("Authorization") String accessToken, @HeaderParam("loginId") Long loginId, @HeaderParam("oauthProvider") String oauthProvider, @HeaderParam("accountId") String accountId, Profile profile) {
        return profileManagerImpl.createProfile(accessToken, loginId, oauthProvider, accountId, profile);
    }

    @PUT
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public CreateUpdateResponse updateProfile(@HeaderParam("Authorization") String accessToken, @HeaderParam("loginId") Long loginId, @HeaderParam("oauthProvider") String oauthProvider, @HeaderParam("accountId") String accountId, Profile profile) {
        return profileManagerImpl.updateProfile(accessToken, loginId, oauthProvider, accountId, profile);
    }

    @GET
    @Path("appuser/{appuserId}")
    @Produces({"application/json"})
    public ProfileResponse findProfileByAppuserId(@HeaderParam("loginId") Long loginId, @PathParam("appuserId") Long appuserId) {
        return profileManagerImpl.findProfileByAppuserId(loginId, appuserId);
    }

    @GET
    @Path("urlid/{urlId}")
    @Produces({"application/json"})
    public ProfileResponse findProfileByUrlId(@PathParam("urlId") String urlId) {
        return profileManagerImpl.findProfileByUrlId(urlId);
    }

    @GET
    @Path("{profileId}")
    @Produces({"application/json"})
    public ProfileResponse findProfile(@HeaderParam("loginId") Long loginId, @PathParam("profileId") Long profileId) {
        return profileManagerImpl.findProfile(loginId, profileId);
    }
}
