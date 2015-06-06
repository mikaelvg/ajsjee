package com.ajsjee.web.service.facade;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import com.ajsjee.web.bean.response.AppuserResponse;
import com.ajsjee.web.bean.response.CreateUpdateResponse;
import com.ajsjee.web.entity.Appuser;
import com.ajsjee.web.service.impl.AppuserManagerImpl;
import javax.ws.rs.HeaderParam;

/**
 *
 * @author Mikael Gulapa
 */
@Stateless
@Path("rest.appuser")
public class AppuserFacadeREST {

    @EJB
    AppuserManagerImpl appuserManagerImpl;

    public AppuserFacadeREST() {
    }

    @POST
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public CreateUpdateResponse createAppuser(@HeaderParam("Authorization") String accessToken, Appuser appuser) {
        return appuserManagerImpl.createAppuser(accessToken, appuser);
    }

    @PUT
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public CreateUpdateResponse updateAppuser(@HeaderParam("Authorization") String accessToken, @HeaderParam("loginId") Long loginId, @HeaderParam("oauthProvider") String oauthProvider, @HeaderParam("accountId") String accountId, Appuser appuser) {
        return appuserManagerImpl.updateAppuser(accessToken, loginId, oauthProvider, accountId, appuser);
    }

    @GET
    @Path("{appuserId}")
    @Produces({"application/json"})
    public AppuserResponse findAppuser(@HeaderParam("loginId") Long loginId, @PathParam("appuserId") Long appuserId) {
        return appuserManagerImpl.findAppuser(loginId, appuserId);
    }
}
