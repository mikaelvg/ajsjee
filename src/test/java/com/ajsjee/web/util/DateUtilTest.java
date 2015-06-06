/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ajsjee.web.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 *
 * @author Mikael Gulapa
 */
public class DateUtilTest {

    public DateUtilTest() {
    }

    @BeforeClass
    public static void setUpClass() {
    }

    @AfterClass
    public static void tearDownClass() {
    }

    @Test
    public void testAddYears() {
        int yearsIncreament = 1;
        Date result = DateUtil.addYears(this.getDate(), yearsIncreament);
        System.out.println("addYears = " + result);
    }

    @Test
    public void testAddMonths() {
        int monthsIncreament = 1;
        Date result = DateUtil.addMonths(this.getDate(), monthsIncreament);
        System.out.println("addMonths + " + result);
    }

    @Test
    public void testAddDays() {
        int daysIncreament = 1;
        Date result = DateUtil.addDays(this.getDate(), daysIncreament);
        System.out.println("addDays = " + result);
    }

    private Date getDate() {
        Date myDate = null;
        try {
            String dateString = "20100316";
            DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
            myDate = dateFormat.parse(dateString);

        } catch (ParseException ex) {
            Logger.getLogger(DateUtilTest.class.getName()).log(Level.SEVERE, null, ex);
        }
        return myDate;
        //return null;
    }
}
