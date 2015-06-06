/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ajsjee.web.service;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author Mikael Gulapa
 */
@javax.ws.rs.ApplicationPath("webresources")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();

        resources.add(com.ajsjee.web.service.facade.AccountFacadeREST.class);
        resources.add(com.ajsjee.web.service.facade.AppuserFacadeREST.class);
        resources.add(com.ajsjee.web.service.facade.ConstantFacadeREST.class);
        resources.add(com.ajsjee.web.service.facade.LoginFacadeREST.class);
        resources.add(com.ajsjee.web.service.facade.OauthFacadeREST.class);
        resources.add(com.ajsjee.web.service.facade.ProfileFacadeREST.class);

        return resources;
    }
}
