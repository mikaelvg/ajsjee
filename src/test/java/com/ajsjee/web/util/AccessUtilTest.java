/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ajsjee.web.util;

import java.io.IOException;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 *
 * @author Mikael Gulapa
 */
public class AccessUtilTest {

    public AccessUtilTest() {
    }

    @BeforeClass
    public static void setUpClass() {
    }

    @AfterClass
    public static void tearDownClass() {
    }

    @Test
    public void testValidateTokenWithOAuthProvider() throws IOException {
        String accessToken = "CAAUZBvQRUrdoBAHyyY3cZCVZB0a4iswB8nSEHKQvlZCIiKchkV2AiGVwkAAe1478vvtn6H5zZCQ58ZCZBTdAI7oYtJ9fZB3v56w4Xq9PFikSVvQAccr5EomseplmGdpwgqUp2HQj9Gx5CMMCBhw8dk74fBHy9hzE1ZAZBq9CnylEudOpB5KUFtuY5sWmBkdwy6MZC1ElUR65e64QbeECFgsiYaj";
        String accountId = "326070950890699";
        String oauthProvider = "FB";
        boolean result = AccessUtil.validateTokenWithOAuthProvider(accessToken, accountId, oauthProvider);
        System.out.println("Access Util result : " + result);
    }
}
