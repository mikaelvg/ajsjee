package com.ajsjee.web.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.URL;
import java.net.UnknownHostException;
import org.apache.log4j.Logger;
import org.scribe.builder.ServiceBuilder;
import org.scribe.builder.api.TwitterApi;
import org.scribe.builder.api.YahooApi;
import org.scribe.model.OAuthRequest;
import org.scribe.model.Response;
import org.scribe.model.Token;
import org.scribe.model.Verb;
import org.scribe.oauth.OAuthService;

/**
 *
 * @author mikaelgulapa
 */
public class OauthUtil {

    private OauthUtil() {
    }
    private static final Logger LOGGER = Logger.getLogger(OauthUtil.class);

    public static boolean getOauthUserCredentialsTwitterYahoo(String accessToken, String accountId, String oauthProvider) {

        final String TWITTER_PROTECTED_RESOURCE_URL = "https://api.twitter.com/1.1/account/verify_credentials.json";
        final String YAHOO_PROTECTED_RESOURCE_URL = "http://social.yahooapis.com/v1/user/" + accountId + "/profile/status?format=json";
        String PROTECTED_RESOURCE_URL = null;

        InetAddress ip;
        String hostName = null;
        try {
            ip = InetAddress.getLocalHost();
            hostName = ip.getHostName();
            LOGGER.info("Your current IP address : " + ip);
            LOGGER.info("Your current Hostname : " + hostName);
        } catch (UnknownHostException e) {
            e.printStackTrace();
            LOGGER.error("Invalid hostName : " + hostName);
            return false;
        }

        String TWITTER_API_KEY = null;
        String TWITTER_API_SECRET = null;
        String YAHOO_API_KEY = null;
        String YAHOO_API_SECRET = null;
        String apiKey = null;
        String apiSecret = null;

        switch (hostName) {
            case "localhost":
                TWITTER_API_KEY = "xx";
                TWITTER_API_SECRET = "xx";
//                YAHOO_API_KEY = "xx";
//                YAHOO_API_SECRET = "xx";
                break;
            case "local.ajsjee.com":
//                TWITTER_API_KEY = "xx";
//                TWITTER_API_SECRET = "xx";
                YAHOO_API_KEY = "xx--";
                YAHOO_API_SECRET = "xx";
                break;
            case "buildph.ajsjee.com":
                TWITTER_API_KEY = "xx";
                TWITTER_API_SECRET = "xx";
                YAHOO_API_KEY = "xx--";
                YAHOO_API_SECRET = "xx";
                break;
            case "www.ajsjee.com":
                TWITTER_API_KEY = "xx";
                TWITTER_API_SECRET = "xx";
                YAHOO_API_KEY = "xx--";
                YAHOO_API_SECRET = "xx";
                break;
            case "ajsjee.com":
                TWITTER_API_KEY = "xx";
                TWITTER_API_SECRET = "xx";
                YAHOO_API_KEY = "xx--";
                YAHOO_API_SECRET = "xx";
                break;
            default:
                LOGGER.error("Invalid hostName : " + hostName);
                return false;
        }

        switch (oauthProvider) {
            case "TW":
                PROTECTED_RESOURCE_URL = TWITTER_PROTECTED_RESOURCE_URL;
                apiKey = TWITTER_API_KEY;
                apiSecret = TWITTER_API_SECRET;
                break;
            case "YH":
                PROTECTED_RESOURCE_URL = YAHOO_PROTECTED_RESOURCE_URL;
                apiKey = YAHOO_API_KEY;
                apiSecret = YAHOO_API_SECRET;
                break;
        }

        OAuthService service;
        if (oauthProvider.equals("TW")) {
            service = new ServiceBuilder()
                    .provider(TwitterApi.SSL.class)
                    .apiKey(apiKey)
                    .apiSecret(apiSecret)
                    .build();
        } else {
            service = new ServiceBuilder()
                    .provider(YahooApi.class)
                    .apiKey(apiKey)
                    .apiSecret(apiSecret)
                    .build();
        }

        String[] splitAccessToken = accessToken.split(":");
        String requestToken = splitAccessToken[0];
        String verifier = splitAccessToken[1];
        String[] splitVerifier = verifier.split("@");
        verifier = splitVerifier[0];

        // Trade the Request Token and Verfier for the Access Token
        Token postAccessToken = new Token(requestToken, verifier);

        // Now let's go and ask for a protected resource!
        OAuthRequest request = new OAuthRequest(Verb.GET, PROTECTED_RESOURCE_URL);

        service.signRequest(postAccessToken, request);
        Response response = request.send();

        LOGGER.info("Response code : " + response.getCode());
        if (response.getCode() == 200 && accountId != null) {
            boolean hasAccountId = response.getBody().contains(accountId);

            if (hasAccountId == true) {
                LOGGER.info("Valid token : " + accountId);
                return true;
            } else {
                LOGGER.error("Invalid token : " + accountId);
                return false;
            }
        } else {
            LOGGER.error("Invalid token : " + accountId);
            return false;
        }
    }

    public static boolean getOauthUserCredentialsFacebookGoogleLinkedin(String accessToken, String accountId, String oauthProvider) {

        try {
            final String USER_AGENT = "Mozilla/5.0";
            String FACEBOOK_RESOURCE_URL = "https://graph.facebook.com/me?access_token=" + accessToken;
            String GOOGLE_RESOURCE_URL = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + accessToken;
            String LINKEDIN_RESOURCE_URL = "https://api.linkedin.com/v1/people/~:(id,first-name,last-name,languages,date-of-birth,picture-url,email-address,location:(name),phone-numbers,main-address)?oauth2_access_token=" + accessToken + "&format=json";
            String URL = null;

            switch (oauthProvider) {
                case "FB":
                    URL = FACEBOOK_RESOURCE_URL;
                    break;
                case "GG":
                    URL = GOOGLE_RESOURCE_URL;
                    break;
                case "LI":
                    URL = LINKEDIN_RESOURCE_URL;
                    break;
            }

            URL obj = new URL(URL);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();

            // optional default is GET
            con.setRequestMethod("GET");

            //add request header
            con.setRequestProperty("User_agent", USER_AGENT);

            int responseCode = con.getResponseCode();

            if (responseCode == 200 && accountId != null) {
                StringBuffer response;
                BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
                String inputLine;
                response = new StringBuffer();
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }

                //print result
                boolean contains = response.toString().contains(accountId);

                if (contains == true) {
                    LOGGER.info("Valid token : " + accountId);
                    return true;
                } else {
                    LOGGER.error("Invalid token : " + accountId);
                    return false;
                }
            } else {
                LOGGER.error("Invalid token or null accountId : " + accountId);
                return false;
            }
        } catch (IOException ex) {
            LOGGER.error("Invalid token or null accountId : " + accountId);
            return false;
        }
    }
}
