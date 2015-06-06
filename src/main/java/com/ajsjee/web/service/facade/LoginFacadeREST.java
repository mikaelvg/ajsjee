package com.ajsjee.web.service.facade;

import com.ajsjee.web.bean.request.LoginRequest;
import com.ajsjee.web.bean.response.LoginResponse;
import com.ajsjee.web.service.impl.LoginManagerImpl;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;


/**
 *
 * @author Mikael Gulapa
 */
@Stateless
@Path("rest.login")
public class LoginFacadeREST {
    
    @EJB
    LoginManagerImpl loginManagerImpl;
    
    public LoginFacadeREST() {
    }
    
    @POST
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public LoginResponse authenticateUser(@HeaderParam("Authorization") String accessToken, LoginRequest loginRequest) {
        return loginManagerImpl.authenticateUser(loginRequest, accessToken);
    }    
}
