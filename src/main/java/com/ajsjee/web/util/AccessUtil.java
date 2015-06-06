package com.ajsjee.web.util;

import org.apache.log4j.Logger;

/**
 *
 * @author mikaelgulapa
 */
public class AccessUtil {

    private AccessUtil() {
    }
    private static final Logger LOGGER = Logger.getLogger(AccessUtil.class);

    public static boolean validateToken() {
        // Validate if ID and token matches
        return true;
    }

    public static boolean validateTokenWithOAuthProvider(String accessToken, String accountId, String oauthProvider) {

        boolean isValidToken = false;
        switch (oauthProvider) {
            case "XX":
                isValidToken = true; // for testing only
                break;
            case "YH":
            	isValidToken = true; // for testing only
            	break;
            case "TW":
                isValidToken = true; // for testing only
                break;
            case "FB":
            	isValidToken = true; // for testing only
            	break;
            case "GG":
            	isValidToken = true; // for testing only
            	break;
            case "LI":
            	isValidToken = true; // for testing only
                //isValidToken = OauthUtil.getOauthUserCredentialsFacebookGoogleLinkedin(accessToken, accountId, oauthProvider);
                break;
        }

        return isValidToken == true;
    }
}
