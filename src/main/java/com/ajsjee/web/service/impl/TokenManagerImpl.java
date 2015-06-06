package com.ajsjee.web.service.impl;

import com.ajsjee.web.bean.response.TokenResponse;
import com.ajsjee.web.util.AccessUtil;
import com.ajsjee.web.util.CodeUtil;
import java.util.UUID;
import javax.ejb.Stateless;
import org.apache.log4j.Logger;

/**
 *
 * @author Mikael Gulapa
 */
@Stateless
public class TokenManagerImpl {

    private static final Logger LOGGER = Logger.getLogger(TokenManagerImpl.class);

    public TokenManagerImpl() {
    }

    public TokenResponse getToken(String accessToken, Long loginId, String oauthProvider, String accountId, int code) {

        // LoginId is required for all create/update/delete
        if (loginId == null) {
            LOGGER.error("Null loginId | "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new TokenResponse(CodeUtil.INVALID_PARAMETER);
        }

        if (!AccessUtil.validateTokenWithOAuthProvider(accessToken, accountId, oauthProvider)) {
            LOGGER.error("Unauthorized access : "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new TokenResponse(CodeUtil.INVALID_PARAMETER);
        }

        if (code == 1) {
            // Reverse access token. Consider encrypt decrypt token later
            LOGGER.info("code 1 token generation | "
                    + loginId + " | " + CodeUtil.RETRIEVE_TOKEN_SUCCESS);
            return new TokenResponse(new StringBuilder(accessToken).reverse().toString(), CodeUtil.RETRIEVE_TOKEN_SUCCESS);
        } else if (code == 2) {
            // Consider converting this into digest
            LOGGER.info("code 2 token generation | "
                    + loginId + " | " + CodeUtil.RETRIEVE_TOKEN_SUCCESS);
            return new TokenResponse(UUID.randomUUID().toString(), CodeUtil.RETRIEVE_TOKEN_SUCCESS);
        } else {
            LOGGER.error("Invalid code | "
                    + loginId + " | " + CodeUtil.INVALID_PARAMETER);
            return new TokenResponse(CodeUtil.INVALID_PARAMETER);
        }

    }

}
