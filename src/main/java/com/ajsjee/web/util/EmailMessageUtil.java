package com.ajsjee.web.util;

/**
 *
 * @author mikaelvg
 */
public class EmailMessageUtil {

    public static final String EMAIL_NOTIFICATION_HTML_TEMPLATE1 = "<html>\n"
                        + "<body>\n"
                        + "<div style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; font-size: 15px; line-height: 1.5em; background: #fff;\">\n"
                        + "<div style=\"border: 1px solid #dceaf5; border-radius: 4px; width: 600px; margin: auto;\">\n"
                        + "<a href=\"http://serbsyo.com\"><img src=\"http://ajsjee.com/app/images/ajsjee-logo.png\" alt=\"ajsjee.com-logo\" style=\"padding: 20px 20px 0 200px; width: 200px;\" /></a>\n"
                        + "<div style=\"clear: both\"></div>\n"
                        + "<br />\n"
                        + "<div style=\"white-space: pre-wrap; padding: 0 20px 20px 20px; color: #444;\">\n";
    public static final String EMAIL_NOTIFICATION_HTML_TEMPLATE2 = "\n</div>\n"
                        + "</div>\n"
                        + "<div style=\"width: 600px; margin: auto; text-align: right; margin-top: 10px; color: #999\">\n"
                        + "<small style=\"\">&copy; 2015 ajsjee.com</small>\n"
                        + "<br />\n"
                        + "<br />\n"
                        + "</div>\n"
                        + "</div>\n"
                        + "</body>\n"
                        + "</html>";
    
    public static final String ADDED_NEW_LOGIN_ACCOUNT_NOTIFICATION_MESSAGE_SUBJECT = "ajsjee.com : Added New Login Account ";
    public static final String ADDED_NEW_LOGIN_ACCOUNT_NOTIFICATION_MESSAGE_BODY1 = "\n\nYou have successfully added a new login account in ajsjee.com."
            + "\nYou may now access ajsjee.com through your ";
    public static final String ADDED_NEW_LOGIN_ACCOUNT_NOTIFICATION_MESSAGE_BODY2 = "\nYou can connect to ajsjee.com with other social networking accounts that you have depending on your personal preference. You can still add more of your accounts for ajsjee multi login.";

    public static final String INVITATION_MESSAGE_TO_SERVICE_PROVIDER_SUBJECT = "Invitation From an Agent";
    public static final String INVITATION_MESSAGE_TO_SERVICE_PROVIDER_MESSAGE_BODY1 = "\n\nYou have been invited by <strong>";
    public static final String INVITATION_MESSAGE_TO_SERVICE_PROVIDER_MESSAGE_BODY2 = "</strong>, check out the profile of the agent who invited you <a href=\"";
    public static final String INVITATION_MESSAGE_TO_SERVICE_PROVIDER_MESSAGE_BODY3 = "\"><strong>here</strong></a>.\n\nAgents manage a group of service providers and help settle transactions with clients. From this they get different opportunities and share them with you!"
            + "\n\nYou can make someone to be your agent by clicking the <strong>\"Make as my Agent\"</strong> button. By doing this instead of contacting you, clients will contact your online representative.";

    public static String MESSAGE_FOOTER = "\n\nThank you,\n\n- ajsjee team";
    public static String MESSAGE_GREETINGS = "Dear ";

    public static final String NOTIFICATION_MESSAGE_NEW_SERVICE_PROVIDER_OF_AN_AGENT_SUBJECT = "ajsjee.com : New Service Provider of an Agent";
    public static final String NOTIFICATION_MESSAGE_NEW_SERVICE_PROVIDER_OF_AN_AGENT_BODY1 = "\n\nCongratulations! You are now a service provider of ";
    public static final String NOTIFICATION_MESSAGE_NEW_SERVICE_PROVIDER_OF_AN_AGENT_BODY2 = ".\n\nView the agent's full profile <a href=\"";
    public static final String NOTIFICATION_MESSAGE_NEW_SERVICE_PROVIDER_OF_AN_AGENT_BODY3 = "\"><strong>here</strong></a>.";

    public static final String NOTIFICATION_MESSAGE_NEW_SERVICE_PROVIDER_ADDED_TO_AN_AGENT_SUBJECT = "ajsjee.com : New Service Provider Added To an Agent";
    public static final String NOTIFICATION_MESSAGE_NEW_SERVICE_PROVIDER_ADDED_TO_AN_AGENT_BODY1 = "\n\nCongratulations! A service provider was added to your list."
            + "\n\nClick <a href=\"";
    public static final String NOTIFICATION_MESSAGE_NEW_SERVICE_PROVIDER_ADDED_TO_AN_AGENT_BODY2 = "\"><strong>here</strong></a> to view the service provider's full profile.";

    public static final String NOTIFICATION_MESSAGE_REMOVE_AGENT_OF_SERVICE_PROVIDER_SUBJECT = "ajsjee.com : Removed as Agent of Service Provider";
    public static final String NOTIFICATION_MESSAGE_REMOVE_AGENT_OF_SERVICE_PROVIDER_BODY1 = " removed you as his/her agent."
            + "\n\nTo view the service provider's full profile click <a href=\"";
    public static final String NOTIFICATION_MESSAGE_REMOVE_AGENT_OF_SERVICE_PROVIDER_BODY2 = "\"><strong>here</strong></a>.\n\nStill want him/her to be your service provider? send them invites and see if they still want your service or invite other service provider to help you with your services offered.";

    public static final String NOTIFICATION_MESSAGE_REMOVED_LOGIN_ACCOUNT_SUBJECT = "ajsjee.com : Removed Login Account";
    public static final String NOTIFICATION_MESSAGE_REMOVED_LOGIN_ACCOUNT_BODY1 = "\n\nThis implies that you may not use your ";
    public static final String NOTIFICATION_MESSAGE_REMOVED_LOGIN_ACCOUNT_BODY2 = " to access ajsjee.com, but  you can add it again as your login account if you wish to do so.";

    public static final String NOTIFICATION_MESSAGE_REMOVED_SERVICE_PROVIDER_OF_AGENT_SUBJECT = "ajsjee.com : Removed as Service Provider of an Agent";
    public static final String NOTIFICATION_MESSAGE_REMOVED_SERVICE_PROVIDER_OF_AGENT_BODY1 = "\n\nYou have been removed as a service provider by <strong>";
    public static final String NOTIFICATION_MESSAGE_REMOVED_SERVICE_PROVIDER_OF_AGENT_BODY2 = "</strong>. \n\nView the profile of the agent <a href=\"";
    public static final String NOTIFICATION_MESSAGE_REMOVED_SERVICE_PROVIDER_OF_AGENT_BODY3 = "\"><strong>here</strong></a>.\n\nYou can send agent invites to have someone represent you online again and continue being productive with ajsjee.com.";

    public static final String NOTIFICATION_MESSAGE_TO_SERVICE_PROVIDER_REMOVED_AGENT_SUBJECT = "ajsjee.com: Service Provider Removed Agent";
    public static final String NOTIFICATION_MESSAGE_TO_SERVICE_PROVIDER_REMOVED_AGENT_BODY1 = "\n\nYou removed <strong>";
    public static final String NOTIFICATION_MESSAGE_TO_SERVICE_PROVIDER_REMOVED_AGENT_BODY2 = "</strong> as your agent. To confirm the identity of the agent you have recently removed click <a href=\"";
    public static final String NOTIFICATION_MESSAGE_TO_SERVICE_PROVIDER_REMOVED_AGENT_BODY3 = "\"><strong>here</strong></a>.\n\nLook for agents who are willing to share business opportunities with you. Click \"Make as my Agent\" button in an agent's profile to make them your agent.";

    public static final String NOTIFICATION_MESSAGE_TO_INVITER_SUBJECT = "Inviter Notification (agent)";
    public static final String NOTIFICATION_MESSAGE_TO_INVITER_BODY1 = "\n\nYou have invited <strong>";
    public static final String NOTIFICATION_MESSAGE_TO_INVITER_BODY2 = "</strong> to make use of your service as an agent."
            + "\n\n<strong>Check out</strong> ";
    public static final String NOTIFICATION_MESSAGE_TO_INVITER_BODY3 = ".\n\nAs an agent you have to seek and transact for service providers as you are their online representative to deal with clients.";

    public static final String NOTIFICATION_MESSAGE_TO_AGENT_REMOVED_SERVICE_PROVIDER_SUBJECT = "ajsjee.com : Agent Removed a Service Provider";
    public static final String NOTIFICATION_MESSAGE_TO_AGENT_REMOVED_SERVICE_PROVIDER_BODY1 = "\n\nYou removed one of your service providers."
            + "\nClick <a href=\"";
    public static final String NOTIFICATION_MESSAGE_TO_AGENT_REMOVED_SERVICE_PROVIDER_BODY2 = "\"><strong>here</strong></a> to confirm the identity of the service provider you removed.";

    public static String WELCOME_MESSAGE_SUBJECT = "Welcome Message";
    public static String WELCOME_MESSAGE_GREETINGS = "Hi ";
    public static String WELCOME_MESSAGE_BODY = "\n\n<strong>Welcome to ajsjee.com</strong> -- we are so happy to have you onboard! You have just joined an up and coming community of job seekers and providers."
            + "\n\nTogether, we are striving towards a mission of connecting be people and enabling them to get hired and earn by posting service advertisements, job opening and more, all for free!"
            + "\n\n<strong>Here are 3 things you can do now:</strong>"
            + "\n\n 1. Be a service provider"
            + "\n 2. Look for services available"
            + "\n 3. Be an agent and help people get hired"
            + "\n\nWe are thrilled that you have joined us!";
    public static String WELCOME_MESSAGE_FOOTER = "\n\nCheers,"
            + "\n\n- ajsjee Team";
}
