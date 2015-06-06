/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ajsjee.web.service.facade;

import com.ajsjee.web.bean.response.CreateUpdateResponse;
import com.ajsjee.web.bean.response.OauthListResponse;
import com.ajsjee.web.bean.response.ReturnCodeResponse;
import com.ajsjee.web.bean.response.TokenResponse;
import com.ajsjee.web.entity.Oauth;
import com.ajsjee.web.service.impl.OauthManagerImpl;
import com.ajsjee.web.service.impl.TokenManagerImpl;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

/**
 *
 * @author Mikael Gulapa
 */
@Stateless
@Path("rest.oauth")
public class OauthFacadeREST {

    @EJB
    OauthManagerImpl oauthManagerImpl;

    @EJB
    TokenManagerImpl tokenManagerImpl;

    public OauthFacadeREST() {
    }

    @POST
    @Path("/newaccount/")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public CreateUpdateResponse createNewAccount(@HeaderParam("Authorization") String accessToken, Oauth oauth) {
        return oauthManagerImpl.createNewAccount(accessToken, oauth);
    }

    @POST
    @Path("/oauth/")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public CreateUpdateResponse createOauth(@HeaderParam("Authorization") String accessToken, @HeaderParam("loginId") Long loginId, Oauth oauth) {
        return oauthManagerImpl.createOauth(accessToken, loginId, oauth);
    }

    @GET
    @Path("/appuser/{appuserId}")
    @Produces({"application/json"})
    public OauthListResponse findOauthListByAppuserId(@HeaderParam("Authorization") String accessToken, @HeaderParam("loginId") Long loginId, @PathParam("appuserId") Long appuserId) {
        return oauthManagerImpl.findOauthListByAppuserId(accessToken, loginId, appuserId);
    }

    @DELETE
    @Path("/{oauthId}")
    @Produces({"application/json"})
    public ReturnCodeResponse removeOauth(@HeaderParam("Authorization") String accessToken, @HeaderParam("loginId") Long loginId, @HeaderParam("oauthProvider") String oauthProvider, @HeaderParam("accountId") String accountId, @PathParam("oauthId") Long oauthId) {
        return oauthManagerImpl.removeOauth(accessToken, loginId, oauthProvider, accountId, oauthId);
    }

    @GET
    @Path("/token/{code}")
    @Produces({"application/json"})
    public TokenResponse getToken(@HeaderParam("Authorization") String accessToken, @HeaderParam("loginId") Long loginId, @HeaderParam("oauthProvider") String oauthProvider, @HeaderParam("accountId") String accountId, @PathParam("code") int code) {
        return tokenManagerImpl.getToken(accessToken, loginId, oauthProvider, accountId, code);
    }
}
