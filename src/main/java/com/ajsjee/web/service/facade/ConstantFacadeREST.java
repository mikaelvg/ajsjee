package com.ajsjee.web.service.facade;

import com.ajsjee.web.bean.response.ReturnCodeResponse;
import javax.ejb.Stateless;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import com.ajsjee.web.service.impl.ConstantsManagerImpl;
import javax.ejb.EJB;
import javax.ws.rs.POST;

/**
 *
 * @author Mikael Gulapa
 */
@Stateless
@Path("rest.constant")
public class ConstantFacadeREST {
    
    @EJB
    ConstantsManagerImpl constantsManagerImpl;
    
    public ConstantFacadeREST() {
    }

    @POST
    @Produces({"application/json"})
    public ReturnCodeResponse reloadContants() {
        return constantsManagerImpl.reloadConstants();
    }
}
