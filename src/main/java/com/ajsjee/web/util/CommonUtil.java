package com.ajsjee.web.util;

import com.paypal.base.ConfigManager;
import com.paypal.base.Constants;
import com.paypal.base.rest.OAuthTokenCredential;
import com.paypal.base.rest.PayPalRESTException;
import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.exception.FacebookOAuthException;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.TimeZone;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import org.apache.log4j.Logger;
import com.ajsjee.web.bean.response.FacebookUserResponse;
import java.util.Arrays;


/**
 *
 * @author mikaelgulapa
 */
public class CommonUtil {

    private CommonUtil() {
    }
    private static final Logger LOGGER = Logger.getLogger(CommonUtil.class);

    private static final ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    private static final Validator validator = factory.getValidator();

    public static Date getCurrentServerDate() {

        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));

        Date currenServerDate = new java.sql.Timestamp((calendar.getTime().getTime()));
        LOGGER.info("currentDate: " + currenServerDate);
        return currenServerDate;
    }

    @SuppressWarnings("SizeReplaceableByIsEmpty")
    public static String validateObject(Object obj) {

        if (validator.validate(obj).size() == 0) {
            return null;
        } else {

            StringBuilder strBuilder = new StringBuilder();
            ConstraintViolation<Object> strConstraintViolation;
            Iterator<ConstraintViolation<Object>> itrConstraintViolations = validator.validate(obj).iterator();

            while (itrConstraintViolations.hasNext()) {
                strConstraintViolation = itrConstraintViolations.next();
                LOGGER.info(strConstraintViolation.getMessage());
                LOGGER.info(strConstraintViolation.getPropertyPath());

                strBuilder
                        .append(strConstraintViolation.getPropertyPath())
                        .append(" : ")
                        .append(strConstraintViolation.getMessage())
                        .append(" \n");
            }

            return strBuilder.toString();
        }
    }

    public static String getFacebookIdUsingToken(String accessToken) {
        try {
            FacebookClient facebookClient = new DefaultFacebookClient(accessToken);

            FacebookUserResponse facebookUserResponse = facebookClient.fetchObject("me", FacebookUserResponse.class);

            String fbUserID = facebookUserResponse.getFacebookId();

            return fbUserID;

        } catch (FacebookOAuthException e) {
            LOGGER.info("Token Invalid");
            return null;
        }

    }

    public static Object[][] searchKeyObject(String keyword, Object[][] paramArray) {

        String[] splited;
        String strKeyword = "keyword";
        splited = keyword.split("\\s+");
        if (splited.length == 1) {
            Object[] obj1 = {strKeyword + 1, "%" + splited[0] + "%"};
            paramArray = addElement(paramArray, obj1);
        }
        if (splited.length == 2) {
            Object[] obj1 = {strKeyword + 1, "%" + splited[0] + "%"};
            Object[] obj2 = {strKeyword + 2, "%" + splited[1] + "%"};
            paramArray = addElement(paramArray, obj1);
            paramArray = addElement(paramArray, obj2);
        }
        if (splited.length == 3) {
            Object[] obj1 = {strKeyword + 1, "%" + splited[0] + "%"};
            Object[] obj2 = {strKeyword + 2, "%" + splited[1] + "%"};
            Object[] obj3 = {strKeyword + 3, "%" + splited[2] + "%"};
            paramArray = addElement(paramArray, obj1);
            paramArray = addElement(paramArray, obj2);
            paramArray = addElement(paramArray, obj3);
        }

        if (splited.length == 4) {
            Object[] obj1 = {strKeyword + 1, "%" + splited[0] + "%"};
            Object[] obj2 = {strKeyword + 2, "%" + splited[1] + "%"};
            Object[] obj3 = {strKeyword + 3, "%" + splited[2] + "%"};
            Object[] obj4 = {strKeyword + 4, "%" + splited[3] + "%"};
            paramArray = addElement(paramArray, obj1);
            paramArray = addElement(paramArray, obj2);
            paramArray = addElement(paramArray, obj3);
            paramArray = addElement(paramArray, obj4);
        }

        if (splited.length >= 5) {
            Object[] obj1 = {strKeyword + 1, "%" + splited[0] + "%"};
            Object[] obj2 = {strKeyword + 2, "%" + splited[1] + "%"};
            Object[] obj3 = {strKeyword + 3, "%" + splited[2] + "%"};
            Object[] obj4 = {strKeyword + 4, "%" + splited[3] + "%"};
            Object[] obj5 = {strKeyword + 5, "%" + splited[4] + "%"};
            paramArray = addElement(paramArray, obj1);
            paramArray = addElement(paramArray, obj2);
            paramArray = addElement(paramArray, obj3);
            paramArray = addElement(paramArray, obj4);
            paramArray = addElement(paramArray, obj5);
        }

        return paramArray;
    }

    private static Object[][] addElement(Object[][] a, Object e[]) {
        a = Arrays.copyOf(a, a.length + 1);
        a[a.length - 1] = e;
        return a;
    }

    public static String getAccessToken() throws PayPalRESTException {
        String clientID = ConfigManager.getInstance().getValue(Constants.CLIENT_ID);
        String clientSecret = ConfigManager.getInstance().getValue(
                Constants.CLIENT_SECRET);
        return new OAuthTokenCredential(clientID, clientSecret)
                .getAccessToken();
    }

}
