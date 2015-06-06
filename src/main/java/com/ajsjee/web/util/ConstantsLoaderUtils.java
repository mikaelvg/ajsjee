package com.ajsjee.web.util;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 *
 * @author Mikael Gulapa
 */
public class ConstantsLoaderUtils {

    private ConstantsLoaderUtils() {
    }
    public static final Map<String, String> ConstantsMap = new ConcurrentHashMap<>();
}
