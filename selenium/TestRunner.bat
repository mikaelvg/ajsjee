tar -cvf TestSuiteCaseOne.tar.gz TestSuiteCaseOne\

java -jar selenium-server.jar -singlewindow -htmlSuite "*firefox C:\Program Files (x86)\Firefox Developer Edition\firefox.exe" "http://buildph.ajsjee.com" "C:\Users\devkinetics\Desktop\SeleniumHQ1.1\TestSuiteCaseOne\TestSuiteCaseOne.html" "C:\Users\devkinetics\Desktop\SeleniumHQ1.1\SeleniumTestSuiteResults\TestSuiteCaseOneResults.html"