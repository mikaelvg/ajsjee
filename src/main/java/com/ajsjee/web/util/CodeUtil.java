package com.ajsjee.web.util;

/**
 *
 * @author Mikael Gulapa
 */
public class CodeUtil {

    // SUCCESS CODES
    // RECORDS CLASSESS  
    public static final int LOGIN_SUCCESS = 10000;

    public static final int CREATE_APPUSER_SUCCESS = 10101;
    public static final int UPDATE_APPUSER_SUCCESS = 10102;
    public static final int RETRIEVE_APPUSER_SUCCESS = 10103;

    public static final int CREATE_PROFILE_SUCCESS = 10201;
    public static final int UPDATE_PROFILE_SUCCESS = 10202;
    public static final int RETRIEVE_PROFILE_SUCCESS = 10203;


    public static final int RETRIEVE_CONSTANT_SUCCESS = 10603;

    public static final int RETRIEVE_CREDENTIAL_SUCCESS = 10703;

    public static final int CREATE_OAUTH_SUCCESS = 11201;
    public static final int UPDATE_OAUTH_SUCCESS = 11202;
    public static final int RETRIEVE_OAUTH_SUCCESS = 11203;
    public static final int DELETE_OAUTH_SUCCESS = 11204;

    // COMBINED OBJECTS
    public static final int RETRIEVE_ACCOUNT_SUCCESS = 16103;
    public static final int RETRIEVE_TOKEN_SUCCESS = 16503;


    //ERROR CODES ##################################################
    public static final int LOGIN_ERROR = 20000;

    public static final int CREATE_APPUSER_ERROR = 20101;
    public static final int UPDATE_APPUSER_ERROR = 20102;
    public static final int RETRIEVE_APPUSER_ERROR = 20103;
    public static final int DELETE_APPUSER_ERROR = 20104;
    public static final int DO_NOT_EXIST_APPUSER_ERROR = 20105;

    public static final int CREATE_PROFILE_ERROR = 20201;
    public static final int UPDATE_PROFILE_ERROR = 20202;
    public static final int RETRIEVE_PROFILE_ERROR = 20203;
    public static final int DELETE_PROFILE_ERROR = 20204;
    public static final int DO_NOT_EXIST_PROFILE_ERROR = 20205;

    public static final int RETRIEVE_CONSTANT_ERROR = 20603;
    public static final int DO_NOT_EXIST_CONSTANT_ERROR = 20605;

    public static final int CREATE_OAUTH_ERROR = 21201;
    public static final int UPDATE_OAUTH_ERROR = 21202;
    public static final int RETRIEVE_OAUTH_ERROR = 21203;
    public static final int DELETE_OAUTH_ERROR = 21204;
    public static final int DO_NOT_EXIST_OAUTH_ERROR = 21205;


    // COMBINED OBJECTS
    public static final int RETRIEVE_ACCOUNT_ERROR = 26103;
    public static final int RETRIEVE_TOKEN_ERROR = 26503;


    //UNIQUE FIELD ERRORS
    public static final int UNQ_APPUSER_ACCOUNTEMAIL_ERROR = 50101;

    public static final int UNQ_PROFILE_URLID_ERROR = 50301;
    public static final int UNQ_PROFILE_MOBILENUMBER_ERROR = 50302;
    public static final int UNQ_PROFILE_LANDLINE_ERROR = 50303;
    public static final int UNQ_PROFILE_BUSINESSEMAIL_ERROR = 50304;
    public static final int UNQ_PROFILE_FKAPPUSER_ERROR = 50305;

    public static final int UNQ_OAUTH_ACCOUNTID_ERROR = 50401;

    //NON-CLASS RELATED 
    public static final int VALIDATE_APPUSER_ACTIVE = 30000;
    public static final int VALIDATE_APPUSER_NOT_AVAILABLE = 30006;
    public static final int VALIDATE_APPUSER_DEACTIVATE = 30007;
    public static final int VALIDATE_APPUSER_BLOCKED = 30008;
    public static final int GENERIC_ERROR = 30009;
    public static final int INVALID_PARAMETER = 30010;
    public static final int DATABASE_ERROR = 30011;

    public static final int ACTIVE_STATUS = 0;
    public static final int DISABLED_STATUS = 1;
    public static final int BLOCKED_STATUS = 2;

    public static final int SERVICETYPE_WITH_OPERATOR = 1;
    public static final int SERVICETYPE_RENT_ONLY = 2;

    public static final int UNIT_PER_SESSION = 1;
    public static final int UNIT_PER_HOUR = 2;
    public static final int UNIT_PER_DAY = 3;
    public static final int UNIT_PER_WEEK = 4;
    public static final int UNIT_PER_MONTH = 5;
    public static final int UNIT_PER_YEAR = 6;

    public static final int SEARCHTYPE_SERVICE = 1;
    public static final int SEARCHTYPE_WITH_OPERATOR = 2;
    public static final int SEARCHTYPE_RENT_ONLY = 3;
    public static final int SEARCHTYPE_JOBPOST = 4;
    public static final int SEARCH_RECORD_COUNT_PER_PAGE = 10;

    public static final int PROGRAM_RECORD_COUNT_PER_PAGE = 3;

    public static final int FEEDBACK_RECORD_COUNT_PER_PAGE = 5;

    public static final int SEARCHKEY_MAX_COUNT = 3;

    public static final Long DEFAULT_LOGINID = 10000L;

    public static final int STATUS_NEW_OR_FOR_REVIEW = 0;
    public static final int STATUS_APPROVED = 1; // Paid/ Approved/ etc
    public static final int STATUS_NOTAPPROVED = 2;

    public static final int FOR_HIRE = 1; // Paid/ Approved/ etc
    public static final int DEPLOYED = 2;


    public static final int RETRIEVE_OAUTH_USER_CREDENTIALS_SUCCESS = 1;
    public static final int RETRIEVE_OAUTH_USER_CREDENTIALS_ERROR = 2;
}
