/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ajsjee.web.servlet;

import com.ajsjee.web.service.impl.ConstantsManagerImpl;
import com.ajsjee.web.util.ConstantsLoaderUtils;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import org.apache.log4j.Logger;

/**
 *
 * @author Mikael Gulapa
 */
@Stateless
@WebListener
public class ConstantsInitializer implements ServletContextListener {

    private static Logger LOGGER = Logger.getLogger(ConstantsInitializer.class);
    @EJB
    private ConstantsManagerImpl constantsManagerImpl;

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        constantsManagerImpl.reloadConstants();
        LOGGER.debug("%%%%%%%%%%%%% LOADING MAIL_SMTP_USER =  " + ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_USER"));
        LOGGER.debug("%%%%%%%%%%%%% MAIL_SMTP_PASSWORD =  " + ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_PASSWORD"));
        LOGGER.debug("%%%%%%%%%%%%% MAIL_SMTP_HOST =  " + ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_HOST"));
        LOGGER.debug("%%%%%%%%%%%%% SMTP_PORT =  " + ConstantsLoaderUtils.ConstantsMap.get("SMTP_PORT"));
        LOGGER.debug("%%%%%%%%%%%%% MAIL_SMTP_AUTH =  " + ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_AUTH"));
        LOGGER.debug("%%%%%%%%%%%%% MAIL_SMTP_STARTTLS_ENABLE =  " + ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_STARTTLS_ENABLE"));
        LOGGER.debug("%%%%%%%%%%%%% MAIL_SMTP_ENABLESSL_ENABLE =  " + ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_ENABLESSL_ENABLE"));
        LOGGER.debug("%%%%%%%%%%%%% MAIL_SMTP_SOCKETFACTORY_CLASS =  " + ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_SOCKETFACTORY_CLASS"));
        LOGGER.debug("%%%%%%%%%%%%% MAIL_SMTP_SOCKETFACTORY_FALLBACK =  " + ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_SOCKETFACTORY_FALLBACK"));
        LOGGER.debug("%%%%%%%%%%%%% MAIL_SMTP_PORT =  " + ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_PORT"));
        LOGGER.debug("%%%%%%%%%%%%% MAIL_SMTP_SOCKETFACTORY_PORT =  " + ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_SOCKETFACTORY_PORT"));
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        LOGGER.info("%%%%%%%%%%%%% Shutting Down... ");
    }
}
