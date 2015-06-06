/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ajsjee.web.service.impl;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.apache.log4j.Logger;
import com.ajsjee.web.bean.response.ReturnCodeResponse;
import com.ajsjee.web.entity.Constant;
import com.ajsjee.web.service.AbstractFacade;
import com.ajsjee.web.util.CodeUtil;
import com.ajsjee.web.util.ConstantsLoaderUtils;

/**
 *
 * @author Mikael Gulapa
 */
@Stateless
public class ConstantsManagerImpl extends AbstractFacade<Constant> {

    private static final Logger LOGGER = Logger.getLogger(ConstantsManagerImpl.class);
    @PersistenceContext(unitName = "ajsjee.persistenceunit")
    private EntityManager em;

    public ConstantsManagerImpl() {
        super(Constant.class);
    }

    public ReturnCodeResponse reloadConstants() {

        ReturnCodeResponse returnCodeResponse = new ReturnCodeResponse();
        List<Constant> lstConstant = super.findAll();
        for (Object temp : lstConstant) {
            Constant constant = (Constant) temp;
            ConstantsLoaderUtils.ConstantsMap.put(constant.getConstantName(), constant.getConstantValue());

            LOGGER.info(constant.getConstantName() + " - " + constant.getConstantValue());
        }
        returnCodeResponse.setReturnCode(CodeUtil.RETRIEVE_CONSTANT_SUCCESS);
        return returnCodeResponse;
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
}
