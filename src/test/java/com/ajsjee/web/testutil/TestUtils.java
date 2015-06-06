
package com.ajsjee.web.testutil;

import com.sun.enterprise.util.OS;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.ejb.embeddable.EJBContainer;
import com.ajsjee.web.entity.Appuser;

/**
 *
 * @author Mikael Gulapa
 */
public class TestUtils {

    private TestUtils() {
    }

    //all necessary files when will be included in the repo
    private static final String GLASSFISH_HOME = "glassfish-install/glassfish";

    public static EJBContainer getEJBContainer(EJBContainer container) {
        Map properties = new HashMap();
        properties.put(EJBContainer.MODULES,
                new File[]{new File("target/classes"), new File("target/test-classes")});

        //properties.put("org.glassfish.ejb.embedded.glassfish.installation.root", strGlassFishHome);
        properties.put("org.glassfish.ejb.embedded.glassfish.installation.root", GLASSFISH_HOME);
        container = javax.ejb.embeddable.EJBContainer.createEJBContainer(properties);
        return container;
    }

    public static void runDBScript() throws IOException, InterruptedException {
        Process p;
        if (OS.isWindows()) {
            //backslashes for windBlows
            p = Runtime.getRuntime().exec("cmd /c \"db\\create_db_wrapper.cmd && alter_db_wrapper.cmd\"");

        } else {
            // for other OS's simply run the bash script
            p = Runtime.getRuntime().exec("db/create_db_wrapper.sh && db/alter_db_wrapper.sh");
        }

        // exhaust input stream
        BufferedInputStream in = new BufferedInputStream(p.getInputStream());
        byte[] bytes = new byte[4096];
        while (in.read(bytes) != -1) {
        }
        // for slower machines
        p.waitFor();
    }

    public static Appuser populateAppuser(Long appuserId) throws Exception {
        Appuser appuser = new Appuser();
        appuser.setPkAppuserId(appuserId);
        appuser.setAccountEmail("ajsjeecom@yahoo.com");
        appuser.setFirstName("Mikael");
        appuser.setLastName("Gulapa");
        appuser.setBirthday("10/10/1990");
        appuser.setGender("male");
        return appuser;
    }
}
