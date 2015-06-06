/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ajsjee.web.service;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;

/**
 *
 * @author Mikael Gulapa
 */
public abstract class AbstractFacade<T> {

    private Class<T> entityClass;

    public AbstractFacade(Class<T> entityClass) {
        this.entityClass = entityClass;
    }

    protected abstract EntityManager getEntityManager();

    public List<T> findByQuery(String strQueryName) {
        getEntityManager().getEntityManagerFactory().getCache().evict(entityClass);
        List<T> lstEntity = getEntityManager().createNamedQuery(strQueryName, entityClass).getResultList();
        int iSize = lstEntity.size();
        if (iSize == 0) {
            return null;
        } else {
            return lstEntity;
        }
    }

    public List<T> findByKeyPairValue(String strFieldName, String strFieldValue, String strQueryName) {
        getEntityManager().getEntityManagerFactory().getCache().evict(entityClass);
        List<T> lstEntity = getEntityManager().createNamedQuery(strQueryName, entityClass)
                .setParameter(strFieldName, strFieldValue).getResultList();
        int iSize = lstEntity.size();
        if (iSize == 0) {
            return null;
        } else {
            return lstEntity;
        }
    }

    public List<T> findByKeyPairValue(String strFieldName, Long lngFieldValue, String strQueryName) {
        getEntityManager().getEntityManagerFactory().getCache().evict(entityClass);
        List<T> lstEntity = getEntityManager().createNamedQuery(strQueryName, entityClass)
                .setParameter(strFieldName, lngFieldValue).getResultList();
        int iSize = lstEntity.size();
        if (iSize == 0) {
            return null;
        } else {
            return lstEntity;
        }
    }

    public List<T> findByKeyPairValue(
            String strFieldName1, Long lngFieldValue1,
            String strFieldName2, Long lngFieldValue2,
            String strQueryName) {
        getEntityManager().getEntityManagerFactory().getCache().evict(entityClass);
        List<T> lstEntity = getEntityManager().createNamedQuery(strQueryName, entityClass)
                .setParameter(strFieldName1, lngFieldValue1)
                .setParameter(strFieldName2, lngFieldValue2)
                .getResultList();
        int iSize = lstEntity.size();
        if (iSize == 0) {
            return null;
        } else {
            return lstEntity;
        }
    }

    public List<T> findByKeyPairValue(String strFieldName, Long lngFieldValue, String strQueryName, int startingNumber, int dataCountPerPage) {
        getEntityManager().getEntityManagerFactory().getCache().evict(entityClass);
        List<T> lstEntity = getEntityManager()
                .createNamedQuery(strQueryName, entityClass)
                .setMaxResults(dataCountPerPage)
                .setFirstResult(startingNumber - 1)
                .setParameter(strFieldName, lngFieldValue).getResultList();
        int iSize = lstEntity.size();
        if (iSize == 0) {
            return null;
        } else {
            return lstEntity;
        }
    }

    public int countByKeyPairValue(String strFieldName, Long lngFieldValue, String strQueryName) {
        getEntityManager().getEntityManagerFactory().getCache().evict(entityClass);
        List<T> lstEntity = getEntityManager()
                .createNamedQuery(strQueryName, entityClass)
                .setParameter(strFieldName, lngFieldValue)
                .getResultList();
        return lstEntity.size();
    }

    public List<T> findByKeyPairValue(Object[][] params, String strQueryName, int startingNumber, int dataCountPerPage) {
        List<T> lstEntity = new ArrayList();
        getEntityManager().getEntityManagerFactory().getCache().evict(entityClass);

        switch (params.length) {
            case 0:
                lstEntity = getEntityManager()
                        .createNamedQuery(strQueryName, entityClass)
                        .setMaxResults(dataCountPerPage)
                        .setFirstResult(startingNumber - 1)
                        .getResultList();
                break;
            case 1:
                lstEntity = getEntityManager().createNamedQuery(strQueryName, entityClass)
                        .setMaxResults(dataCountPerPage)
                        .setFirstResult(startingNumber - 1)
                        .setParameter(params[0][0].toString(), params[0][1])
                        .getResultList();
                break;
            case 2:
                lstEntity = getEntityManager().createNamedQuery(strQueryName, entityClass)
                        .setMaxResults(dataCountPerPage)
                        .setFirstResult(startingNumber - 1)
                        .setParameter(params[0][0].toString(), params[0][1])
                        .setParameter(params[1][0].toString(), params[1][1])
                        .getResultList();
                break;
            case 3:
                lstEntity = getEntityManager().createNamedQuery(strQueryName, entityClass)
                        .setMaxResults(dataCountPerPage)
                        .setFirstResult(startingNumber - 1)
                        .setParameter(params[0][0].toString(), params[0][1])
                        .setParameter(params[1][0].toString(), params[1][1])
                        .setParameter(params[2][0].toString(), params[2][1])
                        .getResultList();
                break;
            case 4:
                lstEntity = getEntityManager().createNamedQuery(strQueryName, entityClass)
                        .setMaxResults(dataCountPerPage)
                        .setFirstResult(startingNumber - 1)
                        .setParameter(params[0][0].toString(), params[0][1])
                        .setParameter(params[1][0].toString(), params[1][1])
                        .setParameter(params[2][0].toString(), params[2][1])
                        .setParameter(params[3][0].toString(), params[3][1])
                        .getResultList();
                break;
            case 5:
                lstEntity = getEntityManager().createNamedQuery(strQueryName, entityClass)
                        .setMaxResults(dataCountPerPage)
                        .setFirstResult(startingNumber - 1)
                        .setParameter(params[0][0].toString(), params[0][1])
                        .setParameter(params[1][0].toString(), params[1][1])
                        .setParameter(params[2][0].toString(), params[2][1])
                        .setParameter(params[3][0].toString(), params[3][1])
                        .setParameter(params[4][0].toString(), params[4][1])
                        .getResultList();
                break;
            case 6:
                lstEntity = getEntityManager().createNamedQuery(strQueryName, entityClass)
                        .setMaxResults(dataCountPerPage)
                        .setFirstResult(startingNumber - 1)
                        .setParameter(params[0][0].toString(), params[0][1])
                        .setParameter(params[1][0].toString(), params[1][1])
                        .setParameter(params[2][0].toString(), params[2][1])
                        .setParameter(params[3][0].toString(), params[3][1])
                        .setParameter(params[4][0].toString(), params[4][1])
                        .setParameter(params[5][0].toString(), params[5][1])
                        .getResultList();
                break;
            case 7:
                lstEntity = getEntityManager().createNamedQuery(strQueryName, entityClass)
                        .setMaxResults(dataCountPerPage)
                        .setFirstResult(startingNumber - 1)
                        .setParameter(params[0][0].toString(), params[0][1])
                        .setParameter(params[1][0].toString(), params[1][1])
                        .setParameter(params[2][0].toString(), params[2][1])
                        .setParameter(params[3][0].toString(), params[3][1])
                        .setParameter(params[4][0].toString(), params[4][1])
                        .setParameter(params[5][0].toString(), params[5][1])
                        .setParameter(params[6][0].toString(), params[6][1])
                        .getResultList();
                break;    
            case 8:
                lstEntity = getEntityManager().createNamedQuery(strQueryName, entityClass)
                        .setMaxResults(dataCountPerPage)
                        .setFirstResult(startingNumber - 1)
                        .setParameter(params[0][0].toString(), params[0][1])
                        .setParameter(params[1][0].toString(), params[1][1])
                        .setParameter(params[2][0].toString(), params[2][1])
                        .setParameter(params[3][0].toString(), params[3][1])
                        .setParameter(params[4][0].toString(), params[4][1])
                        .setParameter(params[5][0].toString(), params[5][1])
                        .setParameter(params[6][0].toString(), params[6][1])
                        .setParameter(params[7][0].toString(), params[7][1])
                        .getResultList();
                break;                   
        }

        int iSize = lstEntity.size();
        if (iSize == 0) {
            return null;
        } else {
            return lstEntity;
        }
    }

    public void create(T entity) {
        getEntityManager().getEntityManagerFactory().getCache().evict(entityClass);
        getEntityManager().persist(entity);
        getEntityManager().flush();
    }

    public void edit(T entity) {
        getEntityManager().getEntityManagerFactory().getCache().evict(entityClass);
        getEntityManager().merge(entity);
        getEntityManager().flush();
    }

    public void remove(T entity) {
        getEntityManager().getEntityManagerFactory().getCache().evict(entityClass);
        getEntityManager().remove(getEntityManager().merge(entity));
        getEntityManager().flush();
    }

    public T find(Object id) {
        getEntityManager().getEntityManagerFactory().getCache().evict(entityClass);
        try {
            return getEntityManager().find(entityClass, id);
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    public List<T> findAll() {
        javax.persistence.criteria.CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        cq.select(cq.from(entityClass));
        return getEntityManager().createQuery(cq).getResultList();
    }

    public int countQueryRecords(Object[][] params, String strQueryName) {
        getEntityManager().getEntityManagerFactory().getCache().evict(entityClass);
        switch (params.length) {
            case 0:
                return getEntityManager()
                        .createNamedQuery(strQueryName, entityClass)
                        .getResultList()
                        .size();
            case 1:
                return getEntityManager().createNamedQuery(strQueryName, entityClass)
                        .setParameter(params[0][0].toString(), params[0][1])
                        .getResultList()
                        .size();
            case 2:
                return getEntityManager().createNamedQuery(strQueryName, entityClass)

                        .setParameter(params[0][0].toString(), params[0][1])
                        .setParameter(params[1][0].toString(), params[1][1])
                        .getResultList()
                        .size();
            case 3:
                return getEntityManager().createNamedQuery(strQueryName, entityClass)
                        .setParameter(params[0][0].toString(), params[0][1])
                        .setParameter(params[1][0].toString(), params[1][1])
                        .setParameter(params[2][0].toString(), params[2][1])
                        .getResultList()
                        .size();
            case 4:
                return getEntityManager().createNamedQuery(strQueryName, entityClass)
                        .setParameter(params[0][0].toString(), params[0][1])
                        .setParameter(params[1][0].toString(), params[1][1])
                        .setParameter(params[2][0].toString(), params[2][1])
                        .setParameter(params[3][0].toString(), params[3][1])
                        .getResultList()
                        .size();
            case 5:
                return getEntityManager().createNamedQuery(strQueryName, entityClass)
                        .setParameter(params[0][0].toString(), params[0][1])
                        .setParameter(params[1][0].toString(), params[1][1])
                        .setParameter(params[2][0].toString(), params[2][1])
                        .setParameter(params[3][0].toString(), params[3][1])
                        .setParameter(params[4][0].toString(), params[4][1])
                        .getResultList()
                        .size();
            case 6:
                return getEntityManager().createNamedQuery(strQueryName, entityClass)
                        .setParameter(params[0][0].toString(), params[0][1])
                        .setParameter(params[1][0].toString(), params[1][1])
                        .setParameter(params[2][0].toString(), params[2][1])
                        .setParameter(params[3][0].toString(), params[3][1])
                        .setParameter(params[4][0].toString(), params[4][1])
                        .setParameter(params[5][0].toString(), params[5][1])
                        .getResultList()
                        .size();
            case 7:
                return getEntityManager().createNamedQuery(strQueryName, entityClass)
                        .setParameter(params[0][0].toString(), params[0][1])
                        .setParameter(params[1][0].toString(), params[1][1])
                        .setParameter(params[2][0].toString(), params[2][1])
                        .setParameter(params[3][0].toString(), params[3][1])
                        .setParameter(params[4][0].toString(), params[4][1])
                        .setParameter(params[5][0].toString(), params[5][1])
                        .setParameter(params[6][0].toString(), params[6][1])
                        .getResultList()
                        .size();
            case 8:
                return getEntityManager().createNamedQuery(strQueryName, entityClass)
                        .setParameter(params[0][0].toString(), params[0][1])
                        .setParameter(params[1][0].toString(), params[1][1])
                        .setParameter(params[2][0].toString(), params[2][1])
                        .setParameter(params[3][0].toString(), params[3][1])
                        .setParameter(params[4][0].toString(), params[4][1])
                        .setParameter(params[5][0].toString(), params[5][1])
                        .setParameter(params[6][0].toString(), params[6][1])
                        .setParameter(params[7][0].toString(), params[7][1])
                        .getResultList()
                        .size();             
        }
        return 0;
    }
}
