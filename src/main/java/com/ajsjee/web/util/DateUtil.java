package com.ajsjee.web.util;

import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;
import org.apache.commons.lang.time.DateUtils;
import org.apache.log4j.Logger;

/**
 *
 * @author mikaelgulapa
 */
public class DateUtil {

    private DateUtil() {
    }
    private static final Logger LOGGER = Logger.getLogger(DateUtil.class);

    public static Date addYears(Date date, int yearsIncreament) {
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));

        if (date != null) {
            calendar.setTime(date);
        }

        calendar.add(Calendar.YEAR, yearsIncreament);
        calendar.add(Calendar.HOUR, 1);
        calendar = DateUtils.truncate(calendar, Calendar.HOUR);
        Date calculatedMonth = new java.sql.Timestamp((calendar.getTime().getTime()));
        return calculatedMonth;
    }

    public static Date addMonths(Date date, int monthsIncreament) {
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));

        if (date != null) {
            calendar.setTime(date);
        }

        calendar.add(Calendar.MONTH, monthsIncreament);
        calendar.add(Calendar.HOUR, 1);
        calendar = DateUtils.truncate(calendar, Calendar.HOUR);
        Date calculatedMonth = new java.sql.Timestamp((calendar.getTime().getTime()));
        return calculatedMonth;
    }

    public static Date addWeeks(Date date, int weeksIncreament) {
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));

        if (date != null) {
            calendar.setTime(date);
        }

        calendar.add(Calendar.WEEK_OF_YEAR, weeksIncreament);
        calendar.add(Calendar.HOUR, 1);
        calendar = DateUtils.truncate(calendar, Calendar.HOUR);
        Date calculatedWeek = new java.sql.Timestamp((calendar.getTime().getTime()));
        return calculatedWeek;
    }

    public static Date addDays(Date date, int daysIncreament) {
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));

        if (date != null) {
            calendar.setTime(date);
        }

        calendar.add(Calendar.DATE, daysIncreament);
        calendar.add(Calendar.HOUR, 1);
        calendar = DateUtils.truncate(calendar, Calendar.HOUR);
        Date calculatedMonth = new java.sql.Timestamp((calendar.getTime().getTime()));
        return calculatedMonth;
    }

}
