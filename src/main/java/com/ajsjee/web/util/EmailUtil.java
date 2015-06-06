package com.ajsjee.web.util;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.apache.log4j.Logger;

/**
 *
 * @author mikaelvg
 */
public class EmailUtil {

    private static final Logger LOGGER = Logger.getLogger(CommonUtil.class);

    public static void sendMail(String emailTitle, String emailMessage, String emailRecipient) {

        final String mailOwner = ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_USER");
        final String password = ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_PASSWORD");
        final String host = ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_HOST");
        final String smtpPort = ConstantsLoaderUtils.ConstantsMap.get("SMTP_PORT");
        final String auth = ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_AUTH");
        final String startTlsEnable = ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_STARTTLS_ENABLE");

        final String enableSslEnable = ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_ENABLESSL_ENABLE");
        final String socketFactoryClass = ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_SOCKETFACTORY_CLASS");
        final String socketFactoryFallback = ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_SOCKETFACTORY_FALLBACK");
        final String port = ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_PORT");
        final String socketFactoryPort = ConstantsLoaderUtils.ConstantsMap.get("MAIL_SMTP_SOCKETFACTORY_PORT");

        Properties props = new Properties();

        try {
            props.put("mail.smtp.user", mailOwner);
            props.put("mail.smtp.password", password);
            props.put("mail.smtp.host", host);
            props.put("mail.smtp.port", smtpPort);
            props.put("mail.smtp.auth", auth);
            props.put("mail.smtp.starttls.enable", startTlsEnable);
            props.put("mail.smtp.EnableSSL.enable", enableSslEnable);
            props.setProperty("mail.smtp.socketFactory.class", socketFactoryClass);
            props.setProperty("mail.smtp.socketFactory.fallback", socketFactoryFallback);
            props.setProperty("mail.smtp.port", port);
            props.setProperty("mail.smtp.socketFactory.port", socketFactoryPort);

            Session session = Session.getInstance(props, new javax.mail.Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(mailOwner, password);
                }
            });

            try {

                Message message = new MimeMessage(session);
                message.setFrom(new InternetAddress(mailOwner));
                message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(emailRecipient));
                message.setSubject(emailTitle);

                //message.setContent(emailMessage.replaceAll(EmailMessagesUtils.CUST_SUPPORT_EMAIL_WILDCARD, customerSupportEmail), EmailMessagesUtils.EMAIL_CONTENT_TYPE);
//                message.setText(emailMessage);

                message.setContent(EmailMessageUtil.EMAIL_NOTIFICATION_HTML_TEMPLATE1
                        + emailMessage
                        + EmailMessageUtil.EMAIL_NOTIFICATION_HTML_TEMPLATE2, "text/html; charset=UTF-8");

                Transport transport = session.getTransport("smtp");
                //transport.connect (ConstantsLoaderUtils.ConstantsMap.get("SMTP_HOSTNAME"), Integer.parseInt(ConstantsLoaderUtils.ConstantsMap.get("SMTP_PORT")), ConstantsLoaderUtils.ConstantsMap.get("SMTP_USERNAME"), ConstantsLoaderUtils.ConstantsMap.get("SMTP_PASSWORD"));
                transport.connect(host, Integer.parseInt(smtpPort), mailOwner, password);
                transport.sendMessage(message, message.getAllRecipients());
                transport.close();

            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }
        } catch (RuntimeException e) {
            LOGGER.error("ERROR! No Internet Connection!");
        }
    }
}
