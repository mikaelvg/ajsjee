package com.ajsjee.web.service.facade;

import com.ajsjee.web.bean.response.AccountResponse;
import com.ajsjee.web.service.impl.AccountManagerImpl;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

/**
 *
 * @author Mikael Gulapa
 */
@Stateless
@Path("rest.account")
public class AccountFacadeREST {
    
    @EJB
    private AccountManagerImpl accountManagerImpl;

    public AccountFacadeREST() {
    }

    @GET
    @Path("/appuser/{appuserId}")
    @Produces({"application/json"})
    public AccountResponse getAccountDetails(@HeaderParam("Authorization") String accessToken, @HeaderParam("loginId") Long loginId, @PathParam("appuserId") Long appuserId) {
        return accountManagerImpl.getAccountDetails(accessToken, loginId, appuserId);  
    } 
}
